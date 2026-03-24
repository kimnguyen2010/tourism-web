import type { HeroSlide } from "../landing-page.types";

export const HERO_AUTOPLAY_INTERVAL_MS = 4500;

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    title: "Phú Quốc cho kỳ nghỉ nghỉ dưỡng, sunset và resort sát biển.",
    tag: "Nghỉ dưỡng biển",
    meta: "4 ngày 3 đêm · Resort + tour đảo",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    alt: "Bãi biển xanh trong cho kỳ nghỉ du lịch"
  },
  {
    title: "Đà Nẵng - Hội An đẹp như tranh cho city break cuối tuần.",
    tag: "Nghỉ ngắn ngày",
    meta: "3 ngày 2 đêm · Biển + phố cổ",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80",
    alt: "Phố cổ lung linh cho chuyến đi cuối tuần"
  },
  {
    title: "Hà Giang loop cho ai mê cung đường đẹp và trải nghiệm bản địa.",
    tag: "Hành trình miền núi",
    meta: "4 ngày 3 đêm · Núi + homestay",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1800&q=80",
    alt: "Cung đường núi đẹp cho hành trình khám phá"
  }
] as const;
