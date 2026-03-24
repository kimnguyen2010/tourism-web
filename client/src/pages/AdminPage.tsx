import { Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTE_PATHS } from "@/routes/paths";

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.auth} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTE_PATHS.home} replace />;
  }

  return (
    <AdminLayout>
      <AdminOverview />
    </AdminLayout>
  );
}
