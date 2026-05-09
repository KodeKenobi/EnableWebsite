import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = import.meta.env.VITE_SANITY_DATASET as string | undefined;
/** Prefer a stable dated API; future dates can break CDN until Sanity ships that version. */
const apiVersion =
  (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ||
  "2024-01-01";
const readToken = import.meta.env.VITE_SANITY_TOKEN as
  | string
  | undefined;

export const sanityConfigured = Boolean(projectId && dataset);

export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      useCdn: !readToken,
      token: readToken || undefined,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: unknown) {
  if (!builder || !source) return "";
  return builder.image(source as Parameters<typeof builder.image>[0]).width(800).fit("max").url();
}
