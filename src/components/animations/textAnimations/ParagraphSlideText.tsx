import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

/** Variants for use inside a parent with `animate` + stagger (e.g. Hero copy column). */
export const paragraphSlideVariants = {
  hide: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
} as const;

type ParagraphSlideTextProps = Omit<HTMLMotionProps<"p">, "variants"> & {
  variants?: typeof paragraphSlideVariants | Variants;
};

export function ParagraphSlideText({
  className,
  children,
  variants = paragraphSlideVariants,
  ...rest
}: ParagraphSlideTextProps) {
  return (
    <motion.p variants={variants} className={className} {...rest}>
      {children}
    </motion.p>
  );
}
