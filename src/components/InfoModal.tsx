"use client";

import { useUI } from "@/context/UIContext";
import { MODALS } from "@/data/site";

export function InfoModal() {
  const { modal, closeModal } = useUI();

  if (!modal) return null;
  const content = MODALS[modal];

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[99] flex items-center justify-center bg-[rgba(34,21,15,.6)] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        className="flex max-h-[85vh] w-full max-w-[640px] flex-col gap-[18px] overflow-auto rounded-3xl bg-cream-panel p-9 text-bg-ink"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="m-0 font-serif text-[36px] leading-[1.05]">{content.title}</h2>
          <button
            onClick={closeModal}
            aria-label="Fechar"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-cream-line bg-white text-lg"
          >
            ✕
          </button>
        </div>
        {content.body.map((b) => (
          <div key={b.h} className="flex flex-col gap-1.5">
            <h3 className="m-0 text-base font-extrabold">{b.h}</h3>
            <p className="m-0 text-[15px] leading-[1.65] text-ink-muted">{b.p}</p>
          </div>
        ))}
        <span className="text-[13px] text-[#6E5A4E]">
          Última atualização: setembro de 2026 · LGPD (Lei 13.709/2018).
        </span>
      </div>
    </div>
  );
}
