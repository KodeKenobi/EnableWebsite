import { motion } from "framer-motion";

const navItems = [
  { label: "Our Solutions", href: "#solutions" },
  { label: "Our Products", href: "#products" },
  { label: "About Us", href: "#about" },
  { label: "News", href: "#news" },
  { label: "Contact Us", href: "#contact" },
] as const;

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
              <span className="font-bold text-xl inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[100%]">
                {label}
              </span>
              <span className="font-bold text-xl absolute left-0 top-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-[100%] group-hover:translate-y-0" aria-hidden="true">
                {label}
              </span>
            </span>
          </motion.a>
        ))}
      </nav>
      <motion.a
        href="#contact"
        className="group relative overflow-hidden type-button shrink-0 bg-[var(--color-fg-strong)] px-5 py-2.5 text-[var(--color-fg-inverse)] transition-opacity hover:opacity-90 md:px-7 md:py-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[150%]">
          Inquiry
        </span>
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-[150%] group-hover:translate-y-0" aria-hidden="true">
          Inquiry
        </span>
      </motion.a>
    </motion.header>
  );
};

export default Header;
