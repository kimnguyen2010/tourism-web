import { LayoutDashboard, MessageSquareText, Settings, ShieldCheck, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
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
    <Sidebar className="shadow-xl shadow-slate-950/5 dark:shadow-black/20">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-1">
          <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">Admin Console</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Khu vực quản trị hệ thống</p>
          </div>
        </div>
      </SidebarHeader>

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
                    <Link to={item.href}>
                      <SidebarMenuButton isActive={active}>
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
