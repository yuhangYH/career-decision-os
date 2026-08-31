"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/app/page-header";

const initialWeights = { capability: 30, interest: 20, growth: 20, compensation: 15, location: 15 };

export default function SettingsPage() {
  const [weights, setWeights] = useState(initialWeights);
  const total = useMemo(() => Object.values(weights).reduce((sum, value) => sum + value, 0), [weights]);

  function exportSettings() {
    const file = new Blob([JSON.stringify({ locale: "zh/en", timezone: "Asia/Dubai", weights }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "career-decision-os-settings.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader eyebrow="SETTINGS · 控制面板" title="让系统适应你的目标，而不是相反" description="语言、时区、决策权重、目标地区与来源都可调整；导出与删除账户明确分开。" />
      <div className="settings-grid">
        <section className="panel settings-section"><span className="eyebrow">PREFERENCES</span><h2>基本设置</h2><label>默认语言<select defaultValue="zh"><option value="zh">中文</option><option value="en">English</option></select></label><label>时区<select defaultValue="Asia/Dubai"><option>Asia/Dubai</option><option>Australia/Sydney</option><option>Pacific/Auckland</option></select></label><label>每周刷新<input readOnly value="每周一 08:00" /></label></section>
        <section className="panel settings-section"><span className="eyebrow">DECISION MODEL</span><h2>五项决策权重</h2>{Object.entries(weights).map(([key, value]) => <label key={key}><span>{key}<strong>{value}%</strong></span><input min="0" max="100" type="range" value={value} onChange={(event) => setWeights((current) => ({ ...current, [key]: Number(event.target.value) }))} /></label>)}<p className={total === 100 ? "weight-total weight-total--valid" : "weight-total weight-total--invalid"}>总计 {total}% · {total === 100 ? "有效" : "必须等于 100%"}</p></section>
        <section className="panel settings-section"><span className="eyebrow">SCOPE & SOURCES</span><h2>地区与来源</h2><fieldset><legend>目标地区</legend>{["GCC", "Israel", "Australia", "New Zealand", "South Africa"].map((region) => <label className="check-row" key={region}><input defaultChecked type="checkbox" />{region}</label>)}</fieldset><fieldset><legend>启用来源</legend>{["Official careers", "Official ATS", "LinkedIn discovery", "Indeed discovery", "Glassdoor discovery"].map((source) => <label className="check-row" key={source}><input defaultChecked type="checkbox" />{source}</label>)}</fieldset><button className="button button--secondary" onClick={exportSettings} type="button">导出设置 JSON</button></section>
        <section className="panel settings-section danger-zone"><span className="eyebrow">ACCOUNT</span><h2>账户删除</h2><p>删除云端账户与私有数据是不可逆操作；导出不会删除任何内容。</p><button className="button button--danger" type="button">请求删除账户</button></section>
      </div>
    </>
  );
}
