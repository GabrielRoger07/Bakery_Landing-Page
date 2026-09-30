"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ModalKey } from "@/data/site";

type CookieConsent = "all" | "essential" | null | undefined;

type UIContextValue = {
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  orderOpen: boolean;
  openOrder: () => void;
  closeOrder: () => void;

  modal: ModalKey | null;
  openModal: (key: ModalKey) => void;
  closeModal: () => void;

  cookieConsent: CookieConsent;
  acceptCookies: () => void;
  rejectCookies: () => void;

  scrolled: boolean;
  hideHeader: boolean;
  activeSection: string;
};

const UIContext = createContext<UIContextValue | null>(null);

const SECTION_IDS = [
  "servicos",
  "produtos",
  "sobre",
  "espaco",
  "avaliacoes",
  "vagas",
  "contato",
];

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [modal, setModal] = useState<ModalKey | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent>(undefined);

  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const lastY = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pp_cookie");
      setCookieConsent(stored === "all" || stored === "essential" ? stored : null);
    } catch {
      setCookieConsent(null);
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      raf.current = null;
      const y = window.scrollY;
      const vh = window.innerHeight;

      let hide = hideHeader;
      if (y - lastY.current > 6 && y > vh * 0.8) hide = true;
      else if (lastY.current - y > 6 || y < vh * 0.8) hide = false;
      lastY.current = y;

      let sec = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < vh * 0.4) sec = id;
      }

      setScrolled(y > 40);
      setHideHeader(hide);
      setActiveSection(sec);
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setModal(null);
        setOrderOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((v) => !v);
    setOrderOpen(false);
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const openOrder = useCallback(() => {
    setOrderOpen(true);
    setMenuOpen(false);
  }, []);
  const closeOrder = useCallback(() => setOrderOpen(false), []);

  const openModal = useCallback((key: ModalKey) => setModal(key), []);
  const closeModal = useCallback(() => setModal(null), []);

  const setCookie = useCallback((v: "all" | "essential") => {
    try {
      localStorage.setItem("pp_cookie", v);
    } catch {
      // ignore
    }
    setCookieConsent(v);
  }, []);
  const acceptCookies = useCallback(() => setCookie("all"), [setCookie]);
  const rejectCookies = useCallback(() => setCookie("essential"), [setCookie]);

  const value = useMemo<UIContextValue>(
    () => ({
      menuOpen,
      toggleMenu,
      closeMenu,
      orderOpen,
      openOrder,
      closeOrder,
      modal,
      openModal,
      closeModal,
      cookieConsent,
      acceptCookies,
      rejectCookies,
      scrolled,
      hideHeader,
      activeSection,
    }),
    [
      menuOpen,
      toggleMenu,
      closeMenu,
      orderOpen,
      openOrder,
      closeOrder,
      modal,
      openModal,
      closeModal,
      cookieConsent,
      acceptCookies,
      rejectCookies,
      scrolled,
      hideHeader,
      activeSection,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
