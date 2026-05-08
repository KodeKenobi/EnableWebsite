import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IntroLoader from "./components/IntroLoader.tsx";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import SectionDotsNav from "./components/SectionDotsNav.tsx";
import ServicesSection from "./components/sections/ServicesSection.tsx";
import SolutionsSection from "./components/sections/SolutionsSection.tsx";
import ProductsSection from "./components/sections/ProductsSection.tsx";
import ContactSection from "./components/sections/ContactSection.tsx";
import FooterSection from "./components/sections/FooterSection.tsx";
import CookiesModal from "./components/modals/CookiesModal.tsx";
import DisclaimersPage from "./disclaimers/DisclaimersPage.tsx";
import { useAppRoute } from "./hooks/useAppRoute.ts";
import "./App.css";

const homeSectionItems = [
  { id: "hero", label: "Home" },
  { id: "solutions", label: "Services" },
  { id: "our-solutions", label: "Solutions" },
  { id: "our-products", label: "Products" },
  { id: "contact", label: "Contact" },
] as const;

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [headerReady, setHeaderReady] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const [dotsVisible, setDotsVisible] = useState(false);
  const route = useAppRoute();

  const handleIntroComplete = useCallback(() => {
    setHeaderReady(false);
    setIntroDone(true);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const vh = Math.max(window.innerHeight, 1);
      const probeY = vh * 0.36;
      const servicesEl = document.getElementById("solutions");

      if (servicesEl && !dotsVisible) {
        const servicesRect = servicesEl.getBoundingClientRect();
        if (servicesRect.top <= vh * 0.6) {
          setDotsVisible(true);
        }
      }

      let current = homeSectionItems[0].id;
      for (const section of homeSectionItems) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) current = section.id;
      }
      setActiveSectionId(current);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [dotsVisible]);

  if (route === "disclaimers") {
    return <DisclaimersPage />;
  }

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-bg)]">
      <div className="fixed inset-0 z-0">
        <Hero
          introDone={introDone}
          onRevealReady={() => {
            setHeaderReady(true);
          }}
        />
      </div>

      <div className="relative z-20 pointer-events-none">
        <div className="pointer-events-none h-[100svh]" aria-hidden />
        <ServicesSection />
        {/* Solutions pinned like Hero; Products scrolls on top (same idea as Services over Hero). */}
        <div className="relative isolate pointer-events-none">
          <div id="our-solutions" className="pointer-events-none h-0" aria-hidden />
          <div className="sticky top-0 z-10 h-[100svh] overflow-hidden pointer-events-auto">
            <SolutionsSection />
          </div>
          <div className="relative z-[30] pointer-events-auto">
            <ProductsSection />
          </div>
        </div>
        <div className="pointer-events-auto">
          <ContactSection />
        </div>
        <FooterSection />
      </div>

      <AnimatePresence>
        {headerReady ? <Header key="main-header" /> : null}
      </AnimatePresence>
      <SectionDotsNav
        items={[...homeSectionItems]}
        activeId={activeSectionId}
        visible={introDone && dotsVisible && activeSectionId !== "hero"}
        onNavigate={(id) => {
          const target = document.getElementById(id);
          if (!target) return;
          if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          const isDesktopHeader = window.matchMedia("(min-width: 768px)").matches;
          const headerOffset = isDesktopHeader ? 96 : 80;
          const targetTop =
            target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth",
          });
        }}
      />
      {introDone && <CookiesModal />}
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
    </main>
  );
}

export default App;
