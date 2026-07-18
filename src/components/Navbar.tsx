"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Mail, Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

const iconLinks = [
  { label: "GitHub", href: "https://github.com/WaLMaN-s", icon: Github },
  { label: "Instagram", href: "https://instagram.com/faber_sitorus", icon: Instagram },
  { label: "Email", href: "mailto:sswalman49@gmail.com", icon: Mail },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="#home"
          className="shrink-0 font-mono text-sm text-foreground"
          aria-label="Home"
        >
          walman@portfolio:<span className="rainbow-ink">~$</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 font-mono text-xs tracking-wider text-muted transition-colors duration-200 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1 lg:flex">
          {iconLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-accent"
            >
              <Icon size={17} aria-hidden="true" />
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-accent"
          >
            {light ? (
              <Moon size={17} aria-hidden="true" />
            ) : (
              <Sun size={17} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-accent"
          >
            {light ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors duration-200 hover:text-accent"
          >
            {open ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 font-mono text-sm tracking-wider text-muted transition-colors duration-200 hover:bg-card hover:text-accent"
                  >
                    <span className="rainbow-ink mr-2" aria-hidden="true">
                      &gt;
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2 flex items-center gap-2 border-t border-border px-3 pt-4 pb-2">
                {iconLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
