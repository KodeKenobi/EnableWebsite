import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { introProfileLog, isIntroProfiling } from "../../lib/introProfile.ts";
import { ArrowRight, ChevronDown } from "lucide-react";
import FloatingLines from "../animations/backgrounds/FloatingLines.tsx";
import {
  ParagraphSlideText,
  paragraphSlideVariants,
} from "../animations/textAnimations/ParagraphSlideText.tsx";
import HoverSlideText from "../animations/textAnimations/HoverSlideText.tsx";

interface HeroProps {
  introDone: boolean;
  onRevealReady?: () => void;
}

type HeroRevealPhase = "idle" | "loading" | "playing";

/** Minimum loading beat after intro (or on refresh when intro is skipped). */
const HERO_LOADING_MS = 420;

const EASE = [0.22, 1, 0.36, 1] as const;

const BG_DURATION = 1.45;

/** Paragraph-slide duration per layer. */
const TEXT_SLIDE_DURATION = 1.2;

/** Offset between headline → paragraph → CTAs → scroll (seconds). */
const COPY_STAGGER = 0.18;

/** Base beat for hero copy once the backdrop has mostly settled (~matches `BG_DURATION`). */
const HERO_COPY_BASE = 1.72;

/** Delays in seconds from the start of the `playing` phase (ornament / backdrop layers). */
const T = {
  bg: 0,
  noise: 0.2,
  rightBand: 1,
  leftBand: 1.42,
  dots: 1.58,
  gradient: 1.38,
} as const;

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const bgVariants = {
  hide: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: BG_DURATION,
      ease: [0.33, 0, 0.2, 1] as const,
      delay: T.bg,
    },
  },
} as const;

const noiseVariants = {
  hide: { opacity: 0 },
  show: {
    opacity: 0.06,
    transition: { duration: 1.05, ease: "easeOut", delay: T.noise },
  },
} as const;

const bandRightVariants = {
  hide: { opacity: 0, x: "100%" },
  show: {
    opacity: 0.85,
    x: 0,
    transition: { delay: T.rightBand, duration: 1.12, ease: EASE },
  },
} as const;

const bandLeftVariants = {
  hide: { opacity: 0, x: "-100%" },
  show: {
    opacity: 0.85,
    x: 0,
    transition: { delay: T.leftBand, duration: 1.12, ease: EASE },
  },
} as const;

const dotsVariants = {
  hide: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 0.35,
    scale: 1,
    transition: {
      delay: T.dots,
      duration: 1.05,
      ease: [0.25, 0.85, 0.25, 1] as const,
    },
  },
} as const;

const bottomGradientVariants = {
  hide: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut", delay: T.gradient },
  },
} as const;

const paragraphEase = paragraphSlideVariants.show.transition.ease;

/**
 * Copy column variants without embedded transitions — delays/durations come only from
 * the `transition` prop (mobile-aware). Mixing variant + prop transitions caused janky easing.
 */
const heroCopySlideVariants = {
  hide: { ...paragraphSlideVariants.hide },
  show: { opacity: 1, y: 0 },
} as const;

const heroScrollRevealVariants = {
  hide: { opacity: 0, y: paragraphSlideVariants.hide.y },
  show: { opacity: 1, y: 0 },
} as const;

/** Matches `Header` (`h-24`) so hero ornaments never enter the nav band. */
const HEADER_OFFSET_CLASS = "top-24";

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function setHeroTextVars(
  root: HTMLElement,
  progress: number,
  desktop: boolean,
): void {
  const clamped = clamp01(progress);
  const scale = 1 - clamped * (desktop ? 0.08 : 0.11);
  const fade = desktop ? 0.82 : 1.35;
  const opacity = Math.max(desktop ? 0.22 : 0, 1 - clamped * fade);
  root.style.setProperty("--hero-text-progress", clamped.toFixed(4));
  root.style.setProperty("--hero-text-scale", scale.toFixed(4));
  root.style.setProperty("--hero-text-opacity", opacity.toFixed(4));
}

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

const Hero = ({ introDone, onRevealReady }: HeroProps) => {
  const [phase, setPhase] = useState<HeroRevealPhase>("idle");
  const [isMobile, setIsMobile] = useState(false);
  /** Mount WebGL after the first frames of hero motion so the GPU isn’t compiling shaders mid-tween. */
  const [webglHeroReady, setWebglHeroReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const heroCopyBase = isMobile ? HERO_COPY_BASE - 0.34 : HERO_COPY_BASE;
  const copyStagger = isMobile ? 0.2 : COPY_STAGGER;
  const textDuration = isMobile ? 1.08 : TEXT_SLIDE_DURATION;
  const heroTitleDelay = heroCopyBase;
  const heroBodyDelay = heroCopyBase + copyStagger;
  const heroCtasDelay = heroCopyBase + copyStagger * 2;
  const heroScrollDelay = heroCopyBase + copyStagger * 3;

  const scrollToServices = () => {
    const target = document.getElementById("solutions");
    if (!target) return;
    const isDesktopHeader = window.matchMedia("(min-width: 768px)").matches;
    const headerOffset = isDesktopHeader ? 96 : 80;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  useEffect(() => {
    const root = document.documentElement;
    let rafId = 0;
    let current = 0;
    let target = 0;
    const mq = window.matchMedia("(min-width: 768px)");

    const isDesktop = () => mq.matches;

    const computeTargetProgress = () => {
      const vh = Math.max(window.innerHeight, 1);
      const denom = isDesktop() ? vh * 0.36 : vh * 0.6;
      return clamp01(window.scrollY / denom);
    };

    const tick = () => {
      const desktop = isDesktop();
      const k = desktop ? 0.36 : 0.2;
      current += (target - current) * k;
      setHeroTextVars(root, current, desktop);

      if (Math.abs(target - current) > 0.001) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        current = target;
        setHeroTextVars(root, current, desktop);
        rafId = 0;
      }
    };

    const onScroll = () => {
      target = computeTargetProgress();
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    target = computeTargetProgress();
    current = target;
    setHeroTextVars(root, current, isDesktop());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      setHeroTextVars(root, 0, mq.matches);
    };
  }, []);

  useEffect(() => {
    setWebglHeroReady(false);
    if (phase !== "playing" || !introDone) return;
    let t = window.setTimeout(() => setWebglHeroReady(true), 120);
    return () => window.clearTimeout(t);
  }, [phase, introDone]);

  useEffect(() => {
    if (!introDone) {
      setPhase("idle");
      return;
    }
    if (isIntroProfiling()) {
      introProfileLog("hero:introDoneReceived");
    }
    setPhase("loading");
    const t = window.setTimeout(() => {
      setPhase("playing");
    }, HERO_LOADING_MS);
    return () => window.clearTimeout(t);
  }, [introDone]);

  useEffect(() => {
    if (!isIntroProfiling()) return;
    introProfileLog("hero:phase", { phase });
  }, [phase]);

  useEffect(() => {
    if (!isIntroProfiling() || phase !== "playing") return;
    /** Last staggered headline track (approx); useful for throughput timing when waiting past scroll unlock. */
    const settleMs = Math.round((heroScrollDelay + textDuration) * 1000) + 100;
    introProfileLog("hero:lastMotionApproxSettleScheduledMs", {
      settleMs,
    });
    const id = window.setTimeout(() => {
      introProfileLog("hero:lastMotionApproxDone");
    }, settleMs);
    return () => window.clearTimeout(id);
  }, [phase, heroScrollDelay, textDuration]);

  useEffect(() => {
    if (phase === "playing") {
      onRevealReady?.();
    }
  }, [phase, onRevealReady]);

  const motionPhase = phase === "playing" ? "show" : "hide";
  const showLoadingOverlay = introDone && phase === "loading";

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--color-fg-strong)] text-[var(--color-fg-inverse)]"
    >
      {showLoadingOverlay ? (
        <div
          className="absolute inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-[var(--color-fg-strong)]"
          aria-busy="true"
          aria-live="polite"
        >
          <div
            className="size-9 rounded-full border-2 border-[color-mix(in_srgb,var(--color-fg-inverse)_22%,transparent)] border-t-[var(--color-fg-inverse)] motion-safe:animate-spin"
            aria-hidden
          />
          <span className="sr-only">Loading hero</span>
        </div>
      ) : null}

      <motion.div
        className="pointer-events-none absolute inset-0"
        initial="hide"
        animate={motionPhase}
        variants={bgVariants}
      >
        {/* Mount WebGL after intro + a short beat so Framer’s first paints aren’t competing with shader compile. */}
        {introDone && phase === "playing" && webglHeroReady ? (
          <FloatingLines
            linesGradient={["#ff9346", "#7cff67", "#ffee51", "#5227FF"]}
            enabledWaves={["middle", "bottom"]}
            lineCount={[4, 5]}
            lineDistance={[10, 8]}
            animationSpeed={0.36}
            interactive={false}
            parallax={false}
            parallaxStrength={0}
            mixBlendMode="screen"
          />
        ) : null}
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        initial="hide"
        animate={motionPhase}
        variants={noiseVariants}
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <motion.div
          initial="hide"
          animate={motionPhase}
          variants={bandRightVariants}
          className="absolute right-0 top-0 hidden h-full w-[min(22vw,200px)] md:block lg:w-[min(20vw,240px)]"
          style={{
            background: "var(--color-accent-strong)",
            boxShadow:
              "inset 1px 0 0 color-mix(in srgb, var(--color-fg-inverse) 16%, transparent), inset -1px 0 0 color-mix(in srgb, var(--color-fg-strong) 26%, transparent)",
          }}
        />
        <motion.div
          initial="hide"
          animate={motionPhase}
          variants={bandLeftVariants}
          className="absolute left-0 top-0 h-full w-[92vw] md:w-[58vw] lg:w-[52vw] xl:w-[850px] rounded-tr-[100px] lg:rounded-tr-[400px]"
          style={{
            background:
              "color-mix(in srgb, var(--color-surface-deep) 78%, var(--color-fg-strong) 22%)",
            boxShadow:
              "inset -1px 0 0 color-mix(in srgb, var(--color-fg-inverse) 8%, transparent)",
          }}
        />
      </div>

      <motion.div
        className={`pointer-events-none absolute right-0 z-[2] hidden h-[calc(100svh-6rem)] w-[min(22vw,200px)] overflow-hidden md:block lg:w-[min(20vw,240px)] ${HEADER_OFFSET_CLASS} text-[var(--color-fg-inverse)]`}
        initial="hide"
        animate={motionPhase}
        variants={dotsVariants}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <DotBurst className="absolute top-1/2 left-0 h-[min(72dvh,calc(100svh-8rem))] w-[min(72dvh,calc(100svh-8rem))] max-h-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-gradient-to-t from-[color-mix(in_srgb,var(--color-fg-strong)_72%,transparent)] via-[color-mix(in_srgb,var(--color-fg-strong)_22%,transparent)] to-transparent"
        initial="hide"
        animate={motionPhase}
        variants={bottomGradientVariants}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-4 bg-[#eceff1]"
        initial="hide"
        animate={motionPhase}
        variants={bottomGradientVariants}
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-2 w-28 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[var(--color-accent-strong)]" />
      </motion.div>

      <div className="relative z-10 grid min-h-screen w-full grid-cols-12 gap-x-6 px-6 pb-16 pt-28 md:gap-x-8 md:px-10 lg:px-16 lg:pt-32">
        <div
          className="col-span-12 flex max-w-[82vw] flex-col items-center justify-center pt-0 text-center md:col-span-6 md:max-w-[50vw] md:items-start md:justify-center md:pt-0 md:text-left lg:col-span-6 lg:pr-4 xl:max-w-[750px]"
          style={{
            transform: "scale(var(--hero-text-scale, 1)) translateZ(0)",
            transformOrigin: "left center",
            opacity: "var(--hero-text-opacity, 1)",
          }}
        >
          <h1
            className="hero-title text-[var(--color-fg-strong)] max-w-[14ch] leading-[0.9] drop-shadow-[0_4px_48px_color-mix(in_srgb,var(--color-fg-strong)_55%,transparent)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <motion.span
              className="block text-[var(--color-fg-inverse)]"
              initial="hide"
              animate={motionPhase}
              variants={heroCopySlideVariants}
              transition={{
                delay: heroTitleDelay,
                duration: textDuration,
                ease: paragraphEase,
              }}
            >
              Digitalisation
            </motion.span>
          </h1>

          <ParagraphSlideText
            className="hero-body max-w-xl text-[var(--color-fg-inverse)] md:mb-10 lg:mt-10"
            initial="hide"
            animate={motionPhase}
            variants={heroCopySlideVariants}
            transition={{
              delay: heroBodyDelay,
              duration: textDuration,
              ease: paragraphEase,
            }}
          >
            Digitalisation is a social and business phenomenon, powered by the
            technologies ET brings to bear—woven processes, systems, customers,
            partners, and employees as the ultimate connected business.
          </ParagraphSlideText>

          <motion.div
            className="-mt-2 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 max-md:gap-x-4 sm:-mt-4 md:-mt-5 md:flex-nowrap md:items-center md:justify-start md:gap-x-8"
            initial="hide"
            animate={motionPhase}
            variants={heroCopySlideVariants}
            transition={{
              delay: heroCtasDelay,
              duration: textDuration,
              ease: paragraphEase,
            }}
          >
            <a
              href="#solutions"
              className="group type-button inline-flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--color-fg-inverse)_45%,transparent)] pb-1 text-[var(--color-fg-inverse)]"
            >
              <HoverSlideText
                text="Download presentation"
                wrapperClassName="whitespace-nowrap"
              />
              <ArrowRight
                className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
            <button
              type="button"
              className="group type-button inline-flex items-center justify-center rounded-full !bg-transparent px-6 py-2.5 text-[var(--color-fg-inverse)] transition-all duration-300 hover:!bg-[color-mix(in_srgb,var(--color-fg-inverse)_8%,transparent)]"
            >
              <HoverSlideText
                text="Our products"
                wrapperClassName="whitespace-nowrap"
              />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="col-span-12 mt-auto flex justify-center pb-2 md:absolute md:bottom-6 md:left-10 md:col-span-auto md:justify-start lg:bottom-10 lg:left-14"
          initial="hide"
          animate={motionPhase}
          variants={heroScrollRevealVariants}
          transition={{
            delay: heroScrollDelay,
            duration: textDuration,
            ease: paragraphEase,
          }}
        >
          <button
            type="button"
            onClick={scrollToServices}
            className="group flex flex-col items-center gap-2"
            aria-label="Scroll to services"
          >
            <div className="relative h-14 w-[1.5px] overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-fg-inverse)_15%,transparent)]">
              <div className="animate-beat-drop absolute left-0 top-0 h-1/2 w-full bg-[color-mix(in_srgb,var(--color-fg-inverse)_45%,transparent)]" />
            </div>
            <div
              className="animate-heartbeat-circle flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-fg-inverse)_24%,transparent)] text-[color-mix(in_srgb,var(--color-fg-inverse)_58%,transparent)] transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--color-fg-inverse)_55%,transparent)] group-hover:text-[var(--color-fg-inverse)]"
              aria-hidden
            >
              <ChevronDown
                className="animate-heartbeat-chevron size-5"
                strokeWidth={1.5}
              />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
