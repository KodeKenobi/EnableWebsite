import { useEffect, useState } from "react";
import type { NewsPostPreview } from "../lib/news.ts";
import { groqNewsPostList } from "../lib/news.ts";
import { sanityClient, sanityConfigured } from "../lib/sanity.ts";

export function useNewsPosts(limit = 8) {
  const [posts, setPosts] = useState<NewsPostPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(sanityConfigured);

  useEffect(() => {
    if (!sanityClient) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const query = groqNewsPostList(limit);
        const data = await sanityClient.fetch<NewsPostPreview[]>(query);
        if (!cancelled) setPosts(data ?? []);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load news");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { posts, error, loading, sanityConfigured };
}
