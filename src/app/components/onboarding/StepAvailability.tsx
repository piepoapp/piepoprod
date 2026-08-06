import { Plus, X, CopySimple } from "@phosphor-icons/react";
import { Combobox } from "../Combobox";
import {
  defaultBlock,
  timeOptions,
  weekdayLabels,
  weekdayOrder,
  type Availability,
  type TimeBlock,
  type WeekdayKey,
} from "../../data/availability";

interface StepAvailabilityProps {
  availability: Availability;
  onChange: (next: Availability) => void;
  errors: Partial<Record<WeekdayKey, string>>;
}

const timeComboboxOptions = timeOptions.map((t) => ({ value: t, label: t }));

function DayToggle({
  active,
  label,
  onToggle,
}: {
  active: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className="flex items-center gap-[10px] cursor-pointer group"
    >
      <span
        className={`w-[36px] h-[20px] rounded-full shrink-0 flex items-center px-[2px] transition-colors ${
          active ? "bg-[#317dff]" : "bg-[#e2e0d8]"
        }`}
      >
        <span
          className={`size-[16px] rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)] transition-transform ${
            active ? "translate-x-[16px]" : "translate-x-0"
          }`}
        />
      </span>
      <span
        className={`font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] transition-colors ${
          active ? "text-black" : "text-[#939393]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function StepAvailability({ availability, onChange, errors }: StepAvailabilityProps) {
  const activeDays = weekdayOrder.filter((d) => availability[d].length > 0);

  function setDay(day: WeekdayKey, blocks: TimeBlock[]) {
    onChange({ ...availability, [day]: blocks });
  }

  function toggleDay(day: WeekdayKey) {
    setDay(day, availability[day].length > 0 ? [] : [{ ...defaultBlock }]);
  }

  function updateBlock(day: WeekdayKey, index: number, patch: Partial<TimeBlock>) {
    setDay(
      day,
      availability[day].map((block, i) => (i === index ? { ...block, ...patch } : block)),
    );
  }

  function addBlock(day: WeekdayKey) {
    const blocks = availability[day];
    const last = blocks[blocks.length - 1];
    // Sugere o período seguinte ao último bloco, cobrindo o caso do almoço.
    const suggested: TimeBlock = last
      ? { start: last.end, end: timeOptions[timeOptions.length - 1] }
      : { ...defaultBlock };
    setDay(day, [...blocks, suggested]);
  }

  function removeBlock(day: WeekdayKey, index: number) {
    setDay(
      day,
      availability[day].filter((_, i) => i !== index),
    );
  }

  function applyFirstDayToAll() {
    const source = activeDays[0];
    if (!source) return;
    const next = { ...availability };
    for (const day of activeDays) {
      next[day] = availability[source].map((b) => ({ ...b }));
    }
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[12px] max-h-[340px] overflow-y-auto pr-[4px] [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa]">
        {weekdayOrder.map((day) => {
          const blocks = availability[day];
          const active = blocks.length > 0;
          const error = errors[day];

          return (
            <div key={day} className="flex flex-col gap-[8px]">
              <DayToggle active={active} label={weekdayLabels[day]} onToggle={() => toggleDay(day)} />

              {active && (
                <div className="flex flex-col gap-[8px] pl-[46px]">
                  {blocks.map((block, index) => (
                    <div key={index} className="flex items-center gap-[8px]">
                      <div className="w-[104px] shrink-0">
                        <Combobox
                          value={block.start}
                          onChange={(value) => updateBlock(day, index, { start: value })}
                          options={timeComboboxOptions}
                          searchable={false}
                          hasError={!!error}
                        />
                      </div>
                      <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#75787d] shrink-0">
                        até
                      </span>
                      <div className="w-[104px] shrink-0">
                        <Combobox
                          value={block.end}
                          onChange={(value) => updateBlock(day, index, { end: value })}
                          options={timeComboboxOptions}
                          searchable={false}
                          hasError={!!error}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBlock(day, index)}
                        aria-label={`Remover intervalo de ${weekdayLabels[day]}`}
                        className="size-[28px] shrink-0 flex items-center justify-center rounded-[6px] hover:bg-[#f3f4f6] transition-colors cursor-pointer"
                      >
                        <X size={14} weight="bold" className="text-[#939393]" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addBlock(day)}
                    className="flex items-center gap-[6px] self-start cursor-pointer group"
                  >
                    <Plus size={14} weight="bold" className="text-[#317dff]" />
                    <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#317dff] group-hover:underline">
                      Adicionar intervalo
                    </span>
                  </button>

                  {error && (
                    <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#fd3939]">
                      {error}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeDays.length > 1 && (
        <button
          type="button"
          onClick={applyFirstDayToAll}
          className="flex items-center justify-center gap-[8px] h-[36px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer"
        >
          <CopySimple size={14} weight="bold" className="text-[#65635a]" />
          <span className="font-['Geist',sans-serif] font-medium text-[12px] leading-[16px] text-[#65635a]">
            Aplicar {weekdayLabels[activeDays[0]].toLowerCase()} aos demais dias ativos
          </span>
        </button>
      )}
    </div>
  );
}
