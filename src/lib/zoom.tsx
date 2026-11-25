import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLanguage } from './language';
import { ui } from '../content/ui';

interface ZoomTarget {
  src: string;
  alt: string;
}

const ZoomContext = createContext<((target: ZoomTarget) => void) | null>(null);

export function ZoomProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<ZoomTarget | null>(null);
  const open = useCallback((next: ZoomTarget) => setTarget(next), []);

  return (
    <ZoomContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {target && <Lightbox key={target.src} target={target} onClose={() => setTarget(null)} />}
      </AnimatePresence>
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  const open = useContext(ZoomContext);
  if (!open) throw new Error('useZoom must be used inside ZoomProvider');
  return open;
}

const MIN = 1;
const MAX = 5;

function Lightbox({ target, onClose }: { target: ZoomTarget; onClose: () => void }) {
  const { t } = useLanguage();
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setScale((s) => clamp(s * 1.25));
      if (e.key === '-') setScale((s) => clamp(s / 1.25));
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const zoomBy = (factor: number) =>
    setScale((s) => {
      const next = clamp(s * factor);
      if (next === MIN) setPos({ x: 0, y: 0 });
      return next;
    });

  const buttonClass =
    'glass-btn grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm font-semibold text-electric transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-sky';

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={target.alt}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-electric/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="mb-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button type="button" className={buttonClass} onClick={() => zoomBy(1 / 1.3)} aria-label={t(ui.media.zoomOut)}>
          −
        </button>
        <button type="button" className={buttonClass} onClick={() => zoomBy(1.3)} aria-label={t(ui.media.zoomIn)}>
          +
        </button>
        <button type="button" className={buttonClass} onClick={reset}>
          {t(ui.media.zoomReset)}
        </button>
        <button type="button" className={buttonClass} onClick={onClose} aria-label={t(ui.media.closeZoom)}>
          ✕
        </button>
      </div>

      <div
        className="relative flex max-h-[80vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => setScale((s) => clamp(s * (e.deltaY < 0 ? 1.12 : 1 / 1.12)))}
        onPointerDown={(e) => {
          if (scale <= 1) return;
          drag.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPos({ x: drag.current.px + e.clientX - drag.current.x, y: drag.current.py + e.clientY - drag.current.y });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onDoubleClick={() => (scale > 1 ? reset() : setScale(2.5))}
        style={{ cursor: scale > 1 ? 'grab' : 'zoom-in', touchAction: 'none' }}
      >
        <img
          src={target.src}
          alt={target.alt}
          draggable={false}
          className="max-h-[80vh] max-w-[94vw] select-none object-contain transition-transform duration-200 ease-out"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
        />
      </div>

      <p className="mt-3 text-sm text-white/90" onClick={(e) => e.stopPropagation()}>
        {t(ui.media.zoomHint)}
      </p>
    </motion.div>
  );
}
