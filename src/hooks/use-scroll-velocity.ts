import { useEffect, useRef, useState } from "react";

/**
 * Returns a normalized scroll velocity value (0 to 1) that can drive
 * visual effects like border glow intensity, blur, or scale.
 * Updates at 60fps using requestAnimationFrame.
 */
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());
  const raf = useRef(0);
  const currentVelocity = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const scrollY = window.scrollY;
        const rawVelocity = Math.abs(scrollY - lastScroll.current) / dt;
        // Normalize: 0 = still, 1 = fast scroll (~2px/ms)
        const normalized = Math.min(rawVelocity / 2, 1);
        // Smooth interpolation for buttery transitions
        currentVelocity.current += (normalized - currentVelocity.current) * 0.1;
        setVelocity(currentVelocity.current);
        lastScroll.current = scrollY;
        lastTime.current = now;
      }
      raf.current = requestAnimationFrame(update);
    };

    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return velocity;
}
