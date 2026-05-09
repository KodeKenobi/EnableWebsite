import { useEffect, useRef, useState } from "react";
import ScrollGrowText from "../animations/textAnimations/ScrollGrowText.tsx";
import CircularCardStack from "../services/CircularCardStack.tsx";
import { services } from "@/constants/services";
import ServicesSelector from "../services/ServicesSelector.tsx";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let rafId = 0;
    let current = 0;
    let target = 0;
    let isMobile = window.matchMedia("(max-width: 767px)").matches;

    const computeTargetProgress = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const travelFactor = isMobile ? 0.48 : 0.64;
      const raw = (vh - rect.top) / (vh * travelFactor);
      const clamped = Math.min(Math.max(raw, 0), 1);
      if (!isMobile) return clamped;
      // Mobile needs faster visual catch-up so copy doesn't stay dim.
      return Math.pow(clamped, 0.52);
    };

    const tick = () => {
      const smoothing = isMobile ? 0.38 : 0.44;
      current += (target - current) * smoothing;
      sectionEl.style.setProperty(
        "--services-copy-progress",
        current.toFixed(4),
      );

      if (Math.abs(target - current) > 0.001) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        current = target;
        sectionEl.style.setProperty(
          "--services-copy-progress",
          current.toFixed(4),
        );
        rafId = 0;
      }
    };

    const onScroll = () => {
      target = computeTargetProgress();
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    const onResize = () => {
      isMobile = window.matchMedia("(max-width: 767px)").matches;
      onScroll();
    };

    target = computeTargetProgress();
    current = target;
    sectionEl.style.setProperty("--services-copy-progress", current.toFixed(4));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
      sectionEl.style.setProperty("--services-copy-progress", "0");
    };
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="pointer-events-auto relative z-20 min-h-[100svh] overflow-hidden bg-[#ebedef] text-[#0a2f3e]"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[46%] bg-[#063244]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col justify-start gap-3 px-4 pb-3 pt-8 sm:px-6 md:justify-between md:gap-0 md:px-10 md:pb-8 md:pt-20 lg:px-16 lg:pt-24">
        <div className="text-center md:text-right">
          <h2 className="section-title-type mx-auto max-w-[14ch] text-center !text-[clamp(1.9rem,9vw,3.1rem)] md:!text-[clamp(2.25rem,6.5vw,5.25rem)] md:ml-auto md:mr-0 md:text-right">
            <ScrollGrowText
              from="right"
              yStartRem={0.5}
              motionAxis="y"
              endScale={1.05}
            >
              Services
            </ScrollGrowText>
          </h2>
          <p className="section-body-type mx-auto mt-4 max-w-xl text-center !text-[clamp(1rem,3.8vw,1.15rem)] leading-[1.5] md:ml-auto md:mr-0 md:mt-6 md:!text-[clamp(1.25rem,2vw,1.25rem)] md:text-right">
            <ScrollGrowText
              from="left"
              yStartRem={1}
              startScale={0.94}
              endScale={1.05}
              opacityFloor={0.36}
            >
              At Enable Technologies we get to know your business and then
              together assess where technology can optimize or improve your
              business utilizing our specialized services, personalized
              approach, and unwavering commitment to excellence.
            </ScrollGrowText>
          </p>
        </div>

        <div className="relative flex min-h-0 items-center justify-center py-1 md:flex-1 md:py-4">
          <CircularCardStack
            items={services.map((service) => ({
              id: service.title,
              gradient: service.gradient,
              lottieSrc: service.lottieSrc,
            }))}
            activeIndex={activeIndex}
          />
        </div>

        <div className="mt-1 pb-1 md:mt-0 md:pb-0">
          <ServicesSelector
            items={services}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>
    </section>
  );
}
