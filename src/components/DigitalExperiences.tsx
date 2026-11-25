import { motion } from 'framer-motion';
import { useLanguage } from '../lib/language';
import { digitalProjects } from '../content/digital';
import type { DigitalProject } from '../content/types';
import { ui } from '../content/ui';
import { SectionHeader } from './SectionHeader';
import { MediaSlot } from './MediaSlot';
import { StatusBadge, VisitButton } from './VisitButton';

export function DigitalExperiences() {
  const { t } = useLanguage();

  return (
    <section id="digital" className="relative overflow-hidden bg-[linear-gradient(180deg,#F1F8FF_0%,#DDF0FF_100%)] px-5 py-28 md:px-10">
      <div data-parallax="-50" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere absolute -end-10 top-20 h-72 w-72 opacity-70" />
        <span className="sphere-soft absolute -start-16 bottom-16 h-64 w-64 opacity-80" />
      </div>

      <div className="relative">
        <SectionHeader eyebrow={t(ui.digital.eyebrow)} title={t(ui.digital.title)} subtitle={t(ui.digital.subtitle)} />

        <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-10">
          {digitalProjects.map((project, i) => (
            <DigitalCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DigitalCard({ project, index }: { project: DigitalProject; index: number }) {
  const { t, lang } = useLanguage();
  const secondary = lang === 'ar' ? project.name.en : project.name.ar;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.05 }}
      className="glass iridescent-border grid gap-8 p-5 md:grid-cols-[1.15fr_0.85fr] md:p-8 lg:gap-10"
    >
      <MediaSlot
        mediaKey={`digital/${project.id}/preview`}
        fallback={project.preview}
        title={{ en: 'Website preview', ar: 'معاينة الموقع' }}
        ratio="landscape"
        fit="cover"
        placeholderText={ui.digital.previewPlaceholder}
      />

      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">{t(project.category)}</span>
        </div>

        <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{t(project.name)}</h3>
        <p dir={lang === 'ar' ? 'ltr' : 'rtl'} className="mt-1 text-lg font-semibold text-electric/80">
          {secondary}
        </p>

        <p className="mt-5 leading-relaxed text-ink/75">{t(project.description)}</p>

        <div className="mt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky">{t(ui.digital.conceptLabel)}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <li key={h.en} className="glass-btn rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink/80">
                {t(h)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-8">
          {project.status === 'coming-soon' && <p className="mb-4 text-sm italic text-ink/55">{t(ui.digital.noUrlYet)}</p>}
          <VisitButton project={project} className="w-full sm:w-auto" />
        </div>
      </div>
    </motion.article>
  );
}
