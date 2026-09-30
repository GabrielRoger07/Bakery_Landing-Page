"use client";

import { useEffect, useRef } from "react";

export function GlowBackground() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      const el = glowRef.current;
      if (el) {
        const docHeight = Math.max(1, document.documentElement.scrollHeight);
        el.style.transform = `translate3d(${Math.sin(y / 900) * 7}%,${
          Math.cos(y / 1300) * 6 - (y / docHeight) * 10
        }%,0) rotate(${y / 60}deg)`;
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        ref={glowRef}
        className="fixed -inset-1/4 z-0 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(34% 30% at 18% 28%, rgba(216,162,74,.20), rgba(216,162,74,0) 70%), radial-gradient(30% 28% at 82% 62%, rgba(196,71,44,.18), rgba(196,71,44,0) 70%), radial-gradient(40% 34% at 50% 100%, rgba(120,72,40,.35), rgba(120,72,40,0) 70%)",
        }}
      />
      <div aria-hidden="true" className="noise-overlay" />
    </>
  );
}
