import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { ROUTE_PATHS } from "@/routes/paths";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import {
  BotIcon,
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  MapIcon,
  Settings2Icon,
  ShieldCheckIcon,
  UsersIcon
} from "lucide-react";

const data = {
  teams: [
    {
      name: "Tourism AI",
      logo: <GalleryVerticalEndIcon />,
      plan: "Admin"
    }
  ],
  navMain: [
    {
      title: "Tổng quan",
      url: ROUTE_PATHS.admin,
      icon: <LayoutDashboardIcon />,
      items: [
        { title: "Báo cáo nhanh", url: ROUTE_PATHS.admin },
        { title: "Theo dõi hoạt động", url: ROUTE_PATHS.admin }
      ]
    },
    {
      title: "Người dùng",
      url: ROUTE_PATHS.adminUsers,
      icon: <UsersIcon />,
      items: [
        { title: "Danh sách tài khoản", url: ROUTE_PATHS.adminUsers },
        { title: "Phiên đăng nhập", url: ROUTE_PATHS.adminUsers }
      ]
    },
    {
      title: "Chatbot",
      url: ROUTE_PATHS.adminChatbot,
      icon: <BotIcon />,
      items: [
        { title: "Luồng hội thoại", url: ROUTE_PATHS.adminChatbot },
        { title: "Nội dung trả lời", url: ROUTE_PATHS.adminChatbot }
      ]
    },
    {
      title: "Phân quyền",
      url: ROUTE_PATHS.adminRoles,
      icon: <ShieldCheckIcon />,
      items: [
        { title: "Vai trò hệ thống", url: ROUTE_PATHS.adminRoles },
        { title: "Quyền truy cập", url: ROUTE_PATHS.adminRoles }
      ]
    },
    {
      title: "Cài đặt",
      url: ROUTE_PATHS.adminSettings,
      icon: <Settings2Icon />,
      items: [
        { title: "Cấu hình chung", url: ROUTE_PATHS.adminSettings },
        { title: "Tùy chỉnh giao diện", url: ROUTE_PATHS.adminSettings }
      ]
    }
  ],
  projects: [
    {
      name: "Trang chủ du lịch",
      url: ROUTE_PATHS.home,
      icon: <MapIcon />
    },
    {
      name: "Bảng điều khiển",
      url: ROUTE_PATHS.admin,
      icon: <LayoutDashboardIcon />
    },
    {
      name: "Chatbot khách",
      url: ROUTE_PATHS.home + "#chatbot",
      icon: <BotIcon />
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
