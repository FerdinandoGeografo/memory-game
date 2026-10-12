import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { slide } from "@/lib/motion/transitions";

const stackedLayout = "flex-col items-center gap-0.5 pt-2.5 pb-2.25";
const textTransition = "transition-colors motion-reduce:transition-none";

const statVariants = cva(
  "relative isolate flex w-full overflow-hidden rounded-sm bg-blue-300 sm:rounded-lg",
  {
    variants: {
      layout: {
        solo: `${stackedLayout} sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:pt-4.25 sm:pr-6 sm:pb-3.75 sm:pl-5.25`,
        player: `${stackedLayout} sm:items-start sm:gap-0.75 sm:px-4 sm:py-3.5 lg:flex-row lg:justify-between lg:gap-2 lg:pt-4.25 lg:pr-6 lg:pb-3.75 lg:pl-5.25`,
        result:
          "flex-row items-center justify-between gap-2 px-4 py-2.5 sm:items-start sm:px-8 sm:pt-4.25 sm:pb-3.75",
      },
    },
    defaultVariants: { layout: "solo" },
  },
);

const statHighlightVariants = cva("absolute inset-0 -z-10", {
  variants: {
    highlight: { turn: "bg-orange-500", winner: "bg-blue-800" },
  },
});

const labelVariants = cva(textTransition, {
  variants: {
    layout: {
      solo: "text-sm sm:mt-2 sm:text-lg",
      player: "text-sm lg:mt-2 lg:text-lg",
      result: "text-xs sm:mt-2 sm:text-lg",
    },
    highlighted: { true: "text-white", false: "text-blue-600" },
  },
  defaultVariants: { layout: "solo", highlighted: false },
});

const valueVariants = cva(textTransition, {
  variants: {
    layout: {
      solo: "text-2xl sm:text-4xl",
      player: "text-2xl lg:text-4xl",
      result: "text-xl/7 sm:text-4xl",
    },
    highlighted: { true: "text-white", false: "text-blue-700" },
  },
  defaultVariants: { layout: "solo", highlighted: false },
});

interface GameStatProps extends VariantProps<typeof statVariants> {
  name: string;
  shortName?: string;
  value: string;
  highlight?: VariantProps<typeof statHighlightVariants>["highlight"];
  variants?: Variants;
}

export default function GameStat({
  name,
  shortName,
  value,
  highlight,
  layout,
  variants,
}: GameStatProps) {
  const highlighted = Boolean(highlight);

  return (
    <motion.div variants={variants} className={statVariants({ layout })}>
      <AnimatePresence initial={false}>
        {highlight && (
          <motion.span
            aria-hidden="true"
            className={statHighlightVariants({ highlight })}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={slide}
          />
        )}
      </AnimatePresence>

      <span className={labelVariants({ layout, highlighted })}>
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
      <span className={valueVariants({ layout, highlighted })}>{value}</span>
    </motion.div>
  );
}
