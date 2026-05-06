import { useEffect, useRef } from "react";

interface AIGlobeProps {
  /**
   * Pass a full raw SVG string (like your provided globe markup) to render your unique globe.
   * Keep `style="--delay: ..."` on dot paths to use pulse timing.
   */
  svgMarkup?: string;
  size?: string;
  rotationSpeed?: number;
  tiltAmplitude?: number;
  glowColor?: string;
}

const fallbackSvg = `
<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="250" cy="250" r="185" stroke="#2C8286" stroke-width="1.5" fill="none" opacity="0.5" />
  <circle cx="250" cy="250" r="165" stroke="#2C8286" stroke-width="1" fill="none" opacity="0.45" />
  <circle cx="250" cy="250" r="145" stroke="#2C8286" stroke-width="1" fill="none" opacity="0.35" />
  <ellipse cx="250" cy="250" rx="190" ry="72" stroke="#2C8286" stroke-width="1" fill="none" opacity="0.55" />
  <ellipse cx="250" cy="250" rx="190" ry="72" transform="rotate(35 250 250)" stroke="#2C8286" stroke-width="1" fill="none" opacity="0.4" />
  <ellipse cx="250" cy="250" rx="190" ry="72" transform="rotate(70 250 250)" stroke="#2C8286" stroke-width="1" fill="none" opacity="0.35" />
  <circle cx="305" cy="184" r="3.5" fill="#2C8286" style="--delay:0.1s" />
  <circle cx="176" cy="212" r="3.5" fill="#2C8286" style="--delay:0.45s" />
  <circle cx="334" cy="265" r="3.5" fill="#2C8286" style="--delay:0.85s" />
  <circle cx="205" cy="302" r="3.5" fill="#2C8286" style="--delay:1.15s" />
</svg>
`;

export default function AIGlobe({
  svgMarkup,
  size = "min(56vw, 420px)",
  rotationSpeed = 0.2,
  tiltAmplitude = 18,
  glowColor = "#2C8286",
}: AIGlobeProps) {
  const globeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    let frame = 0;
    let rafId = 0;

    const animate = () => {
      frame += rotationSpeed;
      globe.style.transform = `rotateY(${frame}deg) rotateX(${Math.sin(frame * 0.01) * tiltAmplitude}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [rotationSpeed, tiltAmplitude]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        ref={globeRef}
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          animation: "globePulseGlow 4s infinite ease-in-out",
          filter: `drop-shadow(0 0 12px ${glowColor})`,
        }}
      >
        <div
          className="absolute inset-0 [&_svg]:h-full [&_svg]:w-full [&_path[style*='--delay']]:animate-[globeDotPulse_2.8s_ease-in-out_infinite] [&_path[style*='--delay']]:[animation-delay:var(--delay)] [&_circle[style*='--delay']]:animate-[globeDotPulse_2.8s_ease-in-out_infinite] [&_circle[style*='--delay']]:[animation-delay:var(--delay)]"
          dangerouslySetInnerHTML={{ __html: svgMarkup ?? fallbackSvg }}
        />
      </div>

      <style>{`
        @keyframes globePulseGlow {
          0%, 100% { filter: drop-shadow(0 0 10px ${glowColor}); }
          50% { filter: drop-shadow(0 0 28px ${glowColor}); }
        }
        @keyframes globeDotPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
