/** One logo/partner/client mark (pass your OptimizedImage or Sanity URL builder at call site). */
export type PartnerMark = {
  src: string;
  alt: string;
};

type Props = {
  /** When empty, muted placeholder slabs render so layout can be reviewed before assets exist. */
  marks?: readonly PartnerMark[];
  className?: string;
};

const PLACEHOLDERS = [1, 2, 3, 4, 5, 6] as const;

/** Child block for partners/clients bands — drop in above the fold or beside copy. */
export function PartnerLogoRail({ marks, className = "" }: Props) {
  if (marks?.length) {
    return (
      <ul
        className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-14 ${className}`}
      >
        {marks.map((m, i) => (
          <li key={`${m.src}-${i}`} className="flex h-12 max-w-[8.5rem] items-center md:h-14">
            <img
              src={m.src}
              alt={m.alt}
              className="max-h-full w-auto max-w-full object-contain opacity-85 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-8 ${className}`}
      aria-hidden
    >
      {PLACEHOLDERS.map((n) => (
        <li
          key={n}
          className="h-11 w-[6.75rem] rounded-md bg-[color-mix(in_srgb,var(--color-fg)_06%,transparent)] ring-1 ring-[var(--color-border)] md:h-12 md:w-[7.5rem]"
        />
      ))}
    </ul>
  );
}
