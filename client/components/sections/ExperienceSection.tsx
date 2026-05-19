import { useEffect, useRef } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import { EXPERIENCES } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Progressive line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Pulse the timeline nodes when they come into view
      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="scroll-mt-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal>
          <SectionHeading label="Experience" title="Professional Journey" subtitle="Building real-world products with amazing teams" />
        </Reveal>

        <div className="mt-12 relative">
          {/* Timeline line — GSAP animated */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -z-[1]"
            style={{
              background: "linear-gradient(180deg, var(--accent-violet), var(--accent-cyan), var(--accent-violet))",
            }}
          />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={exp.company} delay={0.1 * i}>
                <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Timeline node — GSAP animated */}
                  <div className="timeline-node absolute left-4 md:left-1/2 -translate-x-1/2 mt-6 z-10">
                    <div className="h-3.5 w-3.5 rounded-full border-2" style={{
                      borderColor: i === 0 ? "var(--accent-violet)" : "var(--accent-cyan)",
                      backgroundColor: i === 0 ? "var(--accent-violet)" : "transparent",
                      boxShadow: i === 0 ? "0 0 16px var(--glow-violet)" : "0 0 8px var(--glow-cyan)",
                    }} />
                  </div>

                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <GlassCard className="p-6" glow="violet">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm tracking-tight">{exp.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{exp.company}</p>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "var(--accent-violet)" }}>
                          {exp.time}
                        </span>
                      </div>
                      {exp.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {exp.bullets.map((b) => (
                            <li key={b} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent-cyan)" }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </GlassCard>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
