"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getDataMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function signInWithMagicLink(formData: FormData) {
  if (getDataMode(process.env) === "demo") redirect("/app");

  const email = String(formData.get("email") ?? "").trim();
  if (!email) redirect("/login?error=Email%20is%20required");

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/login?sent=1");
}
