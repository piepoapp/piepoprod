import { Combobox } from "../Combobox";

interface StepSessionProps {
  price: string;
  duration: string;
  onPriceChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  error?: string;
}

/** Mesmas opções do modal de nova sessão. */
const durationOptions = [
  { value: "30", label: "30 minutos" },
  { value: "50", label: "50 minutos" },
  { value: "60", label: "60 minutos" },
  { value: "90", label: "90 minutos" },
];

export function StepSession({
  price,
  duration,
  onPriceChange,
  onDurationChange,
  error,
}: StepSessionProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="session-price"
          className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black"
        >
          Valor da sessão
        </label>
        <div className="relative">
          <span className="absolute left-[16px] top-1/2 -translate-y-1/2 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#a1a1aa] pointer-events-none">
            R$
          </span>
          <input
            id="session-price"
            inputMode="decimal"
            value={price}
            onChange={(e) => onPriceChange(e.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="220,00"
            className={`w-full h-[44px] bg-white rounded-[12px] border-2 py-0 pl-[44px] pr-[16px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors ${
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
            Usado como sugestão ao agendar. Você pode alterar em cada sessão.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-[8px]">
        <label className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black">
          Duração padrão
        </label>
        <Combobox
          value={duration}
          onChange={onDurationChange}
          options={durationOptions}
          searchable={false}
        />
      </div>
    </div>
  );
}
