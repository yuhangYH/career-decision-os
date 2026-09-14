import { describe, expect, it } from "vitest";

import { targetCities } from "./cities";
import { seedJobs } from "./jobs";

describe("official-source opportunity seed", () => {
  it("contains at least 30 distinct real job records", () => {
    const realJobs = seedJobs.filter((job) => job.status !== "discovery_lead");
    expect(realJobs.length).toBeGreaterThanOrEqual(30);
    expect(new Set(seedJobs.map((job) => job.id)).size).toBe(seedJobs.length);
  });

  it("represents all seven role families and every active target region", () => {
    const roles = new Set(seedJobs.flatMap((job) => job.roleFamilies));
    expect(roles.size).toBe(7);

    const regionByCity = new Map(targetCities.map((city) => [city.id, city.region]));
    const regions = new Set(seedJobs.map((job) => regionByCity.get(job.cityId)));
    expect(regions).toEqual(new Set(["gcc", "israel", "australia", "new_zealand", "south_africa", "southeast_asia", "greater_china", "europe"]));
    expect(seedJobs.every((job) => regionByCity.has(job.cityId))).toBe(true);
  });

  it("adds official careers watches for the new active markets", () => {
    const expectedWatches = [
      "aws-singapore-ai-watch",
      "bytedance-singapore-ai-watch",
      "nvidia-shanghai-ai-watch",
      "alibaba-hangzhou-ai-watch",
      "google-london-ai-watch",
    ];

    for (const id of expectedWatches) {
      const job = seedJobs.find((item) => item.id === id);
      expect(job).toBeDefined();
      expect(job?.status).toBe("discovery_lead");
      expect(job?.sourceKind).toBe("official_careers");
      expect(job?.officialUrl.startsWith("https://")).toBe(true);
    }
  });

  it("keeps source provenance complete and official open URLs strict", () => {
    for (const job of seedJobs) {
      expect(job.officialUrl).not.toContain("example.com");
      expect(job.careersUrl).not.toContain("example.com");
      expect(job.checkedAt).toMatch(/^2026-09-14T/);
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

  it("captures the 7 September official-ATS delta", () => {
    const newlyVerified = [
      "xero-applied-scientist-ai-products-7c3e",
      "xero-senior-ai-builder-03e1",
      "xero-senior-ml-systems-80be",
      "nvidia-llm-software-2016753",
      "nvidia-llm-researcher-2017410",
      "nvidia-applied-ai-biology-2016711",
    ];
    const newlyClosed = [
      "xero-senior-applied-scientist",
      "xero-lead-technical-product-manager",
      "nvidia-tensorrt-llm-2008357",
      "nvidia-dl-inference-1985934",
      "nvidia-senior-dl-research-2013721",
    ];

    for (const id of newlyVerified) {
      expect(seedJobs.find((job) => job.id === id)?.status).toBe("verified_open");
    }
    for (const id of newlyClosed) {
      expect(seedJobs.find((job) => job.id === id)?.status).toBe("closed");
    }
  });

  it("captures the 14 September official-ATS delta", () => {
    const newlyVerified = [
      "xero-senior-ai-agentic-8fed",
      "xero-senior-ai-workflows-melbourne-207b",
      "xero-senior-ai-workflows-sydney-3954",
      "xero-head-product-ai-shared-services-b8dd",
      "nvidia-diffusion-researcher-2013876",
      "nvidia-deep-learning-solutions-2024979",
      "nvidia-agentic-systems-researcher-2016502",
      "apple-agentic-full-stack-200674773",
      "apple-video-restoration-researcher-200671079",
    ];

    for (const id of newlyVerified) {
      expect(seedJobs.find((job) => job.id === id)?.status).toBe("verified_open");
    }

    expect(seedJobs.find((job) => job.id === "airnz-senior-data-scientist")?.status).toBe("closed");
    expect(seedJobs.find((job) => job.id === "xero-ml-engineering-manager")).toMatchObject({
      title: "Engineering Manager – ML & AI",
      cityName: "Sydney",
      postedAt: "2026-08-20T00:00:00+10:00",
    });
    expect(seedJobs.find((job) => job.id === "xero-senior-ml-systems-80be")?.postedAt).toBe("2026-09-08T12:29:14.265+00:00");
    expect(seedJobs.find((job) => job.id === "bcgx-ai-strategy-watch")?.officialUrl).toBe("https://careers.bcg.com/global/en/x");
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
