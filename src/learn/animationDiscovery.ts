import type { ComponentType } from "react";

const modules = import.meta.glob<{ default: ComponentType<unknown> }>(
  "../components/animations/**/*.tsx",
);

export type LearnAnimationMeta = {
  slug: string;
  category: string;
  /** File name without extension */
  componentName: string;
  importer: () => Promise<{ default: ComponentType<unknown> }>;
};

const CATEGORY_ORDER = [
  "backgrounds",
  "interactive",
  "motionUi",
  "textAnimations",
] as const;

function slugify(category: string, componentName: string): string {
  return `${category}-${componentName}`.replace(/\s+/g, "");
}

let cache: LearnAnimationMeta[] | null = null;

/**
 * Stable list of animation modules for /learn explorer (derived from filenames).
 */
export function getLearnAnimations(): LearnAnimationMeta[] {
  if (cache) return cache;
  const out: LearnAnimationMeta[] = [];
  for (const path of Object.keys(modules)) {
    const m = path.match(
      /animations\/([^/]+)\/([^/]+)\.(tsx)$/,
    );
    if (!m) continue;
    const [, category, fileBase] = m;
    const importer = modules[path];
    if (!importer) continue;
    out.push({
      slug: slugify(category, fileBase),
      category,
      componentName: fileBase,
      importer,
    });
  }
  out.sort((a, b) => {
    const ci = CATEGORY_ORDER.indexOf(
      a.category as (typeof CATEGORY_ORDER)[number],
    );
    const cj = CATEGORY_ORDER.indexOf(
      b.category as (typeof CATEGORY_ORDER)[number],
    );
    const i = ci === -1 ? 999 : ci;
    const j = cj === -1 ? 999 : cj;
    if (i !== j) return i - j;
    return `${a.category}/${a.componentName}`.localeCompare(
      `${b.category}/${b.componentName}`,
    );
  });
  cache = out;
  return out;
}

export function animationImporterBySlug(
  slug: string,
): LearnAnimationMeta["importer"] | null {
  const hit = getLearnAnimations().find((a) => a.slug === slug);
  return hit ? hit.importer : null;
}

export function animationMetaBySlug(slug: string): LearnAnimationMeta | null {
  return getLearnAnimations().find((a) => a.slug === slug) ?? null;
}

export function groupedAnimationCategories(items: LearnAnimationMeta[]): Record<
  string,
  LearnAnimationMeta[]
> {
  const buckets: Record<string, LearnAnimationMeta[]> = {};
  for (const item of items) {
    if (!buckets[item.category]) buckets[item.category] = [];
    buckets[item.category].push(item);
  }
  return buckets;
}

export { CATEGORY_ORDER };
