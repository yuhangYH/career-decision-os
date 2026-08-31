export function StaleState({ sourceUrl, lastSuccess }: { sourceUrl: string; lastSuccess: string }) {
  return (
    <div className="operation-state operation-state--stale" role="status">
      <span aria-hidden="true" />
      <div>
        <strong>Last successful snapshot retained</strong>
        <p>Source access failed; showing the snapshot verified on {lastSuccess}. <a href={sourceUrl} target="_blank" rel="noreferrer">Open source</a></p>
      </div>
    </div>
  );
}
