"use client";

import Link from "next/link";

import { LanguageToggle } from "@/components/i18n/language-toggle";
import { useLocale } from "@/components/i18n/locale-provider";

export function PublicHeader() {
  const { locale } = useLocale();

  return (
    <header className="public-header">
      <div className="container public-header__inner">
        <Link className="brand" href="/" aria-label="Career Decision OS home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="img">
              <path d="M6 8h8v8H6zM18 8h8v5h-8zM6 20h5v6H6zM15 17h11v9H15z" />
            </svg>
          </span>
          <span>
            Career Decision OS
            <small>Evidence → Decision → Action</small>
          </span>
        </Link>
        <nav className="public-nav" aria-label={locale === "zh" ? "公开导航" : "Public navigation"}>
          <Link href="/case-study">{locale === "zh" ? "产品案例" : "Case study"}</Link>
          <Link href="/demo">{locale === "zh" ? "交互演示" : "Live demo"}</Link>
          <Link className="nav-cta" href="/app">
            {locale === "zh" ? "进入工作台" : "Open workspace"}
          </Link>
        </nav>
        <LanguageToggle />
      </div>
    </header>
  );
}
