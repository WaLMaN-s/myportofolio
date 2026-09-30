"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  icon: LucideIcon;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { title, description, stack, href, icon: Icon } = project;
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent/60 hover:shadow-[0_0_24px_rgba(34,197,94,0.08)]"
    >
      <div className="flex items-center justify-between">
        <span className="rainbow-ink flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
          <Icon size={18} aria-hidden="true" />
        </span>
        <ArrowUpRight
          size={16}
          className="text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-4 font-mono text-base font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rainbow-box mt-5 inline-flex w-fit items-center gap-2 rounded-md border px-4 py-2 font-mono text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="rainbow-ink" aria-hidden="true">
          &gt;
        </span>
        View Project
      </a>
    </motion.article>
  );
}
