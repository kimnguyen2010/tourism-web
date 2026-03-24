import { Facebook, Instagram, MapPinned, Phone, Plane, Send } from "lucide-react";

const footerLinks = {
  "Khám phá": ["Tour trong nước", "Nghỉ dưỡng biển", "Du lịch gia đình", "Đi cuối tuần"],
  "Dịch vụ": ["Tư vấn lịch trình", "Đặt tour", "Combo vé + khách sạn", "Chăm sóc sau đặt chỗ"],
  "Hỗ trợ": ["Câu hỏi thường gặp", "Chính sách hoàn huỷ", "Liên hệ tư vấn", "Điều khoản sử dụng"]
} as const;

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200/70 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 px-6 py-10 md:grid-cols-[1.1fr_repeat(3,0.8fr)] md:px-8 md:py-12 xl:px-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 text-white">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-sky-300">
                <Plane className="size-5" />
              </div>
              <div>
                <p className="text-lg font-semibold">Tourism Assistant</p>
                <p className="text-sm text-white/60">Nền tảng du lịch gợi ý theo nhu cầu thực tế</p>
              </div>
            </div>
            <div className="space-y-3 text-sm leading-6 text-white/70">
              <p className="grid grid-cols-[16px_1fr] items-center gap-2">
                <MapPinned className="size-4 shrink-0 text-emerald-300" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </p>
              <p className="grid grid-cols-[16px_1fr] items-center gap-2">
                <Phone className="size-4 shrink-0 text-sky-300" />
                <span className="whitespace-nowrap">1900 6868</span>
              </p>
              <p className="grid grid-cols-[16px_1fr] items-center gap-2">
                <Send className="size-4 shrink-0 text-rose-300" />
                <span>hello@tourismassistant.vn</span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <button className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 hover:text-white" aria-label="Instagram">
                <Instagram className="size-4" />
              </button>
              <button className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/20 hover:text-white" aria-label="Facebook">
                <Facebook className="size-4" />
              </button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">{title}</h3>
              <ul className="space-y-3 text-sm text-white/70">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:px-8 xl:px-10">
          <p>© 2026 Tourism Assistant. Gợi ý du lịch thông minh cho hành trình của bạn.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-white">Chính sách bảo mật</a>
            <a href="#" className="transition hover:text-white">Điều khoản sử dụng</a>
            <a href="#" className="transition hover:text-white">Liên hệ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
