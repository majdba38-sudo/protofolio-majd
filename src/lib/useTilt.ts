import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent } from 'react';

/** Gentle 3D tilt that follows the pointer. Returns motion styles and handlers. */
export function useTilt(maxDeg = 8) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const config = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [maxDeg, -maxDeg]), config);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-maxDeg, maxDeg]), config);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return { style: { rotateX, rotateY }, onPointerMove, onPointerLeave };
}
