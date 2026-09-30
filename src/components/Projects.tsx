"use client";

import { Coffee, Library, Map, Gamepad2, Palmtree } from "lucide-react";
import Reveal from "./Reveal";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    title: "lorong-kopi",
    description:
      "Full-featured coffee shop platform with online ordering, admin dashboard and live deployment.",
    stack: ["Laravel 12", "MySQL", "Tailwind"],
    href: "https://lorongkopi.my.id",
    icon: Coffee,
  },
  {
    title: "mta-reservation",
    description:
      "Reservation system with scheduling, availability management and clean booking flow.",
    stack: ["PHP", "MySQL", "JavaScript"],
    href: "https://kreteksehati.my.id/",
    icon: Map,
  },
  {
    title: "Tiket-Konser",
    description:
      "Ticketing system for concerts with QR code ticket generation and admin dashboard for event management.",
    stack: ["PHP", "java", "Tailwind"],
    href: "https://tiket-konser.infinityfreeapp.com/",
    icon: Gamepad2,
  },
  {
    title: "trip-rajaampat",
    description:
      "Tour package booking site for Raja Ampat with QRIS/bank transfer payment proof upload and an admin verification dashboard.",
    stack: ["PHP", "MySQL", "Vanilla JS"],
    href: "https://triprajaampat.infinityfreeapp.com/public/",
    icon: Palmtree,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <Reveal>
        <h2 className="font-mono text-xl text-foreground sm:text-2xl">
          <span className="text-muted">walman@portfolio:~$</span>{" "}
          <span className="text-accent">ls projects</span>
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
