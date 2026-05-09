import { Link, useParams } from "react-router-dom";
import { SectionChildPreviews } from "../../learn/sectionChildPreviews.tsx";
import { SITE_PARTS, sitePartById } from "../../learn/siteComponentsRegistry.tsx";

export default function LearnComponentsPanel() {
  const { componentId } = useParams<{ componentId: string }>();

  if (!componentId || componentId === "all") {
    return (
      <div className="mx-auto w-full max-w-[min(1880px,calc(100vw-1.5rem))] md:max-w-[min(1880px,calc(100vw-9rem))]">
        <header className="mb-12 border-b border-[var(--color-border)] pb-10">
          <h2 className="font-sans text-[1.5rem] font-semibold tracking-[-0.02em] text-[var(--color-fg-strong)] md:text-[1.625rem]">
            Components
          </h2>
          <p className="mt-4 max-w-[56ch] font-sans text-[1rem] leading-[1.75] text-[var(--color-fg)]/[0.78] md:text-[1.0625rem]">
            These are the main building blocks rendered on the marketing home
            route. Scroll each preview; heavier sections stay in a clipped frame
            so the hub stays fast to scroll.
          </p>
        </header>
        <div className="space-y-14">
          {SITE_PARTS.map((part) => {
            const Preview = part.Preview;
            return (
            <section
              key={part.id}
              id={`preview-${part.id}`}
              className="scroll-mt-28"
            >
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.015em] text-[var(--color-fg-strong)]">
                    {part.label}
                  </h3>
                  <p className="mt-2 max-w-[60ch] font-sans text-[0.9375rem] leading-relaxed text-[var(--color-fg)]/[0.72]">
                    {part.description}
                  </p>
                </div>
                <Link
                  to={`/learn/components/${part.id}`}
                  className="shrink-0 font-sans text-[0.875rem] font-medium text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
                >
                  Full-width view →
                </Link>
              </div>
              <div className="overflow-auto rounded-xl border border-[var(--color-border)] bg-white shadow-[0_12px_40px_-24px_rgb(15_36_56/35%)]">
                <div className="relative min-h-[min(580px,75svh)] w-full [--hero-text-progress:0] [--hero-text-opacity:1] [--hero-text-scale:1]">
                  <Preview />
                </div>
              </div>
            </section>
            );
          })}
        </div>
      </div>
    );
  }

  const part = sitePartById(componentId);
  if (!part) {
    return (
      <p className="text-sm text-red-700">
        Unknown component{" "}
        <code className="rounded bg-red-50 px-1">{componentId}</code>.{" "}
        <Link to="/learn/components/all" className="underline">
          Back to all
        </Link>
      </p>
    );
  }

  const Single = part.Preview;
  return (
    <div className="mx-auto w-full max-w-[min(1880px,calc(100vw-1.5rem))] md:max-w-[min(1880px,calc(100vw-9rem))]">
      <Link
        to="/learn/components/all"
        className="font-sans text-[0.875rem] font-medium text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
      >
        ← All components
      </Link>
      <header className="mt-8 border-b border-[var(--color-border)] pb-10">
        <h2 className="font-sans text-[1.5rem] font-semibold tracking-[-0.02em] text-[var(--color-fg-strong)] md:text-[1.625rem]">
          {part.label}
        </h2>
        <p className="mt-4 max-w-[56ch] font-sans text-[1rem] leading-[1.75] text-[var(--color-fg)]/[0.78] md:text-[1.0625rem]">
          {part.description}
        </p>
      </header>
      <div className="mt-8 min-h-[min(94svh,1300px)] w-full overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] [--hero-text-progress:0] [--hero-text-opacity:1] [--hero-text-scale:1]">
        <Single />
      </div>
      <SectionChildPreviews sectionId={componentId} />
    </div>
  );
}
