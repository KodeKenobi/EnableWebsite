import { Link, useParams } from "react-router-dom";
import { SectionChildPreviews } from "../../learn/sectionChildPreviews.tsx";
import { SITE_PARTS, sitePartById } from "../../learn/siteComponentsRegistry.tsx";

export default function LearnComponentsPanel() {
  const { componentId } = useParams<{ componentId: string }>();

  if (!componentId || componentId === "all") {
    return (
      <div className="mx-auto w-full max-w-[min(1880px,calc(100vw-1.5rem))] md:max-w-[min(1880px,calc(100vw-9rem))]">
        <header className="mb-10 border-b border-[var(--color-border)] pb-8">
          <p className="type-kicker text-[var(--color-primary-blue)]">Components</p>
          <h2 className="section-title-type mt-2 text-[var(--color-fg)]">
            All live site sections
          </h2>
          <p className="section-body-type mt-3 max-w-2xl text-[var(--color-fg)]/80">
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
                  <h3 className="font-display text-2xl font-normal text-[var(--color-fg-strong)]">
                    {part.label}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--color-fg)]/75">
                    {part.description}
                  </p>
                </div>
                <Link
                  to={`/learn/components/${part.id}`}
                  className="type-nav shrink-0 text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
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
        className="type-nav text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
      >
        ← All components
      </Link>
      <header className="mt-6 border-b border-[var(--color-border)] pb-8">
        <p className="type-kicker text-[var(--color-primary-blue)]">{part.label}</p>
        <h2 className="section-title-type mt-2 text-[var(--color-fg)]">
          Full-width preview
        </h2>
        <p className="section-body-type mt-3 max-w-2xl text-[var(--color-fg)]/80">
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
