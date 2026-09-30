"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { COMPANY, ph } from "@/data/site";

const FORNO = ph("D");

export function StatsBar() {
  const reveal = useReveal<HTMLDivElement>();
  const years = new Date().getFullYear() - COMPANY.foundedYear;
  const yearsCount = useCountUp<HTMLSpanElement>(years);
  const productsCount = useCountUp<HTMLSpanElement>(120);
  const itemsCount = useCountUp<HTMLSpanElement>(40);

  return (
    <section className="relative z-[3] px-6 pt-8 md:pt-10">
      <div
        ref={reveal.ref}
        className={`${reveal.className} mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-x-0 gap-y-5 rounded-[28px] border border-panel-border bg-panel p-[18px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] sm:grid-cols-2 md:p-6`}
        style={reveal.style}
      >
        <div className="flex items-center gap-4 pr-0 md:gap-6 md:pr-6">
          <div className="relative aspect-square w-[84px] flex-none overflow-hidden rounded-[20px] md:w-[110px]">
            <Image src={FORNO.img} alt="Forno / fornada" fill sizes="120px" className="object-cover" />
          </div>
          <p className="m-0 text-balance font-serif text-[clamp(22px,2.2vw,30px)] leading-[1.15] text-cream">
            Da primeira fornada, às 6h,{" "}
            <span className="italic text-gold">ao último cafezinho do dia.</span>
          </p>
        </div>
        <div className="grid grid-cols-3 py-2">
          <Stat refEl={yearsCount.ref} value={yearsCount.display} label="anos de mercado" />
          <Stat refEl={productsCount.ref} value={productsCount.display} suffix="+" label="produtos feitos aqui" />
          <Stat refEl={itemsCount.ref} value={itemsCount.display} label="itens no café colonial" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  refEl,
  value,
  suffix,
  label,
}: {
  refEl: React.RefObject<HTMLSpanElement | null>;
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2 border-l border-panel-border px-4 md:px-8">
      <span className="font-serif text-[clamp(40px,4.4vw,60px)] leading-[.9] text-cream">
        <span ref={refEl}>{value}</span>
        {suffix ? <span className="text-gold">{suffix}</span> : null}
      </span>
      <span className="text-[13px] leading-[1.4] text-muted">{label}</span>
    </div>
  );
}
