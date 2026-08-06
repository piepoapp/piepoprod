import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthProvider";
import { OnboardingSkeleton, PageSkeleton } from "../../app/components/skeletons";

const ONBOARDING_PATH = "/onboarding";

export function ProtectedRoute() {
  const { user, loading, profile, profileLoading } = useAuth();
  const { pathname } = useLocation();

  if (loading || (user && profileLoading)) {
    // O esqueleto precisa ser o do destino, e não o do app inteiro: quem vem
    // do cadastro está indo para o onboarding, não para o Dashboard.
    return pathname === ONBOARDING_PATH ? <OnboardingSkeleton /> : <PageSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se o perfil não carregou, seguimos em frente em vez de prender o usuário
  // numa tela de onboarding que talvez ele já tenha concluído.
  const needsOnboarding = profile ? !profile.onboardingCompletedAt : false;

  if (needsOnboarding && pathname !== ONBOARDING_PATH) {
    return <Navigate to={ONBOARDING_PATH} replace />;
  }

  if (!needsOnboarding && pathname === ONBOARDING_PATH) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
