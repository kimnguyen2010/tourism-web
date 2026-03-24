import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("Sidebar components phải được dùng bên trong SidebarProvider.");
  }

  return context;
}

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
};

function SidebarProvider({ className, defaultOpen = true, children, ...props }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      toggleSidebar: () => setOpen((current) => !current)
    }),
    [open]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-provider"
        className={cn("group/sidebar-wrapper flex min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva(
  "border-r border-slate-200/80 bg-white/90 text-slate-700 backdrop-blur-md transition-all duration-200 dark:border-slate-800 dark:bg-slate-950/85 dark:text-slate-200",
  {
    variants: {
      collapsible: {
        offcanvas: "translate-x-0 group-data-[sidebar-collapsed=true]/sidebar-wrapper:-translate-x-full md:translate-x-0",
        none: "translate-x-0"
      }
    },
    defaultVariants: {
      collapsible: "offcanvas"
    }
  }
);

type SidebarProps = React.ComponentProps<"aside"> & VariantProps<typeof sidebarVariants>;

function Sidebar({ className, collapsible, children, ...props }: SidebarProps) {
  const { open } = useSidebar();

  return (
    <aside
      data-slot="sidebar"
      data-state={open ? "expanded" : "collapsed"}
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-72 shrink-0 flex-col md:static md:translate-x-0",
        sidebarVariants({ collapsible }),
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      data-slot="sidebar-trigger"
      onClick={toggleSidebar}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900",
        className
      )}
      {...props}
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Mở hoặc đóng thanh bên</span>
    </button>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-inset" className={cn("flex min-w-0 flex-1 flex-col", className)} {...props} />;
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-4 border-b border-slate-200/80 p-4 dark:border-slate-800", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn("flex flex-1 flex-col gap-5 overflow-y-auto p-4", className)} {...props} />;
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="sidebar-group" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn("px-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500", className)}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex list-none flex-col gap-1.5", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("list-none", className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition outline-none",
  {
    variants: {
      isActive: {
        true: "bg-sky-50 text-sky-700 shadow-sm dark:bg-sky-950/40 dark:text-sky-200",
        false: "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
      }
    },
    defaultVariants: {
      isActive: false
    }
  }
);

type SidebarMenuButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    asChild?: boolean;
  };

function SidebarMenuButton({ className, isActive, asChild = false, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? SlotLike : "button";

  return <Comp data-slot="sidebar-menu-button" className={cn(sidebarMenuButtonVariants({ isActive }), className)} {...props} />;
}

function SlotLike({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={className} {...props} />;
}

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
};
