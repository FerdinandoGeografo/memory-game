import type { Variants } from "motion/react";
import { flip, leave, quickSpring } from "@/lib/motion/transitions";

const ENTRANCE_START = 0.15;
const ENTRANCE_SPREAD = 0.6;

export function tileEntranceDelay(
  row: number,
  column: number,
  columns: number,
) {
  return (
    ENTRANCE_START + ((row + column) / (2 * (columns - 1))) * ENTRANCE_SPREAD
  );
}

export const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, transition: leave },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { ...quickSpring, delay },
  }),
};

export const faceVariants: Variants = {
  covered: { rotateY: 0, scale: 1 },
  flipped: { rotateY: 180, scale: 1 },
  matched: {
    rotateY: 180,
    scale: [1, 1.08, 1],
    transition: { ...flip, scale: { duration: 0.4, ease: "easeInOut" } },
  },
};
