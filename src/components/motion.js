"use client";
import { motion } from "motion/react";

export { motion };

export const EASE = [0.44, 0, 0.56, 1];
export const EASE_OUT = [0.22, 1, 0.36, 1];

export const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const revealSm = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

export const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const viewport = { once: true, amount: 0.2 };

// Convenience wrapper: reveals children with stagger when scrolled into view.
export function Reveal({ children, className, variants = reveal, as = "div", ...props }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function Stagger({ children, className, amount = 0.2, as = "div", ...props }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...props}
    >
      {children}
    </Comp>
  );
}
