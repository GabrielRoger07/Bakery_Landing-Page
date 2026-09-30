"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { buildTimeline, BEFORE_AFTER, COMPANY } from "@/data/site";
import { SectionKicker } from "@/components/SectionKicker";

const STEPS = buildTimeline(COMPANY.foundedYear);
const YEARS = new Date().getFullYear() - COMPANY.foundedYear;

export function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState(0);
  const [fading, setFading] = useState(false);
  const [pinned, setPinned] = useState(false);

  const headingReveal = useReveal<HTMLDivElement>();
  const tabsReveal = useReveal<HTMLDivElement>(100);
  const visualReveal = useReveal<HTMLDivElement>(200);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (min-height: 680px)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goStep = useCallback(
    (i: number, fromScroll = false) => {
      const n = Math.max(0, Math.min(3, i));
      const sec = sectionRef.current;
      if (!fromScroll && sec && pinned) {
        const top = sec.getBoundingClientRect().top + window.scrollY;
        const span = sec.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + span * ((n + 0.5) / 4), behavior: "smooth" });
        return;
      }
      if (n === stepRef.current || n === targetRef.current) return;
      targetRef.current = n;
      setFading(true);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => {
        targetRef.current = null;
        setStep(n);
        setFading(false);
      }, 200);
    },
    [pinned],
  );

  useEffect(() => {
    if (pinned) return;
    if (lineRef.current) lineRef.current.style.width = `calc((100% - 24px) * ${step / 3})`;
  }, [step, pinned]);

  useEffect(() => {
    if (!pinned) return;
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const q = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const p = Math.min(1, Math.max(0, (q * 4 - 0.5) / 3));
      const n = Math.min(3, Math.floor(q * 4));
      if (n !== stepRef.current) goStep(n, true);
      if (lineRef.current) lineRef.current.style.width = `calc((100% - 24px) * ${p})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pinned, goStep]);

  const cur = STEPS[step];

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative"
      style={{ scrollMarginTop: 0, height: pinned ? "360vh" : "auto" }}
    >
      <div
        className="flex flex-col justify-center overflow-hidden"
        style={{
          position: pinned ? "sticky" : "relative",
          top: 0,
          height: pinned ? "100vh" : "auto",
        }}
      >
        {pinned ? (
          <span
            aria-hidden="true"
            className="absolute left-[clamp(10px,1.6vw,28px)] top-1/2 flex -translate-y-1/2 rotate-180 items-center gap-3.5 whitespace-nowrap text-xs font-bold uppercase tracking-[.32em] text-gold"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="h-12 w-px bg-gold" />
            Nossa história · desde {COMPANY.foundedYear}
            <span className="h-12 w-px bg-gold" />
          </span>
        ) : null}

        <div
          className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 px-6"
          style={{ padding: pinned ? "84px 24px 28px" : "64px 24px" }}
        >
          <div
            ref={headingReveal.ref}
            className={`${headingReveal.className} flex flex-wrap items-center justify-between gap-4`}
            style={headingReveal.style}
          >
            <div className="flex flex-col gap-[18px]">
              <SectionKicker symmetric={false}>Sobre nós</SectionKicker>
              <h2 className="m-0 text-balance font-serif text-[clamp(30px,4.4vw,48px)] leading-[1.05]">
                Começamos com um forno.{" "}
                <span className="italic text-gold">{YEARS} anos depois…</span>
              </h2>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => goStep(step - 1)}
                aria-label="Capítulo anterior"
                disabled={step === 0}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-line text-cream transition-colors hover:bg-cream hover:text-bg disabled:opacity-35"
              >
                ←
              </button>
              <button
                onClick={() => goStep(step + 1)}
                aria-label="Próximo capítulo"
                disabled={step === 3}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold text-bg-ink transition-colors hover:bg-gold-light disabled:opacity-35"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={tabsReveal.ref}
            className={`${tabsReveal.className} relative grid grid-cols-4 pt-3.5`}
            style={tabsReveal.style}
            role="tablist"
            aria-label="Linha do tempo"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") goStep(step + 1);
              if (e.key === "ArrowLeft") goStep(step - 1);
            }}
          >
            <div className="absolute left-3 right-3 top-[26px] h-0.5 rounded-full bg-panel-border-2" />
            <div ref={lineRef} className="absolute left-3 top-[26px] h-0.5 w-0 rounded-full bg-gold transition-[width] duration-200 [transition-timing-function:linear]" />
            {STEPS.map((s, i) => (
              <button
                key={s.year + s.short}
                role="tab"
                aria-selected={i === step}
                onClick={() => goStep(i)}
                className="relative flex flex-col gap-3.5 border-0 bg-transparent p-0 pr-2 text-left text-cream"
              >
                <span
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 bg-bg transition-transform duration-500"
                  style={{
                    borderColor: i <= step ? "#D8A24A" : "#5A4033",
                    transform: i === step ? "scale(1.25)" : "scale(1)",
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-full transition-colors duration-500"
                    style={{ background: i <= step ? "#D8A24A" : "transparent" }}
                  />
                </span>
                <span
                  className="font-serif text-[clamp(26px,3vw,40px)] leading-none transition-colors duration-500"
                  style={{ color: i === step ? "#D8A24A" : i < step ? "#F5EEE3" : "#7A6556" }}
                >
                  {s.year}
                </span>
                <span
                  className="max-w-[18ch] text-[13px] font-bold leading-[1.35] transition-colors duration-500"
                  style={{ color: i === step ? "#F5EEE3" : "#9C8676" }}
                >
                  {s.short}
                </span>
              </button>
            ))}
          </div>

          <div
            ref={visualReveal.ref}
            className={`${visualReveal.className} grid grid-cols-1 items-center gap-6 lg:gap-14`}
            style={{ ...visualReveal.style, gridTemplateColumns: pinned ? "1.1fr 1fr" : undefined }}
          >
            <div
              className="relative overflow-hidden rounded-[28px] bg-panel"
              style={{ height: pinned ? "min(46vh,460px)" : undefined }}
            >
              <div className={pinned ? "" : "h-[70vw] md:h-[420px]"}>
                {STEPS.slice(0, 3).map((s, i) => (
                  <div
                    key={s.year}
                    className="absolute inset-0 transition-[opacity,transform] duration-1000"
                    style={{
                      opacity: step === i ? 1 : 0,
                      transform: step === i ? "scale(1)" : "scale(1.06)",
                      pointerEvents: step === i ? "auto" : "none",
                      transitionDuration: "800ms, 1200ms",
                    }}
                  >
                    <Image src={s.photo.img} alt={s.photoAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </div>
                ))}
                <BeforeAfterSlider active={step === 3} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[5px] bg-[rgba(34,21,15,.25)]">
                <div
                  className="h-full bg-gold transition-[width] duration-700"
                  style={{ width: `${((step + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
            <div
              className="flex flex-col gap-[22px] transition-[opacity,transform] duration-500"
              style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(10px)" : "none" }}
            >
              <span className="text-[13px] font-extrabold text-gold">Capítulo {step + 1} de 4</span>
              <h3 className="m-0 font-serif text-[clamp(32px,3.6vw,48px)] leading-[1.02]">{cur.title}</h3>
              <p className="m-0 max-w-[480px] text-balance text-[17px] leading-[1.7] text-muted">{cur.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSlider({ active }: { active: boolean }) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const [ba, setBa] = useState(50);

  const setFromEvent = useCallback((clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    setBa(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={boxRef}
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none" }}
    >
      <Image src={BEFORE_AFTER.after.img} alt={BEFORE_AFTER.after.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - ba}% 0 0)` }}>
        <Image src={BEFORE_AFTER.before.img} alt={BEFORE_AFTER.before.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left: `${ba}%` }}
      />
      <button
        aria-label="Arraste para comparar"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          dragging.current = true;
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromEvent(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        className="absolute top-1/2 flex h-14 w-14 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border-0 bg-white font-extrabold text-bg-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,.4)]"
        style={{ left: `${ba}%`, touchAction: "none", cursor: "ew-resize" }}
      >
        ‹ ›
      </button>
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-bg px-3 py-1.5 text-xs font-bold text-cream">
        Antes
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-terracotta px-3 py-1.5 text-xs font-bold text-white">
        Depois
      </span>
    </div>
  );
}
