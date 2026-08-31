"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { Locale } from "@/lib/domain/types";
import { messages, type MessageKey } from "@/lib/i18n/messages";

const STORAGE_KEY = "career-os-locale";
const LOCALE_EVENT = "career-os-locale-change";

function readLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "zh";
}

function subscribeToLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LOCALE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LOCALE_EVENT, onStoreChange);
  };
}

function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

function readServerLocale(): Locale {
  return "zh";
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    readLocale,
    readServerLocale,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: persistLocale,
      t: (key) => messages[locale][key],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  return context ?? {
    locale: "zh",
    setLocale: persistLocale,
    t: (key: MessageKey) => messages.zh[key],
  };
}
