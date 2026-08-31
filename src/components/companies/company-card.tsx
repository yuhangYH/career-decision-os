import type { TargetCompany } from "@/lib/seed/companies";

export function CompanyCard({ company }: { company: TargetCompany }) {
  return (
    <article className="company-card card">
      <div className="company-card__top"><span className={`tier tier--${company.tier.toLowerCase()}`}>{company.tier}</span><span>{company.fiveYearWillingness}% five-year willingness</span></div>
      <h2>{company.name}</h2>
      <p>{company.whyAttractive}</p>
      <div className="company-tags">{company.roleFamilies.slice(0, 3).map((role) => <span key={role}>{role.replaceAll("_", " ")}</span>)}</div>
      <dl>
        <div><dt>Cities</dt><dd>{company.cityIds.join(" · ")}</dd></div>
        <div><dt>Compensation</dt><dd>{company.compensationPotential}</dd></div>
        <div><dt>Uncertainty</dt><dd>{company.uncertainty}</dd></div>
        <div><dt>Contacts</dt><dd>{company.contactsCount}</dd></div>
      </dl>
      <a className="company-link" href={company.careersUrl} target="_blank" rel="noopener noreferrer">Official careers <span aria-hidden="true">↗</span></a>
    </article>
  );
}
