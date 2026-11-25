import { useLanguage } from '../lib/language';
import { site } from '../content/site';
import { ui } from '../content/ui';
import { scrollToSection } from '../lib/scroll';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/80 bg-white/60 px-5 py-12 backdrop-blur-xl md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
        <div className="flex items-center gap-4">
          <span className="sphere h-10 w-10 shrink-0" aria-hidden />
          <div>
            <p className="text-sm font-extrabold tracking-[0.2em] text-ink">{t(site.brand.name)}</p>
            <p className="mt-1 text-xs text-ink/60">{t(site.brand.createdBy)}</p>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-electric/80">{t(site.brand.tagline)}</p>

        <div className="flex flex-col items-center gap-2 text-xs text-ink/55 md:items-end">
          <button type="button" onClick={() => scrollToSection('home')} className="font-semibold text-electric hover:underline">
            {t(ui.nav.home)}
          </button>
          <p>
            © {year} {t(site.brand.name)}. {t(ui.footer.rights)}
          </p>
        </div>
      </div>
    </footer>
  );
}
