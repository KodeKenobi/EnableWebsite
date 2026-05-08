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
      {/* Mobile: two columns with center divider + row lines */}
      <div className="relative md:hidden">
        <div className="space-y-0">
          {Array.from({ length: Math.ceil(items.length / 2) }).map((_, rowIndex) => {
            const leftItem = items[rowIndex * 2];
            const rightItem = items[rowIndex * 2 + 1];
            const rowHasSingleItem = !!leftItem && !rightItem;
            return (
              <div
                key={`row-${rowIndex}`}
                className={`grid grid-cols-2 border-b border-white/30 ${
                  rowHasSingleItem ? "" : "[&>*:first-child]:border-r [&>*:first-child]:border-white/35"
                }`}
              >
                {[leftItem, rightItem].map((item, colIndex) => {
                  if (!item) {
                    if (rowHasSingleItem) return null;
                    return <div key={`empty-${rowIndex}-${colIndex}`} className="min-h-24" />;
                  }
                  const idx = rowIndex * 2 + colIndex;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() =>
                        setActiveCardIndex((prev) => (prev === idx ? null : idx))
                      }
                      aria-pressed={activeCardIndex === idx}
                      className={`group flex min-h-24 flex-col items-center justify-center px-3 py-5 text-center ${
                        rowHasSingleItem ? "col-span-2" : ""
                      }`}
                    >
                      <span
                        className={`text-[11px] uppercase text-white/88 transition-opacity duration-200 ${
                          activeCardIndex === idx ? "opacity-0" : "opacity-100"
                        }`}
                        style={{
                          fontFamily: "var(--font-body-light)",
                          letterSpacing: "0.2em",
                          lineHeight: 1.55,
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`mx-auto mt-2 max-w-[22ch] overflow-hidden text-[12px] normal-case tracking-normal text-white/90 transition-all duration-300 ${
                          activeCardIndex === idx
                            ? "max-h-28 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                        style={{
                          fontFamily: "var(--font-body-light)",
                          lineHeight: 1.45,
                        }}
                      >
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: existing expanding horizontal cards */}
      <div className="hidden items-stretch md:flex">
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
              className={`text-center text-[12px] uppercase text-white/85 ${
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
              className={`mx-auto mt-3 max-w-[30ch] overflow-hidden text-[14px] normal-case tracking-normal text-white/90 transition-all duration-300 ${
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
