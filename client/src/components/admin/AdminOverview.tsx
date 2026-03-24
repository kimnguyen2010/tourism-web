import { Bot, ShieldCheck, UserRound, WalletCards } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Người dùng", value: "1.248", icon: UserRound },
  { label: "Phiên chat", value: "8.932", icon: Bot },
  { label: "Tài khoản admin", value: "12", icon: ShieldCheck },
  { label: "Gói đang dùng", value: "Pro", icon: WalletCards }
] as const;

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-100">Trang quản trị</h1>
        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
          Theo dõi nhanh trạng thái người dùng, chatbot và các cấu hình quan trọng của hệ thống.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</CardTitle>
                <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-200">
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-slate-950 dark:text-slate-100">{item.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Khu vực quản trị đã sẵn sàng</CardTitle>
        </CardHeader>
        <CardContent className="pb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Mình đã tổ chức layout admin riêng trong `components/admin` để bạn có thể tiếp tục thêm dashboard, bảng user,
          phân quyền hoặc cấu hình chatbot mà không làm bẩn landing page.
        </CardContent>
      </Card>
    </div>
  );
}
