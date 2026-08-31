import { networkingPaths } from "@/lib/seed/candidate";

export function NetworkPath() {
  return (
    <div className="studio-layout">
      <section className="panel studio-primary">
        <div className="panel__header"><div><span className="eyebrow">WARM PATHS</span><h2>从共同语境开始，而不是直接索要工作</h2></div><span>目标 5 次 / 周</span></div>
        <div className="network-paths">
          {networkingPaths.map((path, index) => (
            <article key={path.to}>
              <span>{index + 1}</span>
              <div><small>{path.from} →</small><h3>{path.to}</h3><p>{path.ask}</p></div>
            </article>
          ))}
        </div>
      </section>
      <aside className="panel studio-aside">
        <span className="eyebrow">MESSAGE FRAME</span>
        <h2>信息访谈优先</h2>
        <p>“我正在了解这个岗位如何把技术能力转化为真实用户价值。您认为新人最应该先建立哪一类证据？如果合适，我希望用 20 分钟了解团队当前最重视的问题。”</p>
        <dl className="studio-metrics"><div><dt>本周完成</dt><dd>2 / 5</dd></div><div><dt>待跟进</dt><dd>3</dd></div></dl>
      </aside>
    </div>
  );
}
