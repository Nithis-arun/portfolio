import { lazy, Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Github } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import Typing from "@/components/shared/Typing";
import MagneticWrapper from "@/components/shared/MagneticWrapper";
import { HERO_PHRASES, CONTACT_INFO, SOCIALS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Parallax fade-out on scroll
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-dvh flex items-center justify-center overflow-hidden" aria-label="Hero introduction">
      {/* Fallback background image (shown if WebGL fails) */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/portfolio/hero-bg.png')" }}
        aria-hidden="true"
      />

      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 -z-[5]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-24 pb-12">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ backgroundColor: "var(--accent-green)", opacity: 0.75 }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent-green)" }} />
            </span>
            Available for freelance projects &amp; full-time roles
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="mt-8 font-bold tracking-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 2rem + 4vw, 5rem)",
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-gradient">Nithis Arun T</span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.6 }}
        >
          <Typing
            phrases={HERO_PHRASES}
            className="mt-4 block text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/80"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="mt-6 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.6 }}
        >
          Passionate about building scalable web applications with modern
          technologies. Expertise in Java Full Stack development with a focus on
          user experience and performance optimization.
        </motion.p>

        {/* CTAs with magnetic effect */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.6 }}
        >
          <MagneticWrapper strength={0.25}>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="btn-animated inline-flex items-center justify-center h-11 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 text-sm font-medium text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all gap-2"
            >
              <Mail className="h-4 w-4" /> Get in Touch
            </a>
          </MagneticWrapper>
          <MagneticWrapper strength={0.25}>
            <a
              href={SOCIALS.find(s => s.icon === "github")?.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center justify-center h-11 rounded-xl glass px-6 text-sm font-medium text-foreground hover:bg-white/5 transition-all gap-2"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </MagneticWrapper>
          <MagneticWrapper strength={0.25}>
            <a
              href={SOCIALS.find(s => s.icon === "linkedin")?.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center justify-center h-11 rounded-xl glass px-6 text-sm font-medium text-foreground hover:bg-white/5 transition-all gap-2"
            >
              <FaLinkedin className="h-4 w-4" /> LinkedIn
            </a>
          </MagneticWrapper>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
      >
        <span className="text-xs text-muted-foreground/50 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
