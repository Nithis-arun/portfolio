import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  BadgeCheck,
} from "lucide-react";

// ── Resume / CV ──
export const CV_URL =
  "https://drive.google.com/file/d/1cnaUtK09YCYcY7AGHnrnz3j4hfo5to-9/view?usp=sharing";

// ── Navigation ──
export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

// ── Hero typing phrases ──
export const HERO_PHRASES = [
  "Java Full Stack Developer",
  "Spring Boot • React.js",
  "Open to freelance & full-time",
];

// ── About highlights ──
export const HIGHLIGHTS = [
  { label: "Experience", value: "6 mos+", icon: "briefcase" },
  { label: "Projects", value: "10+", icon: "projector" },
  { label: "Education", value: "BTech IT", icon: "graduation" },
  { label: "Location", value: "Tamil Nadu", icon: "mapPin" },
] as const;

// ── Skills ──
export interface SkillGroup {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Programming Languages",
    Icon: Code2,
    items: ["Java", "JavaScript", "TypeScript", "Python"],
  },
  {
    title: "Frontend Technologies",
    Icon: Layout,
    items: ["React.js", "Tailwind CSS", "Redux Toolkit", "TypeScript"],
  },
  {
    title: "Backend Technologies",
    Icon: Server,
    items: ["Spring Boot", "Spring Security", "Node.js", "Express.js"],
  },
  {
    title: "Database Systems",
    Icon: Database,
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "Development Tools",
    Icon: Wrench,
    items: ["Git", "GitHub", "Jira", "Figma", "Postman", "CI/CD"],
  },
  {
    title: "Core Concepts",
    Icon: BadgeCheck,
    items: ["REST APIs", "OAuth/JWT", "RBAC", "Query Optimization", "CRUD"],
  },
];

// ── Experience ──
export interface ExperienceItem {
  title: string;
  company: string;
  time: string;
  bullets: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Java Full Stack Developer",
    company: "TalentTurbo",
    time: "Oct 2025 – Present",
    bullets: [
      "Built a container logistics & management system (TCBA) for Tuticorin Customs Brokers Association",
      "Designed scalable REST APIs using Spring Boot + MySQL with OAuth authentication and role-based access control",
      "Integrated secure payment gateway and optimized database queries (20% performance improvement)",
      "Developed responsive UI with React.js; managed CI/CD deployment via GitHub",
    ],
  },
  {
    title: "Java Full Stack Developer Intern",
    company: "Quvantuva",
    time: "Apr 2025 – Sep 2025",
    bullets: [
      "Developed IPO Insights platform using Spring Boot + React with secure authentication",
      "Built matrimonial domain features including user profiles and matching algorithms",
      "Implemented RBAC and role-based data access; collaborated in Agile teams using Jira",
    ],
  },
  {
    title: "Software Development Engineer Intern",
    company: "Bluestock Fintech",
    time: "Feb 2025 – May 2025",
    bullets: [
      "Built backend APIs with Node.js for real-time stock screener platform",
      "Optimized API performance for high-frequency data handling and improved system scalability",
    ],
  },
  {
    title: "Web Development Intern",
    company: "HIT-TECH",
    time: "Jul 2023 – Aug 2023",
    bullets: [],
  },
];

// ── Projects ──
export interface Project {
  title: string;
  tag: string;
  skills: string[];
  desc: string;
  bullets: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  
  {
    title: "Office Management System (OMS)",
    tag: "Spring Boot • React.js • MySQL • Kafka • WebSockets",
    skills: [
      "Java",
      "Spring Boot",
      "React.js",
      "TypeScript",
      "MySQL",
      "JWT",
      "RBAC",
      "Redux Toolkit",
      "RTK Query",
      "Vite",
      "Tailwind CSS",
      "REST API",
      "WebSocket",
      "STOMP",
      "SockJS",
      "Apache Kafka",
      "Real-time Messaging",
      "AI Chatbot"
    ],
    desc: "Role-based enterprise web application for streamlining office workflows, task management, and resource allocation. Features real-time communication, Kafka event-driven architecture.",
    bullets: [
      "Built role-based enterprise web app with 4+ user roles (Admin, Manager, User, Customer)",
      "Implemented a real-time messaging and notification system using WebSocket, STOMP, and SockJS",
      "Designed and deployed secure REST APIs with JWT authentication, input validation, and error handling",
      "Implemented hierarchical RBAC with distinct permissions and role-specific dashboard views",
      "Developed responsive UI components using React + TypeScript with Redux Toolkit for state management",
      "Integrated RTK Query for efficient API data fetching and caching",
      "Set up development environment with Vite for fast HMR and optimized production builds",
      "Engineered an event-driven architecture with Apache Kafka for high-throughput real-time updates",
      "Designed secure REST APIs with JWT authentication and hierarchical RBAC",
      "Developed responsive UI components using React, TypeScript, and Redux Toolkit"
    ],
    featured: true,
  },
  {
    title: "TCBA Logistics & Container Management System",
    tag: "Spring Boot • React.js • MySQL • OAuth • Payment Gateway",
    skills: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "React.js",
      "TypeScript",
      "MySQL",
      "OAuth 2.0",
      "RBAC",
      "REST API",
      "Payment Integration",
      "Git",
      "GitHub",
    ],
    desc: "Enterprise logistics platform for Tuticorin Customs Brokers Association managing container tracking, port operations, and multi-user workflows with advanced security.",
    bullets: [
      "Engineered multi-layered REST API architecture with Spring Boot handling complex business logic",
      "Implemented OAuth 2.0 authentication with hierarchical RBAC (Admin, Manager, Officer, Broker)",
      "Integrated secure payment gateway for transaction processing with transaction logging & audit trails",
      "Optimized MySQL queries with indexing and connection pooling; improved response time by ~20%",
      "Built responsive UI using React.js with real-time data updates",
      "Deployed with CI/CD pipelines for seamless updates and rollbacks",
    ],
    featured: true,
  },
  {
    title: "Match Maker — Matrimonial Web App",
    tag: "React (TS) • Spring Boot • MySQL • Figma",
    skills: [
      "Java",
      "OOP",
      "Figma",
      "Spring Boot",
      "React.js",
      "TypeScript",
      "MySQL",
      "Git",
      "GitHub",
      "REST API",
      "JWT",
    ],
    desc: "Full-stack matrimonial platform with profile matching and intelligent search algorithms, featuring JWT authentication and responsive UI design.",
    bullets: [
      "Developed full-stack matrimonial platform with profile matching and authentication",
      "Led frontend development independently using React + TypeScript",
      "Collaborated with backend team to build and integrate scalable REST APIs",
      "Designed UI/UX in Figma with responsive layouts",
      "Deployed via GitHub workflows following Agile development practices",
    ],
  },
  {
    title: "IPO Insight Platform",
    tag: "Spring Boot • React • PostgreSQL • PDF Generation",
    skills: [
      "Java",
      "Figma",
      "Spring Boot",
      "React.js",
      "TypeScript",
      "Node.js",
      "Git",
      "GitHub",
      "PostgreSQL",
      "REST API",
      "PDF Generation",
    ],
    desc: "Data visualization platform for IPO analysis and document download with secure APIs and CI/CD deployment.",
    bullets: [
      "Optimized PostgreSQL queries for complex data retrieval and analysis",
      "Implemented secure user authentication and role-based data access",
      "Built document download features with PDF generation capabilities",
      "Deployed with CI/CD pipeline for continuous integration",
    ],
  },
  {
    title: "Arun Financial Consulting",
    tag: "React.js • Next.js • Node.js • MongoDB • Vercel",
    skills: [
      "React.js",
      "CSS",
      "JavaScript",
      "Vercel",
      "Node.js",
      "Next.js",
      "MongoDB",
      "Responsive Design",
      "SEO",
    ],
    desc: "Responsive business website for a financial consulting firm with modern design and fast performance.",
    bullets: [
      "Responsive design optimized for all devices",
      "Modern and clean UI with professional styling",
      "Contact form integration",
      "Fast loading performance",
      "SEO-friendly structure",
      "Deployed on Vercel",
    ],
  },
  {
    title: "Mannoviyam",
    tag: "TypeScript • Node.js • MongoDB • REST API",
    skills: [
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "JWT Authentication",
      "Git",
      "GitHub",
    ],
    desc: "Mental wellness platform with mindful journaling, habit tracking, and curated resources to improve emotional health.",
    bullets: [
      "Built backend services using Node.js and Express",
      "Type-safe development using TypeScript",
      "MongoDB database design and CRUD operations",
      "RESTful APIs for journaling and habit modules",
      "Authentication using JWT",
    ],
  },
  {
    title: "Smart Fruit Basket (AI + IoT)",
    tag: "Flutter • ML • Firebase • Python • Raspberry Pi",
    skills: [
      "Figma",
      "Flutter",
      "ML",
      "Python",
      "IoT",
      "Firebase",
      "Git",
      "GitHub",
      "API",
      "Raspberry Pi",
    ],
    desc: "ML-powered mobile app detecting fruit freshness via camera, with Firebase sync, push notifications, and BigBasket auto-reorder integration.",
    bullets: [
      "Flutter cross-platform app (iOS & Android)",
      "ML model for fruit freshness detection using TensorFlow",
      "Firebase real-time sync and push notifications",
      "Auto-ordering via BigBasket API + chatbot integration",
    ],
  },
];

// ── Social links ──
export const SOCIALS = [
  {
    href: "https://github.com/Nithis-arun",
    label: "GitHub",
    icon: "github",
  },
  {
    href: "https://www.linkedin.com/in/profile-Nithis-Arun-T",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "mailto:arunnithis062@gmail.com",
    label: "Email",
    icon: "mail",
  },
] as const;

// ── Contact info ──
export const CONTACT_INFO = {
  email: "arunnithis062@gmail.com",
  phone: "8124199898",
  location: "Bangalore, IN",
  linkedin: "https://www.linkedin.com/in/profile-Nithis-Arun-T",
  github: "https://github.com/Nithis-arun",
} as const;