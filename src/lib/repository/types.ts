import type {
  City,
  Company,
  Job,
  OpportunityDecision,
  RoleFamily,
  TrackerStage,
} from "@/lib/domain/types";

export interface JobFilters {
  cityId?: string;
  roleFamily?: RoleFamily;
  status?: Job["status"];
}

export interface ApplicationEvent {
  id: string;
  stage: TrackerStage;
  note: string;
  occurredAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  stage: TrackerStage;
  archivedAt: string | null;
  events: ApplicationEvent[];
}

export interface Contact {
  id: string;
  name: string;
  organization: string;
  role: string;
  relationship: string;
  nextAction: string;
}

export interface CvVersion {
  id: "cv-ml" | "cv-agent" | "cv-quant" | "cv-strategy";
  name: string;
  target: string;
  firstPageThesis: string;
  evidenceIds: string[];
  readiness: number;
}

export interface MockInterview {
  id: string;
  roleFamily: RoleFamily;
  interviewType: string;
  score: number | null;
  nextSession: string;
}

export interface WeeklyReview {
  weekStart: string;
  highValueActions: number;
  applications: number;
  networkingTouches: number;
  interviews: number;
  wins: string[];
  lessons: string[];
  nextFocus: string[];
}

export interface CareerRepository {
  listCities(): Promise<City[]>;
  listCompanies(): Promise<Company[]>;
  listJobs(filters?: JobFilters): Promise<Job[]>;
  getJob(id: string): Promise<Job | null>;
  getDecision(jobId: string): Promise<OpportunityDecision>;
  listApplications(): Promise<Application[]>;
  moveApplication(
    id: string,
    stage: TrackerStage,
    note: string,
  ): Promise<Application>;
  listContacts(): Promise<Contact[]>;
  listCvVersions(): Promise<CvVersion[]>;
  listMockInterviews(): Promise<MockInterview[]>;
  getWeeklyReview(): Promise<WeeklyReview>;
}
