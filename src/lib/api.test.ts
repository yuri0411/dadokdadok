import { describe, expect, it, vi } from "vitest";

const getSession = vi.hoisted(() => vi.fn());
vi.mock("./supabase", () => ({ supabase: { auth: { getSession } } }));

import { api } from "./api";

describe("authenticated API requests", () => {
  it("uses the latest session token, then removes it for guest requests", async () => {
    const headers: unknown[] = [];
    const adapter: NonNullable<Parameters<typeof api.request>[0]["adapter"]> = async (config) => {
      headers.push(config.headers.get("Authorization"));
      return { data: {}, status: 200, statusText: "OK", headers: {}, config };
    };
    getSession.mockResolvedValueOnce({
      data: { session: { access_token: "refreshed-token" } },
      error: null,
    });
    await api.get("/auth/me", { adapter });
    getSession.mockResolvedValueOnce({ data: { session: null }, error: null });
    await api.get("/public", { adapter });
    expect(headers).toEqual(["Bearer refreshed-token", undefined]);
  });
});
