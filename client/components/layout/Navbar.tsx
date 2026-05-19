import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_SECTIONS, CV_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const activeId = useScrollSpy(
    NAV_SECTIONS.map((s) => s.id),
    96,
  );

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 96;
      const top = el.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > 300 && y > lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Scroll progress ── */}
      <ScrollProgress />

      {/* ── Navbar ── */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "backdrop-blur-2xl border-b"
            : "bg-transparent",
          hidden && !mobileOpen && "-translate-y-full"
        )}
        style={{
          backgroundColor: scrolled ? "rgba(3,0,20,0.75)" : "transparent",
          borderColor: scrolled ? "var(--glass-border)" : "transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("top")}
            className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
            aria-label="Scroll to top"
          >
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 grid place-items-center font-bold text-white text-sm shadow-md shadow-violet-500/20 transition-shadow group-hover:shadow-violet-500/40">
              NT
            </div>
            <span className="font-semibold tracking-tight text-foreground hidden sm:inline">
              Nithis Arun T
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                aria-current={activeId === s.id ? "true" : undefined}
                className={cn(
                  "relative px-3 py-1.5 text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                  activeId === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {activeId === s.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: "var(--glass-hover)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-animated hidden md:inline-flex h-9 items-center justify-center rounded-lg glass px-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-animated hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-4 text-sm font-medium text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all"
            >
              Get in touch
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg glass text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: "rgba(3,0,20,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_SECTIONS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={cn(
                  "text-2xl font-semibold tracking-tight transition-colors",
                  activeId === s.id
                    ? "text-gradient-static"
                    : "text-white/60 hover:text-white",
                )}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                {s.label}
              </motion.button>
            ))}

            <motion.div
              className="flex gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-lg glass px-5 text-sm text-white/70"
              >
                Resume
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 px-5 text-sm font-medium text-white"
              >
                Contact
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const height = doc.scrollHeight - window.innerHeight;
      const p = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px]">
      <div
        className="h-full origin-left transition-transform"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan), var(--accent-rose))",
        }}
        aria-hidden
      />
    </div>
  );
}
