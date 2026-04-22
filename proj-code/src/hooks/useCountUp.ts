import { useState, useEffect } from 'react';

/**
 * Animated counter that eases from 0 to `target` over `duration` ms (cubic ease-out).
 * Used by StatBlocks to convey "live telemetry" feel when a tab mounts.
 */
export const useCountUp = (target: number, duration = 1500): number => {
  const [v, setV] = useState(0);
  useEffect(() => {
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
