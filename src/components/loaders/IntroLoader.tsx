import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "framer-motion/dom";
import { motion } from "framer-motion";
import {
  introProfileLog,
  isIntroProfiling,
} from "../../lib/introProfile.ts";

interface IntroLoaderProps {
  onComplete?: () => void;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [hideOverlay, setHideOverlay] = useState(false);
  const exitNotifiedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [logoReady, setLogoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isIntroProfiling()) {
      introProfileLog("intro:loaderMounted");
    }
  }, []);

  useLayoutEffect(() => {
    const img = logoImgRef.current;
    if (!img) return;

    let cancelled = false;
    const mark = () => {
      if (cancelled) return;
      const p =
        typeof img.decode === "function" ? img.decode() : Promise.resolve();
      p.then(() => {
        if (!cancelled) setLogoReady(true);
      }).catch(() => {
        if (!cancelled) setLogoReady(true);
      });
    };

    if (img.complete) mark();
    else img.addEventListener("load", mark, { once: true });

    const failSafe = window.setTimeout(() => {
      if (!cancelled) setLogoReady(true);
    }, 2800);

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
      img.removeEventListener("load", mark);
    };
  }, []);

  useEffect(() => {
    if (logoReady && isIntroProfiling()) {
      introProfileLog("intro:logoDecodedOrReady");
    }
  }, [logoReady]);

  useEffect(() => {
    if (!logoReady) return;

    let alive = true;

    const run = async () => {
      const logo = logoRef.current;
      const line = lineRef.current;
      const title = titleRef.current;
      const body = bodyRef.current;
      const content = contentRef.current;
      if (!logo || !line || !title || !body || !content) {
        if (isIntroProfiling()) {
          introProfileLog("intro:sequenceSkippedMissingRefs");
        }
        return;
      }

      if (isIntroProfiling()) {
        introProfileLog("intro:motionSequenceStart");
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const logoLiftY = mobile ? -184 : -200;

      await animate(
        logo,
        { opacity: 1, scale: 1 },
        { duration: 0.68, ease: EASE_OUT },
      );
      if (!alive) return;

      await Promise.all([
        animate(logo, { y: logoLiftY }, { duration: mobile ? 0.44 : 0.4, ease: EASE_OUT }),
        animate(
          line,
          { opacity: 1, scaleY: 1 },
          { duration: 0.32, ease: EASE_OUT },
        ),
        animate(
          title,
          mobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 },
          { duration: 0.28, ease: EASE_OUT },
        ),
        animate(body, { opacity: 1, y: 0 }, { duration: 0.32, ease: EASE_OUT }),
      ]);
      if (!alive) return;

      await animate(content, { opacity: 0 }, { duration: 0.22, ease: EASE_OUT });
      if (!alive) return;

      if (isIntroProfiling()) {
        introProfileLog("intro:motionSequenceComplete");
      }

      if (isIntroProfiling()) {
        introProfileLog("intro:overlayExitStart");
      }
      exitNotifiedRef.current = false;
      setHideOverlay(true);
    };

    run().catch(() => {
      if (isIntroProfiling()) {
        introProfileLog("intro:motionSequenceError");
      }
    });

    return () => {
      alive = false;
    };
  }, [logoReady]);

  const handleOverlayAnimationComplete = () => {
    if (!hideOverlay || exitNotifiedRef.current) return;
    exitNotifiedRef.current = true;
    if (isIntroProfiling()) {
      introProfileLog("intro:overlayExitEnd");
    }
    onCompleteRef.current?.();
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
      style={{ background: "var(--color-fg-strong)" }}
      initial={false}
      animate={{ opacity: hideOverlay ? 0 : 1 }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
      onAnimationComplete={handleOverlayAnimationComplete}
    >
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ opacity: 1 }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            ref={logoRef}
            className="w-32 md:w-44"
            style={{
              opacity: 0,
              transform: "scale(0.58)",
              transformOrigin: "50% 50%",
            }}
          >
            <img
              ref={logoImgRef}
              src="/images/logo/et-logo-white.png"
              alt="ET Logo"
              className="h-auto w-full"
              decoding="async"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 top-1/2 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center md:top-[58%] md:translate-none md:flex-row md:items-stretch md:gap-14 md:pr-2 md:[transform:translate(calc(-50%-0.5px),-50%)]"
          style={{ color: "var(--color-fg-inverse)" }}
        >
          <div
            ref={lineRef}
            className="mt-5 h-20 w-px shrink-0 md:mt-4 md:h-auto md:min-h-0 md:w-px md:flex-none md:self-stretch"
            style={{
              opacity: 0,
              transform: "scaleY(0)",
              transformOrigin: isMobile ? "center top" : "center bottom",
              background: "var(--color-fg-inverse)",
            }}
          />
          <div className="relative mt-6 flex min-w-0 max-w-[min(560px,calc(100vw-3rem))] flex-col items-center text-center md:mt-0 md:items-start md:text-left">
            <div
              ref={titleRef}
              className="type-intro-title w-full"
              style={
                isMobile
                  ? { opacity: 0, transform: "translateY(20px)" }
                  : { opacity: 0, transform: "translateX(22px)" }
              }
            >
              <span className="whitespace-nowrap">Meet the future</span>
              <br />
              today
            </div>
            <div
              ref={bodyRef}
              aria-hidden
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                overflow: "hidden",
                pointerEvents: "none",
                opacity: 0,
                transform: "translateY(18px)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroLoader;
