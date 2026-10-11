import type { Transition } from "motion/react";

export interface EnterOptions {
  x?: number;
  y?: number;
  scale?: number;
  transition?: Transition;
  children?: { step: number; startDelay?: number };
}
