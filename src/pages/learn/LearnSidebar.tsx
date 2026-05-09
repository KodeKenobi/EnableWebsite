import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  CATEGORY_ORDER,
  getLearnAnimations,
  groupedAnimationCategories,
} from "../../learn/animationDiscovery.ts";
import { SITE_PARTS } from "../../learn/siteComponentsRegistry.tsx";

function navClass(isActive: boolean) {
  return [
    "block rounded-md px-3 py-2 text-left text-sm transition-colors",
    isActive
      ? "bg-[color-mix(in_srgb,var(--color-primary-blue)_12%,transparent)] font-medium text-[var(--color-primary-blue)]"
      : "text-[var(--color-fg)] hover:bg-[var(--color-bg-muted)]",
  ].join(" ");
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--color-border)] pb-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-fg)]/80"
      >
        {title}
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>
      {open ? <div className="space-y-0.5">{children}</div> : null}
    </div>
  );
}

export default function LearnSidebar() {
  const animations = getLearnAnimations();
  const buckets = groupedAnimationCategories(animations);

  return (
    <aside className="flex max-h-[min(44vh,calc(100svh-8rem))] w-full shrink-0 flex-col overflow-hidden border-b border-[var(--color-border)] bg-[color-mix(in_srgb,white_88%,var(--color-bg-soft))] backdrop-blur-sm md:h-full md:max-h-none md:min-h-0 md:w-72 md:border-b-0 md:border-r md:px-4 md:py-8">
      <div className="px-4 pb-4 pt-6 md:px-2 md:pt-0">
        <p className="type-kicker text-[var(--color-primary-blue)]">Learning hub</p>
        <h1 className="mt-1 font-display text-xl font-normal tracking-tight text-[var(--color-fg-strong)]">
          Live previews
        </h1>
        <p className="mt-2 text-xs leading-snug text-[var(--color-fg)]/70">
          Browse sections and motion modules — the Handbook tab has written
          guidance.
        </p>
        <Link
          to="/"
          reloadDocument
          className="type-nav mt-4 inline-flex text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
        >
          ← Site home
        </Link>
      </div>

      <nav className="min-h-0 flex-1 gap-1 overflow-x-hidden overflow-y-auto px-2 pb-6 md:flex md:flex-col md:pb-8">
        <CollapsibleSection title="Components" defaultOpen>
          <NavLink
            to="/learn/components/all"
            className={({ isActive }) => navClass(isActive)}
            end={false}
          >
            All
          </NavLink>
          {SITE_PARTS.map((p) => (
            <NavLink
              key={p.id}
              to={`/learn/components/${encodeURIComponent(p.id)}`}
              className={({ isActive }) => navClass(isActive)}
            >
              {p.label}
            </NavLink>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Animations" defaultOpen>
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
              <details key={cat} className="group rounded-md" open={false}>
                <summary className="cursor-pointer list-none px-3 py-1.5 text-xs font-semibold capitalize text-[var(--color-fg)]/85 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {cat.replace(/([A-Z])/g, " $1").trim()}
                    <ChevronDown className="size-3.5 shrink-0 transition group-open:rotate-180" />
                  </span>
                </summary>
                <div className="ml-2 border-l border-[var(--color-border)] pb-2 pl-2">
                  {catItems.map((a) => (
                    <NavLink
                      key={a.slug}
                      to={`/learn/animations/${encodeURIComponent(a.slug)}`}
                      className={({ isActive }) => `${navClass(isActive)} truncate`}
                      title={`${a.category}/${a.componentName}`}
                    >
                      {a.componentName}
                    </NavLink>
                  ))}
                </div>
              </details>
            );
          })}
        </CollapsibleSection>
      </nav>
    </aside>
  );
}
