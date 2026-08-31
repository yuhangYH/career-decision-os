"use client";

import type { ReactNode } from "react";

import { LanguageToggle } from "@/components/i18n/language-toggle";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/domain/types";

import { Sidebar } from "./sidebar";

export function AppShell({
  children,
  demo,
  locale,
}: {
  children: ReactNode;
  demo: boolean;
  locale?: Locale;
}) {
  const localeContext = useLocale();
  const activeLocale = locale ?? localeContext.locale;

  return (
    <div className="app-shell">
      <Sidebar locale={activeLocale} />
      <div className="app-main">
        <header className="app-topbar">
          <div>
            <span className="app-topbar__label">
              {activeLocale === "zh" ? "开放演示工作台" : "Open demo workspace"}
            </span>
            {demo ? <span className="demo-badge">{activeLocale === "zh" ? "演示模式" : "Demo workspace"}</span> : null}
          </div>
          <div className="app-topbar__right">
            <span className="refresh-status">
              <span className="status-dot" aria-hidden="true" />
              {activeLocale === "zh" ? "下次刷新：周一 08:00" : "Next refresh: Monday 08:00"}
            </span>
            <LanguageToggle />
          </div>
        </header>
        <main id="main-content" className="app-content">{children}</main>
      </div>
    </div>
  );
}
