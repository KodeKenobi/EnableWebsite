import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HeaderSection from "../../components/sections/HeaderSection.tsx";
import FooterSection from "../../components/sections/FooterSection.tsx";
import { sanityClient, sanityConfigured, urlForImage } from "../../lib/sanity.ts";
import { NEWS_POST_DETAIL_QUERY, type NewsPostDetail } from "../../lib/news.ts";

function renderBodyText(post: NewsPostDetail) {
  if (!post.body?.length) return [];
  return post.body
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children ?? [])
        .map((child) => (child._type === "span" ? child.text ?? "" : ""))
        .join(""),
    )
    .filter((line) => line.trim().length > 0);
}

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<NewsPostDetail | null>(null);
  const [loading, setLoading] = useState(sanityConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sanityClient || !slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await sanityClient.fetch<NewsPostDetail | null>(
          NEWS_POST_DETAIL_QUERY,
          { slug },
        );
        if (!cancelled) setPost(data);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load article");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const bodyLines = post ? renderBodyText(post) : [];

  return (
    <>
      <AnimatePresence>
        <HeaderSection key="news-detail-header" />
      </AnimatePresence>
      <main className="min-h-screen bg-[var(--color-bg)] pb-16 pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 lg:px-16">
          <Link
            to="/news"
            className="type-nav text-[var(--color-primary-blue)] underline-offset-4 hover:underline"
          >
            ← Back to news
          </Link>

          {!sanityConfigured ? (
            <p className="section-body-type mt-8 text-[var(--color-fg)]/70">
              News is temporarily unavailable.
            </p>
          ) : null}

          {loading ? (
            <p className="section-body-type mt-8 text-[var(--color-fg)]/70">
              Loading article…
            </p>
          ) : null}

          {error ? (
            <p className="section-body-type mt-8 text-[var(--color-warm)]">
              {error}
            </p>
          ) : null}

          {!loading && !error && !post ? (
            <p className="section-body-type mt-8 text-[var(--color-fg)]/70">
              Article not found.
            </p>
          ) : null}

          {post ? (
            <article className="mt-8">
              <p className="type-kicker mb-3 text-[var(--color-accent)]">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <h1 className="section-title-type text-[var(--color-fg)]">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="section-body-type mt-5 text-[var(--color-fg)]/80">
                  {post.excerpt}
                </p>
              ) : null}
              {post.coverImage ? (
                <img
                  src={urlForImage(post.coverImage)}
                  alt=""
                  className="mt-8 aspect-[16/9] w-full object-cover"
                />
              ) : null}
              <div className="mt-8 space-y-5">
                {bodyLines.map((line, index) => (
                  <p
                    key={`${post._id}-line-${index}`}
                    className="section-body-type text-[var(--color-fg)]/90"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
