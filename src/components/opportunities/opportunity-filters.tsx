"use client";

export interface OpportunityFilterState {
  city: string;
  role: string;
  status: string;
  action: string;
}

export function OpportunityFilters({
  filters,
  cities,
  onChange,
  count,
}: {
  filters: OpportunityFilterState;
  cities: string[];
  onChange: (filters: OpportunityFilterState) => void;
  count: number;
}) {
  const update = (key: keyof OpportunityFilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="filter-bar opportunity-filter card">
      <label>City<select value={filters.city} onChange={(event) => update("city", event.target.value)}><option value="all">All cities</option>{cities.map((city) => <option key={city}>{city}</option>)}</select></label>
      <label>Role family<select value={filters.role} onChange={(event) => update("role", event.target.value)}><option value="all">All role families</option><option value="ai_ml_engineer">AI/ML Engineer</option><option value="applied_scientist">Applied Scientist</option><option value="agent_genai_engineer">Agent / GenAI</option><option value="data_scientist">Data Scientist</option><option value="ai_product">AI Product</option><option value="ai_strategy">AI Strategy</option><option value="quant_financial_ml">Quant / Financial ML</option></select></label>
      <label>Status<select value={filters.status} onChange={(event) => update("status", event.target.value)}><option value="all">All statuses</option><option value="verified_open">Verified open</option><option value="discovery_lead">Discovery lead</option><option value="closed">Closed / archived</option></select></label>
      <label>Action<select value={filters.action} onChange={(event) => update("action", event.target.value)}><option value="all">All actions</option><option value="apply_now">Apply now</option><option value="network_first">Network first</option><option value="stretch">Stretch</option><option value="benchmark">Benchmark</option><option value="skip">Skip</option></select></label>
      <span className="filter-count">{count} roles</span>
    </div>
  );
}
