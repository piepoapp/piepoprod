import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { completeOnboarding } from "../../../lib/api/profile";
import { markJustOnboarded } from "../../../lib/sound";
import {
  createDefaultAvailability,
  isAvailabilityComplete,
  validateAvailability,
  type Availability,
  type WeekdayKey,
} from "../../data/availability";
import { OnboardingLayout } from "./OnboardingLayout";
import { StepProfile } from "./StepProfile";
import { StepAvailability } from "./StepAvailability";
import { StepSession } from "./StepSession";

const TOTAL_STEPS = 3;

const stepMeta = [
  {
    title: "Seu registro profissional",
    subtitle: "Começamos com o essencial. Leva menos de um minuto.",
  },
  {
    title: "Quando você atende?",
    subtitle: "Defina os dias e horários. Isso monta sua agenda.",
  },
  {
    title: "Como são suas sessões?",
    subtitle: "Valores e duração padrão, para agilizar os agendamentos.",
  },
];

const CRP_PATTERN = /^\d{2}\/\d{4,6}$/;

export function OnboardingPage() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [crp, setCrp] = useState("");
  const [crpError, setCrpError] = useState<string | undefined>();
  const [availability, setAvailability] = useState<Availability>(createDefaultAvailability);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("50");
  const [priceError, setPriceError] = useState<string | undefined>();

  const availabilityErrors: Partial<Record<WeekdayKey, string>> =
    step === 2 ? validateAvailability(availability) : {};
  const hasAvailabilityError = Object.keys(availabilityErrors).length > 0;
  // Horário ainda incompleto (digitando) trava o avanço sem mostrar mensagem —
  // diferente de um erro de verdade, como fim antes do início.
  const availabilityIncomplete = step === 2 && !isAvailabilityComplete(availability);

  function parsePrice(): number | null {
    const raw = price.trim();
    if (!raw) return null;
    const parsed = parseFloat(raw.replace(/\./g, "").replace(",", "."));
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  function handleNext() {
    if (step === 1) {
      if (!CRP_PATTERN.test(crp)) {
        setCrpError("Informe o CRP no formato 06/123456.");
        return;
      }
      setCrpError(undefined);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (hasAvailabilityError || availabilityIncomplete) return;
      setStep(3);
    }
  }

  async function handleFinish() {
    if (!user) return;

    const parsedPrice = parsePrice();
    if (Number.isNaN(parsedPrice)) {
      setPriceError("Informe um valor válido, como 220,00.");
      return;
    }
    setPriceError(undefined);
    setSaving(true);
    try {
      await completeOnboarding(user.id, {
        crp,
        availability,
        defaultSessionPrice: parsedPrice,
        defaultSessionDuration: parseInt(duration, 10),
      });
      // Marcado antes do refresh: o ProtectedRoute pode redirecionar sozinho
      // assim que o perfil atualizar, e o Dashboard precisa achar a marca lá.
      markJustOnboarded();
      await refreshProfile();
      navigate("/", { replace: true });
    } catch {
      toast.error("Não foi possível salvar suas configurações. Tente novamente.");
      setSaving(false);
    }
  }

  const meta = stepMeta[step - 1];
  const nextDisabled = step === 2 && (hasAvailabilityError || availabilityIncomplete);

  return (
    <OnboardingLayout
      step={step}
      totalSteps={TOTAL_STEPS}
      title={meta.title}
      subtitle={meta.subtitle}
      footer={
        <>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={saving}
              className="h-[40px] flex items-center gap-[8px] justify-center px-[16px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} weight="bold" className="text-[#65635a]" />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
                Voltar
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={step === TOTAL_STEPS ? handleFinish : handleNext}
            disabled={nextDisabled || saving}
            className={`flex-1 h-[40px] rounded-[8px] flex items-center justify-center gap-[8px] px-[16px] transition-colors ${
              nextDisabled || saving
                ? "bg-[#a9c5ff] cursor-not-allowed"
                : "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
            }`}
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
              {step === TOTAL_STEPS ? (saving ? "Salvando..." : "Concluir") : "Continuar"}
            </span>
            {step === TOTAL_STEPS ? (
              <Check size={16} weight="bold" className="text-white" />
            ) : (
              <ArrowRight size={16} weight="bold" className="text-white" />
            )}
          </button>
        </>
      }
    >
      {step === 1 && <StepProfile crp={crp} onChange={setCrp} error={crpError} />}
      {step === 2 && (
        <StepAvailability
          availability={availability}
          onChange={setAvailability}
          errors={availabilityErrors}
        />
      )}
      {step === 3 && (
        <StepSession
          price={price}
          duration={duration}
          onPriceChange={setPrice}
          onDurationChange={setDuration}
          error={priceError}
        />
      )}
    </OnboardingLayout>
  );
}
