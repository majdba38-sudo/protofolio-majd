import { motion } from 'framer-motion';
import { useLanguage } from '../lib/language';
import { creator } from '../content/creator';
import { ui } from '../content/ui';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="aurora relative overflow-hidden px-5 py-28 md:px-10">
      <div data-parallax="-70" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere-soft absolute -start-16 top-24 h-72 w-72 opacity-80" />
        <span className="sphere absolute end-[8%] top-[60%] h-20 w-20 animate-float" />
      </div>

      <div className="mx-auto max-w-4xl">
        <div data-reveal>
          <p className="capsule inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-electric">
            <span className="h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_10px_#39BFEA]" aria-hidden />
            {t(ui.about.eyebrow)}
          </p>
          <h2 className="text-gradient mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t(creator.name)}
          </h2>
          <p className="mt-3 text-lg font-semibold text-electric md:text-xl">{t(creator.title)}</p>
        </div>

        <div data-reveal className="mt-8 space-y-5">
          {creator.intro.map((paragraph, i) => (
            <p
              key={i}
              className={`leading-relaxed ${i === 0 ? 'text-xl font-semibold text-ink md:text-2xl' : 'text-base text-ink/75 md:text-lg'}`}
            >
              {t(paragraph)}
            </p>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky">{t(ui.about.strengthsLabel)}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {creator.strengths.map((s, i) => (
              <motion.li
                key={s.en}
                whileHover={{ y: -4 }}
                className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-ink"
              >
                <span className="sphere grid h-9 w-9 shrink-0 place-items-center text-[11px] font-extrabold text-electric">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(s)}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
