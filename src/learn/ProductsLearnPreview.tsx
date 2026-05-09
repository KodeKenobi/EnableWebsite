import { useId, useState } from "react";
import ProductsSection from "../components/sections/ProductsSection.tsx";

/**
 * Mirrors production stacking vs scroll-through previews for sticky product rails.
 */
export default function ProductsLearnPreview() {
  const [sticky, setSticky] = useState(true);
  const id = useId();
  const a = `${id}-sticky`;
  const b = `${id}-scroll`;

  return (
    <div className="space-y-4">
      <div className="sticky top-[5.75rem] z-[2] mb-6 flex flex-wrap items-center gap-x-10 gap-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/95 px-4 py-3 shadow-sm backdrop-blur-sm md:relative md:top-0 md:px-5">
        <span className="section-body-type shrink-0 text-sm font-semibold text-[var(--color-fg)]">
          Presentation mode:
        </span>
        <div className="flex flex-wrap gap-6 section-body-type text-sm">
          <label htmlFor={a} className="flex cursor-pointer items-center gap-2">
            <input
              id={a}
              type="radio"
              name={`${id}-products-mode`}
              className="size-4 accent-[var(--color-primary-blue)]"
              checked={sticky}
              onChange={() => setSticky(true)}
            />
            <span className={sticky ? "text-[var(--color-fg-strong)]" : undefined}>
              Live site (sticky stack)
            </span>
          </label>
          <label htmlFor={b} className="flex cursor-pointer items-center gap-2">
            <input
              id={b}
              type="radio"
              name={`${id}-products-mode`}
              className="size-4 accent-[var(--color-primary-blue)]"
              checked={!sticky}
              onChange={() => setSticky(false)}
            />
            <span className={!sticky ? "text-[var(--color-fg-strong)]" : undefined}>
              Sequential (slides unstack — scroll-through)
            </span>
          </label>
        </div>
      </div>
      <ProductsSection stickySlides={sticky} />
    </div>
  );
}
