"use client";

import { useUI } from "@/context/UIContext";
import { ORDER_LINKS } from "@/data/site";

export function OrderSheet() {
  const { orderOpen, closeOrder } = useUI();

  if (!orderOpen) return null;

  return (
    <div
      onClick={closeOrder}
      className="fixed inset-0 z-[95] flex items-end justify-center bg-[rgba(20,12,8,.62)] p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Como você quer pedir?"
        className="flex w-full max-w-[460px] flex-col gap-[18px] rounded-t-[28px] bg-cream-panel p-6 text-bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] sm:rounded-[28px]"
        style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="m-0 font-serif text-[32px] leading-none">Como você quer pedir?</h2>
            <span className="text-sm text-ink-muted">Delivery pelos apps ou retirada na loja.</span>
          </div>
          <button
            onClick={closeOrder}
            aria-label="Fechar"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-cream-line bg-white text-base text-bg-ink"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {ORDER_LINKS.map((o) => (
            <a
              key={o.label}
              href={o.href}
              target="_blank"
              rel="noopener"
              onClick={closeOrder}
              className="flex min-h-16 items-center justify-between gap-4 rounded-[18px] px-5 font-extrabold text-[17px] transition-transform hover:-translate-y-0.5"
              style={{ background: o.bg, color: o.fg }}
            >
              <span className="flex flex-col gap-0.5">
                <span>{o.label}</span>
                <span className="text-[13px] font-medium opacity-80">{o.hint}</span>
              </span>
              <span className="text-lg">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
