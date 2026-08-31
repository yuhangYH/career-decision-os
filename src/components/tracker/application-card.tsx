"use client";

import type { Job, TrackerStage } from "@/lib/domain/types";
import type { Application } from "@/lib/repository/types";
import { nextStage } from "@/lib/tracker/transitions";

const stageLabels: Record<TrackerStage, string> = {
  saved: "已保存",
  researching: "研究中",
  networking: "建立连接",
  preparing: "准备申请",
  applied: "已投递",
  assessment: "测评",
  interviewing: "面试中",
  offer: "Offer",
  closed: "已归档",
};

export function ApplicationCard({
  application,
  job,
  busy,
  onMove,
}: {
  application: Application;
  job?: Job;
  busy: boolean;
  onMove: (to: TrackerStage, note: string, restore?: boolean) => void;
}) {
  const next = nextStage(application.stage);
  const lastEvent = application.events.at(-1);

  return (
    <article className="application-card">
      <div>
        <span className="eyebrow">{job?.cityId ?? "Opportunity"}</span>
        <h3>{job?.title ?? application.jobId}</h3>
        <p>{lastEvent?.note || "Add research notes before progressing."}</p>
      </div>
      <dl className="application-meta">
        <div><dt>阶段</dt><dd>{stageLabels[application.stage]}</dd></div>
        <div><dt>事件</dt><dd>{application.events.length}</dd></div>
      </dl>
      <div className="application-actions">
        {application.stage === "closed" ? (
          <button
            className="button button--secondary button--small"
            disabled={busy}
            onClick={() => onMove("researching", "Restored for renewed role research.", true)}
            type="button"
          >
            恢复到研究中
          </button>
        ) : (
          <>
            {next ? (
              <button
                className="button button--primary button--small"
                disabled={busy}
                onClick={() => onMove(next, `Next action recorded: move to ${next}.`)}
                type="button"
              >
                移至 {stageLabels[next]}
              </button>
            ) : null}
            <button
              className="text-button"
              disabled={busy}
              onClick={() => onMove("closed", "Archived; history preserved.")}
              type="button"
            >
              归档
            </button>
          </>
        )}
      </div>
    </article>
  );
}
