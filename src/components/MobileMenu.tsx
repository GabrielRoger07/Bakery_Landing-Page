"use client";

import { useUI } from "@/context/UIContext";
import { NAV, COMPANY } from "@/data/site";
import { useStoreStatus } from "@/hooks/useStoreStatus";

export function MobileMenu() {
  const { menuOpen, closeMenu } = useUI();

  return (
    <div
      aria-hidden={!menuOpen}
      className={`fixed inset-0 z-[85] overflow-auto bg-bg text-cream transition-[opacity,visibility] duration-500 ${
        menuOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="mx-auto grid min-h-full max-w-[1320px] items-end gap-12 px-6 pb-12 pt-[120px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <nav className="flex flex-col">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={closeMenu}
              className="flex items-baseline gap-[18px] py-1.5 font-serif text-[clamp(40px,6vw,76px)] leading-[1.05] text-cream transition-[transform,opacity,color] duration-700 hover:text-gold"
              style={{
                transitionDelay: menuOpen ? `${120 + i * 50}ms` : "0ms",
                transform: menuOpen ? "none" : "translateY(30px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <span className="min-w-[24px] font-sans text-[13px] font-bold text-muted-warm">
                {String(i + 1).padStart(2, "0")}
              </span>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-7 pb-3 text-[15px] leading-relaxed text-muted">
          <StatusLine />
          <div>
            {COMPANY.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </div>
          <div className="flex flex-col">
            <a href={`tel:${COMPANY.phoneTel}`} className="text-cream">
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="text-cream">
              {COMPANY.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Instagram", "https://instagram.com/panipremium"],
              ["Facebook", "https://facebook.com/panipremium"],
              ["TikTok", "https://tiktok.com/@panipremium"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-line px-4 py-[9px] font-semibold text-cream transition-colors hover:border-cream hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusLine() {
  const { open, closeHour } = useStoreStatus();

  return (
    <div className="flex items-center gap-2.5 font-bold text-cream">
      <span
        className={`h-2 w-2 rounded-full ${open ? "bg-[#6FBF73]" : "bg-terracotta"}`}
      />
      {open ? `Aberto agora · fecha às ${closeHour}h` : "Fechado agora · abrimos às 6h"}
    </div>
  );
}
