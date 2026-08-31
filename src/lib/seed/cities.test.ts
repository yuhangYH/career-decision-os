import { describe, expect, it } from "vitest";

import { targetCities } from "./cities";

const expectedCityIds = [
  "abu-dhabi", "dubai", "riyadh", "doha", "kuwait-city", "manama",
  "tel-aviv", "herzliya", "haifa", "jerusalem", "raanana-petah-tikva", "beer-sheva",
  "sydney", "melbourne", "canberra", "brisbane", "perth", "adelaide",
  "auckland", "wellington", "christchurch",
  "johannesburg", "sandton-midrand", "cape-town", "pretoria", "stellenbosch",
];

describe("targetCities", () => {
  it("covers all 26 approved English-working city targets exactly once", () => {
    expect(targetCities.map((city) => city.id)).toEqual(expectedCityIds);
    expect(new Set(targetCities.map((city) => city.id)).size).toBe(26);
    expect(targetCities.every((city) => city.workLanguage === "English-compatible")).toBe(true);
  });
});
