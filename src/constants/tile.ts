import { cva } from "class-variance-authority";

export const tileFaceVariants = cva(
  "absolute inset-0 flex rotate-y-180 items-center justify-center rounded-full text-neutral-100 transition-colors backface-hidden",
  {
    variants: {
      state: {
        covered: "bg-blue-200",
        flipped: "bg-orange-500",
        matched: "bg-blue-200",
      },
      gridSize: {
        "4x4": "text-5xl leading-15 sm:text-8xl",
        "6x6": "text-2xl sm:text-6xl sm:leading-15",
      },
    },
  },
);
