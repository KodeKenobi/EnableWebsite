import type { CSSProperties, ReactNode } from "react";

interface ScrollGrowTextProps {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  progressVar?: string;
  xStartRem?: number;
  yStartRem?: number;
  startScale?: number;
  endScale?: number;
}

/**
 * Reusable scroll-linked text treatment:
 * - starts slightly shifted on the X axis (-1 or +1 by default)
 * - starts slightly lower on the Y axis
 * - starts shrinked, then grows as scroll progress approaches 1
 */
export default function ScrollGrowText({
  children,
  className = "",
  from = "left",
  progressVar = "--services-copy-progress",
  xStartRem = 1,
  yStartRem = 0.9,
  startScale = 0.92,
  endScale = 1.06,
}: ScrollGrowTextProps) {
  const signedX = from === "left" ? -Math.abs(xStartRem) : Math.abs(xStartRem);
  const scaleDelta = endScale - startScale;

  const style = {
    transform: `translate3d(calc((1 - var(${progressVar}, 0)) * ${signedX}rem), calc((1 - var(${progressVar}, 0)) * ${yStartRem}rem), 0) scale(calc(${startScale} + var(${progressVar}, 0) * ${scaleDelta}))`,
    transformOrigin: "center center",
    willChange: "transform, opacity",
    opacity: `calc(0.14 + var(${progressVar}, 0) * 0.86)`,
  } satisfies CSSProperties;

  return (
    <span className={`block transform-gpu [backface-visibility:hidden] ${className}`} style={style}>
      {children}
    </span>
  );
}
