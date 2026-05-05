import { motion } from "framer-motion";
import { navItems } from "../constants/headerNav.ts";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 right-0 left-0 z-50 flex h-24 items-center justify-between border-b border-[var(--color-border)] bg-white px-6 md:px-10 lg:px-16"
      style={{ color: "var(--color-fg-strong)" }}
    >
      <motion.a
        href="#hero"
        className="block w-24 shrink-0 md:w-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28, duration: 0.4 }}
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
        className="group type-button shrink-0 inline-flex items-center justify-center hover:bg-[var(--color-primary-blue)] bg-[var(--color-fg-strong)] px-5 py-2.5 text-[var(--color-fg-inverse)] transition-opacity hover:opacity-90 md:px-7 md:py-4 rounded-tr-full rounded-br-lg"
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
    </motion.header>
  );
};

export default Header;
