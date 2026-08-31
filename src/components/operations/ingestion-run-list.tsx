export interface IngestionRunView {
  id: string;
  status: "success" | "partial_success" | "failed";
  startedAt: string;
  finishedAt: string;
  sourceCount: number;
  created: number;
  changed: number;
  closed: number;
  stale: number;
}

export function IngestionRunList({ runs }: { runs: IngestionRunView[] }) {
  return (
    <section className="panel operations-runs">
      <div className="panel__header"><div><span className="eyebrow">RUN HISTORY</span><h2>每周刷新记录</h2></div><span>Parser html-metadata-v1</span></div>
      <div className="run-table" role="table" aria-label="Ingestion run history">
        <div className="run-row run-row--header" role="row"><span>开始 / 完成</span><span>状态</span><span>来源</span><span>新增</span><span>变化</span><span>关闭</span><span>Stale</span></div>
        {runs.map((run) => (
          <div className="run-row" role="row" key={run.id}>
            <span><strong>{run.startedAt}</strong><small>{run.finishedAt}</small></span>
            <span><i className={`run-status run-status--${run.status}`} />{run.status.replace("_", " ")}</span>
            <span>{run.sourceCount}</span><span>{run.created}</span><span>{run.changed}</span><span>{run.closed}</span><span>{run.stale}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
