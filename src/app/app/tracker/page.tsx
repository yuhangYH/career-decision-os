import { PageHeader } from "@/components/app/page-header";
import { TrackerBoard } from "@/components/tracker/tracker-board";
import { getCareerRepository } from "@/lib/repository";

export default async function TrackerPage() {
  const repository = await getCareerRepository();
  const [applications, jobs] = await Promise.all([
    repository.listApplications(),
    repository.listJobs(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="APPLICATION TRACKER · 行动可审计"
        title="让每个岗位都有明确的下一步"
        description="用显式按钮推进阶段；每次研究、联系、投递和面试都会形成不可静默覆盖的事件记录。归档不会删除历史。"
      />
      <div className="tracker-summary">
        <article><span>进行中</span><strong>{applications.filter((item) => item.stage !== "closed").length}</strong></article>
        <article><span>本周目标</span><strong>5</strong><small>高价值动作</small></article>
        <article><span>申请事件</span><strong>{applications.reduce((sum, item) => sum + item.events.length, 0)}</strong></article>
      </div>
      <TrackerBoard initialApplications={applications} jobs={jobs} />
    </>
  );
}
