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

    const computeTargetProgress = () => {
      const rect = sectionEl.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const raw = (vh - rect.top) / (vh * 0.85);
      return Math.min(Math.max(raw, 0), 1);
    };

    const tick = () => {
      current += (target - current) * 0.16;
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

    target = computeTargetProgress();
    current = target;
    sectionEl.style.setProperty("--services-copy-progress", current.toFixed(4));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      sectionEl.style.setProperty("--services-copy-progress", "0");
    };
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="pointer-events-auto relative z-20 h-screen overflow-hidden bg-[#ebedef] text-[#0a2f3e]"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[46%] bg-[#063244]"
        aria-hidden
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col justify-between px-6 pb-6 pt-10 md:px-10 md:pb-8 md:pt-24 lg:px-16">
        <div className="text-right">
          <h2 className="section-title-type ml-auto max-w-[14ch] text-right">
            <ScrollGrowText
              from="right"
              yStartRem={0.5}
              motionAxis="y"
              endScale={1.05}
            >
              Services
            </ScrollGrowText>
          </h2>
          <p className="section-body-type ml-auto mt-6 max-w-xl text-right">
            <ScrollGrowText
              from="left"
              yStartRem={1}
              startScale={0.94}
              endScale={1.05}
            >
              At Enable Technologies we get to know your business and then
              together assess where technology can optimize or improve your
              business utilizing our specialized services, personalized
              approach, and unwavering commitment to excellence.
            </ScrollGrowText>
          </p>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center py-3 md:py-4">
          <CircularCardStack
            items={services.map((service) => ({
              id: service.title,
              gradient: service.gradient,
            }))}
            activeIndex={activeIndex}
          />
        </div>

        <ServicesSelector
          items={services}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </section>
  );
}
