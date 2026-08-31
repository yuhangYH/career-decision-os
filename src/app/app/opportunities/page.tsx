import { PageHeader } from "@/components/app/page-header";
import { OpportunityTable } from "@/components/opportunities/opportunity-table";
import { seedJobs } from "@/lib/seed/jobs";

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader eyebrow="Official-source opportunity intelligence" title="JD 不只是链接，而是一份可执行决策档案" description="官网与 ATS 是唯一权威状态来源；发现平台只进入待核验队列。关闭岗位保留为技能与市场基准。" />
      <OpportunityTable jobs={seedJobs} />
    </>
  );
}
