import type { ActionLabel, ConstraintResult } from "@/lib/domain/types";

interface ActionContext {
  score: number;
  constraintOutcome: ConstraintResult;
  sourceConfidence: number;
  explanationCoverage: number;
  fresh: boolean;
  networkLeverage: boolean;
}

export function chooseAction(context: ActionContext): ActionLabel {
  if (context.constraintOutcome === "fail") return "skip";
  if (
    context.score >= 82 &&
    context.fresh &&
    context.sourceConfidence >= 80 &&
    context.explanationCoverage >= 70
  ) {
    return "apply_now";
  }
  if (context.score >= 78 && context.networkLeverage) return "network_first";
  if (context.score >= 68) return "stretch";
  if (context.score >= 55) return "benchmark";
  return "skip";
}
