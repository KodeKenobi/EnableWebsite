import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LinesPullUp } from "../animations/textAnimations/LinesPullUp.tsx";
import SolutionsCards from "../solutions/SolutionsCards.tsx";
import { solutionItems } from "@/constants/solutions";

/** Matches `Hero` bottom ribbon (`bottomGradientVariants` fade). */
const solutionsBottomBarVariants = {
  hide: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.25, ease: "easeOut" as const, delay: 1.38 },
  },
} as const;

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasEnteredView = useInView(sectionRef, { amount: 0.35, once: true });

  return (
    <section
      ref={sectionRef}
      className="pointer-events-auto relative z-20 min-h-[100svh] overflow-hidden bg-[#0a3042] text-[var(--color-fg-inverse)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/solutions/solutions.jpg")' }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(98,170,203,0.2)_0%,rgba(8,37,52,0.86)_58%,rgba(5,25,36,0.95)_100%)]"
        initial={{ y: "-110%" }}
        animate={{ y: hasEnteredView ? "0%" : "-110%" }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-4 bg-[#eceff1]"
        initial="hide"
        animate={hasEnteredView ? "show" : "hide"}
        variants={solutionsBottomBarVariants}
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-2 w-28 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[var(--color-accent-strong)]" />
      </motion.div>

      <div className="relative z-[1] mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-between px-4 pb-12 pt-8 sm:px-6 md:px-10 md:pb-16 md:pt-20 lg:px-16 lg:pt-24">
        <div className="text-center">
          <h2 className="section-title-type mx-auto mt-3 max-w-[14ch] text-center text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.42)]">
            <LinesPullUp
              text="Solutions"
              className="section-title-type"
              containerClassName="w-full"
              duration={0.55}
              stagger={0.08}
              once={false}
            />
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

          <SolutionsCards
            items={solutionItems}
            className="mx-auto mt-10 w-full max-w-[1300px] md:mt-16"
          />
        </div>
      </div>
    </section>
  );
}
