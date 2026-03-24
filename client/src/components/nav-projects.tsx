import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { ArrowRightIcon, BotIcon, LayoutDashboardIcon, MapIcon, MoreHorizontalIcon } from "lucide-react";

export function NavProjects({
  projects
}: {
  projects: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const { isMobile } = useSidebar();
  const location = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Đi nhanh</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const isActive = item.url !== "#" && location.pathname === item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton render={<Link to={item.url} />} isActive={isActive}>
                {item.icon}
                <span>{item.name}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuAction showOnHover className="aria-expanded:bg-muted" />}>
                  <MoreHorizontalIcon />
                  <span className="sr-only">Thao tác</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 rounded-lg" side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
                  <DropdownMenuItem render={<Link to={item.url} />}>
                    {item.icon ?? <MapIcon className="text-muted-foreground" />}
                    <span>Mở trang</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link to="/admin" />}>
                    <LayoutDashboardIcon className="text-muted-foreground" />
                    <span>Về dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link to="/#chatbot" />}>
                    <BotIcon className="text-muted-foreground" />
                    <span>Mở chatbot</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem>
          <SidebarMenuButton render={<Link to="/admin" />} className="text-sidebar-foreground/70">
            <ArrowRightIcon className="text-sidebar-foreground/70" />
            <span>Xem tất cả</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
