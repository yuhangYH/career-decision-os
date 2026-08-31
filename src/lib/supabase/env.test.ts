import { describe, expect, it } from "vitest";

import { getDataMode } from "./env";

describe("getDataMode", () => {
  it("uses demo mode when Supabase credentials are absent", () => {
    expect(getDataMode({})).toBe("demo");
  });

  it("uses cloud mode only when URL and publishable key are present", () => {
    expect(
      getDataMode({
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable",
      }),
    ).toBe("cloud");
  });
});
