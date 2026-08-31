"use client";

import { useLocale } from "@/components/i18n/locale-provider";

const sections = [
  {
    number: "01",
    title: "Problem",
    titleZh: "问题",
    body: "Job boards optimize for listings, not for choosing where a specific candidate should invest scarce time.",
    bodyZh: "招聘网站优化的是岗位数量，而不是帮助一个具体候选人判断有限时间应该投向哪里。",
  },
  {
    number: "02",
    title: "User",
    titleZh: "用户",
    body: "A job seeker comparing several credible role and location options with limited time.",
    bodyZh: "一位时间有限的求职者，需要在多个可信的岗位与城市选项之间做选择。",
  },
  {
    number: "03",
    title: "Insight",
    titleZh: "洞察",
    body: "The bottleneck is not discovery. It is evidence-based prioritization across roles, cities, access constraints and career capital.",
    bodyZh: "瓶颈不是发现岗位，而是基于证据，在岗位、城市、准入约束和职业资本之间进行优先级判断。",
  },
  {
    number: "04",
    title: "MVP",
    titleZh: "最小可行产品",
    body: "A bilingual market radar, explainable opportunity score, official-source JD dossier and action tracker.",
    bodyZh: "中英双语市场雷达、可解释机会评分、官方来源 JD 档案与行动追踪器。",
  },
  {
    number: "05",
    title: "Iteration",
    titleZh: "迭代",
    body: "Start with a focused employer set, learn from weekly review, then expand only when the workflow stays useful.",
    bodyZh: "从聚焦的公司清单开始，通过每周复盘学习；只有流程持续有效时才继续扩展。",
  },
  {
    number: "06",
    title: "AI Design",
    titleZh: "AI 设计",
    body: "AI extracts semantic evidence and gaps; deterministic rules protect hard constraints, arithmetic and action labels.",
    bodyZh: "AI 负责提取语义证据与差距；确定性规则负责硬性约束、算术评分与动作标签。",
  },
  {
    number: "07",
    title: "Evaluation",
    titleZh: "评估",
    body: "Measure recommendation precision, explanation coverage, decision speed and whether recommendations become accepted actions.",
    bodyZh: "衡量推荐准确率、解释覆盖率、决策速度，以及推荐是否真正转化为被接受的行动。",
  },
  {
    number: "08",
    title: "Outcome",
    titleZh: "结果",
    body: "A repeatable operating system that turns fragmented market signals into five focused career actions each week.",
    bodyZh: "一个可重复运行的系统，把碎片化市场信号转化为每周五个聚焦的职业行动。",
  },
];

export function CaseStudySections() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="case-sections">
      {sections.map((section) => (
        <article className="case-section" key={section.number}>
          <span>{section.number}</span>
          <div>
            <p className="eyebrow">{section.title}</p>
            <h2>{zh ? section.titleZh : section.title}</h2>
            <p>{zh ? section.bodyZh : section.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
