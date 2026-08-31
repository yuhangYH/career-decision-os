import type { HardConstraint } from "@/lib/domain/types";
import { evaluateConstraints } from "@/lib/scoring/constraints";

export function ConstraintGate({ constraints }: { constraints: HardConstraint[] }) {
  const result = evaluateConstraints(constraints);
  return (
    <section className={`constraint-gate constraint-gate--${result.outcome}`}>
      <div><span>Hard-constraint gate</span><strong>{result.outcome === "pass" ? "Passed" : result.outcome === "verify" ? "Verify before applying" : "Not eligible"}</strong></div>
      {constraints.length ? <ul>{constraints.map((constraint) => <li key={`${constraint.kind}-${constraint.requirement}`}><span>{constraint.kind.replaceAll("_", " ")}</span><strong>{constraint.requirement}</strong><p>{constraint.evidence}</p></li>)}</ul> : <p>No explicit hard constraints captured in the official JD.</p>}
    </section>
  );
}
