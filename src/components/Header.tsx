import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "../constants/headerNav.ts";

const MOBILE_NAV_BG_SRC = "/images/mobile/nav/nav-background.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const preloadId = "mobile-nav-bg-preload";
    if (!document.getElementById(preloadId)) {
      const preloadLink = document.createElement("link");
      preloadLink.id = preloadId;
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = MOBILE_NAV_BG_SRC;
      document.head.appendChild(preloadLink);
    }
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <img
        src={MOBILE_NAV_BG_SRC}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        decoding="async"
        loading="eager"
        fetchPriority="high"
      />
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 left-0 z-50 flex h-20 items-center justify-between border-b border-[var(--color-border)] bg-white px-4 sm:px-6 md:h-24 md:px-10 lg:px-16"
        style={{ color: "var(--color-fg-strong)" }}
      >
        <motion.a
          href="#hero"
          className="block w-20 shrink-0 sm:w-24 md:w-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          onClick={closeMobileMenu}
        >
          <img
            src="/images/logo/et-logo.png"
            alt="ET Logo"
            className="h-auto w-full"
          />
        </motion.a>
        <nav
          className="hidden gap-6 type-nav md:flex lg:gap-10"
          aria-label="Primary"
        >
          {navItems.map(({ label, href }, i) => (
            <motion.a
              key={label}
              href={href}
              className="hover-underline group relative text-[var(--color-fg)] block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.32 + i * 0.04,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="relative block overflow-hidden">
                <span className="text-lg font-semibold inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[100%]">
                  {label}
                </span>
                <span
                  className="text-[var(--color-primary-blue)] text-lg font-semibold absolute left-0 top-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-[100%] group-hover:translate-y-0"
                  aria-hidden="true"
                >
                  {label}
                </span>
              </span>
            </motion.a>
          ))}
        </nav>
        <motion.a
          href="#contact"
          className="group type-button hidden shrink-0 md:inline-flex items-center justify-center rounded-tr-full rounded-br-lg bg-[var(--color-fg-strong)] px-4 py-2 text-[var(--color-fg-inverse)] transition-opacity hover:bg-[var(--color-primary-blue)] hover:opacity-90 sm:px-5 sm:py-2.5 md:px-7 md:py-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative inline-flex overflow-hidden whitespace-nowrap">
            <span className="text-md transform-gpu transition-transform duration-300 ease-out group-hover:translate-y-full">
              Inquiry
            </span>
            <span
              className="text-md absolute inset-0 transform-gpu transition-transform duration-300 ease-out -translate-y-full group-hover:translate-y-0"
              aria-hidden="true"
            >
              Inquiry
            </span>
          </span>
        </motion.a>
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-fg-strong)] md:hidden"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition-transform duration-300 ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-transform duration-300 ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[49] md:hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${MOBILE_NAV_BG_SRC}")`,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(7,25,39,0.82)_0%,rgba(7,25,39,0.9)_38%,rgba(7,25,39,0.94)_100%)]" />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-[1] mt-20 flex h-[calc(100dvh-5rem)] flex-col px-5 pb-8 pt-6 sm:px-7"
            >
              <nav
                className="mt-2 flex flex-1 flex-col items-center justify-center gap-3"
                aria-label="Mobile Primary"
              >
                {navItems.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={closeMobileMenu}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.07,
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center justify-center px-0 py-3 text-white/92 transition-colors hover:text-white"
                  >
                    <span className="text-[1.05rem] font-semibold tracking-[0.08em] uppercase">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <motion.a
                href="#contact"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.16 + navItems.length * 0.07,
                  duration: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-tr-full rounded-br-lg bg-white/14 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0f2430]"
              >
                Inquiry
              </motion.a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
