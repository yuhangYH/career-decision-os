import { describe, expect, it } from "vitest";

import { CITY_REGIONS, getRegionLabel } from "./regions";

describe("city regions", () => {
  it("covers the new regions in Chinese and English", () => {
    expect(CITY_REGIONS.map((item) => item.id)).toEqual(
      expect.arrayContaining(["southeast_asia", "greater_china", "europe"]),
    );
    expect(getRegionLabel("greater_china", "zh")).toBe("大中华区");
    expect(getRegionLabel("southeast_asia", "en")).toBe("Southeast Asia");
    expect(getRegionLabel("europe", "en")).toBe("Europe");
  });
});
