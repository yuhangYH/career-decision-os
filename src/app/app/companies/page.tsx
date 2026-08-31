import { PageHeader } from "@/components/app/page-header";
import { CompanyPortfolio } from "@/components/companies/company-portfolio";
import { targetCities } from "@/lib/seed/cities";
import { companyOffices } from "@/lib/seed/company-offices";
import { targetCompanies } from "@/lib/seed/companies";

export default function CompaniesPage() {
  return (
    <>
      <PageHeader eyebrow="40 → 100 → 150 → 200" title="目标公司不是名单，而是分层研究组合" description="从高意愿、高匹配和高可接近性的公司开始；所有卡片保留官网、城市、角色、吸引力和不确定性。" />
      <CompanyPortfolio companies={targetCompanies} cities={targetCities} offices={companyOffices} />
    </>
  );
}
