import { FloatingChat } from "../chat";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { HeroSection } from "./HeroSection";
import { ProductExplorerSection } from "./ProductExplorerSection";
import { TravelInspirationSection } from "./TravelInspirationSection";
import { TrustSection } from "./TrustSection";

export default function TourismLandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#f8fbff_52%,#ecfeff_100%)] text-slate-900 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_52%,#082f49_100%)] dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(255,208,90,0.24),transparent_28%),radial-gradient(circle_at_88%_16%,rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(52,211,153,0.14),transparent_24%)] dark:bg-[radial-gradient(circle_at_16%_18%,rgba(14,165,233,0.16),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(45,212,191,0.14),transparent_22%),radial-gradient(circle_at_78%_72%,rgba(59,130,246,0.16),transparent_24%)]" />
      <Header />
      <HeroSection />
      <ProductExplorerSection />
      <TrustSection />
      <TravelInspirationSection />
      <Footer />
      <FloatingChat />
    </main>
  );
}
