import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { useLanguage } from '../lib/language';
import { site } from '../content/site';
import { ui } from '../content/ui';
import { Crystal, IdeaCapsule, LightTrail, ParticleField } from './Scene';

interface EntranceProps {
  onEnter: () => void;
}

export function Entrance({ onEnter }: EntranceProps) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const timers = useRef<number[]>([]);

  const mx = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: 0.6 });
  const my = useSpring(useMotionValue(0), { stiffness: 70, damping: 22, mass: 0.6 });
  const doorRotateX = useTransform(my, [-1, 1], [6, -6]);
  const doorRotateY = useTransform(mx, [-1, 1], [-9, 9]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);
    timers.current.push(window.setTimeout(onEnter, reduce ? 0 : 1000));
    timers.current.push(window.setTimeout(() => setOpening(false), reduce ? 0 : 2800));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const } },
  };

  return (
    <section
      id="home"
      onPointerMove={onPointerMove}
      className="hero-bg relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pb-14 pt-28 text-white"
    >
      <ParticleField count={70} />

      <LightTrail d="M-40 360 C 260 240, 520 520, 860 330 S 1420 180, 1660 360" className="opacity-70" />
      <LightTrail d="M-40 620 C 340 520, 700 760, 1040 600 S 1480 520, 1660 680" className="opacity-40" />

      <DecorLayer mx={mx} my={my} depth={28} className="left-[-4%] top-[12%]">
        <span className="sphere block h-56 w-56 animate-float md:h-72 md:w-72" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={54} className="right-[6%] top-[16%]">
        <span className="sphere block h-24 w-24 animate-float [animation-delay:-2s] md:h-32 md:w-32" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={70} className="left-[12%] bottom-[16%]">
        <span className="sphere block h-12 w-12 animate-float [animation-delay:-4s] md:h-16 md:w-16" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={24} className="right-[-3%] bottom-[10%]">
        <span className="sphere block h-40 w-40 animate-float [animation-delay:-1s] md:h-56 md:w-56" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={80} className="left-[38%] top-[9%]">
        <span className="sphere block h-7 w-7 animate-float [animation-delay:-3s]" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={46} className="right-[30%] bottom-[12%]">
        <span className="sphere block h-9 w-9 animate-float [animation-delay:-5s]" />
      </DecorLayer>

      <DecorLayer mx={mx} my={my} depth={40} className="left-[6%] top-[50%] hidden lg:block">
        <Crystal hue="sky" className="h-44 w-32 animate-float opacity-90" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={60} className="right-[9%] top-[38%] hidden lg:block">
        <Crystal hue="lilac" className="h-56 w-40 animate-float [animation-delay:-3s] opacity-90" />
      </DecorLayer>

      <DecorLayer mx={mx} my={my} depth={36} className="left-[5%] top-[30%] hidden lg:block">
        <IdeaCapsule label={t(ui.entrance.capsules[0])} tone="hero" className="animate-float" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={44} className="right-[7%] top-[70%] hidden lg:block">
        <IdeaCapsule label={t(ui.entrance.capsules[1])} tone="hero" className="animate-float [animation-delay:-2s]" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={52} className="left-[18%] bottom-[24%] hidden lg:block">
        <IdeaCapsule label={t(ui.entrance.capsules[2])} tone="hero" className="animate-float [animation-delay:-4s]" />
      </DecorLayer>
      <DecorLayer mx={mx} my={my} depth={48} className="right-[22%] top-[14%] hidden lg:block">
        <IdeaCapsule label={t(ui.entrance.capsules[3])} tone="hero" className="animate-float [animation-delay:-1.5s]" />
      </DecorLayer>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.p variants={fadeUp} className="capsule-hero rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em]">
          {t(site.brand.createdBy)}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-gradient-light mt-6 text-[clamp(2.2rem,5.6vw,4.9rem)] font-extrabold leading-[1.02] tracking-tight drop-shadow-[0_6px_30px_rgba(9,40,120,0.45)]"
        >
          {t(ui.entrance.title)}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 text-lg font-semibold text-white md:text-2xl">
          {t(ui.entrance.subtitle)}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          {t(ui.entrance.body)}
        </motion.p>
      </motion.div>

      <div data-parallax="60" className="relative z-10 mt-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ rotateX: doorRotateX, rotateY: doorRotateY, transformPerspective: 1200 }}
          className="relative h-[clamp(200px,31svh,320px)] w-[clamp(170px,22vw,260px)]"
        >
          <motion.div
            className="glass-hero portal-arch absolute inset-0 overflow-hidden"
            animate={{ scale: opening ? 1.25 : 1 }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.95),rgba(167,223,255,0.7)_38%,rgba(57,191,234,0.2)_72%)]"
              animate={{ opacity: opening ? 1 : 0.55 }}
              transition={{ duration: 1 }}
            />
            <Crystal hue="mint" className="absolute left-1/2 top-[30%] h-[46%] w-auto -translate-x-1/2 animate-float" />

            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 border-e border-white/60 bg-[linear-gradient(100deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.18)_42%,rgba(167,223,255,0.35)_62%,rgba(255,255,255,0.12)_100%)] backdrop-blur-[3px]"
              animate={{ x: opening ? '-101%' : '0%' }}
              transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
            >
              <span className="absolute end-4 top-[52%] h-16 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
            </motion.div>
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 border-s border-white/60 bg-[linear-gradient(260deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.18)_42%,rgba(167,223,255,0.35)_62%,rgba(255,255,255,0.12)_100%)] backdrop-blur-[3px]"
              animate={{ x: opening ? '101%' : '0%' }}
              transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
            >
              <span className="absolute start-4 top-[52%] h-16 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
            </motion.div>

            <span className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
          </motion.div>
          <span className="absolute -bottom-6 left-1/2 h-10 w-[120%] -translate-x-1/2 rounded-[50%] bg-ice/60 blur-xl" aria-hidden />
        </motion.div>

        <motion.button
          type="button"
          onClick={handleEnter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary sheen mt-9 rounded-full px-9 py-4 text-sm font-bold tracking-[0.22em]"
          aria-label={t(ui.entrance.button)}
        >
          {t(ui.entrance.button)}
          <span aria-hidden className="ms-3 inline-block">→</span>
        </motion.button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cloud" aria-hidden />
    </section>
  );
}

function DecorLayer({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  children: ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={`pointer-events-none absolute ${className}`} style={{ x, y }} aria-hidden>
      {children}
    </motion.div>
  );
}
