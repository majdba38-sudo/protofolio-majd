import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { useLanguage } from '../lib/language';
import { findProject } from '../content';
import type { DigitalProject, ExperimentProject } from '../content/types';
import { ui } from '../content/ui';
import { MediaSlot } from './MediaSlot';
import { StatusBadge, VisitButton } from './VisitButton';

interface ProjectModalProps {
  id: string | null;
  onClose: () => void;
}

export function ProjectModal({ id, onClose }: ProjectModalProps) {
  const found = id ? findProject(id) : null;
  const isOpen = found !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {found && (
        <motion.div
          key={found.project.id}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] overflow-y-auto bg-electric/35 p-3 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-auto max-w-6xl rounded-[2rem] border border-white bg-white/92 p-5 shadow-[0_40px_120px_-30px_rgba(9,40,120,0.6)] backdrop-blur-2xl md:p-10"
          >
            {found.type === 'experiment' ? (
              <ExperimentDetails project={found.project} onClose={onClose} />
            ) : (
              <DigitalDetails project={found.project} onClose={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalHeader({ number, name, category, onClose }: { number?: string; name: { en: string; ar: string }; category: { en: string; ar: string }; onClose: () => void }) {
  const { t, lang } = useLanguage();
  const secondary = lang === 'ar' ? name.en : name.ar;
  return (
    <header className="flex items-start justify-between gap-4 border-b border-electric/10 pb-6">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-sky">
          {number && <span className="rounded-full bg-electric px-2.5 py-1 text-white">{number}</span>}
          <span>{t(ui.modal.category)}: </span>
          <span className="text-electric">{t(category)}</span>
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">{t(name)}</h2>
        <p dir={lang === 'ar' ? 'ltr' : 'rtl'} className="mt-1 text-lg font-semibold text-electric/80">
          {secondary}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={t(ui.modal.close)}
        className="glass-btn grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg text-electric transition hover:scale-105"
      >
        ✕
      </button>
    </header>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-cloud/80 p-5 ring-1 ring-white">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky">{title}</h3>
      <div className="mt-2 leading-relaxed text-ink/85">{children}</div>
    </div>
  );
}

function ExperimentDetails({ project, onClose }: { project: ExperimentProject; onClose: () => void }) {
  const { t } = useLanguage();
  const isPoster = project.kind === 'posters';

  return (
    <>
      <ModalHeader number={project.number} name={project.name} category={project.category} onClose={onClose} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-label={t(ui.modal.originalDesign)}>
          <MediaSlot
            mediaKey={`experiments/${project.id}/original`}
            fallback={project.image}
            title={ui.modal.originalDesign}
            ratio={isPoster ? 'poster' : 'square'}
            fit="contain"
          />
          {isPoster && <p className="mt-3 text-xs leading-relaxed text-ink/60">{t(ui.modal.posterNote)}</p>}
        </section>

        <div className="space-y-5">
          <Block title={t(ui.modal.concept)}>
            <p>{t(project.description)}</p>
          </Block>
          <Block title={t(ui.modal.creativeDirection)}>
            <p>{t(project.creativeDirection)}</p>
          </Block>
          <Block title={t(ui.modal.designDetails)}>
            <ul className="space-y-2.5">
              {project.designDetails.map((detail) => (
                <li key={detail.en} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky shadow-[0_0_8px_#39BFEA]" aria-hidden />
                  <span>{t(detail)}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      <section className="mt-12" aria-labelledby={`mockups-${project.id}`}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 id={`mockups-${project.id}`} className="text-2xl font-extrabold text-ink">
            {t(ui.modal.mockups)}
          </h3>
          <p className="max-w-xl text-xs leading-relaxed text-ink/60">{t(ui.modal.mockupNote)}</p>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {project.mockupScenes.map((scene) => (
            <MediaSlot
              key={scene.id}
              mediaKey={`experiments/${project.id}/mockup/${scene.id}`}
              title={scene.title}
              ratio="mockup"
              placeholderText={{ en: 'Mockup placeholder. Upload a mockup image.', ar: 'مكان مؤقت للمحاكاة. ارفع صورة المحاكاة.' }}
            />
          ))}
        </div>
      </section>

      <section className="mt-12" aria-label={t(ui.modal.additional)}>
        <h3 className="text-2xl font-extrabold text-ink">{t(ui.modal.additional)}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {[1, 2].map((n) => (
            <MediaSlot
              key={n}
              mediaKey={`experiments/${project.id}/extra-${n}`}
              title={{ en: `Additional image ${n}`, ar: `صورة إضافية ${n}` }}
              ratio="mockup"
            />
          ))}
        </div>
      </section>
    </>
  );
}

function DigitalDetails({ project, onClose }: { project: DigitalProject; onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <>
      <ModalHeader name={project.name} category={project.category} onClose={onClose} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <MediaSlot
          mediaKey={`digital/${project.id}/preview`}
          fallback={project.preview}
          title={{ en: 'Website preview', ar: 'معاينة الموقع' }}
          ratio="landscape"
          fit="cover"
          placeholderText={ui.digital.previewPlaceholder}
        />

        <div className="space-y-5">
          <Block title={t(ui.modal.status)}>
            <StatusBadge status={project.status} />
          </Block>
          <Block title={t(ui.modal.concept)}>
            <p>{t(project.description)}</p>
          </Block>
          <Block title={t(ui.digital.conceptLabel)}>
            <ul className="space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h.en} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_8px_#91E8D6]" aria-hidden />
                  <span>{t(h)}</span>
                </li>
              ))}
            </ul>
          </Block>
          <VisitButton project={project} className="w-full" />
        </div>
      </div>
    </>
  );
}
