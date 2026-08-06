import { IMaskInput } from "react-imask";
import { IdentificationCard } from "@phosphor-icons/react";

interface StepProfileProps {
  crp: string;
  onChange: (value: string) => void;
  error?: string;
}

export function StepProfile({ crp, onChange, error }: StepProfileProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label
        htmlFor="crp"
        className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black"
      >
        Número do CRP
      </label>
      <div className="relative">
        <IdentificationCard
          size={16}
          weight="bold"
          className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none"
        />
        <IMaskInput
          id="crp"
          mask="00/000000"
          value={crp}
          unmask={false}
          onAccept={(value) => onChange(String(value))}
          placeholder="06/123456"
          className={`w-full h-[44px] bg-white rounded-[12px] border-2 py-0 pl-[40px] pr-[16px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors ${
            error ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
          }`}
        />
      </div>
      {error ? (
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939]">
          {error}
        </span>
      ) : (
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
          Informe a região e o número, como aparece na sua carteira profissional.
        </span>
      )}
    </div>
  );
}
