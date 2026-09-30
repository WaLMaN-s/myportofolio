"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Folder,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import TerminalWindow from "./TerminalWindow";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Certificate = {
  title: string;
  file: string;
};

type Category = {
  dir: string;
  items: Certificate[];
};

const categories: Category[] = [
  {
    dir: "mysql",
    items: [
      { title: "SELECT Statement", file: "certificate-select-statement.pdf" },
      { title: "Operator Logika", file: "certificate-Oprator_Logika.pdf" },
      { title: "Mengolah Data Text", file: "certificate-MengelolahDataText.pdf" },
      { title: "Mengolah Tanggal", file: "certificate-Mengelolah_tanggal.pdf" },
      {
        title: "ORDER BY — Mengurutkan Data",
        file: "certificate-OrderBY_MengurutkanData.pdf",
      },
      { title: "Fungsi GROUP BY", file: "certificate-Fungsion _group_by.pdf" },
      {
        title: "GROUP BY & HAVING",
        file: "certificate-group_by_and_having.pdf.pdf",
      },
      { title: "SubQuery SQL", file: "certificate-SubQuery_SQL.pdf" },
      { title: "INNER JOIN & UNION", file: "certificate-InnerJoin_and_UNIONpdf.pdf" },
      { title: "SQL with AI", file: "certificate- SQLwithAI .pdf" },
      { title: "Data Engineer", file: "certificate-data_enginer.pdf" },
      { title: "SKU Funnel Data Mart", file: "certificate_SKU_Funnel_Data_Mart.pdf" },
      {
        title: "Historical Data Integration",
        file: "certificate_Historical_Data_Integration.pdf",
      },
      {
        title: "Inventory Data Integration",
        file: "certificate-Inventory_Data_Integration.pdf",
      },
    ],
  },
  {
    dir: "python",
    items: [
      { title: "Python Beginner — Part 1", file: "certificate-_eginerPart1.pdf" },
      { title: "Python Beginner — Part 2", file: "certificate-beginerPart2.pdf" },
      { title: "Python Beginner — Part 3", file: "certificate-beginnerPart3.pdf" },
      { title: "Sertifikat Python", file: "python.pdf" },
    ],
  },
  {
    dir: "js",
    items: [
      {
        title: "Dasar Bahasa Pemrograman JavaScript",
        file: "pelatihan-dasar_JS.pdf",
      },
    ],
  },
];

const total = categories.reduce((n, category) => n + category.items.length, 0);

// Nama file asli punya spasi & karakter campur, jadi di-encode sebelum dipakai.
function pdfHref(dir: string, file: string) {
  return encodeURI(`${BASE_PATH}/certificates/${dir}/${file}`);
}

// Preview dirender dari PDF-nya (pdftoppm → webp), namanya mengikuti file PDF.
function previewSrc(dir: string, file: string) {
  return encodeURI(
    `${BASE_PATH}/certificates/previews/${dir}/${file.replace(/\.pdf$/i, "")}.webp`,
  );
}

export default function Certificate() {
  const [openDirs, setOpenDirs] = useState<string[]>(["mysql"]);
  const [preview, setPreview] = useState<{ dir: string; index: number } | null>(
    null,
  );

  const activeCategory = preview
    ? categories.find((category) => category.dir === preview.dir)
    : undefined;
  const activeItem =
    activeCategory && preview ? activeCategory.items[preview.index] : undefined;

  const step = useCallback((delta: number) => {
    setPreview((current) => {
      if (!current) return current;
      const category = categories.find((c) => c.dir === current.dir);
      if (!category) return current;
      const count = category.items.length;
      return { dir: current.dir, index: (current.index + delta + count) % count };
    });
  }, []);

  const close = useCallback(() => setPreview(null), []);

  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [preview, close, step]);

  const toggle = (dir: string) =>
    setOpenDirs((current) =>
      current.includes(dir)
        ? current.filter((item) => item !== dir)
        : [...current, dir],
    );

  return (
    <section
      id="certificate"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <Reveal>
        <h2 className="mb-8 font-mono text-xl text-foreground sm:text-2xl">
          <span className="text-muted">walman@portfolio:~$</span>{" "}
          <span className="text-accent">ls certificate</span>
        </h2>
      </Reveal>

      <Reveal>
        <TerminalWindow title="walman@portfolio:~/certificates">
          <p className="font-mono text-sm text-muted">
            <span className="rainbow-ink">$</span> tree certificates/
          </p>

          <ul className="mt-3 space-y-1">
            {categories.map((category, i) => {
              const isOpen = openDirs.includes(category.dir);
              const panelId = `cert-panel-${category.dir}`;
              return (
                <li key={category.dir}>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
                    <span aria-hidden="true">
                      {i === categories.length - 1 ? "└──" : "├──"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(category.dir)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex items-center gap-2 rounded px-1.5 py-0.5 font-mono text-sm text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <ChevronRight
                        size={16}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                      <Folder
                        size={20}
                        className="text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{category.dir}/</span>
                      <span className="text-xs">
                        {category.items.length} certificates
                      </span>
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="mt-4 mb-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                      >
                        {category.items.map((item, index) => (
                          <div
                            key={item.file}
                            className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors duration-300 hover:border-accent/60"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setPreview({ dir: category.dir, index })
                              }
                              aria-label={`Lihat sertifikat ${item.title}`}
                              className="group block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={previewSrc(category.dir, item.file)}
                                alt={`Sertifikat ${item.title}`}
                                width={1000}
                                height={708}
                                loading="lazy"
                                className="aspect-[1000/708] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                              />
                            </button>
                            <div className="flex flex-1 flex-col p-3">
                              <h4 className="font-mono text-xs font-semibold text-foreground">
                                {item.title}
                              </h4>
                              <a
                                href={pdfHref(category.dir, item.file)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors duration-200 hover:text-accent"
                              >
                                Open PDF
                                <ExternalLink size={11} aria-hidden="true" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 font-mono text-sm text-muted">
            <span className="rainbow-ink">$</span>{" "}
            <span className="text-foreground">{total}</span> certificates — klik
            folder buat lihat preview
          </p>
        </TerminalWindow>
      </Reveal>

      <AnimatePresence>
        {preview && activeCategory && activeItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Sertifikat ${activeItem.title}`}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center gap-4 border-b border-border px-4 py-3">
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
                  {activeItem.title}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {preview.index + 1} / {activeCategory.items.length}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tutup preview"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc(activeCategory.dir, activeItem.file)}
                alt={`Sertifikat ${activeItem.title}`}
                width={1000}
                height={708}
                className="max-h-[70vh] w-full bg-background object-contain"
              />

              <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Sertifikat sebelumnya"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>

                <a
                  href={pdfHref(activeCategory.dir, activeItem.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
                >
                  Open PDF
                  <ExternalLink size={12} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Sertifikat berikutnya"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
