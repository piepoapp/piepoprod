import svgPaths from "../../imports/svg-ifwz00yaeh";
import { useState, useEffect, useRef } from "react";

interface StatusCardProps {
  label: string;
  value: string | number;
  description: string;
  iconPath: string;
  iconColor: string;
  iconBg: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    prevRef.current = to;
    const duration = 500;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display.toLocaleString("pt-BR")}</>;
}

function StatusCard({ label, value, description, iconPath, iconColor, iconBg }: StatusCardProps) {
  return (
    <div className="flex-1 bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] min-w-0 hover:shadow-md transition-shadow duration-200 cursor-default">
      <div className="flex gap-[8px] items-start p-[24px]">
        <div className="flex flex-col gap-[12px] flex-1 min-w-0">
          <div className="flex flex-col gap-[12px]">
            <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#6b7280]">
              {label}
            </p>
            <p className="font-['Geist',sans-serif] font-bold text-[32px] leading-[24px] text-[#111827]">
              <AnimatedNumber value={typeof value === "number" ? value : parseInt(String(value))} />
            </p>
          </div>
          <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#939393]">
            {description}
          </p>
        </div>
        <div
          className="shrink-0 flex items-center justify-center p-[8px] rounded-[6px]"
          style={{ backgroundColor: iconBg }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d={iconPath} fill={iconColor} />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface StatusCardsProps {
  patients: number;
  patientsDesc: string;
  scheduled: number;
  scheduledDesc: string;
  completed: number;
  completedDesc: string;
  rescheduled: number;
  rescheduledDesc: string;
}

export function StatusCards({
  patients,
  patientsDesc,
  scheduled,
  scheduledDesc,
  completed,
  completedDesc,
  rescheduled,
  rescheduledDesc,
}: StatusCardsProps) {
  const cards: StatusCardProps[] = [
    {
      label: "Pacientes em acompanhamento",
      value: patients,
      description: patientsDesc,
      iconPath: svgPaths.p16d6a180,
      iconColor: "#2563EB",
      iconBg: "#ebf2ff",
    },
    {
      label: "Sessões agendadas",
      value: scheduled,
      description: scheduledDesc,
      iconPath: svgPaths.p43a0080,
      iconColor: "#8E51FF",
      iconBg: "#f3e7fe",
    },
    {
      label: "Sessões realizadas",
      value: completed,
      description: completedDesc,
      iconPath: svgPaths.p1466a080,
      iconColor: "#05DF72",
      iconBg: "rgba(0,153,102,0.1)",
    },
    {
      label: "Sessões remarcadas",
      value: rescheduled,
      description: rescheduledDesc,
      iconPath: svgPaths.pd712180,
      iconColor: "#E7000B",
      iconBg: "rgba(231,0,11,0.1)",
    },
  ];

  return (
    <div className="flex gap-[16px] w-full">
      {cards.map((card) => (
        <StatusCard key={card.label} {...card} />
      ))}
    </div>
  );
}