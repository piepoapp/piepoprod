import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import type { Patient } from "../data/mockData";
import { listPatients, updatePatientStatus, deletePatient as deletePatientApi } from "../../lib/api/patients";
import {
  MagnifyingGlass,
  Plus,
  X,
  Phone,
  EnvelopeSimple,
  CalendarBlank,
  VideoCamera,
  MapPin,
  ArrowsClockwise,
  FunnelSimple,
  DotsThree,
  ArrowsDownUp,
  User,
  Users,
  Eye,
  Pause,
  Play,
  Trash,
} from "@phosphor-icons/react";
import { NewPatientModal } from "./NewPatientModal";
import { DropdownMenu } from "./DropdownMenu";
import { CountCardsSkeleton, TableSkeleton } from "./skeletons";
import { EmptyState } from "./EmptyState";
import { useSmoothLoading } from "../hooks/useSmoothLoading";

const statusConfig = {
  ativo: {
    label: "Ativo",
    bg: "bg-[#ecfdf3]",
    text: "text-[#037a48]",
    dot: "bg-[#05df72]",
  },
  inativo: {
    label: "Inativo",
    bg: "bg-[#fef3f2]",
    text: "text-[#b42318]",
    dot: "bg-[#e7000b]",
  },
  pausado: {
    label: "Pausado",
    bg: "bg-[#fff6da]",
    text: "text-[#b54708]",
    dot: "bg-[#f5a14b]",
  },
};

const modalityIcon = {
  Online: VideoCamera,
  Presencial: MapPin,
  "Híbrido": ArrowsClockwise,
};

function formatStartDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const month = d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  const year = d.getFullYear();
  return `Desde ${month} de ${year}`;
}

function formatShortDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function PatientDetailPanel({ patient, onClose }: { patient: Patient; onClose: () => void }) {
  const status = statusConfig[patient.status];
  const ModalityIcon = modalityIcon[patient.modality];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-[480px] h-full bg-white shadow-xl border-l border-[#e5e7eb] overflow-y-auto animate-in slide-in-from-right">
        <div className="sticky top-0 bg-white border-b border-[#e5e7eb] p-[24px] flex items-start justify-between z-10">
          <div className="flex items-center gap-[16px]">
            <div className="size-[56px] rounded-full bg-[#ebf2ff] flex items-center justify-center shrink-0">
              <span className="font-['Geist',sans-serif] font-medium text-[20px] text-[#317dff]">
                {patient.initials}
              </span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-[#111827]">
                {patient.name}
              </span>
              <div className="flex items-center gap-[8px]">
                <div className={`flex items-center gap-[6px] rounded-full px-[10px] py-[2px] ${status.bg}`}>
                  <div className={`size-[6px] rounded-full ${status.dot}`} />
                  <span className={`font-['Geist',sans-serif] font-medium text-[12px] ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                <span className="font-['Geist',sans-serif] font-normal text-[13px] text-[#939393]">
                  {patient.age} anos • {patient.gender}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] rounded-[8px] hover:bg-[#f3f4f6] cursor-pointer transition-colors"
          >
            <X size={20} weight="bold" className="text-[#6b7280]" />
          </button>
        </div>

        <div className="p-[24px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#939393] uppercase tracking-[0.5px]">
              Contato
            </span>
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[10px]">
                <EnvelopeSimple size={16} weight="bold" className="text-[#939393]" />
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                  {patient.email}
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <Phone size={16} weight="bold" className="text-[#939393]" />
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                  {patient.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#e5e7eb]" />

          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#939393] uppercase tracking-[0.5px]">
              Sessões
            </span>
            <div className="grid grid-cols-2 gap-[12px]">
              <InfoCard label="Total de sessões" value={String(patient.totalSessions)} />
              <InfoCard label="Frequência" value={patient.frequency} />
              <InfoCard label="Última sessão" value={formatShortDate(patient.lastSession)} />
              <InfoCard label="Próxima sessão" value={formatShortDate(patient.nextSession)} />
            </div>
          </div>

          <div className="h-px bg-[#e5e7eb]" />

          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#939393] uppercase tracking-[0.5px]">
              Detalhes
            </span>
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center gap-[10px]">
                <ModalityIcon size={16} className="text-[#939393]" />
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                  {patient.modality}
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <CalendarBlank size={16} weight="bold" className="text-[#939393]" />
                <span className="font-['Geist',sans-serif] font-normal text-[14px] text-[#111827]">
                  Início em {formatShortDate(patient.startDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#e5e7eb]" />

          <div className="flex flex-col gap-[12px]">
            <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#939393] uppercase tracking-[0.5px]">
              Observações
            </span>
            <div className="bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] p-[16px]">
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[22px] text-[#374151]">
                {patient.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f9fafb] rounded-[8px] border border-[#e5e7eb] p-[12px] flex flex-col gap-[4px]">
      <span className="font-['Geist',sans-serif] font-normal text-[12px] text-[#939393]">
        {label}
      </span>
      <span className="font-['Geist',sans-serif] font-medium text-[14px] text-[#111827]">
        {value}
      </span>
    </div>
  );
}

type FilterStatus = "todos" | "ativo" | "inativo" | "pausado";

export function PatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("todos");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [fetching, setFetching] = useState(true);
  const loading = useSmoothLoading(fetching);
  const [searchParams, setSearchParams] = useSearchParams();

  // Atalho vindo do empty state do Dashboard: /pacientes?novo=1
  useEffect(() => {
    if (searchParams.get("novo") === "1") {
      setNewPatientOpen(true);
      searchParams.delete("novo");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    listPatients()
      .then(setPatients)
      .catch(() => toast.error("Não foi possível carregar os pacientes."))
      .finally(() => setFetching(false));
  }, []);

  const togglePause = async (id: string) => {
    const current = patients.find((p) => p.id === id);
    if (!current) return;
    const newStatus = current.status === "pausado" ? "ativo" : "pausado";
    setPatients((list) => list.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    try {
      await updatePatientStatus(id, newStatus);
    } catch {
      setPatients((list) => list.map((p) => (p.id === id ? { ...p, status: current.status } : p)));
      toast.error("Não foi possível atualizar o status do paciente.");
    }
  };

  const deletePatient = async (id: string) => {
    const previous = patients;
    setPatients((list) => list.filter((p) => p.id !== id));
    try {
      await deletePatientApi(id);
    } catch {
      setPatients(previous);
      toast.error("Não foi possível excluir o paciente.");
    }
  };
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "todos" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sem nenhum paciente cadastrado a tabela é suprimida por completo:
  // fica só o empty state, que carrega a única chamada para ação.
  const noPatients = !loading && patients.length === 0;

  const counts = {
    todos: patients.length,
    ativo: patients.filter((p) => p.status === "ativo").length,
    inativo: patients.filter((p) => p.status === "inativo").length,
    pausado: patients.filter((p) => p.status === "pausado").length,
  };

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: "todos", label: "Todos" },
    { value: "ativo", label: "Ativos" },
    { value: "inativo", label: "Inativos" },
    { value: "pausado", label: "Pausados" },
  ];

  return (
    <div className="flex flex-col gap-[24px] pb-[40px] pt-[24px] px-[40px]">
      {/* Search + Filter + Novo Paciente */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[16px]">
          {/* Search */}
          <div className="relative h-[44px] w-[350px]">
            <MagnifyingGlass size={16} weight="bold" className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#939393]" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full bg-white border-2 border-[#efefef] rounded-[12px] pl-[36px] pr-[12px] font-['Geist',sans-serif] font-medium text-[14px] text-[#111827] placeholder:text-[#939393] placeholder:font-medium outline-none focus:border-[#317dff] transition-colors"
            />
          </div>

          {/* Filter dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center justify-center gap-[8px] h-[44px] bg-white rounded-[12px] px-[16px] cursor-pointer border-2 transition-colors ${
                filterOpen ? "border-[#317dff]" : "border-[#efefef]"
              }`}
            >
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#939393] whitespace-nowrap">
                {statusFilter === "todos"
                  ? "Filtrar por"
                  : filterOptions.find((o) => o.value === statusFilter)?.label}
              </span>
              <FunnelSimple size={16} weight="bold" className="text-[#939393]" />
            </button>

            {filterOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[180px] bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col gap-[4px] items-start justify-center overflow-clip p-[8px] rounded-[8px]">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setStatusFilter(option.value);
                        setFilterOpen(false);
                      }}
                      className={`h-[40px] w-full rounded-[8px] shrink-0 cursor-pointer ${
                        statusFilter === option.value ? "bg-[#f2f6ff]" : "hover:bg-[#f5f5f5]"
                      }`}
                    >
                      <div className="flex items-center p-[12px] size-full">
                        <p
                          className={`flex-[1_0_0] font-['Geist',sans-serif] font-medium leading-[19.2px] text-[14px] text-left ${
                            statusFilter === option.value ? "text-[#2a99ff]" : "text-[#515155]"
                          }`}
                        >
                          {option.label}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Sem pacientes, a única chamada para ação é a do empty state */}
        {!noPatients && (
          <button
            onClick={() => setNewPatientOpen(true)}
            className="flex items-center justify-center gap-[8px] h-[40px] bg-[#317dff] hover:bg-[#2968d9] text-white rounded-[8px] px-[12px] py-[9px] cursor-pointer transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <Plus size={16} weight="bold" />
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px]">
              Novo Paciente
            </span>
          </button>
        )}
      </div>

      {/* Status Cards */}
      {loading ? (
        <CountCardsSkeleton />
      ) : (
      <div className="flex gap-[24px] items-start w-full animate-in fade-in duration-200">
        {(
          [
            { label: "Total", value: counts.todos, color: "#317DFF", desc: "pacientes cadastrados" },
            { label: "Ativos", value: counts.ativo, color: "#05DF72", desc: "em acompanhamento" },
            { label: "Pausados", value: counts.pausado, color: "#F5A14B", desc: "temporariamente" },
            { label: "Inativos", value: counts.inativo, color: "#E7000B", desc: "sem sessões" },
          ] as const
        ).map((card) => (
          <div
            key={card.label}
            className="flex-1 min-w-0 bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] px-[24px] py-[18px]"
          >
            <div className="flex items-center gap-[8px] w-full">
              <div className="size-[8px] rounded-full shrink-0" style={{ backgroundColor: card.color }} />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#6b7280]">
                {card.label}
              </span>
            </div>
            <span className="font-['Geist',sans-serif] font-bold text-[32px] leading-[24px] text-[#111827]">
              {card.value}
            </span>
            <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#939393]">
              {card.desc}
            </span>
          </div>
        ))}
      </div>
      )}

      {/* Table */}
      {/* Table */}
      {noPatients ? (
        <EmptyState
          className="min-h-[360px]"
          icon={<Users size={20} weight="bold" />}
          title="Nenhum paciente cadastrado"
          description="Cadastre seu primeiro paciente para começar a organizar seus atendimentos, sessões e histórico em um só lugar."
          action={{
            label: "Novo Paciente",
            icon: <Plus size={16} weight="bold" />,
            onClick: () => setNewPatientOpen(true),
          }}
        />
      ) : (
      /* Sem overflow-hidden: recortaria o dropdown de ações das linhas.
         Os cantos são arredondados no cabeçalho e na última linha. */
      <div className="relative rounded-[8px] w-full border border-[#e6e6e1]">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_60px] bg-[#f9fafb] border-b border-[#e6e6e1] rounded-t-[8px]">
          <HeaderCell icon={<User size={16} weight="bold" className="text-[#363636]" />} label="Paciente" align="start" />
          <HeaderCell icon={<Phone size={16} weight="bold" className="text-[#363636]" />} label="Contato" align="center" />
          <HeaderCell label="Plano ou frequência" align="center" />
          <HeaderCell icon={<CalendarBlank size={16} weight="bold" className="text-[#363636]" />} label="Data de início" align="center" />
          <HeaderCell label="Modalidade" align="center" />
          <HeaderCell label="Status" align="center" />
          <div className="h-[56px]" />
        </div>

        {/* Rows */}
        {loading ? (
          <TableSkeleton gridTemplate="2fr 1fr 1fr 1fr 1fr 1fr 60px" rows={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            className="min-h-[280px]"
            icon={<MagnifyingGlass size={20} weight="bold" />}
            title="Nenhum paciente encontrado"
            description="Não encontramos pacientes com os filtros aplicados. Tente ajustar a busca ou limpar os filtros."
            secondaryAction={{
              label: "Limpar filtros",
              icon: <ArrowsClockwise size={16} weight="bold" />,
              onClick: () => {
                setSearch("");
                setStatusFilter("todos");
              },
            }}
          />
        ) : (
          filtered.map((patient) => {
            const status = statusConfig[patient.status];
            return (
              <div
                key={patient.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_60px] border-b border-[#e6e6e1] last:border-b-0 last:rounded-b-[8px] hover:bg-[#fafafa] transition-colors animate-in fade-in"
              >
                {/* Paciente */}
                <div className="h-[64px] flex items-center p-[24px] gap-[12px] min-w-0">
                  <div className="size-[40px] rounded-full bg-[#ebf2ff] flex items-center justify-center shrink-0">
                    <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#317dff]">
                      {patient.initials}
                    </span>
                  </div>
                  <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#575757] truncate">
                    {patient.name}
                  </span>
                </div>

                {/* Contato */}
                <CellCenter>{patient.phone}</CellCenter>

                {/* Plano ou frequência */}
                <CellCenter>{patient.frequency}</CellCenter>

                {/* Data de início */}
                <CellCenter>{formatStartDate(patient.startDate)}</CellCenter>

                {/* Modalidade */}
                <div className="h-[64px] flex items-center justify-center gap-[8px] p-[24px]">
                  <ModalitySmallIcon modality={patient.modality} />
                  <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#575757]">
                    {patient.modality}
                  </span>
                </div>

                {/* Status */}
                <div className="h-[64px] flex items-center justify-center p-[24px]">
                  <div
                    className={`flex items-center gap-[6px] h-[24px] rounded-full px-[10px] ${status.bg}`}
                  >
                    <div className={`size-[6px] rounded-full shrink-0 ${status.dot}`} />
                    <span
                      className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[18px] whitespace-nowrap ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="h-[64px] flex items-center justify-center p-[24px]">
                  <DropdownMenu
                    trigger={
                      <button
                        className="size-[28px] flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] cursor-pointer transition-colors"
                      >
                        <DotsThree size={20} weight="bold" className="text-black" />
                      </button>
                    }
                    items={[
                      {
                        label: "Ver detalhes",
                        icon: <Eye size={16} weight="bold" />,
                        onClick: () => setSelectedPatient(patient),
                      },
                      {
                        label: patient.status === "pausado" ? "Retomar paciente" : "Pausar paciente",
                        icon:
                          patient.status === "pausado" ? (
                            <Play size={16} weight="bold" />
                          ) : (
                            <Pause size={16} weight="bold" />
                          ),
                        onClick: () => togglePause(patient.id),
                      },
                      {
                        label: "Excluir",
                        icon: <Trash size={16} weight="bold" />,
                        onClick: () => {
                          if (confirm(`Excluir o paciente ${patient.name}?`)) {
                            deletePatient(patient.id);
                          }
                        },
                        destructive: true,
                        separatorBefore: true,
                      },
                    ]}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      )}

      <NewPatientModal
        open={newPatientOpen}
        onClose={() => setNewPatientOpen(false)}
        onCreated={(patient) => setPatients((list) => [patient, ...list])}
      />

      {selectedPatient && (
        <PatientDetailPanel
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}

function HeaderCell({
  icon,
  label,
  align,
  iconAfter,
}: {
  icon?: React.ReactNode;
  label: string;
  align: "start" | "center";
  iconAfter?: boolean;
}) {
  return (
    <div
      className={`h-[56px] flex items-center gap-[8px] px-[24px] py-[10px] ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      {!iconAfter && icon}
      <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[1.5] text-[#363636] whitespace-nowrap">
        {label}
      </span>
      {iconAfter && icon}
    </div>
  );
}

function CellCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[64px] flex items-center justify-center p-[24px]">
      <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[16.8px] text-[#575757] truncate">
        {children}
      </span>
    </div>
  );
}

function ModalitySmallIcon({ modality }: { modality: Patient["modality"] }) {
  if (modality === "Presencial")
    return <MapPin size={16} weight="bold" className="text-[#939393]" />;
  if (modality === "Híbrido")
    return <ArrowsClockwise size={16} weight="bold" className="text-[#939393]" />;
  return <VideoCamera size={16} weight="bold" className="text-[#939393]" />;
}