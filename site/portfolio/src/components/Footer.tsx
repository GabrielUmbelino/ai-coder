import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center border border-line font-mono text-[0.65rem] text-dim">
            GU
          </span>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim">
            {profile.fullName}
          </p>
        </div>

        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim">
          Designed &amp; built in Curitiba · {new Date().getFullYear()}
        </p>

        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim transition-colors duration-500 hover:text-text"
        >
          Back to top
          <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
