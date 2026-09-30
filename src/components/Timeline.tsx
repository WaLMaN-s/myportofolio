import Reveal from "./Reveal";

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative mx-auto max-w-3xl">
      {/* vertical line */}
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[7px] w-px bg-border md:left-1/2"
      />
      {entries.map((entry, i) => {
        const left = i % 2 === 0;
        return (
          <li key={`${entry.year}-${entry.title}`} className="relative pb-10 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background md:left-1/2 md:-translate-x-1/2"
            />
            <Reveal
              delay={i * 0.05}
              className={`pl-8 md:w-1/2 md:pl-0 ${
                left
                  ? "md:pr-10 md:text-right"
                  : "md:ml-auto md:pl-10"
              }`}
            >
              <p className="font-mono text-sm text-accent">{entry.year}</p>
              <h3 className="mt-1 font-mono text-base font-semibold text-foreground">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {entry.description}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
