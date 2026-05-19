import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import { SKILL_GROUPS } from "@/lib/constants";

export default function SkillsSection() {
  const glowColors = ["violet", "cyan", "rose", "violet", "cyan", "rose"] as const;

  return (
    <section id="skills" className="scroll-mt-24 relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full -z-10"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            label="Skills"
            title="Technical Arsenal"
            subtitle="Technologies and tools I use to bring products to life"
          />
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={0.05 * i}>
              <GlassCard className="p-6 h-full holographic" glow={glowColors[i % glowColors.length]}>
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: i % 3 === 0 ? "rgba(139,92,246,0.15)" :
                        i % 3 === 1 ? "rgba(6,182,212,0.15)" : "rgba(244,63,94,0.15)",
                    }}
                  >
                    <g.Icon
                      className="h-4 w-4"
                      style={{
                        color: i % 3 === 0 ? "var(--accent-violet)" :
                          i % 3 === 1 ? "var(--accent-cyan)" : "var(--accent-rose)",
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold tracking-tight">{g.title}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
