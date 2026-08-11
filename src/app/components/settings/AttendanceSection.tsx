import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { updateProfile } from "../../../lib/api/profile";
import {
  createDefaultAvailability,
  isAvailabilityComplete,
  validateAvailability,
  weekdayOrder,
  type Availability,
  type WeekdayKey,
} from "../../data/availability";
import { Combobox } from "../Combobox";
import { StepAvailability } from "../onboarding/StepAvailability";
import { Field, SectionCard, useSectionForm } from "./SettingsShell";

const durationOptions = [
  { value: "30", label: "30 minutos" },
  { value: "50", label: "50 minutos" },
  { value: "60", label: "60 minutos" },
  { value: "90", label: "90 minutos" },
];

export function AttendanceSection() {
  const { user, profile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const form = useSectionForm({
    duration: String(profile?.defaultSessionDuration ?? 50),
  });

  const [availability, setAvailability] = useState<Availability>(
    profile?.availability ?? createDefaultAvailability(),
  );
  const [savedAvailability, setSavedAvailability] = useState<Availability>(availability);

  const errors: Partial<Record<WeekdayKey, string>> = validateAvailability(availability);
  const hasError = Object.keys(errors).length > 0;
  const incomplete = !isAvailabilityComplete(availability);
  const noDays = weekdayOrder.every((d) => availability[d].length === 0);

  const availabilityDirty =
    JSON.stringify(availability) !== JSON.stringify(savedAvailability);
  const dirty = form.dirty || availabilityDirty;
  const blocked = hasError || incomplete || noDays;

  async function handleSave() {
    if (!user || blocked) return;
    setSaving(true);
    try {
      await updateProfile(user.id, {
        availability,
        defaultSessionDuration: parseInt(form.draft.duration, 10),
      });
      await refreshProfile();
      form.commit();
      setSavedAvailability(availability);
      toast.success("Alterações salvas");
    } catch {
      toast.error("Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard
      title="Atendimento"
      description="Define o que a agenda mostra e o que ela aceita agendar."
      dirty={dirty && !blocked}
      saving={saving}
      onSave={() => void handleSave()}
      footer={
        noDays ? (
          <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#fd3939]">
            Mantenha ao menos um dia ativo — sem nenhum, a agenda não aceita agendamentos.
          </p>
        ) : null
      }
    >
      <Field
        label="Dias e horários de atendimento"
        hint="A agenda mostra apenas esta faixa. Fora dela não é possível agendar."
      >
        <StepAvailability
          availability={availability}
          onChange={setAvailability}
          errors={errors}
        />
      </Field>

      <Field
        label="Duração padrão da sessão"
        hint="Sugerida ao criar uma sessão. Você pode mudar em cada uma."
      >
        <Combobox
          value={form.draft.duration}
          onChange={(v) => form.set("duration", v)}
          options={durationOptions}
          searchable={false}
        />
      </Field>
    </SectionCard>
  );
}
