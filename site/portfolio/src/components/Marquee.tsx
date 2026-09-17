import { marquee } from "@/lib/data";

export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="relative border-y border-line bg-ink-2/50 py-5">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-10">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-dim">
                {item}
              </span>
              <span className="h-1 w-1 rotate-45 bg-accent/40" />
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" aria-hidden>
          {row.map((item, i) => (
            <span key={`b-${item}-${i}`} className="flex shrink-0 items-center gap-10">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-dim">
                {item}
              </span>
              <span className="h-1 w-1 rotate-45 bg-accent/40" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
