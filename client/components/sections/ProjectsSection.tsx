import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import { PROJECTS, type Project } from "@/lib/constants";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [style, setStyle] = useState<{ transform: string }>({ transform: "" });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${py * -5}deg) rotateY(${px * 6}deg) scale(1.02)`,
    });
  };

  const reset = () => setStyle({ transform: "" });

  const colors = ["var(--accent-violet)", "var(--accent-cyan)", "var(--accent-rose)"];
  const accentColor = colors[index % 3];

  return (
    <div
      className="group relative h-72 rounded-2xl transition-all duration-300"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ ...style, transition: "transform 0.15s ease-out" }}
    >
      <GlassCard className="h-full holographic" glow={index % 3 === 0 ? "violet" : index % 3 === 1 ? "cyan" : "rose"}>
        <div className="p-6 flex flex-col h-full relative z-10">
          {/* Top accent line */}
          <div className="absolute top-0 left-6 right-6 h-px" style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            opacity: 0.5,
          }} />

          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm tracking-tight leading-tight pr-2">
              {project.title}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0" style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}>
              Project
            </span>
          </div>

          <p className="mt-1.5 text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {project.tag}
          </p>

          <p className="mt-3 text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
            {project.desc}
          </p>

          {/* Skills */}
          <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
            {project.skills.slice(0, 5).map((s) => (
              <span key={s} className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px]" style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                {s}
              </span>
            ))}
            {project.skills.length > 5 && (
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] text-muted-foreground">
                +{project.skills.length - 5}
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
            style={{ backgroundColor: "rgba(3,0,20,0.92)", backdropFilter: "blur(8px)" }}>
            <div className="p-6 overflow-auto max-h-full w-full">
              <h4 className="font-semibold text-sm" style={{ color: accentColor }}>Details</h4>
              {project.bullets.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {project.bullets.map((b) => (
                    <li key={b} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">Details coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.04) 0%, transparent 70%)" }} />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal>
          <SectionHeading label="Projects" title="Featured Work"
            subtitle={<>Showcasing <span className="text-foreground font-medium">10+</span> projects built with modern technologies</>} />
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={0.06 * i}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
