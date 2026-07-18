import Reveal from "./Reveal";
import SocialLinks from "./SocialLinks";
import TerminalWindow from "./TerminalWindow";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const timeline = [
  { year: "2025", text: "Building full-stack products & Linux infrastructure" },
  { year: "2023", text: "Went deep into backend engineering & DevOps" },
  { year: "2021", text: "Started the journey — first line of code" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6">
      <Reveal>
        <TerminalWindow title="walman@portfolio:~$ cat about.md">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
            <div className="mx-auto md:mx-0">
              {/* Dua foto ditumpuk: dark mode → profile-dark, light mode → profile (cross-fade via CSS) */}
              <div className="relative h-48 w-48 sm:h-56 sm:w-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}/profile-dark.jpeg`}
                  alt="Portrait of Walman Ss"
                  width={1086}
                  height={1448}
                  className="profile-photo-dark absolute inset-0 h-full w-full rounded-2xl border border-border object-cover object-top"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE_PATH}/profile.jpeg`}
                  alt=""
                  aria-hidden="true"
                  width={1086}
                  height={1448}
                  className="profile-photo-light absolute inset-0 h-full w-full rounded-2xl border border-border object-cover object-top"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="font-mono text-2xl font-bold text-foreground">
                <span className="rainbow-ink"># </span>About Me
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                I&apos;m Walman, a full stack developer who lives in the
                terminal. I care about clean architecture, readable code and
                interfaces that feel effortless. My daily drivers are Linux,
                Neovim and a tiling window manager — and that mindset of
                minimalism and control carries into everything I build.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                From designing APIs and databases to deploying on
                Linux-powered servers, I enjoy owning the whole stack
                end-to-end.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {timeline.map((t) => (
                  <li
                    key={t.year}
                    className="flex items-baseline justify-center gap-4 font-mono text-sm md:justify-start"
                  >
                    <span className="shrink-0 text-accent">{t.year}</span>
                    <span className="text-muted">{t.text}</span>
                  </li>
                ))}
              </ul>

              <SocialLinks className="mt-8 justify-center md:justify-start" />
            </div>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
