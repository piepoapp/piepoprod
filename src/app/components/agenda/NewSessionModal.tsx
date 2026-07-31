import { useState, useEffect } from "react";
import { X, Calendar, Clock, Info, VideoCamera, Copy, Check, CheckCircle } from "@phosphor-icons/react";
import { Combobox } from "../Combobox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarPicker } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { format, parse } from "date-fns";
import { patients } from "../../data/mockData";
import { sessions, type Session } from "../../data/agendaData";

interface Props {
  open: boolean;
  initialDate?: string;
  initialTime?: string;
  initialPatientId?: string;
  onClose: () => void;
  onSave: (session: Omit<Session, "id">) => void;
}

const durations = [
  { value: "30", label: "30 minutos" },
  { value: "50", label: "50 minutos" },
  { value: "60", label: "60 minutos" },
  { value: "90", label: "90 minutos" },
];

const recurrences = ["Única", "Diária", "Seg a sex", "Semanal", "Quinzenal", "Mensal"] as const;

export function NewSessionModal({
  open,
  initialDate,
  initialTime,
  initialPatientId,
  onClose,
  onSave,
}: Props) {
  const [patientId, setPatientId] = useState(initialPatientId ?? "");
  const [date, setDate] = useState(initialDate ?? "");
  const [time, setTime] = useState(initialTime ?? "09:00");
  const [duration, setDuration] = useState("50");
  const [modality, setModality] = useState<"online" | "presencial">("online");
  const [confirmation, setConfirmation] = useState<{
    patientName: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingLink?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [recurrence, setRecurrence] = useState<(typeof recurrences)[number]>("Semanal");
  const [amount, setAmount] = useState("220");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setPatientId(initialPatientId ?? "");
      setDate(initialDate ?? new Date().toISOString().slice(0, 10));
      setTime(initialTime ?? "09:00");
      setDuration("50");
      setModality("online");
      setConfirmation(null);
      setCopied(false);
      setRecurrence("Semanal");
      setAmount("220");
      setNotes("");
    }
  }, [open, initialDate, initialTime, initialPatientId]);

  if (!open) return null;

  const endTime = computeEnd(time, parseInt(duration, 10));
  const conflict = sessions.find(
    (s) =>
      s.date === date &&
      s.status !== "cancelled" &&
      overlap(time, endTime, s.startTime, s.endTime),
  );
  const patient = patients.find((p) => p.id === patientId);
  const ready = !!patientId && !!date && !!time;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || !patient) return;
    const generatedLink = modality === "online" ? generateMeetLink() : undefined;
    onSave({
      patientId: patient.id,
      patientName: patient.name,
      initials: patient.initials,
      date,
      startTime: time,
      endTime,
      status: "pending",
      modality,
      payment: "pending",
      amount: parseFloat(amount.replace(",", ".")) || 0,
      recurrence,
      notes: notes.trim() || undefined,
      meetingProvider: modality === "online" ? "meet" : undefined,
      meetingLink: generatedLink,
    });
    setConfirmation({
      patientName: patient.name,
      date,
      startTime: time,
      endTime,
      meetingLink: generatedLink,
    });
  }

  if (confirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-[24px]">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative bg-white rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] w-[480px] max-w-full flex flex-col px-[24px] py-[32px] animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-[16px] right-[16px] size-[40px] rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer"
          >
            <X size={16} weight="bold" className="text-[#75787d]" />
          </button>

          <div className="flex flex-col items-center text-center gap-[12px] mb-[24px]">
            <div className="size-[56px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
              <CheckCircle size={32} weight="bold" className="text-[#10b981]" />
            </div>
            <p className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
              Sessão agendada
            </p>
            <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#4b5563]">
              {confirmation.patientName} · {format(parse(confirmation.date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy")} · {confirmation.startTime}–{confirmation.endTime}
            </p>
          </div>

          {confirmation.meetingLink && (
            <div className="flex flex-col gap-[12px] bg-[#fafafa] rounded-[12px] border-2 border-[#efefef] p-[16px] mb-[24px]">
              <div className="flex items-center gap-[8px]">
                <VideoCamera size={16} weight="bold" className="text-[#317dff]" />
                <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black">
                  Link do Google Meet
                </p>
              </div>
              <div className="flex gap-[8px]">
                <input
                  type="text"
                  readOnly
                  value={confirmation.meetingLink}
                  className="flex-1 h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] px-[16px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#317dff] outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(confirmation.meetingLink!);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  }}
                  className="h-[44px] px-[14px] rounded-[12px] border-2 border-[#efefef] bg-white hover:border-[#d4d4d4] transition-colors cursor-pointer flex items-center gap-[6px]"
                >
                  {copied ? (
                    <>
                      <Check size={14} weight="bold" className="text-[#10b981]" />
                      <span className="font-['Geist',sans-serif] font-medium text-[13px] leading-[16px] text-[#047857]">
                        Copiado
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} weight="bold" className="text-[#363636]" />
                      <span className="font-['Geist',sans-serif] font-medium text-[13px] leading-[16px] text-[#363636]">
                        Copiar
                      </span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#737373]">
                O link será enviado ao paciente junto com a confirmação da sessão.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="h-[40px] rounded-[8px] flex items-center justify-center gap-[8px] px-[16px] bg-[#317dff] hover:bg-[#2968d9] transition-colors cursor-pointer"
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#fafafa]">
              Concluir
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[24px]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] w-[560px] max-w-full max-h-[calc(100vh-48px)] flex flex-col px-[24px] py-[32px] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Head */}
        <div className="flex items-center justify-between w-full mb-[24px]">
          <div className="flex flex-col gap-[6px]">
            <p className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
              Nova sessão
            </p>
            <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#4b5563]">
              Agende uma sessão para um paciente existente
            </p>
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
          {/* Patient */}
          <Field label="Paciente" required>
            <Combobox
              value={patientId}
              onChange={setPatientId}
              placeholder="Buscar paciente..."
              searchPlaceholder="Buscar por nome..."
              options={patients
                .filter((p) => p.status === "ativo")
                .map((p) => ({ value: p.id, label: p.name }))}
            />
          </Field>

          {/* Date & time */}
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
                        caption_label: "font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black capitalize",
                        nav_button:
                          "size-[28px] rounded-[8px] border-2 border-[#efefef] bg-white hover:bg-[#fafafa] hover:border-[#d4d4d4] flex items-center justify-center transition-colors cursor-pointer",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        head_cell:
                          "w-9 font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#737373] capitalize",
                        cell: "relative p-0 text-center [&:has([aria-selected])]:bg-transparent",
                        day: "size-9 rounded-[8px] font-['Geist',sans-serif] font-medium text-[13px] leading-[16px] text-black hover:bg-[#f2f6ff] hover:text-[#317dff] transition-colors cursor-pointer aria-selected:opacity-100",
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
            <Field label="Horário" required>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] pl-[16px] pr-[40px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black outline-none focus:border-[#317dff] transition-colors"
                />
                <Clock
                  size={16}
                  weight="bold"
                  className="text-[#a1a1aa] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </Field>
            <Field label="Duração" required>
              <Combobox
                value={duration}
                onChange={setDuration}
                searchable={false}
                placeholder="Selecione"
                options={durations}
              />
            </Field>
          </div>

          {conflict && (
            <div className="flex items-start gap-[10px] w-full bg-[#fef2f2] border border-[#fecaca] rounded-[10px] px-[14px] py-[10px] -mt-[12px]">
              <Info size={16} weight="bold" className="text-[#b91c1c] shrink-0 mt-[2px]" />
              <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#991b1b]">
                Conflito com <span className="font-medium">{conflict.patientName}</span> ({conflict.startTime} – {conflict.endTime}).
              </p>
            </div>
          )}

          {/* Modality */}
          <Field label="Formato" required>
            <div className="flex gap-[8px]">
              {[
                { value: "online", label: "Online" },
                { value: "presencial", label: "Presencial" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setModality(opt.value as "online" | "presencial")}
                  className={`flex-1 h-[44px] rounded-[12px] border-2 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] transition-colors cursor-pointer ${
                    modality === opt.value
                      ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                      : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Meet notice (online only) */}
          {modality === "online" && (
            <div className="flex items-start gap-[10px] bg-[#f2f6ff] border border-[#c7dbff] rounded-[10px] px-[14px] py-[10px]">
              <VideoCamera size={16} weight="bold" className="text-[#317dff] shrink-0 mt-[2px]" />
              <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#1e3a8a]">
                Um link do <span className="font-medium">Google Meet</span> será gerado automaticamente ao salvar a sessão.
              </p>
            </div>
          )}

          {/* Recurrence */}
          <Field label="Recorrência" required>
            <div className="flex gap-[8px] flex-wrap">
              {recurrences.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRecurrence(opt)}
                  className={`h-[36px] px-[14px] rounded-full border-2 font-['Geist',sans-serif] font-medium text-[13px] leading-[16px] transition-colors cursor-pointer ${
                    recurrence === opt
                      ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                      : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Valor da sessão (R$)">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="220,00"
              className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] px-[16px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none focus:border-[#317dff] transition-colors"
            />
          </Field>

          <Field label="Observações" optional>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas sobre a sessão (visível apenas para você)"
              className="w-full h-[80px] bg-white rounded-[12px] border-2 border-[#efefef] px-[16px] py-[12px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none focus:border-[#317dff] transition-colors resize-none"
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
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#fafafa]">
              Salvar sessão
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
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-[1_0_0] min-w-0 flex-col gap-[8px]">
      <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black">
        {label} {required && <span className="text-[#fd3939]">*</span>}
        {optional && <span className="text-[#a29e9e]">(opcional)</span>}
      </p>
      {children}
    </div>
  );
}

function computeEnd(start: string, durationMin: number) {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + durationMin;
  const eh = Math.floor(total / 60) % 24;
  const em = total % 60;
  return `${eh.toString().padStart(2, "0")}:${em.toString().padStart(2, "0")}`;
}

function overlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && bStart < aEnd;
}

function generateMeetLink() {
  const seg = (n: number) =>
    Array.from({ length: n }, () =>
      "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)],
    ).join("");
  return `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
}