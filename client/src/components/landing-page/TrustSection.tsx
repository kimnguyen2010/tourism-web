import * as React from "react";
import { BellRing, ReceiptText, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";

const trustItems = [
  {
    title: "Giá trị rõ ràng",
    description: "Mỗi gợi ý đều bám theo ngân sách, thời gian và mục đích chuyến đi.",
    content: "Người dùng không chỉ thấy điểm đến đẹp, mà còn hiểu vì sao lịch trình đó hợp với nhu cầu thật của họ.",
    icon: ReceiptText
  },
  {
    title: "Cập nhật linh hoạt",
    description: "Có thể đổi điểm đến, rút ngắn lịch trình hoặc tăng trải nghiệm ngay trong cuộc chat.",
    content: "Điều này giúp trải nghiệm giống một trợ lý du lịch thật hơn là một biểu mẫu tư vấn cứng nhắc.",
    icon: BellRing
  },
  {
    title: "Cảm giác an tâm",
    description: "Thông tin được trình bày mạch lạc để khách biết bước tiếp theo cần làm gì.",
    content: "Khách sẽ dễ đi tiếp đến bước đặt tour, đặt phòng hoặc liên hệ tư vấn vì đã có bức tranh rõ ràng hơn.",
    icon: ShieldCheck
  }
] as const;

const VISIBLE_CARD_COUNT = 3;

function TrustCard({ item }: { item: (typeof trustItems)[number] }) {
  const Icon = item.icon;

  return (
    <Card size="sm" className="m-px flex h-full w-full flex-col border-slate-200/70 bg-white/90">
      <CardHeader className="gap-4 p-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="inline-flex shrink-0 rounded-2xl bg-slate-950 p-3 text-white shadow-lg shadow-slate-950/10">
            <Icon className="size-5" />
          </div>
          <div className="flex min-h-14 flex-1 items-center gap-3">
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pb-6">
        <CardDescription className="min-h-16">{item.description}</CardDescription>
        <p className="min-h-28 text-sm leading-7 text-slate-600">{item.content}</p>
      </CardContent>
    </Card>
  );
}

export function TrustSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const shouldUseCarousel = trustItems.length > VISIBLE_CARD_COUNT;

  React.useEffect(() => {
    if (!shouldUseCarousel || !api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, shouldUseCarousel]);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Lý do khách tin tưởng</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Những giá trị nên được nhìn thấy thật nhanh, gọn và rõ trên landing page.
          </h2>
        </div>

        {shouldUseCarousel ? (
          <div className="w-full">
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {trustItems.map((item) => (
                  <CarouselItem key={item.title} className="flex md:basis-1/2 lg:basis-1/3">
                    <TrustCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="py-3 text-center text-sm text-slate-500">
              Thẻ {current} / {count}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => (
              <TrustCard key={item.title} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
