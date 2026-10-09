import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type Variants } from "motion/react";

import { quickSpring } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center capitalize justify-center rounded-full text-base whitespace-nowrap sm:text-xl transition-[color,background-color,border-color,box-shadow] duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-orange-500 text-white hover:bg-orange-300 focus-visible:ring-orange-500",
        secondary:
          "bg-blue-300 text-blue-700 hover:bg-blue-500 hover:text-neutral-100 focus-visible:ring-blue-300",
      },
      size: {
        default: "h-10 px-4.5 sm:h-13 sm:px-6",
        lg: "h-12 px-6 text-lg sm:h-17.5 sm:px-8 sm:text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Grows on hover and presses in on tap. `variants` lets a parent stagger its
// entrance (see lib/motion/variants).
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
