import svgPaths from "../../imports/svg-ifwz00yaeh";
import { useState } from "react";
import type { Appointment } from "../data/mockData";
import { X, Video, MapPin, Clock, Calendar, Copy, ExternalLink } from "lucide-react";
import { PlusCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { EmptyStateSkeleton, ListSkeleton } from "./skeletons";
import { useEmptyStateHint } from "../hooks/useEmptyStateHint";
import { EmptyState } from "./EmptyState";
import emptyAppointmentsImage from "../../assets/empty-appointments.png";

const badgeStyles = {
  primary: "bg-[#317dff] text-white border-[rgba(159,95,255,0.3)]",
  return: "bg-[#ebf2ff] text-[#317dff] border-[rgba(49,125,255,0.3)]",
  rescheduled: "bg-[#fff5e6] text-[#f5a14b] border-[rgba(254,154,0,0.3)]",
};

const badgeModalStyles = {
  primary: { bg: "bg-[#ebf2ff]", text: "text-[#317dff]", label: "Primeira sessão" },
  return: { bg: "bg-[#ebf2ff]", text: "text-[#317dff]", label: "Retorno" },
  rescheduled: { bg: "bg-[#fff5e6]", text: "text-[#f5a14b]", label: "Remarcado" },
};

// Mock extra data for appointments
const appointmentDetails: Record<string, { email: string; phone: string; duration: string; link: string; notes: string }> = {
  "1": { email: "roberto.costa@email.com", phone: "(11) 98765-4321", duration: "50 min", link: "https://meet.google.com/abc-defg-hij", notes: "Primeira sessão — acolhimento e anamnese inicial." },
  "2": { email: "joao.oliveira@email.com", phone: "(11) 91234-5678", duration: "50 min", link: "https://meet.google.com/klm-nopq-rst", notes: "Retorno semanal. Revisar exercícios de respiração." },
  "3": { email: "joao.oliveira@email.com", phone: "(11) 91234-5678", duration: "50 min", link: "https://meet.google.com/klm-nopq-rst", notes: "Continuação do acompanhamento semanal." },
  "4": { email: "paula.monteiro@email.com", phone: "(21) 99876-5432", duration: "50 min", link: "https://meet.google.com/uvw-xyza-bcd", notes: "Sessão remarcada. Questões de relacionamento." },
  "5": { email: "ana.souza@email.com", phone: "(11) 98321-6547", duration: "50 min", link: "", notes: "Sessão presencial. Burnout profissional." },
  "6": { email: "marcos.lima@email.com", phone: "(21) 99123-4567", duration: "50 min", link: "https://meet.google.com/efg-hijk-lmn", notes: "Processo de luto. Sessão de acompanhamento." },
  "7": { email: "carla.ferreira@email.com", phone: "(11) 97654-3210", duration: "50 min", link: "", notes: "Retorno presencial. Avaliar evolução da fobia social." },
  "8": { email: "lucas.ribeiro@email.com", phone: "(11) 96543-2109", duration: "50 min", link: "https://meet.google.com/opq-rstu-vwx", notes: "Acompanhamento. Autoestima e insegurança." },
};

function getDetails(id: string) {
  return appointmentDetails[id] || { email: "paciente@email.com", phone: "(00) 00000-0000", duration: "50 min", link: "https://meet.google.com/xxx-yyyy-zzz", notes: "Sessão de acompanhamento." };
}

function AppointmentModal({ appointment, onClose }: { appointment: Appointment; onClose: () => void }) {
  const details = getDetails(appointment.id);
  const badgeModal = badgeModalStyles[appointment.badgeType];
  const isOnline = appointment.platform.toLowerCase().includes("meet") || appointment.platform.toLowerCase().includes("zoom");
  const [copied, setCopied] = useState(false);

  function copyLink() {
    if (details.link) {
      navigator.clipboard.writeText(details.link).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-[16px] shadow-2xl w-[480px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-[24px] pb-[16px] border-b border-[#e5e7eb]">
          <div className="flex items-center gap-[16px]">
            <div
              className={`size-[48px] rounded-full flex items-center justify-center shrink-0 ${
                appointment.highlighted ? "bg-[#317dff]" : "bg-[#ebf2ff]"
              }`}
            >
              <span
                className={`font-['Geist',sans-serif] font-medium text-[18px] ${
                  appointment.highlighted ? "text-white" : "text-[#317dff]"
                }`}
              >
                {appointment.initials}
              </span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <span className="font-['Geist',sans-serif] font-medium text-[18px] leading-[22px] text-[#111827]">
                {appointment.name}
              </span>
              <div className={`inline-flex items-center gap-[6px] rounded-full px-[10px] py-[2px] ${badgeModal.bg} self-start`}>
                <div className={`size-[6px] rounded-full ${appointment.badgeType === "rescheduled" ? "bg-[#f5a14b]" : "bg-[#317dff]"}`} />
                <span className={`font-['Geist',sans-serif] font-medium text-[12px] ${badgeModal.text}`}>
                  {badgeModal.label}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] rounded-[8px] hover:bg-[#f3f4f6] cursor-pointer transition-colors"
          >
            <X size={18} className="text-[#6b7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-[24px] flex flex-col gap-[20px]">
          {/* Session Info */}
          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#939393] uppercase tracking-[0.5px]">
              Sessão
            </span>
            <div className="grid grid-cols-2 gap-[12px]">
              <div className="flex items-center gap-[10px] bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] p-[12px]">
                <Calendar size={16} className="text-[#939393] shrink-0" />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-['Geist',sans-serif] font-normal text-[12px] text-[#939393]">Data e hora</span>
                  <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#111827]">{appointment.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-[10px] bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] p-[12px]">
                <Clock size={16} className="text-[#939393] shrink-0" />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-['Geist',sans-serif] font-normal text-[12px] text-[#939393]">Duração</span>
                  <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#111827]">{details.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#e5e7eb]" />

          {/* Platform & Link */}
          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#939393] uppercase tracking-[0.5px]">
              Plataforma
            </span>
            <div className="flex items-center gap-[10px]">
              {isOnline ? <Video size={16} className="text-[#939393]" /> : <MapPin size={16} className="text-[#939393]" />}
              <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                {appointment.platform}
              </span>
            </div>
            {isOnline && details.link && (
              <div className="flex items-center gap-[8px] bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] px-[12px] py-[10px]">
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#317dff] flex-1 truncate">
                  {details.link}
                </span>
                <button
                  onClick={copyLink}
                  className="p-[6px] rounded-[6px] hover:bg-[#ebf2ff] cursor-pointer transition-colors shrink-0"
                  title="Copiar link"
                >
                  <Copy size={14} className={copied ? "text-[#05df72]" : "text-[#939393]"} />
                </button>
                <a
                  href={details.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-[6px] rounded-[6px] hover:bg-[#ebf2ff] cursor-pointer transition-colors shrink-0"
                  title="Abrir link"
                >
                  <ExternalLink size={14} className="text-[#939393]" />
                </a>
              </div>
            )}
          </div>

          <div className="h-px bg-[#e5e7eb]" />

          {/* Contact */}
          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#939393] uppercase tracking-[0.5px]">
              Contato do paciente
            </span>
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[10px]">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M2.667 2.667h10.666c.734 0 1.334.6 1.334 1.333v8c0 .733-.6 1.333-1.334 1.333H2.667c-.734 0-1.334-.6-1.334-1.333V4c0-.733.6-1.333 1.334-1.333z" stroke="#939393" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M14.667 4L8 8.667 1.333 4" stroke="#939393" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                  {details.email}
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M14.667 11.28v2a1.333 1.333 0 01-1.454 1.333 13.193 13.193 0 01-5.753-2.046 13 13 0 01-4-4 13.193 13.193 0 01-2.047-5.78A1.333 1.333 0 012.74 1.333h2a1.333 1.333 0 011.334 1.147 8.56 8.56 0 00.466 1.873 1.333 1.333 0 01-.3 1.407l-.846.847a10.667 10.667 0 004 4l.846-.847a1.333 1.333 0 011.407-.3 8.56 8.56 0 001.873.467 1.333 1.333 0 011.147 1.353z" stroke="#939393" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                  {details.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#e5e7eb]" />

          {/* Notes */}
          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#939393] uppercase tracking-[0.5px]">
              Observações
            </span>
            <div className="bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] p-[14px]">
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[22px] text-[#374151]">
                {details.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e5e7eb] px-[24px] py-[16px] flex items-center justify-end gap-[12px]">
          <button
            onClick={onClose}
            className="px-[16px] py-[9px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] cursor-pointer transition-colors"
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#374151]">
              Fechar
            </span>
          </button>
          {isOnline && details.link && (
            <a
              href={details.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[8px] px-[16px] py-[9px] rounded-[8px] bg-[#317dff] hover:bg-[#2968d9] cursor-pointer transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            >
              <Video size={16} className="text-white" />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] text-white">
                Entrar na sessão
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function AppointmentRow({ appointment, onView }: { appointment: Appointment; onView: (id: string) => void }) {
  const isHighlighted = appointment.highlighted;

  return (
    <div
      className={`w-full rounded-[8px] border transition-all duration-150 animate-in fade-in ${
        isHighlighted
          ? "bg-[#ebf2ff] border-[#ebf2ff]"
          : "border-[#e5e7eb] hover:border-[#317dff]/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between px-[17px] py-[20px]">
        {/* Left: Avatar + Info */}
        <div className="flex gap-[16px] items-center">
          <div
            className={`size-[40px] rounded-full flex items-center justify-center shrink-0 ${
              isHighlighted ? "bg-[#317dff]" : "bg-[#ebf2ff]"
            }`}
          >
            <span
              className={`font-['Geist',sans-serif] font-medium text-[14px] ${
                isHighlighted ? "text-white" : "text-[#317dff]"
              }`}
            >
              {appointment.initials}
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Geist',sans-serif] font-medium leading-[19.2px] text-[#1c1c1c] text-[16px]">
              {appointment.name}
            </span>
            <div className="flex items-center gap-[6px]">
              <div className="flex items-center gap-[4px]">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d={svgPaths.p2d2f6100} fill="#656972" />
                </svg>
                <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#656972]">
                  {appointment.time}
                </span>
              </div>
              <span className="font-['Geist',sans-serif] font-medium text-[12px] text-[#656972]">
                •
              </span>
              <div className="flex items-center gap-[4px]">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d={svgPaths.pdac3800} fill="#656972" />
                </svg>
                <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#656972]">
                  {appointment.platform}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Badge + Eye icon */}
        <div className="flex items-center gap-[8px]">
          <div
            className={`rounded-[8px] px-[9px] py-[3px] border font-['Geist',sans-serif] font-medium text-[12px] text-center leading-[16px] ${
              badgeStyles[appointment.badgeType]
            }`}
          >
            {appointment.badge}
          </div>
          <button
            onClick={() => onView(appointment.id)}
            className={`p-[8px] rounded-[8px] cursor-pointer transition-colors bg-transparent ${
              isHighlighted ? "hover:bg-[rgba(80,144,255,0.2)]" : "hover:bg-[#f3f4f6]"
            }`}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d={svgPaths.p1c5a2600}
                fill={isHighlighted ? "#6C7E9B" : "#8495B2"}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface AppointmentsListProps {
  appointments: Appointment[];
  loading?: boolean;
}

export function AppointmentsList({ appointments, loading = false }: AppointmentsListProps) {
  const [modalAppointment, setModalAppointment] = useState<Appointment | null>(null);
  const navigate = useNavigate();
  const emptyHint = useEmptyStateHint("dashboard.appointments", loading, appointments.length === 0);
  // Durante o carregamento seguimos o hint, para o padding não mudar na troca.
  const isEmpty = loading ? emptyHint : appointments.length === 0;

  return (
    <div className="flex-1 bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] min-w-0 self-stretch">
      <div
        className={`flex flex-col gap-[16px] px-[24px] pt-[24px] h-full ${
          isEmpty ? "pb-[24px]" : "pb-[48px]"
        }`}
      >
        {/* Header */}
        <div className="flex gap-[8px] items-start">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="shrink-0 mt-[2px]">
            <path d={svgPaths.p311f5400} fill="#317DFF" />
          </svg>
          <div className="flex flex-col gap-[4px]">
            <span className="font-['Geist',sans-serif] font-medium text-[16px] leading-[19.2px] text-black">
              Próximos atendimentos
            </span>
            <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#939393]">
              Veja quem você atende a seguir
            </span>
          </div>
        </div>

        {/* Appointments */}
        {loading ? (
          emptyHint ? (
            <EmptyStateSkeleton media="image" withAction descriptionLines={3} />
          ) : (
            <ListSkeleton rows={4} />
          )
        ) : appointments.length === 0 ? (
          <EmptyState
            image={emptyAppointmentsImage}
            title="Nenhum atendimento agendado"
            description="Você ainda não tem atendimentos agendados. Cadastre um paciente e agende sua primeira sessão. Seus próximos atendimentos aparecerão aqui."
            action={{
              label: "Cadastrar primeiro paciente",
              icon: <PlusCircle size={16} weight="bold" />,
              onClick: () => navigate("/pacientes?novo=1"),
            }}
          />
        ) : (
          appointments.map((apt) => (
            <AppointmentRow
              key={apt.id}
              appointment={apt}
              onView={(id) => {
                const found = appointments.find((a) => a.id === id);
                if (found) setModalAppointment(found);
              }}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {modalAppointment && (
        <AppointmentModal
          appointment={modalAppointment}
          onClose={() => setModalAppointment(null)}
        />
      )}
    </div>
  );
}