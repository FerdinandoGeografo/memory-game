import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  labelVariants,
  statHighlightVariants,
  statVariants,
  valueVariants,
} from "@/constants/game-stat";
import { slide } from "@/lib/motion/transitions";

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
