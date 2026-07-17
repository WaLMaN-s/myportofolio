import Reveal from "./Reveal";
import Timeline, { type TimelineEntry } from "./Timeline";

const entries: TimelineEntry[] = [
  {
    year: "2025 — Now",
    title: "Full Stack Developer — Freelance",
    description:
      "Designing and shipping production web apps end-to-end: Laravel & Next.js frontends, REST APIs, MySQL, and deployment on Linux servers.",
  },
  {
    year: "2024",
    title: "Backend & DevOps Focus",
    description:
      "Built reservation and management systems, hardened Linux VPS deployments, automated workflows with shell scripting.",
  },
  {
    year: "2023",
    title: "Web Developer — Projects & Study",
    description:
      "Delivered library systems and business websites while deepening fundamentals in PHP, JavaScript and databases.",
  },
  {
    year: "2021",
    title: "The Beginning",
    description:
      "First line of code and first Linux install. Fell in love with the terminal and never looked back.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <Reveal>
        <h2 className="mb-10 font-mono text-xl text-foreground sm:text-2xl">
          <span className="text-muted">walman@portfolio:~$</span>{" "}
          <span className="text-accent">git log --experience</span>
        </h2>
      </Reveal>
      <Timeline entries={entries} />
    </section>
  );
}
