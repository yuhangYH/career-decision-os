import type { OpportunityDecision } from "@/lib/domain/types";

export function NextActionPanel({ decision }: { decision: OpportunityDecision }) {
  return (
    <aside className="next-action-panel card">
      <span className="eyebrow">Next best action</span>
      <h2>{decision.action.replaceAll("_", " ")}</h2>
      <ol>{decision.nextActions.map((action, index) => <li key={action}><span>{index + 1}</span><p>{action}</p></li>)}</ol>
      <p className="human-review-note">Human review required before any application or outreach is sent.</p>
    </aside>
  );
}
