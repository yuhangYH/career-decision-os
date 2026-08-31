import type { CvNarrative } from "@/lib/seed/candidate";

export function CvPortfolio({ variants }: { variants: CvNarrative[] }) {
  return (
    <div className="cv-grid">
      {variants.map((cv) => (
        <article className="cv-card" key={cv.id}>
          <header>
            <div><span className="eyebrow">{cv.name}</span><h2>{cv.target}</h2></div>
            <strong aria-label={`readiness ${cv.readiness} percent`}>{cv.readiness}</strong>
          </header>
          <p className="cv-thesis">第一页：{cv.thesis}</p>
          <ul>
            {cv.claims.map((claim) => <li key={`${cv.id}-${claim.evidenceId}`}>{claim.text}<small>证据：{claim.evidenceId}</small></li>)}
          </ul>
          <div className="gap-callout"><span>下一证据缺口</span><p>{cv.gap}</p></div>
        </article>
      ))}
    </div>
  );
}
