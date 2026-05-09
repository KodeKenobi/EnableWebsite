/** Hash targets match element ids on the home page; use `/` prefix so links work from `/news` etc. */
export const navItems = [
  { label: "Our Solutions", href: "/#solutions" },
  { label: "Our Products", href: "/#our-products" },
  { label: "About Us", href: "/#about" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/#contact" },
] as const;
