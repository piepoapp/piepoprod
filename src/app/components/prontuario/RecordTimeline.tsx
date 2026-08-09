import type { ReactNode } from "react";
import { CheckCircle, DotsThree, PencilSimple, Trash } from "@phosphor-icons/react";
import { DropdownMenu } from "../DropdownMenu";
import { fromISODate, monthLabels, type Session } from "../../data/agendaData";
import type { PatientRecord } from "../../../lib/api/records";

function longDate(iso: string) {
  const d = fromISODate(iso);
  return `${String(d.getDate()).padStart(2, "0")} de ${monthLabels[d.getMonth()].toLowerCase()} de ${d.getFullYear()}`;
}

function editedLabel(record: PatientRecord) {
  if (!record.updatedAt || !record.createdAt) return null;
  const created = new Date(record.createdAt).getTime();
  const updated = new Date(record.updatedAt).getTime();
  // Margem de 1min: o autosave do rascunho não conta como "edição".
  if (updated - created < 60_000) return null;
  const d = new Date(record.updatedAt);
  return `Editado em ${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} às ${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
}

const typeBadge: Record<string, { label: string; bg: string; text: string } | null> = {
  evolucao: null,
  avulso: { label: "Registro avulso", bg: "bg-[#f3f4f6]", text: "text-[#4b5563]" },
  encerramento: { label: "Encerramento", bg: "bg-[#f5f3ff]", text: "text-[#6d28d9]" },
};

interface RecordTimelineProps {
  records: PatientRecord[];
  sessions: Session[];
  /** Observações da triagem, gravadas no cadastro — o registro zero do prontuário. */
  initialNotes?: string;
  initialNotesDate?: string;
  editingId?: string | null;
  renderEditor?: (record: PatientRecord) => ReactNode;
  onEdit: (record: PatientRecord) => void;
  onDelete: (record: PatientRecord) => void;
  onPublishDraft: (record: PatientRecord) => void;
}

export function RecordTimeline({
  records,
  sessions,
  initialNotes,
  initialNotesDate,
  editingId,
  renderEditor,
  onEdit,
  onDelete,
  onPublishDraft,
}: RecordTimelineProps) {
  const sessionById = new Map(sessions.map((s) => [s.id, s]));

  return (
    <div className="flex flex-col">
      {records.map((record) => {
        const session = record.sessionId ? sessionById.get(record.sessionId) : undefined;
        const badge = typeBadge[record.type];
        const edited = editedLabel(record);

        if (editingId === record.id && renderEditor) {
          return (
            <div key={record.id} className="py-[20px] border-b border-[#f3f4f6] last:border-b-0">
              {renderEditor(record)}
            </div>
          );
        }

        return (
          <article
            key={record.id}
            className="group flex flex-col gap-[8px] py-[20px] border-b border-[#f3f4f6] last:border-b-0 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-[8px] flex-wrap">
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#111827]">
                {longDate(record.recordDate)}
              </span>
              {session && (
                <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#939393]">
                  · Sessão {session.startTime}
                </span>
              )}
              {badge && (
                <span
                  className={`h-[20px] flex items-center px-[8px] rounded-full font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] ${badge.bg} ${badge.text}`}
                >
                  {badge.label}
                </span>
              )}
              {record.isDraft && (
                <span className="h-[20px] flex items-center px-[8px] rounded-full bg-[#fef9c3] text-[#854d0e] font-['Geist',sans-serif] font-medium text-[12px] leading-[16px]">
                  Rascunho
                </span>
              )}

              <div className="ml-auto opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <DropdownMenu
                  trigger={
                    <button className="size-[28px] flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] cursor-pointer transition-colors">
                      <DotsThree size={18} weight="bold" className="text-[#6b7280]" />
                    </button>
                  }
                  items={[
                    ...(record.isDraft
                      ? [
                          {
                            label: "Finalizar rascunho",
                            icon: <CheckCircle size={16} weight="bold" />,
                            onClick: () => onPublishDraft(record),
                          },
                        ]
                      : []),
                    {
                      label: "Editar registro",
                      icon: <PencilSimple size={16} weight="bold" />,
                      onClick: () => onEdit(record),
                    },
                    {
                      label: "Excluir registro",
                      icon: <Trash size={16} weight="bold" />,
                      onClick: () => onDelete(record),
                      destructive: true,
                      separatorBefore: true,
                    },
                  ]}
                />
              </div>
            </div>

            <p className="font-['Geist',sans-serif] font-normal text-[16px] leading-[24px] text-[#374151] whitespace-pre-wrap">
              {record.content}
            </p>

            {edited && (
              <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#a1a1aa]">
                {edited}
              </span>
            )}
          </article>
        );
      })}

      {initialNotes && (
        <article className="flex flex-col gap-[8px] py-[20px] border-t border-[#f3f4f6]">
          <div className="flex items-center gap-[8px] flex-wrap">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#111827]">
              {initialNotesDate ? longDate(initialNotesDate) : "Início do acompanhamento"}
            </span>
            <span className="h-[20px] flex items-center px-[8px] rounded-full bg-[#f2f6ff] text-[#317dff] font-['Geist',sans-serif] font-medium text-[12px] leading-[16px]">
              Observações iniciais · do cadastro
            </span>
          </div>
          <p className="font-['Geist',sans-serif] font-normal text-[16px] leading-[24px] text-[#374151] whitespace-pre-wrap">
            {initialNotes}
          </p>
        </article>
      )}
    </div>
  );
}
