import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";
import { PageSkeleton } from "../../app/components/skeletons";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
