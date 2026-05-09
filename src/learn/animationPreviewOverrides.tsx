import type { ReactNode } from "react";
import ASCIIText from "../components/animations/textAnimations/ASCIIText.tsx";
import FloatingLines from "../components/animations/backgrounds/FloatingLines.tsx";
import HoverSlideText from "../components/animations/textAnimations/HoverSlideText.tsx";
import {
  ParagraphSlideText,
  paragraphSlideVariants,
} from "../components/animations/textAnimations/ParagraphSlideText.tsx";
import ScrollGrowText from "../components/animations/textAnimations/ScrollGrowText.tsx";
import { LinesPullUp } from "../components/animations/textAnimations/LinesPullUp.tsx";

/**
 * Animations that need props or site CSS variables before they render sensibly.
 * Key = slug from `getLearnAnimations()` (`category-ComponentName`).
 */
export const animationPreviewOverrides: Record<string, () => ReactNode> = {
  "textAnimations-ASCIIText": () => (
    <div className="h-full min-h-[400px] w-full bg-neutral-950">
      <ASCIIText
        text="ET"
        asciiFontSize={7}
        textFontSize={168}
        textColor="#fdf9f3"
        enableWaves
      />
    </div>
  ),

  "backgrounds-FloatingLines": () => (
    <div className="h-full min-h-[320px] w-full overflow-hidden bg-[#0a1211]">
      <FloatingLines
        linesGradient={["#ff9346", "#7cff67", "#ffee51", "#5227FF"]}
        enabledWaves={["middle", "bottom"]}
        lineCount={[5, 7]}
        lineDistance={[10, 8]}
        animationSpeed={0.42}
        interactive={false}
        parallax={false}
        parallaxStrength={0}
        mixBlendMode="screen"
      />
    </div>
  ),

  "textAnimations-HoverSlideText": () => (
    <div className="group flex h-full min-h-[280px] items-center justify-center bg-zinc-900 p-10 text-white">
      <span className="type-button text-white">
        <HoverSlideText text="Sample CTA" wrapperClassName="whitespace-nowrap" />
      </span>
    </div>
  ),

  "textAnimations-ParagraphSlideText": () => (
    <div className="rounded-lg bg-white p-8 text-zinc-900">
      <ParagraphSlideText
        className="max-w-md text-lg leading-relaxed"
        initial="show"
        animate="show"
        variants={paragraphSlideVariants}
      >
        Sample paragraph used in the hero and contact sections.
      </ParagraphSlideText>
    </div>
  ),

  "textAnimations-ScrollGrowText": () => (
    <div
      className="rounded-lg bg-[var(--color-bg)] p-8"
      style={{ ["--services-copy-progress" as string]: "0.72" }}
    >
      <ScrollGrowText className="text-2xl font-light text-[var(--color-fg)]">
        Scroll-linked headline preview
      </ScrollGrowText>
    </div>
  ),

  "textAnimations-LinesPullUp": () => (
    <div className="rounded-lg bg-[var(--color-fg-strong)] p-8 text-[var(--color-fg-inverse)]">
      <LinesPullUp
        text="Digitalisation is a social and business phenomenon."
        className="font-serif text-3xl leading-tight"
      />
    </div>
  ),
};

export function hasAnimationPreviewOverride(slug: string): boolean {
  return slug in animationPreviewOverrides;
}

export function renderAnimationPreviewOverride(slug: string): ReactNode {
  return animationPreviewOverrides[slug]?.() ?? null;
}
