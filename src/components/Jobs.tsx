"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ph } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

const EQUIPE = ph("C");

export function Jobs() {
  const reveal = useReveal<HTMLAnchorElement>();
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const el = parallaxRef.current;
      if (el && el.parentElement) {
        const b = el.parentElement.getBoundingClientRect();
        const vh = window.innerHeight;
        if (b.bottom >= 0 && b.top <= vh) {
          const c = (b.top + b.height / 2 - vh / 2) / vh;
          el.style.transform = `translate3d(0,${c * -9}%,0) scale(1.04)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="vagas"
      className="relative mx-0 overflow-hidden text-cream sm:mx-6 sm:rounded-[32px]"
      style={{ scrollMarginTop: 72 }}
    >
      <div ref={parallaxRef} className="absolute -inset-y-[14%] inset-x-0 will-change-transform">
        <Image src={EQUIPE.img} alt="Equipe trabalhando" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,16,11,.92) 0%, rgba(26,16,11,.7) 50%, rgba(26,16,11,.35) 100%)",
        }}
      />
      <a
        ref={reveal.ref}
        href="/trabalhe-conosco"
        className={`${reveal.className} relative mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-8 gap-y-5 px-6 py-[clamp(64px,8vw,120px)] text-cream`}
        style={reveal.style}
      >
        <span className="flex flex-col gap-2.5">
          <span className="flex flex-col gap-[18px]">
            <SectionKicker symmetric={false}>Faça parte</SectionKicker>
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-serif text-[clamp(36px,4.6vw,64px)] leading-[.95]">
              Trabalhe conosco
              <span className="text-[.5em] italic leading-none text-gold">
                faça parte da Pani Premium
              </span>
            </span>
          </span>
          <span className="text-base text-muted">Vagas no forno, na confeitaria e no salão.</span>
        </span>
        <span className="flex h-14 items-center gap-3.5 rounded-full bg-cream py-0 pl-6 pr-2 font-extrabold text-bg-ink transition-transform hover:-translate-y-0.5">
          Ver vagas abertas
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-white">
            →
          </span>
        </span>
      </a>
    </section>
  );
}
