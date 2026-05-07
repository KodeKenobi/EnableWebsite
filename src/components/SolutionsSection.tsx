import { useEffect, useRef } from "react";
import ScrollGrowText from "./ui/text/ScrollGrowText.tsx";
import { LinesPullUp } from "./animations/textAnimations/LinesPullUp.tsx";

type SolutionItem = { title: string; description: string };

const solutionItems: SolutionItem[] = [
  {
    title: "Cloud Computing",
    description:
      "Replace physical infrastructure with internet-based remote servers that can store your data offsite and run mission-critical business processes.",
  },
  {
    title: "Unified Communications and Collaboration",
    description:
      "Provide you with an intelligent and scalable way to deliver integrated communications services to your enterprise.",
  },
  {
    title: "Converged Connectivity",
    description:
      "A range of scalable broadband access and network options that allows anyone to be online anywhere, anytime.",
  },
  {
    title: "Mobility",
    description:
      "Allow your workforce to connect to your networks anytime and increase your productivity by giving your business the freedom to do more.",
  },
  {
    title: "Security",
    description:
      "Integrate, educate and implement Security solutions into your day-to-day business operations, from devices and equipment to software and services.",
  },
  {
    title: "Internet of Things and M2M",
    description:
      "Explore the possibilities of connecting all electronic devices to the internet, allowing you to collect usable data and take your business forward.",
  },
  {
    title: "Big Data Analytics",
    description:
      "Turn information into knowledge through analysis and insights, which you can use to make informed business decisions.",
  },
];

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topTitles = [
    "Alternative Asset Management",
    "Wealth Management & Advisory",
    "Traditional Financial Services",
    "Digital & Crypto Ecosystem",
    "Corporate Investor Relations",
  ];

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
        "--solutions-copy-progress",
        current.toFixed(4),
      );

      if (Math.abs(target - current) > 0.001) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        current = target;
        sectionEl.style.setProperty(
          "--solutions-copy-progress",
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
    sectionEl.style.setProperty(
      "--solutions-copy-progress",
      current.toFixed(4),
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      sectionEl.style.setProperty("--solutions-copy-progress", "0");
    };
  }, []);

  return (
    <section
      id="our-solutions"
      ref={sectionRef}
      className="pointer-events-auto relative z-20 h-screen overflow-hidden bg-[#0a3042] text-[var(--color-fg-inverse)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(98,170,203,0.2)_0%,rgba(8,37,52,0.86)_58%,rgba(5,25,36,0.95)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[#072b3b]/92" />

      <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col justify-between px-6 pb-6 pt-10 md:px-10 md:pb-8 md:pt-24 lg:px-16">
        <div className="text-center">
          <h2 className="section-title-type mx-auto mt-3 max-w-[14ch] text-center text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.42)]">
            <ScrollGrowText
              from="left"
              progressVar="--solutions-copy-progress"
              motionAxis="y"
              className="section-title-type"
            >
              Solutions
            </ScrollGrowText>
          </h2>
          <div className="section-body-type mx-auto mt-6 max-w-5xl text-center text-white">
            <LinesPullUp
              text="Our solutions range from: Server and Virtualization solutions, Software and Application solutions, Network and Security, License compliance and renewals, office supply, Printers and peripherals, Hardware and Software supply, Support and Project management in the vast and often intricate Information Technology Industry."
              className="section-body-type"
              containerClassName="w-full"
              duration={0.55}
              stagger={0.06}
              once={false}
            />
          </div>

          <div className="mx-auto mt-16 w-full max-w-[1050px]">
            <div className="grid grid-cols-5 items-stretch">
              {topTitles.map((title, idx) => (
                <div
                  key={title}
                  className={`relative flex items-center justify-center px-4 py-6 ${
                    idx < topTitles.length - 1
                      ? "after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-white/28 after:content-['']"
                      : ""
                  }`}
                >
                  <div
                    className="text-center text-[14px] uppercase text-white/85 md:text-[12px]"
                    style={{
                      fontFamily: "var(--font-body-light)",
                      letterSpacing: "0.22em",
                      lineHeight: 1.65,
                    }}
                  >
                    {title.split(" ").map((w, i) => (
                      <div key={`${w}-${i}`}>{w}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
