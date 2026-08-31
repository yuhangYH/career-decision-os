import { describe, expect, it } from "vitest";

import { scoreSkillFit } from "./fit";
import { scoreOpportunity, validateWeights } from "./opportunity";

describe("scoreOpportunity", () => {
  it("reproduces the approved 86-point demo decision", () => {
    const decision = scoreOpportunity({
      candidateFit: 84,
      careerUpside: 94,
      compensation: 70,
      actionability: 90,
      personalFactors: 85,
      constraints: [],
      sourceConfidence: 98,
      explanationCoverage: 95,
    });

    expect(decision.score).toBe(86);
    expect(decision.action).toBe("apply_now");
    expect(decision.scoreVersion).toBe("2026-08-v1");
  });

  it("returns skip when a hard constraint fails", () => {
    const decision = scoreOpportunity({
      candidateFit: 99,
      careerUpside: 99,
      compensation: 99,
      actionability: 99,
      personalFactors: 99,
      constraints: [
        {
          kind: "citizenship",
          requirement: "Citizen",
          result: "fail",
          evidence: "Not eligible",
        },
      ],
      sourceConfidence: 100,
      explanationCoverage: 100,
    });

    expect(decision.action).toBe("skip");
  });

  it("rejects weights that do not sum to one", () => {
    expect(() => validateWeights({ fit: 0.4, upside: 0.2 })).toThrow(/sum to 1/i);
  });
});

describe("scoreSkillFit", () => {
  it("matches skills case-insensitively and reports gaps", () => {
    expect(scoreSkillFit(["Python", "RAG", "AWS"], ["python", "rag"])).toEqual({
      score: 67,
      matched: ["Python", "RAG"],
      gaps: ["AWS"],
    });
  });
});
