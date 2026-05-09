import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import IntroLoader from "../../components/loaders/IntroLoader.tsx";
import HeaderSection from "../../components/sections/HeaderSection.tsx";
import Hero from "../../components/sections/HeroSection.tsx";
import SectionDotsNav from "../../components/navigation/SectionDotsNav.tsx";
import ServicesSection from "../../components/sections/ServicesSection.tsx";
import SolutionsSection from "../../components/sections/SolutionsSection.tsx";
import ProductsSection from "../../components/sections/ProductsSection.tsx";
import NewsSection from "../../components/sections/NewsSection.tsx";
import ContactSection from "../../components/sections/ContactSection.tsx";
import FooterSection from "../../components/sections/FooterSection.tsx";
import CookiesModal from "../../components/modals/CookiesModal.tsx";
import "../../App.css";

const homeSectionItems = [
  { id: "hero", label: "Home" },
  { id: "solutions", label: "Services" },
  { id: "our-solutions", label: "Solutions" },
  { id: "our-products", label: "Products" },
  { id: "news", label: "News" },
  { id: "contact", label: "Contact" },
] as const;

type HomeSectionId = (typeof homeSectionItems)[number]["id"];

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [introDone, setIntroDone] = useState(false);
  /** True when Hero has finished its intro beat (animations + overlay) — unlocks scroll & below-fold mount. */
  const [headerReady, setHeaderReady] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const [dotsVisible, setDotsVisible] = useState(false);

  const scrollUnlocked = headerReady;

  const handleIntroComplete = useCallback(() => {
    setHeaderReady(false);
    setIntroDone(true);
  }, []);

  useEffect(() => {
    if (!scrollUnlocked) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [scrollUnlocked]);

  useEffect(() => {
    if (!scrollUnlocked) return;
    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    const headerOffset =
      window.matchMedia("(min-width: 768px)").matches ? 96 : 80;
    requestAnimationFrame(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, [location.hash, scrollUnlocked]);

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

      let current: HomeSectionId = homeSectionItems[0].id;
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

      {scrollUnlocked ? (
        <div className="relative z-20 pointer-events-none">
          <div className="pointer-events-none h-[100svh]" aria-hidden />
          <ServicesSection />
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
            <NewsSection />
            <ContactSection />
          </div>
          <FooterSection />
        </div>
      ) : (
        <div className="pointer-events-none h-[100svh]" aria-hidden />
      )}

      <AnimatePresence>
        {headerReady ? <HeaderSection key="main-header" /> : null}
      </AnimatePresence>
      <SectionDotsNav
        items={[...homeSectionItems]}
        activeId={activeSectionId}
        visible={headerReady && dotsVisible && activeSectionId !== "hero"}
        onNavigate={(id) => {
          if (id === "news") {
            navigate("/news");
            return;
          }
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
      {headerReady && <CookiesModal />}
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
    </main>
  );
}
