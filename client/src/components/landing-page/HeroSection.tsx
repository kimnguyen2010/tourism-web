import { HERO_AUTOPLAY_INTERVAL_MS, HERO_SLIDES } from "./constants/hero.constants";
import { useHeroCarousel } from "./hooks/useHeroCarousel";
import { FeaturedDestinationCards } from "./FeaturedDestinationCards";

export function HeroSection() {
  const { activeIndex, setActiveIndex } = useHeroCarousel({
    count: HERO_SLIDES.length,
    intervalMs: HERO_AUTOPLAY_INTERVAL_MS
  });

  return (
    <section className="px-6 pb-10 pt-6 md:pb-14 md:pt-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="overflow-hidden rounded-4xl border border-white/60 shadow-2xl shadow-slate-950/12">
          <div className="relative aspect-video w-full">
            {HERO_SLIDES.map((slide, index) => (
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  index === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.28)_100%)]" />
          </div>
        </div>

        <FeaturedDestinationCards items={HERO_SLIDES} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </section>
  );
}

