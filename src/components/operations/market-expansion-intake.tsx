"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import {
  createLocalStorageExpansionRepository,
  createMemoryExpansionRepository,
} from "@/lib/expansion/repository";
import type {
  ExpansionRepository,
  ExpansionRequest,
  ExpansionRequestType,
} from "@/lib/expansion/types";

const statusLabels = {
  proposed: { zh: "已提议", en: "Proposed" },
  researching: { zh: "研究中", en: "Researching" },
  eligible: { zh: "已达标", en: "Eligible" },
  published: { zh: "已发布", en: "Published" },
  below_threshold: { zh: "低于门槛", en: "Below threshold" },
  rejected: { zh: "已拒绝", en: "Rejected" },
} as const;

const typeLabels = {
  city: { zh: "城市", en: "City" },
  company: { zh: "公司", en: "Company" },
  position: { zh: "职位", en: "Position" },
} as const;

export function MarketExpansionIntake({
  repository: repositoryProp,
}: {
  repository?: ExpansionRepository;
}) {
  const { locale } = useLocale();
  const repository = useMemo(
    () => repositoryProp ?? (typeof window === "undefined"
      ? createMemoryExpansionRepository()
      : createLocalStorageExpansionRepository(window.localStorage)),
    [repositoryProp],
  );
  const [requests, setRequests] = useState<ExpansionRequest[]>([]);
  const [type, setType] = useState<ExpansionRequestType>("city");
  const [title, setTitle] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [rationale, setRationale] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void repository.list().then(setRequests);
  }, [repository]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await repository.create({ type, title, officialUrl, rationale });
      setRequests(await repository.list());
      setTitle("");
      setOfficialUrl("");
      setRationale("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to add request.");
    }
  }

  return (
    <section className="expansion-intake card" aria-labelledby="expansion-intake-title">
      <div className="expansion-intake__header">
        <div>
          <span className="eyebrow">FUTURE MARKET INTERFACE</span>
          <h2 id="expansion-intake-title">{locale === "zh" ? "市场扩展 Intake" : "Market Expansion Intake"}</h2>
          <p>{locale === "zh" ? "新增城市必须达到综合评分 70 分；公司和职位必须提供官方来源，所有记录先进入研究队列。" : "New cities require a score of 70; companies and positions require an official source, and every record enters research first."}</p>
        </div>
        <span className="filter-count">{requests.length} {locale === "zh" ? "条" : "items"}</span>
      </div>
      <form className="expansion-intake__form" onSubmit={submit}>
        <label>{locale === "zh" ? "类型" : "Type"}<select value={type} onChange={(event) => setType(event.target.value as ExpansionRequestType)}><option value="city">{typeLabels.city[locale]}</option><option value="company">{typeLabels.company[locale]}</option><option value="position">{typeLabels.position[locale]}</option></select></label>
        <label>{locale === "zh" ? "名称 / 标题" : "Name / title"}<input required value={title} onChange={(event) => setTitle(event.target.value)} /></label>
        <label>{locale === "zh" ? "官方来源" : "Official source"}<input required type="url" placeholder="https://…" value={officialUrl} onChange={(event) => setOfficialUrl(event.target.value)} /></label>
        <label className="expansion-intake__rationale">{locale === "zh" ? "为什么值得考虑" : "Why consider it"}<textarea required value={rationale} onChange={(event) => setRationale(event.target.value)} /></label>
        <button type="submit">{locale === "zh" ? "加入研究队列" : "Add to research queue"}</button>
      </form>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <div className="expansion-intake__queue" aria-live="polite">
        {requests.length === 0 ? <p>{locale === "zh" ? "暂无扩展请求。未来城市、公司或职位可以从这里进入验证流程。" : "No expansion requests yet. Future cities, companies, or positions enter validation here."}</p> : requests.map((request) => (
          <article key={request.id}>
            <span className={`expansion-type expansion-type--${request.type}`}>{typeLabels[request.type][locale]}</span>
            <div><strong>{request.title}</strong><p>{request.rationale}</p></div>
            <span className={`expansion-status expansion-status--${request.status}`}>{statusLabels[request.status][locale]}</span>
            <a href={request.officialUrl} target="_blank" rel="noopener noreferrer">{locale === "zh" ? "来源" : "Source"} ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}
