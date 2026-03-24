import { MapPinned, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardFooter, CardTitle } from "../ui/card";

type DestinationCardItem = {
  title: string;
  tag: string;
  meta: string;
  image: string;
  alt: string;
};

type FeaturedDestinationCardsProps = {
  items: readonly DestinationCardItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function FeaturedDestinationCards({ items, activeIndex, onSelect }: FeaturedDestinationCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <Card
            key={item.title}
            className={`overflow-hidden p-0 transition ${
              isActive
                ? "border-slate-900/30 bg-slate-950 text-white shadow-xl shadow-slate-950/12 dark:border-sky-400/20 dark:bg-slate-900"
                : "border-white/70 bg-white/75 text-slate-800 shadow-lg shadow-slate-950/5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-800/85 dark:text-slate-100"
            }`}
          >
            <button type="button" onClick={() => onSelect(index)} className="flex h-full w-full flex-col text-left">
              <div className="relative aspect-[4/2.35] overflow-hidden">
                <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
                <div className={`absolute inset-0 ${isActive ? "bg-black/38" : "bg-black/22 dark:bg-black/28"}`} />
                <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  <Sparkles className="size-3" />
                  {item.tag}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <CardTitle className={isActive ? "min-h-[84px] text-white" : "min-h-[84px] text-slate-950 dark:text-slate-100"}>{item.title}</CardTitle>
                <div className={`mt-3 inline-flex min-h-5 items-center gap-2 text-sm ${isActive ? "text-white/72" : "text-slate-500 dark:text-slate-300"}`}>
                  <MapPinned className="size-4 shrink-0" />
                  <span>{item.meta}</span>
                </div>

                <CardFooter className="mt-auto justify-between gap-3 p-0 pt-5">
                  <div className={`text-sm font-medium ${isActive ? "text-white/74" : "text-slate-500 dark:text-slate-300"}`}>Lịch trình nổi bật</div>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`rounded-full ${isActive ? "bg-white/10 text-white hover:bg-white/18 dark:bg-white/12 dark:text-white" : "text-slate-700 dark:text-slate-100"}`}
                  >
                    Xem
                  </Button>
                </CardFooter>
              </div>
            </button>
          </Card>
        );
      })}
    </div>
  );
}
