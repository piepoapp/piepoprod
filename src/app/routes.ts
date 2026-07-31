import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./components/DashboardPage";
import { PatientsPage } from "./components/PatientsPage";
import { AgendaPage } from "./components/AgendaPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ProtectedRoute } from "../lib/auth/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignupPage },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "pacientes", Component: PatientsPage },
          { path: "agenda", Component: AgendaPage },
        ],
      },
    ],
  },
]);
