import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroProps {
  introDone: boolean;
}

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const bandParent = {
  hide: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.04 },
  },
} as const;

const bandLeft = {
  hide: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const bandRight = {
  hide: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const dotsReveal = {
  hide: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.05,
      ease: [0.2, 0.9, 0.2, 1],
      delay: 0.28,
    },
  },
} as const;

/** Matches `Header` (`h-24`) so hero ornaments never enter the nav band. */
const HEADER_OFFSET_CLASS = "top-24";

const copyParent = {
  hide: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.62,
    },
  },
} as const;

const copyItem = {
  hide: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.28, 1],
    },
  },
} as const;

/** Stagger the two headline lines after the kicker (parent column handles kicker → headline slot). */
const headlineParent = {
  hide: {},
  show: {
    transition: { staggerChildren: 0.16 },
  },
} as const;

/**
 * Right semicircle of the burst (center 100,100, r=88) so art only occupies the
 * eastern half — pairs with a column aligned to the orange band’s inner edge.
 */
function DotBurst({ className }: { className?: string }) {
  const rings = [12, 24, 36, 48, 60, 72];
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <clipPath id="heroDotRightSemi" clipPathUnits="userSpaceOnUse">
          <path d="M 100 100 L 100 12 A 88 88 0 0 1 188 100 A 88 88 0 0 1 100 188 Z" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#heroDotRightSemi)"
        className="text-[var(--color-fg-inverse)]"
      >
        <g fill="none" opacity="0.52">
          {rings.map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              stroke="currentColor"
              strokeWidth="0.72"
              strokeDasharray="2 4.5"
              strokeLinecap="round"
            />
          ))}
        </g>
        <g fill="currentColor" opacity="0.82">
          {Array.from({ length: 96 }).map((_, i) => {
            const angle = (i / 96) * Math.PI * 2;
            const rad = 8 + (i % 8) * 9.5;
            const x = 100 + Math.cos(angle) * rad;
            const y = 100 + Math.sin(angle) * rad;
            return <circle key={i} cx={x} cy={y} r="1.15" />;
          })}
        </g>
      </g>
    </svg>
  );
}

const Hero = ({ introDone }: HeroProps) => {
  const phase = introDone ? "show" : "hide";

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden text-[var(--color-fg-inverse)]"
    >
      {/* Full-bleed “stage” — gradient + grain (no external image). */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={phase}
        variants={{
          hide: { opacity: 0.85 },
          show: {
            opacity: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        style={{
          background: `linear-gradient(
            168deg,
            color-mix(in srgb, var(--color-accent) 42%, var(--color-surface-deep)) 0%,
            var(--color-surface-deep) 22%,
            color-mix(in srgb, var(--color-fg-strong) 55%, var(--color-surface-deep)) 48%,
            color-mix(in srgb, var(--color-warm) 35%, var(--color-fg-strong)) 72%,
            var(--color-fg-strong) 100%
          )`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        initial={false}
        animate={phase}
        variants={{
          hide: { opacity: 0 },
          show: {
            opacity: 0.14,
            transition: { duration: 1, ease: "easeOut", delay: 0.08 },
          },
        }}
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        initial={false}
        animate={phase}
        variants={bandParent}
      >
        <motion.div
          variants={bandLeft}
          className="absolute left-0 top-0 h-[38vh] w-full md:h-full md:w-[min(34vw,440px)]"
          style={{
            background:
              "color-mix(in srgb, var(--color-surface-deep) 78%, var(--color-fg-strong) 22%)",
            boxShadow:
              "inset -1px 0 0 color-mix(in srgb, var(--color-fg-inverse) 8%, transparent)",
          }}
        />
        <motion.div
          variants={bandRight}
          className="absolute right-0 top-0 hidden h-full w-[min(22vw,200px)] md:block lg:w-[min(20vw,240px)]"
          style={{ background: "var(--color-warm)" }}
        />
      </motion.div>

      {/* Dots: only right semicircle, only over orange; vertically centered below fixed header. */}
      <motion.div
        className={`pointer-events-none absolute right-0 z-[2] hidden h-[calc(100svh-6rem)] w-[min(22vw,200px)] overflow-hidden md:block lg:w-[min(20vw,240px)] ${HEADER_OFFSET_CLASS} text-[var(--color-fg-inverse)]`}
        initial={false}
        animate={phase}
        variants={dotsReveal}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <DotBurst className="absolute top-1/2 left-0 h-[min(72dvh,calc(100svh-8rem))] w-[min(72dvh,calc(100svh-8rem))] max-h-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-gradient-to-t from-[color-mix(in_srgb,var(--color-fg-strong)_72%,transparent)] via-[color-mix(in_srgb,var(--color-fg-strong)_22%,transparent)] to-transparent"
        initial={false}
        animate={phase}
        variants={{
          hide: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { duration: 0.85, ease: "easeOut", delay: 0.35 },
          },
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-12 gap-x-6 px-5 pb-16 pt-28 md:gap-x-8 md:px-10 lg:px-14 lg:pt-32">
        <motion.div
          className="col-span-12 flex flex-col justify-end md:col-span-5 md:justify-center lg:col-span-5 lg:pr-4"
          initial={false}
          animate={phase}
          variants={copyParent}
        >
          <motion.p
            variants={copyItem}
            className="type-kicker mb-5 text-[color-mix(in_srgb,var(--color-fg-inverse)_78%,var(--color-accent)_22%)] md:mb-7"
          >
            Connected Business
          </motion.p>
          <motion.h1
            className="type-hero-title mb-0 max-w-[14ch] leading-[0.9] drop-shadow-[0_4px_48px_color-mix(in_srgb,var(--color-fg-strong)_55%,transparent)]"
            style={{ fontFamily: "var(--font-display)" }}
            initial={false}
            animate={phase}
            variants={headlineParent}
          >
            <motion.span
              variants={copyItem}
              className="block text-[var(--color-fg-inverse)]"
            >
              Digitali
            </motion.span>
            <motion.span
              variants={copyItem}
              className="mt-1 block text-[color-mix(in_srgb,var(--color-warm)_82%,var(--color-fg-inverse)_18%)]"
            >
              sation
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="col-span-12 flex flex-col justify-end pt-8 md:col-span-7 md:justify-center md:pt-0 lg:col-span-6 lg:col-start-7"
          initial={false}
          animate={phase}
          variants={copyParent}
        >
          <motion.p
            variants={copyItem}
            className="type-hero-body mb-8 max-w-xl text-[color-mix(in_srgb,var(--color-fg-inverse)_92%,transparent)] [text-shadow:0_2px_28px_color-mix(in_srgb,var(--color-fg-strong)_50%,transparent)] md:mb-10"
          >
            Digitalisation is a social and business phenomenon, powered by the
            technologies ET brings to bear—woven processes, systems, customers,
            partners, and employees as the ultimate connected business.
          </motion.p>
          <motion.div
            variants={copyItem}
            className="flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <a
              href="#solutions"
              className="type-button inline-flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--color-fg-inverse)_45%,transparent)] pb-1 text-[var(--color-fg-inverse)] transition-opacity hover:opacity-75"
            >
              Download presentation
              <ArrowRight
                className="size-4 shrink-0"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
            <button
              type="button"
              className="type-button self-start border border-[color-mix(in_srgb,var(--color-fg-inverse)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-fg-inverse)_8%,transparent)] px-5 py-2.5 text-[var(--color-fg-inverse)] transition-opacity hover:opacity-80"
            >
              Our products
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="col-span-12 mt-auto flex justify-start pb-2 md:absolute md:bottom-6 md:left-6 md:col-span-auto lg:bottom-10 lg:left-10"
          initial={false}
          animate={phase}
          variants={copyParent}
        >
          <motion.span
            variants={copyItem}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-fg-inverse)_24%,transparent)] text-[color-mix(in_srgb,var(--color-fg-inverse)_58%,transparent)]"
            aria-hidden
          >
            <ChevronDown className="size-5" strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
