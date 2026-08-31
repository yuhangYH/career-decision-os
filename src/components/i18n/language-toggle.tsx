"use client";

import { useLocale } from "./locale-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="language-toggle" aria-label="语言 / Language">
      <button
        type="button"
        aria-pressed={locale === "zh"}
        onClick={() => setLocale("zh")}
      >
        中文
      </button>
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
