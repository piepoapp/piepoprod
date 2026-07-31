import { useEffect, useRef, useState } from "react";
import {
  X,
  Coffee,
  BookOpen,
  Briefcase,
  AirplaneTilt,
  Brain,
  Check,
} from "@phosphor-icons/react";
import { timeToMinutes, type Session } from "../../data/agendaData";

interface Props {
  date: string;
  time: string;
  hourHeight: number;
  startHour: number;
  onSave: (block: Omit<Session, "id">) => void;
  onClose: () => void;
}

const presets = [
  { label: "Almoço", icon: Coffee },
  { label: "Pausa", icon: Coffee },
  { label: "Reunião", icon: Briefcase },
  { label: "Estudo", icon: BookOpen },
  { label: "Foco", icon: Brain },
  { label: "Folga", icon: AirplaneTilt },
] as const;

const durations = ["30min", "1h", "2h"] as const;
type Duration = (typeof durations)[number];

const recurrences = ["Não repete", "Toda semana", "Seg a sex", "Todo dia"] as const;
type RecurrenceLabel = (typeof recurrences)[number];

export function QuickBlockPanel({
  date,
  time,
  hourHeight,
  startHour,
  onSave,
  onClose,
}: Props) {
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState<Duration>("1h");
  const [recurrence, setRecurrence] = useState<RecurrenceLabel>("Não repete");
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const top = ((timeToMinutes(time) - startHour * 60) / 60) * hourHeight;

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  function commit(label: string) {
    if (!label.trim()) return;
    const minutes = duration === "30min" ? 30 : duration === "2h" ? 120 : 60;
    onSave({
      patientId: null,
      patientName: label.trim(),
      initials: "—",
      date,
      startTime: time,
      endTime: addMinutes(time, minutes),
      status: "blocked",
      modality: "presencial",
      payment: "free",
      amount: 0,
      recurrence:
        recurrence === "Não repete"
          ? "Única"
          : recurrence === "Toda semana"
          ? "Semanal"
          : recurrence === "Seg a sex"
          ? "Seg a sex"
          : "Diária",
    });
  }

  return (
    <div
      ref={rootRef}
      style={{ top }}
      className="absolute left-[4px] w-[320px] max-w-[calc(100vw-48px)] bg-white rounded-[12px] border-2 border-[#317dff] shadow-[0px_12px_28px_-8px_rgba(0,0,0,0.18)] p-[14px] flex flex-col gap-[12px] z-30 animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-[8px]">
        <input
          ref={inputRef}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit(reason);
            }
          }}
          placeholder="Bloquear como... (ex: Almoço)"
          className="flex-1 h-[40px] bg-white rounded-[10px] border-2 border-[#efefef] px-[12px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none focus:border-[#317dff] transition-colors"
        />
        <button
          type="button"
          onClick={onClose}
          className="size-[36px] rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer shrink-0"
          aria-label="Fechar"
        >
          <X size={14} weight="bold" className="text-[#75787d]" />
        </button>
      </div>

      <div className="flex flex-wrap gap-[6px]">
        {presets.map((p) => {
          const Icon = p.icon;
          const active = reason === p.label;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setReason(p.label);
                commit(p.label);
              }}
              className={`h-[30px] px-[10px] rounded-full border flex items-center gap-[6px] cursor-pointer transition-colors ${
                active
                  ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                  : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
              }`}
            >
              <Icon size={12} weight="bold" />
              <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px]">
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-[6px]">
        <span className="font-['Geist',sans-serif] font-normal text-[11px] leading-[14px] text-[#737185] uppercase tracking-wide w-[60px] shrink-0">
          Duração
        </span>
        <div className="flex gap-[4px]">
          {durations.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`h-[28px] px-[10px] rounded-[8px] border cursor-pointer transition-colors ${
                duration === d
                  ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                  : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
              }`}
            >
              <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px]">
                {d}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[6px]">
        <span className="font-['Geist',sans-serif] font-normal text-[11px] leading-[14px] text-[#737185] uppercase tracking-wide w-[60px] shrink-0">
          Repetir
        </span>
        <div className="flex flex-wrap gap-[4px]">
          {recurrences.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRecurrence(r)}
              className={`h-[28px] px-[10px] rounded-[8px] border cursor-pointer transition-colors ${
                recurrence === r
                  ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                  : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
              }`}
            >
              <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px]">
                {r}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => commit(reason)}
        disabled={!reason.trim()}
        className={`h-[36px] rounded-[8px] flex items-center justify-center gap-[6px] transition-colors ${
          reason.trim()
            ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
            : "bg-[#a9c5ff] cursor-not-allowed"
        }`}
      >
        <Check size={14} weight="bold" className="text-white" />
        <span className="font-['Geist',sans-serif] font-medium text-[13px] leading-[16px] text-white">
          Bloquear horário
        </span>
      </button>
    </div>
  );
}

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const eh = Math.floor(total / 60) % 24;
  const em = total % 60;
  return `${eh.toString().padStart(2, "0")}:${em.toString().padStart(2, "0")}`;
}
