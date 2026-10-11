import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type Variants } from "motion/react";

import { quickSpring } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full whitespace-nowrap transition-colors select-none focus-ring",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-300",
        secondary:
          "bg-blue-300 text-blue-700 hover:bg-blue-500 hover:text-neutral-100",
      },
      size: {
        default: "h-10 px-4.5 text-base sm:h-13 sm:px-6 sm:text-xl",
        md: "h-12 px-4.5 text-lg sm:h-13 sm:px-6 sm:text-xl",
        lg: "h-12 px-6 text-lg sm:h-17.5 sm:px-8 sm:text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  variants,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { variants?: Variants }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={
        <motion.button
          variants={variants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={quickSpring}
        />
      }
      {...props}
    />
  );
}

export { Button };
