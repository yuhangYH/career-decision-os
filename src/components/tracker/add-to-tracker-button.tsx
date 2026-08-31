"use client";

import Link from "next/link";
import { useState } from "react";

export function AddToTrackerButton({ jobId }: { jobId: string }) {
  const [added, setAdded] = useState(false);

  function add() {
    localStorage.setItem(`career-os-tracked-${jobId}`, new Date().toISOString());
    setAdded(true);
  }

  return added ? (
    <div className="tracker-add-confirmation" role="status">
      <strong>已加入 Tracker</strong>
      <Link className="button button--primary button--small" href="/app/tracker">打开 Tracker</Link>
    </div>
  ) : (
    <button className="button button--primary" onClick={add} type="button">加入 Tracker</button>
  );
}
