import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { slide } from "@/lib/motion/transitions";
import {
  labelVariants,
  STAT_HIGHLIGHTS,
  statVariants,
  valueVariants,
} from "@/constants/styles/game-stat";
import { cn } from "@/lib/utils";

interface GameStatProps extends VariantProps<typeof statVariants> {
  name: string;
  shortName?: string;
  value: string;
  highlight?: keyof typeof STAT_HIGHLIGHTS;
  variants?: Variants;
}

export default function GameStat({
  name,
  shortName,
  value,
  highlight,
  variant,
  variants,
}: GameStatProps) {
  const tone = highlight ? STAT_HIGHLIGHTS[highlight] : undefined;

  return (
    <motion.div variants={variants} className={statVariants({ variant })}>
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
