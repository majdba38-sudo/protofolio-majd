import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../lib/language';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { processSteps } from '../content/process';
import { ui } from '../content/ui';
import { SectionHeader } from './SectionHeader';

export function Process() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const step = processSteps[activeIndex];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-line]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: rail, start: 'top 78%', once: true },
        },
      );
      gsap.fromTo(
        '[data-node]',
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.6)',
          stagger: 0.16,
          scrollTrigger: { trigger: rail, start: 'top 78%', once: true },
        },
      );
    }, rail);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative overflow-hidden bg-[linear-gradient(180deg,#E4F3FF_0%,#F1F8FF_100%)] px-5 py-28 md:px-10">
      <div data-parallax="-50" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere-soft absolute -start-20 bottom-10 h-80 w-80 opacity-70" />
      </div>

      <div className="relative">
        <SectionHeader eyebrow={t(ui.process.eyebrow)} title={t(ui.process.title)} subtitle={t(ui.process.subtitle)} />
        <p data-reveal className="mt-6 text-center text-sm text-ink/55">
          {t(ui.process.hint)}
        </p>

        <div ref={railRef} className="relative mx-auto mt-14 max-w-6xl">
          <div className="overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative mx-auto grid min-w-[700px] grid-cols-5 px-8 pt-2">
              <div
                data-line
                className="journey-line absolute top-[38px] h-[3px] origin-left rounded-full"
                style={{ insetInlineStart: '10%', insetInlineEnd: '10%' }}
                aria-hidden
              />
              {processSteps.map((s, i) => {
                const active = i === activeIndex;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center text-center">
                    <button
                      type="button"
                      data-node
                      aria-pressed={active}
                      aria-label={`${t(ui.process.stepLabel)} ${s.number}: ${t(s.title)}`}
                      onClick={() => setActiveIndex(i)}
                      className="group relative grid h-[76px] w-[76px] place-items-center rounded-full"
                    >
                      {active && <span className="absolute -inset-3 rounded-full bg-sky/35 blur-xl animate-glow" aria-hidden />}
                      <span
                        className={`sphere absolute inset-0 rounded-full transition duration-500 ${active ? 'scale-110 ring-4 ring-sky/40' : 'group-hover:scale-105'}`}
                        aria-hidden
                      />
                      <span className={`relative text-base font-extrabold transition ${active ? 'text-electric' : 'text-ink/70'}`}>{s.number}</span>
                    </button>
                    <span
                      className={`mt-5 text-xs font-extrabold tracking-[0.16em] transition md:text-sm ${
                        active ? 'text-electric' : 'text-ink/60 hover:text-ink'
                      }`}
                    >
                      {t(s.title)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div data-reveal className="glass relative mx-auto mt-10 min-h-[220px] max-w-3xl overflow-hidden p-8 text-center md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sky">
                {t(ui.process.stepLabel)} {step.number} / {String(processSteps.length).padStart(2, '0')}
              </p>
              <h3 className="text-gradient mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{t(step.title)}</h3>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{t(step.body)}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
