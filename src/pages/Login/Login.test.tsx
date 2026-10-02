import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
  isAuthConfigured: true,
  getAuthUser: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  subscribeToAuth: vi.fn<(onChange: (user: { id: string } | null) => void) => () => void>(
    () => () => {}
  ),
  completeSignIn: vi.fn(),
}));
vi.mock("@/services/auth/api", () => auth);

import Callback from "./Callback";

import Login from "./index";

function renderPage(callback = false) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  render(
    <StrictMode>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[callback ? "/auth/callback" : "/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<Callback />} />
            <Route path="/home" element={<p>학습 홈</p>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  auth.isAuthConfigured = true;
  auth.getAuthUser.mockResolvedValue(null);
  auth.signIn.mockResolvedValue(undefined);
  auth.signOut.mockResolvedValue(undefined);
  window.history.replaceState({}, "", "/login");
});

describe("login page", () => {
  it.each(["카카오", "네이버"])(
    "starts %s with keyboard and blocks duplicate requests",
    async (label) => {
      auth.signIn.mockReturnValue(new Promise(() => {}));
      renderPage();
      const button = await screen.findByRole("button", { name: `${label}로 로그인` });
      button.focus();
      await userEvent.keyboard("{Enter}");
      expect(auth.signIn).toHaveBeenCalledWith(
        label === "카카오" ? "kakao" : "naver",
        expect.anything()
      );
      expect(screen.getByRole("button", { name: `${label}로 이동 중` })).toHaveAttribute(
        "aria-busy",
        "true"
      );
      expect(
        screen.getByRole("button", {
          name: label === "카카오" ? "네이버로 로그인" : "카카오로 로그인",
        })
      ).toBeDisabled();
    }
  );

  it("keeps guest access available without configuration", async () => {
    auth.isAuthConfigured = false;
    renderPage();
    expect(await screen.findByRole("button", { name: "카카오로 로그인" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "로그인 없이 학습하기" }));
    expect(screen.getByText("학습 홈")).toBeInTheDocument();
  });

  it("allows retry after a provider failure", async () => {
    auth.signIn.mockRejectedValueOnce(new Error("provider down"));
    renderPage();
    await userEvent.click(await screen.findByRole("button", { name: "네이버로 로그인" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("다시 시도");
    expect(screen.getByRole("button", { name: "네이버로 로그인" })).toBeEnabled();
  });

  it("shows restored session and signs out", async () => {
    auth.getAuthUser.mockResolvedValue({ id: "u1" });
    renderPage();
    await userEvent.click(await screen.findByRole("button", { name: "로그아웃" }));
    expect(await screen.findByRole("button", { name: "카카오로 로그인" })).toBeEnabled();
    expect(auth.signOut).toHaveBeenCalledOnce();
  });

  it("updates when a different tab signs in", async () => {
    renderPage();
    await screen.findByRole("button", { name: "카카오로 로그인" });
    const listener = auth.subscribeToAuth.mock.calls.at(-1)?.[0];
    await act(async () => {
      if (listener) listener({ id: "u1" });
    });
    expect(await screen.findByRole("button", { name: "로그아웃" })).toBeEnabled();
  });
});

describe("login callback", () => {
  it("cleans the URL and returns to home on success", async () => {
    window.history.replaceState({}, "", "/auth/callback?code=test-code");
    auth.completeSignIn.mockResolvedValue(undefined);
    renderPage(true);
    expect(await screen.findByText("학습 홈")).toBeInTheDocument();
    expect(window.location.search).toBe("");
    expect(auth.completeSignIn).toHaveBeenCalledWith("test-code");
  });

  it.each(["?error=access_denied&error_description=private", ""])(
    "shows recoverable failure for %s",
    async (query) => {
      window.history.replaceState({}, "", `/auth/callback${query}`);
      renderPage(true);
      expect(await screen.findByRole("alert")).toHaveTextContent("다시 시도");
      expect(auth.completeSignIn).not.toHaveBeenCalled();
      expect(window.location.search).toBe("");
      await userEvent.click(screen.getByRole("button", { name: "다시 로그인" }));
      expect(await screen.findByRole("button", { name: "카카오로 로그인" })).toBeEnabled();
    }
  );

  it("handles an expired code", async () => {
    window.history.replaceState({}, "", "/auth/callback?code=expired");
    auth.completeSignIn.mockRejectedValue(new Error("expired"));
    renderPage(true);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("시간이 지났어요"));
  });
});
