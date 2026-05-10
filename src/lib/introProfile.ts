/** Dev / QA: append `?introProfile=1` or `localStorage.introProfile="1"` to log timings. */

export type IntroProfileEventRow = {
  /** Monotonic ms from profile session start (`performance.now()`). */
  elapsedMs: number;
  segment: string;
  detail?: Record<string, unknown>;
};

export type IntroProfileState = {
  sessionStartMono: number;
  events: IntroProfileEventRow[];
  heroRevealMono?: number;
};

declare global {
  interface Window {
    __INTRO_PROFILE__?: IntroProfileState;
  }
}

export function isIntroProfiling(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      new URLSearchParams(window.location.search).has("introProfile") ||
      localStorage.getItem("introProfile") === "1"
    );
  } catch {
    return false;
  }
}

function ensureState(): IntroProfileState | null {
  if (!isIntroProfiling()) return null;
  if (!window.__INTRO_PROFILE__) {
    window.__INTRO_PROFILE__ = {
      sessionStartMono: performance.now(),
      events: [],
    };
  }
  return window.__INTRO_PROFILE__;
}

export function introProfileLog(
  segment: string,
  detail?: Record<string, unknown>,
): void {
  const st = ensureState();
  if (!st) return;
  const elapsedMs = Math.round((performance.now() - st.sessionStartMono) * 100) / 100;
  const row: IntroProfileEventRow = { elapsedMs, segment, detail };
  st.events.push(row);
  console.log(`[intro-profile] ${JSON.stringify(row)}`);
}

export function introProfileMarkHeroRevealReady(): void {
  const st = ensureState();
  if (!st) return;
  st.heroRevealMono = performance.now();
  introProfileLog("hero:revealReady", {
    sinceSessionMs: Math.round(
      (st.heroRevealMono - st.sessionStartMono) * 100,
    ) / 100,
  });
}

/** Log selected navigation + paint hints once (home mount). */
export function introProfileLogNavigationOnce(): void {
  if (!isIntroProfiling()) return;
  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;
  if (!nav) {
    introProfileLog("perf:navigation", { note: "no NavigationTiming" });
    return;
  }
  introProfileLog("perf:navigation", {
    type: nav.type,
    redirectCount: nav.redirectCount,
    dnsMs: Math.round((nav.domainLookupEnd - nav.domainLookupStart) * 10) / 10,
    tcpMs: Math.round((nav.connectEnd - nav.connectStart) * 10) / 10,
    requestMs: Math.round((nav.responseStart - nav.requestStart) * 10) / 10,
    responseMs: Math.round((nav.responseEnd - nav.responseStart) * 10) / 10,
    domInteractiveMs: Math.round((nav.domInteractive - nav.startTime) * 10) / 10,
    domCompleteMs: Math.round((nav.domComplete - nav.startTime) * 10) / 10,
    loadEventEndMs: Math.round((nav.loadEventEnd - nav.startTime) * 10) / 10,
  });
}
