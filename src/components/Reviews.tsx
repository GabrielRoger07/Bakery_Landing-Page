"use client";

import { useReveal } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useAutoScrollCarousel } from "@/hooks/useAutoScrollCarousel";
import { COMPANY, REVIEWS } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

export function Reviews() {
  const headingReveal = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLAnchorElement>(150);
  const { trackRef, handlers } = useAutoScrollCarousel(0.035);
  const countCount = useCountUp<HTMLSpanElement>(COMPANY.reviewCount, { thousands: true });
  const ratingCount = useCountUp<HTMLSpanElement>(COMPANY.googleRating, { decimals: 1 });

  return (
    <section id="avaliacoes" className="overflow-hidden" style={{ scrollMarginTop: 72 }}>
      <div className="relative mx-auto flex flex-col items-center gap-[22px] px-6 pb-[clamp(20px,2.4vw,32px)] pt-[clamp(36px,4.5vw,60px)] text-center max-w-[1320px]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-[.18em] -translate-x-1/2 select-none font-serif text-[clamp(220px,26vw,380px)] leading-none"
          style={{ color: "rgba(216,162,74,.10)" }}
        >
          &ldquo;
        </span>
        <div ref={headingReveal.ref} className={`${headingReveal.className} relative flex flex-col items-center gap-3`} style={headingReveal.style}>
          <div className="relative flex flex-col items-center gap-[18px]">
            <SectionKicker>Quem provou</SectionKicker>
            <h2 className="m-0 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 font-serif text-[clamp(40px,5.2vw,72px)] leading-[.95]">
              <span>
                <span ref={countCount.ref}>{countCount.display}</span> avaliações
              </span>
              <span className="text-[.5em] italic leading-none text-gold">de quem já provou.</span>
            </h2>
          </div>
          <span className="flex items-center justify-center gap-2 text-sm font-semibold text-muted">
            <span className="tracking-[2px] text-gold">★★★★★</span>
            Nota <span ref={ratingCount.ref}>{ratingCount.display}</span> no Google
          </span>
        </div>
        <a
          ref={ctaReveal.ref}
          className={`${ctaReveal.className} flex h-[52px] items-center rounded-full bg-cream px-6 font-bold text-bg-ink transition-colors hover:bg-white`}
          style={ctaReveal.style}
          href="https://g.page/r/pani-premium/review"
          target="_blank"
          rel="noopener"
        >
          Avaliar no Google ↗
        </a>
      </div>

      <div
        ref={trackRef}
        {...handlers}
        className="no-scrollbar flex gap-5 overflow-x-auto overflow-y-hidden pb-[clamp(36px,4.5vw,60px)]"
        style={{ paddingLeft: "max(24px, calc((100vw - 1320px) / 2 + 24px))", paddingRight: "max(24px, calc((100vw - 1320px) / 2 + 24px))" }}
      >
        {[0, 1].map((loop) => (
          <div key={loop} data-loop={loop} aria-hidden={loop === 1} className="flex flex-none gap-5">
            {REVIEWS.map((r) => (
              <figure
                key={`${loop}-${r.name}`}
                className="m-0 flex min-h-[280px] w-[min(84vw,420px)] flex-none flex-col justify-between gap-6 rounded-[28px] border border-panel-border-2 bg-panel p-[30px]"
              >
                <blockquote className="m-0 text-balance font-serif text-2xl leading-[1.28]">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-bold text-bg-ink">
                    {r.initial}
                  </span>
                  <span className="flex flex-col">
                    <strong className="text-[15px]">{r.name}</strong>
                    <span className="text-[13px] text-muted">
                      <span className="text-gold">★★★★★</span> · {r.when}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
