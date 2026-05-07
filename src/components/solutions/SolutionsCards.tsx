import { useState } from "react";
import type { SolutionItem } from "@/constants/solutions";

interface SolutionsCardsProps {
  items: SolutionItem[];
  className?: string;
}

export default function SolutionsCards({
  items,
  className = "",
}: SolutionsCardsProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  return (
    <div className={className} onMouseLeave={() => setActiveCardIndex(null)}>
      <div className="flex items-stretch">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className={`group relative flex min-h-[240px] cursor-pointer flex-col justify-center px-4 py-8 text-center transition-all duration-300 ${
              activeCardIndex === idx ? "flex-[1.8]" : "flex-1"
            }`}
            onMouseEnter={() => setActiveCardIndex(idx)}
            onFocus={() => setActiveCardIndex(idx)}
            onClick={() =>
              setActiveCardIndex((prev) => (prev === idx ? null : idx))
            }
            tabIndex={0}
            role="button"
            aria-pressed={activeCardIndex === idx}
          >
            <div
              className={`text-center text-[14px] uppercase text-white/85 md:text-[12px] ${
                activeCardIndex === idx ? "hidden" : "block"
              }`}
              style={{
                fontFamily: "var(--font-body-light)",
                letterSpacing: "0.22em",
                lineHeight: 1.65,
              }}
            >
              {item.title.split(" ").map((w, i) => (
                <div key={`${w}-${i}`}>{w}</div>
              ))}
            </div>

            <div
              className={`mx-auto mt-3 max-w-[30ch] overflow-hidden text-[13px] normal-case tracking-normal text-white/90 transition-all duration-300 md:text-[14px] ${
                activeCardIndex === idx
                  ? "max-h-44 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{
                fontFamily: "var(--font-body-light)",
                lineHeight: 1.55,
              }}
            >
              {item.description}
            </div>

            {idx < items.length - 1 ? (
              <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-white/28" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
