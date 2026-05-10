/** Warm below-the-fold route chunks during the intro overlay — no await, safe to fire multiple times. */
export function prefetchHomeBelowFold(): void {
  void import("../components/sections/ServicesSection.tsx");
  void import("../components/sections/SolutionsSection.tsx");
  void import("../components/sections/ProductsSection.tsx");
  void import("../components/sections/NewsSection.tsx");
  void import("../components/sections/ContactSection.tsx");
  void import("../components/sections/FooterSection.tsx");
}
