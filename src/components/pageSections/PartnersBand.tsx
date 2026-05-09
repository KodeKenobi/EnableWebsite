import type { ReactNode } from "react";
import {
  PartnerLogoRail,
  type PartnerMark,
} from "./PartnerLogoRail.tsx";

export type PartnersLayout = 1 | 2 | 3 | 4;

type Props = {
  layout: PartnersLayout;
  eyebrow?: string;
  title: string;
  body?: string;
  /** Override default rail — must usually be `<PartnerLogoRail marks={…} />`. */
  logoSlot?: ReactNode;
  marks?: readonly PartnerMark[];
};

/**
 * Four composable “Our partners” shells (text column ~⅓ · logos rail child).
 * Mirrors `ClientsBand` layouts for a consistent Solutions-style page toolkit.
 */
export function PartnersBand({
  layout,
  eyebrow = "Partners",
  title,
  body,
  logoSlot,
  marks,
}: Props) {
  const rail = logoSlot ?? <PartnerLogoRail marks={marks} />;

  switch (layout) {
    case 1:
      return (
        <section className="section-pad border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row md:items-center md:gap-14 lg:gap-16">
            <div className="shrink-0 md:w-[38%] md:max-w-md">
              <p className="type-kicker text-[var(--color-primary-blue)]">{eyebrow}</p>
              <h2 className="section-title-type mt-4 text-[var(--color-fg-strong)]">{title}</h2>
              {body ? (
                <p className="section-body-type mt-5 text-[var(--color-fg)]/85">{body}</p>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">{rail}</div>
          </div>
        </section>
      );
    case 2:
      return (
        <section className="section-pad border-t border-[var(--color-border)] bg-[var(--color-bg-muted)] text-[var(--color-fg)]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-10 md:flex-row-reverse md:items-center md:gap-14 lg:gap-16">
            <div className="shrink-0 md:w-[38%] md:max-w-md md:text-right">
              <p className="type-kicker text-[var(--color-primary-blue)]">{eyebrow}</p>
              <h2 className="section-title-type mt-4 text-[var(--color-fg-strong)]">{title}</h2>
              {body ? (
                <p className="section-body-type mt-5 text-[var(--color-fg)]/85 md:ml-0 md:mr-0">{body}</p>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">{rail}</div>
          </div>
        </section>
      );
    case 3:
      return (
        <section className="section-pad border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]">
          <div className="mx-auto max-w-[1200px] rounded-3xl bg-[color-mix(in_srgb,var(--color-bg-muted)_88%,white)] px-6 py-12 ring-1 ring-[var(--color-border)] md:px-12 md:py-14 lg:px-14">
            <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:gap-14">
              <div className="shrink-0 md:w-[36%]">
                <p className="type-kicker text-[var(--color-primary-blue)]">{eyebrow}</p>
                <h2 className="section-title-type mt-4 text-[var(--color-fg-strong)]">{title}</h2>
                {body ? (
                  <p className="section-body-type mt-5 text-[var(--color-fg)]/85">{body}</p>
                ) : null}
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-10 md:px-10">
                {rail}
              </div>
            </div>
          </div>
        </section>
      );
    case 4:
      return (
        <section className="section-pad border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="type-kicker text-[var(--color-primary-blue)]">{eyebrow}</p>
              <h2 className="section-title-type mt-4 text-[var(--color-fg-strong)]">{title}</h2>
              {body ? (
                <p className="section-body-type mt-5 text-[var(--color-fg)]/85">{body}</p>
              ) : null}
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white px-8 py-10 shadow-sm md:col-span-8 md:py-14">
              {rail}
            </div>
          </div>
        </section>
      );
    default:
      return null;
  }
}
