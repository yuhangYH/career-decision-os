import { z } from "zod";

const roleFamilySchema = z.enum([
  "ai_ml_engineer",
  "applied_scientist",
  "agent_genai_engineer",
  "data_scientist",
  "ai_product",
  "ai_strategy",
  "quant_financial_ml",
]);

const sourceKindSchema = z.enum([
  "official_ats",
  "official_careers",
  "official_opportunity",
  "platform",
  "aggregator",
]);

const officialSourceKinds = new Set([
  "official_ats",
  "official_careers",
  "official_opportunity",
]);

export const hardConstraintSchema = z.object({
  kind: z.enum([
    "work_authorization",
    "citizenship",
    "clearance",
    "language",
    "years",
    "license",
    "onsite",
  ]),
  requirement: z.string().min(1),
  result: z.enum(["pass", "verify", "fail"]),
  evidence: z.string().min(1),
});

const compensationSchema = z.object({
  kind: z.enum(["employer_stated", "benchmark", "not_stated"]),
  currency: z.string().min(1).nullable(),
  min: z.number().nonnegative().nullable(),
  max: z.number().nonnegative().nullable(),
  sourceUrl: z.string().url().optional(),
  sourceDate: z.string().date().optional(),
});

export const jobSchema = z
  .object({
    id: z.string().min(1),
    companyId: z.string().min(1),
    title: z.string().min(1),
    roleFamilies: z.array(roleFamilySchema).min(1),
    cityId: z.string().min(1),
    officialUrl: z.string().url(),
    careersUrl: z.string().url(),
    discoveryUrl: z.string().url().optional(),
    requisitionId: z.string().optional(),
    sourceKind: sourceKindSchema,
    status: z.enum([
      "verified_open",
      "discovery_lead",
      "closing_soon",
      "closed",
      "stale",
    ]),
    workLanguage: z.string().min(1),
    checkedAt: z.string().datetime({ offset: true }),
    postedAt: z.string().datetime({ offset: true }).optional(),
    closesAt: z.string().datetime({ offset: true }).optional(),
    requirements: z.array(z.string().min(1)),
    responsibilities: z.array(z.string().min(1)),
    preferredSkills: z.array(z.string().min(1)).optional(),
    hardConstraints: z.array(hardConstraintSchema),
    compensation: compensationSchema,
  })
  .superRefine((job, context) => {
    if (job.status !== "verified_open") return;

    if (!job.officialUrl.startsWith("https://")) {
      context.addIssue({
        code: "custom",
        path: ["officialUrl"],
        message: "Verified jobs require an HTTPS official URL.",
      });
    }

    if (!officialSourceKinds.has(job.sourceKind)) {
      context.addIssue({
        code: "custom",
        path: ["sourceKind"],
        message: "Verified jobs require an official source.",
      });
    }
  });

export const citySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  nameZh: z.string().min(1),
  country: z.string().min(1),
  countryZh: z.string().min(1),
  region: z.enum([
    "gcc",
    "israel",
    "australia",
    "new_zealand",
    "south_africa",
    "southeast_asia",
    "greater_china",
    "europe",
  ]),
  compensation: z.number().min(0).max(100),
  roleDensity: z.number().min(0).max(100),
  englishUsability: z.number().min(0).max(100),
  access: z.number().min(0).max(100),
  personalAdvantage: z.number().min(0).max(100),
  careerCapital: z.number().min(0).max(100),
  notes: z.array(z.string()),
});

export const companySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tier: z.enum(["S", "A", "B"]),
  careersUrl: z.string().url(),
  cityIds: z.array(z.string().min(1)),
  roleFamilies: z.array(roleFamilySchema),
  rationale: z.string().min(1),
});

export const companyOfficeSchema = z.object({
  id: z.string().min(1),
  companyId: z.string().min(1),
  cityId: z.string().min(1),
  label: z.string().min(1),
  officialUrl: z.string().url().refine((url) => url.startsWith("https://"), {
    message: "Company office sources must use HTTPS.",
  }),
  evidence: z.enum(["confirmed_office", "careers_market", "research_lead"]),
  checkedAt: z.string().date(),
});

export const candidateEvidenceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(["research", "industry", "project", "leadership", "education"]),
  claim: z.string().min(1),
  skills: z.array(z.string().min(1)),
  source: z.string().min(1),
  publicSafe: z.boolean(),
});

export const opportunityDecisionSchema = z.object({
  scoreVersion: z.literal("2026-08-v1"),
  score: z.number().min(0).max(100),
  action: z.enum(["apply_now", "network_first", "stretch", "benchmark", "skip"]),
  dimensions: z.array(
    z.object({
      key: z.string().min(1),
      label: z.string().min(1),
      score: z.number().min(0).max(100),
      weight: z.number().min(0).max(1),
      jdEvidence: z.array(z.string()),
      candidateEvidence: z.array(z.string()),
      gaps: z.array(z.string()),
    }),
  ),
  constraints: z.array(hardConstraintSchema),
  sourceConfidence: z.number().min(0).max(100),
  explanationCoverage: z.number().min(0).max(100),
  nextActions: z.array(z.string()),
});
