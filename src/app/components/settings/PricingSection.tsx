import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { updateProfile } from "../../../lib/api/profile";
import { Field, SectionCard, useSectionForm } from "./SettingsShell";

/** "220,50" ou "220.50" → 220.5; vazio → null; inválido → NaN. */
function parsePrice(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  return parseFloat(t.replace(/\./g, "").replace(",", "."));
}

function formatPrice(value: number | null | undefined): string {
  if (value == null) return "";
  return value.toFixed(2).replace(".", ",");
}

export function PricingSection() {
  const { user, profile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useSectionForm({ price: formatPrice(profile?.defaultSessionPrice) });

  async function handleSave() {
    if (!user) return;
    const parsed = parsePrice(form.draft.price);
    if (parsed !== null && (Number.isNaN(parsed) || parsed < 0)) {
      setError("Informe um valor válido, como 220,00.");
      return;
    }
    setError(undefined);
    setSaving(true);
    try {
      await updateProfile(user.id, { defaultSessionPrice: parsed });
      await refreshProfile();
      form.commit();
      toast.success("Alterações salvas");
    } catch {
      toast.error("Não foi possível salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard
      title="Valores e cobrança"
      description="Os padrões do seu consultório. Cada paciente pode ter condições próprias."
      dirty={form.dirty}
      saving={saving}
      onSave={() => void handleSave()}
    >
      <Field
        label="Valor padrão da sessão"
        htmlFor="cfg-valor"
        error={error}
        hint="Sugerido ao agendar. Não altera sessões já criadas."
      >
        <div className="relative">
          <span className="absolute left-[16px] top-1/2 -translate-y-1/2 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#a1a1aa] pointer-events-none">
            R$
          </span>
          <input
            id="cfg-valor"
            inputMode="decimal"
            value={form.draft.price}
            onChange={(e) => form.set("price", e.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="220,00"
            className={`w-full h-[44px] bg-white rounded-[12px] border-2 py-0 pl-[44px] pr-[16px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors ${
              error ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
            }`}
          />
        </div>
      </Field>
    </SectionCard>
  );
}
