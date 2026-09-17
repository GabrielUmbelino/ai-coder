import { certifications, education, profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const glance = [
  { k: "Based in", v: "Curitiba, Brazil" },
  { k: "Working with", v: "Toronto, Canada" },
  { k: "Languages", v: "Portuguese · English" },
  { k: "Since", v: "2012" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Engineering with{" "}
              <span className="serif-accent text-accent">intent</span>,
              <br className="hidden sm:block" /> not just output.
            </>
          }
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
          {/* at a glance */}
          <Reveal delay={120} className="md:col-span-4">
            <dl className="border-t border-line">
              {glance.map((g) => (
                <div
                  key={g.k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <dt className="eyebrow">{g.k}</dt>
                  <dd className="text-right text-[0.875rem] text-muted">{g.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-dim">
              Available for senior &amp; lead roles
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-6">
              {profile.intro.map((para, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className="text-[1.0625rem] leading-[1.75] text-muted">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <blockquote className="mt-10 border-l border-accent/50 pl-6">
                <p className="serif-accent text-2xl leading-snug text-text md:text-[1.75rem]">
                  &ldquo;{profile.tagline}&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 border-l border-t border-line md:mt-24 md:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className="group relative border-b border-r border-line px-6 py-10 transition-colors duration-500 hover:bg-ink-2 md:px-8 md:py-12"
            >
              <div className="display text-[clamp(2.5rem,5.5vw,3.75rem)] text-text transition-colors duration-500 group-hover:text-accent">
                {stat.value}
              </div>
              <div className="eyebrow mt-3">{stat.label}</div>
            </Reveal>
          ))}
        </div>

        {/* Education + certifications */}
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <h3 className="eyebrow">Education</h3>
            </Reveal>
            <ul className="mt-6">
              {education.map((ed, i) => (
                <Reveal key={ed.school} delay={i * 90}>
                  <li className="group flex items-baseline justify-between gap-6 border-t border-line py-5">
                    <div>
                      <p className="text-[0.9375rem] text-text">{ed.degree}</p>
                      <p className="mt-1 text-sm text-dim">{ed.school}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[0.6875rem] text-dim transition-colors duration-500 group-hover:text-accent">
                      {ed.period}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <h3 className="eyebrow">Certifications</h3>
            </Reveal>
            <ul className="mt-6">
              {certifications.map((cert, i) => (
                <Reveal key={cert} delay={i * 60}>
                  <li className="group flex items-center gap-4 border-t border-line py-4">
                    <span className="h-1 w-1 shrink-0 rotate-45 bg-dim transition-colors duration-500 group-hover:bg-accent" />
                    <span className="text-[0.9375rem] text-muted transition-colors duration-500 group-hover:text-text">
                      {cert}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
