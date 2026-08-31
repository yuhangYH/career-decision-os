"use client";

import { useState, useTransition } from "react";

import { moveApplicationAction } from "@/app/app/tracker/actions";
import type { Job, TrackerStage } from "@/lib/domain/types";
import type { Application } from "@/lib/repository/types";
import { createApplicationEvent } from "@/lib/tracker/transitions";

import { ApplicationCard } from "./application-card";

const boardStages: TrackerStage[] = [
  "saved",
  "researching",
  "networking",
  "preparing",
  "applied",
  "assessment",
  "interviewing",
  "offer",
  "closed",
];

const labels: Record<TrackerStage, string> = {
  saved: "已保存",
  researching: "研究中",
  networking: "Networking",
  preparing: "准备中",
  applied: "已投递",
  assessment: "测评",
  interviewing: "面试中",
  offer: "Offer",
  closed: "已归档",
};

export function TrackerBoard({
  initialApplications,
  jobs,
}: {
  initialApplications: Application[];
  jobs: Job[];
}) {
  const [applications, setApplications] = useState(initialApplications);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function move(application: Application, to: TrackerStage, note: string, restore = false) {
    const previousStage = application.stage;
    const event = createApplicationEvent({
      id: `local-${application.events.length + 1}`,
      from: previousStage,
      stage: to,
      note,
    });

    setApplications((current) => current.map((item) =>
      item.id === application.id
        ? {
            ...item,
            stage: to,
            archivedAt: to === "closed" ? event.occurredAt : null,
            events: [...item.events, event],
          }
        : item,
    ));
    setMessage("阶段已更新，事件历史已保留。");

    startTransition(async () => {
      const result = await moveApplicationAction({
        applicationId: application.id,
        from: previousStage,
        to,
        note,
        restore,
      });
      if (!result.ok) setMessage(`本地演示已更新；云端同步失败：${result.error}`);
    });
  }

  return (
    <div>
      <p className="tracker-status" aria-live="polite">{message}</p>
      <div className="tracker-board" aria-label="申请阶段看板">
        {boardStages.map((stage) => {
          const stageApplications = applications.filter((item) => item.stage === stage);
          return (
            <section className="tracker-column" key={stage} aria-labelledby={`stage-${stage}`}>
              <header>
                <h2 id={`stage-${stage}`}>{labels[stage]}</h2>
                <span>{stageApplications.length}</span>
              </header>
              <div className="tracker-column__items">
                {stageApplications.map((application) => (
                  <ApplicationCard
                    application={application}
                    busy={isPending}
                    job={jobs.find((job) => job.id === application.jobId)}
                    key={application.id}
                    onMove={(to, note, restore) => move(application, to, note, restore)}
                  />
                ))}
                {stageApplications.length === 0 ? <p className="empty-stage">暂无岗位</p> : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
