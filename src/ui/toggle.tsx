import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { motion } from "motion/react";
import { quickSpring } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

function Toggle({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      render={
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={quickSpring}
        />
      }
      className={cn(
        "focus-ring inline-flex h-10 items-center justify-center rounded-full bg-blue-200 text-base whitespace-nowrap text-neutral-100 transition-colors hover:bg-blue-500 focus-visible:bg-blue-500 data-pressed:bg-blue-700 sm:h-13 sm:text-3xl",
        className,
      )}
      {...props}
    />
  );
}

export { Toggle };
