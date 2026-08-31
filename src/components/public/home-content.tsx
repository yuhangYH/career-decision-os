"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/locale-provider";

const steps = ["Positions", "Cities", "Companies", "JD", "Skills", "Actions", "Tracker", "Review"];

export function HomeContent() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="hero__label">Open Career Intelligence · 开放职业决策工具</span>
            <h1>
              {zh
                ? "把分散的岗位信息，变成更清晰的职业决策。"
                : "Turn scattered job signals into clearer career decisions."}
            </h1>
            <p>
              {zh
                ? "比较岗位匹配、成长空间、城市、准入条件与下一步行动；无需账户即可使用匿名演示。"
                : "Compare role fit, growth, cities, access constraints and next actions in an account-free, anonymous demo."}
            </p>
            <div className="hero__actions">
              <Link className="button button--gold" href="/demo">
                {zh ? "查看决策演示" : "Explore the decision demo"}
              </Link>
              <Link className="button button--ghost" href="/case-study">
                {zh ? "阅读产品案例" : "Read the product case study"}
              </Link>
            </div>
            <dl className="hero__metrics">
              <div><dt>7</dt><dd>{zh ? "目标岗位族" : "role families"}</dd></div>
              <div><dt>5</dt><dd>{zh ? "全球市场组" : "market groups"}</dd></div>
              <div><dt>95%</dt><dd>{zh ? "解释覆盖目标" : "explanation target"}</dd></div>
            </dl>
          </div>
          <div className="hero__visual" aria-label={zh ? "职业决策流程" : "Career decision workflow"}>
            <div className="radar-card">
              <div className="radar-card__header">
                <span>WEEK 36 · MARKET RADAR</span>
                <i aria-hidden="true" />
              </div>
              <div className="radar-card__score">
                <div><strong>12</strong><span>{zh ? "重点机会" : "priority roles"}</span></div>
                <div><strong>5</strong><span>{zh ? "本周行动" : "actions this week"}</span></div>
              </div>
              <div className="market-bars">
                {[
                  ["GCC", 92], ["Australia", 78], ["Israel", 72], ["New Zealand", 63], ["South Africa", 58],
                ].map(([name, score]) => (
                  <div key={name}>
                    <span>{name}</span>
                    <div className="progress"><span style={{ width: `${score}%` }} /></div>
                    <strong>{score}</strong>
                  </div>
                ))}
              </div>
              <div className="radar-card__footer">
                <span className="badge">{zh ? "官方来源优先" : "Official sources first"}</span>
                <span>{zh ? "下次更新：周一 08:00" : "Next refresh: Mon 08:00"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The operating loop</span>
            <h2>{zh ? "从市场定位到复盘，不再丢失决策上下文" : "Keep decision context from positioning to review"}</h2>
          </div>
          <ol className="workflow" aria-label={zh ? "产品流程" : "Product workflow"}>
            {steps.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
