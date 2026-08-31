"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { TrackerStage } from "@/lib/domain/types";
import { getCareerRepository } from "@/lib/repository";
import { canTransition, createApplicationEvent } from "@/lib/tracker/transitions";

const trackerStageSchema = z.enum([
  "saved",
  "researching",
  "networking",
  "preparing",
  "applied",
  "assessment",
  "interviewing",
  "offer",
  "closed",
]);

const transitionInputSchema = z.object({
  applicationId: z.string().min(1),
  from: trackerStageSchema,
  to: trackerStageSchema,
  note: z.string().max(500),
  restore: z.boolean().default(false),
});

export async function moveApplicationAction(input: unknown) {
  const parsed = transitionInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid tracker update." };
  }

  const { applicationId, from, to, note, restore } = parsed.data;
  if (!canTransition(from as TrackerStage, to as TrackerStage, { restore })) {
    return { ok: false as const, error: "This stage transition is not allowed." };
  }

  try {
    createApplicationEvent({
      id: `pending-${applicationId}`,
      from,
      stage: to,
      note,
    });
    const repository = await getCareerRepository();
    const application = await repository.moveApplication(applicationId, to, note);
    revalidatePath("/app/tracker");
    return { ok: true as const, application };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Unable to update tracker.",
    };
  }
}
