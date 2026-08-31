import type { WeeklyReview as WeeklyReviewData } from "@/lib/repository/types";

export function WeeklyReview({ review }: { review: WeeklyReviewData }) {
  const metrics = [
    ["高价值动作", review.highValueActions],
    ["投递", review.applications],
    ["Networking", review.networkingTouches],
    ["面试", review.interviews],
  ] as const;

  return (
    <div className="review-grid">
      <section className="panel panel--wide">
        <div className="review-metrics">{metrics.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>
      </section>
      <section className="panel"><span className="eyebrow">WINS</span><h2>本周完成</h2><ul className="plain-list">{review.wins.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="panel"><span className="eyebrow">LEARN</span><h2>改变了什么判断</h2><ul className="plain-list">{review.lessons.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="panel panel--wide"><span className="eyebrow">NEXT WEEK</span><h2>下周优先级</h2><ol className="numbered-actions">{review.nextFocus.map((item) => <li key={item}>{item}</li>)}</ol></section>
    </div>
  );
}
