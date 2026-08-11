import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { toast } from "sonner";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { updateProfile } from "../../../lib/api/profile";
import { TextInput, inputBaseClass } from "../form";
import { Field, ReadOnlyRow, SectionCard } from "./SettingsShell";

interface FormValues {
  fullName: string;
  crp: string;
  phone: string;
}

export function ProfileSection() {
  const { user, profile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    values: {
      fullName: profile?.fullName ?? "",
      crp: profile?.crp ?? "",
      phone: profile?.phone ?? "",
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user.id, data);
      await refreshProfile();
      reset(data);
      toast.success("Alterações salvas");
    } catch {
      toast.error("Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard
      title="Perfil profissional"
      description="Como você aparece nos seus registros e no contato com pacientes."
      dirty={isDirty}
      saving={saving}
      onSave={handleSubmit(onSubmit)}
    >
      <Field
        label="Nome completo"
        htmlFor="cfg-nome"
        error={errors.fullName?.message}
        hint="Aparece nos seus registros e nas mensagens enviadas aos pacientes."
      >
        <TextInput
          id="cfg-nome"
          placeholder="Seu nome"
          hasError={!!errors.fullName}
          {...register("fullName", { required: "Informe seu nome" })}
        />
      </Field>

      <Field
        label="Número do CRP"
        htmlFor="cfg-crp"
        error={errors.crp?.message}
        hint="Como aparece na sua carteira profissional."
      >
        <Controller
          name="crp"
          control={control}
          rules={{
            required: "Informe seu CRP",
            pattern: { value: /^\d{2}\/\d{4,6}$/, message: "Use o formato 06/123456." },
          }}
          render={({ field }) => (
            <IMaskInput
              id="cfg-crp"
              mask="00/000000"
              value={field.value ?? ""}
              unmask={false}
              onAccept={(v: string) => field.onChange(v)}
              onBlur={field.onBlur}
              placeholder="06/123456"
              className={`${inputBaseClass} ${
                errors.crp
                  ? "border-[#fd3939] focus:border-[#fd3939]"
                  : "border-[#efefef] focus:border-[#317dff]"
              }`}
            />
          )}
        />
      </Field>

      <Field
        label="WhatsApp"
        htmlFor="cfg-whatsapp"
        error={errors.phone?.message}
        hint="Usado para falarmos com você. Não é o número mostrado aos pacientes."
      >
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Informe seu WhatsApp",
            pattern: { value: /^\(\d{2}\) \d{5}-\d{4}$/, message: "Número inválido" },
          }}
          render={({ field }) => (
            <IMaskInput
              id="cfg-whatsapp"
              mask="(00) 00000-0000"
              value={field.value ?? ""}
              unmask={false}
              onAccept={(v: string) => field.onChange(v)}
              onBlur={field.onBlur}
              placeholder="(00) 00000-0000"
              className={`${inputBaseClass} ${
                errors.phone
                  ? "border-[#fd3939] focus:border-[#fd3939]"
                  : "border-[#efefef] focus:border-[#317dff]"
              }`}
            />
          )}
        />
      </Field>

      <ReadOnlyRow
        label="E-mail de acesso"
        value={user?.email ?? "—"}
        hint="A troca de e-mail ainda não está disponível. Fale com o suporte se precisar mudar."
      />
    </SectionCard>
  );
}
