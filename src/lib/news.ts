/** GROQ preview fields for listing news cards. Limit must be a sane integer (hook clamps). */
export function groqNewsPostList(limit: number) {
  const n = Math.min(50, Math.max(1, Math.floor(limit)));
  return `*[_type == "newsPost" && defined(slug.current)] | order(publishedAt desc)[0...${n}]{
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  coverImage
}`;
}

export type NewsPostPreview = {
  _id: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  slug: string;
  coverImage?: unknown;
};

export type NewsPostDetail = {
  _id: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  slug: string;
  coverImage?: unknown;
  body?: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text?: string;
    }>;
  }>;
};

export const NEWS_POST_DETAIL_QUERY = `*[_type == "newsPost" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  coverImage,
  body
}`;
