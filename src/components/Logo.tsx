import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "light", className }: LogoProps) {
  return (
    <h1
      className={cn(
        "text-5xl",
        variant === "light" ? "text-white" : "text-blue-800",
        className,
      )}
    >
      memory
    </h1>
  );
}
