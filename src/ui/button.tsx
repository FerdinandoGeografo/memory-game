import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center capitalize justify-center rounded-full border border-transparent bg-clip-padding leading-5 sm:text-xl sm:leading-6.25 whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50",
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
        lg: "h-12 text-lg leading-5.5 px-6 sm:px-8 sm:h-17.5 sm:text-3xl sm:leading-10",
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
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
