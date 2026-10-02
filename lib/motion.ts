import type { Transition, Variants } from "framer-motion";

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const spring: Transition = { type: "spring", stiffness: 260, damping: 26 };

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const sheet: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { duration: 0.5, ease } },
  exit: { x: "100%", transition: { duration: 0.35, ease } },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease } },
  exit: { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.2, ease } },
};

export const overlayLinks: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};
