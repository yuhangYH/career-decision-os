import type { ConstraintResult, HardConstraint } from "@/lib/domain/types";

export function evaluateConstraints(constraints: HardConstraint[]) {
  const outcome: ConstraintResult = constraints.some(
    (constraint) => constraint.result === "fail",
  )
    ? "fail"
    : constraints.some((constraint) => constraint.result === "verify")
      ? "verify"
      : "pass";

  return {
    outcome,
    canApply: outcome !== "fail",
    failures: constraints.filter((constraint) => constraint.result === "fail"),
    verifications: constraints.filter(
      (constraint) => constraint.result === "verify",
    ),
  };
}
