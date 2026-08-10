import { CurrencyCircleDollar, Clock, CheckCircle, ClockCounterClockwise } from "@phosphor-icons/react";
import {
  isPastDay,
  isPastSlot,
  toISODate,
  weekDayLabels,
  monthLabels,
  type Session,
  type SessionStatus,
} from "../../data/agendaData";
import {
  availabilityBounds,
  isDayAvailable,
  isSlotAvailable,
  type Availability,
} from "../../data/availability";
import { EmptyState } from "../EmptyState";
import { SessionBlock } from "./SessionBlock";
import { SlotSelection } from "./SlotSelection";
import { QuickBlockPanel } from "./QuickBlockPanel";

interface Props {
  date: Date;
  sessions: Session[];
  /** Disponibilidade definida no onboarding; null = sem restrição. */
  availability: Availability | null;
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

const HOUR_HEIGHT = 72;

export function DayView({
  date,
  sessions,
  availability,
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
  const iso = toISODate(date);
  const isToday = iso === toISODate(new Date());
  const dayPast = isPastDay(iso);
  const dayOff = !isDayAvailable(availability, iso);
  const { startHour: START_HOUR, endHour: END_HOUR } = availabilityBounds(availability);
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
  const daySessions = filter === "all" ? sessions : sessions.filter((s) => s.status === filter);
  const label = `${weekDayLabels[date.getDay() === 0 ? 6 : date.getDay() - 1]}, ${date.getDate()} de ${monthLabels[date.getMonth()].toLowerCase()}`;

  // Sem sessões e sem nada a oferecer: a grade só mostraria slots inertes.
  if (daySessions.length === 0 && (dayPast || dayOff)) {
    return (
      <div className="flex flex-col w-full bg-white rounded-[12px] border border-[#efefef]">
        <EmptyState
          className="min-h-[420px]"
          icon={<ClockCounterClockwise size={20} weight="bold" />}
          title={dayPast ? "Nenhum atendimento neste dia" : "Você não atende neste dia"}
          description={
            dayPast
              ? `${label} já passou e não teve sessões registradas. Não é possível criar agendamentos em datas passadas.`
              : `${label} está fora dos dias de atendimento que você definiu. Ajuste sua disponibilidade para agendar aqui.`
          }
        />
      </div>
    );
  }

  const totalForecast = daySessions
    .filter((s) => s.status !== "cancelled" && s.status !== "blocked")
    .reduce((sum, s) => sum + s.amount, 0);
  const confirmed = daySessions.filter((s) => s.status === "confirmed").length;
  const occupied = daySessions.filter((s) => s.status !== "blocked").length;
  const occupationRate = Math.round((occupied / 10) * 100);

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Day grid */}
      <div className="flex flex-col w-full bg-white rounded-[12px] border border-[#efefef] overflow-hidden">
        <div className="grid grid-cols-[80px_1fr] relative">
          <div className="flex flex-col">
            {hours.map((h) => (
              <div
                key={h}
                style={{ height: HOUR_HEIGHT }}
                className="border-b border-[#f5f5f5] flex items-start justify-end pr-[12px] pt-[4px]"
              >
                <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#a1a1aa]">
                  {h.toString().padStart(2, "0")}:00
                </span>
              </div>
            ))}
          </div>
          <div className={`relative border-l border-[#f5f5f5] ${dayPast || dayOff ? "bg-[#fafafa]" : ""}`}>
            {hours.map((h) => {
              const time = `${h.toString().padStart(2, "0")}:00`;
              const blocked = isPastSlot(iso, time) || !isSlotAvailable(availability, iso, time);
              return blocked ? (
                <div
                  key={h}
                  aria-disabled="true"
                  style={{ height: HOUR_HEIGHT }}
                  className="block w-full border-b border-[#f5f5f5] bg-[#f4f4f5]/60 cursor-not-allowed"
                />
              ) : (
                <button
                  key={h}
                  type="button"
                  onClick={() => onSelectSlot(iso, time)}
                  style={{ height: HOUR_HEIGHT }}
                  className="block w-full border-b border-[#f5f5f5] hover:bg-[#f8faff] transition-colors cursor-pointer"
                />
              );
            })}
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
        </div>
      </div>

      {/* Energy insight */}
      {daySessions.length >= 6 && (
        <div className="flex items-start gap-[10px] w-full bg-[#fef9c3] border border-[#fde68a] rounded-[12px] px-[16px] py-[12px]">
          <div className="size-[20px] rounded-full bg-[#eab308] flex items-center justify-center shrink-0 mt-[2px]">
            <span className="font-['Geist',sans-serif] font-medium text-[12px] text-white">!</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#854d0e]">
              Carga clínica alta neste dia
            </p>
            <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#92400e]">
              Você possui {daySessions.length} sessões hoje. Considere reservar pausas entre os atendimentos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function DayStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-[10px] px-[14px] py-[10px] rounded-[12px] border border-[#efefef] bg-white">
      <div className="size-[32px] rounded-[8px] bg-[#f5f5f5] flex items-center justify-center">
        <Icon size={16} weight="bold" className="text-[#65635a]" />
      </div>
      <div className="flex flex-col">
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#737185]">
          {label}
        </span>
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-black">
          {value}
        </span>
      </div>
    </div>
  );
}
