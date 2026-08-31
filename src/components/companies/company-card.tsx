import type { CompanyOffice, Locale } from "@/lib/domain/types";
import type { TargetCity } from "@/lib/seed/cities";
import type { TargetCompany } from "@/lib/seed/companies";

const evidenceLabels = {
  confirmed_office: { zh: "已确认办公室", en: "Confirmed office" },
  careers_market: { zh: "官方招聘市场", en: "Official careers market" },
  research_lead: { zh: "待研究线索", en: "Research lead" },
} as const;

export function CompanyCard({
  company,
  cities,
  offices,
  locale,
}: {
  company: TargetCompany;
  cities: TargetCity[];
  offices: CompanyOffice[];
  locale: Locale;
}) {
  const cityById = new Map(cities.map((city) => [city.id, city]));
  const cityName = (city: TargetCity) => locale === "zh" ? city.nameZh : city.name;
  const visibleOffices = offices.filter((office) => cityById.has(office.cityId)).slice(0, 6);

  return (
    <article className="company-card card">
      <div className="company-card__top"><span className={`tier tier--${company.tier.toLowerCase()}`}>{company.tier}</span><span>{company.fiveYearWillingness}% {locale === "zh" ? "五年意愿" : "five-year willingness"}</span></div>
      <h2>{company.name}</h2>
      <p>{company.whyAttractive}</p>
      <div className="company-tags">{company.roleFamilies.slice(0, 3).map((role) => <span key={role}>{role.replaceAll("_", " ")}</span>)}</div>
      <dl>
        <div><dt>{locale === "zh" ? "城市" : "Cities"}</dt><dd>{cities.map(cityName).join(" · ")}</dd></div>
        <div><dt>{locale === "zh" ? "回报潜力" : "Reward potential"}</dt><dd>{company.compensationPotential}</dd></div>
        <div><dt>{locale === "zh" ? "不确定性" : "Uncertainty"}</dt><dd>{company.uncertainty}</dd></div>
        <div><dt>{locale === "zh" ? "联系人" : "Contacts"}</dt><dd>{company.contactsCount}</dd></div>
      </dl>
      {visibleOffices.length > 0 ? (
        <div className="company-offices">
          <h3>{locale === "zh" ? "分公司与招聘入口" : "Offices & recruiting"}</h3>
          {visibleOffices.map((office) => {
            const officeCity = cityById.get(office.cityId)!;
            const localizedCity = cityName(officeCity);
            return (
              <div key={office.id}>
                <span><strong>{localizedCity}</strong><small>{evidenceLabels[office.evidence][locale]}</small></span>
                <a href={office.officialUrl} target="_blank" rel="noopener noreferrer">{locale === "zh" ? `官方岗位 · ${localizedCity}` : `Official jobs · ${localizedCity}`} ↗</a>
              </div>
            );
          })}
          {offices.length > visibleOffices.length ? <small className="company-offices__more">+{offices.length - visibleOffices.length} {locale === "zh" ? "个已记录城市" : "recorded cities"}</small> : null}
        </div>
      ) : null}
      <a className="company-link" href={company.careersUrl} target="_blank" rel="noopener noreferrer">{locale === "zh" ? "公司招聘官网" : "Official careers"} <span aria-hidden="true">↗</span></a>
    </article>
  );
}
