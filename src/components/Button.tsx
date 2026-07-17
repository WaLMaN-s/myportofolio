import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-md border px-5 py-2.5 font-mono text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "border-accent bg-accent/10 text-accent hover:bg-accent hover:text-background"
      : "border-border bg-card text-foreground hover:border-accent hover:text-accent";

  return (
    <Link
      href={href}
      className={`${base} ${styles}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span aria-hidden="true" className="text-accent">
        &gt;
      </span>
      {children}
    </Link>
  );
}
