import type { FC } from "react";
import ContactSection from "../components/sections/ContactSection.tsx";
import FooterSection from "../components/sections/FooterSection.tsx";
import Hero from "../components/sections/HeroSection.tsx";
import NewsSection from "../components/sections/NewsSection.tsx";
import ServicesSection from "../components/sections/ServicesSection.tsx";
import SolutionsSection from "../components/sections/SolutionsSection.tsx";
import HeaderChromePreview from "./HeaderChromePreview.tsx";
import {
  ClientsLayoutsLearnPreview,
  PartnersLayoutsLearnPreview,
} from "./PageTemplateLayoutsPreview.tsx";
import ProductsLearnPreview from "./ProductsLearnPreview.tsx";

export type SitePart = {
  id: string;
  label: string;
  description: string;
  Preview: FC;
};

function HeroPreview() {
  return (
    <div className="relative isolate min-h-[min(100svh,920px)] w-full overflow-hidden bg-[var(--color-fg-strong)]">
      <Hero introDone onRevealReady={() => {}} />
    </div>
  );
}

export const SITE_PARTS: SitePart[] = [
  {
    id: "hero",
    label: "Hero",
    description: "Intro motion, headline, CTAs, and scroll cue.",
    Preview: HeroPreview,
  },
  {
    id: "services",
    label: "Services",
    description: "Services selector, circular stack, scroll-linked copy.",
    Preview: ServicesSection,
  },
  {
    id: "solutions",
    label: "Solutions",
    description: "Sticky story panels and line animation.",
    Preview: SolutionsSection,
  },
  {
    id: "products",
    label: "Products",
    description:
      "Sticky product rails (toggle scroll-through vs live sticky stack).",
    Preview: ProductsLearnPreview,
  },
  {
    id: "news",
    label: "News",
    description: "Sanity-driven cards and editorial block.",
    Preview: NewsSection,
  },
  {
    id: "partners-templates",
    label: "Partners templates",
    description:
      "`PartnerLogoRail` child + four `PartnersBand` layouts (Solutions-style pages).",
    Preview: PartnersLayoutsLearnPreview,
  },
  {
    id: "clients-templates",
    label: "Clients templates",
    description: "Four `ClientsBand` shells (same layouts as partners).",
    Preview: ClientsLayoutsLearnPreview,
  },
  {
    id: "contact",
    label: "Contact",
    description: "Lead form and motion reveals.",
    Preview: ContactSection,
  },
  {
    id: "footer",
    label: "Footer",
    description: "Site chrome, links, legal.",
    Preview: FooterSection,
  },
  {
    id: "header",
    label: "Header",
    description: "Marketing header bar — visual-only; links disabled in Learn.",
    Preview: HeaderChromePreview,
  },
];

export function sitePartById(id: string): SitePart | undefined {
  return SITE_PARTS.find((p) => p.id === id);
}
