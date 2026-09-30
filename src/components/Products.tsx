"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useAutoScrollCarousel } from "@/hooks/useAutoScrollCarousel";
import { PRODUCTS } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

export function Products() {
  const reveal = useReveal<HTMLDivElement>();
  const { trackRef, handlers } = useAutoScrollCarousel(0.045);

  return (
    <section
      id="produtos"
      className="relative text-cream"
      style={{
        background:
          "linear-gradient(180deg, rgba(34,21,15,0), rgba(20,12,8,.55) 30%, rgba(20,12,8,.55) 70%, rgba(34,21,15,0))",
      }}
    >
      <div className="flex flex-col gap-9 py-[clamp(44px,5vw,68px)]">
        <div
          ref={reveal.ref}
          className={`${reveal.className} mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-x-8 gap-y-5 px-6`}
          style={reveal.style}
        >
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[18px]">
              <SectionKicker symmetric={false}>O cardápio</SectionKicker>
              <h2 className="m-0 flex flex-wrap items-baseline gap-x-[18px] gap-y-1 font-serif text-[clamp(40px,5.2vw,72px)] leading-[.95]">
                Nossos produtos
                <span className="text-[.5em] italic leading-none text-gold">
                  feito aqui, todo dia.
                </span>
              </h2>
            </div>
          </div>
          <a
            href="cardapio-pani-premium.pdf"
            target="_blank"
            className="flex h-14 items-center gap-3.5 rounded-full bg-gold py-0 pl-6 pr-2 font-extrabold text-bg-ink shadow-[0_18px_40px_-18px_rgba(216,162,74,.8)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-gold-light"
          >
            Ver cardápio completo
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-ink text-cream">
              ↗
            </span>
          </a>
        </div>

        <div
          ref={trackRef}
          {...handlers}
          className="no-scrollbar flex gap-6 overflow-x-auto overflow-y-hidden pb-1.5"
          style={{ paddingLeft: "max(24px, calc((100vw - 1320px) / 2 + 24px))", paddingRight: "24px" }}
        >
          {[0, 1].map((loop) => (
            <div key={loop} data-loop={loop} aria-hidden={loop === 1} className="flex flex-none gap-6">
              {PRODUCTS.map((p) => (
                <article
                  key={`${loop}-${p.id}`}
                  className="flex w-[min(76vw,340px)] flex-none flex-col gap-4 transition-transform"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 font-serif text-[28px] leading-[1.05]">{p.name}</h3>
                    <p className="m-0 text-sm leading-[1.55] text-muted">{p.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
