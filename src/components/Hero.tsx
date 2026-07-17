"use client";

import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import FolderItem from "./FolderItem";
import Button from "./Button";
import Cursor from "./Cursor";

const TUX = String.raw`
         .--.
        |o_o |
        |:_/ |
       //   \ \
      (|     | )
     /'\_   _/'\
     \___)=(___/
`;

const folders = [
  { name: "01_about_me", href: "#about" },
  { name: "02_projects", href: "#projects" },
  { name: "03_experience", href: "#experience" },
  { name: "04_skills", href: "#skills" },
  { name: "05_blog", href: "#blog" },
  { name: "06_contact", href: "#contact" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:pt-36">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <TerminalWindow title="walman@portfolio:~$ whoami">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8 md:flex-row md:items-center"
          >
            <div className="min-w-0 flex-1">
              <motion.p
                variants={item}
                className="font-mono text-sm text-muted"
              >
                Hi, I&apos;m
              </motion.p>
              <motion.h1
                variants={item}
                className="mt-2 font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                Walman Ss
                <Cursor className="ml-2" />
              </motion.h1>
              <motion.p
                variants={item}
                className="mt-3 font-mono text-base text-accent sm:text-lg"
              >
                Full Stack Developer &amp; Linux Enthusiast
              </motion.p>
              <motion.p
                variants={item}
                className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
              >
                I build modern, secure and scalable web applications with clean
                architecture, elegant UI and Linux-powered infrastructure.
              </motion.p>
              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button href="#projects">View Projects</Button>
                <Button href="/cv.pdf" variant="ghost" external>
                  Download CV
                </Button>
              </motion.div>
            </div>

            <motion.pre
              variants={item}
              aria-hidden="true"
              className="mx-auto shrink-0 select-none overflow-hidden font-mono text-accent md:mx-0"
              style={{ fontSize: "clamp(0.8rem, 2.2vw, 1.15rem)", lineHeight: 1.25 }}
            >
              {TUX}
            </motion.pre>
          </motion.div>
        </TerminalWindow>

        <TerminalWindow title="walman@portfolio:~$ ls -a" className="h-fit">
          <p className="mb-3 font-mono text-xs text-muted">
            <span className="text-accent">$</span> ls -a ./sections
          </p>
          <nav aria-label="Section shortcuts" className="flex flex-col gap-1">
            {folders.map((folder) => (
              <FolderItem key={folder.name} {...folder} />
            ))}
          </nav>
        </TerminalWindow>
      </div>
    </section>
  );
}
