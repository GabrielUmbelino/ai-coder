import { profile, projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Portfolio"
          title={
            <>
              Selected work,
              <br className="hidden sm:block" />{" "}
              <span className="serif-accent text-accent">in progress</span>.
            </>
          }
          lede="Case studies are being written up. Here's the shape of what's coming — and where to reach me in the meantime."
        />

        <div className="mt-14 grid border-l border-t border-line md:mt-20 md:grid-cols-2">
          {projects.map((p, i) => {
            const soon = p.tags.includes("Coming soon");
            return (
              <Reveal
                key={p.title}
                delay={i * 80}
                className="group relative overflow-hidden border-b border-r border-line p-8 transition-colors duration-500 hover:bg-ink-2 md:p-12"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(70% 60% at 80% 0%, rgba(215,255,62,0.06), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow">{p.kind}</span>
                    <span className="font-mono text-[0.6875rem] text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="display mt-8 text-[clamp(1.75rem,3.4vw,2.75rem)] text-text transition-colors duration-500 group-hover:text-accent">
                    {p.title}
                  </h3>

                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                    {p.blurb}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className={`border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] ${
                          soon
                            ? "border-accent/30 text-accent/80"
                            : "border-line text-dim"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center gap-3 text-dim">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
                      {soon ? "Shipping soon" : "Case study soon"}
                    </span>
                    <span className="h-px w-8 bg-line transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14 group-hover:bg-accent" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="flex flex-col gap-6 border-b border-l border-r border-line p-8 sm:flex-row sm:items-center sm:justify-between md:px-12 md:py-10">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
              Case studies are on the way. Until then, the code and the commit
              history tell the story.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn text-text"
              >
                <span>GitHub</span>
                <span className="font-mono text-[0.75rem]">↗</span>
              </a>
              <a href={profile.cv} target="_blank" rel="noreferrer" className="btn text-text">
                <span>Résumé (PDF)</span>
                <span className="font-mono text-[0.75rem]">↓</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
