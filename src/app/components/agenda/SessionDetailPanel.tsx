import { useState } from "react";
import {
  X,
  VideoCamera,
  MapPin,
  ArrowsClockwise,
  XCircle,
  CheckCircle,
  ChatCircleText,
  CalendarBlank,
  CurrencyCircleDollar,
  Notepad,
  Repeat,
  ClockCounterClockwise,
  Trash,
} from "@phosphor-icons/react";
import {
  fromISODate,
  monthLabels,
  paymentMeta,
  statusMeta,
  type Session,
} from "../../data/agendaData";
import { ConfirmDialog } from "../ConfirmDialog";

interface Props {
  session: Session;
  onClose: () => void;
  onAction: (action: "confirm" | "reschedule" | "cancel" | "video" | "message") => void;
  onDelete: () => void;
}

export function SessionDetailPanel({ session, onClose, onAction, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const meta = statusMeta[session.status];
  const pay = paymentMeta[session.payment];
  const ModalityIcon = session.modality === "online" ? VideoCamera : MapPin;
  const date = fromISODate(session.date);
  const dateLabel = `${date.getDate()} de ${monthLabels[date.getMonth()].toLowerCase()} de ${date.getFullYear()}`;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-[440px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-64px)] bg-white rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.18)] border border-[#efefef] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#efefef] z-10 px-[24px] py-[20px] flex items-start justify-between">
          <div className="flex items-center gap-[12px] min-w-0">
            <div className="size-[44px] rounded-full bg-[#ebf2ff] flex items-center justify-center shrink-0">
              <span className="font-['Geist',sans-serif] font-medium text-[16px] text-[#317dff]">
                {session.initials}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] text-black truncate">
                {session.patientName}
              </p>
              <div className="flex items-center gap-[6px] mt-[2px]">
                <span className={`size-[6px] rounded-full ${meta.dot}`} />
                <span className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] ${meta.text}`}>
                  {meta.label}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-[36px] rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer shrink-0"
          >
            <X size={16} weight="bold" className="text-[#75787d]" />
          </button>
        </div>

        <div className="px-[24px] py-[20px] flex flex-col gap-[20px]">
          {/* When/where */}
          <div className="flex flex-col gap-[10px] p-[16px] rounded-[12px] border border-[#efefef] bg-[#fafafa]">
            <DetailRow icon={CalendarBlank} label="Data" value={dateLabel} />
            <DetailRow
              icon={ClockCounterClockwise}
              label="Horário"
              value={`${session.startTime} – ${session.endTime}`}
            />
            <DetailRow
              icon={ModalityIcon}
              label="Formato"
              value={session.modality === "online" ? "Online · Google Meet" : "Presencial · consultório"}
            />
            <DetailRow icon={Repeat} label="Recorrência" value={session.recurrence} />
          </div>

          {/* Payment */}
          <div className="flex items-center justify-between p-[16px] rounded-[12px] border border-[#efefef]">
            <div className="flex items-center gap-[10px]">
              <CurrencyCircleDollar size={20} weight="bold" className="text-[#65635a]" />
              <div className="flex flex-col">
                <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#737185]">
                  Financeiro
                </span>
                <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-black">
                  R$ {session.amount.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
            <span className={`px-[10px] py-[4px] rounded-full ${pay.bg} font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] ${pay.text}`}>
              {pay.label}
            </span>
          </div>

          {/* Quick actions */}
          <div className="flex flex-col gap-[8px]">
            <p className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] text-[#737185] uppercase tracking-wide">
              Ações rápidas
            </p>
            <div className="grid grid-cols-2 gap-[8px]">
              <ActionButton icon={CheckCircle} label="Confirmar" onClick={() => onAction("confirm")} primary />
              <ActionButton icon={ArrowsClockwise} label="Remarcar" onClick={() => onAction("reschedule")} />
              <ActionButton icon={ChatCircleText} label="Mensagem" onClick={() => onAction("message")} />
              <ActionButton
                icon={XCircle}
                label="Cancelar sessão"
                onClick={() => onAction("cancel")}
                variant="danger"
                full
              />
              <ActionButton
                icon={Trash}
                label={session.status === "blocked" ? "Excluir bloqueio" : "Excluir sessão"}
                onClick={() => setConfirmDelete(true)}
                variant="danger"
                full
              />
            </div>
          </div>

          {/* Notes */}
          {session.notes && (
            <div className="flex flex-col gap-[10px]">
              <p className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] text-[#737185] uppercase tracking-wide">
                Anotações privadas
              </p>
              <div className="flex items-start gap-[10px] p-[14px] rounded-[12px] border border-[#efefef] bg-[#fafafa]">
                <Notepad size={16} weight="bold" className="text-[#65635a] mt-[2px] shrink-0" />
                <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#1c1b1a]">
                  {session.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={session.status === "blocked" ? "Excluir bloqueio?" : "Excluir sessão?"}
        description={
          session.status === "blocked"
            ? `O bloqueio "${session.patientName}" em ${session.startTime}–${session.endTime} será removido permanentemente. Essa ação não pode ser desfeita.`
            : `A sessão de ${session.patientName} em ${session.startTime}–${session.endTime} será removida permanentemente, incluindo seu histórico. Essa ação não pode ser desfeita.`
        }
        confirmLabel={session.status === "blocked" ? "Excluir bloqueio" : "Excluir sessão"}
        onConfirm={onDelete}
      />
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-[10px]">
      <Icon size={16} weight="bold" className="text-[#65635a] shrink-0" />
      <div className="flex items-baseline gap-[8px] min-w-0 flex-1">
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#737185] shrink-0">
          {label}
        </span>
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-black truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  primary,
  variant,
  full,
}: {
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
  label: string;
  onClick: () => void;
  primary?: boolean;
  variant?: "danger";
  full?: boolean;
}) {
  const cls = primary
    ? "bg-[#317dff] hover:bg-[#2968d9] text-white border border-transparent"
    : variant === "danger"
    ? "bg-white border border-[#fecaca] hover:bg-[#fef2f2] text-[#b91c1c]"
    : "bg-white border border-[#efefef] hover:border-[#d4d4d4] text-[#363636]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? "col-span-2" : ""} h-[40px] rounded-[10px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer ${cls}`}
    >
      <Icon size={14} weight="bold" />
      <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px]">
        {label}
      </span>
    </button>
  );
}
