"use client";

import { useUI } from "@/context/UIContext";

export function CookieBanner() {
  const { cookieConsent, acceptCookies, rejectCookies, openModal } = useUI();

  if (cookieConsent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-4 bottom-4 z-[88] flex max-w-[520px] flex-col gap-4 rounded-[22px] border border-cream-line bg-cream-panel p-[22px] text-bg-ink shadow-[0_24px_60px_-20px_rgba(34,21,15,.45)]"
    >
      <p className="m-0 text-[15px] leading-[1.55]">
        Usamos cookies para melhorar sua experiência.{" "}
        <button
          onClick={() => openModal("cookies")}
          className="border-0 bg-transparent p-0 font-bold text-terracotta underline"
        >
          Saiba mais
        </button>
      </p>
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={acceptCookies}
          className="h-11 rounded-full bg-bg px-[22px] text-sm font-bold text-cream"
        >
          Aceitar
        </button>
        <button
          onClick={rejectCookies}
          className="h-11 rounded-full border border-bg bg-transparent px-[22px] text-sm font-bold text-bg"
        >
          Só essenciais
        </button>
      </div>
    </div>
  );
}
