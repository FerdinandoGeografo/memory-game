import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { motion, type Variants } from "motion/react";
import { quickSpring } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

// Same press feedback as Button; `variants` for a staggered entrance
function Toggle({
  className,
  variants,
  ...props
}: TogglePrimitive.Props & { variants?: Variants }) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      render={
        <motion.button
          variants={variants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={quickSpring}
        />
      }
      className={cn(
        "focus-ring inline-flex h-10 items-center justify-center rounded-full bg-blue-200 text-base whitespace-nowrap text-neutral-100 transition-colors hover:bg-blue-500 focus:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 data-pressed:bg-blue-700 sm:h-13 sm:text-3xl",
        className,
      )}
      {...props}
    />
  );
}

export { Toggle };
