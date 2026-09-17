import Reveal from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
};

export default function SectionHeading({ index, eyebrow, title, lede }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[0.6875rem] text-accent">{index}</span>
          <span className="h-px w-8 bg-line" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      </div>
      <div className="md:col-span-8">
        <Reveal delay={80}>
          <h2 className="display text-[clamp(2.25rem,5.2vw,4.25rem)] text-text">{title}</h2>
        </Reveal>
        {lede ? (
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">{lede}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
