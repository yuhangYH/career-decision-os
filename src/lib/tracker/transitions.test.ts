import { describe, expect, it } from "vitest";

import { canTransition, createApplicationEvent } from "./transitions";

describe("application tracker transitions", () => {
  it("allows the auditable happy path", () => {
    const path = [
      "saved",
      "researching",
      "networking",
      "preparing",
      "applied",
      "assessment",
      "interviewing",
      "offer",
    ] as const;

    for (let index = 0; index < path.length - 1; index += 1) {
      expect(
        canTransition(path[index]!, path[index + 1]!, { restore: false }),
      ).toBe(true);
    }
  });

  it("does not silently reopen a closed application", () => {
    expect(canTransition("closed", "applied", { restore: false })).toBe(false);
    expect(canTransition("closed", "researching", { restore: false })).toBe(false);
    expect(canTransition("closed", "researching", { restore: true })).toBe(true);
  });

  it("creates an immutable event with an ISO timestamp and note", () => {
    const event = createApplicationEvent({
      id: "event-2",
      stage: "applied",
      note: "Submitted CV-ML through the official careers page.",
      occurredAt: new Date("2026-08-31T10:00:00.000Z"),
    });

    expect(event.occurredAt).toBe("2026-08-31T10:00:00.000Z");
    expect(event.note).toContain("official careers page");
    expect(Object.isFrozen(event)).toBe(true);
    expect(() => {
      Object.assign(event, { note: "Changed later" });
    }).toThrow();
  });

  it("requires a note after initial research begins", () => {
    expect(() =>
      createApplicationEvent({
        id: "event-3",
        from: "researching",
        stage: "networking",
        note: "",
      }),
    ).toThrow(/note/i);

    expect(() =>
      createApplicationEvent({
        id: "event-4",
        from: "saved",
        stage: "researching",
        note: "",
      }),
    ).not.toThrow();
  });
});
