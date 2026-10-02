import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Only a publishable (or legacy anon) key belongs in the browser.
export const supabase =
  url && publishableKey
    ? createClient(url, publishableKey, {
        auth: { flowType: "pkce", detectSessionInUrl: false },
      })
    : null;
