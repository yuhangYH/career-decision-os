export interface ReviewQueueItem {
  id: string;
  sourceUrl: string;
  category: string;
  httpStatus: number | null;
  lastSuccess: string;
  retryState: string;
  message: string;
}

export function ManualReviewQueue({ items }: { items: ReviewQueueItem[] }) {
  return (
    <section className="panel review-queue">
      <div className="panel__header"><div><span className="eyebrow">MANUAL REVIEW</span><h2>需要人工判断</h2></div><span>{items.length} 项</span></div>
      {items.map((item) => (
        <article key={item.id}>
          <div><strong>{item.category}</strong><p>{item.message}</p></div>
          <dl><div><dt>HTTP</dt><dd>{item.httpStatus ?? "—"}</dd></div><div><dt>Last success</dt><dd>{item.lastSuccess}</dd></div><div><dt>Retry</dt><dd>{item.retryState}</dd></div></dl>
          <a href={item.sourceUrl} rel="noreferrer" target="_blank">检查官方来源 ↗</a>
        </article>
      ))}
    </section>
  );
}
