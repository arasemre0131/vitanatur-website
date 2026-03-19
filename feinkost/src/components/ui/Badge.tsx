import type { ReactNode } from "react";

type BadgeVariant = "default" | "olive" | "brick" | "espresso";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-sand-200 text-espresso-500",
  olive: "bg-olive-500 text-white",
  brick: "bg-brick-500 text-white",
  espresso: "bg-espresso-500 text-cream-100",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full leading-none",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
