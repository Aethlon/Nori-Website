import { useState, useEffect } from "react";

/**
 * Returns `true` when the user has enabled `prefers-reduced-motion: reduce`
 * in their operating system settings. Listens for changes and updates reactively.
 *
 * Defaults to `false` during SSR (no window/matchMedia available).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
