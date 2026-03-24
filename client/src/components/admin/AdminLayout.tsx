import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const adminPageMeta: Record<string, { section: string; title: string }> = {
  "/admin": { section: "Quản trị", title: "Tổng quan" },
  "/admin/users": { section: "Quản trị", title: "Người dùng" },
  "/admin/chatbot": { section: "Quản trị", title: "Chatbot" },
  "/admin/roles": { section: "Quản trị", title: "Phân quyền" },
  "/admin/settings": { section: "Quản trị", title: "Cài đặt" }
};

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const currentMeta = adminPageMeta[location.pathname] ?? { section: "Quản trị", title: "Trang" };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{currentMeta.section}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentMeta.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
