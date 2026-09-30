"use client";

import { useEffect, useRef } from "react";

function loopWidth(el: HTMLDivElement) {
  const l0 = el.querySelector<HTMLElement>('[data-loop="0"]');
  const l1 = el.querySelector<HTMLElement>('[data-loop="1"]');
  return l0 && l1 ? l1.offsetLeft - l0.offsetLeft : 0;
}

export function useAutoScrollCarousel(speed = 0.045) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const holdRef = useRef(false);
  const posRef = useRef<number | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const holdOn = () => {
    holdRef.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
  };
  const pauseFor = (ms: number) => {
    holdRef.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      holdRef.current = false;
    }, ms);
  };

  useEffect(() => {
    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let last = performance.now();
    let raf = requestAnimationFrame(run);

    function run(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const el = trackRef.current;
      if (el && !holdRef.current && !document.hidden) {
        const rect = el.getBoundingClientRect();
        if (!(rect.bottom < 0 || rect.top > window.innerHeight)) {
          const w = loopWidth(el);
          if (posRef.current == null || Math.abs(posRef.current - el.scrollLeft) > 2) {
            posRef.current = el.scrollLeft;
          }
          posRef.current += dt * speed;
          if (w > 0 && posRef.current >= w) posRef.current -= w;
          el.scrollLeft = posRef.current;
        }
      }
      raf = requestAnimationFrame(run);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, [speed]);

  return {
    trackRef,
    handlers: {
      onTouchStart: holdOn,
      onTouchEnd: () => pauseFor(5000),
    },
  };
}
