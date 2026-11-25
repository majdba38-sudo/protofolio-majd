import { prefersReducedMotion } from './gsap';

export function scrollToSection(id: string) {
  const reduce = prefersReducedMotion();
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
