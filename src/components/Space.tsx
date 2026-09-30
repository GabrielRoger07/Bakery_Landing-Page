"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { AMENITIES, GALLERY } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

const DESKTOP_AREAS = '"p0 p0 p1" "p0 p0 p2" "p3 p4 p4"';
const MOBILE_AREAS = '"p0 p0" "p0 p0" "p1 p2" "p3 p4"';

export function Space() {
  const [desktop, setDesktop] = useState(false);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const introReveal = useReveal<HTMLDivElement>();

  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduceMotion =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const vh = window.innerHeight;
      for (const el of parallaxRefs.current) {
        if (!el || !el.parentElement) continue;
        const b = el.parentElement.getBoundingClientRect();
        if (b.bottom < 0 || b.top > vh) continue;
        const c = (b.top + b.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0,${c * -9}%,0) scale(1.04)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="espaco" className="relative overflow-hidden text-cream" style={{ scrollMarginTop: 72 }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] select-none whitespace-nowrap font-serif italic leading-none"
        style={{
          fontSize: "clamp(140px,22vw,340px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(216,162,74,.22)",
        }}
      >
        o salão ✦ o salão ✦ o salão
      </div>

      <div className="relative mx-auto grid max-w-[1320px] items-start gap-[clamp(28px,4vw,56px)] px-6 py-[clamp(40px,4.5vw,64px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
        <div
          ref={introReveal.ref}
          className={`${introReveal.className} flex flex-col gap-[22px] lg:sticky lg:top-[110px]`}
          style={introReveal.style}
        >
          <div className="flex flex-col gap-[18px]">
            <SectionKicker symmetric={false}>O salão</SectionKicker>
            <h2 className="m-0 flex flex-col gap-2.5 font-serif text-[clamp(40px,4.6vw,64px)] leading-[.95]">
              O espaço
              <span className="text-[.5em] italic leading-[1.1] text-gold">um lugar para ficar.</span>
            </h2>
          </div>
          <p className="m-0 text-balance text-base leading-[1.7] text-muted">
            Salão climatizado, mesas ao ar livre e estacionamento próprio. Para o café sem pressa, o
            almoço do trabalho ou o lanche com as crianças.
          </p>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-5 border-t border-panel-border-2 p-0">
            {AMENITIES.map((a) => (
              <li
                key={a}
                className="flex items-center gap-2.5 border-b border-panel-border-2 py-3 text-sm font-semibold text-cream"
              >
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                {a}
              </li>
            ))}
          </ul>
          <a
            href="https://maps.google.com/?q=Pani+Premium"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 self-start font-bold text-cream underline decoration-gold underline-offset-[5px] transition-colors hover:text-gold"
          >
            Como chegar ↗
          </a>
        </div>

        <div
          className="grid gap-3"
          style={{
            gridTemplateAreas: desktop ? DESKTOP_AREAS : MOBILE_AREAS,
            gridTemplateColumns: desktop ? "repeat(3,minmax(0,1fr))" : "repeat(2,minmax(0,1fr))",
            gridAutoRows: desktop ? "clamp(170px,15vw,220px)" : "160px",
          }}
        >
          {GALLERY.map((g, i) => (
            <figure
              key={g.caption}
              className="relative m-0 h-full min-h-0 overflow-hidden rounded-[22px]"
              style={{ gridArea: `p${i}` }}
            >
              <div
                ref={(el) => {
                  parallaxRefs.current[i] = el;
                }}
                className="absolute -inset-y-[10%] inset-x-0 will-change-transform"
              >
                <Image src={g.img} alt={g.caption} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
              </div>
              <figcaption className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-bg/80 px-3 py-1.5 text-xs font-bold text-cream backdrop-blur-sm">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
