import type { CSSProperties, ReactNode } from "react";

interface ScrollGrowTextProps {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  progressVar?: string;
  motionAxis?: "x" | "y" | "both" | "none";
  xStartRem?: number;
  yStartRem?: number;
  startScale?: number;
  endScale?: number;
  /** Default 0.14 — bumped on Services desktop so headlines do not linger dim. */
  opacityFloor?: number;
}

/**
 * Reusable scroll-linked text treatment:
 * - can animate on X, Y, both, or none
 * - starts shrinked, then grows as scroll progress approaches 1
 */
export default function ScrollGrowText({
  children,
  className = "",
  from = "left",
  progressVar = "--services-copy-progress",
  motionAxis = "both",
  xStartRem = 1,
  yStartRem = 0.9,
  startScale = 0.92,
  endScale = 1.06,
  opacityFloor = 0.14,
}: ScrollGrowTextProps) {
  const signedX = from === "left" ? -Math.abs(xStartRem) : Math.abs(xStartRem);
  const xOffset =
    motionAxis === "x" || motionAxis === "both" ? `${signedX}rem` : "0rem";
  const yOffset =
    motionAxis === "y" || motionAxis === "both" ? `${yStartRem}rem` : "0rem";
  const scaleDelta = endScale - startScale;

  const opacitySpread = 1 - opacityFloor;
  const style = {
    transform: `translate3d(calc((1 - var(${progressVar}, 0)) * ${xOffset}), calc((1 - var(${progressVar}, 0)) * ${yOffset}), 0) scale(calc(${startScale} + var(${progressVar}, 0) * ${scaleDelta}))`,
    transformOrigin: "center center",
    willChange: "transform, opacity",
    opacity: `calc(${opacityFloor} + var(${progressVar}, 0) * ${opacitySpread})`,
  } satisfies CSSProperties;

  return (
    <span
      className={`block transform-gpu [backface-visibility:hidden] ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
