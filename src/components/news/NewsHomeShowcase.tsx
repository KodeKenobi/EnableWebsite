import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { NewsPostPreview } from "../../lib/news.ts";
import { urlForImage } from "../../lib/sanity.ts";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  posts: NewsPostPreview[];
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Distinct landing treatment: asymmetric feature + concise stack — keeps /news editorial grid separate. */
export default function NewsHomeShowcase({ posts }: Props) {
  const slice = posts.slice(0, 5);
  if (slice.length === 0) return null;

  const [featured, ...rest] = slice;

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        variants={{
          hide: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.04 },
          },
        }}
        className="grid gap-5 md:grid-cols-12 md:gap-6 lg:gap-8"
      >
        <motion.div
          variants={{
            hide: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease },
            },
          }}
          className="md:col-span-7"
        >
          <Link
            to={`/news/${encodeURIComponent(featured.slug)}`}
            className="group relative block overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-gradient-to-br from-white via-white to-[color-mix(in_srgb,var(--color-primary-blue)_06%,transparent)] shadow-[0_28px_60px_-40px_rgb(15_36_56/40%)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgb(15_101_178/42%)]"
          >
            {featured.coverImage ? (
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/11]">
                <img
                  src={urlForImage(featured.coverImage)}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(14_36_44/52%)] via-transparent to-transparent" />
              </div>
            ) : (
              <div className="flex aspect-[21/11] items-center justify-center bg-[linear-gradient(135deg,#e9f4fa_0%,#dfeaf3_52%,#e4eef6_100%)] md:aspect-auto md:min-h-[220px]" />
            )}
            <div className="px-6 py-7 md:px-8 md:py-9">
              <time
                dateTime={featured.publishedAt}
                className="type-kicker text-[color-mix(in_srgb,var(--color-primary-blue)_94%,transparent)]"
              >
                {fmtDate(featured.publishedAt)}
              </time>
              <h3 className="mt-3 font-display text-[clamp(1.55rem,2.25vw,2rem)] font-normal leading-tight tracking-[-0.02em] text-[var(--color-fg-strong)]">
                {featured.title}
              </h3>
              {featured.excerpt ? (
                <p className="mt-4 line-clamp-3 section-body-type text-[var(--color-fg)]/86">
                  {featured.excerpt}
                </p>
              ) : null}
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-primary-blue)]">
                Read piece
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.ul
          variants={{
            hide: {},
            show: {
              transition: { staggerChildren: 0.07 },
            },
          }}
          className="flex flex-col gap-3 md:col-span-5"
        >
          {rest.slice(0, 4).map((post) => (
            <motion.li
              key={post._id}
              variants={{
                hide: { opacity: 0, x: 12 },
                show: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
            >
              <Link
                to={`/news/${encodeURIComponent(post.slug)}`}
                className="group relative flex gap-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-muted)_72%,white)] p-3.5 pl-4 transition-colors duration-300 hover:bg-white hover:shadow-md"
              >
                <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[linear-gradient(180deg,var(--color-accent)_0%,var(--color-primary-blue)_100%)] opacity-95 transition-opacity group-hover:opacity-100" />
                {post.coverImage ? (
                  <div className="relative h-[4.75rem] w-[5.75rem] shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={urlForImage(post.coverImage)}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-[4.75rem] w-[5.75rem] shrink-0 rounded-lg bg-[linear-gradient(145deg,#d7e9f5_0%,#cce2ef_100%)]" />
                )}
                <div className="flex min-h-[4.75rem] min-w-0 flex-1 flex-col justify-center gap-2">
                  <time
                    dateTime={post.publishedAt}
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-primary-blue)]"
                  >
                    {fmtDate(post.publishedAt)}
                  </time>
                  <span className="line-clamp-2 font-display text-base font-normal leading-snug text-[var(--color-fg)]">
                    {post.title}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
