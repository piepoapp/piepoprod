import { useState } from "react";
import { useNavigate } from "react-router";
import {
  X,
  VideoCamera,
  MapPin,
  ArrowsClockwise,
  ArrowSquareOut,
  Check,
  CheckCircle,
  Copy,
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
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);

  const meta = statusMeta[session.status];
  const pay = paymentMeta[session.payment];
  const ModalityIcon = session.modality === "online" ? VideoCamera : MapPin;
  const date = fromISODate(session.date);
  const dateLabel = `${date.getDate()} de ${monthLabels[date.getMonth()].toLowerCase()} de ${date.getFullYear()}`;

  // Bloqueio de horário não tem paciente, cobrança nem link — só pode ser removido.
  const isBlock = session.status === "blocked";
  const showMeetLink = !isBlock && session.modality === "online" && !!session.meetingLink;
  const canConfirm = !isBlock && session.status !== "confirmed" && session.status !== "cancelled";

  function copyLink() {
    if (!session.meetingLink) return;
    navigator.clipboard.writeText(session.meetingLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
              <div className="flex items-center gap-[6px] min-w-0">
                <p className="font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] text-black truncate">
                  {session.patientName}
                </p>
                {/* Atalho para o prontuário: substitui a ação "Registrar
                    evolução" que antes ocupava a lista de ações rápidas. */}
                {session.patientId && !isBlock && (
                  <button
                    type="button"
                    onClick={() => navigate(`/pacientes/${session.patientId}`)}
                    aria-label={`Abrir prontuário de ${session.patientName}`}
                    className="shrink-0 p-[2px] rounded-[4px] hover:bg-[#f2f6ff] transition-colors cursor-pointer"
                  >
                    <ArrowSquareOut size={14} weight="bold" className="text-[#317dff]" />
                  </button>
                )}
              </div>
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
            aria-label="Fechar"
            className="size-[36px] rounded-[8px] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors cursor-pointer shrink-0"
          >
            <X size={16} weight="bold" className="text-[#75787d]" />
          </button>
        </div>

        <div className="px-[24px] py-[20px] flex flex-col gap-[20px]">
          {/* Quando / onde */}
          <div className="flex flex-col gap-[12px] p-[16px] rounded-[12px] border border-[#efefef] bg-[#fafafa]">
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

          {/* Link da videochamada */}
          {showMeetLink && (
            <div className="flex items-center gap-[8px] h-[48px] px-[14px] rounded-[8px] border border-[#e5e7eb] bg-[#fafafa]">
              <span className="flex-1 min-w-0 truncate font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#317dff]">
                {session.meetingLink}
              </span>
              <button
                type="button"
                onClick={copyLink}
                aria-label="Copiar link"
                title={copied ? "Copiado" : "Copiar link"}
                className="size-[28px] shrink-0 rounded-[6px] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check size={14} weight="bold" className="text-[#047857]" />
                ) : (
                  <Copy size={14} weight="bold" className="text-[#75787d]" />
                )}
              </button>
              <a
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir link"
                title="Abrir link"
                className="size-[28px] shrink-0 rounded-[6px] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <ArrowSquareOut size={14} weight="bold" className="text-[#75787d]" />
              </a>
            </div>
          )}

          {/* Financeiro */}
          {!isBlock && (
            <div className="flex items-center justify-between gap-[12px] p-[16px] rounded-[12px] border border-[#efefef]">
              <div className="flex items-center gap-[10px] min-w-0">
                <CurrencyCircleDollar size={20} weight="bold" className="text-[#65635a] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#737185]">
                    Financeiro
                  </span>
                  <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-black">
                    R$ {session.amount.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 h-[24px] flex items-center px-[10px] rounded-full ${pay.bg} font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] ${pay.text}`}
              >
                {pay.label}
              </span>
            </div>
          )}

          {/* Anotações do agendamento — fora do desenho, mas some junto com o
              dado quando não existe, e escondê-las apagaria algo já gravado. */}
          {session.notes && (
            <div className="flex items-start gap-[10px] p-[14px] rounded-[12px] border border-[#efefef] bg-[#fafafa]">
              <Notepad size={16} weight="bold" className="text-[#65635a] mt-[2px] shrink-0" />
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#1c1b1a]">
                {session.notes}
              </p>
            </div>
          )}

          {/* Ações rápidas — empilhadas, largura cheia */}
          <div className="flex flex-col gap-[8px]">
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#75787d]">
              Ações rápidas
            </p>

            {canConfirm && (
              <ActionButton
                icon={CheckCircle}
                label="Confirmar"
                onClick={() => onAction("confirm")}
                variant="primary"
              />
            )}
            {!isBlock && (
              <>
                <ActionButton
                  icon={ArrowsClockwise}
                  label="Remarcar"
                  onClick={() => onAction("reschedule")}
                  variant="outline"
                />
                <ActionButton
                  icon={ChatCircleText}
                  label="Mensagem"
                  onClick={() => onAction("message")}
                  variant="subtle"
                />
              </>
            )}
            <ActionButton
              icon={Trash}
              label={isBlock ? "Excluir bloqueio" : "Excluir sessão"}
              onClick={() => setConfirmDelete(true)}
              variant="danger"
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={isBlock ? "Excluir bloqueio?" : "Excluir sessão?"}
        description={
          isBlock
            ? `O bloqueio "${session.patientName}" em ${session.startTime}–${session.endTime} será removido permanentemente. Essa ação não pode ser desfeita.`
            : `A sessão de ${session.patientName} em ${session.startTime}–${session.endTime} será removida permanentemente, incluindo seu histórico. Essa ação não pode ser desfeita.`
        }
        confirmLabel={isBlock ? "Excluir bloqueio" : "Excluir sessão"}
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
        <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#737185] shrink-0">
          {label}:
        </span>
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-black truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

const actionVariants = {
  primary: "bg-[#317dff] hover:bg-[#2968d9] text-white border border-transparent",
  outline: "bg-white border border-[#efefef] hover:border-[#d4d4d4] text-[#363636]",
  subtle: "bg-[#fafafa] hover:bg-[#f2f2f2] border border-transparent text-[#363636]",
  danger: "bg-[#ffd8d8] hover:bg-[#ffc9c9] border border-transparent text-[#b91c1c]",
};

function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant,
}: {
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
  label: string;
  onClick: () => void;
  variant: keyof typeof actionVariants;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[44px] w-full rounded-[10px] flex items-center justify-center gap-[8px] transition-colors cursor-pointer ${actionVariants[variant]}`}
    >
      <Icon size={16} weight="bold" />
      <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px]">
        {label}
      </span>
    </button>
  );
}
