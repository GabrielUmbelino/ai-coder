"use client";

import { TWIN_OPEN_EVENT } from "./DigitalTwin";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const PROMPTS = [
  "What are you working on at Upsiide?",
  "Tell me about your leadership experience",
  "Which frameworks have you shipped to production?",
];

function openTwin() {
  window.dispatchEvent(new CustomEvent(TWIN_OPEN_EVENT));
}

export default function TwinSection() {
  return (
    <section id="twin" className="relative scroll-mt-24 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 80% 40%, rgba(215,255,62,0.045), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        <SectionHeading
          index="05"
          eyebrow="Digital twin"
          title={
            <>
              Interview me,
              <br className="hidden sm:block" />{" "}
              <span className="serif-accent text-accent">right now</span>.
            </>
          }
          lede="An AI trained on my thirteen years of work — every role, every stack, every project. Ask it anything you'd ask me in a first call, and get a straight answer at 2am."
        />

        <div className="mt-14 grid gap-px border-l border-t border-line md:mt-20 md:grid-cols-5">
          {/* prompt list */}
          <div className="border-b border-r border-line p-8 md:col-span-3 md:p-10">
            <p className="eyebrow">Start with</p>
            <ul className="mt-6 space-y-px">
              {PROMPTS.map((prompt, i) => (
                <Reveal key={prompt} delay={i * 80}>
                  <li>
                    <button
                      onClick={openTwin}
                      className="group flex w-full items-center justify-between gap-6 border-t border-line py-5 text-left"
                    >
                      <span className="text-[1.0625rem] text-muted transition-colors duration-500 group-hover:text-text">
                        &ldquo;{prompt}&rdquo;
                      </span>
                      <span className="h-px w-8 shrink-0 bg-line transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14 group-hover:bg-accent" />
                    </button>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={240}>
              <button onClick={openTwin} className="btn btn-solid mt-10">
                <span>Open the digital twin</span>
                <span className="font-mono text-[0.75rem]">↗</span>
              </button>
            </Reveal>
          </div>

          {/* spec panel */}
          <Reveal
            delay={160}
            className="border-b border-r border-line p-8 md:col-span-2 md:p-10"
          >
            <p className="eyebrow">How it works</p>
            <dl className="mt-6 space-y-5">
              {[
                {
                  k: "Knowledge",
                  v: "Grounded strictly in my résumé — it won't invent a job I never had.",
                },
                {
                  k: "Delivery",
                  v: "Runs server-side and streams back word by word — no keys in the browser.",
                },
                {
                  k: "Honesty",
                  v: "Asked something it can't answer, it says so and hands you my email.",
                },
              ].map((item) => (
                <div key={item.k} className="border-t border-line pt-4">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
                    {item.k}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-dim">
              Press <span className="text-muted">/</span> anywhere to open it
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
