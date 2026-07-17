import { Folder } from "lucide-react";
import Reveal from "./Reveal";
import TerminalWindow from "./TerminalWindow";

const categories: { name: string; skills: string[] }[] = [
  { name: "Frontend/", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend/", skills: ["Laravel", "PHP", "Node.js", "REST API", "Auth"] },
  { name: "Linux/", skills: ["Fedora", "Arch", "Bash", "systemd", "Hyprland"] },
  { name: "DevOps/", skills: ["Nginx", "Docker", "CI/CD", "VPS Deployment"] },
  { name: "Cloud/", skills: ["Cloudflare", "Vercel", "DNS", "SSL"] },
  { name: "Database/", skills: ["MySQL", "PostgreSQL", "SQLite", "Redis"] },
  { name: "Tools/", skills: ["Git", "Neovim", "tmux", "Postman", "Figma"] },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <Reveal>
        <h2 className="mb-8 font-mono text-xl text-foreground sm:text-2xl">
          <span className="text-muted">walman@portfolio:~$</span>{" "}
          <span className="text-accent">tree skills/</span>
        </h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.05}>
            <TerminalWindow title={`~/skills/${cat.name}`} className="h-full">
              <div className="flex items-center gap-2 font-mono text-sm text-foreground">
                <Folder size={15} className="text-accent" aria-hidden="true" />
                {cat.name}
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
