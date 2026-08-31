import { z } from "zod";

export const extractedJobPageSchema = z.object({
  parserVersion: z.literal("html-metadata-v1"),
  title: z.string().min(1),
  bodyText: z.string().min(1),
  rawHtml: z.string().min(1),
});

export type ExtractedJobPage = z.infer<typeof extractedJobPageSchema>;

export function extractJobPage(html: string): ExtractedJobPage {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    ?.replace(/\s+/g, " ")
    .trim() || "Official job page";
  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  return extractedJobPageSchema.parse({
    parserVersion: "html-metadata-v1",
    title,
    bodyText: bodyText || title,
    rawHtml: html,
  });
}
