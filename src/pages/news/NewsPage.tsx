import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeaderSection from "../../components/sections/HeaderSection.tsx";
import FooterSection from "../../components/sections/FooterSection.tsx";
import NewsCards from "../../components/news/NewsCards.tsx";
import { useNewsPosts } from "../../hooks/useNewsPosts.ts";

export default function NewsPage() {
  const { posts, error, loading, sanityConfigured } = useNewsPosts(24);

  return (
    <>
      <AnimatePresence>
        <HeaderSection key="news-header" />
      </AnimatePresence>
      <main className="min-h-screen bg-[var(--color-bg)] pb-16 pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-8">
            <div>
              <p className="type-kicker mb-2 text-[var(--color-accent)]">
                Updates
              </p>
              <h1 className="section-title-type text-[var(--color-fg)]">
                News
              </h1>
              <p className="section-body-type mt-3 max-w-xl text-[var(--color-fg)]/80">
                Announcements and stories from Enable.
              </p>
            </div>
            <Link
              to="/"
              className="type-nav text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </div>

          {!sanityConfigured && (
            <p className="section-body-type text-center text-[var(--color-fg)]/70 md:text-left">
              News is temporarily unavailable.
            </p>
          )}

          {sanityConfigured && loading && (
            <p className="section-body-type text-[var(--color-fg)]/70">
              Loading…
            </p>
          )}
          {sanityConfigured && error && (
            <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-warm)_45%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-warm)_08%,transparent)] p-4 text-[var(--color-fg)]">
              <p className="font-medium text-[var(--color-warm)]">
                Could not load news
              </p>
              <p className="section-body-type mt-2 text-[var(--color-fg)]/85">
                {error}
              </p>
            </div>
          )}
          {!loading && !error && sanityConfigured && posts.length === 0 && (
            <p className="section-body-type text-[var(--color-fg)]/70">
              No posts yet. Publish <strong>News post</strong> documents in
              Sanity Studio.
            </p>
          )}
          {!loading && !error && posts.length > 0 ? (
            <NewsCards posts={posts} />
          ) : null}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
