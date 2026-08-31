import type { Metadata } from "next";
import Link from "next/link";

import { CaseStudySections } from "@/components/public/case-study-sections";
import { PublicHeader } from "@/components/public/public-header";

export const metadata: Metadata = { title: "AI Product Case Study" };

const metrics = [
  ["5", "High-Value Career Actions / week"],
  ["≥ 80%", "Precision@10"],
  ["< 4 min", "Time to decision"],
  ["≥ 70%", "Recommendation acceptance"],
  ["≥ 95%", "Explanation coverage"],
];

export default function CaseStudyPage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="public-page">
        <section className="case-hero container">
          <span className="hero__label">0 → 1 AI Product Case Study</span>
          <h1>Career Decision OS</h1>
          <p>From fragmented job signals to a weekly evidence-based career operating system.</p>
          <div className="metric-strip">
            {metrics.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>
        <section className="container case-layout">
          <aside>
            <span className="eyebrow">Product thesis</span>
            <p>Hard constraints first. Explainable scoring second. Human-reviewed action always.</p>
            <Link className="button button--primary" href="/demo">Open interactive demo</Link>
          </aside>
          <CaseStudySections />
        </section>
      </main>
    </>
  );
}
