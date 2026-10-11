import { cva } from "class-variance-authority";

export const statVariants = cva(
  "relative isolate flex w-full overflow-hidden bg-blue-300",
  {
    variants: {
      variant: {
        solo: "flex-col items-center gap-0.5 rounded-sm pt-2.5 pb-2.25 sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:rounded-lg sm:pt-4.25 sm:pr-6 sm:pb-3.75 sm:pl-5.25",
        player:
          "flex-col items-center gap-0.5 rounded-sm pt-2.5 pb-2.25 sm:items-start sm:gap-0.75 sm:rounded-lg sm:px-4 sm:py-3.5 lg:flex-row lg:justify-between lg:gap-2 lg:pt-4.25 lg:pr-6 lg:pb-3.75 lg:pl-5.25",
        result:
          "flex-row items-center justify-between gap-2 rounded-sm px-4 py-2.5 sm:items-start sm:rounded-lg sm:px-8 sm:pt-4.25 sm:pb-3.75",
      },
    },
    defaultVariants: { variant: "solo" },
  },
);

const textTransition = "transition-colors motion-reduce:transition-none";

export const labelVariants = cva(
  `text-sm text-blue-600 capitalize ${textTransition}`,
  {
    variants: {
      variant: {
        solo: "sm:mt-2 sm:text-lg",
        player: "lg:mt-2 lg:text-lg",
        result: "text-xs sm:mt-2 sm:text-lg",
      },
    },
    defaultVariants: { variant: "solo" },
  },
);

export const valueVariants = cva(`text-2xl text-blue-700 ${textTransition}`, {
  variants: {
    variant: {
      solo: "sm:text-4xl",
      player: "lg:text-4xl",
      result: "text-xl/7 sm:text-4xl",
    },
  },
  defaultVariants: { variant: "solo" },
});

export const STAT_HIGHLIGHTS = {
  turn: { bg: "bg-orange-500", text: "text-white" },
  winner: { bg: "bg-blue-800", text: "text-white" },
} as const;
