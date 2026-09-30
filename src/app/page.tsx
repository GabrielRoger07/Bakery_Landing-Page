import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Services } from "@/components/Services";
import { Products } from "@/components/Products";
import { About } from "@/components/About";
import { Space } from "@/components/Space";
import { Reviews } from "@/components/Reviews";
import { Jobs } from "@/components/Jobs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <StatsBar />
      <Services />
      <Products />
      <About />
      <Space />
      <Reviews />
      <Jobs />
      <Footer />
    </main>
  );
}
