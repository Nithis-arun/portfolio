import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";

export default function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal>
          <SectionHeading label="Education" title="Academic Background" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 max-w-2xl mx-auto">
            <GlassCard className="p-8" glow="cyan">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(6,182,212,0.1)" }}>
                  <GraduationCap className="h-6 w-6" style={{ color: "var(--accent-cyan)" }} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold tracking-tight">B.Tech in Information Technology</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(6,182,212,0.1)", color: "var(--accent-cyan)" }}>
                      2021 – 2025
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Coimbatore Institute of Technology</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
