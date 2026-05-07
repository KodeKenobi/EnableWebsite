const footerLinks = {
  solutions: [
    "Enterprise",
    "Applications",
    "Infrastructure",
    "Connectivity",
    "Managed",
  ],
  company: ["About", "Industries", "Careers", "Contact"],
};

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="pointer-events-auto relative z-20 overflow-hidden bg-[#031f2c] text-[var(--color-fg-inverse)]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -20%, rgba(80,178,198,0.28), rgba(3,31,44,0.88) 58%, rgba(3,31,44,1) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-8 pt-14 md:px-10 md:pb-10 lg:px-16 lg:pt-16">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="type-kicker text-white/75">Enable Technologies</p>
            <h3 className="mt-4 font-[var(--font-display)] text-4xl leading-[0.95] text-white md:text-5xl">
              Build What
              <br />
              Comes Next.
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
              End-to-end technology solutions crafted to keep your business
              resilient, connected, and moving forward.
            </p>
            <a
              href="#solutions"
              className="mt-7 inline-flex items-center gap-2 border-b border-white/35 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              Start a Project
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.solutions.map((item) => (
                <li key={item}>
                  <a
                    href="#solutions"
                    className="text-sm text-white/82 transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-white/82 transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.16em] text-white/75 transition-colors duration-300 hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {year} Enable Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/80">
              Privacy
            </a>
            <a href="#" className="hover:text-white/80">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

