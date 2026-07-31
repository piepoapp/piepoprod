import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout() {
  return (
    <div className="bg-white min-h-screen font-['Geist',sans-serif]">
      <Sidebar />
      <Topbar />
      <main className="ml-[280px] pt-[64px]">
        <Outlet />
      </main>
    </div>
  );
}
