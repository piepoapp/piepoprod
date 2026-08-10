import { useEffect, useState } from "react";
import { StatusCards } from "./StatusCards";
import { AppointmentsList } from "./AppointmentsList";
import { WeeklyChart } from "./WeeklyChart";
import { useAuth } from "../../lib/auth/AuthProvider";
import { listPatients } from "../../lib/api/patients";
import { listSessions } from "../../lib/api/sessions";
import { toISODate, startOfWeek, addDays, type Session } from "../data/agendaData";
import type { Appointment } from "../data/mockData";
import { useSmoothLoading } from "../hooks/useSmoothLoading";
import { consumeJustOnboarded, playCue } from "../../lib/sound";

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function sessionToAppointment(s: Session): Appointment {
  const platform =
    s.modality === "online" ? (s.meetingProvider === "zoom" ? "Zoom" : "Google Meet") : "Presencial";
  const badgeType: Appointment["badgeType"] = s.status === "first" ? "primary" : "return";
  const badge =
    s.status === "first" ? "Primeira sessão" : s.status === "confirmed" ? "Confirmada" : "Aguardando";
  const dateLabel = new Date(s.date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  return {
    id: s.id,
    initials: s.initials,
    name: s.patientName,
    time: `${dateLabel} · ${s.startTime}`,
    platform,
    badge,
    badgeType,
    highlighted: s.status === "first",
  };
}

export function DashboardPage() {
  const { user } = useAuth();
  const [activePatients, setActivePatients] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "";

  useEffect(() => {
    listPatients()
      .then((patients) => {
        setActivePatients(patients.filter((p) => p.status === "ativo").length);
        setTotalPatients(patients.length);
      })
      .catch(() => {})
      .finally(() => setPatientsLoading(false));
    listSessions()
      .then(setSessions)
      .catch(() => {})
      .finally(() => setSessionsLoading(false));
  }, []);

  const cardsLoading = useSmoothLoading(patientsLoading || sessionsLoading);
  const sessionsPending = useSmoothLoading(sessionsLoading);

  // Primeiro contato com o Dashboard logo após concluir o onboarding.
  // A marca é consumida na leitura, então o som não repete em reload nem ao voltar.
  useEffect(() => {
    if (consumeJustOnboarded()) {
      playCue("arrival");
    }
  }, []);

  const todayIso = toISODate(new Date());

  // "Futura" exclui sessões já marcadas como realizadas, senão uma sessão de
  // hoje que acabou de ser registrada continuaria contando como agendada.
  const isUpcoming = (s: Session) =>
    s.date >= todayIso &&
    s.status !== "cancelled" &&
    s.status !== "blocked" &&
    s.status !== "completed";

  const scheduled = sessions.filter(isUpcoming).length;
  // Realizada = marcada explicitamente, ou já passou sem ter sido cancelada.
  const completed = sessions.filter(
    (s) =>
      s.status === "completed" ||
      (s.date < todayIso && (s.status === "confirmed" || s.status === "first")),
  ).length;
  const awaiting = sessions.filter((s) => s.status === "pending").length;

  const upcoming = sessions
    .filter(isUpcoming)
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
    .slice(0, 5)
    .map(sessionToAppointment);

  const weekStart = startOfWeek(new Date());
  const weeklyData = weekDays.map((day, i) => {
    const iso = toISODate(addDays(weekStart, i));
    return { day, sessions: sessions.filter((s) => s.date === iso && s.status !== "blocked").length };
  });

  return (
    <div className="flex flex-col gap-[24px] p-[32px]">
      {/* Header */}
      <div className="flex flex-col gap-[4px]">
        <h1 className="font-['Geist',sans-serif] font-semibold leading-[38.4px] tracking-[-0.75px] text-[#111827] text-[28px]">
          Olá{firstName ? `, ${firstName}` : ""} 👋
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

      {/* Status Cards */}
      <StatusCards
        patients={activePatients}
        patientsDesc="pacientes ativos no momento"
        scheduled={scheduled}
        scheduledDesc="sessões futuras"
        completed={completed}
        completedDesc="atendimentos concluídos"
        awaiting={awaiting}
        awaitingDesc="sessões a confirmar"
        loading={cardsLoading}
      />

      {/* Content Overview */}
      <div className="flex gap-[16px] items-start w-full">
        <AppointmentsList
          appointments={upcoming}
          hasPatients={totalPatients > 0}
          hasSessions={sessions.length > 0}
          loading={sessionsPending}
        />
        <WeeklyChart data={weeklyData} loading={sessionsPending} />
      </div>
    </div>
  );
}
