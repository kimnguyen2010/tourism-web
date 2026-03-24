import { Compass, LogOut, Menu, Moon, Search, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTE_PATHS } from "../../routes/paths";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

const navItems = ["Điểm đến", "Tour du lịch", "Trải nghiệm", "Cẩm nang"] as const;

export function Header() {
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const avatarLetter = useMemo(() => user?.name?.trim().charAt(0).toUpperCase() || "T", [user?.name]);
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    await logout();
    navigate(ROUTE_PATHS.home);
  }

  function toggleTheme() {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  }

  return (
    <header className="sticky top-0 z-40 px-6 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-2.5 shadow-lg shadow-slate-950/5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-950 p-1.5 text-white shadow-sm shadow-slate-950/10 dark:bg-slate-100 dark:text-slate-950">
            <Compass className="size-4" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-950 dark:text-slate-100">Tourism AI</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Lên kế hoạch chuyến đi dễ hơn</div>
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">
          {navItems.map((item) => (
            <button key={item} type="button" className="transition hover:text-slate-950 dark:hover:text-slate-100">
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden rounded-full text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100 md:inline-flex">
            <Search className="size-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full" onClick={toggleTheme} aria-label="Chuyển chế độ sáng tối">
            {mounted && activeTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="hidden items-center rounded-full px-3 md:inline-flex">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-sky-900 text-xs font-semibold text-white dark:bg-sky-400 dark:text-slate-950">
                    {avatarLetter}
                  </span>
                  <span className="max-w-28 truncate leading-none">{user?.name ?? "Tài khoản"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-sky-900 text-sm font-semibold text-white dark:bg-sky-400 dark:text-slate-950">
                      {avatarLetter}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
                      <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                {isAdmin ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.admin)}>
                      <ShieldCheck className="size-4" />
                      Quản trị
                    </DropdownMenuItem>
                  </>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void handleLogout()}>
                  <LogOut className="size-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="secondary" className="hidden rounded-full px-4 md:inline-flex" onClick={() => navigate(ROUTE_PATHS.auth)}>
              Đăng nhập
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden dark:text-slate-200">
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
