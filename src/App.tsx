import { useState, useCallback } from "react";
import IntroLoader from "./components/IntroLoader.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import ServicesSection from "./components/sections/ServicesSection.tsx";
import SolutionsSection from "./components/sections/SolutionsSection.tsx";
import ProductsSection from "./components/sections/ProductsSection.tsx";
import CookiesModal from "./components/modals/CookiesModal.tsx";
import DisclaimersPage from "./disclaimers/DisclaimersPage.tsx";
import { useAppRoute } from "./hooks/useAppRoute.ts";
import "./App.css";

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
  const route = useAppRoute();

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
        {/* Solutions pinned like Hero; Products scrolls on top (same idea as Services over Hero). */}
        <div className="relative isolate pointer-events-none">
          <div className="sticky top-0 z-10 h-screen overflow-hidden pointer-events-auto">
            <SolutionsSection />
          </div>
          <div className="relative z-[30] pointer-events-auto">
            <ProductsSection />
          </div>
        </div>
      </div>

      {introDone && <Header />}
      {introDone && <CookiesModal />}
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
    </main>
  );
}

export default App;
