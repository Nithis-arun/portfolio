import { useEffect, useRef } from "react";
import { Briefcase, FolderGit2, GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import { HIGHLIGHTS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  projector: FolderGit2,
  graduation: GraduationCap,
  mapPin: MapPin,
};

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const num = parseInt(target);
    if (isNaN(num) || !ref.current) return;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          gsap.to(counter, {
            value: num,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent = `${Math.round(counter.value)}${suffix}`;
              }
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle parallax for the glow orb
      gsap.to(".about-glow", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="scroll-mt-24 relative">
      {/* Background glow */}
      <div
        className="about-glow absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full -z-10"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal>
          <SectionHeading label="About Me" title="Turning ideas into reality" />
        </Reveal>

        <div className="mt-12 grid md:grid-cols-5 gap-8 items-start">
          {/* Bio */}
          <Reveal delay={0.1} className="md:col-span-3">
            <GlassCard className="p-8" glow="violet">
              <p className="text-muted-foreground leading-relaxed">
                Motivated and detail-oriented <span className="text-foreground font-medium">Java Full Stack Developer</span> with
                experience building scalable web and mobile applications. Skilled in debugging,
                problem-solving, and Agile collaboration. Strong foundation in{" "}
                <span className="text-foreground font-medium">Java, Spring Boot, React.js, and Firebase</span>.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I turn complex problems into elegant, user-friendly solutions — focusing on
                clean architecture, performance, and exceptional user experience.
              </p>
            </GlassCard>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.2} className="md:col-span-2">
            <GlassCard className="p-8" glow="cyan">
              <h3 className="font-semibold text-sm tracking-tight">Highlights</h3>
              <dl className="mt-5 space-y-4">
                {HIGHLIGHTS.map(({ label, value, icon }) => {
                  const Icon = iconMap[icon];
                  return (
                    <div key={label} className="flex items-center justify-between">
                      <dt className="text-muted-foreground text-sm inline-flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        {label}
                      </dt>
                      <dd className="text-sm font-medium">
                        {label === "Projects" ? (
                          <AnimatedCounter target="10" suffix="+" />
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
