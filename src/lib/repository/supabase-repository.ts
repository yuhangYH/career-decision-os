import type { SupabaseClient } from "@supabase/supabase-js";

import type { City, Company, Job, OpportunityDecision, TrackerStage } from "@/lib/domain/types";
import { createClient } from "@/lib/supabase/server";

import type {
  CareerRepository,
  Contact,
  CvVersion,
  JobFilters,
  MockInterview,
  WeeklyReview,
} from "./types";

type Row = Record<string, unknown>;

function requireData<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  if (data === null) throw new Error("Expected data was not returned.");
  return data;
}

function mapJob(row: Row): Job {
  return {
    id: String(row.id),
    companyId: String(row.company_id),
    title: String(row.title),
    roleFamilies: (row.role_families ?? []) as Job["roleFamilies"],
    cityId: String(row.city_id),
    officialUrl: String(row.official_url),
    careersUrl: String(row.careers_url),
    discoveryUrl: row.discovery_url ? String(row.discovery_url) : undefined,
    sourceKind: row.source_kind as Job["sourceKind"],
    status: row.status as Job["status"],
    workLanguage: String(row.work_language),
    checkedAt: String(row.checked_at),
    postedAt: row.posted_at ? String(row.posted_at) : undefined,
    closesAt: row.closes_at ? String(row.closes_at) : undefined,
    requirements: (row.requirements ?? []) as string[],
    responsibilities: (row.responsibilities ?? []) as string[],
    hardConstraints: (row.hard_constraints ?? []) as Job["hardConstraints"],
    compensation: row.compensation as Job["compensation"],
  };
}

export function createSupabaseRepository(clientPromise: Promise<SupabaseClient> = createClient()): CareerRepository {
  return {
    async listCities() {
      const client = await clientPromise;
      const { data, error } = await client.from("cities").select("*").order("name");
      return requireData(data, error).map((row: Row) => ({
        id: String(row.id), name: String(row.name), nameZh: String(row.name_zh), country: String(row.country), countryZh: String(row.country_zh), region: String(row.region) as City["region"],
        compensation: Number((row.attributes as Row)?.compensation ?? 0), roleDensity: Number((row.attributes as Row)?.roleDensity ?? 0), englishUsability: Number((row.attributes as Row)?.englishUsability ?? 0), access: Number((row.attributes as Row)?.access ?? 0), personalAdvantage: Number((row.attributes as Row)?.personalAdvantage ?? 0), careerCapital: Number((row.attributes as Row)?.careerCapital ?? 0), notes: ((row.attributes as Row)?.notes ?? []) as string[],
      }));
    },
    async listCompanies() {
      const client = await clientPromise;
      const { data, error } = await client.from("companies").select("*, company_tiers(tier, rationale)").order("name");
      return requireData(data, error).map((row: Row) => {
        const tiers = (row.company_tiers ?? []) as Row[];
        return { id: String(row.id), name: String(row.name), tier: (tiers[0]?.tier ?? "B") as Company["tier"], careersUrl: String(row.careers_url), cityIds: row.city_ids as string[], roleFamilies: row.role_families as Company["roleFamilies"], rationale: String(tiers[0]?.rationale ?? "Research target") };
      });
    },
    async listJobs(filters?: JobFilters) {
      const client = await clientPromise;
      let query = client.from("jobs").select("*").order("checked_at", { ascending: false });
      if (filters?.cityId) query = query.eq("city_id", filters.cityId);
      if (filters?.status) query = query.eq("status", filters.status);
      if (filters?.roleFamily) query = query.contains("role_families", [filters.roleFamily]);
      const { data, error } = await query;
      return requireData(data, error).map((row: Row) => mapJob(row));
    },
    async getJob(id) {
      const client = await clientPromise;
      const { data, error } = await client.from("jobs").select("*").eq("id", id).maybeSingle();
      if (error) throw new Error(error.message);
      return data ? mapJob(data as Row) : null;
    },
    async getDecision(jobId) {
      const client = await clientPromise;
      const { data, error } = await client.from("match_runs").select("*").eq("job_id", jobId).order("created_at", { ascending: false }).limit(1).single();
      const row = requireData(data, error) as Row;
      return { scoreVersion: "2026-08-v1", score: Number(row.score), action: row.action as OpportunityDecision["action"], dimensions: row.dimensions as OpportunityDecision["dimensions"], constraints: row.constraints as OpportunityDecision["constraints"], sourceConfidence: Number(row.source_confidence), explanationCoverage: Number(row.explanation_coverage), nextActions: (row.next_actions ?? []) as string[] };
    },
    async listApplications() {
      const client = await clientPromise;
      const { data, error } = await client.from("applications").select("*, application_events(*)").order("updated_at", { ascending: false });
      return requireData(data, error).map((row: Row) => ({ id: String(row.id), jobId: String(row.job_id), stage: row.stage as TrackerStage, archivedAt: row.archived_at ? String(row.archived_at) : null, events: ((row.application_events ?? []) as Row[]).map((event) => ({ id: String(event.id), stage: event.stage as TrackerStage, note: String(event.note), occurredAt: String(event.occurred_at) })) }));
    },
    async moveApplication(id, stage, note) {
      const client = await clientPromise;
      const { data: auth } = await client.auth.getUser();
      if (!auth.user) throw new Error("Authentication required");
      const { error: updateError } = await client.from("applications").update({ stage, updated_at: new Date().toISOString() }).eq("id", id);
      if (updateError) throw new Error(updateError.message);
      const { error: eventError } = await client.from("application_events").insert({ user_id: auth.user.id, application_id: id, stage, note });
      if (eventError) throw new Error(eventError.message);
      const applications = await this.listApplications();
      const application = applications.find((item) => item.id === id);
      if (!application) throw new Error("Application not found after update");
      return application;
    },
    async listContacts() {
      const client = await clientPromise;
      const { data, error } = await client.from("contacts").select("*").order("name");
      return requireData(data, error).map((row: Row): Contact => ({ id: String(row.id), name: String(row.name), organization: String(row.organization), role: String(row.role), relationship: String(row.relationship), nextAction: String(row.notes) }));
    },
    async listCvVersions() {
      const client = await clientPromise;
      const { data, error } = await client.from("cv_versions").select("*").order("slug");
      return requireData(data, error).map((row: Row) => ({ id: row.slug as CvVersion["id"], name: String(row.slug).toUpperCase(), target: String(row.target), firstPageThesis: String(row.first_page_thesis), evidenceIds: row.evidence_ids as string[], readiness: Number(row.readiness) }));
    },
    async listMockInterviews() {
      const client = await clientPromise;
      const { data, error } = await client.from("mock_interviews").select("*").order("scheduled_at");
      return requireData(data, error).map((row: Row) => ({ id: String(row.id), roleFamily: row.role_family as MockInterview["roleFamily"], interviewType: String(row.interview_type), score: row.score === null ? null : Number(row.score), nextSession: String(row.notes) }));
    },
    async getWeeklyReview() {
      const client = await clientPromise;
      const { data, error } = await client.from("weekly_reviews").select("*").order("week_start", { ascending: false }).limit(1).single();
      const row = requireData(data, error) as Row;
      const metrics = row.metrics as Row;
      return { weekStart: String(row.week_start), highValueActions: Number(metrics.highValueActions ?? 0), applications: Number(metrics.applications ?? 0), networkingTouches: Number(metrics.networkingTouches ?? 0), interviews: Number(metrics.interviews ?? 0), wins: row.wins as string[], lessons: row.lessons as string[], nextFocus: row.next_focus as string[] } satisfies WeeklyReview;
    },
  };
}
