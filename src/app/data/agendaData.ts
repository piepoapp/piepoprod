import { patients, type Patient } from "./mockData";

export type SessionStatus =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "first"
  | "blocked";

export type SessionPayment = "paid" | "pending" | "overdue" | "covenio" | "free";

export type SessionModality = "online" | "presencial";

export interface Session {
  id: string;
  patientId: string | null;
  patientName: string;
  initials: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  status: SessionStatus;
  modality: SessionModality;
  payment: SessionPayment;
  amount: number;
  recurrence: "Única" | "Diária" | "Seg a sex" | "Semanal" | "Quinzenal" | "Mensal";
  notes?: string;
  meetingProvider?: "meet" | "zoom";
  meetingLink?: string;
}

export const statusMeta: Record<
  SessionStatus,
  { label: string; bg: string; border: string; text: string; dot: string; soft: string }
> = {
  confirmed: {
    label: "Confirmada",
    bg: "bg-[#ecfdf5]",
    border: "border-[#10b981]",
    text: "text-[#047857]",
    dot: "bg-[#10b981]",
    soft: "bg-[#d1fae5]",
  },
  pending: {
    label: "Aguardando confirmação",
    bg: "bg-[#fef9c3]",
    border: "border-[#eab308]",
    text: "text-[#854d0e]",
    dot: "bg-[#eab308]",
    soft: "bg-[#fef3c7]",
  },
  cancelled: {
    label: "Cancelada",
    bg: "bg-[#fef2f2]",
    border: "border-[#ef4444]",
    text: "text-[#b91c1c]",
    dot: "bg-[#ef4444]",
    soft: "bg-[#fee2e2]",
  },
  first: {
    label: "Primeira consulta",
    bg: "bg-[#f5f3ff]",
    border: "border-[#8b5cf6]",
    text: "text-[#6d28d9]",
    dot: "bg-[#8b5cf6]",
    soft: "bg-[#ede9fe]",
  },
  blocked: {
    label: "Bloqueio",
    bg: "bg-[#f3f4f6]",
    border: "border-[#9ca3af]",
    text: "text-[#4b5563]",
    dot: "bg-[#9ca3af]",
    soft: "bg-[#e5e7eb]",
  },
};

export const paymentMeta: Record<
  SessionPayment,
  { label: string; bg: string; text: string }
> = {
  paid: { label: "Pago", bg: "bg-[#ecfdf5]", text: "text-[#047857]" },
  pending: { label: "Pendente", bg: "bg-[#fef9c3]", text: "text-[#854d0e]" },
  overdue: { label: "Em atraso", bg: "bg-[#fef2f2]", text: "text-[#b91c1c]" },
  covenio: { label: "Convênio", bg: "bg-[#eff6ff]", text: "text-[#1d4ed8]" },
  free: { label: "Gratuita", bg: "bg-[#f3f4f6]", text: "text-[#4b5563]" },
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromISODate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

export function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function buildMockSessions(): Session[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const monday = startOfWeek(today);
  const sessions: Session[] = [];

  type Slot = {
    patientIdx: number;
    dayOffset: number;
    start: string;
    end: string;
    status: SessionStatus;
    modality: SessionModality;
    payment: SessionPayment;
    amount: number;
    recurrence: Session["recurrence"];
    notes?: string;
  };

  const slots: Slot[] = [
    // Previous week
    { patientIdx: 0, dayOffset: -7, start: "09:00", end: "09:50", status: "confirmed", modality: "online", payment: "paid", amount: 220, recurrence: "Semanal" },
    { patientIdx: 1, dayOffset: -6, start: "10:00", end: "10:50", status: "confirmed", modality: "online", payment: "paid", amount: 200, recurrence: "Semanal" },
    { patientIdx: 4, dayOffset: -5, start: "14:00", end: "14:50", status: "cancelled", modality: "presencial", payment: "pending", amount: 250, recurrence: "Semanal" },
    // This week
    { patientIdx: 0, dayOffset: 0, start: "09:00", end: "09:50", status: "confirmed", modality: "online", payment: "paid", amount: 220, recurrence: "Semanal", notes: "Revisar evolução do mês" },
    { patientIdx: 5, dayOffset: 0, start: "10:30", end: "11:20", status: "first", modality: "presencial", payment: "pending", amount: 250, recurrence: "Única", notes: "Primeira consulta — anamnese inicial" },
    { patientIdx: 6, dayOffset: 0, start: "14:00", end: "14:50", status: "confirmed", modality: "online", payment: "covenio", amount: 180, recurrence: "Semanal" },
    { patientIdx: 10, dayOffset: 0, start: "16:00", end: "16:50", status: "pending", modality: "online", payment: "pending", amount: 220, recurrence: "Semanal" },
    { patientIdx: 1, dayOffset: 1, start: "09:00", end: "09:50", status: "confirmed", modality: "online", payment: "paid", amount: 200, recurrence: "Semanal" },
    { patientIdx: 2, dayOffset: 1, start: "11:00", end: "11:50", status: "confirmed", modality: "presencial", payment: "paid", amount: 240, recurrence: "Quinzenal" },
    { patientIdx: 4, dayOffset: 1, start: "15:00", end: "15:50", status: "pending", modality: "presencial", payment: "pending", amount: 250, recurrence: "Semanal" },
    { patientIdx: 11, dayOffset: 2, start: "08:00", end: "08:50", status: "confirmed", modality: "online", payment: "paid", amount: 200, recurrence: "Semanal" },
    { patientIdx: 3, dayOffset: 2, start: "10:00", end: "10:50", status: "confirmed", modality: "online", payment: "paid", amount: 220, recurrence: "Semanal" },
    { patientIdx: 6, dayOffset: 2, start: "14:00", end: "14:50", status: "first", modality: "online", payment: "pending", amount: 250, recurrence: "Única", notes: "Indicação do Dr. Vinícius" },
    { patientIdx: 0, dayOffset: 3, start: "09:00", end: "09:50", status: "confirmed", modality: "online", payment: "paid", amount: 220, recurrence: "Semanal" },
    { patientIdx: 1, dayOffset: 3, start: "11:00", end: "11:50", status: "confirmed", modality: "online", payment: "overdue", amount: 200, recurrence: "Semanal", notes: "2 sessões em atraso" },
    { patientIdx: 5, dayOffset: 3, start: "13:00", end: "14:00", status: "blocked", modality: "presencial", payment: "free", amount: 0, recurrence: "Única", notes: "Almoço bloqueado" },
    { patientIdx: 2, dayOffset: 3, start: "16:00", end: "16:50", status: "confirmed", modality: "presencial", payment: "paid", amount: 240, recurrence: "Quinzenal" },
    { patientIdx: 10, dayOffset: 4, start: "09:00", end: "09:50", status: "confirmed", modality: "online", payment: "paid", amount: 220, recurrence: "Semanal" },
    { patientIdx: 4, dayOffset: 4, start: "10:00", end: "10:50", status: "confirmed", modality: "presencial", payment: "pending", amount: 250, recurrence: "Semanal" },
    { patientIdx: 11, dayOffset: 4, start: "15:00", end: "15:50", status: "pending", modality: "online", payment: "pending", amount: 200, recurrence: "Semanal" },
    // Next week
    { patientIdx: 0, dayOffset: 7, start: "09:00", end: "09:50", status: "confirmed", modality: "online", payment: "pending", amount: 220, recurrence: "Semanal" },
    { patientIdx: 1, dayOffset: 8, start: "11:00", end: "11:50", status: "confirmed", modality: "online", payment: "pending", amount: 200, recurrence: "Semanal" },
    { patientIdx: 3, dayOffset: 9, start: "10:00", end: "10:50", status: "pending", modality: "online", payment: "pending", amount: 220, recurrence: "Semanal" },
    { patientIdx: 5, dayOffset: 10, start: "16:00", end: "16:50", status: "confirmed", modality: "presencial", payment: "pending", amount: 250, recurrence: "Semanal" },
  ];

  slots.forEach((slot, idx) => {
    const p: Patient | undefined = patients[slot.patientIdx];
    if (!p) return;
    const date = addDays(monday, slot.dayOffset);
    sessions.push({
      id: `s${idx + 1}`,
      patientId: p.id,
      patientName: p.name,
      initials: p.initials,
      date: toISODate(date),
      startTime: slot.start,
      endTime: slot.end,
      status: slot.status,
      modality: slot.modality,
      payment: slot.payment,
      amount: slot.amount,
      recurrence: slot.recurrence,
      notes: slot.notes,
    });
  });

  return sessions;
}

export const sessions: Session[] = buildMockSessions();

export function getSessionsByDate(dateISO: string) {
  return sessions
    .filter((s) => s.date === dateISO)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getSessionsByWeek(weekStart: Date) {
  const start = toISODate(weekStart);
  const end = toISODate(addDays(weekStart, 6));
  return sessions.filter((s) => s.date >= start && s.date <= end);
}

export function getSessionsByMonth(year: number, month: number) {
  const prefix = `${year}-${pad(month + 1)}`;
  return sessions.filter((s) => s.date.startsWith(prefix));
}

export function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export const weekDayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
export const monthLabels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
