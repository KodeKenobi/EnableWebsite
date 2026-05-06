import { useState, useCallback, useEffect } from "react";
import IntroLoader from "./components/IntroLoader.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import ServicesSection from "./components/ServicesSection.tsx";
import CookiesModal from "./components/modals/CookiesModal.tsx";
import DisclaimersPage from "./disclaimers/DisclaimersPage.tsx";
import "./App.css";

/** Same-tab refresh skips intro after first completion; new tab shows intro again. */
const INTRO_SEEN_SESSION_KEY = "enable-intro-seen";

function hasSeenIntroThisSession(): boolean {
  try {
    return globalThis.sessionStorage?.getItem(INTRO_SEEN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function App() {
  const [introDone, setIntroDone] = useState(hasSeenIntroThisSession);
  const [route, setRoute] = useState(() => {
    const { pathname, hash } = window.location;
    return pathname === "/disclaimers" || hash === "#/disclaimers"
      ? "disclaimers"
      : "home";
  });

  useEffect(() => {
    const syncRoute = () => {
      const { pathname, hash } = window.location;
      setRoute(
        pathname === "/disclaimers" || hash === "#/disclaimers"
          ? "disclaimers"
          : "home",
      );
    };

    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  useEffect(() => {
    if (route !== "home") return;

    const computeTargetProgress = () => {
      const vh = Math.max(window.innerHeight, 1);
      // Reach full shrink earlier (first ~60% of viewport scroll).
      return Math.min(Math.max(window.scrollY / (vh * 0.6), 0), 1);
    };

    const root = document.documentElement;
    let rafId = 0;
    let current = 0;
    let target = 0;

    const tick = () => {
      current += (target - current) * 0.18;
      const scale = 1 - current * 0.11;
      const opacity = Math.max(0, 1 - current * 1.35);
      root.style.setProperty("--hero-text-progress", current.toFixed(4));
      root.style.setProperty("--hero-text-scale", scale.toFixed(4));
      root.style.setProperty("--hero-text-opacity", opacity.toFixed(4));

      if (Math.abs(target - current) > 0.001) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        current = target;
        const settledScale = 1 - current * 0.11;
        const settledOpacity = Math.max(0, 1 - current * 1.35);
        root.style.setProperty("--hero-text-progress", current.toFixed(4));
        root.style.setProperty("--hero-text-scale", settledScale.toFixed(4));
        root.style.setProperty(
          "--hero-text-opacity",
          settledOpacity.toFixed(4),
        );
        rafId = 0;
      }
    };

    const onScroll = () => {
      target = computeTargetProgress();
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    target = computeTargetProgress();
    current = target;
    root.style.setProperty("--hero-text-progress", current.toFixed(4));
    root.style.setProperty(
      "--hero-text-scale",
      (1 - current * 0.11).toFixed(4),
    );
    root.style.setProperty(
      "--hero-text-opacity",
      Math.max(0, 1 - current * 1.35).toFixed(4),
    );
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      root.style.setProperty("--hero-text-progress", "0");
      root.style.setProperty("--hero-text-scale", "1");
      root.style.setProperty("--hero-text-opacity", "1");
    };
  }, [route]);

  const handleIntroComplete = useCallback(() => {
    try {
      globalThis.sessionStorage?.setItem(INTRO_SEEN_SESSION_KEY, "1");
    } catch {
      /* private mode / denied */
    }
    setIntroDone(true);
  }, []);

  if (route === "disclaimers") {
    return <DisclaimersPage />;
  }

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-bg)]">
      <div className="fixed inset-0 z-0">
        <Hero introDone={introDone} />
      </div>

      <div className="relative z-20 pointer-events-none">
        <div className="pointer-events-none h-screen" aria-hidden />
        <ServicesSection />
      </div>

      {introDone && <Header />}
      {introDone && <CookiesModal />}
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
    </main>
  );
}

export default App;
