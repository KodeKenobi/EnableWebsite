import { lazy, Suspense, useMemo } from "react";
import { animationMetaBySlug } from "./animationDiscovery.ts";
import { resolveDefaultExport } from "./resolveAnimationModule.ts";
import {
  hasAnimationPreviewOverride,
  renderAnimationPreviewOverride,
} from "./animationPreviewOverrides.tsx";
import { LearnErrorBoundary } from "./LearnErrorBoundary.tsx";
import { LearnAnimationFrame } from "./LearnAnimationFrame.tsx";

function LearnAnimationSkeleton() {
  return (
    <LearnAnimationFrame>
      <div className="flex h-full items-center justify-center text-sm text-zinc-500">
        Loading module…
      </div>
    </LearnAnimationFrame>
  );
}

export function LearnAnimationViewer({ slug }: { slug: string | undefined }) {
  const meta = slug ? animationMetaBySlug(slug) : null;

  const LazyDefault = useMemo(
    () =>
      meta
        ? lazy(async () => {
            const mod = await meta.importer();
            const Cmp = resolveDefaultExport(
              mod as Record<string, unknown>,
            );
            if (!Cmp)
              throw new Error("No default or PascalCase export to preview.");
            return { default: Cmp };
          })
        : null,
    [meta],
  );

  if (!slug) {
    return (
      <LearnAnimationFrame>
        <div className="flex h-full items-center justify-center p-8 text-center text-sm text-zinc-600">
          Pick an animation in the sidebar to preview it here.
        </div>
      </LearnAnimationFrame>
    );
  }

  if (!meta) {
    return (
      <p className="text-sm text-red-700">
        Unknown animation <code>{slug}</code>.
      </p>
    );
  }

  if (hasAnimationPreviewOverride(slug)) {
    return (
      <LearnAnimationFrame>
        <div className="h-full w-full">{renderAnimationPreviewOverride(slug)}</div>
      </LearnAnimationFrame>
    );
  }

  if (!LazyDefault) return null;

  return (
    <Suspense fallback={<LearnAnimationSkeleton />}>
      <LearnErrorBoundary>
        <LearnAnimationFrame>
          <div className="relative h-full w-full overflow-auto p-2 md:p-4">
            <LazyDefault />
          </div>
        </LearnAnimationFrame>
      </LearnErrorBoundary>
    </Suspense>
  );
}
