import HoverSlideText from "../animations/textAnimations/HoverSlideText.tsx";
import type { ServiceCard } from "@/constants/services";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServicesSelectorProps {
  items: ServiceCard[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ServicesSelector({
  items,
  activeIndex,
  onSelect,
}: ServicesSelectorProps) {
  const goPrev = () => {
    const next = (activeIndex - 1 + items.length) % items.length;
    onSelect(next);
  };

  const goNext = () => {
    const next = (activeIndex + 1) % items.length;
    onSelect(next);
  };

  return (
    <>
      <div className="flex items-center justify-between px-1 md:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous service"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white/90 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-4" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={() => onSelect(activeIndex)}
          className="mx-3 min-w-0 flex-1 text-center"
          aria-label={`Active service ${items[activeIndex]?.title ?? ""}`}
        >
          <span className="block truncate font-sans text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {items[activeIndex]?.title}
          </span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next service"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white/90 transition-colors hover:bg-white/10"
        >
          <ChevronRight className="size-4" strokeWidth={2.2} />
        </button>
      </div>

      <div className="hidden md:grid md:grid-cols-6 md:gap-y-3">
        {items.map((service, index) => (
          <button
            key={service.title}
            type="button"
            onClick={() => onSelect(index)}
            onMouseEnter={() => onSelect(index)}
            onFocus={() => onSelect(index)}
            aria-pressed={index === activeIndex}
            className={`group text-center font-sans text-sm uppercase tracking-widest font-semibold leading-[1.1] transition-colors duration-300 ${
              index === activeIndex
                ? "text-[var(--color-accent-strong)]"
                : "text-white/92"
            } hover:text-white`}
          >
            <HoverSlideText
              text={service.title}
              hoverText="See More"
              forceHover={index === activeIndex}
              wrapperClassName={`inline-block hover-underline-text whitespace-nowrap ${index === activeIndex ? "is-active" : ""}`}
              className="text-sm uppercase tracking-widest font-semibold leading-[1.1] whitespace-nowrap"
              hoverClassName="text-sm uppercase tracking-widest font-semibold leading-[1.1] text-white whitespace-nowrap"
            />
          </button>
        ))}
      </div>
    </>
  );
}
