export function KpiCard({
  label,
  value,
  detail,
  tone = "teal",
}: {
  label: string;
  value: string | number;
  detail: string;
  tone?: "teal" | "gold" | "blue" | "navy";
}) {
  return (
    <article className={`kpi-card card kpi-card--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}
