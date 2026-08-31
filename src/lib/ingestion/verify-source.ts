export interface RefreshSnapshot {
  contentHash: string;
  payload: string;
  capturedAt: string;
}

export interface RefreshSource {
  id: string;
  url: string;
  title?: string;
  company?: string;
  city?: string;
  requisitionId?: string;
  closesAt?: string;
  previousSnapshot?: RefreshSnapshot;
}

export type SourceVerification =
  | {
      kind: "available";
      httpStatus: number;
      html: string;
      checkedAt: string;
    }
  | {
      kind: "closed";
      httpStatus: number;
      checkedAt: string;
      message: string;
    }
  | {
      kind: "stale";
      httpStatus: number | null;
      checkedAt: string;
      category: "timeout" | "blocked" | "network" | "empty" | "http";
      message: string;
    };

export async function verifySource(source: RefreshSource): Promise<SourceVerification> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(source.url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Global-AI-Career-OS/1.0 source-verification; contact=site-owner",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const checkedAt = new Date().toISOString();

    if (response.status === 404 || response.status === 410) {
      return {
        kind: "closed",
        httpStatus: response.status,
        checkedAt,
        message: `Official page returned ${response.status}.`,
      };
    }

    if (!response.ok) {
      return {
        kind: "stale",
        httpStatus: response.status,
        checkedAt,
        category: response.status === 401 || response.status === 403 || response.status === 429 ? "blocked" : "http",
        message: `Official page returned HTTP ${response.status}.`,
      };
    }

    const html = await response.text();
    if (!html.trim()) {
      return {
        kind: "stale",
        httpStatus: response.status,
        checkedAt,
        category: "empty",
        message: "Official page returned an empty document.",
      };
    }

    return { kind: "available", httpStatus: response.status, html, checkedAt };
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    return {
      kind: "stale",
      httpStatus: null,
      checkedAt: new Date().toISOString(),
      category: timedOut ? "timeout" : "network",
      message: timedOut ? "Source timed out after 12 seconds." : error instanceof Error ? error.message : "Network request failed.",
    };
  } finally {
    clearTimeout(timer);
  }
}
