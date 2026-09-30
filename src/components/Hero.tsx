"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { ph } from "@/data/site";

const HERO = ph("A");

export function Hero() {
  const { openOrder } = useUI();
  const imgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y >= vh * 1.2) return;
      const k = Math.min(y / vh, 1);
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0,${y * 0.35}px,0) scale(${1.08 - k * 0.08})`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0,${y * 0.18}px,0)`;
        textRef.current.style.opacity = String(1 - k * 1.1);
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
    <section
      id="topo"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-bg text-cream"
    >
      <div
        ref={imgRef}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
      >
        <Image
          src={HERO.img}
          alt="Pães saindo do forno / vitrine da padaria"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(34,21,15,.75) 0%, rgba(34,21,15,.25) 22%, rgba(34,21,15,.4) 55%, rgba(34,21,15,.92) 100%)",
        }}
      />
      <div
        ref={textRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 will-change-transform"
      >
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-x-6 gap-y-7 px-6 pb-10">
          <div className="flex flex-col gap-8">
            <h1 className="m-0 font-serif text-[clamp(52px,10vw,148px)] leading-[.92] tracking-[-.02em]">
              <span className="block">Pão quentinho,</span>
              <span className="block">mesa farta,</span>
              <span className="block italic text-gold">todo dia.</span>
            </h1>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              <button
                onClick={openOrder}
                className="flex h-14 items-center rounded-full bg-terracotta px-7 font-bold text-white transition-colors hover:bg-terracotta-dark"
              >
                Pedir delivery
              </button>
              <Link
                href="/encomendas"
                className="flex h-14 items-center rounded-full bg-cream px-7 font-bold text-bg-ink transition-colors hover:bg-white"
              >
                Fazer encomenda
              </Link>
              <a
                href="#produtos"
                className="flex h-14 items-center rounded-full border-[1.5px] border-cream/55 px-7 font-bold text-cream transition-colors hover:border-white hover:text-white"
              >
                Ver cardápio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
