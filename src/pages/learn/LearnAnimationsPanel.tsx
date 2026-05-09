import { Link, useParams } from "react-router-dom";
import { animationMetaBySlug } from "../../learn/animationDiscovery.ts";
import { LearnAnimationViewer } from "../../learn/LearnAnimationViewer.tsx";

export default function LearnAnimationsPanel() {
  const { slug } = useParams<{ slug?: string }>();
  const meta = slug ? animationMetaBySlug(slug) : null;

  return (
    <div className="mx-auto w-full max-w-[min(1880px,calc(100vw-1.5rem))] md:max-w-[min(1880px,calc(100vw-9rem))]">
      <header className="mb-8 border-b border-[var(--color-border)] pb-8">
        <p className="type-kicker text-[var(--color-primary-blue)]">
          Animations
        </p>
        <h2 className="section-title-type mt-2 text-[var(--color-fg)]">
          {meta ? meta.componentName : "Preview"}
        </h2>
        {meta ? (
          <p className="section-body-type mt-3 font-mono text-sm text-[var(--color-fg)]/65">
            {meta.category}/{meta.componentName}.tsx
          </p>
        ) : (
          <p className="section-body-type mt-3 max-w-2xl text-[var(--color-fg)]/80">
            Choose a module from the sidebar. Defaults render with zero props when
            possible; labelled overrides cover the headline treatments used on
            the site.
          </p>
        )}
      </header>

      <LearnAnimationViewer slug={slug} />

      {!slug ? (
        <p className="mt-10 text-center text-sm text-[var(--color-fg)]/65">
          Tip: collapsed groups in the sidebar list every file under{" "}
          <code className="rounded bg-[var(--color-bg-muted)] px-1.5 py-0.5 text-xs">
            src/components/animations
          </code>
          .
        </p>
      ) : (
        <p className="mt-10 text-xs text-[var(--color-fg)]/55">
          <Link to="/learn/animations" className="underline">
            Clear selection
          </Link>
        </p>
      )}
    </div>
  );
}
