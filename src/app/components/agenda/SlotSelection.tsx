import { Plus, Prohibit, X } from "@phosphor-icons/react";
import { timeToMinutes } from "../../data/agendaData";

interface Props {
  time: string;
  hourHeight: number;
  startHour: number;
  onNewSession: () => void;
  onBlockTime: () => void;
  onClose: () => void;
}

export function SlotSelection({
  time,
  hourHeight,
  startHour,
  onNewSession,
  onBlockTime,
  onClose,
}: Props) {
  const top = ((timeToMinutes(time) - startHour * 60) / 60) * hourHeight;
  const height = hourHeight;

  return (
    <div
      style={{ top, height }}
      className="absolute left-[4px] right-[4px] bg-[#f2f6ff] border-2 border-dashed border-[#317dff] rounded-[8px] flex flex-col items-stretch p-[6px] gap-[4px] z-20 animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={onNewSession}
        className="flex-1 flex items-center justify-center gap-[6px] rounded-[6px] bg-[#317dff] hover:bg-[#2968d9] transition-colors cursor-pointer px-[8px] min-h-0"
      >
        <Plus size={12} weight="bold" className="text-white" />
        <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] text-white truncate">
          Nova sessão
        </span>
      </button>
      <button
        type="button"
        onClick={onBlockTime}
        className="flex-1 flex items-center justify-center gap-[6px] rounded-[6px] bg-white border border-[#c7dbff] hover:border-[#317dff] transition-colors cursor-pointer px-[8px] min-h-0"
      >
        <Prohibit size={12} weight="bold" className="text-[#317dff]" />
        <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] text-[#317dff] truncate">
          Bloquear horário
        </span>
      </button>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[4px] right-[4px] size-[18px] rounded-full bg-white/90 hover:bg-white border border-[#c7dbff] flex items-center justify-center cursor-pointer"
        aria-label="Fechar"
      >
        <X size={10} weight="bold" className="text-[#317dff]" />
      </button>
    </div>
  );
}
