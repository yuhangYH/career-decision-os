import { describe, expect, it } from "vitest";

import {
  candidateEvidence,
  cvNarratives,
  publicCandidateProfile,
} from "./candidate";

describe("candidate evidence integrity", () => {
  it("exposes exactly the four approved CV narratives", () => {
    expect(cvNarratives.map((cv) => cv.id).sort()).toEqual([
      "cv-agent",
      "cv-ml",
      "cv-quant",
      "cv-strategy",
    ]);
  });

  it("grounds every CV claim in the shared evidence base", () => {
    const evidenceIds = new Set(candidateEvidence.map((item) => item.id));
    for (const cv of cvNarratives) {
      expect(cv.claims.length).toBeGreaterThan(0);
      for (const claim of cv.claims) {
        expect(evidenceIds.has(claim.evidenceId)).toBe(true);
      }
    }
  });

  it("keeps Agent readiness below ML until production Agent evidence exists", () => {
    const ml = cvNarratives.find((cv) => cv.id === "cv-ml");
    const agent = cvNarratives.find((cv) => cv.id === "cv-agent");
    expect(agent!.readiness).toBeLessThan(ml!.readiness);
    expect(candidateEvidence.some((item) => item.id === "production-agent-project")).toBe(false);
  });

  it("does not expose phone or email in public profile exports", () => {
    const publicExport = JSON.stringify(publicCandidateProfile);
    expect(publicExport).not.toMatch(/\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/);
    expect(publicExport).not.toMatch(/(?:\+?\d[\s-]?){8,}/);
  });

  it("labels the public profile and evidence as fictional demo data", () => {
    expect(publicCandidateProfile.name).toBe("Demo Candidate");
    expect(publicCandidateProfile.location).toBe("Choose your target market");
    expect(candidateEvidence.every((item) => item.source === "Synthetic public demo")).toBe(true);
  });
});
