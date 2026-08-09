import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle, CloudSlash, LockSimple, PencilSimple, X } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAuth } from "../../../lib/auth/AuthProvider";
import {
  createRecord,
  updateRecord,
  type PatientRecord,
  type RecordType,
} from "../../../lib/api/records";
import { updateSessionStatus } from "../../../lib/api/sessions";
import { fromISODate, monthLabels, type Session } from "../../data/agendaData";

const AUTOSAVE_DELAY = 1500;
const MIN_CHARS_TO_PERSIST = 3;

function draftKey(patientId: string) {
  return `piepo:record-draft:${patientId}`;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function sessionLabel(session: Session) {
  const d = fromISODate(session.date);
  return `${String(d.getDate()).padStart(2, "0")} de ${monthLabels[d.getMonth()].toLowerCase()} · ${session.startTime}`;
}

type SaveState = "idle" | "saving" | "saved" | "error";

interface RecordComposerProps {
  patientId: string;
  /** Sessão realizada mais recente ainda sem registro — evita abrir date picker. */
  suggestedSession?: Session | null;
  /** Registro existente em edição. Quando presente, o composer vira modo edição. */
  editing?: PatientRecord | null;
  type?: RecordType;
  placeholder?: string;
  autoFocus?: boolean;
  onSaved: (record: PatientRecord, completedSessionId: string | null) => void;
  onCancel?: () => void;
}

export function RecordComposer({
  patientId,
  suggestedSession = null,
  editing = null,
  type = "evolucao",
  placeholder = "Registre a evolução desta sessão…",
  autoFocus = false,
  onSaved,
  onCancel,
}: RecordComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState(editing?.content ?? "");
  const [recordId, setRecordId] = useState<string | null>(editing?.id ?? null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [linkSession, setLinkSession] = useState(!!suggestedSession);
  const [markCompleted, setMarkCompleted] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Evita regravar o mesmo texto quando o efeito reinicia após criar o rascunho.
  const lastPersisted = useRef<string | null>(null);

  const isEditing = !!editing;
  const trimmed = content.trim();
  const canSave = trimmed.length > 0 && !submitting;

  // Recupera texto que ficou preso no navegador por uma falha de rede anterior.
  useEffect(() => {
    if (isEditing) return;
    const stored = localStorage.getItem(draftKey(patientId));
    if (stored) setContent(stored);
  }, [patientId, isEditing]);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  // Altura acompanha o texto: caixa fixa pequena sinaliza "escreva pouco".
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 420)}px`;
  }, [content]);

  const persistDraft = useCallback(
    async (text: string) => {
      if (!user || lastPersisted.current === text) return;
      lastPersisted.current = text;
      setSaveState("saving");
      try {
        if (recordId) {
          await updateRecord(recordId, { content: text, isDraft: true });
        } else {
          const created = await createRecord(
            {
              patientId,
              sessionId: linkSession ? (suggestedSession?.id ?? null) : null,
              type,
              content: text,
              isDraft: true,
              recordDate: suggestedSession?.date ?? todayISO(),
            },
            user.id,
          );
          setRecordId(created.id);
        }
        setSaveState("saved");
        setSavedAt(new Date());
      } catch {
        setSaveState("error");
      }
    },
    [user, recordId, patientId, linkSession, suggestedSession, type],
  );

  // Autosave: nunca bloqueia a digitação, só persiste depois da pausa.
  useEffect(() => {
    localStorage.setItem(draftKey(patientId), content);
    if (isEditing || trimmed.length < MIN_CHARS_TO_PERSIST) return;
    const timer = setTimeout(() => void persistDraft(content), AUTOSAVE_DELAY);
    return () => clearTimeout(timer);
    // persistDraft muda a cada render dependente; o timer é reiniciado de propósito.
  }, [content, trimmed, patientId, isEditing, persistDraft]);

  async function handleSubmit() {
    if (!canSave || !user) return;
    setSubmitting(true);
    const sessionId = linkSession ? (suggestedSession?.id ?? null) : null;
    const shouldComplete =
      !!sessionId && markCompleted && suggestedSession?.status !== "completed";

    try {
      const saved = recordId
        ? await updateRecord(recordId, { content: trimmed, isDraft: false })
        : await createRecord(
            {
              patientId,
              sessionId,
              type,
              content: trimmed,
              isDraft: false,
              recordDate: suggestedSession?.date ?? todayISO(),
            },
            user.id,
          );

      // A sessão só é marcada depois que o texto está seguro no banco.
      if (shouldComplete && suggestedSession) {
        try {
          await updateSessionStatus(suggestedSession.id, "completed");
        } catch {
          toast.error("Evolução salva, mas não foi possível marcar a sessão como realizada.");
        }
      }

      localStorage.removeItem(draftKey(patientId));
      setContent("");
      setRecordId(null);
      setSaveState("idle");
      setSavedAt(null);
      onSaved(saved, shouldComplete ? (suggestedSession?.id ?? null) : null);
    } catch {
      setSaveState("error");
      toast.error("Não foi possível salvar. Seu texto foi mantido aqui.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-[12px] w-full bg-white rounded-[12px] border-2 border-[#efefef] focus-within:border-[#317dff] transition-colors p-[16px]">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={3}
        className="w-full min-h-[72px] resize-none bg-transparent outline-none font-['Geist',sans-serif] font-normal text-[16px] leading-[24px] text-[#111827] placeholder:text-[#939393]"
      />

      {suggestedSession && (
        <div className="flex flex-wrap items-center gap-[8px]">
          <button
            type="button"
            onClick={() => setLinkSession((v) => !v)}
            className={`h-[30px] px-[12px] rounded-full border font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] transition-colors cursor-pointer ${
              linkSession
                ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                : "border-[#e6e6e1] bg-white text-[#75787d] hover:border-[#c4c4c4]"
            }`}
          >
            {linkSession ? "Vinculado à sessão de " : "Vincular à sessão de "}
            {sessionLabel(suggestedSession)}
          </button>

          {linkSession && suggestedSession.status !== "completed" && (
            <label className="flex items-center gap-[6px] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={markCompleted}
                onChange={(e) => setMarkCompleted(e.target.checked)}
                className="size-[14px] accent-[#317dff] cursor-pointer"
              />
              <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#75787d]">
                Marcar a sessão como realizada
              </span>
            </label>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-[12px] pt-[4px] border-t border-[#f3f4f6]">
        <SaveIndicator state={saveState} savedAt={savedAt} isEditing={isEditing} />

        <div className="flex items-center gap-[8px] shrink-0">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-[36px] flex items-center gap-[6px] px-[12px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer"
            >
              <X size={14} weight="bold" className="text-[#75787d]" />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-[#65635a]">
                Cancelar
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={!canSave}
            className={`h-[36px] flex items-center gap-[8px] px-[16px] rounded-[8px] transition-colors ${
              canSave
                ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
                : "bg-[#a9c5ff] cursor-not-allowed"
            }`}
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-white">
              {submitting ? "Salvando…" : isEditing ? "Salvar alterações" : "Salvar registro"}
            </span>
          </button>
        </div>
      </div>

      <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#a1a1aa]">
        <LockSimple size={11} weight="bold" className="inline mb-[2px] mr-[3px]" />
        Visível somente para você. <span className="text-[#c4c4c4]">Ctrl/Cmd + Enter para salvar.</span>
      </p>
    </div>
  );
}

function SaveIndicator({
  state,
  savedAt,
  isEditing,
}: {
  state: SaveState;
  savedAt: Date | null;
  isEditing: boolean;
}) {
  const base = "font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] min-w-0 truncate";

  if (isEditing) return <span className={`${base} text-[#a1a1aa]`}>Editando registro</span>;

  if (state === "saving") return <span className={`${base} text-[#939393]`}>Salvando rascunho…</span>;

  if (state === "error")
    return (
      <span className={`${base} text-[#b91c1c] flex items-center gap-[5px]`}>
        <CloudSlash size={13} weight="bold" />
        Sem conexão — o texto está guardado neste navegador
      </span>
    );

  if (state === "saved" && savedAt)
    return (
      <span className={`${base} text-[#047857] flex items-center gap-[5px]`}>
        <CheckCircle size={13} weight="bold" />
        Rascunho salvo às{" "}
        {savedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
      </span>
    );

  return (
    <span className={`${base} text-[#a1a1aa] flex items-center gap-[5px]`}>
      <PencilSimple size={13} weight="bold" />
      O rascunho é salvo automaticamente
    </span>
  );
}
