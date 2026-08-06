import svgPaths from "../../imports/svg-ifwz00yaeh";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { notifications as initialNotifications, patients, type Notification } from "../data/mockData";

const typeColors: Record<Notification["type"], string> = {
  session: "#317DFF",
  cancel: "#E7000B",
  new: "#05DF72",
  reminder: "#F5A14B",
};

function PageHeading() {
  const { pathname } = useLocation();
  if (pathname === "/pacientes") {
    return null;
  }
  return <div />;
}

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="fixed top-0 left-[280px] right-0 h-[64px] bg-white border-b border-[#e6e6e1] z-30 flex items-center justify-between px-[40px]">
      <PageHeading />
      <div className="relative ml-auto" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-[8px] cursor-pointer relative rounded-[8px] hover:bg-[#f3f4f6] transition-colors"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d={svgPaths.p183ed280} fill="#4D4C57" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-[4px] right-[4px] size-[16px] bg-[#E7000B] rounded-full flex items-center justify-center">
              <span className="font-['Geist',sans-serif] font-medium text-[12px] text-white leading-none">
                {unreadCount}
              </span>
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] bg-white rounded-[12px] shadow-lg z-50">
            <div className="p-[16px] border-b border-[#e5e7eb] flex items-center justify-between">
              <span className="font-['Geist',sans-serif] font-medium text-[16px] text-[#111827]">
                Notificações
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="font-['Geist',sans-serif] font-medium text-[14px] text-[#317dff] hover:underline cursor-pointer"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {notifs.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`w-full text-left px-[16px] py-[14px] flex gap-[12px] items-start cursor-pointer transition-colors hover:bg-[#f9fafb] ${
                    !n.read ? "bg-[#f8faff]" : ""
                  }`}
                >
                  <div
                    className="size-[8px] rounded-full shrink-0 mt-[6px]"
                    style={{ backgroundColor: n.read ? "#d1d5db" : typeColors[n.type] }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                    <div className="flex items-center justify-between gap-[8px]">
                      <span className={`font-['Geist',sans-serif] text-[14px] leading-[20px] truncate ${!n.read ? "font-medium text-[#111827]" : "font-normal text-[#6b7280]"}`}>
                        {n.title}
                      </span>
                      <span className="font-['Geist',sans-serif] font-normal text-[12px] text-[#939393] whitespace-nowrap shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#939393] truncate">
                      {n.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div aria-hidden="true" className="absolute border border-[#e4e4e7] inset-0 pointer-events-none rounded-[12px]" />
          </div>
        )}
      </div>
    </div>
  );
}