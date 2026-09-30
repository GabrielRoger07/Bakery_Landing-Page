import type { Metadata } from "next";
import { COMPANY } from "@/data/site";

export const metadata: Metadata = {
  title: `Encomendas · ${COMPANY.name}`,
};

export default function EncomendasPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-start justify-center gap-6 px-6 pt-32 pb-24 text-cream">
      <span className="text-xs font-bold uppercase tracking-[.28em] text-gold">Encomendas</span>
      <h1 className="m-0 font-serif text-[clamp(36px,6vw,64px)] leading-[1.02]">
        Bolos, tortas e kits de festa <span className="italic text-gold">sob encomenda.</span>
      </h1>
      <p className="m-0 max-w-[52ch] text-lg leading-[1.7] text-muted">
        Fale com a gente pelo WhatsApp com pelo menos 48h de antecedência e monte o pedido perfeito
        para o seu evento.
      </p>
      <a
        href={COMPANY.whatsapp}
        target="_blank"
        rel="noopener"
        className="flex h-14 items-center rounded-full bg-terracotta px-7 font-bold text-white transition-colors hover:bg-terracotta-dark"
      >
        Encomendar pelo WhatsApp
      </a>
    </div>
  );
}
