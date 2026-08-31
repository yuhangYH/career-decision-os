import { describe, expect, it } from "vitest";

import { createDemoRepository } from "./demo-repository";

describe("demo repository", () => {
  it("returns defensive copies and preserves tracker history", async () => {
    const repo = createDemoRepository();
    const before = await repo.listApplications();

    await repo.moveApplication(
      "application-1001",
      "interviewing",
      "ML screen booked",
    );
    const after = await repo.listApplications();

    expect(before.find((item) => item.id === "application-1001")?.stage).not.toBe(
      "interviewing",
    );
    expect(
      after.find((item) => item.id === "application-1001")?.events.at(-1)?.note,
    ).toBe("ML screen booked");
  });
});
