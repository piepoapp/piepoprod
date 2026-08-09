import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./components/DashboardPage";
import { PatientsPage } from "./components/PatientsPage";
import { PatientRecordPage } from "./components/prontuario/PatientRecordPage";
import { AgendaPage } from "./components/AgendaPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { OnboardingPage } from "./components/onboarding/OnboardingPage";
import { ProtectedRoute } from "../lib/auth/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignupPage },
  { path: "/esqueci-senha", Component: ForgotPasswordPage },
  { path: "/redefinir-senha", Component: ResetPasswordPage },
  { path: "/termos", Component: TermsPage },
  { path: "/privacidade", Component: PrivacyPage },
  {
    Component: ProtectedRoute,
    children: [
      // Fora do Layout: onboarding é tela cheia, sem sidebar nem topbar.
      { path: "/onboarding", Component: OnboardingPage },
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "pacientes", Component: PatientsPage },
          { path: "pacientes/:id", Component: PatientRecordPage },
          { path: "agenda", Component: AgendaPage },
        ],
      },
    ],
  },
]);
