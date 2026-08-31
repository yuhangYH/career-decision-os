"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/lib/domain/types";
import { messages } from "@/lib/i18n/messages";

const navItems = [
  ["overview", "/app"],
  ["markets", "/app/markets"],
  ["opportunities", "/app/opportunities"],
  ["companies", "/app/companies"],
  ["tracker", "/app/tracker"],
  ["networking", "/app/networking"],
  ["cvStudio", "/app/cv"],
  ["interviews", "/app/interviews"],
  ["weeklyReview", "/app/review"],
  ["operations", "/app/operations"],
  ["settings", "/app/settings"],
] as const;

function NavIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="12" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="12" width="5" height="5" rx="1" />
      <rect x="12" y="12" width="5" height="5" rx="1" />
    </svg>
  );
}

export function Sidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="app-sidebar">
      <Link className="brand app-brand" href="/">
        <span className="brand__mark" aria-hidden="true">
          <svg viewBox="0 0 32 32"><path d="M6 8h8v8H6zM18 8h8v5h-8zM6 20h5v6H6zM15 17h11v9H15z" /></svg>
        </span>
        <span>Career Decision OS<small>Evidence → Decision → Action</small></span>
      </Link>
      <button
        aria-expanded={open}
        aria-controls="workspace-navigation"
        className="mobile-nav-toggle"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>{locale === "zh" ? "工作台菜单" : "Workspace menu"}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14v2H3zm0 4h14v2H3zm0 4h14v2H3z" /></svg>
      </button>
      <nav id="workspace-navigation" className={`app-nav ${open ? "app-nav--open" : ""}`} aria-label={locale === "zh" ? "工作台导航" : "Workspace navigation"}>
        {navItems.map(([key, href]) => (
          <Link
            aria-current={pathname === href ? "page" : undefined}
            href={href}
            key={key}
            onClick={() => setOpen(false)}
          >
            <NavIcon />
            <span>{messages[locale][key]}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="status-dot" aria-hidden="true" />
        <span>{locale === "zh" ? "匿名示例数据" : "Anonymous sample data"}</span>
      </div>
    </aside>
  );
}
