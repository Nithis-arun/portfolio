import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { SOCIALS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t" style={{ borderColor: "var(--glass-border)" }}>
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-violet), var(--accent-cyan), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 md:justify-between">
          {/* Left — branding */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">Nithis Arun T</span>
              . All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> and lots of
              caffeine
            </p>
          </div>

          {/* Right — socials + scroll-to-top */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ href, label, icon }) => {
              const Icon = iconMap[icon];
              if (!Icon) return null;
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass glass-hover transition-all hover:shadow-md hover:shadow-violet-500/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}

            <button
              onClick={scrollToTop}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg glass glass-hover transition-all hover:shadow-md hover:shadow-violet-500/10 ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
