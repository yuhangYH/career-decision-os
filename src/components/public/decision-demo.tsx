"use client";

import { useLocale } from "@/components/i18n/locale-provider";

const dimensions = [
  { label: "Candidate fit", labelZh: "候选人匹配", score: 84 },
  { label: "Career upside", labelZh: "职业上升空间", score: 94 },
  { label: "Compensation", labelZh: "薪酬潜力", score: 70 },
  { label: "Actionability", labelZh: "行动可行性", score: 90 },
  { label: "Personal factors", labelZh: "个人因素", score: 85 },
];

export function DecisionDemo() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <section className="decision-demo card" aria-labelledby="decision-title">
      <div className="decision-demo__topline">
        <span className="badge">{zh ? "已核验开放" : "Verified open"}</span>
        <span className="source-date">{zh ? "核验于 2026-08-31" : "Checked 31 Aug 2026"}</span>
      </div>
      <div className="decision-demo__heading">
        <div>
          <p className="eyebrow">1001 AI · Doha</p>
          <h2 id="decision-title">Machine Learning Engineer</h2>
          <p className="muted">
            {zh ? "AI/ML 工程师 · 应用科学家" : "AI/ML Engineer · Applied Scientist"}
          </p>
        </div>
        <div className="score-ring" aria-label={zh ? "机会评分 86 分" : "Opportunity score 86"}>
          <strong>86</strong>
          <span>/100</span>
        </div>
      </div>
      <div className="decision-demo__action">
        <div>
          <span className="action-kicker">{zh ? "建议动作" : "Recommended action"}</span>
          <strong>{zh ? "立即申请 · Apply now" : "Apply now · 立即申请"}</strong>
        </div>
        <p>{zh ? "硬性约束：通过 · 来源可信度：98%" : "Constraints: pass · Source confidence: 98%"}</p>
      </div>
      <div className="dimension-grid" aria-label={zh ? "机会评分维度" : "Opportunity score dimensions"}>
        {dimensions.map((dimension) => (
          <div className="dimension" key={dimension.label}>
            <div>
              <span>{zh ? dimension.labelZh : dimension.label}</span>
              <strong>{dimension.score}</strong>
            </div>
            <div className="progress" aria-hidden="true">
              <span style={{ width: `${dimension.score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="evidence-grid">
        <article>
          <span className="evidence-label evidence-label--match">{zh ? "已证明的匹配" : "Evidence match"}</span>
          <h3>Documented ML + time-series project</h3>
          <p>{zh ? "匿名示例候选人的项目证据：基线、验证方式与误差分析均可追溯。" : "Fictional candidate evidence with a traceable baseline, validation design and error analysis."}</p>
        </article>
        <article>
          <span className="evidence-label evidence-label--gap">{zh ? "需要补强" : "Evidence gap"}</span>
          <h3>Production cloud evidence</h3>
          <p>{zh ? "用一个可部署的 Agent/RAG 项目补齐端到端云端交付证据。" : "Close the gap with one deployed Agent/RAG project and end-to-end cloud evidence."}</p>
        </article>
      </div>
      <div className="decision-demo__footer">
        <ol>
          <li>{zh ? "用 CV-ML 版本投递" : "Apply with CV-ML"}</li>
          <li>{zh ? "联系一位团队研究员" : "Contact one team researcher"}</li>
          <li>{zh ? "准备生产化案例" : "Prepare a productionization story"}</li>
        </ol>
        <a
          className="button button--primary"
          aria-label="Official JD / 官方 JD"
          href="https://careers.1001.ai/machine-learning-engineer"
          target="_blank"
          rel="noreferrer"
        >
          {zh ? "查看官方 JD" : "View official JD"}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
