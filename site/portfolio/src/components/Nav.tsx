"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-line bg-ink/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="relative grid h-8 w-8 place-items-center border border-line transition-colors duration-500 group-hover:border-accent">
              <span className="font-mono text-[0.7rem] font-medium tracking-tight text-text transition-colors duration-500 group-hover:text-accent">
                GU
              </span>
            </span>
            <span className="hidden text-[0.8125rem] font-medium tracking-tight text-text sm:block">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-400 ${
                  active === item.id ? "text-text" : "text-dim hover:text-muted"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 bottom-1 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn hidden text-text sm:inline-flex"
            >
              <span>Get in touch</span>
              <span className="font-mono text-[0.75rem]">↗</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center border border-line text-text transition-colors duration-400 hover:border-accent md:hidden"
            >
              <span className="relative block h-[9px] w-4">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className="h-px origin-left bg-accent transition-transform duration-150 ease-linear"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="grid-field absolute inset-0 opacity-60" aria-hidden />
        <nav className="shell relative flex h-full flex-col justify-center gap-2 pb-16">
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-5 border-b border-line py-5"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${open ? 90 + i * 60 : 0}ms`,
              }}
            >
              <span className="font-mono text-[0.6875rem] text-dim">
                0{i + 1}
              </span>
              <span className="display text-4xl text-text transition-colors duration-400 group-hover:text-accent">
                {item.label}
              </span>
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 font-mono text-[0.75rem] text-muted"
          >
            {profile.email}
          </a>
        </nav>
      </div>
    </>
  );
}
