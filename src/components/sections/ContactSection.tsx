import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ParagraphSlideText,
  paragraphSlideVariants,
} from "../animations/textAnimations/ParagraphSlideText.tsx";
import HoverSlideText from "../animations/textAnimations/HoverSlideText.tsx";

const revealLeft = {
  hide: { opacity: 0, x: -34 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const revealScale = {
  hide: { opacity: 0, scale: 0.96, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const fieldReveal = {
  hide: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.34 + i * 0.06,
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  const reveal = inView ? "show" : "hide";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[40] overflow-hidden bg-[#f5f8fb] px-4 py-16 text-[#0f2430] sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-blue-300/16 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.h2
            className="mt-4 max-w-[10ch] font-serif text-[clamp(2.2rem,8vw,4.25rem)] leading-[0.9] tracking-[-0.01em]"
            initial="hide"
            animate={reveal}
            variants={revealLeft}
            transition={{ delay: 0.1 }}
          >
            Start something impossible.
          </motion.h2>
          <ParagraphSlideText
            className="mt-6 max-w-xl text-[clamp(1rem,1.7vw,1.3rem)] leading-relaxed text-[#1a3b4d]/80"
            initial="hide"
            animate={reveal}
            variants={{
              hide: paragraphSlideVariants.hide,
              show: {
                ...paragraphSlideVariants.show,
                transition: {
                  ...paragraphSlideVariants.show.transition,
                  delay: 0.16,
                },
              },
            }}
          >
            Bring the ambition. We&apos;ll shape the architecture, roadmap, and
            delivery path that gets you there.
          </ParagraphSlideText>
          <motion.div
            className="mt-10 space-y-2 text-sm text-[#2a536a]/80"
            initial="hide"
            animate={reveal}
            variants={revealScale}
            transition={{ delay: 0.3 }}
          >
            <p>
              Email{" "}
              <a
                href="mailto:contact@enabletechnologies.com"
                className="text-[#0f2430] underline-offset-4 hover:underline"
              >
                contact@enabletechnologies.com
              </a>
            </p>
            <p>Response time within 1 business day</p>
          </motion.div>
        </div>

        <motion.form
          className="lg:col-span-7"
          action="mailto:contact@enabletechnologies.com"
          method="post"
          encType="text/plain"
          initial="hide"
          animate={reveal}
          variants={revealScale}
          transition={{ delay: 0.22 }}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <motion.label
              custom={0}
              initial="hide"
              animate={reveal}
              variants={fieldReveal}
              className="group flex flex-col gap-3 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#25516a]/75"
            >
              Full name
              <input
                type="text"
                name="fullName"
                required
                className="h-11 border-0 border-b border-[#2f6078]/35 bg-transparent px-0 text-base normal-case tracking-normal text-[#0f2430] outline-none transition-colors placeholder:text-[#557a90]/55 focus:border-[#1f4b62]"
                placeholder="Your name"
              />
            </motion.label>
            <motion.label
              custom={1}
              initial="hide"
              animate={reveal}
              variants={fieldReveal}
              className="group flex flex-col gap-3 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#25516a]/75"
            >
              Email
              <input
                type="email"
                name="email"
                required
                className="h-11 border-0 border-b border-[#2f6078]/35 bg-transparent px-0 text-base normal-case tracking-normal text-[#0f2430] outline-none transition-colors placeholder:text-[#557a90]/55 focus:border-[#1f4b62]"
                placeholder="you@company.com"
              />
            </motion.label>
            <motion.label
              custom={2}
              initial="hide"
              animate={reveal}
              variants={fieldReveal}
              className="group flex flex-col gap-3 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#25516a]/75"
            >
              Company
              <input
                type="text"
                name="company"
                className="h-11 border-0 border-b border-[#2f6078]/35 bg-transparent px-0 text-base normal-case tracking-normal text-[#0f2430] outline-none transition-colors placeholder:text-[#557a90]/55 focus:border-[#1f4b62]"
                placeholder="Company name"
              />
            </motion.label>
            <motion.label
              custom={3}
              initial="hide"
              animate={reveal}
              variants={fieldReveal}
              className="group flex flex-col gap-3 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#25516a]/75"
            >
              Phone
              <input
                type="tel"
                name="phone"
                className="h-11 border-0 border-b border-[#2f6078]/35 bg-transparent px-0 text-base normal-case tracking-normal text-[#0f2430] outline-none transition-colors placeholder:text-[#557a90]/55 focus:border-[#1f4b62]"
                placeholder="+1 555 000 0000"
              />
            </motion.label>
          </div>

          <motion.label
            custom={4}
            initial="hide"
            animate={reveal}
            variants={fieldReveal}
            className="mt-7 flex flex-col gap-3 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#25516a]/75"
          >
            Subject
            <input
              type="text"
              name="subject"
              required
              className="h-11 border-0 border-b border-[#2f6078]/35 bg-transparent px-0 text-base normal-case tracking-normal text-[#0f2430] outline-none transition-colors placeholder:text-[#557a90]/55 focus:border-[#1f4b62]"
              placeholder="What can we help with?"
            />
          </motion.label>

          <motion.label
            custom={5}
            initial="hide"
            animate={reveal}
            variants={fieldReveal}
            className="mt-7 flex flex-col gap-3 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-[#25516a]/75"
          >
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="resize-y border-0 border-b border-[#2f6078]/35 bg-transparent px-0 py-2 text-base normal-case tracking-normal text-[#0f2430] outline-none transition-colors placeholder:text-[#557a90]/55 focus:border-[#1f4b62]"
              placeholder="Tell us about your project, timeline, and key goals."
            />
          </motion.label>

          <motion.div
            custom={6}
            initial="hide"
            animate={reveal}
            variants={fieldReveal}
            className="mt-8 flex flex-wrap items-center justify-between gap-4"
          >
            <p className="text-xs uppercase tracking-[0.08em] text-[#496a7f]/80">
              By submitting, you agree to be contacted by our team.
            </p>
            <button
              type="submit"
              className="group inline-flex items-center justify-center rounded-tr-full rounded-br-lg border border-[#1f4b62]/40 bg-[#1f4b62]/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f2430] transition-colors hover:bg-[#1f4b62] hover:text-white"
            >
              <HoverSlideText text="Send inquiry" />
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
