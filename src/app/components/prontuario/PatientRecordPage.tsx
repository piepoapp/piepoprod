import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  ArrowClockwise,
  CalendarPlus,
  CaretRight,
  DotsThree,
  Notepad,
  SealCheck,
  WarningCircle,
} from "@phosphor-icons/react";
import { getPatient, type PatientDetail } from "../../../lib/api/patients";
import { listSessionsByPatient } from "../../../lib/api/sessions";
import {
  deleteRecord as deleteRecordApi,
  listRecordsByPatient,
  updateRecord,
  type PatientRecord,
  type RecordType,
} from "../../../lib/api/records";
import { toISODate, type Session } from "../../data/agendaData";
import { useSmoothLoading } from "../../hooks/useSmoothLoading";
import { EmptyState } from "../EmptyState";
import { ConfirmDialog } from "../ConfirmDialog";
import { SkeletonBox, SkeletonCircle, SkeletonLine } from "../skeletons";
import { DropdownMenu } from "../DropdownMenu";
import { PatientAside } from "./PatientAside";
import { RecordComposer } from "./RecordComposer";
import { RecordTimeline } from "./RecordTimeline";
import { SendMessageSheet } from "./SendMessageSheet";

export function PatientRecordPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // Vem da Agenda: /pacientes/:id?registrar=<sessionId>
  const requestedSessionId = searchParams.get("registrar");

  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [records, setRecords] = useState<PatientRecord[]>([]);

  const [fetchingPatient, setFetchingPatient] = useState(true);
  const [fetchingRecords, setFetchingRecords] = useState(true);
  const [patientError, setPatientError] = useState(false);
  const [recordsError, setRecordsError] = useState(false);

  const [editing, setEditing] = useState<PatientRecord | null>(null);
  const [toDelete, setToDelete] = useState<PatientRecord | null>(null);
  const [composerType, setComposerType] = useState<RecordType>("evolucao");
  const [messageOpen, setMessageOpen] = useState(false);

  const loadingPatient = useSmoothLoading(fetchingPatient);
  const loadingRecords = useSmoothLoading(fetchingRecords);
  const composerRef = useRef<HTMLDivElement>(null);

  // Paciente e sessões alimentam header e ficha; a timeline carrega em paralelo
  // para que a tela nunca fique inteiramente cinza.
  useEffect(() => {
    if (!id) return;
    setFetchingPatient(true);
    setPatientError(false);
    Promise.all([getPatient(id), listSessionsByPatient(id)])
      .then(([p, s]) => {
        setPatient(p);
        setSessions(s);
      })
      .catch(() => setPatientError(true))
      .finally(() => setFetchingPatient(false));
  }, [id]);

  function loadRecords() {
    setFetchingRecords(true);
    setRecordsError(false);
    listRecordsByPatient(id)
      .then(setRecords)
      .catch(() => setRecordsError(true))
      .finally(() => setFetchingRecords(false));
  }

  useEffect(() => {
    if (!id) return;
    loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const stats = useMemo(() => {
    const today = toISODate(new Date());
    const completed = sessions.filter((s) => s.status === "completed");
    const past = [...completed].sort((a, b) => b.date.localeCompare(a.date));
    const upcoming = sessions
      .filter((s) => s.date >= today && s.status !== "cancelled" && s.status !== "completed")
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
    return {
      completed: completed.length,
      lastSession: past[0] ?? null,
      nextSession: upcoming[0] ?? null,
    };
  }, [sessions]);

  /**
   * Sessão sugerida para vincular: a mais recente já ocorrida que ainda não tem
   * registro. É o que evita abrir um date picker no fluxo do dia a dia.
   */
  const suggestedSession = useMemo(() => {
    // Quando o psicólogo veio da Agenda, a sessão escolhida por ele manda.
    if (requestedSessionId) {
      const requested = sessions.find((s) => s.id === requestedSessionId);
      if (requested) return requested;
    }
    const today = toISODate(new Date());
    const used = new Set(records.map((r) => r.sessionId).filter(Boolean));
    return (
      sessions
        .filter((s) => s.date <= today && s.status !== "cancelled" && s.status !== "blocked")
        .filter((s) => !used.has(s.id))
        .sort((a, b) => b.date.localeCompare(a.date) || b.startTime.localeCompare(a.startTime))[0] ?? null
    );
  }, [sessions, records, requestedSessionId]);

  // Chegando pela Agenda, o cursor já nasce dentro do compositor.
  useEffect(() => {
    if (!requestedSessionId || !patient) return;
    composerRef.current?.querySelector("textarea")?.focus();
    searchParams.delete("registrar");
    setSearchParams(searchParams, { replace: true });
    // Só deve rodar quando a página termina de montar com o parâmetro presente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedSessionId, patient]);

  const draftCount = records.filter((r) => r.isDraft).length;

  function focusComposer(type: RecordType) {
    setComposerType(type);
    setEditing(null);
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    composerRef.current?.querySelector("textarea")?.focus();
  }

  function handleSaved(saved: PatientRecord, completedSessionId: string | null) {
    setRecords((list) => {
      const without = list.filter((r) => r.id !== saved.id);
      return [saved, ...without].sort(
        (a, b) => b.recordDate.localeCompare(a.recordDate) || b.createdAt.localeCompare(a.createdAt),
      );
    });
    if (completedSessionId) {
      setSessions((list) =>
        list.map((s) => (s.id === completedSessionId ? { ...s, status: "completed" } : s)),
      );
    }
    setEditing(null);
    setComposerType("evolucao");
    toast.success(completedSessionId ? "Evolução registrada e sessão marcada como realizada" : "Evolução registrada");
  }

  async function handleEditSaved(saved: PatientRecord) {
    setRecords((list) => list.map((r) => (r.id === saved.id ? saved : r)));
    setEditing(null);
    toast.success("Registro atualizado");
  }

  async function confirmDelete() {
    if (!toDelete) return;
    const previous = records;
    setRecords((list) => list.filter((r) => r.id !== toDelete.id));
    setToDelete(null);
    try {
      await deleteRecordApi(toDelete.id);
    } catch {
      setRecords(previous);
      toast.error("Não foi possível excluir o registro.");
    }
  }

  async function publishDraft(record: PatientRecord) {
    try {
      const saved = await updateRecord(record.id, { isDraft: false });
      setRecords((list) => list.map((r) => (r.id === saved.id ? saved : r)));
    } catch {
      toast.error("Não foi possível finalizar o rascunho.");
    }
  }

  if (patientError) {
    return (
      <div className="flex flex-col p-[32px]">
        <EmptyState
          className="min-h-[420px]"
          icon={<WarningCircle size={20} weight="bold" />}
          title="Paciente não encontrado"
          description="Este paciente não existe ou você não tem acesso a ele. Verifique o link ou volte para a lista de pacientes."
          action={{ label: "Voltar para Pacientes", onClick: () => (window.location.href = "/pacientes") }}
        />
      </div>
    );
  }

  if (loadingPatient || !patient) return <RecordPageSkeleton />;

  return (
    <div className="flex flex-col gap-[16px] p-[32px]">
      <Breadcrumb name={patient.name} />

      <div className="flex flex-col lg:flex-row gap-[16px] items-start w-full">
        <PatientAside
          patient={patient}
          sessions={sessions}
          completedCount={stats.completed}
          nextSession={stats.nextSession}
          onScheduleSession={() => navigate(`/agenda?agendar=${patient.id}`)}
          onSendMessage={() => setMessageOpen(true)}
          onOpenPending={() => navigate("/agenda")}
        />

        <main className="flex-1 min-w-0 w-full flex flex-col gap-[16px] bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-[24px] py-[20px]">
          <div className="flex items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[8px]">
              <h2 className="font-['Geist',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.5px] text-[#a1a1aa] uppercase">
                Evolução
              </h2>
              {records.length > 0 && (
                <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#75787d] bg-[#f3f4f6] px-[7px] py-[1px] rounded-full">
                  {records.length}
                </span>
              )}
              {draftCount > 0 && (
                <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#854d0e] bg-[#fef9c3] px-[8px] py-[1px] rounded-full">
                  {draftCount === 1 ? "1 rascunho" : `${draftCount} rascunhos`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-[8px]">
              {composerType === "encerramento" && (
                <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#6d28d9] bg-[#f5f3ff] px-[8px] py-[2px] rounded-full">
                  Registrando encerramento
                </span>
              )}
              <DropdownMenu
                trigger={
                  <button className="size-[28px] flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] cursor-pointer transition-colors">
                    <DotsThree size={18} weight="bold" className="text-[#6b7280]" />
                  </button>
                }
                items={[
                  {
                    label: "Registrar evolução",
                    icon: <Notepad size={16} weight="bold" />,
                    onClick: () => focusComposer("evolucao"),
                  },
                  {
                    label: "Registrar encerramento",
                    icon: <SealCheck size={16} weight="bold" />,
                    onClick: () => focusComposer("encerramento"),
                  },
                ]}
              />
            </div>
          </div>

          <div ref={composerRef}>
            <RecordComposer
              key={`${composerType}-${records.length}`}
              patientId={patient.id}
              suggestedSession={composerType === "evolucao" ? suggestedSession : null}
              type={composerType}
              placeholder={
                composerType === "encerramento"
                  ? "Descreva o motivo do encerramento, evolução alcançada e encaminhamentos, se houver…"
                  : suggestedSession
                    ? "Registre a evolução desta sessão…"
                    : "Registre uma observação sobre o acompanhamento…"
              }
              onSaved={handleSaved}
            />
          </div>

          {loadingRecords ? (
            <TimelineSkeleton />
          ) : recordsError ? (
            <EmptyState
              className="min-h-[220px]"
              icon={<WarningCircle size={20} weight="bold" />}
              title="Não foi possível carregar o histórico"
              description="Os dados do paciente estão disponíveis, mas o histórico de evoluções falhou ao carregar."
              secondaryAction={{
                label: "Tentar novamente",
                icon: <ArrowClockwise size={16} weight="bold" />,
                onClick: loadRecords,
              }}
            />
          ) : records.length === 0 && !patient.clinicalInfo.observacoesClinicas ? (
            <TimelineEmpty completedCount={stats.completed} firstName={patient.name.split(" ")[0]} />
          ) : (
            <RecordTimeline
              records={records}
              sessions={sessions}
              initialNotes={patient.clinicalInfo.observacoesClinicas}
              initialNotesDate={patient.startDate}
              editingId={editing?.id ?? null}
              renderEditor={(record) => (
                <RecordComposer
                  patientId={patient.id}
                  editing={record}
                  autoFocus
                  onSaved={handleEditSaved}
                  onCancel={() => setEditing(null)}
                />
              )}
              onEdit={setEditing}
              onDelete={setToDelete}
              onPublishDraft={publishDraft}
            />
          )}
        </main>
      </div>

      <SendMessageSheet
        open={messageOpen}
        onClose={() => setMessageOpen(false)}
        patientName={patient.name}
        patientInitials={patient.initials}
        patientPhone={patient.phone}
      />

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Excluir registro?"
        description="Esta ação é permanente e não pode ser desfeita. O conteúdo desta evolução será removido do prontuário."
        confirmLabel="Excluir registro"
        onConfirm={() => void confirmDelete()}
      />
    </div>
  );
}

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav className="flex items-center gap-[8px]">
      <Link
        to="/pacientes"
        className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#939393] hover:text-[#317dff] transition-colors"
      >
        Pacientes
      </Link>
      <CaretRight size={12} weight="bold" className="text-[#c4c4c4]" />
      <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#363636] truncate">
        {name}
      </span>
      <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#75787d] bg-[#f3f4f6] px-[8px] py-[2px] rounded-full shrink-0">
        Prontuário
      </span>
    </nav>
  );
}

function TimelineEmpty({ completedCount, firstName }: { completedCount: number; firstName: string }) {
  if (completedCount > 0) {
    return (
      <EmptyState
        className="min-h-[220px]"
        icon={<Notepad size={20} weight="bold" />}
        title="Nenhuma evolução registrada"
        description={`Você já realizou ${completedCount === 1 ? "1 sessão" : `${completedCount} sessões`} com ${firstName}. Registrar a evolução ajuda a acompanhar o processo entre uma sessão e outra.`}
      />
    );
  }
  return (
    <EmptyState
      className="min-h-[220px]"
      icon={<CalendarPlus size={20} weight="bold" />}
      title="O prontuário começa na primeira sessão"
      description="Assim que a primeira sessão acontecer, você pode registrar a evolução aqui — ou escrever uma observação avulsa a qualquer momento."
    />
  );
}

function RecordPageSkeleton() {
  return (
    <div className="flex flex-col gap-[16px] p-[32px]">
      <SkeletonLine w={220} h={14} />
      <div className="flex flex-col lg:flex-row gap-[16px] items-start">
        <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-[16px]">
          <div className="bg-white rounded-[12px] border border-[#e6e6e1] px-[20px] py-[20px] flex flex-col items-center gap-[12px]">
            <SkeletonCircle size={72} />
            <SkeletonLine w={80} h={18} />
            <SkeletonLine w={180} h={24} />
            <SkeletonLine w={220} h={14} />
            <div className="grid grid-cols-2 gap-[10px] w-full pt-[4px]">
              <SkeletonBox w="100%" h={56} />
              <SkeletonBox w="100%" h={56} />
            </div>
            <SkeletonBox w="100%" h={44} />
            <SkeletonBox w="100%" h={44} />
          </div>
          <SkeletonBox w="100%" h={140} radius={12} />
          <SkeletonBox w="100%" h={220} radius={12} />
        </div>
        <div className="flex-1 w-full min-w-0 bg-white rounded-[12px] border border-[#e6e6e1] px-[24px] py-[20px] flex flex-col gap-[16px]">
          <SkeletonLine w={120} h={14} />
          <SkeletonBox w="100%" h={160} radius={12} />
          <TimelineSkeleton />
        </div>
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-[24px] py-[8px]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-[8px]">
          <SkeletonLine w={200} h={14} />
          <SkeletonLine w="100%" h={16} />
          <SkeletonLine w="85%" h={16} />
        </div>
      ))}
    </div>
  );
}
