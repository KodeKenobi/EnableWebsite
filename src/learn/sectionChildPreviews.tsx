import { useState, type CSSProperties, type FC, type ReactNode } from "react";
import FloatingLines from "../components/animations/backgrounds/FloatingLines.tsx";
import HoverSlideText from "../components/animations/textAnimations/HoverSlideText.tsx";
import {
  ParagraphSlideText,
  paragraphSlideVariants,
} from "../components/animations/textAnimations/ParagraphSlideText.tsx";
import ScrollGrowText from "../components/animations/textAnimations/ScrollGrowText.tsx";
import { LinesPullUp } from "../components/animations/textAnimations/LinesPullUp.tsx";
import CircularCardStack from "../components/services/CircularCardStack.tsx";
import ServicesSelector from "../components/services/ServicesSelector.tsx";
import { services } from "@/constants/services";

function LearnChildCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-muted)_52%,white)] px-5 py-4">
      <h4 className="type-kicker text-[var(--color-fg-strong)]">{label}</h4>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const HeroFloatingSnippet: FC = () => (
  <div className="h-[200px] w-full overflow-hidden rounded-lg bg-[#0a1211] md:h-[220px]">
    <FloatingLines
      linesGradient={["#ff9346", "#7cff67", "#ffee51", "#5227FF"]}
      enabledWaves={["middle", "bottom"]}
      interactive={false}
      parallax={false}
      mixBlendMode="screen"
    />
  </div>
);

const HeroHoverSnippet: FC = () => (
  <div className="group flex min-h-[100px] items-center justify-center rounded-lg bg-[var(--color-fg-strong)] px-6 py-8 text-[var(--color-fg-inverse)]">
    <div className="type-button inline-flex cursor-default items-center gap-2 border-b border-[color-mix(in_srgb,var(--color-fg-inverse)_45%,transparent)] pb-1">
      <HoverSlideText text="Sample CTA" wrapperClassName="whitespace-nowrap" />
      <span aria-hidden className="text-xs">
        →
      </span>
    </div>
  </div>
);

const HeroParagraphSnippet: FC = () => (
  <div className="rounded-lg bg-[var(--color-fg-strong)]/5 p-6 text-[var(--color-fg)]">
    <ParagraphSlideText
      className="max-w-md text-base leading-relaxed md:text-lg"
      initial="show"
      animate="show"
      variants={paragraphSlideVariants}
    >
      Short sample of body copy used under the hero headline.
    </ParagraphSlideText>
  </div>
);

const ServicesScrollGrowSnippet: FC = () => (
  <div
    className="rounded-lg bg-[#ebedef] p-6 text-[#0a2f3e]"
    style={
      {
        "--services-copy-progress": "0.72",
      } as CSSProperties
    }
  >
    <ScrollGrowText
      from="right"
      yStartRem={0.5}
      motionAxis="y"
      opacityFloor={0.35}
      endScale={1.05}
      className="font-serif text-[clamp(1.5rem,4vw,2.5rem)]"
    >
      Services
    </ScrollGrowText>
  </div>
);

const ServicesStackSnippet: FC = () => (
  <div className="flex min-h-[320px] justify-center rounded-lg bg-[#ebedef] px-2 py-6">
    <div className="w-full max-w-[480px]">
      <CircularCardStack
        items={services.map((service) => ({
          id: service.title,
          gradient: service.gradient,
          lottieSrc: service.lottieSrc,
        }))}
        activeIndex={2}
      />
    </div>
  </div>
);

const ServicesSelectorSnippet: FC = () => {
  const [idx, setIdx] = useState(2);
  return (
    <div className="rounded-lg bg-[#ebedef] px-4 py-8">
      <ServicesSelector
        items={services}
        activeIndex={idx}
        onSelect={setIdx}
      />
    </div>
  );
};

const SolutionsLinesPullSnippet: FC = () => (
  <div className="rounded-lg bg-[var(--color-fg-strong)] p-6 text-[var(--color-fg-inverse)]">
    <LinesPullUp
      text="One platform. Endless possibility."
      className="font-serif text-2xl leading-tight md:text-3xl"
    />
  </div>
);

export type SectionChild = {
  id: string;
  label: string;
  Preview: FC;
};

export const SECTION_CHILDREN: Record<string, SectionChild[]> = {
  hero: [
    { id: "floating-lines", label: "FloatingLines (background)", Preview: HeroFloatingSnippet },
    { id: "hover-slide", label: "HoverSlideText (CTAs)", Preview: HeroHoverSnippet },
    { id: "paragraph-slide", label: "ParagraphSlideText (body)", Preview: HeroParagraphSnippet },
  ],
  services: [
    { id: "scroll-grow", label: "ScrollGrowText (headlines)", Preview: ServicesScrollGrowSnippet },
    { id: "card-stack", label: "CircularCardStack", Preview: ServicesStackSnippet },
    { id: "selector", label: "ServicesSelector", Preview: ServicesSelectorSnippet },
  ],
  solutions: [
    { id: "lines-pull", label: "LinesPullUp (story lines)", Preview: SolutionsLinesPullSnippet },
  ],
};

export function SectionChildPreviews({ sectionId }: { sectionId: string }) {
  const list = SECTION_CHILDREN[sectionId];
  if (!list?.length) return null;

  return (
    <div className="mt-12 space-y-8 border-t border-[var(--color-border)] pt-10">
      <div>
        <p className="type-kicker text-[var(--color-primary-blue)]">Composition</p>
        <h3 className="mt-2 font-display text-xl font-normal text-[var(--color-fg-strong)]">
          Pieces inside this section
        </h3>
        <p className="section-body-type mt-2 max-w-2xl text-[var(--color-fg)]/78">
          Isolated previews of the main building blocks that make up the full
          section above.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {list.map(({ id, label, Preview }) => (
          <LearnChildCard key={id} label={label}>
            <Preview />
          </LearnChildCard>
        ))}
      </div>
    </div>
  );
}
