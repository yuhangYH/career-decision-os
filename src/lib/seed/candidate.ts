import type { CandidateEvidence } from "@/lib/domain/types";

export const candidateEvidence = [
  {
    id: "portfolio-timeseries",
    title: "Time-series portfolio project",
    category: "project",
    claim: "Built a forecasting prototype and documented the validation split, baseline, and error analysis.",
    skills: ["time-series", "machine learning", "evaluation", "Python"],
    source: "Synthetic public demo",
    publicSafe: true,
  },
  {
    id: "retrieval-evaluation",
    title: "Retrieval evaluation prototype",
    category: "project",
    claim: "Created a small evaluation set for retrieval quality and analyzed common failure modes.",
    skills: ["RAG", "LLM evaluation", "information retrieval"],
    source: "Synthetic public demo",
    publicSafe: true,
  },
  {
    id: "experiment-design",
    title: "Reproducible experiment design",
    category: "research",
    claim: "Compared multiple models against a fixed baseline and recorded assumptions and limitations.",
    skills: ["experiment design", "statistics", "technical writing"],
    source: "Synthetic public demo",
    publicSafe: true,
  },
  {
    id: "engineering-stack",
    title: "Engineering foundation",
    category: "education",
    claim: "Built small applications using Python, TypeScript, SQL, APIs, and cloud deployment workflows.",
    skills: ["Python", "TypeScript", "SQL", "APIs"],
    source: "Synthetic public demo",
    publicSafe: true,
  },
  {
    id: "cross-functional-delivery",
    title: "Cross-functional delivery example",
    category: "industry",
    claim: "Translated a loosely defined user problem into milestones, trade-offs, and a measurable release plan.",
    skills: ["product discovery", "stakeholder communication", "prioritization"],
    source: "Synthetic public demo",
    publicSafe: true,
  },
  {
    id: "career-os-product",
    title: "Career Decision OS case study",
    category: "project",
    claim: "Designed an explainable decision product connecting public market research to weekly execution.",
    skills: ["AI product", "prioritization", "data provenance", "UX"],
    source: "Synthetic public demo",
    publicSafe: true,
  },
] satisfies CandidateEvidence[];

export interface CvNarrative {
  id: "cv-ml" | "cv-agent" | "cv-quant" | "cv-strategy";
  name: string;
  target: string;
  thesis: string;
  readiness: number;
  claims: { text: string; evidenceId: string }[];
  gap: string;
}

export const cvNarratives: CvNarrative[] = [
  {
    id: "cv-ml",
    name: "CV-ML",
    target: "Applied Scientist / AI Engineer",
    thesis: "ML projects + evaluation + engineering",
    readiness: 78,
    claims: [
      { text: "Lead with a measurable model result and a clear baseline.", evidenceId: "portfolio-timeseries" },
      { text: "Show reproducible validation and honest limitations.", evidenceId: "experiment-design" },
      { text: "Make the implementation stack visible on page one.", evidenceId: "engineering-stack" },
    ],
    gap: "Add one production deployment story with monitoring and user impact.",
  },
  {
    id: "cv-agent",
    name: "CV-Agent",
    target: "AI Agent / GenAI Engineer",
    thesis: "LLM + RAG + evaluation + deployment",
    readiness: 66,
    claims: [
      { text: "Lead with retrieval evaluation rather than model-name lists.", evidenceId: "retrieval-evaluation" },
      { text: "Use the product case to explain trade-offs and feedback loops.", evidenceId: "career-os-product" },
    ],
    gap: "Ship and evaluate one production-style agent workflow before claiming deployment depth.",
  },
  {
    id: "cv-quant",
    name: "CV-Quant",
    target: "Quantitative Research / Financial ML",
    thesis: "Statistics + time-series + reproducible research",
    readiness: 70,
    claims: [
      { text: "Lead with the time-series experiment and its baseline.", evidenceId: "portfolio-timeseries" },
      { text: "Emphasize leakage prevention and out-of-sample discipline.", evidenceId: "experiment-design" },
      { text: "Make Python and SQL immediately visible.", evidenceId: "engineering-stack" },
    ],
    gap: "Add a finance-specific memo with walk-forward validation and realistic costs.",
  },
  {
    id: "cv-strategy",
    name: "CV-Strategy",
    target: "AI Product / AI Strategy Consulting",
    thesis: "AI literacy + impact + leadership + communication",
    readiness: 74,
    claims: [
      { text: "Turn a technical experiment into a decision and impact narrative.", evidenceId: "experiment-design" },
      { text: "Present Career Decision OS as a product case study.", evidenceId: "career-os-product" },
      { text: "Show scope, trade-offs, and stakeholder alignment.", evidenceId: "cross-functional-delivery" },
    ],
    gap: "Add quantified adoption, user feedback, and roadmap trade-offs from a live product.",
  },
];

export const publicCandidateProfile = {
  name: "Demo Candidate",
  location: "Choose your target market",
  positioning: "A fictional early-career AI candidate learning to turn evidence into focused job-search actions.",
  targetRoles: cvNarratives.map((cv) => cv.target),
  evidence: candidateEvidence.filter((item) => item.publicSafe),
};

export const networkingPaths = [
  { from: "Former classmate", to: "Team engineer", ask: "A short conversation about the team's current problems" },
  { from: "Professional community", to: "Applied scientist", ask: "Feedback on role-specific evidence gaps" },
  { from: "Conference contact", to: "Product manager", ask: "Learn how research becomes a shipped feature" },
  { from: "Alumni network", to: "Hiring team", ask: "Understand the interview loop before applying" },
  { from: "Open-source collaborator", to: "Technical lead", ask: "Request skill calibration for one target role" },
];

export const interviewCategories = [
  { name: "Coding", readiness: 72, next: "Two timed Python problems; explain trade-offs clearly" },
  { name: "ML & statistics", readiness: 78, next: "Explain leakage, calibration, and confidence intervals" },
  { name: "ML system design", readiness: 69, next: "Design monitoring for model and data drift" },
  { name: "Agents & RAG", readiness: 61, next: "Build an evaluation set, failure taxonomy, and tracing" },
  { name: "Quant", readiness: 64, next: "Practice walk-forward validation and cost-aware evaluation" },
  { name: "Consulting case", readiness: 68, next: "Use answer-first structure with one recommendation" },
  { name: "STAR stories", readiness: 70, next: "Prepare six stories with measurable outcomes" },
  { name: "English delivery", readiness: 72, next: "Use concise answers, a calm pace, and deliberate pauses" },
];
