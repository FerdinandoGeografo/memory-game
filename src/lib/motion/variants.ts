import { stagger, type Transition, type Variants } from "motion/react";
import { leave, quickSpring, spring } from "./transitions";

// Every variant uses the labels "hidden" and "visible", so a parent's
// initial/animate/exit reach its children. With reduced motion they all jump
// to their end state (see reduced-motion.ts).

export interface EnterOptions {
  /** Horizontal offset to start from, in px. */
  x?: number;
  /** Vertical offset to start from, in px. Negative values start above. */
  y?: number;
  /** Scale to start from. */
  scale?: number;
  /** How the element reaches its place. */
  transition?: Transition;
  /** Once visible, its children enter one after another, `step` seconds apart. */
  children?: { step: number; startDelay?: number };
}

/** Fades in from an offset or a scale; leaves the same way, quickly. */
export function enterFrom({
  x = 0,
  y = 0,
  scale = 1,
  transition = spring,
  children,
}: EnterOptions): Variants {
  return {
    hidden: { opacity: 0, x, y, scale, transition: leave },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: children
        ? {
            ...transition,
            delayChildren: stagger(children.step, {
              startDelay: children.startDelay,
            }),
          }
        : transition,
    },
  };
}

/** Rises into place from 24px below. */
export function fadeUp(children?: EnterOptions["children"]) {
  return enterFrom({ y: 24, children });
}

/** Drops into place from 24px above. */
export function fadeDown() {
  return enterFrom({ y: -24 });
}

/** Grows into place from 90%, quickly: small items and popups. */
export function popIn(children?: EnterOptions["children"]) {
  return enterFrom({ scale: 0.9, transition: quickSpring, children });
}

/**
 * For a parent with no animation of its own: its children enter one after
 * another, `step` seconds apart.
 */
export function staggerChildren(step = 0.08, startDelay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren: stagger(step, { startDelay }) } },
  };
}
