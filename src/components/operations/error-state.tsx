export type ErrorStateKind = "closed" | "salary" | "parser" | "automation";

const language: Record<Exclude<ErrorStateKind, "automation">, { title: string; detail: string }> = {
  closed: {
    title: "Archived; history preserved",
    detail: "The official role is no longer available. Notes, evidence and tracker events remain accessible.",
  },
  salary: {
    title: "Not stated by employer",
    detail: "No salary has been inferred. Add a dated benchmark only when its source and currency are recorded.",
  },
  parser: {
    title: "Manual review required",
    detail: "The source was reachable, but its structure could not be interpreted with sufficient confidence.",
  },
};

export function ErrorState({
  kind,
  lastSuccessfulDigest,
}: {
  kind: ErrorStateKind;
  lastSuccessfulDigest?: string;
}) {
  const content = kind === "automation"
    ? {
        title: "Weekly automation needs attention",
        detail: `Last successful digest: ${lastSuccessfulDigest ?? "not available"}. Existing records have not been overwritten.`,
      }
    : language[kind];

  return (
    <div className={`operation-state operation-state--${kind}`} role="status">
      <span aria-hidden="true" />
      <div><strong>{content.title}</strong><p>{content.detail}</p></div>
    </div>
  );
}
