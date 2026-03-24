import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const featuredTours = [
  {
    title: "Đà Nẵng - Hội An 3N2Đ",
    description: "Lịch trình cân bằng giữa biển, phố cổ, ăn ngon và nghỉ dưỡng nhẹ nhàng cho cặp đôi hoặc gia đình.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    tag: "Tour nổi bật",
    cta: "Xem lịch trình",
    price: "Từ 3.490.000đ",
    unit: "/ khách"
  },
  {
    title: "Phú Quốc nghỉ dưỡng",
    description: "Phù hợp cho chuyến đi thư giãn với resort sát biển, tour đảo và những buổi chiều ngắm hoàng hôn.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    tag: "Được quan tâm",
    cta: "Khám phá ngay",
    price: "Từ 4.990.000đ",
    unit: "/ khách"
  },
  {
    title: "Hà Giang khám phá",
    description: "Hành trình dành cho người mê cung đường đẹp, homestay view núi và trải nghiệm bản địa đậm chất miền cao.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    tag: "Xu hướng",
    cta: "Xem tour",
    price: "Từ 2.790.000đ",
    unit: "/ khách"
  }
] as const;

export function ProductExplorerSection() {
  return (
    <section className="p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge className="bg-white/80 text-emerald-700 ring-emerald-200">Tour nổi bật</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Những hành trình nổi bật để người dùng nhìn vào là muốn mở tour ngay.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredTours.map((tour) => (
            <Card key={tour.title} className="flex h-full flex-col overflow-hidden pt-0">
              <div className="relative aspect-video overflow-hidden">
                <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" />
              </div>
              <CardHeader className="flex min-h-44 flex-1 flex-col justify-between gap-3">
                <Badge className="w-fit bg-emerald-50 text-emerald-700 ring-emerald-200">{tour.tag}</Badge>
                <div className="space-y-3">
                  <CardTitle className="min-h-14 text-xl">{tour.title}</CardTitle>
                  <CardDescription className="line-clamp-3 min-h-[4.5rem]">{tour.description}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="mt-auto flex-col items-stretch gap-4">
                <div className="flex min-h-14 items-end justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Giá tham khảo</div>
                    <div className="mt-1 text-2xl font-semibold text-slate-950">{tour.price}</div>
                  </div>
                  <div className="text-sm text-slate-500">{tour.unit}</div>
                </div>
                <Button className="w-full rounded-full">{tour.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
