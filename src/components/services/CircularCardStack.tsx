type CircularCardItem = {
  id: string;
  gradient: string;
};

interface CircularCardStackProps {
  items: CircularCardItem[];
  activeIndex: number;
  cardClassName?: string;
  containerClassName?: string;
}

function getWrappedIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

/**
 * Keeps cards balanced around the active card using shortest circular distance.
 * This guarantees cards exist on both sides while all items remain in the stack.
 */
function getRelativePosition(index: number, activeIndex: number, total: number) {
  const normalizedActive = getWrappedIndex(activeIndex, total);
  const forward = getWrappedIndex(index - normalizedActive, total);
  return forward > total / 2 ? forward - total : forward;
}

export default function CircularCardStack({
  items,
  activeIndex,
  cardClassName = "",
  containerClassName = "",
}: CircularCardStackProps) {
  if (!items.length) return null;

  return (
    <div
      className={`relative h-[clamp(260px,52vh,420px)] w-full max-w-[1120px] ${containerClassName}`}
    >
      {items.map((item, index) => {
        const relative = getRelativePosition(index, activeIndex, items.length);
        const abs = Math.abs(relative);

        const x = relative * 140;
        const y = abs === 0 ? 0 : abs === 1 ? 10 : abs === 2 ? 22 : 32;
        const scale = abs === 0 ? 1 : abs === 1 ? 0.9 : abs === 2 ? 0.8 : 0.72;
        const opacity = abs === 0 ? 1 : abs === 1 ? 0.95 : abs === 2 ? 0.82 : 0.65;
        const zIndex = 60 - abs * 10;

        return (
          <article
            key={item.id}
            className={`absolute left-1/2 top-[8%] h-[clamp(190px,36vh,290px)] w-[min(54vw,520px)] rounded-sm border border-white/30 shadow-[0_16px_40px_rgba(0,0,0,.28)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${cardClassName}`}
            style={{
              transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) scale(${scale})`,
              zIndex,
              opacity,
              background: item.gradient,
            }}
            aria-hidden={relative !== 0}
          />
        );
      })}

      <div className="absolute left-1/2 top-[74%] h-10 w-[min(54vw,520px)] -translate-x-1/2 bg-[#2d4f61]/90" />
    </div>
  );
}
