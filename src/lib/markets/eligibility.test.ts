import { describe, expect, it } from "vitest";

import type { City } from "@/lib/domain/types";

import {
  ACTIVE_CITY_SCORE_THRESHOLD,
  getEligibleCities,
  getEligibleCityIds,
} from "./eligibility";

const city = (id: string, value: number): City => ({
  id,
  name: id,
  nameZh: id,
  country: "Test",
  countryZh: "测试",
  region: "europe",
  compensation: value,
  roleDensity: value,
  englishUsability: value,
  access: value,
  personalAdvantage: value,
  careerCapital: value,
  notes: [],
});

describe("market eligibility", () => {
  it("includes a city at 70 and excludes a city at 69.9", () => {
    const eligible = getEligibleCities([
      city("below", 69.9),
      city("boundary", 70),
    ]);

    expect(ACTIVE_CITY_SCORE_THRESHOLD).toBe(70);
    expect(eligible.map((item) => item.id)).toEqual(["boundary"]);
  });

  it("orders eligible cities by score and exposes their ids", () => {
    const cities = [city("seventy", 70), city("ninety", 90)];

    expect(getEligibleCities(cities).map((item) => item.id)).toEqual([
      "ninety",
      "seventy",
    ]);
    expect([...getEligibleCityIds(cities)]).toEqual(["ninety", "seventy"]);
  });
});
