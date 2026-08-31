import { describe, expect, it } from "vitest";

import { targetCities } from "./cities";
import { seedJobs } from "./jobs";

describe("official-source opportunity seed", () => {
  it("contains at least 30 distinct real job records", () => {
    const realJobs = seedJobs.filter((job) => job.status !== "discovery_lead");
    expect(realJobs.length).toBeGreaterThanOrEqual(30);
    expect(new Set(seedJobs.map((job) => job.id)).size).toBe(seedJobs.length);
  });

  it("represents all seven role families and every target region", () => {
    const roles = new Set(seedJobs.flatMap((job) => job.roleFamilies));
    expect(roles.size).toBe(7);

    const regionByCity = new Map(targetCities.map((city) => [city.id, city.region]));
    const regions = new Set(seedJobs.map((job) => regionByCity.get(job.cityId)));
    expect(regions).toEqual(new Set(["gcc", "israel", "australia", "new_zealand", "south_africa"]));
  });

  it("keeps source provenance complete and official open URLs strict", () => {
    for (const job of seedJobs) {
      expect(job.officialUrl).not.toContain("example.com");
      expect(job.careersUrl).not.toContain("example.com");
      expect(job.checkedAt).toMatch(/^2026-08-31T/);
      expect(job.careersUrl.startsWith("https://")).toBe(true);
      if (job.status === "verified_open") {
        expect(job.officialUrl.startsWith("https://")).toBe(true);
        expect(job.sourceKind.startsWith("official_")).toBe(true);
      }
      if (job.compensation.kind === "benchmark") {
        expect(job.compensation.sourceUrl?.startsWith("https://")).toBe(true);
        expect(job.compensation.sourceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(job.compensation.currency).toBeTruthy();
      }
    }
  });

  it("keeps reusable opportunity decisions independent of a named candidate", () => {
    const evidence = seedJobs
      .flatMap((job) => job.decision.dimensions)
      .flatMap((dimension) => dimension.candidateEvidence)
      .join(" ");

    expect(evidence).not.toMatch(/ADIA|PhD|named candidate/i);
    expect(evidence).toContain("Documented ML project");
  });
});
