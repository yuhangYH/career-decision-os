export type ExpansionRequestType = "city" | "company" | "position";

export type ExpansionRequestStatus =
  | "proposed"
  | "researching"
  | "eligible"
  | "published"
  | "below_threshold"
  | "rejected";

export interface ExpansionRequestDraft {
  type: ExpansionRequestType;
  title: string;
  officialUrl: string;
  rationale: string;
}

export interface ExpansionRequest extends ExpansionRequestDraft {
  id: string;
  status: ExpansionRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ExpansionRepository {
  list(): Promise<ExpansionRequest[]>;
  create(draft: ExpansionRequestDraft): Promise<ExpansionRequest>;
  updateStatus(
    id: string,
    status: ExpansionRequestStatus,
  ): Promise<ExpansionRequest>;
}
