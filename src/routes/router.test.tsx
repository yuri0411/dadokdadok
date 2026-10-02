import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router-dom";
import { expect, it, vi } from "vitest";

import { router } from "./router";

vi.mock("../pages/Home", () => ({ default: () => <main>학습 홈</main> }));
vi.mock("@/services/auth/api", () => ({
  isAuthConfigured: false,
  getAuthUser: vi.fn().mockResolvedValue(null),
  subscribeToAuth: vi.fn(() => () => {}),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

it("shows login on first arrival and opens home after choosing guest learning", async () => {
  await router.navigate("/");
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  expect(await screen.findByRole("heading", { name: "다독다독 로그인" })).toBeInTheDocument();
  expect(router.state.location.pathname).toBe("/login");
  expect(screen.queryByText("학습 홈")).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: "로그인 없이 학습하기" }));
  expect(await screen.findByText("학습 홈")).toBeInTheDocument();
  expect(router.state.location.pathname).toBe("/home");
});
