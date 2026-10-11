import { stagger, type Variants } from "motion/react";
import type { EnterOptions } from "@/types/motion";
import { leave, quickSpring, spring } from "./transitions";

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

export function fadeUp(children?: EnterOptions["children"]) {
  return enterFrom({ y: 24, children });
}

export function fadeDown() {
  return enterFrom({ y: -24 });
}

export function popIn(children?: EnterOptions["children"]) {
  return enterFrom({ scale: 0.9, transition: quickSpring, children });
}

export function staggerChildren(step = 0.08, startDelay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren: stagger(step, { startDelay }) } },
  };
}
