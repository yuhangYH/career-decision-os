import type { OpportunityDecision } from "@/lib/domain/types";

export function ScoreMatrix({ decision }: { decision: OpportunityDecision }) {
  return (
    <section className="score-matrix card">
      <div className="score-matrix__header"><div><span className="eyebrow">Explainable score · {decision.scoreVersion}</span><h2>Why this score?</h2></div><div className="score-ring"><strong>{decision.score}</strong><span>/100</span></div></div>
      <div className="score-matrix__rows">
        {decision.dimensions.map((dimension) => (
          <article key={dimension.key}>
            <div className="score-matrix__dimension"><span>{dimension.label}</span><small>{Math.round(dimension.weight * 100)}%</small><strong>{dimension.score}</strong></div>
            <div className="progress"><span style={{ width: `${dimension.score}%` }} /></div>
            <div className="evidence-columns"><div><span>JD evidence</span>{dimension.jdEvidence.map((item) => <p key={item}>{item}</p>)}</div><div><span>Candidate proof</span>{dimension.candidateEvidence.map((item) => <p key={item}>{item}</p>)}</div><div><span>Gaps</span>{dimension.gaps.length ? dimension.gaps.map((item) => <p key={item}>{item}</p>) : <p>None material</p>}</div></div>
          </article>
        ))}
      </div>
      <div className="score-quality"><span>Source confidence <strong>{decision.sourceConfidence}%</strong></span><span>Explanation coverage <strong>{decision.explanationCoverage}%</strong></span></div>
    </section>
  );
}
