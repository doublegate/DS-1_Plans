import { useState, useEffect } from 'react';

/**
 * Animated counter that eases from 0 to `target` over `duration` ms (cubic ease-out).
 * Respects `prefers-reduced-motion: reduce` by resolving immediately.
 */
export const useCountUp = (target: number, duration = 1200): number => {
  const [v, setV] = useState(target);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setV(target);
      return;
    }
    let start: number | null = null;
    let raf: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { if (raf !== null) cancelAnimationFrame(raf); };
  }, [target, duration]);
  return v;
};
