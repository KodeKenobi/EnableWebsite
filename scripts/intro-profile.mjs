#!/usr/bin/env node
/**
 * Opens the home page with `?introProfile=1`, performs a full reload, then prints
 * intro → hero milestone timings plus Resource Timing (network) breakdown.
 *
 * Prereqs: app running (e.g. `npm run dev`) and Playwright browsers installed once:
 *   npx playwright install chromium
 *
 * Usage (dev server must already be running):
 *   npm run dev
 *   npm run intro-profile -- http://localhost:5173/
 * If Vite says port 5173 is in use, it may serve on 5174 — pass that URL instead.
 *
 * Env:
 *   INTRO_PROFILE_URL   — default http://localhost:5173/
 *   INTRO_PROFILE_WAIT  — "reveal" (scroll unlock) | "motion" (last hero copy track, default)
 *   PLAYWRIGHT_LAUNCH_TIMEOUT_MS — browser launch wait (default 300000). Raise if launch times out on slow AV scans.
 */
import { chromium } from "playwright";

const launchTimeoutMs = Number(
  process.env.PLAYWRIGHT_LAUNCH_TIMEOUT_MS || "300000",
);

const base =
  process.argv[2] ||
  process.env.INTRO_PROFILE_URL ||
  "http://localhost:5173/";

const waitMode = (process.env.INTRO_PROFILE_WAIT || "motion").toLowerCase();
const waitSegment =
  waitMode === "reveal" ? "hero:revealReady" : "hero:lastMotionApproxDone";

const startUrl = new URL(base.includes("://") ? base : `http://${base}`);
if (startUrl.pathname === "" || startUrl.pathname === "/") {
  startUrl.pathname = "/";
}
startUrl.searchParams.set("introProfile", "1");

function printJson(label, data) {
  console.log(`\n${label}\n${JSON.stringify(data, null, 2)}`);
}

function printConnectionRefusedHint() {
  console.error(
    `\n[intro-profile] ERR_CONNECTION_REFUSED — no HTTP server at ${startUrl.origin}.\n` +
      `  1. Start the app in another terminal:  npm run dev\n` +
      `  2. Use the URL Vite prints. If 5173 is busy, Vite often uses 5174:\n` +
      `     npm run intro-profile -- http://localhost:5174/\n`,
  );
}

async function runOrConnectionHint(fn) {
  try {
    await fn();
  } catch (e) {
    const msg = String(e?.message ?? e);
    if (
      msg.includes("ERR_CONNECTION_REFUSED") ||
      msg.includes("Connection refused")
    ) {
      printConnectionRefusedHint();
    }
    throw e;
  }
}

async function main() {
  console.log(`[intro-profile] URL: ${startUrl.toString()}`);
  console.log(`[intro-profile] Wait milestone: ${waitSegment}`);
  console.log(
    `[intro-profile] Launching Chromium (launch timeout ${launchTimeoutMs}ms)…`,
  );

  const browser = await chromium.launch({
    headless: true,
    timeout: launchTimeoutMs,
  });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    const t = msg.text();
    if (t.includes("[intro-profile]")) {
      process.stdout.write(`[browser] ${t}\n`);
    }
  });

  try {
    console.log("[intro-profile] goto (first load)…");
    await runOrConnectionHint(() =>
      page.goto(startUrl.toString(), {
        waitUntil: "domcontentloaded",
        timeout: 120_000,
      }),
    );

    console.log("[intro-profile] reload…");
    await runOrConnectionHint(() =>
      page.reload({
        waitUntil: "domcontentloaded",
        timeout: 120_000,
      }),
    );

    console.log(
      `[intro-profile] waiting for browser event "${waitSegment}" (up to 180s)…`,
    );
    await page.waitForFunction(
      (segment) => {
        const st = window.__INTRO_PROFILE__;
        return Boolean(st?.events?.some((e) => e.segment === segment));
      },
      waitSegment,
      { timeout: 180_000 },
    );

    console.log("[intro-profile] collecting timings…");
    const report = await page.evaluate((segment) => {
      const st = window.__INTRO_PROFILE__;
      const nav = performance.getEntriesByType("navigation")[0];
      const n = /** @type {PerformanceNavigationTiming | undefined} */ (nav);

      const resources = performance
        .getEntriesByType("resource")
        .map((r) => {
          const e = /** @type {PerformanceResourceTiming} */ (r);
          return {
            name: e.name,
            initiatorType: e.initiatorType,
            durationMs: Math.round(e.duration * 10) / 10,
            queueMs: Math.round((e.requestStart - e.startTime) * 10) / 10,
            downloadMs:
              Math.round((e.responseEnd - e.responseStart) * 10) / 10,
            transferSize: e.transferSize,
            decodedBodySize: e.decodedBodySize,
          };
        })
        .sort((a, b) => b.durationMs - a.durationMs);

      const events = st?.events ?? [];
      const endIdx = events.findIndex((e) => e.segment === segment);
      const endEvent = endIdx >= 0 ? events[endIdx] : events.at(-1);

      const gaps = [];
      for (let i = 1; i < events.length; i++) {
        const prev = events[i - 1];
        const cur = events[i];
        gaps.push({
          from: prev.segment,
          to: cur.segment,
          deltaMs: Math.round((cur.elapsedMs - prev.elapsedMs) * 100) / 100,
        });
      }

      let navSplit = null;
      if (n) {
        const tls =
          n.secureConnectionStart > 0
            ? n.connectEnd - n.secureConnectionStart
            : 0;
        navSplit = {
          type: n.type,
          redirectCount: n.redirectCount,
          dnsMs:
            Math.round((n.domainLookupEnd - n.domainLookupStart) * 10) / 10,
          tcpMs: Math.round((n.connectEnd - n.connectStart) * 10) / 10,
          tlsMs: Math.round(tls * 10) / 10,
          ttfbMs:
            Math.round((n.responseStart - n.requestStart) * 10) / 10,
          responseDownloadMs:
            Math.round((n.responseEnd - n.responseStart) * 10) / 10,
          domInteractiveMs:
            Math.round((n.domInteractive - n.startTime) * 10) / 10,
          domCompleteMs:
            Math.round((n.domComplete - n.startTime) * 10) / 10,
          loadEventEndMs:
            Math.round((n.loadEventEnd - n.startTime) * 10) / 10,
        };
      }

      const totalElapsedToWaitMs =
        endEvent !== undefined ? endEvent.elapsedMs : null;

      return {
        waitSegment: segment,
        totalElapsedMs: totalElapsedToWaitMs,
        heroRevealReadyElapsedMs:
          events.find((e) => e.segment === "hero:revealReady")?.elapsedMs ??
          null,
        sessionEventCount: events.length,
        events,
        milestoneGaps: gaps,
        navigation: navSplit,
        slowResources: resources.slice(0, 40),
      };
    }, waitSegment);

    printJson(`=== Milestones (wait: ${waitSegment}) ===`, {
      totalElapsedMs: report.totalElapsedMs,
      heroRevealReadyElapsedMs: report.heroRevealReadyElapsedMs,
      sessionEventCount: report.sessionEventCount,
    });

    printJson("=== Δ between consecutive milestones (ms) ===", report.milestoneGaps);
    printJson("=== Navigation timing split (reload) ===", report.navigation);

    console.log("\n=== Slowest resources by duration (top 40) ===");
    for (const r of report.slowResources) {
      console.log(
        `${r.durationMs.toFixed(1)}ms\t${r.initiatorType}\t${r.name}`,
      );
    }

    printJson("=== Full milestone log (JSON) ===", report.events);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
