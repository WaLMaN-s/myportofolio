import { FileText, Folder } from "lucide-react";
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
    ],
  },
];

const total = categories.reduce((n, category) => n + category.items.length, 0);

// Nama file asli punya spasi & karakter campur, jadi di-encode sebelum dipakai.
function pdfHref(dir: string, file: string) {
  return encodeURI(`${BASE_PATH}/certificates/${dir}/${file}`);
}

export default function Certificate() {
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
          <ul className="mt-3 space-y-1 font-mono text-sm text-muted">
            {categories.map((category, i) => (
              <li key={category.dir} className="flex flex-wrap items-center gap-2">
                <span aria-hidden="true">
                  {i === categories.length - 1 ? "└──" : "├──"}
                </span>
                <Folder size={14} className="text-accent" aria-hidden="true" />
                <span className="text-foreground">{category.dir}/</span>
                <span className="text-xs">
                  {category.items.length} certificates
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-sm text-muted">
            <span className="rainbow-ink">$</span>{" "}
            <span className="text-foreground">{total}</span> certificates
            ditemukan
          </p>
        </TerminalWindow>
      </Reveal>

      {categories.map((category) => (
        <div key={category.dir} className="mt-12">
          <Reveal>
            <h3 className="font-mono text-base text-foreground sm:text-lg">
              <span className="text-muted">walman@portfolio:~$</span>{" "}
              <span className="text-accent">
                ls certificates/{category.dir}/
              </span>
            </h3>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item, i) => (
              <Reveal key={item.file} delay={i * 0.05} className="h-full">
                <a
                  href={pdfHref(category.dir, item.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent/60"
                >
                  <FileText
                    size={18}
                    className="rainbow-ink"
                    aria-hidden="true"
                  />
                  <h4 className="mt-3 font-mono text-sm font-semibold text-foreground group-hover:text-accent">
                    {item.title}
                  </h4>
                  <p className="mt-2 flex-1 break-all font-mono text-xs text-muted">
                    {item.file}
                  </p>
                  <p className="mt-4 font-mono text-xs text-muted">
                    View PDF <span aria-hidden="true">↗</span>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
