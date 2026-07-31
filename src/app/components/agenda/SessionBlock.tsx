import { VideoCamera, MapPin, CurrencyDollar, Warning, Prohibit } from "@phosphor-icons/react";
import { statusMeta, type Session, timeToMinutes } from "../../data/agendaData";

interface Props {
  session: Session;
  onClick: () => void;
  hourHeight: number;
  startHour: number;
  compact?: boolean;
}

export function SessionBlock({ session, onClick, hourHeight, startHour, compact }: Props) {
  const top =
    ((timeToMinutes(session.startTime) - startHour * 60) / 60) * hourHeight;
  const height =
    ((timeToMinutes(session.endTime) - timeToMinutes(session.startTime)) / 60) *
    hourHeight;

  const meta = statusMeta[session.status];
  const isBlocked = session.status === "blocked";
  const ModalityIcon = session.modality === "online" ? VideoCamera : MapPin;
  const isPaymentAlert = session.payment === "overdue";

  const blockedStyle: React.CSSProperties = isBlocked
    ? {
        top,
        height: Math.max(height, 32),
        backgroundImage:
          "repeating-linear-gradient(135deg, #f3f4f6 0px, #f3f4f6 6px, #e5e7eb 6px, #e5e7eb 12px)",
      }
    : { top, height: Math.max(height, 32) };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={blockedStyle}
      className={`absolute left-[4px] right-[4px] ${isBlocked ? "" : meta.bg} border-l-[3px] ${meta.border} rounded-r-[8px] px-[10px] py-[6px] text-left cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all overflow-hidden`}
    >
      <div className="flex items-center justify-between gap-[6px] mb-[2px]">
        <div className="flex items-center gap-[6px] min-w-0">
          {isBlocked && (
            <Prohibit size={12} weight="bold" className={`${meta.text} shrink-0`} />
          )}
          <p className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] ${meta.text} truncate`}>
            {session.startTime} · {session.patientName}
          </p>
        </div>
        {isPaymentAlert && !isBlocked && (
          <Warning size={12} weight="bold" className="text-[#b91c1c] shrink-0" />
        )}
      </div>
      {!compact && height >= 48 && (
        <div className={`flex items-center gap-[6px] ${meta.text} opacity-80`}>
          <ModalityIcon size={11} weight="bold" />
          <span className="font-['Geist',sans-serif] font-normal leading-[14px] truncate text-[12px]">
            {session.status === "first"
              ? "Primeira consulta"
              : session.status === "blocked"
              ? "Bloqueio"
              : session.recurrence}
          </span>
        </div>
      )}
      {!compact && height >= 70 && !isBlocked && session.amount > 0 && (
        <div className={`flex items-center gap-[4px] ${meta.text} opacity-80 mt-[2px]`}>
          <CurrencyDollar size={11} weight="bold" />
          <span className="font-['Geist',sans-serif] font-normal text-[11px] leading-[14px]">
            R$ {session.amount.toFixed(2).replace(".", ",")}
          </span>
        </div>
      )}
    </button>
  );
}
