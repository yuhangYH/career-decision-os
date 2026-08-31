import { afterEach, describe, expect, it } from "vitest";

import {
  createLocalStorageExpansionRepository,
  createMemoryExpansionRepository,
} from "./repository";

const draft = {
  type: "city" as const,
  title: "Toronto",
  officialUrl: "https://example.com/jobs",
  rationale: "English-first AI market",
};

afterEach(() => localStorage.clear());

describe("expansion repository", () => {
  it("creates requests and enforces lifecycle transitions", async () => {
    const repository = createMemoryExpansionRepository();
    const request = await repository.create(draft);

    expect((await repository.list())[0]?.status).toBe("proposed");
    await expect(repository.updateStatus(request.id, "published")).rejects.toThrow(
      "Invalid expansion transition",
    );
    expect((await repository.updateStatus(request.id, "researching")).status).toBe(
      "researching",
    );
  });

  it("persists requests through the local storage adapter", async () => {
    const first = createLocalStorageExpansionRepository(localStorage);
    await first.create(draft);

    const second = createLocalStorageExpansionRepository(localStorage);
    expect((await second.list()).map((request) => request.title)).toEqual([
      "Toronto",
    ]);
  });

  it("rejects non-HTTPS official sources", async () => {
    const repository = createMemoryExpansionRepository();

    await expect(
      repository.create({ ...draft, officialUrl: "http://example.com/jobs" }),
    ).rejects.toThrow("HTTPS official source");
  });
});
