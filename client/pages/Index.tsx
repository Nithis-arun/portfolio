import { useState, useRef } from "react";
import Section from "@/components/portfolio/Section";
import Reveal from "@/components/portfolio/Reveal";
import Typing from "@/components/portfolio/Typing";
import { FaSquarePhone } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { ArrowRight, Download, Mail, Linkedin, Phone, MapPin, Code2, Layout, Server, Database, Wrench, BadgeCheck } from "lucide-react";

const CV_URL = "https://drive.google.com/file/d/1_ZA28wkkPNY32cpPnXQTz0YC7xn8gyBE/view?usp=sharing";


export default function Index() {
  return (
    <div id="top">
      <Hero />
      <Main />
    </div>
  );
}

function Hero() {
  const orbA = useRef<HTMLDivElement | null>(null);
  const orbB = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 20;
    const y = (e.clientY / h - 0.5) * 20;
    if (orbA.current) orbA.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (orbB.current) orbB.current.style.transform = `translate3d(${x * -0.6}px, ${y * -0.6}px, 0)`;
  };
  return (
    <div className="relative overflow-hidden" onMouseMove={onMove}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-indigo-950 dark:via-slate-950 dark:to-purple-950" />
      <div ref={orbA} className="absolute -top-1/2 right-[-10%] h-[90vh] w-[90vh] rounded-full bg-primary/10 blur-3xl transition-transform duration-300" />
      <div ref={orbB} className="absolute -bottom-1/3 left-[-10%] h-[70vh] w-[70vh] rounded-full bg-fuchsia-400/10 blur-3xl transition-transform duration-300" />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-12 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-white/60 dark:bg-white/10 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for freelance projects &amp; full-time roles
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="animated-name">Nithis Arun T</span>
            </h1>
            <Typing
              phrases={["Java Full Stack Developer","Spring Boot • React.js","Open to freelance & full-time"]}
              className="mt-2 block text-2xl sm:text-3xl font-semibold text-foreground"
            />
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
               Passionate about building scalable web applications with modern technologies. Expertise in JAVA Full stack development with a focus on user experience and performance optimization.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href="#projects"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md bg-primary px-5 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md border px-5 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Mail Me<Mail className="ml-2 h-6 w-6" />
              </a>
              <a
                href="tel:8124199898"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md border px-5 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Call Me<FaSquarePhone className="ml-2 h-6 w-6" />
              </a>
              <a
                href="https://github.com/Nithis-arun"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md border px-5 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                Github <FaGithub className="ml-2 h-6 w-6" />
              </a>

              {/* <a
                href={CV_URL}
                download
                target="_blank"
                rel="noreferrer"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md px-5 font-medium text-sm text-muted-foreground hover:text-foreground"
              >
                Download CV <Download className="ml-2 h-4 w-4" />
              </a> */}
            </div>
          </div>
          <div className="lg:col-span-5 hidden">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-fuchsia-400/30 blur-2xl" />
              <div className="relative rounded-3xl border bg-white/70 dark:bg-white/5 backdrop-blur shadow-xl">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                  <img
                    src="/placeholder.svg"
                    alt="Portrait of Nithis Arun T"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main>
      <Section id="about">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 rounded-2xl rainbow-border p-6 bg-gradient-to-b from-white to-white/60 dark:from-white/5 dark:to-white/5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About Me</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Motivated and detail‑oriented Java Full Stack Developer with experience building scalable web and mobile applications. Skilled in debugging, problem‑solving, and Agile collaboration. Strong foundation in Java, Spring Boot, React.js, and Firebase.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {/* {skills.map((s) => (
                <span key={s} className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white dark:bg-white/5">
                  {s}
                </span>
              ))} */}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-2xl rainbow-border p-6 bg-gradient-to-b from-white to-white/60 dark:from-white/5 dark:to-white/5">
              <h3 className="font-semibold">Contact</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Email</dt>
                  <dd>arunnithis062@gmail.com</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</dt>
                  <dd>8124199898</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</dt>
                  <dd className="truncate max-w-[12rem]"><a href="https://www.linkedin.com/in/profile-Nithis-Arun-T" target="_blank" rel="noreferrer" className="hover:underline">profile‑Nithis‑Arun‑T</a></dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2">GitHub</dt>
                  <dd className="truncate max-w-[12rem]"><a href="https://github.com/Nithis-arun" target="_blank" rel="noreferrer" className="hover:underline">Nithis‑arun</a></dd>
                </div>
                <br></br>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      <SkillsSection />

      <Section id="experience" className="bg-gradient-to-b from-transparent to-indigo-50/50 dark:to-indigo-950/40">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">Experience</h2>
        <div className="mt-8 grid gap-6">
          <Experience
            title="Java Full Stack Developer Intern"
            company="Quvantuva"
            time="Apr 2025 – Jul 2025"
            bullets={[
              "Developed a full‑stack IPO Insights platform using Spring Boot + React",
              "Created and deployed secure REST APIs; integrated PostgreSQL",
              "Collaborated via GitHub/Figma within Agile sprints",
            ]}
          />
          <Experience
            title="Software Development Engineer Intern"
            company="Bluestock Fintech"
            time="Feb 2025 – May 2025"
            bullets={[
              "Built backend APIs with Node.js including real‑time features",
              "Optimized performance across a cross‑platform environment",
            ]}
          />
          <Experience
            title="Web Development Intern"
            company="HIT‑TECH"
            time="Jul 2023 – Aug 2023"
            bullets={[]}
          />
        </div>
      </Section>

      <Section id="projects">
        <div className="flex  justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">Projects <span className="ml-2 align-middle text-xs sm:text-sm inline-flex items-center rounded-full border px-2 py-0.5 bg-white/60 dark:bg-white/10 text-center">10+</span></h2>
          {/* <a href={CV_URL} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Resume</a> */}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="education">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">Education</h2>
        <div className="mt-6 rounded-2xl rainbow-border p-6 bg-gradient-to-b from-white to-white/60 dark:from-white/5 dark:to-white/5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold">B.Tech in Information Technology</p>
            <span className="text-sm text-muted-foreground">2021 – 2025</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Coimbatore Institute of Technology</p>
        </div>
      </Section>

      <Section id="contact">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Let’s build together</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Have a project in mind or just want to say hi? I’m currently open for opportunities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:arunnithis062@gmail.com"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md bg-primary px-5 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Email me <Mail className="ml-2 h-4 w-4" />
              </a>
              <a
                href="tel:8124199898"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md border px-5 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Call
              </a>
              <a
                href="https://www.linkedin.com/in/profile-Nithis-Arun-T"
                target="_blank"
                rel="noreferrer"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md border px-5 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Connect on LinkedIn <Linkedin className="ml-2 h-4 w-4" />
              </a>
              <a
                href={CV_URL}
                download
                target="_blank"
                rel="noreferrer"
                className="btn-animated inline-flex items-center justify-center h-11 rounded-md border px-5 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="rounded-2xl rainbow-border p-6 bg-gradient-to-b from-white to-white/60 dark:from-white/5 dark:to-white/5">
              <h3 className="font-semibold">Contact</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Email</dt>
                  <dd>arunnithis062@gmail.com</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</dt>
                  <dd>8124199898</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</dt>
                  <dd>Bangalore, IN</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</dt>
                  <dd className="truncate max-w-[12rem]"><a href="https://www.linkedin.com/in/profile-Nithis-Arun-T" target="_blank" rel="noreferrer" className="hover:underline">profile‑Nithis‑Arun‑T</a></dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-2">GitHub</dt>
                  <dd className="truncate max-w-[12rem]"><a href="https://github.com/Nithis-arun" target="_blank" rel="noreferrer" className="hover:underline">Nithis‑arun</a></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs bg-white/60 dark:bg-white/10">{children}</span>;
}

function SkillsCard({ title, Icon, items }: { title: string; Icon: any; items: string[] }) {
  return (
    <div className="rounded-2xl rainbow-border p-6">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((it) => (
          <Chip key={it}>{it}</Chip>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  const groups = [
    { title: "Programming Languages", Icon: Code2, items: ["Java", "JavaScript", "TypeScript", "Python"] },
    { title: "Frontend Technologies", Icon: Layout, items: ["React.js", "Tailwind CSS", "CSS", "HTML"] },
    { title: "Backend Technologies", Icon: Server, items: ["Node.js", "Express.js", "Spring Boot"] },
    { title: "Database Systems", Icon: Database, items: ["MongoDB", "MySQL", "Oracle SQL", "Firebase"] },
    { title: "Development Tools", Icon: Wrench, items: ["Git", "VS Code", "Postman", "npm", "CI/CD"] },
    { title: "Core Concepts", Icon: BadgeCheck, items: ["REST APIs", "JWT", "CRUD", "OOP", "DBMS", "DSA"] },
  ];
  return (
    <Section id="skills" className="bg-gradient-to-b from-transparent to-indigo-50/30 dark:to-indigo-950/30">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">Technical Skills</h2>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={0.05 * i}>
            <SkillsCard {...g} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Experience({ title, company, time, bullets }: { title: string; company: string; time: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl rainbow-border p-6 bg-white/70 dark:bg-white/5 backdrop-blur">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold">{title} — <span className="text-muted-foreground">{company}</span></p>
        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
      {bullets.length > 0 && (
        <ul className="mt-3 list-disc pl-5 text-sm text-foreground/80 space-y-1">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProjectCard({ title, tag, desc, bullets }: { title: string; tag: string; desc: string; bullets?: string[] }) {
  const [style, setStyle] = useState<{ transform: string }>({ transform: "" });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const rx = py * -6;
    const ry = px * 8;
    setStyle({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)` });
  };
  const reset = () => setStyle({ transform: "" });
  return (
    <article
      className="group overflow-hidden rounded-2xl border bg-white dark:bg-white/5 shadow-sm transition hover:shadow-lg"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={style}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-white to-purple-200 dark:from-indigo-900 dark:via-slate-900 dark:to-purple-900" />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:"radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.15), transparent 40%)"}} />
      </div>
      <div className="p-5">
        <h3 className="font-semibold tracking-tight group-hover:text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        {bullets && bullets.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-xs text-muted-foreground space-y-1">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/*const skills = [
  "Java",
  "OOP",
  "Spring Boot",
  "React.js",
  "TypeScript",
  "Node.js",
  "Android Studio",
  "Firebase",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "JWT",
  "REST API",
  "Git",
  "GitHub",
  "CI/CD",
  "AWS Basics",
  "Agile",
  "MVC Architecture",
  "Figma",
  "VS Code",
];*/

const projects = [
  {
    title: "Mannoviyam",
    tag: "",
    desc: "A mental wellness platform with mindful journaling, habit tracking, and curated resources to improve emotional health.",
  },
  {
    title: "Match Maker — Matrimonial Web App",
    tag: "React (TS) • Spring Boot • MySQL",
    desc: "JWT authentication, Figma‑designed responsive UI. Deployed with GitHub workflows and Agile process.",
    bullets: [
      "Responsive frontend in React + TypeScript",
      "Spring Boot REST APIs with MySQL",
      "JWT authentication and role-based access",
      "UI/UX designed in Figma",
    ],
  },
  {
    title: "Student Course Management System",
    tag: "Spring Boot • React.js • MongoDB",
    desc: "REST APIs with JWT auth and a clean, responsive frontend for course and student management.",
    bullets: [
      "Secure Spring Boot API endpoints",
      "React UI with responsive layout",
      "MongoDB CRUD operations",
    ],
  },
  {
    title: "IPO Insight Platform",
    tag: "Spring Boot • React • PostgreSQL",
    desc: "Secure APIs and data visualization with CI/CD and PDF downloads for reports.",
    bullets: [
      "Downloadable PDF documents",
      "CI/CD deployment with version control",
      "PostgreSQL integration",
    ],
  },
  {
    title: "Smart Fruit Basket (AI + IoT)",
    tag: "ML • Firebase • Flutter",
    desc: "Model detects fresh/rotten fruits, stock alerts, BigBasket auto‑reorder, and chatbot integration.",
    bullets: [
      "Flutter (iOS & Android) mobile app",
      "ML model for fresh/rotten detection via camera",
      "Firebase real-time sync and push notifications",
      "Auto ordering via BigBasket API + chatbot",
    ],
  },
];
