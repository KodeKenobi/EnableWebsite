import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import lottie, { type AnimationItem } from "lottie-web";

interface IntroLoaderProps {
  onComplete?: () => void;
}

const LOTTIE_SRC = "/lotties/bot.json";
const LOTTIE_PLAYBACK_SPEED = 1.45;

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lottieWrapRef = useRef<HTMLDivElement>(null);
  const lottieHostRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [lottieReady, setLottieReady] = useState(false);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const host = lottieHostRef.current;
    if (!host) return;

    const anim = lottie.loadAnimation({
      container: host,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: LOTTIE_SRC,
    });
    animRef.current = anim;

    const markReady = () => {
      anim.setSpeed(LOTTIE_PLAYBACK_SPEED);
      setLottieReady(true);
    };

    const exitIntro = () => {
      const el = containerRef.current;
      if (!el) {
        onCompleteRef.current?.();
        return;
      }
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: () => {
          onCompleteRef.current?.();
        },
      });
    };

    const onAnimComplete = () => {
      exitIntro();
    };

    anim.addEventListener("DOMLoaded", markReady);
    anim.addEventListener("data_failed", markReady);
    anim.addEventListener("complete", onAnimComplete);

    return () => {
      anim.removeEventListener("DOMLoaded", markReady);
      anim.removeEventListener("data_failed", markReady);
      anim.removeEventListener("complete", onAnimComplete);
      anim.destroy();
      animRef.current = null;
    };
  }, []);

  /** Do not run the logo scale until the PNG is decoded — otherwise it “pops” mid-tween and feels like a broken load. */
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
    if (!lottieReady || !logoReady) return;

    let gsapCtx: gsap.Context | null = null;
    gsapCtx = gsap.context(() => {
      const logo = logoRef.current;
      const line = lineRef.current;
      const title = titleRef.current;
      const body = bodyRef.current;
      const lottieWrap = lottieWrapRef.current;
      const content = contentRef.current;
      if (!logo || !line || !title || !body || !lottieWrap || !content) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", force3D: true },
      });

      gsap.set([logo, line, title, body, lottieWrap], {
        willChange: "transform, opacity",
      });
      gsap.set(logo, {
        autoAlpha: 0,
        scale: 0.58,
        y: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(line, {
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: "center bottom",
      });
      gsap.set(title, { autoAlpha: 0, x: 22 });
      gsap.set(body, { autoAlpha: 0, y: 18 });
      gsap.set(lottieWrap, {
        autoAlpha: 0,
        scale: 0.98,
        transformOrigin: "50% 50%",
      });

      tl.to(logo, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      })
        .to(
          logo,
          {
            y: -200,
            duration: 0.5,
            ease: "power2.inOut",
          },
          ">-0.04",
        )
        .to(
          line,
          {
            autoAlpha: 1,
            scaleY: 1,
            duration: 0.42,
          },
          "<0.16",
        )
        .to(
          title,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.34,
            ease: "power3.out",
          },
          "<0.06",
        )
        .to(
          body,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power1.out",
          },
          "<0.04",
        )
        .to(
          content,
          {
            autoAlpha: 0,
            duration: 0.28,
            ease: "power2.inOut",
          },
          ">0.12",
        )
        .call(() => {
          const a = animRef.current;
          if (!a?.isLoaded) {
            gsap.delayedCall(0.24, () => {
              const el = containerRef.current;
              if (!el) {
                onCompleteRef.current?.();
                return;
              }
              gsap.to(el, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => onCompleteRef.current?.(),
              });
            });
            return;
          }
          a.setSpeed(LOTTIE_PLAYBACK_SPEED);
          a.goToAndStop(0, true);
          a.play();
        })
        .to(
          lottieWrap,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.34,
            ease: "power2.out",
          },
          "<0.02",
        );
    }, containerRef);

    return () => {
      gsapCtx?.revert();
    };
  }, [lottieReady, logoReady]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
      style={{ background: "var(--color-fg-strong)" }}
    >
      <div
        ref={lottieWrapRef}
        className="absolute inset-0 z-[5] flex items-center justify-center overflow-hidden px-6 invisible opacity-0"
      >
        <div
          ref={lottieHostRef}
          className="w-full max-w-[min(92vw,440px)] [&_svg]:h-auto [&_svg]:w-full"
          aria-hidden
        />
      </div>

      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={logoRef} className="invisible w-32 opacity-0 md:w-44">
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
          className="absolute top-[58%] flex max-w-[calc(100vw-1.5rem)] flex-row items-stretch gap-14 pr-2"
          style={{
            color: "var(--color-fg-inverse)",
            left: "50%",
            transform: "translate(-0.5px, -50%)",
          }}
        >
          <div
            ref={lineRef}
            className="invisible mt-4 w-px shrink-0 origin-bottom scale-y-0 self-stretch opacity-0"
            style={{ background: "var(--color-fg-inverse)" }}
          />
          <div className="relative flex min-w-0 max-w-[min(560px,calc(100vw-3rem))] flex-col items-start text-left">
            <div
              ref={titleRef}
              className="type-intro-title invisible w-full opacity-0"
            >
              <span className="whitespace-nowrap">Meet the future</span>
              <br />
              today
            </div>
            {/* Ref required for GSAP timeline; matches existing body tween (no visible copy). */}
            <div
              ref={bodyRef}
              className="invisible opacity-0"
              aria-hidden
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
