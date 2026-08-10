import {
  isPastDay,
  toISODate,
  getSessionsByMonth,
  statusMeta,
  weekDayLabels,
  type Session,
  type SessionStatus,
} from "../../data/agendaData";

interface Props {
  monthDate: Date;
  sessions: Session[];
  onSelectDate: (date: Date) => void;
  filter?: SessionStatus | "all";
}

export function MonthView({ monthDate, sessions, onSelectDate, filter = "all" }: Props) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const cells: Date[] = [];
  const gridStart = new Date(year, month, 1 - startWeekday);
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
  }

  const monthSessions = getSessionsByMonth(sessions, year, month);
  const today = toISODate(new Date());

  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-[#efefef] overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#efefef] bg-[#fafafa]">
        {weekDayLabels.map((d) => (
          <div
            key={d}
            className="py-[10px] text-center font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#737185] uppercase tracking-wide"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        {cells.map((d, i) => {
          const iso = toISODate(d);
          const inMonth = d.getMonth() === month;
          const isToday = iso === today;
          const cellSessions = monthSessions.filter((s) => s.date === iso && (filter === "all" || s.status === filter));
          // O clique aqui navega para o dia (consulta), não cria sessão — por
          // isso dias passados continuam clicáveis, apenas recuam visualmente.
          const past = isPastDay(iso);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectDate(d)}
              title={past ? "Data passada — somente consulta" : undefined}
              className={`min-h-[110px] border-r border-b border-[#f5f5f5] p-[8px] text-left flex flex-col gap-[4px] hover:bg-[#f8faff] transition-colors cursor-pointer ${
                !inMonth ? "bg-[#fafafa]" : past ? "bg-[#fafafa]" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] ${
                    isToday
                      ? "size-[24px] rounded-full bg-[#317dff] text-white flex items-center justify-center"
                      : !inMonth || past
                      ? "text-[#a1a1aa]"
                      : "text-black"
                  }`}
                >
                  {d.getDate()}
                </span>
                {cellSessions.length > 0 && (
                  <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[12px] text-[#737185]">
                    {cellSessions.length}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[2px]">
                {cellSessions.slice(0, 3).map((s) => {
                  const meta = statusMeta[s.status];
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center gap-[4px] ${meta.bg} rounded-[4px] px-[4px] py-[1px] overflow-hidden`}
                    >
                      <span className={`size-[6px] rounded-full ${meta.dot} shrink-0`} />
                      <span
                        className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] ${meta.text} truncate`}
                      >
                        {s.startTime} {s.patientName.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
                {cellSessions.length > 3 && (
                  <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[12px] text-[#737185] pl-[4px]">
                    +{cellSessions.length - 3} mais
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
