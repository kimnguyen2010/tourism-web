import { useEffect, useState } from "react";

type UseHeroCarouselOptions = {
  count: number;
  intervalMs: number;
};

type UseHeroCarouselResult = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export function useHeroCarousel({ count, intervalMs }: UseHeroCarouselOptions): UseHeroCarouselResult {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (count <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, intervalMs]);

  return {
    activeIndex,
    setActiveIndex
  };
}
