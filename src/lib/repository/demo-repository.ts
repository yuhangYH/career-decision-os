import { targetCities } from "@/lib/seed/cities";
import { targetCompanies } from "@/lib/seed/companies";
import { seedJobs } from "@/lib/seed/jobs";

import type {
  Application,
  CareerRepository,
  Contact,
  CvVersion,
  JobFilters,
  MockInterview,
  WeeklyReview,
} from "./types";

const demoCities = targetCities;
const demoCompanies = targetCompanies;

const demoJobs = seedJobs;

const initialApplications: Application[] = [
  {
    id: "application-1001",
    jobId: "1001-ml-engineer-doha",
    stage: "preparing",
    archivedAt: null,
    events: [
      {
        id: "event-1001",
        stage: "preparing",
        note: "Tailor CV-ML and verify sponsorship.",
        occurredAt: "2026-08-31T09:00:00+04:00",
      },
    ],
  },
];

const contacts: Contact[] = [
  { id: "contact-alumni", name: "Alumni contact", organization: "Professional network", role: "Engineer", relationship: "Warm", nextAction: "Request one role-calibration conversation" },
  { id: "contact-community", name: "Community researcher", organization: "AI community", role: "Researcher", relationship: "Target", nextAction: "Share a concise project-to-role note" },
];

const cvVersions: CvVersion[] = [
  { id: "cv-ml", name: "CV-ML", target: "Applied Scientist / AI Engineer", firstPageThesis: "ML projects + evaluation + engineering", evidenceIds: ["portfolio-timeseries", "experiment-design"], readiness: 78 },
  { id: "cv-agent", name: "CV-Agent", target: "Agent / GenAI Engineer", firstPageThesis: "LLM + RAG + evaluation + deployment", evidenceIds: ["retrieval-evaluation"], readiness: 66 },
  { id: "cv-quant", name: "CV-Quant", target: "Quant Research", firstPageThesis: "Statistics + time-series + reproducible research", evidenceIds: ["portfolio-timeseries", "experiment-design"], readiness: 70 },
  { id: "cv-strategy", name: "CV-Strategy", target: "AI Product / Consulting", firstPageThesis: "AI literacy + impact + leadership + communication", evidenceIds: ["career-os-product", "cross-functional-delivery"], readiness: 74 },
];

const interviews: MockInterview[] = [
  { id: "mock-ml", roleFamily: "ai_ml_engineer", interviewType: "ML system design", score: 78, nextSession: "Production ML trade-offs" },
  { id: "mock-pm", roleFamily: "ai_product", interviewType: "Product sense", score: null, nextSession: "Career Decision OS product case" },
];

const weeklyReview: WeeklyReview = {
  weekStart: "2026-08-31",
  highValueActions: 3,
  applications: 1,
  networkingTouches: 2,
  interviews: 0,
  wins: ["Completed a first target-market comparison"],
  lessons: ["Verify access constraints before deep tailoring"],
  nextFocus: ["Complete five focused actions", "Ship one evaluated agent example"],
};

export function createDemoRepository(): CareerRepository {
  let applications = structuredClone(initialApplications);

  return {
    async listCities() {
      return structuredClone(demoCities);
    },
    async listCompanies() {
      return structuredClone(demoCompanies);
    },
    async listJobs(filters?: JobFilters) {
      const jobs = demoJobs.filter((job) =>
        (!filters?.cityId || job.cityId === filters.cityId) &&
        (!filters?.roleFamily || job.roleFamilies.includes(filters.roleFamily)) &&
        (!filters?.status || job.status === filters.status),
      );
      return structuredClone(jobs);
    },
    async getJob(id) {
      return structuredClone(demoJobs.find((job) => job.id === id) ?? null);
    },
    async getDecision(jobId) {
      const job = demoJobs.find((item) => item.id === jobId);
      if (!job) throw new Error("Job not found");
      return structuredClone(job.decision);
    },
    async listApplications() {
      return structuredClone(applications);
    },
    async moveApplication(id, stage, note) {
      const application = applications.find((item) => item.id === id);
      if (!application) throw new Error("Application not found");
      application.stage = stage;
      application.events.push({
        id: `event-${application.events.length + 1}`,
        stage,
        note,
        occurredAt: new Date().toISOString(),
      });
      applications = structuredClone(applications);
      return structuredClone(application);
    },
    async listContacts() {
      return structuredClone(contacts);
    },
    async listCvVersions() {
      return structuredClone(cvVersions);
    },
    async listMockInterviews() {
      return structuredClone(interviews);
    },
    async getWeeklyReview() {
      return structuredClone(weeklyReview);
    },
  };
}
