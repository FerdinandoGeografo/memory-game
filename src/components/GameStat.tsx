import { cn } from "@/lib/utils";

interface GameStatProps {
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
  className = "",
}: GameStatProps) {
  return (
    <div
      className={cn(
        `flex w-full flex-col items-center gap-0.5 rounded-sm bg-blue-300 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:rounded-lg sm:pt-4.25 sm:pr-6 sm:pb-3.75 sm:pl-5.25`,
        highlight ? highlight.bg : "",
        className,
      )}
    >
      <span
        className={cn(
          `text-sm leading-4.75 text-blue-600 capitalize sm:mt-2 sm:text-lg sm:leading-5.5`,
          highlight ? highlight.text : "",
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          `text-xl leading-7.5 text-blue-700 sm:text-3xl sm:leading-10`,
          highlight ? highlight.text : "",
        )}
      >
        {value}
      </span>
    </div>
  );
}
