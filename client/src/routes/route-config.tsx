import type { RouteObject } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import { ROUTE_PATHS } from "./paths";

export const routes: RouteObject[] = [
  { path: ROUTE_PATHS.home, element: <HomePage /> },
  { path: ROUTE_PATHS.auth, element: <AuthPage /> },
  { path: ROUTE_PATHS.admin, element: <AdminPage /> },
  { path: ROUTE_PATHS.adminUsers, element: <AdminPage /> },
  { path: ROUTE_PATHS.adminChatbot, element: <AdminPage /> },
  { path: ROUTE_PATHS.adminRoles, element: <AdminPage /> },
  { path: ROUTE_PATHS.adminSettings, element: <AdminPage /> },
  { path: ROUTE_PATHS.notFound, element: <div className="p-6 text-sm text-slate-600 dark:text-slate-300">404 - Trang không tồn tại</div> }
];
