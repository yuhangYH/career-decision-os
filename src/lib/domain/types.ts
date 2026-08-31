export type Locale = "zh" | "en";

export type CityRegion =
  | "gcc"
  | "israel"
  | "australia"
  | "new_zealand"
  | "south_africa"
  | "southeast_asia"
  | "greater_china"
  | "europe";

export type RoleFamily =
  | "ai_ml_engineer"
  | "applied_scientist"
  | "agent_genai_engineer"
  | "data_scientist"
  | "ai_product"
  | "ai_strategy"
  | "quant_financial_ml";

export type JobStatus =
  | "verified_open"
  | "discovery_lead"
  | "closing_soon"
  | "closed"
  | "stale";

export type ActionLabel =
  | "apply_now"
  | "network_first"
  | "stretch"
  | "benchmark"
  | "skip";

export type ConstraintResult = "pass" | "verify" | "fail";

export type SourceKind =
  | "official_ats"
  | "official_careers"
  | "official_opportunity"
  | "platform"
  | "aggregator";

export type TrackerStage =
  | "saved"
  | "researching"
  | "networking"
  | "preparing"
  | "applied"
  | "assessment"
  | "interviewing"
  | "offer"
  | "closed";

export interface Compensation {
  kind: "employer_stated" | "benchmark" | "not_stated";
  currency: string | null;
  min: number | null;
  max: number | null;
  sourceUrl?: string;
  sourceDate?: string;
}

export interface HardConstraint {
  kind:
    | "work_authorization"
    | "citizenship"
    | "clearance"
    | "language"
    | "years"
    | "license"
    | "onsite";
  requirement: string;
  result: ConstraintResult;
  evidence: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  roleFamilies: RoleFamily[];
  cityId: string;
  officialUrl: string;
  careersUrl: string;
  discoveryUrl?: string;
  requisitionId?: string;
  sourceKind: SourceKind;
  status: JobStatus;
  workLanguage: string;
  checkedAt: string;
  postedAt?: string;
  closesAt?: string;
  requirements: string[];
  responsibilities: string[];
  preferredSkills?: string[];
  hardConstraints: HardConstraint[];
  compensation: Compensation;
}

export interface City {
  id: string;
  name: string;
  nameZh: string;
  country: string;
  countryZh: string;
  region: CityRegion;
  compensation: number;
  roleDensity: number;
  englishUsability: number;
  access: number;
  personalAdvantage: number;
  careerCapital: number;
  notes: string[];
}

export interface Company {
  id: string;
  name: string;
  tier: "S" | "A" | "B";
  careersUrl: string;
  cityIds: string[];
  roleFamilies: RoleFamily[];
  rationale: string;
}

export type CompanyOfficeEvidence =
  | "confirmed_office"
  | "careers_market"
  | "research_lead";

export interface CompanyOffice {
  id: string;
  companyId: string;
  cityId: string;
  label: string;
  officialUrl: string;
  evidence: CompanyOfficeEvidence;
  checkedAt: string;
}

export interface CandidateEvidence {
  id: string;
  title: string;
  category: "research" | "industry" | "project" | "leadership" | "education";
  claim: string;
  skills: string[];
  source: string;
  publicSafe: boolean;
}

export interface ScoreDimension {
  key: string;
  label: string;
  score: number;
  weight: number;
  jdEvidence: string[];
  candidateEvidence: string[];
  gaps: string[];
}

export interface OpportunityDecision {
  scoreVersion: "2026-08-v1";
  score: number;
  action: ActionLabel;
  dimensions: ScoreDimension[];
  constraints: HardConstraint[];
  sourceConfidence: number;
  explanationCoverage: number;
  nextActions: string[];
}
