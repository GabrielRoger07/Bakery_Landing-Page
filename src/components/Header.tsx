"use client";

import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { NAV, COMPANY } from "@/data/site";

export function Header() {
  const { menuOpen, toggleMenu, scrolled, hideHeader, activeSection, openOrder } = useUI();

  const showSolidBg = scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] text-cream transition-[background-color,transform] duration-500 ${
        showSolidBg ? "bg-bg" : "bg-transparent"
      } ${hideHeader && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-3.5">
        <a
          href="#topo"
          aria-label={`${COMPANY.name} — início`}
          className="flex flex-none flex-col items-start leading-none text-cream"
        >
          <span className="text-[9px] tracking-[4px] text-gold">★★★★★</span>
          <span className="mt-[3px] font-serif text-2xl">{COMPANY.name}</span>
        </a>

        <nav
          aria-label="Principal"
          className="hidden min-w-0 items-center gap-4 lg:flex lg:gap-6"
        >
          {NAV.map((n) => {
            const active = n.href.startsWith("#") && activeSection === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                className={`relative whitespace-nowrap py-3 text-[13px] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-1.5 after:h-[1.5px] after:origin-left after:bg-gold after:transition-transform after:duration-300 hover:text-white lg:text-sm ${
                  active ? "text-white after:scale-x-100" : "text-[#E9DCCB] after:scale-x-0"
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-none items-center gap-2.5">
          <Link
            href="/encomendas"
            className="hidden h-11 items-center rounded-full border border-cream/35 px-[18px] text-sm font-bold text-cream transition-colors hover:border-cream hover:text-white lg:flex"
          >
            Encomendas
          </Link>
          <button
            onClick={openOrder}
            className="flex h-11 items-center rounded-full bg-terracotta px-5 text-sm font-bold text-white transition-colors hover:bg-terracotta-dark"
          >
            Pedir
          </button>
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/35 text-cream lg:hidden"
          >
            <span className="flex flex-col gap-1">
              <span
                className={`block h-[1.5px] w-4 bg-cream transition-transform ${
                  menuOpen ? "translate-y-[2.75px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-cream transition-transform ${
                  menuOpen ? "-translate-y-[2.75px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
