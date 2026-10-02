import { supabase } from "@/lib/supabase";
import { PATHS } from "@/routes/paths";

import type { AuthUser, SocialProvider } from "./types";

export const isAuthConfigured = Boolean(supabase);

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session?.user ?? null;
}

export function subscribeToAuth(onChange: (user: AuthUser | null) => void) {
  const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
    onChange(session?.user ?? null);
  }).data.subscription;
  return () => subscription?.unsubscribe();
}

export async function signIn(provider: SocialProvider): Promise<void> {
  if (!supabase) throw new Error("로그인 설정이 준비되지 않았어요.");
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider === "naver" ? "custom:naver" : "kakao",
    options: { redirectTo: `${window.location.origin}${PATHS.AUTH_CALLBACK}` },
  });
  if (error) throw error;
}

let callback: { code: string; result: Promise<void> } | undefined;

export function completeSignIn(code: string): Promise<void> {
  // StrictMode/remounts must not redeem the same one-use authorization code twice.
  if (callback?.code === code) return callback.result;
  const result = (async () => {
    if (!supabase || !code) throw new Error("다시 로그인을 시작해 주세요.");
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.session) throw new Error("로그인을 완료하지 못했어요.");
  })();
  callback = { code, result };
  return result;
}

export async function signOut(): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw error;
}
