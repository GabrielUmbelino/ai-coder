"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

const WORDS = ["Gabriel", "Umbelino"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const rise = (i: number) => ({
    transform: mounted ? "none" : "translateY(0.16em)",
    clipPath: mounted ? "inset(-25% -10% -10% -5%)" : "inset(100% -10% -10% -5%)",
    transition: `clip-path 1.15s cubic-bezier(.16,1,.3,1) ${140 + i * 130}ms, transform 1.15s cubic-bezier(.16,1,.3,1) ${140 + i * 130}ms`,
  });

  const fade = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "none" : "translateY(14px)",
    transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  });

  return (
    <section id="top" className="relative min-h-svh overflow-hidden pt-[4.5rem]">
      {/* backdrop stack */}
      <div className="grid-field pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(215,255,62,0.055), transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="animate-drift pointer-events-none absolute -left-[18%] top-[8%] h-[46rem] w-[46rem] rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(215,255,62,0.10), rgba(215,255,62,0) 62%)",
        }}
        aria-hidden
      />
      <div
        className="animate-drift pointer-events-none absolute -right-[12%] bottom-[2%] h-[38rem] w-[38rem] rounded-full opacity-60 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,120,255,0.12), rgba(90,120,255,0) 62%)",
          animationDelay: "-6s",
        }}
        aria-hidden
      />
      <div
        ref={spotRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700 max-md:hidden"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(215,255,62,0.055), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="noise pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
        style={{ background: "linear-gradient(180deg, transparent, #08090b)" }}
        aria-hidden
      />

      {/* vertical edge marker */}
      <div
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block"
        style={fade(1000)}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-5">
          <span className="h-16 w-px bg-gradient-to-b from-transparent to-line" />
          <span
            className="font-mono text-[0.625rem] uppercase tracking-[0.32em] text-dim"
            style={{ writingMode: "vertical-rl" }}
          >
            Portfolio &mdash; {new Date().getFullYear()}
          </span>
          <span className="h-16 w-px bg-gradient-to-b from-line to-transparent" />
        </div>
      </div>

      <div className="shell relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between pb-10 pt-16 md:pt-24">
        <div>
          {/* status line */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            style={fade(60)}
          >
            <span className="flex items-center gap-2.5">
              <span className="animate-live h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="eyebrow text-muted">Open to select work</span>
            </span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="eyebrow">{profile.location}</span>
          </div>

          {/* name */}
          <h1 className="mt-10 md:mt-14">
            <span className="sr-only">
              {profile.fullName} — {profile.role}
            </span>
            {WORDS.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span
                  aria-hidden
                  className="display block text-[clamp(3.4rem,13.5vw,11.5rem)] text-text"
                  style={rise(i)}
                >
                  {word}
                  {i === 1 ? (
                    <span className="serif-accent ml-3 text-accent md:ml-6">.</span>
                  ) : null}
                </span>
              </span>
            ))}
          </h1>

          {/* lede */}
          <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12">
            <p
              className="max-w-xl text-[1.0625rem] leading-relaxed text-muted md:col-span-6 md:text-[1.1875rem]"
              style={fade(620)}
            >
              Senior Software Engineer with 13+ years building the front end of{" "}
              <span className="serif-accent text-text">enterprise</span> software.
              Today at Upsiide, turning market-research data into interfaces global
              brands make decisions with.
            </p>

            <div
              className="flex flex-col justify-end gap-6 md:col-span-6 md:items-end"
              style={fade(760)}
            >
              <dl className="grid w-full max-w-sm grid-cols-2 gap-x-6 gap-y-4 md:justify-items-end">
                <div className="border-t border-line pt-3">
                  <dt className="eyebrow">Currently</dt>
                  <dd className="mt-1.5 text-sm text-text">{profile.company}</dd>
                </div>
                <div className="border-t border-line pt-3">
                  <dt className="eyebrow">Focus</dt>
                  <dd className="mt-1.5 text-sm text-text">React · Node · Systems</dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-3">
                <a href="#journey" className="btn btn-solid">
                  <span>View career journey</span>
                </a>
                <a href="#work" className="btn text-text">
                  <span>Portfolio</span>
                  <span className="font-mono text-[0.75rem]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* footer rail */}
        <div
          className="mt-16 flex items-end justify-between border-t border-line pt-6"
          style={fade(900)}
        >
          <a
            href="#about"
            className="group flex items-center gap-3 text-dim transition-colors duration-500 hover:text-text"
          >
            <span className="eyebrow transition-colors duration-500 group-hover:text-muted">
              Scroll
            </span>
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-3 bg-accent transition-transform duration-700 group-hover:translate-y-5" />
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
