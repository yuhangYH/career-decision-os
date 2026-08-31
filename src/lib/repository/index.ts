import { createDemoRepository } from "./demo-repository";
import { createSupabaseRepository } from "./supabase-repository";
import type { CareerRepository } from "./types";
import { getDataMode } from "@/lib/supabase/env";

export async function getCareerRepository(): Promise<CareerRepository> {
  return getDataMode(process.env) === "cloud"
    ? createSupabaseRepository()
    : createDemoRepository();
}

export type * from "./types";
