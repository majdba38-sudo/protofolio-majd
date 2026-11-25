import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useLanguage } from '../lib/language';
import { useMedia } from '../lib/media';
import { galleryItems, type GalleryFilter, type GalleryItem } from '../content';
import { ui } from '../content/ui';
import { SectionHeader } from './SectionHeader';
import { Crystal } from './Scene';

export function Experiments({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<GalleryFilter>('all');

  const filters: { id: GalleryFilter; label: string }[] = useMemo(
    () => [
      { id: 'all', label: t(ui.experiments.filterAll) },
      { id: 'branding', label: t(ui.experiments.filterBranding) },
      { id: 'posters', label: t(ui.experiments.filterPosters) },
      { id: 'digital', label: t(ui.experiments.filterDigital) },
    ],
    [t],
  );

  const items = useMemo(() => galleryItems.filter((item) => filter === 'all' || item.filter === filter), [filter]);

  return (
    <section id="experiments" className="relative overflow-hidden bg-[linear-gradient(180deg,#F1F8FF_0%,#E4F3FF_100%)] px-5 py-28 md:px-10">
      <div data-parallax="-60" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere absolute -end-10 top-16 h-64 w-64 opacity-60" />
        <Crystal hue="sky" className="absolute start-[3%] top-[45%] hidden h-48 w-36 animate-float opacity-80 lg:block" />
      </div>

      <div className="relative">
        <SectionHeader eyebrow={t(ui.experiments.eyebrow)} title={t(ui.experiments.title)} subtitle={t(ui.experiments.subtitle)} />

        <div data-reveal className="mt-12 flex flex-wrap justify-center gap-2" role="group" aria-label={t(ui.experiments.eyebrow)}>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`relative rounded-full px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] transition ${
                  active ? 'text-white' : 'glass rounded-full text-ink/75 hover:text-electric'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric via-[#2a7fd6] to-sky shadow-[0_14px_30px_-12px_rgba(22,71,184,0.7)]"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                )}
                {f.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mx-auto mt-14 grid max-w-7xl gap-7 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <ProjectCard key={item.id} item={item} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ item, onOpen }: { item: GalleryItem; onOpen: (id: string) => void }) {
  const { t, lang } = useLanguage();
  const image = useMedia(item.mediaKey, item.image);
  const secondary = lang === 'ar' ? item.name.en : item.name.ar;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -8 }}
      className="glass iridescent-border sheen group flex flex-col p-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-white via-cloud to-ice/50">
        {image ? (
          <img
            src={image}
            alt={t(item.name)}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-5 transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="dashed-placeholder grid h-full place-items-center p-6 text-center text-sm font-medium text-ink/65">
            {t(ui.media.placeholder)}
          </div>
        )}
        {item.number && (
          <span className="glass-btn absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold text-electric">{item.number}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky">{t(item.category)}</p>
        <div>
          <h3 className="text-xl font-extrabold leading-snug text-ink">{t(item.name)}</h3>
          <p dir={lang === 'ar' ? 'ltr' : 'rtl'} className="mt-0.5 text-base font-semibold text-electric/80">
            {secondary}
          </p>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink/70">{t(item.description)}</p>

        {item.creativeDirection && (
          <div className="rounded-2xl bg-mint/25 px-4 py-3 text-sm leading-relaxed text-ink/85">
            <span className="font-bold text-electric">{t(ui.experiments.creativeDirection)}: </span>
            {t(item.creativeDirection)}
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="btn-primary mt-auto rounded-full px-5 py-3 text-sm font-bold tracking-wide"
          aria-label={`${t(ui.experiments.viewProject)}: ${t(item.name)}`}
        >
          {t(ui.experiments.viewProject)} →
        </button>
      </div>
    </motion.article>
  );
}
