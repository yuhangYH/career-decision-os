import type {
  ExpansionRepository,
  ExpansionRequest,
  ExpansionRequestDraft,
  ExpansionRequestStatus,
} from "./types";

export const EXPANSION_STORAGE_KEY = "career-os:expansion-requests:v1";

const transitions: Record<ExpansionRequestStatus, ExpansionRequestStatus[]> = {
  proposed: ["researching", "rejected"],
  researching: ["eligible", "below_threshold", "rejected"],
  eligible: ["published", "researching", "rejected"],
  published: ["researching"],
  below_threshold: ["researching", "rejected"],
  rejected: ["researching"],
};

function validateDraft(draft: ExpansionRequestDraft) {
  if (!draft.title.trim() || !draft.rationale.trim()) {
    throw new Error("Expansion title and rationale are required.");
  }
  if (!draft.officialUrl.startsWith("https://")) {
    throw new Error("Expansion requests require an HTTPS official source.");
  }
  return {
    ...draft,
    title: draft.title.trim(),
    rationale: draft.rationale.trim(),
  };
}

function createRepository(
  read: () => ExpansionRequest[],
  write: (requests: ExpansionRequest[]) => void,
): ExpansionRepository {
  return {
    async list() {
      return structuredClone(read());
    },
    async create(draft) {
      const normalized = validateDraft(draft);
      const timestamp = new Date().toISOString();
      const request: ExpansionRequest = {
        ...normalized,
        id: crypto.randomUUID(),
        status: "proposed",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      write([request, ...read()]);
      return structuredClone(request);
    },
    async updateStatus(id, status) {
      const requests = read();
      const request = requests.find((item) => item.id === id);
      if (!request) throw new Error("Expansion request not found.");
      if (!transitions[request.status].includes(status)) {
        throw new Error(`Invalid expansion transition: ${request.status} → ${status}`);
      }
      const updated = { ...request, status, updatedAt: new Date().toISOString() };
      write(requests.map((item) => item.id === id ? updated : item));
      return structuredClone(updated);
    },
  };
}

export function createMemoryExpansionRepository(
  initial: ExpansionRequest[] = [],
): ExpansionRepository {
  let requests = structuredClone(initial);
  return createRepository(
    () => structuredClone(requests),
    (next) => {
      requests = structuredClone(next);
    },
  );
}

export function createLocalStorageExpansionRepository(
  storage: Storage,
): ExpansionRepository {
  return createRepository(
    () => {
      const stored = storage.getItem(EXPANSION_STORAGE_KEY);
      if (!stored) return [];
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },
    (requests) => storage.setItem(EXPANSION_STORAGE_KEY, JSON.stringify(requests)),
  );
}
