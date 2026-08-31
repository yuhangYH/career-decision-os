import { interviewCategories } from "@/lib/seed/candidate";

export function InterviewReadiness() {
  return (
    <div className="readiness-grid">
      {interviewCategories.map((item) => (
        <article className="readiness-card" key={item.name}>
          <header><h2>{item.name}</h2><strong>{item.readiness}</strong></header>
          <div className="progress-track"><span style={{ width: `${item.readiness}%` }} /></div>
          <p>{item.next}</p>
        </article>
      ))}
      <article className="readiness-card readiness-card--principle">
        <span className="eyebrow">DELIVERY PRINCIPLE</span>
        <h2>Calm · Peaceful · Confident</h2>
        <p>先给结论，再给两点依据；允许停顿，不用语速证明能力。</p>
      </article>
    </div>
  );
}
