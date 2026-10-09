import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils";

function Toggle({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full bg-blue-200 leading-5 whitespace-nowrap text-neutral-100 transition-all duration-300 outline-none hover:bg-blue-500 focus:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-pressed:bg-blue-700 sm:h-13 sm:text-2xl sm:leading-8",
        className,
      )}
      {...props}
    />
  );
}

export { Toggle };
