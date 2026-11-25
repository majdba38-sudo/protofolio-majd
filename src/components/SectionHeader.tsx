export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div data-reveal className="mx-auto max-w-3xl text-center">
      <p className="capsule inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-electric">
        <span className="h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_10px_#39BFEA]" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="text-gradient mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">{subtitle}</p>}
    </div>
  );
}
