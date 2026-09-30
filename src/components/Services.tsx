"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { SERVICES } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

export function Services() {
  const headingReveal = useReveal<HTMLDivElement>();
  const cardsReveal = useReveal<HTMLDivElement>(100);
  const [hovered, setHovered] = useState(0);

  return (
    <section
      id="servicos"
      className="mx-auto flex max-w-[1320px] flex-col gap-7 px-6 pb-[clamp(44px,5vw,68px)] pt-[clamp(40px,4.5vw,64px)]"
      style={{ scrollMarginTop: 80 }}
    >
      <div ref={headingReveal.ref} className={`${headingReveal.className} flex justify-center text-center`} style={headingReveal.style}>
        <div className="flex flex-col items-center gap-[18px]">
          <SectionKicker>Nossos serviços</SectionKicker>
          <h2 className="m-0 font-serif text-[clamp(38px,5vw,68px)] leading-none">
            Para sentar <span className="italic text-gold">e ficar.</span>
          </h2>
        </div>
      </div>

      <div
        ref={cardsReveal.ref}
        className={`${cardsReveal.className} flex flex-col gap-4 md:flex-row md:h-[clamp(460px,64vh,600px)]`}
        style={cardsReveal.style}
      >
        {SERVICES.map((s, i) => {
          const isOpen = hovered === i;
          return (
            <article
              key={s.id}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              tabIndex={0}
              className="relative min-h-[420px] min-w-0 flex-none overflow-hidden rounded-[28px] bg-bg text-cream transition-[flex] duration-700 md:min-h-0 md:flex-1"
              style={{
                flexGrow: isOpen ? 2.2 : 1,
                boxShadow: isOpen ? "0 40px 70px -34px rgba(0,0,0,.75)" : "none",
              }}
            >
              <div className="absolute -inset-y-[8%] inset-x-0 z-0 will-change-transform">
                <Image
                  src={s.img}
                  alt={s.photo}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(34,21,15,.35) 0%, rgba(34,21,15,0) 28%, rgba(34,21,15,.2) 48%, rgba(34,21,15,.94) 100%)",
                }}
              />
              <span className="pointer-events-none absolute left-[18px] top-[18px] z-[2] flex items-center gap-2 rounded-full bg-[rgba(251,247,240,.92)] px-[14px] py-2 text-xs font-extrabold text-bg-ink backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {s.when}
              </span>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-3 p-7">
                <h3 className="m-0 font-serif text-[clamp(40px,3.6vw,54px)] leading-[.95]">{s.title}</h3>
                <span className="h-0.5 w-10 bg-gold" />
                <p
                  className="m-0 max-w-[420px] text-balance text-[15px] leading-[1.6] text-[#E9DCCB] transition-[opacity,transform] duration-500"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "none" : "translateY(12px)",
                    transitionDelay: isOpen ? "100ms" : "0ms",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
