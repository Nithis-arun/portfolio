import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import Lenis from "lenis";
import Chatbot from "@/components/ui/Chatbot";

export default function Layout({ children }: { children: ReactNode }) {
  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* Skip-to-content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:text-white"
        style={{ backgroundColor: "var(--accent-violet)" }}
      >
        Skip to main content
      </a>

      {/* Film grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Preloader />
      <CustomCursor />
      <Navbar />

      <main className="flex-1 relative z-10" id="main-content" role="main">
        <div id="top" />
        {children}
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
}
