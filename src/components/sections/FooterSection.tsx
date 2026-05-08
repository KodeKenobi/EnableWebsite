import { motion } from "framer-motion";

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

      <div className="relative mx-auto w-full max-w-[1400px] px-4 pb-8 pt-12 sm:px-6 md:px-10 md:pb-10 lg:px-16 lg:pt-16">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="type-kicker text-base text-white/75 md:text-sm">
              Enable Technologies
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-3xl leading-[0.95] text-white sm:text-4xl md:text-5xl">
              Build What
              <br />
              Comes Next.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              End-to-end technology solutions crafted to keep your business
              resilient, connected, and moving forward.
            </p>
            <a
              href="#solutions"
              className="mt-7 inline-flex items-center gap-2 border-b border-white/35 pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[var(--color-accent)] md:justify-start"
            >
              Start a Project
            </a>
          </motion.div>

          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.12, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.solutions.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: 0.2 + footerLinks.solutions.indexOf(item) * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href="#solutions"
                    className="text-base text-white/86 transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.2, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: 0.26 + footerLinks.company.indexOf(item) * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href="#"
                    className="text-base text-white/86 transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-3 pt-5 text-center text-sm text-white/65 md:flex-row md:items-center md:justify-between md:text-left"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.48, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>© {year} Enable Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/80">
              Privacy
            </a>
            <a href="#" className="hover:text-white/80">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

