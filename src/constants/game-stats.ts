import { cva } from "class-variance-authority";

export const statsVariants = cva("mt-25.5 flex", {
  variants: {
    mode: {
      solo: "gap-6.25 sm:mx-auto sm:w-full sm:max-w-135 sm:gap-7.5",
      multi: "justify-center gap-6 sm:gap-2.75 lg:gap-7.5",
    },
    gridSize: { "4x4": "", "6x6": "" },
  },
  compoundVariants: [
    { mode: "solo", gridSize: "4x4", class: "sm:mt-31.5" },
    { mode: "solo", gridSize: "6x6", class: "sm:mt-30.5 lg:mt-26.5" },
    { mode: "multi", gridSize: "4x4", class: "sm:mt-32 lg:mt-30.5" },
    { mode: "multi", gridSize: "6x6", class: "sm:mt-31 lg:mt-25.5" },
  ],
});
