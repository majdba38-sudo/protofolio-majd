import { useLanguage } from '../lib/language';
import type { DigitalProject } from '../content/types';
import { ui } from '../content/ui';

/** Opens the live site in a new tab. Projects without a live URL show a disabled COMING SOON button. */
export function VisitButton({ project, className = '' }: { project: DigitalProject; className?: string }) {
  const { t } = useLanguage();

  if (project.status === 'live' && project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t(ui.digital.visit)}: ${t(project.name)}`}
        className={`btn-primary sheen inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-[0.16em] ${className}`}
      >
        {t(ui.digital.visit)}
        <span aria-hidden>↗</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      className={`btn-primary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold tracking-[0.16em] ${className}`}
    >
      {t(ui.digital.comingSoon)}
    </button>
  );
}

export function StatusBadge({ status }: { status: DigitalProject['status'] }) {
  const { t } = useLanguage();
  const isLive = status === 'live';
  return (
    <span
      className={`glass-btn inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ${
        isLive ? 'text-emerald-700' : 'text-electric'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-glow' : 'bg-lilac shadow-[0_0_10px_#D6C8FF]'}`}
        aria-hidden
      />
      {isLive ? t(ui.digital.live) : t(ui.digital.comingSoon)}
    </span>
  );
}
