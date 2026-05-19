import { Mail, Phone, MapPin, Linkedin, Github, Download, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import Reveal from "@/components/shared/Reveal";
import MagneticWrapper from "@/components/shared/MagneticWrapper";
import { CONTACT_INFO, CV_URL } from "@/lib/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 relative" aria-label="Contact information">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full -z-10"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <Reveal>
          <SectionHeading label="Contact" title="Let's build together" subtitle="Have a project in mind or just want to say hi? I'm currently open for opportunities." />
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-8 items-start">
          {/* CTA Area */}
          <Reveal delay={0.1} className="md:col-span-2">
            <GlassCard className="p-8" glow="violet">
              <h3 className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to start a project?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Whether you need a full-stack web application, API development, or a mobile app — I'm here to help bring your vision to life.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <MagneticWrapper strength={0.2}>
                  <a href={`mailto:${CONTACT_INFO.email}`}
                    className="btn-animated inline-flex items-center justify-center h-11 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 text-sm font-medium text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all gap-2">
                    <Mail className="h-4 w-4" /> Email me <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </MagneticWrapper>
                <MagneticWrapper strength={0.2}>
                  <a href={`tel:${CONTACT_INFO.phone}`}
                    className="btn-animated inline-flex items-center justify-center h-11 rounded-xl glass px-6 text-sm font-medium hover:bg-white/5 transition-all gap-2">
                    <Phone className="h-4 w-4" /> Call
                  </a>
                </MagneticWrapper>
                <MagneticWrapper strength={0.2}>
                  <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer"
                    className="btn-animated inline-flex items-center justify-center h-11 rounded-xl glass px-6 text-sm font-medium hover:bg-white/5 transition-all gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </MagneticWrapper>
                <MagneticWrapper strength={0.2}>
                  <a href={CV_URL} download target="_blank" rel="noreferrer"
                    className="btn-animated inline-flex items-center justify-center h-11 rounded-xl glass px-6 text-sm font-medium hover:bg-white/5 transition-all gap-2">
                    <Download className="h-4 w-4" /> Resume
                  </a>
                </MagneticWrapper>
              </div>
            </GlassCard>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.2}>
            <GlassCard className="p-8" glow="cyan">
              <h3 className="font-semibold text-sm tracking-tight">Contact Info</h3>
              <dl className="mt-5 space-y-4">
                {[
                  { icon: Mail, label: "Email", value: CONTACT_INFO.email },
                  { icon: Phone, label: "Phone", value: CONTACT_INFO.phone },
                  { icon: MapPin, label: "Location", value: CONTACT_INFO.location },
                  { icon: Linkedin, label: "LinkedIn", value: "Nithis Arun T", href: CONTACT_INFO.linkedin },
                  { icon: Github, label: "GitHub", value: "Nithis-arun", href: CONTACT_INFO.github },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center justify-between gap-2">
                    <dt className="text-muted-foreground text-xs inline-flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </dt>
                    <dd className="text-xs truncate max-w-[10rem]">
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" style={{ color: "var(--accent-cyan)" }}>
                          {value}
                        </a>
                      ) : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
