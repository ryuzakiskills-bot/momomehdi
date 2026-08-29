// src/lib/admin-auth.ts
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/** Sign in admin user */
export async function signInAdmin(email: string, password: string): Promise<{ user?: User; error?: any }> {
  if (!supabase) return { error: new Error("Supabase not configured") };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data?.user ?? undefined, error };
}

/** Sign out current user */
export async function signOutAdmin(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Get current logged‑in user (null if not authenticated) */
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}
