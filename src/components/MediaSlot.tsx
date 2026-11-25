import { useRef, useState } from 'react';
import { useLanguage } from '../lib/language';
import { useMedia, useMediaUpload } from '../lib/media';
import { useZoom } from '../lib/zoom';
import type { Localized } from '../content/types';
import { ui } from '../content/ui';

const RATIO = {
  square: 'aspect-square',
  poster: 'aspect-[3/4]',
  mockup: 'aspect-[4/3]',
  landscape: 'aspect-[16/10]',
} as const;

interface MediaSlotProps {
  /** Unique key for the upload, for example "experiments/mishkat/original". */
  mediaKey: string;
  /** Default file shown when no upload exists. Keep originals unchanged. */
  fallback?: string;
  title: Localized;
  ratio?: keyof typeof RATIO;
  /** "contain" keeps logos and posters complete. "cover" fills the frame. */
  fit?: 'contain' | 'cover';
  monogram?: string;
  placeholderText?: Localized;
}

export function MediaSlot({ mediaKey, fallback = '', title, ratio = 'mockup', fit = 'contain', monogram, placeholderText }: MediaSlotProps) {
  const { t } = useLanguage();
  const src = useMedia(mediaKey, fallback);
  const upload = useMediaUpload();
  const openZoom = useZoom();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ tone: 'ok' | 'warn' | 'error'; text: string } | null>(null);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setNote(null);
    const result = await upload(mediaKey, file);
    setBusy(false);
    if (!result.ok) setNote({ tone: 'error', text: t(ui.media.failed) });
    else setNote(result.persisted ? { tone: 'ok', text: t(ui.media.saved) } : { tone: 'warn', text: t(ui.media.previewOnly) });
  };

  const noteClass = {
    ok: 'text-emerald-700 bg-mint/30',
    warn: 'text-electric bg-ice/40',
    error: 'text-rose-700 bg-rose-100',
  } as const;

  return (
    <figure className="overflow-hidden rounded-[1.4rem] border border-white/90 bg-white/80 shadow-[0_18px_40px_-26px_rgba(22,71,184,0.45)]">
      <div className={`relative ${RATIO[ratio]} overflow-hidden bg-gradient-to-br from-white via-cloud to-ice/40`}>
        {src ? (
          <button
            type="button"
            onClick={() => openZoom({ src, alt: t(title) })}
            aria-label={`${t(ui.media.zoom)}: ${t(title)}`}
            className="group absolute inset-0 grid cursor-zoom-in place-items-center p-4"
          >
            <img
              src={src}
              alt={t(title)}
              loading="lazy"
              decoding="async"
              className={`h-full w-full transition duration-700 group-hover:scale-[1.03] ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
            />
            <span className="glass-btn absolute bottom-3 end-3 rounded-full px-3 py-1 text-xs font-semibold text-electric opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {t(ui.media.zoom)} +
            </span>
          </button>
        ) : (
          <div className="dashed-placeholder absolute inset-0 grid place-items-center p-6 text-center">
            <div>
              {monogram && (
                <div className="sphere mx-auto mb-4 grid h-20 w-20 place-items-center text-xl font-extrabold text-electric">{monogram}</div>
              )}
              <p className="text-sm font-medium text-ink/75">{t(placeholderText ?? ui.media.placeholder)}</p>
              <p className="mt-1 text-xs text-ink/50">{t(ui.media.hint)}</p>
            </div>
          </div>
        )}
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold text-ink">{t(title)}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn-primary rounded-full px-4 py-2 text-xs font-bold disabled:opacity-60"
        >
          {busy ? '…' : src ? t(ui.media.replace) : t(ui.media.upload)}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            void onFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </figcaption>

      {note && (
        <p role="status" className={`mx-4 mb-4 rounded-xl px-3 py-2 text-xs font-medium ${noteClass[note.tone]}`}>
          {note.text}
        </p>
      )}
    </figure>
  );
}
