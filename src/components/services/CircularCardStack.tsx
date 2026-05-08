import React, { useEffect } from "react";
import { useState } from "react";

type CircularCardItem = {
  id: string;
  gradient: string;
  lottieSrc: string;
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scriptId = "dotlottie-player-script";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.head.appendChild(script);
  }, []);

  if (!items.length) return null;

  return (
    <div
      className={`relative h-[clamp(250px,46vh,420px)] w-full max-w-[1120px] ${containerClassName}`}
    >
      {items.map((item, index) => {
        const relative = getRelativePosition(index, activeIndex, items.length);
        const abs = Math.abs(relative);

        const x = relative * (isMobile ? 72 : 140);
        const y = isMobile
          ? abs === 0
            ? 0
            : abs === 1
              ? 8
              : abs === 2
                ? 16
                : 22
          : abs === 0
            ? 0
            : abs === 1
              ? 10
              : abs === 2
                ? 22
                : 32;
        const scale = isMobile
          ? abs === 0
            ? 1
            : abs === 1
              ? 0.88
              : abs === 2
                ? 0.76
                : 0.66
          : abs === 0
            ? 1
            : abs === 1
              ? 0.9
              : abs === 2
                ? 0.8
                : 0.72;
        const opacity = isMobile
          ? abs === 0
            ? 1
            : abs === 1
              ? 0.92
              : abs === 2
                ? 0.72
                : 0.52
          : abs === 0
            ? 1
            : abs === 1
              ? 0.95
              : abs === 2
                ? 0.82
                : 0.65;
        const zIndex = 60 - abs * 10;

        return (
          <article
            key={item.id}
            className={`absolute left-1/2 top-[8%] h-[clamp(180px,34vh,290px)] w-[min(72vw,520px)] sm:w-[min(58vw,520px)] overflow-hidden rounded-sm border border-white/30 shadow-[0_16px_40px_rgba(0,0,0,.28)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [&>dotlottie-player]:block [&>dotlottie-player]:h-full [&>dotlottie-player]:w-full ${cardClassName}`}
            style={{
              transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) scale(${scale})`,
              zIndex,
              opacity,
              background: item.gradient,
            }}
            aria-hidden={relative !== 0}
          >
            {React.createElement("dotlottie-player", {
              src: item.lottieSrc,
              autoplay: true,
              loop: true,
              class: "h-full w-full",
              style: {
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "contain",
                objectPosition: "center",
              },
            })}
          </article>
        );
      })}

      <div className="absolute left-1/2 top-[74%] h-9 w-[min(72vw,520px)] sm:h-10 sm:w-[min(58vw,520px)] -translate-x-1/2 bg-[#2d4f61]/90" />
    </div>
  );
}
