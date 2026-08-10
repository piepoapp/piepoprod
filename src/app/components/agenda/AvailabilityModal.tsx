import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { updateAvailability } from "../../../lib/api/profile";
import {
  createDefaultAvailability,
  isAvailabilityComplete,
  validateAvailability,
  weekdayOrder,
  type Availability,
  type WeekdayKey,
} from "../../data/availability";
import { StepAvailability } from "../onboarding/StepAvailability";

interface Props {
  open: boolean;
  availability: Availability | null;
  onClose: () => void;
  /** Chamado depois de gravar, para a agenda refletir os novos horários. */
  onSaved: () => void | Promise<void>;
}

/**
 * Edição da disponibilidade sem sair da Agenda.
 *
 * Reaproveita o mesmo StepAvailability do onboarding: as duas telas editam o
 * mesmo dado, então dividir o componente evita que uma ganhe regra que a outra
 * não tem.
 */
export function AvailabilityModal({ open, availability, onClose, onSaved }: Props) {
  const { user } = useAuth();
  const [draft, setDraft] = useState<Availability>(availability ?? createDefaultAvailability());
  const [saving, setSaving] = useState(false);

  // Reabrir descarta edições não salvas e recarrega o que está gravado.
  useEffect(() => {
    if (open) setDraft(availability ?? createDefaultAvailability());
  }, [open, availability]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const errors: Partial<Record<WeekdayKey, string>> = validateAvailability(draft);
  const hasError = Object.keys(errors).length > 0;
  const incomplete = !isAvailabilityComplete(draft);
  const noDays = weekdayOrder.every((d) => draft[d].length === 0);
  const ready = !hasError && !incomplete && !noDays && !saving;

  async function handleSave() {
    if (!ready || !user) return;
    setSaving(true);
    try {
      await updateAvailability(user.id, draft);
      await onSaved();
      toast.success("Disponibilidade atualizada");
      onClose();
    } catch {
      toast.error("Não foi possível salvar sua disponibilidade. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Editar disponibilidade"
        className="relative w-[560px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-64px)] bg-white rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.18)] border border-[#efefef] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="shrink-0 flex items-start justify-between gap-[12px] px-[24px] pt-[24px] pb-[16px] border-b border-[#efefef]">
          <div className="flex flex-col gap-[4px]">
            <h2 className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
              Sua disponibilidade
            </h2>
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#75787d]">
              Os dias e horários definidos aqui são os que aparecem na agenda.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-[8px] rounded-[8px] hover:bg-[#f3f4f6] cursor-pointer transition-colors shrink-0"
          >
            <X size={20} weight="bold" className="text-[#6b7280]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
          <StepAvailability availability={draft} onChange={setDraft} errors={errors} />

          {noDays && (
            <p className="mt-[12px] font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#fd3939]">
              Mantenha ao menos um dia ativo — sem nenhum, a agenda não aceitaria agendamentos.
            </p>
          )}
        </div>

        <div className="shrink-0 flex items-center justify-end gap-[8px] px-[24px] py-[16px] border-t border-[#efefef]">
          <button
            type="button"
            onClick={onClose}
            className="h-[40px] flex items-center px-[17px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer"
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
              Cancelar
            </span>
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!ready}
            className={`h-[40px] flex items-center px-[16px] rounded-[8px] transition-colors ${
              ready ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer" : "bg-[#a9c5ff] cursor-not-allowed"
            }`}
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
              {saving ? "Salvando…" : "Salvar"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
