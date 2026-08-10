import { useState, useEffect } from "react";
import { X, Calendar, Clock, Info, Prohibit } from "@phosphor-icons/react";
import { Combobox } from "../Combobox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarPicker } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { format, parse } from "date-fns";
import { toISODate, type Session } from "../../data/agendaData";

interface Props {
  open: boolean;
  initialDate?: string;
  initialTime?: string;
  sessions: Session[];
  onClose: () => void;
  onSave: (block: Omit<Session, "id">) => void;
}

const reasonPresets = [
  "Almoço",
  "Folga",
  "Reunião",
  "Supervisão",
  "Estudo",
  "Pessoal",
] as const;

const recurrences = ["Única", "Diária", "Seg a sex", "Semanal", "Quinzenal", "Mensal"] as const;

export function BlockTimeModal({
  open,
  initialDate,
  initialTime,
  sessions,
  onClose,
  onSave,
}: Props) {
  const [date, setDate] = useState(initialDate ?? "");
  const [startTime, setStartTime] = useState(initialTime ?? "12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [reason, setReason] = useState<string>("Almoço");
  const [customReason, setCustomReason] = useState("");
  const [recurrence, setRecurrence] = useState<(typeof recurrences)[number]>("Única");

  useEffect(() => {
    if (open) {
      // toISOString() é UTC: à noite, no Brasil, cairia no dia seguinte.
      setDate(initialDate ?? toISODate(new Date()));
      setStartTime(initialTime ?? "12:00");
      setEndTime(addOneHour(initialTime ?? "12:00"));
      setReason("Almoço");
      setCustomReason("");
      setRecurrence("Única");
    }
  }, [open, initialDate, initialTime]);

  if (!open) return null;

  const finalReason = reason === "Outro" ? customReason.trim() : reason;
  const validRange = startTime < endTime;
  const ready = !!date && validRange && !!finalReason;

  const conflict = sessions.find(
    (s) =>
      s.date === date &&
      s.status !== "cancelled" &&
      s.status !== "blocked" &&
      overlap(startTime, endTime, s.startTime, s.endTime),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    onSave({
      patientId: null,
      patientName: finalReason,
      initials: "—",
      date,
      startTime,
      endTime,
      status: "blocked",
      modality: "presencial",
      payment: "free",
      amount: 0,
      recurrence,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[24px]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] w-[520px] max-w-full max-h-[calc(100vh-48px)] flex flex-col px-[24px] py-[32px] animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between w-full mb-[24px]">
          <div className="flex items-center gap-[12px]">
            <div className="size-[40px] rounded-[10px] bg-[#f3f4f6] flex items-center justify-center">
              <Prohibit size={18} weight="bold" className="text-[#4b5563]" />
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
                Bloquear horário
              </p>
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#4b5563]">
                O período ficará indisponível para novos agendamentos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-[40px] rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            <X size={16} weight="bold" className="text-[#75787d]" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto -mx-[24px] px-[24px] flex flex-col gap-[20px] [scrollbar-width:thin]">
          <div className="flex gap-[16px]">
            <Field label="Data" required>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] pl-[16px] pr-[40px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-left text-black outline-none focus:border-[#317dff] transition-colors data-[state=open]:border-[#317dff] cursor-pointer"
                    >
                      {date
                        ? format(parse(date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy")
                        : <span className="text-[#737373]">Selecione uma data</span>}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto p-0 rounded-[12px] border-2 border-[#efefef] shadow-[0px_8px_24px_-8px_rgba(0,0,0,0.12)]"
                  >
                    <CalendarPicker
                      mode="single"
                      locale={ptBR}
                      selected={date ? parse(date, "yyyy-MM-dd", new Date()) : undefined}
                      onSelect={(d) => d && setDate(format(d, "yyyy-MM-dd"))}
                      initialFocus
                      className="font-['Geist',sans-serif]"
                      classNames={{
                        caption_label:
                          "font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black capitalize",
                        nav_button:
                          "size-[28px] rounded-[8px] border-2 border-[#efefef] bg-white hover:bg-[#fafafa] hover:border-[#d4d4d4] flex items-center justify-center transition-colors cursor-pointer",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        head_cell:
                          "w-9 font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#737373] capitalize",
                        cell: "relative p-0 text-center [&:has([aria-selected])]:bg-transparent",
                        day: "size-9 rounded-[8px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-black hover:bg-[#f2f6ff] hover:text-[#317dff] transition-colors cursor-pointer aria-selected:opacity-100",
                        day_selected:
                          "!bg-[#317dff] !text-white hover:!bg-[#2968d9] hover:!text-white focus:!bg-[#317dff] focus:!text-white",
                        day_today: "text-[#317dff] font-medium",
                        day_outside: "text-[#a1a1aa] opacity-60",
                        day_disabled: "text-[#a1a1aa] opacity-40 cursor-not-allowed",
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Calendar
                  size={16}
                  weight="bold"
                  className="text-[#a1a1aa] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Início" required>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    if (e.target.value >= endTime) setEndTime(addOneHour(e.target.value));
                  }}
                  className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] pl-[16px] pr-[40px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black outline-none focus:border-[#317dff] transition-colors"
                />
                <Clock
                  size={16}
                  weight="bold"
                  className="text-[#a1a1aa] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Fim" required>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] pl-[16px] pr-[40px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black outline-none focus:border-[#317dff] transition-colors"
                />
                <Clock
                  size={16}
                  weight="bold"
                  className="text-[#a1a1aa] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </Field>
          </div>

          {!validRange && (
            <div className="flex items-start gap-[10px] w-full bg-[#fef2f2] border border-[#fecaca] rounded-[10px] px-[14px] py-[10px] -mt-[12px]">
              <Info size={16} weight="bold" className="text-[#b91c1c] shrink-0 mt-[2px]" />
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#991b1b]">
                O horário de fim deve ser maior que o de início.
              </p>
            </div>
          )}

          {validRange && conflict && (
            <div className="flex items-start gap-[10px] w-full bg-[#fef9c3] border border-[#fde68a] rounded-[10px] px-[14px] py-[10px] -mt-[12px]">
              <Info size={16} weight="bold" className="text-[#854d0e] shrink-0 mt-[2px]" />
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#854d0e]">
                Existe uma sessão de <span className="font-medium">{conflict.patientName}</span> ({conflict.startTime} – {conflict.endTime}) nesse intervalo.
              </p>
            </div>
          )}

          <Field label="Motivo" required>
            <div className="flex gap-[8px] flex-wrap">
              {[...reasonPresets, "Outro"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setReason(opt)}
                  className={`h-[36px] px-[14px] rounded-full border-2 font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] transition-colors cursor-pointer ${
                    reason === opt
                      ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                      : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {reason === "Outro" && (
              <input
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Descreva o motivo"
                className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] px-[16px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none focus:border-[#317dff] transition-colors mt-[8px]"
              />
            )}
          </Field>

          <Field label="Recorrência" required>
            <Combobox
              value={recurrence}
              onChange={(v) => setRecurrence(v as (typeof recurrences)[number])}
              searchable={false}
              placeholder="Selecione"
              placement="top"
              options={recurrences.map((r) => ({ value: r, label: r }))}
            />
          </Field>
        </div>

        <div className="flex gap-[8px] items-center justify-end w-full pt-[24px] mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] flex items-center justify-center px-[17px] rounded-[8px] border border-[#f5e5f6] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
              Cancelar
            </span>
          </button>
          <button
            type="submit"
            disabled={!ready}
            className={`flex-1 h-[40px] rounded-[8px] flex items-center justify-center gap-[8px] px-[16px] transition-colors ${
              ready ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer" : "bg-[#a9c5ff] cursor-not-allowed"
            }`}
          >
            <Prohibit size={14} weight="bold" className="text-white" />
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#fafafa]">
              Bloquear horário
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-[1_0_0] min-w-0 flex-col gap-[8px]">
      <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black">
        {label} {required && <span className="text-[#fd3939]">*</span>}
      </p>
      {children}
    </div>
  );
}

function addOneHour(t: string) {
  const [h, m] = t.split(":").map(Number);
  const total = h * 60 + m + 60;
  const eh = Math.floor(total / 60) % 24;
  const em = total % 60;
  return `${eh.toString().padStart(2, "0")}:${em.toString().padStart(2, "0")}`;
}

function overlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && bStart < aEnd;
}
