import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// One variant per Figma use case: solo stats, player cards, result rows
const statVariants = cva("flex w-full bg-blue-300", {
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
});

const labelVariants = cva("text-sm leading-4.75 text-blue-600 capitalize", {
  variants: {
    variant: {
      solo: "sm:mt-2 sm:text-lg sm:leading-5.5",
      player: "lg:mt-2 lg:text-lg lg:leading-5.5",
      result: "text-xs leading-4 sm:mt-2 sm:text-lg sm:leading-5.5",
    },
  },
  defaultVariants: { variant: "solo" },
});

const valueVariants = cva("text-xl leading-7.5 text-blue-700", {
  variants: {
    variant: {
      solo: "sm:text-3xl sm:leading-10",
      player: "lg:text-3xl lg:leading-10",
      result: "text-[20px] leading-7 sm:text-3xl sm:leading-10",
    },
  },
  defaultVariants: { variant: "solo" },
});

interface GameStatProps extends VariantProps<typeof statVariants> {
  name: string;
  value: string;
  highlight?: {
    bg: string;
    text: string;
  };
  className?: string;
}

export function GameStat({
  name,
  value,
  highlight,
  variant,
  className,
}: GameStatProps) {
  return (
    <div className={cn(statVariants({ variant }), highlight?.bg, className)}>
      <span className={cn(labelVariants({ variant }), highlight?.text)}>
        {name}
      </span>
      <span className={cn(valueVariants({ variant }), highlight?.text)}>
        {value}
      </span>
    </div>
  );
}
