import svgPaths from "../../imports/svg-ifwz00yaeh";
import { useLocation, useNavigate } from "react-router";
import { Question, SignOut, DotsThree } from "@phosphor-icons/react";
import { useAuth } from "../../lib/auth/AuthProvider";
import { DropdownMenu } from "./DropdownMenu";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-[8px] w-full p-[12px] rounded-[8px] cursor-pointer transition-colors ${
        active ? "bg-[#ebf2ff]" : "hover:bg-gray-50"
      }`}
    >
      <div className="relative shrink-0 size-[20px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 20 20">
          <path
            d={icon}
            fill={active ? "#317DFF" : "#737185"}
          />
        </svg>
      </div>
      <span
        className={`font-['Geist',sans-serif] font-medium text-[14px] leading-[19.2px] ${
          active ? "text-[#317dff]" : "text-[#737185]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

const mainNavItems = [
  { icon: svgPaths.p267fc080, label: "Início", path: "/" },
  { icon: svgPaths.pc8bd280, label: "Pacientes", path: "/pacientes" },
  { icon: svgPaths.p29425600, label: "Agenda", path: "/agenda" },
  { icon: svgPaths.p67b1a00, label: "Financeiro", path: "/financeiro" },
];

const bottomNavItems = [
  { icon: svgPaths.p1976bb40, label: "Configurações", path: "/configuracoes" },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  function isActive(path: string) {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  }

  return (
    <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-[#e6e6e1] flex flex-col z-10">
      {/* Logo */}
      <div className="h-[64px] shrink-0 px-[16px] flex items-center border-b border-[#e6e6e1] box-border">
        <div className="pl-[8px] flex items-center">
          <p className="font-['Confiteria_Script',sans-serif] font-bold text-[#0055e7] text-[48px] leading-none tracking-[0.96px]">
            o
          </p>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex-1 pt-[32px] px-[16px] overflow-y-auto">
        <nav className="flex flex-col">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-[16px] pb-[24px]">
        <div className="h-px bg-[#e6e6e1] mb-[16px]" />
        <nav className="flex flex-col mb-[16px]">
          {bottomNavItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>
        <div className="h-px bg-[#e6e6e1] mb-[16px]" />

        {/* Profile */}
        <DropdownMenu
          placement="right"
          fullWidth
          trigger={
            <div className="flex items-center gap-[12px] w-full p-[4px] rounded-[8px] hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="size-[32px] rounded-full bg-[#ebf2ff] flex items-center justify-center shrink-0">
                <span className="font-['Geist',sans-serif] font-medium text-[13px] leading-[1] text-[#317dff]">
                  {getInitials(user?.user_metadata?.full_name ?? "Psicólogo(a)")}
                </span>
              </div>
              <div className="flex flex-col min-w-0 text-left flex-1">
                <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[1.5] text-black truncate">
                  {user?.user_metadata?.full_name ?? "Psicólogo(a)"}
                </span>
                <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[1.5] text-[#737185] truncate">
                  {user?.email ?? ""}
                </span>
              </div>
              <DotsThree size={20} weight="bold" className="text-[#737185] shrink-0" />
            </div>
          }
          items={[
            {
              label: "Suporte",
              icon: <Question size={16} weight="bold" />,
              onClick: () => navigate("/suporte"),
            },
            {
              label: "Sair",
              icon: <SignOut size={16} weight="bold" />,
              onClick: handleLogout,
              destructive: true,
              separatorBefore: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
