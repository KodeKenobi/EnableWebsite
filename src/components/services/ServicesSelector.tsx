import HoverSlideText from "../animations/textAnimations/HoverSlideText.tsx";
import type { ServiceCard } from "@/constants/services";

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
  return (
    <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-3 md:grid-cols-6">
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
            wrapperClassName={`inline-block hover-underline-text ${index === activeIndex ? "is-active" : ""}`}
            className="text-sm uppercase tracking-widest font-semibold leading-[1.1] whitespace-nowrap"
            hoverClassName="text-sm uppercase tracking-widest font-semibold leading-[1.1] text-white whitespace-nowrap"
          />
        </button>
      ))}
    </div>
  );
}
