import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { getStoredTheme, setTheme } from "@/lib/theme";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState<'light'|'dark'>(getStoredTheme() ?? (typeof document!== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'));
  const activeId = useScrollSpy(sections.map(s => s.id), 96);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors",
        scrolled ? "backdrop-blur-xl bg-background/75 border-b" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="group inline-flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary/15 text-primary grid place-items-center font-bold">
            <span>NT</span>
          </div>
          <span className="font-semibold tracking-tight">Nithis Arun T</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "relative text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:bg-gradient-to-r after:from-fuchsia-500 after:via-cyan-400 after:to-violet-500",
                activeId === s.id && "text-foreground after:scale-x-100"
              )}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://drive.google.com/file/d/1_ZA28wkkPNY32cpPnXQTz0YC7xn8gyBE/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn-animated hidden md:inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
          </button>
          <a
            href="#contact"
            className="btn-animated hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
