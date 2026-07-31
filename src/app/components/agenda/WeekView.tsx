import {
  addDays,
  toISODate,
  weekDayLabels,
  type Session,
  type SessionStatus,
} from "../../data/agendaData";
import { SessionBlock } from "./SessionBlock";
import { SlotSelection } from "./SlotSelection";
import { QuickBlockPanel } from "./QuickBlockPanel";

interface Props {
  weekStart: Date;
  sessions: Session[];
  onSelectSession: (s: Session) => void;
  onSelectSlot: (date: string, time: string) => void;
  selectedSlot: { date: string; time: string } | null;
  onCreateSession: (date: string, time: string) => void;
  onBlockSlot: (date: string, time: string) => void;
  onCloseSlot: () => void;
  quickBlock: { date: string; time: string } | null;
  onSaveQuickBlock: (block: Omit<Session, "id">) => void;
  onCloseQuickBlock: () => void;
  filter?: SessionStatus | "all";
}

const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_HEIGHT = 64;

export function WeekView({
  weekStart,
  sessions,
  onSelectSession,
  onSelectSlot,
  selectedSlot,
  onCreateSession,
  onBlockSlot,
  onCloseSlot,
  quickBlock,
  onSaveQuickBlock,
  onCloseQuickBlock,
  filter = "all",
}: Props) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
  const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);
  const today = toISODate(new Date());

  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-[#efefef] overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-[#efefef] bg-[#fafafa] sticky top-0 z-10">
        <div />
        {days.map((d) => {
          const iso = toISODate(d);
          const isToday = iso === today;
          return (
            <div
              key={iso}
              className={`flex flex-col items-center justify-center py-[12px] gap-[2px] ${
                isToday ? "bg-[#ebf2ff]" : ""
              }`}
            >
              <span className="font-['Geist',sans-serif] font-normal text-[11px] leading-[14px] text-[#737185] uppercase tracking-wide">
                {weekDayLabels[d.getDay() === 0 ? 6 : d.getDay() - 1]}
              </span>
              <span
                className={`font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] ${
                  isToday ? "text-[#317dff]" : "text-black"
                }`}
              >
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[64px_repeat(7,1fr)] relative">
        {/* Hours column */}
        <div className="flex flex-col">
          {hours.map((h) => (
            <div
              key={h}
              style={{ height: HOUR_HEIGHT }}
              className="border-b border-[#f5f5f5] flex items-start justify-end pr-[8px] pt-[4px]"
            >
              <span className="font-['Geist',sans-serif] font-normal text-[11px] leading-[14px] text-[#a1a1aa]">
                {h.toString().padStart(2, "0")}:00
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((d) => {
          const iso = toISODate(d);
          const isToday = iso === today;
          const daySessions = filtered.filter((s) => s.date === iso);
          return (
            <div
              key={iso}
              className={`relative border-l border-[#f5f5f5] ${isToday ? "bg-[#fbfcff]" : ""}`}
            >
              {hours.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => onSelectSlot(iso, `${h.toString().padStart(2, "0")}:00`)}
                  style={{ height: HOUR_HEIGHT }}
                  className="block w-full border-b border-[#f5f5f5] hover:bg-[#f8faff] transition-colors cursor-pointer"
                />
              ))}
              {daySessions.map((s) => (
                <SessionBlock
                  key={s.id}
                  session={s}
                  onClick={() => onSelectSession(s)}
                  hourHeight={HOUR_HEIGHT}
                  startHour={START_HOUR}
                />
              ))}
              {selectedSlot?.date === iso && (
                <SlotSelection
                  time={selectedSlot.time}
                  hourHeight={HOUR_HEIGHT}
                  startHour={START_HOUR}
                  onNewSession={() => onCreateSession(selectedSlot.date, selectedSlot.time)}
                  onBlockTime={() => onBlockSlot(selectedSlot.date, selectedSlot.time)}
                  onClose={onCloseSlot}
                />
              )}
              {quickBlock?.date === iso && (
                <QuickBlockPanel
                  date={quickBlock.date}
                  time={quickBlock.time}
                  hourHeight={HOUR_HEIGHT}
                  startHour={START_HOUR}
                  onSave={onSaveQuickBlock}
                  onClose={onCloseQuickBlock}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
