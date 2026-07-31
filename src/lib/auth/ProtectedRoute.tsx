import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="font-['Geist',sans-serif] text-[14px] text-[#75787d]">Carregando...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
