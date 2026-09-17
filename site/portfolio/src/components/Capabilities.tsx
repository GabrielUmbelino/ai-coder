import { skillGroups } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title={
            <>
              The stack behind
              <br className="hidden sm:block" /> the{" "}
              <span className="serif-accent text-accent">work</span>.
            </>
          }
          lede="Deep in the front end, fluent across the back. Chosen for the problem, not the résumé."
        />

        <div className="mt-14 grid border-l border-t border-line md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 90}
              className="group relative border-b border-r border-line p-8 transition-colors duration-500 hover:bg-ink-2 md:p-10"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium tracking-tight text-text">
                  {group.title}
                </h3>
                <span className="font-mono text-[0.6875rem] text-dim transition-colors duration-500 group-hover:text-accent">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-6 h-px w-full bg-line">
                <div className="h-px w-0 bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </div>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[0.9375rem] text-muted transition-colors duration-500 group-hover:text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {[
            {
              t: "Systems, not screens",
              d: "Component libraries and design tokens that keep a dozen surfaces speaking one language.",
            },
            {
              t: "Data made legible",
              d: "Interfaces for analytics and research where clarity is the product, not decoration.",
            },
            {
              t: "Teams that ship",
              d: "Tech-lead experience across distributed teams in South America and Europe.",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 90} className="card ticked p-8">
              <h4 className="text-[1.0625rem] font-medium tracking-tight text-text">
                {item.t}
              </h4>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {item.d}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
