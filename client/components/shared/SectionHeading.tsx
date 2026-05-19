import { ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string | ReactNode;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
      <span className="section-label">{label}</span>
      <h2
        className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-xl text-sm sm:text-base" style={isCenter ? { margin: "0.75rem auto 0" } : undefined}>
          {subtitle}
        </p>
      )}

      {/* Gradient underline */}
      <div
        className="mt-4 h-0.5 w-16 rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))",
          margin: isCenter ? "1rem auto 0" : "1rem 0 0",
        }}
      />
    </div>
  );
}
