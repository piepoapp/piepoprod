import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  CaretLeft,
  CaretRight,
  Plus,
  MagnifyingGlass,
  CalendarBlank,
  CalendarCheck,
  Sparkle,
  Coffee,
  Funnel,
  CurrencyCircleDollar,
  Confetti,
} from "@phosphor-icons/react";
import {
  addDays,
  monthLabels,
  startOfWeek,
  toISODate,
  weekDayLabels,
  getSessionsByDate,
  getSessionsByWeek,
  expandRecurrence,
  statusMeta,
  type Session,
  type SessionStatus,
} from "../data/agendaData";
import type { Patient } from "../data/mockData";
import { listPatients } from "../../lib/api/patients";
import {
  listSessions,
  createSession,
  createSessions,
  updateSessionStatus,
  deleteSession,
} from "../../lib/api/sessions";
import { useAuth } from "../../lib/auth/AuthProvider";
import { WeekView } from "./agenda/WeekView";
import { DayView } from "./agenda/DayView";
import { MonthView } from "./agenda/MonthView";
import { SessionDetailPanel } from "./agenda/SessionDetailPanel";
import { NewSessionModal } from "./agenda/NewSessionModal";
import { BlockTimeModal } from "./agenda/BlockTimeModal";
import {
  AgendaGridSkeleton,
  ListSkeleton,
  MonthGridSkeleton,
  SkeletonBox,
} from "./skeletons";
import { useSmoothLoading } from "../hooks/useSmoothLoading";

type ViewMode = "day" | "week" | "month";

const filterDefs: { value: SessionStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "confirmed", label: "Confirmadas" },
  { value: "pending", label: "Aguardando" },
  { value: "first", label: "Primeira consulta" },
  { value: "cancelled", label: "Canceladas" },
];

export function AgendaPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const novoPacienteId = searchParams.get("novoPaciente");

  const [sessions, setSessions] = useState<Session[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const novoPaciente = patients.find((p) => p.id === novoPacienteId);

  const [fetching, setFetching] = useState(true);
  const loading = useSmoothLoading(fetching);

  useEffect(() => {
    listSessions()
      .then(setSessions)
      .catch(() => toast.error("Não foi possível carregar a agenda."))
      .finally(() => setFetching(false));
    listPatients()
      .then(setPatients)
      .catch(() => {});
  }, []);

  const [view, setView] = useState<ViewMode>("week");
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [newSessionState, setNewSessionState] = useState<{
    open: boolean;
    date?: string;
    time?: string;
    patientId?: string;
  }>({ open: false });
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [blockState, setBlockState] = useState<{
    open: boolean;
    date?: string;
    time?: string;
  }>({ open: false });
  const [filter, setFilter] = useState<SessionStatus | "all">("all");
  const [search, setSearch] = useState("");

  const weekStart = useMemo(() => startOfWeek(cursor), [cursor]);

  function handlePrev() {
    if (view === "day") setCursor(addDays(cursor, -1));
    else if (view === "week") setCursor(addDays(cursor, -7));
    else setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  }

  function handleNext() {
    if (view === "day") setCursor(addDays(cursor, 1));
    else if (view === "week") setCursor(addDays(cursor, 7));
    else setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));
  }

  function handleToday() {
    setCursor(new Date());
  }

  function openNewSession(date?: string, time?: string, patientId?: string) {
    setNewSessionState({ open: true, date, time, patientId });
    setSelectedSlot(null);
  }

  // Vem do prontuário: /agenda?agendar=<patientId> — abre o modal de nova
  // sessão já com o paciente escolhido, sem passar pelo banner de pré-cadastro.
  useEffect(() => {
    const agendarId = searchParams.get("agendar");
    if (!agendarId) return;
    openNewSession(undefined, undefined, agendarId);
    searchParams.delete("agendar");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  function handleSlotClick(date: string, time: string) {
    setSelectedSlot((prev) =>
      prev && prev.date === date && prev.time === time ? null : { date, time },
    );
  }

  function dismissBanner() {
    searchParams.delete("novoPaciente");
    setSearchParams(searchParams, { replace: true });
  }

  async function handleSaveNew(session: Omit<Session, "id">) {
    if (!user) return;
    const optimisticId = `temp-${Date.now()}`;
    setSessions((prev) => [...prev, { ...session, id: optimisticId }]);
    if (novoPaciente) dismissBanner();
    try {
      const created = await createSession(session, user.id);
      setSessions((prev) => prev.map((s) => (s.id === optimisticId ? created : s)));
    } catch {
      setSessions((prev) => prev.filter((s) => s.id !== optimisticId));
      toast.error("Não foi possível salvar a sessão.");
    }
  }

  function handleCloseNew() {
    setNewSessionState({ open: false });
  }

  async function handleSaveBlock(block: Omit<Session, "id">) {
    if (!user) return;
    const dates = expandRecurrence(block.date, block.recurrence);
    const toInsert = dates.map((d) => ({ ...block, date: d }));
    const batchId = Date.now();
    const optimistic = toInsert.map((b, idx) => ({ ...b, id: `temp-${batchId}-${idx}` }));
    setSessions((prev) => [...prev, ...optimistic]);
    try {
      const created = await createSessions(toInsert, user.id);
      setSessions((prev) => [
        ...prev.filter((s) => !s.id.startsWith(`temp-${batchId}-`)),
        ...created,
      ]);
    } catch {
      setSessions((prev) => prev.filter((s) => !s.id.startsWith(`temp-${batchId}-`)));
      toast.error("Não foi possível bloquear o horário.");
    }
  }

  const headerLabel = useMemo(() => {
    if (view === "day") {
      return `${cursor.getDate()} de ${monthLabels[cursor.getMonth()]} de ${cursor.getFullYear()}`;
    }
    if (view === "week") {
      const end = addDays(weekStart, 6);
      const sameMonth = weekStart.getMonth() === end.getMonth();
      if (sameMonth) {
        return `${weekStart.getDate()} – ${end.getDate()} de ${monthLabels[weekStart.getMonth()]}`;
      }
      return `${weekStart.getDate()} de ${monthLabels[weekStart.getMonth()].slice(0, 3)} – ${end.getDate()} de ${monthLabels[end.getMonth()].slice(0, 3)}`;
    }
    return `${monthLabels[cursor.getMonth()]} de ${cursor.getFullYear()}`;
  }, [view, cursor, weekStart]);

  const todaySessions = getSessionsByDate(sessions, toISODate(new Date()));
  const weekSessions = getSessionsByWeek(sessions, weekStart);
  const weekRevenue = weekSessions
    .filter((s) => s.status !== "cancelled" && s.status !== "blocked")
    .reduce((sum, s) => sum + s.amount, 0);
  const idleSlots = computeIdleSuggestions(sessions, weekStart);

  const filteredTodaySessions = todaySessions
    .filter((s) => filter === "all" || s.status === filter)
    .filter(
      (s) =>
        !search.trim() ||
        s.patientName.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Sub-sidebar */}
      <aside className="w-[280px] shrink-0 border-r border-[#efefef] bg-white px-[20px] py-[24px] flex flex-col gap-[24px]">
        {/* Mini calendar */}
        <MiniCalendar
          cursor={cursor}
          sessions={sessions}
          onSelect={(d) => {
            setCursor(d);
            setView("day");
          }}
        />

        {/* Filters */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[8px] pb-[10px] border-b border-[#efefef]">
            <Funnel size={14} weight="bold" className="text-[#65635a]" />
            <span className="font-['Geist',sans-serif] font-medium leading-[14px] text-[#737185] text-[14px]">
              Filtros rápidos
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {filterDefs.map((f) => {
              const count =
                f.value === "all"
                  ? todaySessions.length
                  : todaySessions.filter((s) => s.status === f.value).length;
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={`flex items-center justify-between px-[12px] py-[8px] rounded-[8px] transition-colors cursor-pointer ${
                    isActive ? "bg-[#ebf2ff]" : "hover:bg-[#fafafa]"
                  }`}
                >
                  <div className="flex items-center gap-[8px]">
                    {f.value !== "all" && (
                      <span
                        className={`size-[8px] rounded-full ${statusMeta[f.value].dot}`}
                      />
                    )}
                    <span
                      className={`font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] ${
                        isActive ? "text-[#317dff]" : "text-[#363636]"
                      }`}
                    >
                      {f.label}
                    </span>
                  </div>
                  {loading ? (
                    <SkeletonBox w={20} h={20} radius={10} />
                  ) : (
                    <span
                      className={`min-w-[20px] h-[20px] px-[6px] rounded-full flex items-center justify-center font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] ${
                        isActive
                          ? "bg-[#317dff] text-white"
                          : "bg-[#f3f4f6] text-[#65635a]"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's patients */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[8px] pb-[10px] border-b border-[#efefef]">
            <CalendarCheck size={14} weight="bold" className="text-[#65635a]" />
            <span className="font-['Geist',sans-serif] font-medium leading-[14px] text-[#737185] text-[14px]">
              Pacientes de hoje
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {loading && (
              <ListSkeleton rows={3} avatarSize={28} bordered={false} trailing={false} />
            )}
            {!loading && filteredTodaySessions.length === 0 && (
              <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#a1a1aa] px-[4px]">
                Nenhuma sessão para hoje.
              </p>
            )}
            {filteredTodaySessions.map((s) => {
              const meta = statusMeta[s.status];
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSession(s)}
                  className="flex items-center gap-[10px] p-[8px] rounded-[8px] hover:bg-[#fafafa] transition-colors cursor-pointer text-left"
                >
                  <div className="size-[28px] rounded-full bg-[#ebf2ff] flex items-center justify-center shrink-0">
                    <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#317dff]">
                      {s.initials}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-black truncate">
                      {s.patientName}
                    </span>
                    <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#737185]">
                      {s.startTime} · {meta.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 px-[24px] py-[24px] flex flex-col gap-[20px] bg-[#fbfbfa]">
        {/* Banner: pré-cadastro */}
        {novoPaciente && (
          <div className="flex items-center gap-[14px] w-full bg-gradient-to-r from-[#f2f6ff] to-[#ebf2ff] border border-[#d6e4ff] rounded-[12px] px-[20px] py-[14px]">
            <div className="size-[40px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(49,125,255,0.15)]">
              <Confetti size={20} weight="bold" className="text-[#317dff]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#1c1b1a]">
                {novoPaciente.name} foi cadastrado(a). Vamos agendar a primeira sessão?
              </p>
              <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#65635a] mt-[2px]">
                Selecione um horário livre na agenda ou crie agora pelo modal.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openNewSession(undefined, undefined, novoPaciente.id)}
              className="h-[40px] px-[16px] rounded-[8px] bg-[#317dff] hover:bg-[#2968d9] flex items-center gap-[8px] transition-colors cursor-pointer"
            >
              <Plus size={14} weight="bold" className="text-white" />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-white">
                Agendar agora
              </span>
            </button>
            <button
              type="button"
              onClick={dismissBanner}
              className="size-[36px] rounded-[8px] hover:bg-white/60 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="font-['Geist',sans-serif] font-medium text-[18px] text-[#65635a]">×</span>
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between gap-[16px] flex-wrap">
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={handleToday}
              className="h-[40px] px-[14px] rounded-[8px] border border-[#efefef] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-[#363636]"
            >
              Hoje
            </button>
            <div className="flex items-center gap-[2px]">
              <button
                type="button"
                onClick={handlePrev}
                className="size-[36px] rounded-[8px] hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <CaretLeft size={14} weight="bold" className="text-[#65635a]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="size-[36px] rounded-[8px] hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <CaretRight size={14} weight="bold" className="text-[#65635a]" />
              </button>
            </div>
            <p className="font-['Geist',sans-serif] font-medium text-[18px] leading-[22px] text-black capitalize">
              {headerLabel}
            </p>
          </div>

          <div className="flex items-center gap-[10px]">
            {/* View switcher */}
            <div className="flex items-center bg-white rounded-[10px] border border-[#efefef] p-[3px]">
              {(["day", "week", "month"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`h-[32px] px-[14px] rounded-[7px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] transition-colors cursor-pointer ${
                    view === v
                      ? "bg-[#ebf2ff] text-[#317dff]"
                      : "text-[#65635a] hover:bg-[#fafafa]"
                  }`}
                >
                  {v === "day" ? "Dia" : v === "week" ? "Semana" : "Mês"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openNewSession()}
              className="h-[40px] px-[16px] rounded-[8px] bg-[#317dff] hover:bg-[#2968d9] flex items-center gap-[8px] transition-colors cursor-pointer"
            >
              <Plus size={14} weight="bold" className="text-white" />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-white">
                Nova sessão
              </span>
            </button>
          </div>
        </div>

        {/* View */}
        {loading && view === "week" && <AgendaGridSkeleton days={7} hourHeight={64} />}
        {loading && view === "day" && <AgendaGridSkeleton days={1} hourHeight={72} />}
        {loading && view === "month" && <MonthGridSkeleton />}
        {!loading && view === "week" && (
          <WeekView
            weekStart={weekStart}
            sessions={getSessionsByWeek(sessions, weekStart)}
            filter={filter}
            onSelectSession={(s) => {
              setSelectedSession(s);
              setSelectedSlot(null);
            }}
            onSelectSlot={handleSlotClick}
            selectedSlot={selectedSlot}
            onCreateSession={(date, time) => openNewSession(date, time, novoPaciente?.id)}
            onBlockSlot={(date, time) => {
              setBlockState({ open: true, date, time });
              setSelectedSlot(null);
            }}
            onCloseSlot={() => setSelectedSlot(null)}
          />
        )}
        {!loading && view === "day" && (
          <DayView
            date={cursor}
            sessions={getSessionsByDate(sessions, toISODate(cursor))}
            filter={filter}
            onSelectSession={(s) => {
              setSelectedSession(s);
              setSelectedSlot(null);
            }}
            onSelectSlot={handleSlotClick}
            selectedSlot={selectedSlot}
            onCreateSession={(date, time) => openNewSession(date, time, novoPaciente?.id)}
            onBlockSlot={(date, time) => {
              setBlockState({ open: true, date, time });
              setSelectedSlot(null);
            }}
            onCloseSlot={() => setSelectedSlot(null)}
          />
        )}
        {!loading && view === "month" && (
          <MonthView
            monthDate={cursor}
            sessions={sessions}
            filter={filter}
            onSelectDate={(d) => {
              setCursor(d);
              setView("day");
            }}
          />
        )}
      </div>

      {/* Right detail panel */}
      {selectedSession && (
        <SessionDetailPanel
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          onAction={async (action) => {
            if (action === "reschedule") {
              setSelectedSession(null);
              openNewSession(selectedSession.date, selectedSession.startTime, selectedSession.patientId ?? undefined);
              return;
            }
            if (action === "message" || action === "video") {
              console.log("Ação na sessão:", action, selectedSession.id);
              return;
            }
            const newStatus: SessionStatus = action === "confirm" ? "confirmed" : "cancelled";
            const previous = sessions;
            setSessions((prev) =>
              prev.map((s) => (s.id === selectedSession.id ? { ...s, status: newStatus } : s)),
            );
            setSelectedSession((prev) => (prev ? { ...prev, status: newStatus } : prev));
            try {
              await updateSessionStatus(selectedSession.id, newStatus);
            } catch {
              setSessions(previous);
              setSelectedSession((prev) => (prev ? { ...prev, status: selectedSession.status } : prev));
              toast.error("Não foi possível atualizar a sessão.");
            }
          }}
          onDelete={async () => {
            const previous = sessions;
            setSessions((prev) => prev.filter((s) => s.id !== selectedSession.id));
            setSelectedSession(null);
            try {
              await deleteSession(selectedSession.id);
            } catch {
              setSessions(previous);
              toast.error("Não foi possível excluir a sessão.");
            }
          }}
        />
      )}

      {/* New session modal */}
      <NewSessionModal
        open={newSessionState.open}
        initialDate={newSessionState.date}
        initialTime={newSessionState.time}
        initialPatientId={newSessionState.patientId}
        sessions={sessions}
        onClose={handleCloseNew}
        onSave={handleSaveNew}
      />

      <BlockTimeModal
        open={blockState.open}
        initialDate={blockState.date}
        initialTime={blockState.time}
        sessions={sessions}
        onClose={() => setBlockState({ open: false })}
        onSave={handleSaveBlock}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
  label: string;
  value: string;
  hint?: string;
  tone: "neutral" | "success" | "warning" | "primary";
}) {
  const palette = {
    neutral: { bg: "bg-[#f5f5f5]", text: "text-[#65635a]" },
    success: { bg: "bg-[#ecfdf5]", text: "text-[#10b981]" },
    warning: { bg: "bg-[#fef9c3]", text: "text-[#a16207]" },
    primary: { bg: "bg-[#ebf2ff]", text: "text-[#317dff]" },
  }[tone];
  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[14px] rounded-[12px] border border-[#efefef] bg-white">
      <div className={`size-[40px] rounded-[10px] ${palette.bg} flex items-center justify-center shrink-0`}>
        <Icon size={18} weight="bold" className={palette.text} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#737185]">
          {label}
        </span>
        <span className="font-['Geist',sans-serif] font-medium text-[18px] leading-[22px] text-black">
          {value}
        </span>
        {hint && (
          <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#a1a1aa]">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

function MiniCalendar({
  cursor,
  sessions,
  onSelect,
}: {
  cursor: Date;
  sessions: Session[];
  onSelect: (d: Date) => void;
}) {
  const [month, setMonth] = useState(new Date(cursor.getFullYear(), cursor.getMonth(), 1));
  const today = toISODate(new Date());
  const cursorIso = toISODate(cursor);
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startWeekday = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), 1 - startWeekday + i));
  }

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-black capitalize">
          {monthLabels[month.getMonth()]} {month.getFullYear()}
        </span>
        <div className="flex items-center gap-[2px]">
          <button
            type="button"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            className="size-[24px] rounded-[6px] hover:bg-[#fafafa] flex items-center justify-center cursor-pointer"
          >
            <CaretLeft size={12} weight="bold" className="text-[#65635a]" />
          </button>
          <button
            type="button"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            className="size-[24px] rounded-[6px] hover:bg-[#fafafa] flex items-center justify-center cursor-pointer"
          >
            <CaretRight size={12} weight="bold" className="text-[#65635a]" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[2px]">
        {weekDayLabels.map((d) => (
          <div
            key={d}
            className="text-center font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#a1a1aa] py-[2px]"
          >
            {d[0]}
          </div>
        ))}
        {cells.map((d, i) => {
          const iso = toISODate(d);
          const inMonth = d.getMonth() === month.getMonth();
          const isToday = iso === today;
          const isSelected = iso === cursorIso;
          const hasSession = sessions.some((s) => s.date === iso);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(d)}
              className={`relative aspect-square rounded-[6px] flex items-center justify-center cursor-pointer transition-colors ${
                isSelected
                  ? "bg-[#317dff] text-white"
                  : isToday
                  ? "bg-[#ebf2ff] text-[#317dff]"
                  : inMonth
                  ? "text-black hover:bg-[#fafafa]"
                  : "text-[#d4d4d4] hover:bg-[#fafafa]"
              }`}
            >
              <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px]">
                {d.getDate()}
              </span>
              {hasSession && !isSelected && (
                <span className="absolute bottom-[2px] size-[3px] rounded-full bg-[#317dff]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function computeIdleSuggestions(sessions: Session[], weekStart: Date) {
  const suggestions: { date: string; time: string; label: string }[] = [];
  const candidates = ["10:00", "14:00", "16:00", "18:00"];
  for (let i = 0; i < 5; i++) {
    const d = addDays(weekStart, i);
    const iso = toISODate(d);
    const dayLabel = weekDayLabels[i];
    const dayBusy = new Set(
      sessions.filter((s) => s.date === iso).map((s) => s.startTime),
    );
    candidates.forEach((c) => {
      if (!dayBusy.has(c)) {
        suggestions.push({ date: iso, time: c, label: `${dayLabel} ${d.getDate()}/${d.getMonth() + 1}` });
      }
    });
  }
  return suggestions;
}