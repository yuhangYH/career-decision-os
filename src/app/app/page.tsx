import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { KpiCard } from "@/components/ui/kpi-card";
import { getCareerRepository } from "@/lib/repository";

export default async function CommandCenterPage() {
  const repository = await getCareerRepository();
  const [jobs, applications, cities, review] = await Promise.all([
    repository.listJobs(),
    repository.listApplications(),
    repository.listCities(),
    repository.getWeeklyReview(),
  ]);
  const decisions = await Promise.all(jobs.slice(0, 4).map((job) => repository.getDecision(job.id)));
  const verified = jobs.filter((job) => job.status === "verified_open").length;
  const highPriority = decisions.filter((decision) => decision.score >= 82).length;
  const interviewing = applications.filter((application) => ["assessment", "interviewing", "offer"].includes(application.stage)).length;
  const conversion = applications.length ? Math.round((interviewing / applications.length) * 100) : 0;
  const actionQueue = [
    ...(decisions[0]?.nextActions ?? []),
    ...review.nextFocus,
  ].slice(0, 5);
  const skillCounts = jobs
    .flatMap((job) => job.preferredSkills ?? job.requirements)
    .reduce<Record<string, number>>((counts, skill) => ({ ...counts, [skill]: (counts[skill] ?? 0) + 1 }), {});
  const skillGaps = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Week 36 · Command center"
        title="把这一周变成五个高价值行动"
        description="先处理约束已核验、证据充分且时间敏感的机会；再扩展市场研究。"
        action={<Link className="button button--primary" href="/app/opportunities">查看机会队列</Link>}
      />
      <section className="kpi-grid" aria-label="Weekly career KPIs">
        <KpiCard label="已核验开放岗位" value={verified} detail="Official sources checked" />
        <KpiCard label="高优先级机会" value={highPriority} detail="Score ≥ 82" tone="gold" />
        <KpiCard label="本周待完成行动" value={Math.max(0, 5 - review.highValueActions)} detail={`${review.highValueActions}/5 completed`} tone="blue" />
        <KpiCard label="申请到面试转化" value={`${conversion}%`} detail={`${interviewing} interview-stage`} tone="navy" />
      </section>
      <section className="dashboard-grid">
        <article className="panel card panel--wide">
          <div className="panel__header"><div><span className="eyebrow">Decision queue</span><h2>最高优先级机会</h2></div><Link href="/app/opportunities">查看全部</Link></div>
          <div className="decision-list">
            {jobs.slice(0, 4).map((job, index) => {
              const decision = decisions[index];
              return (
                <Link href={`/app/opportunities/${job.id}`} key={job.id}>
                  <div><strong>{job.title}</strong><span>{job.companyId} · {job.cityId}</span></div>
                  <span className={`action-pill action-pill--${decision?.action ?? "benchmark"}`}>{decision?.action.replaceAll("_", " ")}</span>
                  <strong className="table-score">{decision?.score ?? "—"}</strong>
                </Link>
              );
            })}
          </div>
        </article>
        <article className="panel card">
          <div className="panel__header"><div><span className="eyebrow">This week</span><h2>行动队列</h2></div><span>{review.highValueActions}/5</span></div>
          <ol className="action-list">
            {actionQueue.map((action, index) => <li key={action}><span>{index + 1}</span><p>{action}</p></li>)}
          </ol>
        </article>
        <article className="panel card">
          <div className="panel__header"><div><span className="eyebrow">Market mix</span><h2>城市分布</h2></div><Link href="/app/markets">市场雷达</Link></div>
          <div className="city-mix">
            {cities.slice(0, 5).map((city) => <div key={city.id}><span>{city.nameZh}</span><div className="progress"><span style={{ width: `${city.roleDensity}%` }} /></div><strong>{city.roleDensity}</strong></div>)}
          </div>
        </article>
        <article className="panel card">
          <div className="panel__header"><div><span className="eyebrow">Recurring evidence gaps</span><h2>需要补强的技能</h2></div><Link href="/app/cv">简历工作室</Link></div>
          <div className="skill-gap-list">
            {skillGaps.map(([skill, count], index) => <div key={skill}><span>0{index + 1}</span><strong>{skill}</strong><small>{count} JDs</small></div>)}
          </div>
        </article>
      </section>
    </>
  );
}
