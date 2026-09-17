"use client";

import { useEffect, useRef, useState } from "react";
import { jobs } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const el = railRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.45;
      const ratio = (anchor - rect.top) / rect.height;
      setFill(Math.max(0, Math.min(1, ratio)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-42% 0px -50% 0px" }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="journey" className="relative scroll-mt-24 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 45% at 15% 30%, rgba(215,255,62,0.035), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="shell relative">
        <SectionHeading
          index="02"
          eyebrow="Career journey"
          title={
            <>
              Thirteen years,
              <br className="hidden sm:block" /> one{" "}
              <span className="serif-accent text-accent">throughline</span>.
            </>
          }
          lede="From WordPress themes in Curitiba to enterprise SaaS shipped across three continents — every role added a layer: craft, then systems, then leadership."
        />

        <div ref={railRef} className="relative mt-14 md:mt-20">
          {/* rail */}
          <div
            className="absolute left-0 top-2 hidden w-px bg-line md:block"
            style={{ height: "calc(100% - 1rem)" }}
            aria-hidden
          >
            <div
              className="w-px origin-top bg-gradient-to-b from-accent to-accent/20 transition-[height] duration-200 ease-out"
              style={{ height: `${fill * 100}%` }}
            />
          </div>

          <ol className="space-y-px md:pl-0">
            {jobs.map((job, i) => {
              const isActive = i === activeIdx;
              return (
                <li
                  key={`${job.company}-${job.role}`}
                  data-idx={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="group relative border-t border-line"
                >
                  {/* node */}
                  <span
                    className={`absolute -left-[3.5px] top-9 hidden h-[7px] w-[7px] rotate-45 transition-all duration-500 md:block ${
                      isActive
                        ? "scale-125 bg-accent"
                        : "bg-line group-hover:bg-dim"
                    }`}
                    aria-hidden
                  />

                  <Reveal delay={Math.min(i, 4) * 50}>
                    <article className="grid gap-5 py-8 transition-opacity duration-700 md:grid-cols-12 md:gap-8 md:py-10 md:pl-10">
                      {/* meta */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-3">
                          <p
                            className={`font-mono text-[0.75rem] transition-colors duration-500 ${
                              isActive ? "text-accent" : "text-dim"
                            }`}
                          >
                            {job.period}
                          </p>
                          {job.current ? (
                            <span className="animate-live h-1.5 w-1.5 rounded-full bg-accent" />
                          ) : null}
                        </div>
                        <p className="mt-2 text-[0.8125rem] text-dim">{job.location}</p>
                      </div>

                      {/* body */}
                      <div className="md:col-span-9">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3 className="text-[1.5rem] font-medium tracking-tight text-text transition-colors duration-500 group-hover:text-accent md:text-[1.75rem]">
                            {job.company}
                          </h3>
                          <span className="h-3 w-px bg-line" />
                          <p className="text-[0.9375rem] text-muted">{job.role}</p>
                        </div>

                        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                          {job.summary}
                        </p>

                        <ul className="mt-5 max-w-2xl space-y-2.5">
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-[0.875rem] leading-relaxed text-dim">
                              <span className="mt-2 h-px w-3 shrink-0 bg-line" />
                              <span className="transition-colors duration-500 group-hover:text-muted">
                                {h}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {job.stack.map((s) => (
                            <span
                              key={s}
                              className="border border-line px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-dim transition-colors duration-500 group-hover:border-line group-hover:text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <div className="border-t border-line" />

          <Reveal className="mt-10 flex items-center gap-4 md:pl-10">
            <span className="font-mono text-[0.75rem] text-dim">2012</span>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[0.75rem] text-accent">Today</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
