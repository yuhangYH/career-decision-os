import { describe, expect, it } from "vitest";

import { scoreCity } from "./city";

describe("scoreCity", () => {
  it("uses the approved city weights and rounds to one decimal", () => {
    expect(
      scoreCity({
        compensation: 90,
        roleDensity: 80,
        englishUsability: 100,
        access: 70,
        personalAdvantage: 60,
        careerCapital: 90,
      }),
    ).toBe(82);
  });

  it("preserves one decimal when required", () => {
    expect(
      scoreCity({
        compensation: 91,
        roleDensity: 87,
        englishUsability: 93,
        access: 84,
        personalAdvantage: 73,
        careerCapital: 79,
      }),
    ).toBe(86.5);
  });
});
