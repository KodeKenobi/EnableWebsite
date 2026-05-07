interface HoverSlideTextProps {
  text: string;
  hoverText?: string;
  forceHover?: boolean;
  className?: string;
  hoverClassName?: string;
  wrapperClassName?: string;
}

/**
 * Reusable two-layer vertical slide text treatment.
 * Parent element must have `group` class for hover.
 */
export default function HoverSlideText({
  text,
  hoverText,
  forceHover = false,
  className = "",
  hoverClassName = "",
  wrapperClassName = "",
}: HoverSlideTextProps) {
  const nextText = hoverText ?? text;
  const primaryStateClass = forceHover
    ? "translate-y-full"
    : "translate-y-0 group-hover:translate-y-full";
  const hoverStateClass = forceHover
    ? "translate-y-0"
    : "-translate-y-full group-hover:translate-y-0";
  const baseTextClass =
    "transform-gpu [backface-visibility:hidden] [will-change:transform] transition-transform duration-190 ease-out group-hover:duration-420 group-hover:ease-[cubic-bezier(0.32,0,0.67,1)]";

  return (
    <span
      className={`relative inline-grid overflow-hidden align-baseline ${wrapperClassName}`}
    >
      {/* Reserve width using both labels so the wider one always fits. */}
      <span
        className={`invisible block [grid-area:1/1] ${hoverClassName || className}`}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className={`invisible block [grid-area:1/1] ${hoverClassName || className}`}
        aria-hidden="true"
      >
        {nextText}
      </span>
      <span
        className={`pointer-events-none absolute inset-0 ${baseTextClass} ${primaryStateClass} ${className}`}
      >
        {text}
      </span>
      <span
        className={`pointer-events-none absolute inset-0 ${baseTextClass} ${hoverStateClass} ${hoverClassName}`}
        aria-hidden="true"
      >
        {nextText}
      </span>
    </span>
  );
}
