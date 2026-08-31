import { describe, expect, it } from "vitest";

import { jobSchema } from "./schemas";

const officialJob = {
  id: "job-1001-ml-engineer",
  companyId: "company-1001",
  title: "Machine Learning Engineer",
  roleFamilies: ["ai_ml_engineer", "applied_scientist"],
  cityId: "doha",
  officialUrl: "https://careers.1001.ai/machine-learning-engineer",
  careersUrl: "https://careers.1001.ai/",
  sourceKind: "official_ats",
  status: "verified_open",
  workLanguage: "English",
  checkedAt: "2026-08-31T08:00:00+04:00",
  requirements: ["Python", "machine learning"],
  responsibilities: ["Build applied AI systems"],
  hardConstraints: [],
  compensation: {
    kind: "not_stated",
    currency: null,
    min: null,
    max: null,
  },
} as const;

describe("jobSchema", () => {
  it("accepts an official verified job with provenance", () => {
    const parsed = jobSchema.parse(officialJob);

    expect(parsed.status).toBe("verified_open");
  });

  it("rejects a verified job without an official URL", () => {
    expect(() => jobSchema.parse({ id: "bad", status: "verified_open" })).toThrow();
  });

  it("rejects a platform lead presented as verified", () => {
    expect(() =>
      jobSchema.parse({ ...officialJob, sourceKind: "platform" }),
    ).toThrow(/official source/i);
  });
});
