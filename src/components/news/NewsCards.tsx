import type { NewsPostPreview } from "../../lib/news.ts";
import { urlForImage } from "../../lib/sanity.ts";
import { Link } from "react-router-dom";

type Props = {
  posts: NewsPostPreview[];
};

export default function NewsCards({ posts }: Props) {
  return (
    <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post._id}>
          <Link
            to={`/news/${encodeURIComponent(post.slug)}`}
            className="group flex h-full flex-col gap-3 border border-[var(--color-border)] bg-white p-6 shadow-sm transition-[box-shadow,background-color] hover:bg-[var(--color-bg)] hover:shadow-md"
          >
            {post.coverImage ? (
              <img
                src={urlForImage(post.coverImage)}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
            ) : null}
            <time
              dateTime={post.publishedAt}
              className="type-kicker text-[var(--color-accent)]"
            >
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </time>
            <h3 className="font-display text-2xl font-normal text-[var(--color-fg)]">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="section-body-type text-[var(--color-fg)]/85">
                {post.excerpt}
              </p>
            ) : null}
            <span className="mt-auto text-sm text-[var(--color-primary-blue)] opacity-90 transition-opacity group-hover:opacity-100">
              Read article →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
