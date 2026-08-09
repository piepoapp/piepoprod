import { useState } from "react";
import {
  CalendarPlus,
  CaretRight,
  ChatCircleText,
  CheckCircle,
  Plus,
  WarningCircle,
} from "@phosphor-icons/react";
import {
  fromISODate,
  monthLabels,
  statusMeta,
  toISODate,
  type Session,
} from "../../data/agendaData";
import type { PatientDetail } from "../../../lib/api/patients";

const statusConfig = {
  ativo: { label: "Ativo", bg: "bg-[#ecfdf3]", text: "text-[#037a48]", dot: "bg-[#05df72]" },
  inativo: { label: "Inativo", bg: "bg-[#fef3f2]", text: "text-[#b42318]", dot: "bg-[#e7000b]" },
  pausado: { label: "Pausado", bg: "bg-[#fff6da]", text: "text-[#b54708]", dot: "bg-[#f5a14b]" },
};

/** "11 meses", "1 ano e 3 meses" — tempo desde o início do acompanhamento. */
function followUpLabel(startDate: string): string {
  const start = fromISODate(startDate);
  const now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  if (months < 1) return "menos de 1 mês";
  if (months < 12) return months === 1 ? "1 mês" : `${months} meses`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearPart = years === 1 ? "1 ano" : `${years} anos`;
  if (rest === 0) return yearPart;
  return `${yearPart} e ${rest === 1 ? "1 mês" : `${rest} meses`}`;
}

/** "Hoje", "Amanhã" ou "09 de julho". */
function dayLabel(iso: string): string {
  const today = toISODate(new Date());
  if (iso === today) return "Hoje";
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (iso === toISODate(tomorrow)) return "Amanhã";
  const d = fromISODate(iso);
  return `${String(d.getDate()).padStart(2, "0")} de ${monthLabels[d.getMonth()].toLowerCase()}`;
}

function fullDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = fromISODate(iso.slice(0, 10));
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function money(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function durationLabel(session: Session): string {
  const [sh, sm] = session.startTime.split(":").map(Number);
  const [eh, em] = session.endTime.split(":").map(Number);
  const minutes = eh * 60 + em - (sh * 60 + sm);
  return minutes > 0 ? `${minutes} min` : "";
}

interface Props {
  patient: PatientDetail;
  sessions: Session[];
  completedCount: number;
  nextSession: Session | null;
  onScheduleSession: () => void;
  onSendMessage: () => void;
  onOpenPending: () => void;
}

export function PatientAside({
  patient,
  sessions,
  completedCount,
  nextSession,
  onScheduleSession,
  onSendMessage,
  onOpenPending,
}: Props) {
  const status = statusConfig[patient.status];

  const pending = sessions.filter((s) => s.payment === "pending" || s.payment === "overdue");
  const pendingTotal = pending.reduce((sum, s) => sum + (s.amount ?? 0), 0);

  return (
    <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-[16px]">
      <PatientCard
        patient={patient}
        status={status}
        completedCount={completedCount}
        onScheduleSession={onScheduleSession}
        onSendMessage={onSendMessage}
      />

      <NextSessionCard
        session={nextSession}
        pendingCount={pending.length}
        pendingTotal={pendingTotal}
        onSchedule={onScheduleSession}
        onOpenPending={onOpenPending}
      />

      <ClinicalSummaryCard patient={patient} />

      <PersonalDataCard patient={patient} />
    </aside>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-[20px] py-[20px] flex flex-col gap-[16px]">
      {children}
    </div>
  );
}

function CardLabel({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[8px]">
      <span className="font-['Geist',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.5px] text-[#a1a1aa] uppercase">
        {children}
      </span>
      {action}
    </div>
  );
}

function PatientCard({
  patient,
  status,
  completedCount,
  onScheduleSession,
  onSendMessage,
}: {
  patient: PatientDetail;
  status: { label: string; bg: string; text: string; dot: string };
  completedCount: number;
  onScheduleSession: () => void;
  onSendMessage: () => void;
}) {
  const meta = [
    patient.age > 0 ? `${patient.age} anos` : null,
    patient.gender,
    patient.frequency,
    patient.modality,
  ].filter(Boolean);

  return (
    <Card>
      <div className="flex flex-col items-center gap-[10px] text-center">
        <div className="size-[72px] rounded-full bg-[#ebf2ff] flex items-center justify-center">
          <span className="font-['Geist',sans-serif] font-medium text-[24px] text-[#317dff]">
            {patient.initials}
          </span>
        </div>

        <div className={`flex items-center gap-[6px] rounded-full px-[10px] py-[2px] ${status.bg}`}>
          <div className={`size-[6px] rounded-full ${status.dot}`} />
          <span className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] ${status.text}`}>
            {status.label}
          </span>
        </div>

        <div className="flex flex-col gap-[4px] w-full">
          <h1 className="font-['Geist',sans-serif] font-semibold text-[22px] leading-[28px] tracking-[-0.4px] text-[#111827]">
            {patient.name}
          </h1>
          <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393]">
            {meta.join(" • ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[10px]">
        <StatBox label="Sessões realizadas" value={String(completedCount)} />
        <StatBox label="Acompanhamento" value={followUpLabel(patient.startDate)} />
      </div>

      <div className="flex flex-col gap-[8px]">
        <button
          type="button"
          onClick={onScheduleSession}
          className="h-[44px] w-full flex items-center justify-center gap-[8px] rounded-[8px] bg-[#317dff] hover:bg-[#2968d9] transition-colors cursor-pointer shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          <Plus size={16} weight="bold" className="text-white" />
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-white">
            Agendar sessão
          </span>
        </button>
        <button
          type="button"
          onClick={onSendMessage}
          className="h-[44px] w-full flex items-center justify-center gap-[8px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          <ChatCircleText size={16} weight="bold" className="text-[#65635a]" />
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#65635a]">
            Enviar mensagem
          </span>
        </button>
      </div>
    </Card>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] px-[12px] py-[10px] flex flex-col gap-[4px] min-w-0">
      <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393] truncate">
        {label}
      </span>
      <span className="font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] text-[#111827]">
        {value}
      </span>
    </div>
  );
}

function NextSessionCard({
  session,
  pendingCount,
  pendingTotal,
  onSchedule,
  onOpenPending,
}: {
  session: Session | null;
  pendingCount: number;
  pendingTotal: number;
  onSchedule: () => void;
  onOpenPending: () => void;
}) {
  return (
    <Card>
      <CardLabel>Próxima sessão</CardLabel>

      {session ? (
        <div className="flex items-center gap-[12px]">
          <DateChip iso={session.date} />
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#111827] truncate">
              {dayLabel(session.date)} · {session.startTime}
            </span>
            <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393] truncate">
              {session.modality === "online" ? "Online" : "Presencial"}
              {durationLabel(session) && ` · ${durationLabel(session)}`}
            </span>
          </div>
          <div
            className={`flex items-center gap-[6px] rounded-full px-[10px] py-[2px] shrink-0 ${statusMeta[session.status].bg}`}
          >
            <div className={`size-[6px] rounded-full ${statusMeta[session.status].dot}`} />
            <span
              className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] whitespace-nowrap ${statusMeta[session.status].text}`}
            >
              {statusMeta[session.status].label}
            </span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onSchedule}
          className="flex items-center gap-[10px] w-full rounded-[8px] border border-dashed border-[#e4e4e7] px-[12px] py-[12px] hover:border-[#317dff] hover:bg-[#fafbff] transition-colors cursor-pointer text-left"
        >
          <CalendarPlus size={18} weight="bold" className="text-[#939393] shrink-0" />
          <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#75787d]">
            Nenhuma sessão agendada. <span className="text-[#317dff] font-medium">Agendar agora</span>
          </span>
        </button>
      )}

      {pendingCount > 0 && (
        <button
          type="button"
          onClick={onOpenPending}
          className="flex items-center gap-[8px] w-full bg-[#fefae8] border border-[#f5e7a3] rounded-[8px] px-[12px] py-[10px] hover:bg-[#fdf6d8] transition-colors cursor-pointer text-left"
        >
          <WarningCircle size={16} weight="bold" className="text-[#8a6a00] shrink-0" />
          <span className="flex-1 min-w-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#8a6a00] truncate">
            {pendingCount === 1 ? "1 pagamento pendente" : `${pendingCount} pagamentos pendentes`} ·{" "}
            {money(pendingTotal)}
          </span>
          <CaretRight size={14} weight="bold" className="text-[#8a6a00] shrink-0" />
        </button>
      )}
    </Card>
  );
}

function DateChip({ iso }: { iso: string }) {
  const d = fromISODate(iso);
  return (
    <div className="size-[44px] shrink-0 rounded-[8px] bg-[#f2f6ff] border border-[#d6e4ff] flex flex-col items-center justify-center">
      <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] text-[#317dff] uppercase">
        {monthLabels[d.getMonth()].slice(0, 3)}
      </span>
      <span className="font-['Geist',sans-serif] font-semibold text-[16px] leading-[18px] text-[#111827]">
        {String(d.getDate()).padStart(2, "0")}
      </span>
    </div>
  );
}

function ClinicalSummaryCard({ patient }: { patient: PatientDetail }) {
  const [expanded, setExpanded] = useState(false);
  const c = patient.clinicalInfo;

  const hasExtra = !!(c.tratamentosAnteriores || c.situacaoProfissional || c.comQuemMora);
  const isEmpty =
    !c.motivoConsulta && !c.diagnosticosPrevios && !c.medicamentosEmUso && !hasExtra;

  return (
    <Card>
      <CardLabel>Resumo clínico</CardLabel>

      {isEmpty ? (
        <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393]">
          Anamnese não preenchida no cadastro.
        </p>
      ) : (
        <div className="flex flex-col gap-[14px]">
          <Field label="Queixa inicial" value={c.motivoConsulta} />
          <Field label="Diagnósticos prévios" value={c.diagnosticosPrevios} />
          <Field label="Medicamentos em uso" value={c.medicamentosEmUso} />

          {expanded && (
            <>
              <Field label="Tratamentos anteriores" value={c.tratamentosAnteriores} />
              <Field label="Situação profissional" value={c.situacaoProfissional} />
              <Field label="Com quem mora" value={c.comQuemMora} />
            </>
          )}

          {hasExtra && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="self-start font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#317dff] hover:underline cursor-pointer"
            >
              {expanded ? "Recolher anamnese" : "Ver anamnese completa"}
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-[2px]">
      <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
        {label}
      </span>
      <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#374151]">
        {value}
      </p>
    </div>
  );
}

function PersonalDataCard({ patient }: { patient: PatientDetail }) {
  const b = patient.billingInfo;
  const local = [patient.cidade, patient.estado].filter(Boolean).join(" / ");
  const plano = [
    b.modalidadePagamento === "convenio" ? b.nomePlano || "Convênio" : "Particular",
    b.valorSessao,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Card>
      <CardLabel>Dados pessoais</CardLabel>

      <div className="flex flex-col gap-[10px]">
        <DataRow label="WhatsApp" value={patient.phone} />
        <DataRow label="E-mail" value={patient.email} />
        <DataRow label="Nascimento" value={fullDate(patient.birthDate)} />
        <DataRow label="Cidade" value={local} />
        <DataRow label="Plano" value={plano} />
      </div>

      {(patient.emergenciaNome || patient.emergenciaTelefone) && (
        <div className="flex flex-col gap-[6px] pt-[14px] border-t border-[#f3f4f6]">
          <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
            Contato de emergência
          </span>
          <div className="flex items-baseline justify-between gap-[8px]">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#111827] truncate">
              {patient.emergenciaNome || "—"}
            </span>
            <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#374151] shrink-0">
              {patient.emergenciaTelefone}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-[8px] pt-[14px] border-t border-[#f3f4f6]">
        {patient.lgpdAccepted ? (
          <CheckCircle size={15} weight="bold" className="text-[#10b981] shrink-0" />
        ) : (
          <WarningCircle size={15} weight="bold" className="text-[#eab308] shrink-0" />
        )}
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#75787d]">
          {patient.lgpdAccepted
            ? `Consentimento LGPD registrado${fullDate(patient.consentDate) ? ` em ${fullDate(patient.consentDate)}` : ""}`
            : "Consentimento LGPD não registrado"}
        </span>
      </div>
    </Card>
  );
}

function DataRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-[12px]">
      <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393] shrink-0">
        {label}
      </span>
      <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#374151] text-right truncate">
        {value}
      </span>
    </div>
  );
}
