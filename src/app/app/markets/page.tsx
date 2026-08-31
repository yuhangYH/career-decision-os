import { PageHeader } from "@/components/app/page-header";
import { CityPortfolio } from "@/components/markets/city-portfolio";
import { targetCities } from "@/lib/seed/cities";

export default function MarketsPage() {
  return (
    <>
      <PageHeader eyebrow="Global market radar" title={`${targetCities.length} 个 70+ 英语工作城市`} description="统一比较薪酬、岗位密度、英语环境和准入风险；低于 70 分的城市不进入主动求职列表。" />
      <CityPortfolio cities={targetCities} />
    </>
  );
}
