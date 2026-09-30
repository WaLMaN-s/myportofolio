"use client";

import { motion } from "framer-motion";
import { Folder, ArrowRight } from "lucide-react";
import Link from "next/link";

type FolderItemProps = {
  name: string;
  href: string;
};

export default function FolderItem({ name, href }: FolderItemProps) {
  return (
    <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm text-foreground transition-colors duration-200 hover:bg-border/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Folder
          size={16}
          className="rainbow-ink shrink-0"
          aria-hidden="true"
        />
        <span className="flex-1 truncate">{name}</span>
        <ArrowRight
          size={14}
          className="shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}
