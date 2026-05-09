import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeaderSection from "../../components/sections/HeaderSection.tsx";
import LearnSidebar from "./LearnSidebar.tsx";
import LearnPortalTabs from "./LearnPortalTabs.tsx";

export default function LearnShell() {
  const { pathname } = useLocation();
  const showSidebar =
    pathname.startsWith("/learn/components") ||
    pathname.startsWith("/learn/animations");

  return (
    <>
      <AnimatePresence>
        <HeaderSection key="learn-header" />
      </AnimatePresence>
      <div className="flex min-h-[calc(100svh-5rem)] flex-col bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-soft)] to-[color-mix(in_srgb,var(--color-bg-muted)_55%,var(--color-bg))] pt-[5rem] md:min-h-[calc(100svh-6rem)] md:pt-[6.75rem]">
        <LearnPortalTabs />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          {showSidebar ? <LearnSidebar /> : null}
          <main
            className={
              showSidebar
                ? "min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-6 sm:px-5 md:py-10 md:px-8 lg:px-14 xl:px-[4.25rem]"
                : "min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-8 sm:px-6 md:py-12 md:px-12 lg:px-16 xl:px-[5rem]"
            }
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
