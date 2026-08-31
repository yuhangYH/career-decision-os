import type { TrackerStage } from "@/lib/domain/types";
import type { ApplicationEvent } from "@/lib/repository/types";

const activePath: TrackerStage[] = [
  "saved",
  "researching",
  "networking",
  "preparing",
  "applied",
  "assessment",
  "interviewing",
  "offer",
];

export function canTransition(
  from: TrackerStage,
  to: TrackerStage,
  options: { restore?: boolean } = {},
) {
  if (from === "closed") {
    return to === "researching" && options.restore === true;
  }

  if (to === "closed") return true;

  const currentIndex = activePath.indexOf(from);
  return currentIndex >= 0 && activePath[currentIndex + 1] === to;
}

export function nextStage(stage: TrackerStage): TrackerStage | null {
  const currentIndex = activePath.indexOf(stage);
  return currentIndex >= 0 ? (activePath[currentIndex + 1] ?? null) : null;
}

export function createApplicationEvent({
  id,
  from,
  stage,
  note,
  occurredAt = new Date(),
}: {
  id: string;
  from?: TrackerStage;
  stage: TrackerStage;
  note: string;
  occurredAt?: Date;
}): Readonly<ApplicationEvent> {
  const normalizedNote = note.trim();
  const canOmitNote = from === "saved" && stage === "researching";

  if (!normalizedNote && !canOmitNote) {
    throw new Error("A note or next-action statement is required for this transition.");
  }

  return Object.freeze({
    id,
    stage,
    note: normalizedNote,
    occurredAt: occurredAt.toISOString(),
  });
}
