/**
 * Decorative-only strip matching marketing header visuals; no links so Learn stays in-dashboard.
 */
import { navItems } from "../constants/headerNav.ts";

export default function HeaderChromePreview() {
  return (
    <div
      role="figure"
      aria-label="Marketing header chrome (preview only)"
      className="pointer-events-none isolate select-none rounded-lg border border-[var(--color-border)] bg-white px-4 py-5 shadow-sm sm:px-6 md:py-8 md:px-10"
      style={{ color: "var(--color-fg-strong)" }}
    >
      <div className="flex h-[4.75rem] items-center justify-between md:h-[5rem] md:justify-between">
        <div className="w-24 shrink-0 md:w-[7.85rem]">
          <img
            src="/images/logo/et-logo.png"
            alt=""
            className="h-auto w-full opacity-95 grayscale-[0.12]"
          />
        </div>
        <nav className="hidden gap-8 type-nav uppercase md:flex lg:gap-10">
          {navItems.map(({ label }) => (
            <span key={label} className="text-lg font-semibold text-[var(--color-fg)]">
              {label}
            </span>
          ))}
        </nav>
        <div className="hidden rounded-tr-full rounded-br-lg bg-[var(--color-fg-strong)] px-6 py-3.5 text-[var(--color-fg-inverse)] md:block">
          <span className="text-md whitespace-nowrap">Inquiry</span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] md:hidden">
          <span className="sr-only">Menu (visual only)</span>
          <div className="flex w-5 flex-col gap-1">
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
          </div>
        </div>
      </div>
      <p className="pointer-events-none mt-8 border-t border-dashed border-[var(--color-border)] pt-6 text-xs leading-snug text-[var(--color-fg)]/60">
        Non-interactive preview of site header typography and proportions. Links
        and buttons are intentionally disabled inside Learn.
      </p>
    </div>
  );
}
