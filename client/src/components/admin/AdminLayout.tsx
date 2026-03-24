import type { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f1f5f9_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <div className="border-b border-slate-200/70 px-6 py-4 dark:border-slate-800 md:hidden">
            <SidebarTrigger />
          </div>
          <section className="flex-1 px-6 py-6 md:px-8">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
