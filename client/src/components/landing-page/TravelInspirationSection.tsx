import { ArrowUpRight, BookOpenText, Clock3 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

const stories = [
  {
    title: "Lịch trình Đà Lạt 3 ngày 2 đêm cho cặp đôi",
    meta: "4 phút đọc",
    copy: "Chọn điểm chill, khung giờ săn mây và quán cà phê hợp cho một chuyến đi nhẹ nhàng."
  },
  {
    title: "Ngân sách Phú Quốc 2 người cần chuẩn bị bao nhiêu?",
    meta: "5 phút đọc",
    copy: "Từ vé máy bay, resort, tour 4 đảo đến các bữa ăn hải sản và chi phí phát sinh thường gặp."
  },
  {
    title: "Nha Trang hay Đà Nẵng cho kỳ nghỉ gia đình?",
    meta: "6 phút đọc",
    copy: "So nhanh mức độ dễ đi, độ phong phú hoạt động và trải nghiệm biển phù hợp cho trẻ nhỏ."
  }
] as const;

export function TravelInspirationSection() {
  return (
    <section className="px-6 pb-24 pt-6 md:pb-32">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <Badge className="bg-white/80 text-rose-700 ring-rose-200">Cảm hứng & nội dung</Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Thêm nội dung truyền cảm hứng để landing page có chiều sâu, không bị một màn hình là hết.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <Card
              key={story.title}
              className="group flex h-full flex-col border-slate-200/70 bg-white/82 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="gap-6">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <BookOpenText className="size-4 text-sky-500" />
                    Cẩm nang du lịch
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4" />
                    {story.meta}
                  </span>
                </div>
                <CardTitle className="min-h-20 text-2xl">{story.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm leading-7 text-slate-600">{story.copy}</p>
              </CardContent>
              <CardFooter>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                  Đọc tiếp
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
