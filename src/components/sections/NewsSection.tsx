import { Link } from "react-router-dom";
import NewsHomeShowcase from "../news/NewsHomeShowcase.tsx";
import { useNewsPosts } from "../../hooks/useNewsPosts.ts";

export default function NewsSection() {
  const { posts, error, loading, sanityConfigured } = useNewsPosts(8);

  /** Opaque surface + high z-index so the fixed home hero backdrop never bleeds through. */
  const sectionShell =
    "relative z-[40] isolate border-t border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)] section-pad";

  if (!sanityConfigured) {
    return (
      <section id="news" className={sectionShell}>
        <p className="section-body-type text-center text-[var(--color-fg)]/70">
          News is temporarily unavailable.
        </p>
      </section>
    );
  }

  return (
    <section id="news" className={sectionShell}>
      <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="type-kicker mb-3 text-[var(--color-primary-blue)]">
            Field notes
          </p>
          <h2 className="section-title-type text-[var(--color-fg)]">
            Fresh signals
          </h2>
          <p className="section-body-type mt-3 text-[var(--color-fg)]/78">
            A quick read—no wall of cards. The full archive lives on the News
            hub.
          </p>
        </div>
        <Link
          to="/news"
          className="type-nav inline-flex shrink-0 items-center gap-2 text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
        >
          View all news →
        </Link>
      </div>
      {loading && (
        <p className="section-body-type text-[var(--color-fg)]/70">Loading…</p>
      )}
      {error && (
        <p className="section-body-type text-[var(--color-warm)]">{error}</p>
      )}
      {!loading && !error && posts.length === 0 && (
        <p className="section-body-type text-[var(--color-fg)]/70">
          No posts yet. Publish a <strong>News post</strong> in Sanity Studio.
        </p>
      )}
      {!loading && !error && posts.length > 0 ? (
        <NewsHomeShowcase posts={posts} />
      ) : null}
    </section>
  );
}
