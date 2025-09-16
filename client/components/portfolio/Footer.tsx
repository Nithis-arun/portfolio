import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/Nithis-arun", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/profile-Nithis-Arun-T", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:arunnithis062@gmail.com", label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-0 md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="font-medium">Nithis Arun T</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
