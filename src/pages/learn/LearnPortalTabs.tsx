import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, LayoutGrid, Sparkles } from "lucide-react";

const tabs = [
  {
    id: "handbook",
    label: "Handbook",
    icon: BookOpen,
    description: "README & ways of working",
    to: "/learn/handbook",
    match: (path: string) =>
      path === "/learn/handbook" || path === "/learn" || path === "/learn/",
  },
  {
    id: "components",
    label: "Components",
    icon: LayoutGrid,
    description: "Site sections",
    to: "/learn/components/all",
    match: (path: string) => path.startsWith("/learn/components"),
  },
  {
    id: "animations",
    label: "Animations",
    icon: Sparkles,
    description: "Motion library",
    to: "/learn/animations",
    match: (path: string) => path.startsWith("/learn/animations"),
  },
] as const;

function tabClass(active: boolean) {
  return [
    "group relative flex min-h-[3rem] flex-1 flex-col justify-center rounded-xl px-4 py-2.5 text-left transition-all md:min-h-0 md:flex-none md:px-5",
    active
      ? "bg-white shadow-[0_4px_24px_-12px_rgb(35_101_178/35%)] ring-1 ring-[var(--color-primary-blue)]/25"
      : "bg-transparent ring-1 ring-transparent hover:bg-white/70 hover:ring-[var(--color-border)]",
  ].join(" ");
}

export default function LearnPortalTabs() {
  const { pathname } = useLocation();

  return (
    <div className="shrink-0 border-b border-[var(--color-border)]/70 bg-[color-mix(in_srgb,var(--color-bg-soft)_92%,white)] px-3 py-3 sm:px-5 md:px-8">
      <div className="mx-auto flex w-full max-w-[min(1880px,calc(100vw-1.5rem))] flex-col gap-3 md:max-w-none md:flex-row md:items-center md:justify-between">
        <p className="hidden text-xs text-[var(--color-fg)]/55 md:block">
          Navigate like a learning hub — docs first, then live UI.
        </p>
        <nav
          className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 md:w-auto"
          aria-label="Learn areas"
        >
          {tabs.map((tab) => {
            const active = tab.match(pathname);
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.id}
                to={tab.to}
                end={tab.id === "handbook"}
                className={() => tabClass(active)}
              >
                <span className="flex items-center gap-2">
                  <Icon
                    className={`size-[1.15rem] shrink-0 ${active ? "text-[var(--color-primary-blue)]" : "text-[var(--color-fg)]/50"}`}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span
                    className={`font-display text-[17px] ${active ? "text-[var(--color-fg-strong)]" : "text-[var(--color-fg)]/90"}`}
                  >
                    {tab.label}
                  </span>
                </span>
                <span className="mt-0.5 text-[11px] leading-snug text-[var(--color-fg)]/55 group-hover:text-[var(--color-fg)]/70">
                  {tab.description}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
