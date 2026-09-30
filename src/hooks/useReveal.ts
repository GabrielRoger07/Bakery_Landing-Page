"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return {
    ref,
    className: `reveal${visible ? " is-visible" : ""}`,
    style: { transitionDelay: `${delay}ms` },
  };
}
