import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  CATEGORY_ORDER,
  getLearnAnimations,
  groupedAnimationCategories,
} from "../../learn/animationDiscovery.ts";
import { getHandbookToc } from "../../learn/handbookDocUtils.ts";
import { SITE_PARTS } from "../../learn/siteComponentsRegistry.tsx";

function railHeadingClass(isActive: boolean) {
  return [
    "block rounded-[4px] py-2 pl-[10px] pr-2 font-sans text-[0.8125rem] leading-snug transition-colors",
    isActive
      ? "border-l-[3px] border-[var(--color-primary-blue)] bg-white font-semibold text-[var(--color-fg-strong)] shadow-[inset_0_1px_0_rgb(255_255_255/70%)]"
      : "border-l-[3px] border-transparent text-[var(--color-fg)]/88 hover:bg-white/80 hover:text-[var(--color-fg-strong)]",
  ].join(" ");
}

function tocItemClass(depth: boolean) {
  return [
    "block rounded-[4px] py-1.5 font-sans text-[0.8125rem] leading-snug transition-colors hover:bg-white/85 hover:text-[var(--color-primary-blue)] text-[var(--color-fg)]/75",
    depth ? "pl-6 pr-2" : "pl-4 pr-2",
  ].join(" ");
}

function DocSectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 mt-8 px-[10px] font-sans text-[0.75rem] font-semibold text-[var(--color-fg)]/54 first:mt-0">
      {children}
    </p>
  );
}

export default function LearnSidebar() {
  const { pathname } = useLocation();
  const isHandbook =
    pathname === "/learn/handbook" ||
    pathname === "/learn" ||
    pathname.endsWith("/learn/");
  const animations = getLearnAnimations();
  const buckets = groupedAnimationCategories(animations);
  const toc = useMemo(() => getHandbookToc(), []);
  const [componentsOpen, setComponentsOpen] = useState(() =>
    pathname.startsWith("/learn/components"),
  );
  const [animationsOpen, setAnimationsOpen] = useState(() =>
    pathname.startsWith("/learn/animations"),
  );

  useEffect(() => {
    if (pathname.startsWith("/learn/components")) setComponentsOpen(true);
    if (pathname.startsWith("/learn/animations")) setAnimationsOpen(true);
  }, [pathname]);

  return (
    <aside className="flex max-h-[min(48vh,calc(100svh-5.5rem))] w-full shrink-0 flex-col overflow-hidden border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-muted)_38%,white)] md:max-h-none md:h-[calc(100svh-5rem)] md:min-h-0 md:w-[296px] md:border-r md:border-b-0 lg:h-[calc(100svh-6.75rem)]">
      <div className="border-b border-[var(--color-border)]/80 px-4 py-6 md:px-5 md:py-8">
        <p className="font-sans text-[0.8125rem] font-semibold text-[var(--color-fg-strong)]">
          Documentation
        </p>
        <p className="mt-2 font-sans text-[0.75rem] leading-relaxed text-[var(--color-fg)]/[0.55]">
          Site architecture, playbook, previews, and motion modules — one sidebar
          navigation pattern.
        </p>
        <Link
          to="/"
          reloadDocument
          className="mt-5 inline-flex font-sans text-[0.8125rem] font-medium text-[var(--color-primary-blue)] underline-offset-[3px] hover:underline"
        >
          Leave Learn → Site home
        </Link>
      </div>

      <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-5 md:px-4 md:py-7">
        <DocSectionTitle>On this portal</DocSectionTitle>
        <NavLink
          end
          to="/learn/handbook"
          className={({ isActive }) => railHeadingClass(isActive || isHandbook)}
        >
          Handbook
        </NavLink>

        {isHandbook ? (
          <div className="mt-4 max-h-[min(280px,40vh)] overflow-y-auto border-t border-[var(--color-border)]/70 pt-4 md:max-h-[min(440px,calc(100vh-26rem))]">
            <p className="mb-3 px-[10px] font-sans text-[0.75rem] font-medium text-[var(--color-fg)]/48">
              In this article
            </p>
            <ul className="space-y-0.5">
              {toc.map((item) => (
                <li key={`${item.id}-${item.level}-${item.text}`}>
                  <a
                    href={`/learn/handbook#${encodeURIComponent(item.id)}`}
                    className={tocItemClass(item.level === 3)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <DocSectionTitle>Live previews</DocSectionTitle>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setComponentsOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-[4px] py-2 pl-[10px] pr-2 text-left font-sans text-[0.8125rem] font-semibold text-[var(--color-fg)]/65 hover:bg-white/65"
          >
            Components
            <ChevronDown
              className={`size-3.5 shrink-0 transition-transform ${componentsOpen ? "rotate-180" : ""}`}
              strokeWidth={2}
              aria-hidden
            />
          </button>
          {componentsOpen ? (
            <div className="pb-5">
              <NavLink
                to="/learn/components/all"
                end={false}
                className={({ isActive }) => railHeadingClass(isActive)}
              >
                Overview
              </NavLink>
              {SITE_PARTS.map((p) => (
                <NavLink
                  key={p.id}
                  to={`/learn/components/${encodeURIComponent(p.id)}`}
                  className={({ isActive }) => railHeadingClass(isActive)}
                >
                  {p.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>

        <div className="border-t border-[var(--color-border)]/55 pt-4">
          <button
            type="button"
            onClick={() => setAnimationsOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-[4px] py-2 pl-[10px] pr-2 text-left font-sans text-[0.8125rem] font-semibold text-[var(--color-fg)]/65 hover:bg-white/65"
          >
            Animations
            <ChevronDown
              className={`size-3.5 shrink-0 transition-transform ${animationsOpen ? "rotate-180" : ""}`}
              strokeWidth={2}
              aria-hidden
            />
          </button>
          {animationsOpen ? (
            <div className="space-y-1 pt-2">
              <NavLink
                to="/learn/animations"
                end
                className={({ isActive }) => railHeadingClass(isActive)}
              >
                Browse
              </NavLink>
              {[
                ...CATEGORY_ORDER.filter((c) => (buckets[c]?.length ?? 0) > 0),
                ...Object.keys(buckets)
                  .filter(
                    (c) =>
                      !CATEGORY_ORDER.includes(
                        c as (typeof CATEGORY_ORDER)[number],
                      ),
                  )
                  .sort(),
              ].map((cat) => {
                const catItems = buckets[cat];
                if (!catItems?.length) return null;
                return (
                  <details key={cat} className="group rounded-[4px]">
                    <summary className="cursor-pointer list-none px-[10px] py-2 font-sans text-[0.78125rem] font-medium capitalize text-[var(--color-fg)]/78 marker:content-none [&::-webkit-details-marker]:hidden [&::marker]:content-none hover:bg-white/65">
                      <span className="flex items-center justify-between gap-2">
                        {cat.replace(/([A-Z])/g, " $1").trim()}
                        <ChevronDown className="size-3 shrink-0 text-[var(--color-fg)]/45 transition group-open:rotate-180" />
                      </span>
                    </summary>
                    <ul className="ml-2 border-l border-[var(--color-border)]/90 py-1 pl-2">
                      {catItems.map((a) => (
                        <li key={a.slug}>
                          <NavLink
                            to={`/learn/animations/${encodeURIComponent(a.slug)}`}
                            className={({ isActive }) =>
                              `${railHeadingClass(isActive)} truncate`
                            }
                            title={`${a.category}/${a.componentName}`}
                          >
                            {a.componentName}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          ) : null}
        </div>
      </nav>
    </aside>
  );
}
