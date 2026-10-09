import type { Transition } from "motion/react";

// The few transitions the app uses, by role

/** Entrances of cards and groups: a spring with a light bounce. */
export const spring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.5,
} satisfies Transition;

/** Small elements and press feedback. */
export const quickSpring = {
  type: "spring",
  bounce: 0.15,
  visualDuration: 0.3,
} satisfies Transition;

/** Overlays fading in. */
export const fade = { duration: 0.2, ease: "easeOut" } satisfies Transition;

/** Anything leaving. */
export const leave = { duration: 0.2, ease: "easeIn" } satisfies Transition;

/** Tile flip. The match check delays (GameProvider) assume it lasts 0.3s. */
export const flip = { duration: 0.3, ease: "easeInOut" } satisfies Transition;

/** Turn change: the highlight and the "Current turn" label travel together. */
export const slide = { duration: 0.35, ease: "easeInOut" } satisfies Transition;
