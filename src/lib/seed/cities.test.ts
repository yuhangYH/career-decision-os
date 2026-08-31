import { describe, expect, it } from "vitest";

import { scoreCity } from "@/lib/scoring/city";

import { evaluatedCities, targetCities } from "./cities";

const requestedActiveCityIds = [
  "singapore",
  "hong-kong",
  "beijing",
  "shanghai",
  "guangzhou",
  "shenzhen",
  "hangzhou",
  "london",
  "dublin",
  "amsterdam",
  "berlin",
  "munich",
  "paris",
  "zurich",
  "stockholm",
];

describe("targetCities", () => {
  it("keeps only evaluated cities scoring at least 70 active", () => {
    expect(targetCities.every((city) => scoreCity(city) >= 70)).toBe(true);
    expect(targetCities.map((city) => city.id)).toEqual(
      expect.arrayContaining(requestedActiveCityIds),
    );
    expect(evaluatedCities.map((city) => city.id)).toEqual(
      expect.arrayContaining(["macau", ...requestedActiveCityIds]),
    );
    expect(targetCities.length).toBeLessThan(evaluatedCities.length);
  });

  it("keeps active ids unique and every active market English-compatible", () => {
    const ids = targetCities.map((city) => city.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      targetCities.every((city) => city.workLanguage === "English-compatible"),
    ).toBe(true);
  });

  it("keeps Macau in research without promoting it above the threshold", () => {
    const macau = evaluatedCities.find((city) => city.id === "macau");

    expect(macau).toBeDefined();
    expect(scoreCity(macau!)).toBeLessThan(70);
    expect(targetCities.some((city) => city.id === "macau")).toBe(false);
  });
});
