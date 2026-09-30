import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { Header } from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import { ProgressBar } from "@/components/ProgressBar";
import { GlowBackground } from "@/components/GlowBackground";
import { OrderSheet } from "@/components/OrderSheet";
import { CookieBanner } from "@/components/CookieBanner";
import { InfoModal } from "@/components/InfoModal";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pani Premium — Pães e Conveniências",
  description:
    "Pão quentinho, mesa farta, todo dia. Padaria, confeitaria, café colonial e almoço em ambiente climatizado.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${dmSerif.variable} ${manrope.variable}`}>
      <body>
        <UIProvider>
          <ProgressBar />
          <Header />
          <MobileMenu />
          <GlowBackground />
          <div className="relative z-[1]">{children}</div>
          <OrderSheet />
          <CookieBanner />
          <InfoModal />
        </UIProvider>
      </body>
    </html>
  );
}
