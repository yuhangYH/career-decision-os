import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import { PRODUCT_NAME } from "@/lib/config";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: PRODUCT_NAME,
    template: `%s · ${PRODUCT_NAME}`,
  },
  description:
    "A bilingual, evidence-first career decision system for global AI opportunities.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#081f2b",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          跳至主要内容 / Skip to content
        </a>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
