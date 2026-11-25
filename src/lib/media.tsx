import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Media overrides. Keys look like "experiments/mishkat/original" or "creator/portrait".
 * Values are URLs of uploaded files. When no override exists, the default file from the data is used.
 */
type Overrides = Record<string, string>;

interface MediaValue {
  overrides: Overrides;
  setOverride: (key: string, url: string) => void;
}

const MediaContext = createContext<MediaValue | null>(null);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({});

  useEffect(() => {
    let cancelled = false;
    fetch('/media-manifest.json', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Overrides) => {
        if (!cancelled && data && typeof data === 'object') setOverrides(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const setOverride = useCallback((key: string, url: string) => {
    setOverrides((prev) => ({ ...prev, [key]: url }));
  }, []);

  const value = useMemo(() => ({ overrides, setOverride }), [overrides, setOverride]);
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMedia(key: string, fallback: string): string {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error('useMedia must be used inside MediaProvider');
  return ctx.overrides[key] ?? fallback;
}

export type UploadResult = { ok: true; persisted: boolean } | { ok: false; error: string };

/**
 * Uploads a file for a media key. In the local dev server the file is saved to public/uploads
 * and recorded in public/media-manifest.json. Otherwise it is shown as a preview for this session.
 */
export function useMediaUpload() {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error('useMediaUpload must be used inside MediaProvider');
  const { setOverride } = ctx;

  return useCallback(
    async (key: string, file: File): Promise<UploadResult> => {
      if (!file.type.startsWith('image/')) return { ok: false, error: 'not-image' };

      try {
        const res = await fetch('/__cms/upload', {
          method: 'POST',
          headers: {
            'x-slot': encodeURIComponent(key),
            'x-filename': encodeURIComponent(file.name),
            'content-type': file.type,
          },
          body: file,
        });
        const contentType = res.headers.get('content-type') ?? '';
        if (res.ok && contentType.includes('application/json')) {
          const data = (await res.json()) as { url: string };
          setOverride(key, data.url);
          return { ok: true, persisted: true };
        }
      } catch {
        /* no dev endpoint available, fall through to preview */
      }

      setOverride(key, URL.createObjectURL(file));
      return { ok: true, persisted: false };
    },
    [setOverride],
  );
}
