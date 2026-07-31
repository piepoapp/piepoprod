import svgPaths from "../../imports/svg-ifwz00yaeh";
import { useState, useRef, useEffect } from "react";
import { StatusCards } from "./StatusCards";
import { AppointmentsList } from "./AppointmentsList";
import { WeeklyChart } from "./WeeklyChart";
import { getDashboardData } from "../data/mockData";

const periodOptions = [
  { label: "Ultimas 24h", value: "24h" },
  { label: "Últimos 7 dias", value: "7d" },
  { label: "Últimos 30 dias", value: "30d" },
  { label: "Últimos 90 dias", value: "90d" },
  { label: "Últimos 365 dias", value: "365d" },
];

export function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7d");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const data = getDashboardData(selectedPeriod);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-[24px] p-[32px]">
      {/* Header */}
      <div className="flex items-end justify-between gap-[4px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-['Geist',sans-serif] font-bold leading-[38.4px] tracking-[-0.75px] text-[#111827] text-[28px]">
            Olá, Mariana 👋
          </h1>
          <p className="font-['Geist',sans-serif] font-normal text-[16px] leading-[19.2px] text-[#6b7280]">
            {new Date()
              .toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/^\w/, (c) => c.toUpperCase())}
          </p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center gap-[8px] bg-white rounded-[8px] px-[12px] py-[9px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer h-[40px] border ${
              isOpen ? "border-[#317dff]" : "border-[#e4e4e7]"
            }`}
          >
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.p25cf7300} fill="#7D7D7D" />
              </svg>
            </div>
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#6b7280] whitespace-nowrap">
              {periodOptions.find((o) => o.value === selectedPeriod)?.label ?? "Selecione o período"}
            </span>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[200px] bg-white rounded-[8px]">
              <div className="flex flex-col gap-[4px] items-start justify-center overflow-clip p-[8px] rounded-[8px]">
                {periodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedPeriod(option.value);
                      setIsOpen(false);
                    }}
                    className={`h-[40px] w-full rounded-[8px] shrink-0 cursor-pointer ${
                      selectedPeriod === option.value ? "bg-[#f2f6ff]" : "hover:bg-[#f5f5f5]"
                    }`}
                  >
                    <div className="flex items-center p-[12px] size-full">
                      <p
                        className={`flex-[1_0_0] font-['Geist',sans-serif] font-medium leading-[19.2px] text-[14px] text-left ${
                          selectedPeriod === option.value ? "text-[#2a99ff]" : "text-[#515155]"
                        }`}
                      >
                        {option.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <StatusCards
        patients={data.patients}
        patientsDesc={data.patientsDesc}
        scheduled={data.scheduled}
        scheduledDesc={data.scheduledDesc}
        completed={data.completed}
        completedDesc={data.completedDesc}
        rescheduled={data.rescheduled}
        rescheduledDesc={data.rescheduledDesc}
      />

      {/* Content Overview */}
      <div className="flex gap-[16px] items-start w-full">
        <AppointmentsList appointments={data.appointments} />
        <WeeklyChart data={data.chart} />
      </div>
    </div>
  );
}