import { Link, useParams } from "react-router-dom";
import { animationMetaBySlug } from "../../learn/animationDiscovery.ts";
import { LearnAnimationViewer } from "../../learn/LearnAnimationViewer.tsx";

export default function LearnAnimationsPanel() {
  const { slug } = useParams<{ slug?: string }>();
  const meta = slug ? animationMetaBySlug(slug) : null;

  return (
    <div className="mx-auto w-full max-w-[min(1880px,calc(100vw-1.5rem))] md:max-w-[min(1880px,calc(100vw-9rem))]">
      <header className="mb-11 border-b border-[var(--color-border)] pb-10">
        <h2 className="font-sans text-[1.5rem] font-semibold tracking-[-0.02em] text-[var(--color-fg-strong)] md:text-[1.625rem]">
          {meta ? meta.componentName : "Animations"}
        </h2>
        {meta ? (
          <p className="mt-3 font-mono text-[0.8125rem] text-[var(--color-fg)]/[0.55]">
            {meta.category}/{meta.componentName}.tsx
          </p>
        ) : (
          <p className="mt-4 max-w-[56ch] font-sans text-[1rem] leading-[1.75] text-[var(--color-fg)]/[0.78] md:text-[1.0625rem]">
            Choose a module from the sidebar. Defaults render with zero props when
            possible; labelled overrides cover the headline treatments used on
            the site.
          </p>
        )}
      </header>

      <LearnAnimationViewer slug={slug} />

      {!slug ? (
        <p className="mt-12 text-center font-sans text-[0.875rem] text-[var(--color-fg)]/[0.55]">
          Tip: collapsed groups in the sidebar list every file under{" "}
          <code className="rounded bg-[var(--color-bg-muted)] px-1.5 py-0.5 text-xs">
            src/components/animations
          </code>
          .
        </p>
      ) : (
        <p className="mt-11 font-sans text-[0.8125rem] text-[var(--color-fg)]/50">
          <Link to="/learn/animations" className="underline">
            Clear selection
          </Link>
        </p>
      )}
    </div>
  );
}
