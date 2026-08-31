import type { Metadata } from "next";

import { DecisionDemo } from "@/components/public/decision-demo";
import { PublicHeader } from "@/components/public/public-header";

export const metadata: Metadata = { title: "Decision Demo" };

export default function DemoPage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="public-page">
        <section className="demo-intro container">
          <span className="hero__label">Explainable opportunity decision</span>
          <h1>One recommendation. Every reason visible.</h1>
          <p>This anonymized example shows how official evidence, candidate proof, hard constraints and action design work together.</p>
        </section>
        <div className="container"><DecisionDemo /></div>
      </main>
    </>
  );
}
