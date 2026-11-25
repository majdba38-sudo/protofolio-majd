import { useEffect, useId, useRef } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

/* ---------- Glass capsule with a short idea word ---------- */

export function IdeaCapsule({ label, className = '', tone = 'light' }: { label: string; className?: string; tone?: 'light' | 'hero' }) {
  return (
    <span
      className={`${tone === 'hero' ? 'capsule-hero' : 'capsule text-electric'} inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_10px_#91E8D6]" aria-hidden />
      {label}
    </span>
  );
}

/* ---------- Faceted 3D-style crystal (SVG) ---------- */

export function Crystal({ className = '', hue = 'sky' }: { className?: string; hue?: 'sky' | 'lilac' | 'mint' }) {
  const id = useId().replace(/:/g, '');
  const stops = {
    sky: ['#ffffff', '#a7dfff', '#39bfea'],
    lilac: ['#ffffff', '#d6c8ff', '#8fb4ff'],
    mint: ['#ffffff', '#91e8d6', '#39bfea'],
  }[hue];

  return (
    <svg viewBox="0 0 120 170" className={`pointer-events-none drop-shadow-[0_18px_30px_rgba(22,71,184,0.35)] ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={stops[0]} stopOpacity="0.95" />
          <stop offset="0.45" stopColor={stops[1]} stopOpacity="0.75" />
          <stop offset="1" stopColor={stops[2]} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`s-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="60,4 108,48 96,156 24,156 12,48" fill={`url(#g-${id})`} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      <polygon points="60,4 12,48 60,72" fill="rgba(255,255,255,0.55)" />
      <polygon points="60,4 108,48 60,72" fill="rgba(255,255,255,0.22)" />
      <polygon points="60,72 24,156 96,156" fill="rgba(22,71,184,0.14)" />
      <polygon points="60,4 60,72 12,48" fill={`url(#s-${id})`} opacity="0.7" />
      <line x1="60" y1="4" x2="60" y2="72" stroke="rgba(255,255,255,0.85)" strokeWidth="1" />
    </svg>
  );
}

/* ---------- Glowing light trail (animated SVG path) ---------- */

export function LightTrail({ d, className = '' }: { d: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`t-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d6c8ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={`url(#t-${id})`} strokeWidth="2" strokeLinecap="round" strokeDasharray="160 640" className="animate-trail" />
    </svg>
  );
}

/* ---------- Glowing particle field (canvas, paused when off-screen) ---------- */

const PARTICLE_COLORS = ['#ffffff', '#a7dfff', '#39bfea', '#d6c8ff', '#91e8d6'];

export function ParticleField({ count = 60 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number }[] = [];
    let raf = 0;

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.08 - Math.random() * 0.32,
        c: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        a: 0.3 + Math.random() * 0.6,
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (!reduce) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      if (reduce) return;
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(host);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
