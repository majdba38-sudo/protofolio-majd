import { motion, type Variants } from 'framer-motion';
import type { PointerEvent } from 'react';
import { useLanguage } from '../lib/language';
import { services } from '../content/process';
import type { Service } from '../content/types';
import { ui } from '../content/ui';
import { SectionHeader } from './SectionHeader';
import { Crystal } from './Scene';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] } }),
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="aurora relative overflow-hidden px-5 py-28 md:px-10">
      <div data-parallax="-60" className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="sphere absolute start-[4%] top-20 h-16 w-16 animate-float" />
        <span className="sphere absolute end-[6%] bottom-24 h-28 w-28 animate-float [animation-delay:-3s]" />
        <Crystal hue="mint" className="absolute end-[10%] top-40 hidden h-44 w-32 animate-float opacity-80 lg:block" />
      </div>

      <div className="relative">
        <SectionHeader eyebrow={t(ui.services.eyebrow)} title={t(ui.services.title)} subtitle={t(ui.services.subtitle)} />

        <div className="mx-auto mt-16 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t } = useLanguage();

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onPointerMove={onPointerMove}
      className="glass iridescent-border sheen group relative overflow-hidden p-7 hover:shadow-[0_34px_80px_-30px_rgba(57,191,234,0.65)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(57,191,234,0.22), transparent 70%)' }}
      />
      <div className="relative flex items-center justify-between">
        <span className="sphere grid h-14 w-14 place-items-center text-sm font-extrabold text-electric transition duration-500 group-hover:scale-110">
          {service.number}
        </span>
        <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_14px_#91E8D6] animate-glow" aria-hidden />
      </div>
      <h3 className="relative mt-7 text-lg font-extrabold leading-snug tracking-tight text-ink">{t(service.title)}</h3>
      <p className="relative mt-3 leading-relaxed text-ink/70">{t(service.body)}</p>
    </motion.article>
  );
}
