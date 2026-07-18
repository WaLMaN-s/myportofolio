"use client";

import { useState, type FormEvent } from "react";
import { Github, Mail, Instagram, FileDown } from "lucide-react";
import Reveal from "./Reveal";
import TerminalWindow from "./TerminalWindow";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const channels = [
  { label: "sswalman49@gmail.com", href: "mailto:sswalman49@gmail.com", icon: Mail },
  { label: "github.com/WaLMaN-s", href: "https://github.com/WaLMaN-s", icon: Github },
  { label: "instagram.com/faber_sitorus", href: "https://instagram.com/faber_sitorus", icon: Instagram },
  { label: "resume.pdf", href: `${BASE_PATH}/cv.pdf`, icon: FileDown },
];

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors duration-200";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio contact from ${data.get("name")}`
    );
    const body = encodeURIComponent(String(data.get("message") ?? ""));
    window.location.href = `mailto:sswalman49@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <Reveal>
        <h2 className="mb-8 font-mono text-xl text-foreground sm:text-2xl">
          <span className="text-muted">walman@portfolio:~$</span>{" "}
          <span className="text-accent">ssh walman@contact</span>
        </h2>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <TerminalWindow title="ssh walman@contact" className="h-full">
            <p className="font-mono text-sm text-muted">
              <span className="rainbow-ink">➜</span> Connection established.
              Reach me through any channel:
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {channels.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-foreground transition-colors duration-200 hover:bg-border/40"
                  >
                    <Icon
                      size={16}
                      className="rainbow-ink shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate group-hover:text-accent">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </TerminalWindow>
        </Reveal>

        <Reveal delay={0.1}>
          <TerminalWindow title="walman@portfolio:~$ ./send-message.sh" className="h-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block font-mono text-xs text-muted"
                >
                  <span className="rainbow-ink">$</span> name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block font-mono text-xs text-muted"
                >
                  <span className="rainbow-ink">$</span> email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono text-xs text-muted"
                >
                  <span className="rainbow-ink">$</span> message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="write your message…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-accent bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-colors duration-200 hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true">&gt;</span> Send Message
              </button>
              <p aria-live="polite" className="font-mono text-xs text-muted">
                {sent && "Opening your mail client…"}
              </p>
            </form>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
