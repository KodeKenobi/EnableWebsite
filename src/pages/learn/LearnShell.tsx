import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeaderSection from "../../components/sections/HeaderSection.tsx";
import LearnSidebar from "./LearnSidebar.tsx";

/** Docs-shell layout (sidebar + canvas): Github / Microsoft Learn style. */
export default function LearnShell() {
  return (
    <>
      <AnimatePresence>
        <HeaderSection key="learn-header" />
      </AnimatePresence>
      <div className="flex min-h-[calc(100svh-5rem)] flex-col bg-[color-mix(in_srgb,var(--color-bg-muted)_45%,white)] pt-[5rem] md:min-h-[calc(100svh-6rem)] md:pt-[6.75rem]">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
          <LearnSidebar />
          <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth bg-white px-5 py-9 sm:px-8 md:min-w-0 md:px-10 md:py-11 lg:px-14 xl:px-[4.75rem]">
            <div className="mx-auto min-w-0 w-full max-w-none">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
