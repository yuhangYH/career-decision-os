import { PageHeader } from "@/components/app/page-header";
import { CityPortfolio } from "@/components/markets/city-portfolio";
import { targetCities } from "@/lib/seed/cities";

export default function MarketsPage() {
  return (
    <>
      <PageHeader eyebrow="Global market radar" title="26 个英语工作城市，一套透明比较标准" description="先比较薪酬、岗位密度、英语环境和准入风险，再决定哪里值得投入求职时间。" />
      <CityPortfolio cities={targetCities} />
    </>
  );
}
