import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "violet" | "cyan" | "rose" | "none";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
}: GlassCardProps) {
  const glowStyles = {
    violet: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    rose: "hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
    none: "",
  };

  return (
    <div
      className={cn(
        "rounded-2xl glass transition-all duration-300",
        hover && "glass-hover",
        glowStyles[glow],
        className,
      )}
    >
      {children}
    </div>
  );
}
