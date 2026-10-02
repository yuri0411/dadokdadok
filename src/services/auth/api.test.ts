import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  signInWithOAuth: vi.fn(),
  exchangeCodeForSession: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock("@/lib/supabase", () => ({ supabase: { auth } }));

import { completeSignIn, getAuthUser, signIn, signOut, subscribeToAuth } from "./api";

describe("social authentication", () => {
  beforeEach(() => vi.resetAllMocks());

  it.each([
    ["kakao", "kakao"],
    ["naver", "custom:naver"],
  ] as const)("starts %s with the app callback", async (provider, expected) => {
    auth.signInWithOAuth.mockResolvedValue({ error: null });
    await signIn(provider);
    expect(auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: expected,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  });

  it("propagates provider startup failure", async () => {
    auth.signInWithOAuth.mockResolvedValue({ error: new Error("disabled provider") });
    await expect(signIn("naver")).rejects.toThrow("disabled provider");
  });

  it("redeems one-use callback only once across simultaneous mounts", async () => {
    auth.exchangeCodeForSession.mockResolvedValue({
      data: { session: { user: { id: "u1" } } },
      error: null,
    });
    await Promise.all([completeSignIn("code-once"), completeSignIn("code-once")]);
    expect(auth.exchangeCodeForSession).toHaveBeenCalledTimes(1);
  });

  it("rejects expired callback without exposing provider details", async () => {
    auth.exchangeCodeForSession.mockResolvedValue({
      data: { session: null },
      error: new Error("secret-provider-detail"),
    });
    await expect(completeSignIn("expired-code")).rejects.toThrow("로그인을 완료하지 못했어요.");
  });

  it("restores only user information into the query", async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { id: "u1" }, access_token: "private" } },
      error: null,
    });
    expect(await getAuthUser()).toEqual({ id: "u1" });
  });

  it("subscribes to sign-out and releases the subscription", () => {
    const unsubscribe = vi.fn();
    auth.onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe } } });
    const onChange = vi.fn();
    const release = subscribeToAuth(onChange);
    auth.onAuthStateChange.mock.calls[0][0]("SIGNED_OUT", null);
    expect(onChange).toHaveBeenCalledWith(null);
    release();
    expect(unsubscribe).toHaveBeenCalledOnce();
  });

  it("logs out locally without clearing learning records", async () => {
    localStorage.setItem("learning-record", "keep");
    auth.signOut.mockResolvedValue({ error: null });
    await signOut();
    expect(auth.signOut).toHaveBeenCalledWith({ scope: "local" });
    expect(localStorage.getItem("learning-record")).toBe("keep");
  });
});
