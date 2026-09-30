"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  decimals?: number;
  thousands?: boolean;
};

export function useCountUp<T extends HTMLElement>(
  target: number,
  { decimals = 0, thousands = false }: Options = {},
) {
  const ref = useRef<T | null>(null);
  const [display, setDisplay] = useState(() =>
    thousands ? Math.round(0).toLocaleString("pt-BR") : (0).toFixed(decimals).replace(".", ","),
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(el);
          const t0 = performance.now();
          const dur = 1400;
          const frame = (now: number) => {
            const k = Math.min(1, (now - t0) / dur);
            const v = target * (1 - Math.pow(1 - k, 3));
            setDisplay(
              thousands
                ? Math.round(v).toLocaleString("pt-BR")
                : v.toFixed(decimals).replace(".", ","),
            );
            if (k < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals, thousands]);

  return { ref, display };
}
