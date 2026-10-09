interface LogoProps {
  variant?: "light" | "dark";
}

export default function Logo({ variant = "light" }: LogoProps) {
  return (
    <h1
      className={`text-4xl leading-12.5 ${variant === "light" ? "text-white" : "text-blue-800"}`}
    >
      memory
    </h1>
  );
}
