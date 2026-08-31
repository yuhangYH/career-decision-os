import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";
import { getDataMode } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspaceLayout({ children }: { children: ReactNode }) {
  const demo = getDataMode(process.env) === "demo";

  if (!demo) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (!data?.claims) redirect("/login");
  }

  return <AppShell demo={demo}>{children}</AppShell>;
}
