export type SessionStatus =
  | "confirmed"
  | "pending"
  | "cancelled"
  | "first"
  | "completed"
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
  // Estado passado: recua visualmente para não competir com "Confirmada".
  completed: {
    label: "Realizada",
    bg: "bg-[#f1f5f9]",
    border: "border-[#64748b]",
    text: "text-[#334155]",
    dot: "bg-[#64748b]",
    soft: "bg-[#e2e8f0]",
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

export function getSessionsByDate(sessions: Session[], dateISO: string) {
  return sessions
    .filter((s) => s.date === dateISO)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getSessionsByWeek(sessions: Session[], weekStart: Date) {
  const start = toISODate(weekStart);
  const end = toISODate(addDays(weekStart, 6));
  return sessions.filter((s) => s.date >= start && s.date <= end);
}

export function getSessionsByMonth(sessions: Session[], year: number, month: number) {
  const prefix = `${year}-${pad(month + 1)}`;
  return sessions.filter((s) => s.date.startsWith(prefix));
}

export function expandRecurrence(startISO: string, recurrence: Session["recurrence"]): string[] {
  const start = fromISODate(startISO);
  const out: string[] = [];
  const push = (d: Date) => out.push(toISODate(d));

  if (recurrence === "Única") {
    push(start);
    return out;
  }

  if (recurrence === "Diária") {
    for (let i = 0; i < 28; i++) push(addDays(start, i));
    return out;
  }

  if (recurrence === "Seg a sex") {
    let added = 0;
    for (let i = 0; added < 40 && i < 90; i++) {
      const d = addDays(start, i);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) {
        push(d);
        added++;
      }
    }
    return out;
  }

  if (recurrence === "Semanal") {
    for (let i = 0; i < 12; i++) push(addDays(start, i * 7));
    return out;
  }

  if (recurrence === "Quinzenal") {
    for (let i = 0; i < 8; i++) push(addDays(start, i * 14));
    return out;
  }

  // Mensal
  for (let i = 0; i < 6; i++) {
    const d = new Date(start);
    d.setMonth(d.getMonth() + i);
    push(d);
  }
  return out;
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
