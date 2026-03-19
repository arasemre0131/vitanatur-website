import { Leaf } from "lucide-react";

interface ImagePlaceholderProps {
  className?: string;
}

export function ImagePlaceholder({ className = "" }: ImagePlaceholderProps) {
  return (
    <div
      className={[
        "relative w-full h-full bg-gradient-to-br from-cream-200 via-cream-100 to-sand-100 flex items-center justify-center overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Subtle decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-sand-200/40" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-cream-300/30" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Center icon */}
      <div className="relative flex flex-col items-center gap-2">
        <Leaf className="w-8 h-8 text-sand-300 stroke-[1.25]" />
        <div className="w-8 h-px bg-sand-300/50" />
      </div>
    </div>
  );
}
