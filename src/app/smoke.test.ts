import { describe, expect, it } from "vitest";

import { PRODUCT_NAME } from "@/lib/config";

describe("application configuration", () => {
  it("uses the approved product name", () => {
    expect(PRODUCT_NAME).toBe("Career Decision OS");
  });
});
