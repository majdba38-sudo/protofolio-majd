import { motion } from 'framer-motion';
import { useLanguage } from '../lib/language';
import { useTilt } from '../lib/useTilt';
import { creator } from '../content/creator';
import { ui } from '../content/ui';
import { Crystal, IdeaCapsule } from './Scene';
import { MediaSlot } from './MediaSlot';

export function About() {
  const { t } = useLanguage();
  const tilt = useTilt(7);
  const initials = t(creator.name)
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <section id="about" className="aurora relative overflow-hidden px-5 py-28 md:px-10">
      <div data-parallax="-70" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere-soft absolute -start-16 top-24 h-72 w-72 opacity-80" />
        <span className="sphere absolute end-[8%] top-[60%] h-20 w-20 animate-float" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal className="relative mx-auto w-full max-w-md">
          <motion.article
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            style={{ ...tilt.style, transformPerspective: 1100 }}
            className="glass iridescent-border sheen relative p-6 md:p-8"
          >
            <MediaSlot
              mediaKey="creator/portrait"
              title={{ en: 'Portrait', ar: 'صورة شخصية' }}
              ratio="square"
              fit="cover"
              monogram={initials}
              placeholderText={ui.about.placeholderNote}
            />
            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky">{t(ui.about.profileTag)}</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{t(creator.name)}</h3>
              <p className="mt-1 text-base font-semibold text-electric">{t(creator.title)}</p>
            </div>
          </motion.article>

          <div data-parallax="-40" className="pointer-events-none absolute -end-6 -top-8 hidden sm:block" aria-hidden>
            <Crystal hue="lilac" className="h-36 w-28 animate-float" />
          </div>
          <div className="pointer-events-none absolute -start-5 -top-6 hidden sm:block" aria-hidden>
            <IdeaCapsule label={t(ui.entrance.capsules[1])} className="animate-float [animation-delay:-2s]" />
          </div>
        </div>

        <div>
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
      </div>
    </section>
  );
}
