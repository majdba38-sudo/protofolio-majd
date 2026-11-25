import { MotionConfig } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './lib/language';
import { MediaProvider } from './lib/media';
import { ZoomProvider } from './lib/zoom';
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/gsap';
import { site } from './content/site';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { DigitalExperiences } from './components/DigitalExperiences';
import { Entrance } from './components/Entrance';
import { Experiments } from './components/Experiments';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { scrollToSection } from './lib/scroll';
import { Process } from './components/Process';
import { ProjectModal } from './components/ProjectModal';
import { Services } from './components/Services';

export default function App() {
  return (
    <LanguageProvider>
      <MediaProvider>
        <ZoomProvider>
          <MotionConfig reducedMotion="user">
            <AppShell />
          </MotionConfig>
        </ZoomProvider>
      </MediaProvider>
    </LanguageProvider>
  );
}

function AppShell() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  const closeProject = useCallback(() => setOpenId(null), []);
  const openProject = useCallback((id: string) => setOpenId(id), []);

  const enterLab = useCallback(() => scrollToSection('about'), []);

  useEffect(() => {
    document.title = t(site.documentTitle);
  }, [t]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax) || 40;
        const section = el.closest('section') ?? el;
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: amount,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <a
        href="#main"
        className="glass-btn sr-only z-[90] rounded-full px-4 py-2 text-sm font-semibold text-electric focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t({ en: 'Skip to content', ar: 'تخطي إلى المحتوى' })}
      </a>

      <Navbar />

      <main id="main">
        <Entrance onEnter={enterLab} />
        <About />
        <Experiments onOpen={openProject} />
        <Process />
        <Services />
        <DigitalExperiences />
        <Contact />
      </main>

      <Footer />
      <ProjectModal id={openId} onClose={closeProject} />
    </div>
  );
}
