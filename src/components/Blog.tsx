import { FileText } from "lucide-react";
import Reveal from "./Reveal";
import TerminalWindow from "./TerminalWindow";

type Article = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
};

const articles: Article[] = [];

export default function Blog() {
  return (
    <section
      id="blog"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6"
    >
      <Reveal>
        <h2 className="mb-8 font-mono text-xl text-foreground sm:text-2xl">
          <span className="text-muted">walman@portfolio:~$</span>{" "}
          <span className="text-accent">ls blog</span>
        </h2>
      </Reveal>

      {articles.length === 0 ? (
        <Reveal>
          <TerminalWindow title="walman@portfolio:~/blog">
            <p className="font-mono text-sm text-muted">
              <span className="text-accent">$</span> ls blog
            </p>
            <p className="mt-3 font-mono text-sm text-muted">
              No articles yet.
            </p>
          </TerminalWindow>
        </Reveal>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.06}>
              <a
                href={article.href}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent/60"
              >
                <FileText size={18} className="text-accent" aria-hidden="true" />
                <h3 className="mt-3 font-mono text-base font-semibold text-foreground group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {article.excerpt}
                </p>
                <p className="mt-4 font-mono text-xs text-muted">
                  {article.date}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
