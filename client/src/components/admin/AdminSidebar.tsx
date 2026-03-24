import { LayoutDashboard, MessageSquareText, Search, Settings, ShieldCheck, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator
} from "@/components/ui/sidebar";

const adminItems = [
  { label: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { label: "Người dùng", href: "/admin/users", icon: Users },
  { label: "Chatbot", href: "/admin/chatbot", icon: MessageSquareText },
  { label: "Phân quyền", href: "/admin/roles", icon: ShieldCheck },
  { label: "Cài đặt", href: "/admin/settings", icon: Settings }
] as const;

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">Admin Console</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Khu vực quản trị hệ thống</p>
          </div>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <SidebarInput className="pl-9" placeholder="Tìm nhanh trong quản trị" />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Điều hướng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton render={<Link to={item.href} />} isActive={active} tooltip={item.label}>
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-3 py-3 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
          Quản lý người dùng, phân quyền và cấu hình chatbot trong cùng một khu vực riêng.
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
