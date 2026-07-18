import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/WaLMaN-s", icon: Github },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/walman",
    icon: Linkedin,
  },
  { label: "Email", href: "sswalman49@gmai.com", icon: Mail },
  {
    label: "Instagram",
    href: "https://instagram.com/walman",
    icon: Instagram,
  },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
