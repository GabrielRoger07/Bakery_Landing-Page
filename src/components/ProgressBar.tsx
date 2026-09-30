"use client";

import { useEffect, useRef } from "react";

export function ProgressBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left scale-x-0 bg-gold pointer-events-none"
    />
  );
}
