import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { slide } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const statVariants = cva(
  "relative isolate flex w-full overflow-hidden bg-blue-300",
  {
    variants: {
      variant: {
        // Stacked and centred on mobile, row from tablet
        solo: "flex-col items-center gap-0.5 rounded-sm pt-2.5 pb-2.25 sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:rounded-lg sm:pt-4.25 sm:pr-6 sm:pb-3.75 sm:pl-5.25",
        // Stacked on mobile (centred) and tablet (left), row from desktop
        player:
          "flex-col items-center gap-0.5 rounded-sm pt-2.5 pb-2.25 sm:items-start sm:gap-0.75 sm:rounded-lg sm:px-4 sm:py-3.5 lg:flex-row lg:justify-between lg:gap-2 lg:pt-4.25 lg:pr-6 lg:pb-3.75 lg:pl-5.25",
        // Always a row: centred on mobile, top-aligned from tablet
        result:
          "flex-row items-center justify-between gap-2 rounded-sm px-4 py-2.5 sm:items-start sm:rounded-lg sm:px-8 sm:pt-4.25 sm:pb-3.75",
      },
    },
    defaultVariants: { variant: "solo" },
  },
);

const textTransition = "transition-colors motion-reduce:transition-none";

const labelVariants = cva(
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

const valueVariants = cva(`text-2xl text-blue-700 ${textTransition}`, {
  variants: {
    variant: {
      solo: "sm:text-4xl",
      player: "lg:text-4xl",
      result: "text-xl/7 sm:text-4xl",
    },
  },
  defaultVariants: { variant: "solo" },
});

const HIGHLIGHTS = {
  turn: { bg: "bg-orange-500", text: "text-white" },
  winner: { bg: "bg-blue-800", text: "text-white" },
} as const;

interface GameStatProps extends VariantProps<typeof statVariants> {
  name: string;
  // Visible on mobile instead of name; name stays available to screen readers
  shortName?: string;
  value: string;
  highlight?: keyof typeof HIGHLIGHTS;
  // Entrance driven by a staggering parent
  variants?: Variants;
}

export function GameStat({
  name,
  shortName,
  value,
  highlight,
  variant,
  variants,
}: GameStatProps) {
  const tone = highlight ? HIGHLIGHTS[highlight] : undefined;

  return (
    <motion.div variants={variants} className={statVariants({ variant })}>
      {/* The highlight slides in from the left and leaves to the right;
          no animation on first render (first player, winner rows) */}
      <AnimatePresence initial={false}>
        {tone && (
          <motion.span
            aria-hidden="true"
            className={cn("absolute inset-0 -z-10", tone.bg)}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={slide}
          />
        )}
      </AnimatePresence>

      <span className={cn(labelVariants({ variant }), tone?.text)}>
        {shortName ? (
          <>
            <span aria-hidden="true" className="sm:hidden">
              {shortName}
            </span>
            <span className="max-sm:sr-only">{name}</span>
          </>
        ) : (
          name
        )}
      </span>
      <span className={cn(valueVariants({ variant }), tone?.text)}>
        {value}
      </span>
    </motion.div>
  );
}
