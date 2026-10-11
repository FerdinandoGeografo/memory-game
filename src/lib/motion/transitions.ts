import type { Transition } from "motion/react";

export const spring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.5,
} satisfies Transition;

export const quickSpring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.3,
} satisfies Transition;

export const fade = { duration: 0.2, ease: "easeOut" } satisfies Transition;

export const leave = { duration: 0.2, ease: "easeIn" } satisfies Transition;

export const flip = { duration: 0.3, ease: "easeInOut" } satisfies Transition;

export const slide = { duration: 0.35, ease: "easeInOut" } satisfies Transition;
