import { profile } from "@/lib/data";
import Reveal from "./Reveal";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "/in/gfumbelino", href: profile.linkedin },
  { label: "GitHub", value: "/GabrielUmbelino", href: profile.github },
  { label: "Résumé", value: "Download PDF", href: profile.cv },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 100%, rgba(215,255,62,0.07), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[0.6875rem] text-accent">06</span>
          <span className="h-px w-8 bg-line" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="display mt-10 text-[clamp(2.75rem,9vw,7.5rem)] text-text">
            Let&rsquo;s build
            <br />
            something{" "}
            <span className="serif-accent text-accent">good</span>.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            Open to senior and lead engineering roles, consulting, and the occasional
            hard front-end problem. Fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-solid mt-10 text-[0.875rem]"
          >
            <span>{profile.email}</span>
            <span className="font-mono">↗</span>
          </a>
        </Reveal>

        <div className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 70} className="border-b border-r border-line">
              <a
                href={c.href}
                target={c.href.startsWith("http") || c.href.endsWith(".pdf") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors duration-500 hover:bg-ink-2"
              >
                <span className="eyebrow transition-colors duration-500 group-hover:text-accent">
                  {c.label}
                </span>
                <span className="flex items-end justify-between gap-4">
                  <span className="break-all text-[0.9375rem] text-muted transition-colors duration-500 group-hover:text-text">
                    {c.value}
                  </span>
                  <span className="font-mono text-[0.75rem] text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
