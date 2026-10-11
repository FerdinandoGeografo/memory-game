import { motion } from "motion/react";
import { fadeDown } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface FooterProps {
  variant?: "light" | "dark";
}

export default function Footer({ variant = "light" }: FooterProps) {
  const isLight = variant === "light";

  return (
    <motion.footer
      variants={fadeDown()}
      initial="hidden"
      animate="visible"
      className={cn(
        "mt-auto flex h-12 items-center justify-center text-sm",
        isLight ? "text-blue-500" : "text-blue-600",
      )}
    >
      <p>
        Coded by{" "}
        <a
          href="https://github.com/FerdinandoGeografo"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative rounded-xs outline-offset-2 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-current focus-visible:after:scale-x-100 motion-reduce:after:transition-none",
            isLight ? "text-white" : "text-blue-800",
          )}
        >
          Ferdinando Geografo
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </motion.footer>
  );
}
