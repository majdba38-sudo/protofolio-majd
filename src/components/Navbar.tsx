import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage, type Lang } from '../lib/language';
import { scrollToSection } from '../lib/scroll';
import { site } from '../content/site';
import { ui } from '../content/ui';

const SECTIONS = [
  { id: 'home', label: ui.nav.home },
  { id: 'about', label: ui.nav.about },
  { id: 'experiments', label: ui.nav.experiments },
  { id: 'process', label: ui.nav.process },
  { id: 'services', label: ui.nav.services },
  { id: 'digital', label: ui.nav.digital },
  { id: 'contact', label: ui.nav.contact },
] as const;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-electric via-sky to-lilac"
      style={{ scaleX }}
    />
  );
}

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [active, setActive] = useState<string>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const langButton = (code: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`relative rounded-full px-3 py-1.5 text-xs font-bold tracking-wider transition ${
        lang === code ? 'text-white' : 'text-electric/70 hover:text-electric'
      }`}
    >
      {lang === code && (
        <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric to-sky" />
      )}
      {label}
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <ScrollProgress />
      <nav aria-label="Main" className="glass mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 md:px-6">
        <button type="button" onClick={() => go('home')} className="flex items-center gap-3">
          <span className="sphere h-8 w-8 shrink-0" aria-hidden />
          <span className="whitespace-nowrap text-xs font-extrabold tracking-[0.14em] text-ink md:text-sm md:tracking-[0.18em]">{t(site.brand.name)}</span>
        </button>

        <ul className="hidden items-center gap-1 xl:flex">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-2 text-[11px] font-semibold tracking-[0.12em] transition ${
                    isActive ? 'text-white' : 'text-ink/70 hover:text-electric'
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric to-sky shadow-[0_10px_24px_-10px_rgba(22,71,184,0.7)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {t(s.label)}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={t(ui.nav.language)} className="flex items-center rounded-full bg-white/60 p-0.5">
            {langButton('en', 'EN')}
            {langButton('ar', 'عربي')}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t(menuOpen ? ui.nav.closeMenu : ui.nav.openMenu)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/70 xl:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute inset-x-0 top-0 h-0.5 rounded bg-electric transition ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute inset-x-0 top-[7px] h-0.5 rounded bg-electric transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute inset-x-0 top-[14px] h-0.5 rounded bg-electric transition ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass mx-auto mt-3 max-w-md p-3 xl:hidden"
          >
            <ul className="flex flex-col">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`w-full rounded-2xl px-4 py-3.5 text-start text-sm font-semibold tracking-[0.12em] transition ${
                      active === s.id ? 'bg-gradient-to-r from-electric to-sky text-white' : 'text-ink hover:bg-white/70'
                    }`}
                  >
                    {t(s.label)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
