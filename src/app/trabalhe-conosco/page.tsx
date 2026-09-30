import type { Metadata } from "next";
import { COMPANY } from "@/data/site";

export const metadata: Metadata = {
  title: `Trabalhe conosco · ${COMPANY.name}`,
};

export default function TrabalheConoscoPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-start justify-center gap-6 px-6 pt-32 pb-24 text-cream">
      <span className="text-xs font-bold uppercase tracking-[.28em] text-gold">Vagas</span>
      <h1 className="m-0 font-serif text-[clamp(36px,6vw,64px)] leading-[1.02]">
        Vagas no forno, na confeitaria <span className="italic text-gold">e no salão.</span>
      </h1>
      <p className="m-0 max-w-[52ch] text-lg leading-[1.7] text-muted">
        Envie seu currículo por e-mail com o cargo de interesse no assunto. Retornamos os
        candidatos selecionados em até 5 dias úteis.
      </p>
      <a
        href={`mailto:${COMPANY.email}?subject=Candidatura`}
        className="flex h-14 items-center rounded-full bg-cream px-7 font-bold text-bg-ink transition-colors hover:bg-white"
      >
        Enviar currículo
      </a>
    </div>
  );
}
