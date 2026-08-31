export type DataMode = "demo" | "cloud";

export function getDataMode(env: Record<string, string | undefined>): DataMode {
  if (env.NEXT_PUBLIC_DEMO_MODE === "true") return "demo";
  return env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ? "cloud"
    : "demo";
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Supabase URL and publishable key are required in cloud mode.");
  }

  return { url, publishableKey };
}
