"use client";

import { useReveal } from "@/hooks/useReveal";
import { useStoreStatus } from "@/hooks/useStoreStatus";
import { useUI } from "@/context/UIContext";
import { COMPANY } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

export function Footer() {
  const headingReveal = useReveal<HTMLDivElement>();
  const infoReveal = useReveal<HTMLDivElement>(120);
  const mapReveal = useReveal<HTMLDivElement>(200);
  const { openModal } = useUI();
  const { open, closeHour, isSunday } = useStoreStatus();

  return (
    <footer
      id="contato"
      className="relative z-[1] overflow-hidden border-t border-gold/[.18] text-muted-warm"
      style={{
        background: "linear-gradient(180deg, rgba(34,21,15,0) 0%, rgba(26,16,11,.85) 40%)",
        scrollMarginTop: 72,
      }}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col gap-9 px-6 pb-7 pt-[clamp(36px,4.5vw,60px)]">
        <div className="grid gap-[clamp(28px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div className="flex flex-col gap-8">
            <div ref={headingReveal.ref} className={`${headingReveal.className} flex flex-col gap-[18px]`} style={headingReveal.style}>
              <SectionKicker symmetric={false}>Visite a gente</SectionKicker>
              <h2 className="m-0 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-serif text-[clamp(40px,5.2vw,72px)] leading-[.95] text-cream">
                Onde estamos
                <span className="text-[.5em] italic leading-none text-gold">e como falar conosco.</span>
              </h2>
            </div>

            <div ref={infoReveal.ref} className={`${infoReveal.className} grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]`} style={infoReveal.style}>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold tracking-[.14em] text-muted-warm">ENDEREÇO</span>
                <span className="text-base leading-[1.6] text-cream">
                  {COMPANY.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold tracking-[.14em] text-muted-warm">HORÁRIOS</span>
                <span className="flex justify-between gap-3 text-base" style={{ fontWeight: !isSunday ? 800 : 400, color: !isSunday ? "#D8A24A" : "#F5EEE3" }}>
                  <span>Seg a sáb</span>
                  <span>6h – 21h</span>
                </span>
                <span className="flex justify-between gap-3 text-base" style={{ fontWeight: isSunday ? 800 : 400, color: isSunday ? "#D8A24A" : "#F5EEE3" }}>
                  <span>Domingo</span>
                  <span>6h – 13h</span>
                </span>
                <span className="mt-1 flex items-center gap-2 text-[13px] font-bold text-[#E9DCCB]">
                  <span className={`h-2 w-2 rounded-full ${open ? "bg-[#6FBF73]" : "bg-terracotta"}`} />
                  {open ? `Aberto agora · fecha às ${closeHour}h` : "Fechado agora · abrimos às 6h"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold tracking-[.14em] text-muted-warm">CONTATO</span>
                <a href={`tel:${COMPANY.phoneTel}`} className="text-base text-cream transition-colors hover:text-gold">
                  {COMPANY.phone}
                </a>
                <a href={COMPANY.whatsapp} className="text-base text-cream transition-colors hover:text-gold">
                  WhatsApp (00) 90000-0000
                </a>
                <a href={`mailto:${COMPANY.email}`} className="text-base text-cream transition-colors hover:text-gold">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold tracking-[.14em] text-muted-warm">REDES SOCIAIS</span>
                <div className="mb-3 flex flex-wrap gap-2.5">
                  <SocialIcon href="https://instagram.com/panipremium" label="Instagram">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                  </SocialIcon>
                  <SocialIcon href={COMPANY.whatsapp} label="WhatsApp" fill>
                    <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.7 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.5Z" />
                  </SocialIcon>
                </div>
                <span className="text-xs font-extrabold tracking-[.14em] text-muted-warm">DELIVERY</span>
                <div className="flex flex-wrap gap-2">
                  <a href="https://www.ifood.com.br" target="_blank" rel="noopener" className="rounded-full bg-terracotta px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-terracotta-dark">
                    iFood ↗
                  </a>
                  <a href="https://99app.com/99food" target="_blank" rel="noopener" className="rounded-full bg-cream px-4 py-2.5 text-sm font-bold text-bg-ink transition-colors hover:bg-white">
                    99Food ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div ref={mapReveal.ref} className={`${mapReveal.className} flex min-h-[380px] flex-col gap-3`} style={mapReveal.style}>
            <div className="flex-1 min-h-[300px] w-full rounded-[28px] bg-panel">
              <div className="flex h-full w-full items-center justify-center rounded-[28px] text-center text-sm text-muted-warm">
                Mapa — incorpore o Google Maps aqui
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Pani+Premium"
              target="_blank"
              rel="noopener"
              className="rounded-full bg-cream p-[17px] text-center font-bold text-bg-ink transition-colors hover:bg-white"
            >
              Traçar rota no Google Maps ↗
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-[#3F2A1F] pt-5 text-[13px]">
          <span className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5">
            <span>© {new Date().getFullYear()} {COMPANY.name} · Pães e Conveniências</span>
            <button
              onClick={() => openModal("privacy")}
              className="border-0 bg-transparent p-0 text-muted underline decoration-transparent underline-offset-[3px] transition-colors hover:text-white"
            >
              Política de privacidade
            </button>
            <button
              onClick={() => openModal("cookies")}
              className="border-0 bg-transparent p-0 text-muted underline decoration-transparent underline-offset-[3px] transition-colors hover:text-white"
            >
              Política de cookies
            </button>
          </span>
          <span className="tracking-[3px] text-gold">★★★★★</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  fill,
  children,
}: {
  href: string;
  label: string;
  fill?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      title={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-cream transition-colors hover:border-cream hover:bg-cream hover:text-bg-ink"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={fill ? "currentColor" : "none"}
        stroke={fill ? undefined : "currentColor"}
        strokeWidth={fill ? undefined : 1.8}
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}
