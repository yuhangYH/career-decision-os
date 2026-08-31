import type { HardConstraint, OpportunityDecision, ScoreDimension } from "@/lib/domain/types";

import { chooseAction } from "./actions";
import { evaluateConstraints } from "./constraints";

export const OPPORTUNITY_WEIGHTS = {
  candidateFit: 0.35,
  careerUpside: 0.2,
  compensation: 0.1,
  actionability: 0.2,
  personalFactors: 0.15,
} as const;

interface OpportunityScoreInput {
  candidateFit: number;
  careerUpside: number;
  compensation: number;
  actionability: number;
  personalFactors: number;
  constraints: HardConstraint[];
  sourceConfidence: number;
  explanationCoverage: number;
  fresh?: boolean;
  networkLeverage?: boolean;
  dimensions?: ScoreDimension[];
  nextActions?: string[];
}

export function validateWeights(weights: Record<string, number>) {
  const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  if (Math.abs(total - 1) > Number.EPSILON * 10) {
    throw new Error(`Scoring weights must sum to 1; received ${total}.`);
  }
}

export function scoreOpportunity(input: OpportunityScoreInput): OpportunityDecision {
  validateWeights(OPPORTUNITY_WEIGHTS);
  const score = Math.round(
    input.candidateFit * OPPORTUNITY_WEIGHTS.candidateFit +
      input.careerUpside * OPPORTUNITY_WEIGHTS.careerUpside +
      input.compensation * OPPORTUNITY_WEIGHTS.compensation +
      input.actionability * OPPORTUNITY_WEIGHTS.actionability +
      input.personalFactors * OPPORTUNITY_WEIGHTS.personalFactors,
  );
  const constraintResult = evaluateConstraints(input.constraints);

  return {
    scoreVersion: "2026-08-v1",
    score,
    action: chooseAction({
      score,
      constraintOutcome: constraintResult.outcome,
      sourceConfidence: input.sourceConfidence,
      explanationCoverage: input.explanationCoverage,
      fresh: input.fresh ?? true,
      networkLeverage: input.networkLeverage ?? false,
    }),
    dimensions: input.dimensions ?? [],
    constraints: input.constraints,
    sourceConfidence: input.sourceConfidence,
    explanationCoverage: input.explanationCoverage,
    nextActions: input.nextActions ?? [],
  };
}
