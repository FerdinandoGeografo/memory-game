import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

// One variant per Figma use case: solo stats, player cards, result rows
const statVariants = cva(
  "relative isolate flex w-full overflow-hidden bg-blue-300",
  {
    variants: {
      variant: {
        // Stacked and centred on mobile, row from tablet
        solo: "flex-col items-center gap-0.5 rounded-sm py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:rounded-lg sm:pt-4.25 sm:pr-6 sm:pb-3.75 sm:pl-5.25",
        // Stacked on mobile (centred) and tablet (left), row from desktop
        player:
          "flex-col items-center gap-0.5 rounded-sm py-2.5 sm:items-start sm:gap-0.75 sm:rounded-lg sm:px-4 sm:py-3.5 lg:flex-row lg:justify-between lg:gap-2 lg:pt-4.25 lg:pr-6 lg:pb-3.75 lg:pl-5.25",
        // Always a row: centred on mobile, top-aligned from tablet
        result:
          "flex-row items-center justify-between gap-2 rounded-sm px-4 py-2.5 sm:items-start sm:rounded-lg sm:px-8 sm:pt-4.25 sm:pb-3.75",
      },
    },
    defaultVariants: { variant: "solo" },
  },
);

const textTransition =
  "transition-colors duration-300 motion-reduce:transition-none";

const labelVariants = cva(
  `text-sm leading-4.75 text-blue-600 capitalize ${textTransition}`,
  {
    variants: {
      variant: {
        solo: "sm:mt-2 sm:text-lg sm:leading-5.5",
        player: "lg:mt-2 lg:text-lg lg:leading-5.5",
        result: "text-xs leading-4 sm:mt-2 sm:text-lg sm:leading-5.5",
      },
    },
    defaultVariants: { variant: "solo" },
  },
);

const valueVariants = cva(
  `text-xl leading-7.5 text-blue-700 ${textTransition}`,
  {
    variants: {
      variant: {
        solo: "sm:text-3xl sm:leading-10",
        player: "lg:text-3xl lg:leading-10",
        result: "text-[20px] leading-7 sm:text-3xl sm:leading-10",
      },
    },
    defaultVariants: { variant: "solo" },
  },
);

interface GameStatProps extends VariantProps<typeof statVariants> {
  name: string;
  // Visible on mobile instead of name; name stays available to screen readers
  shortName?: string;
  value: string;
  highlight?: {
    bg: string;
    text: string;
  };
  className?: string;
}

export function GameStat({
  name,
  shortName,
  value,
  highlight,
  variant,
  className,
}: GameStatProps) {
  return (
    <div className={cn(statVariants({ variant }), className)}>
      {/* The highlight slides in from the left and leaves to the right;
          no animation on first render (first player, winner rows) */}
      <AnimatePresence initial={false}>
        {highlight && (
          <motion.span
            aria-hidden="true"
            className={cn("absolute inset-0 -z-10", highlight.bg)}
            // x (not a transform string) so MotionConfig reduced motion applies
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <span className={cn(labelVariants({ variant }), highlight?.text)}>
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
      <span className={cn(valueVariants({ variant }), highlight?.text)}>
        {value}
      </span>
    </div>
  );
}
