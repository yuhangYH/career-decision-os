import { describe, expect, it } from "vitest";

import { evaluateConstraints } from "./constraints";

describe("evaluateConstraints", () => {
  it("does not let a strong CV hide a citizenship failure", () => {
    const result = evaluateConstraints([
      {
        kind: "citizenship",
        requirement: "Australian citizenship",
        result: "fail",
        evidence: "Candidate is not an Australian citizen",
      },
    ]);

    expect(result.outcome).toBe("fail");
    expect(result.canApply).toBe(false);
  });

  it("allows application with a work-rights verification flag", () => {
    const result = evaluateConstraints([
      {
        kind: "work_authorization",
        requirement: "Qatar work permit",
        result: "verify",
        evidence: "Employer sponsorship not stated",
      },
    ]);

    expect(result.outcome).toBe("verify");
    expect(result.canApply).toBe(true);
  });
});
