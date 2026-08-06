import { useState } from "react";
import { IMaskInput } from "react-imask";
import { CopySimple } from "@phosphor-icons/react";
import {
  defaultBlock,
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

/** Campo de hora digitável: aceita qualquer horário, não só valores de uma lista. */
function TimeInput({
  value,
  onChange,
  disabled,
  hasError,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  hasError: boolean;
  ariaLabel: string;
}) {
  return (
    <IMaskInput
      mask="HH:MM"
      blocks={{
        HH: { mask: /^([01]\d|2[0-3]|\d)$/ },
        MM: { mask: /^([0-5]\d|\d)$/ },
      }}
      value={value}
      unmask={false}
      onAccept={(accepted) => onChange(String(accepted))}
      disabled={disabled}
      inputMode="numeric"
      placeholder="08:00"
      aria-label={ariaLabel}
      className={`w-[86px] h-[44px] shrink-0 bg-white rounded-[12px] border-2 px-[12px] py-0 text-center font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#a1a1aa] outline-none transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed border-[#efefef]"
          : hasError
            ? "border-[#fd3939] focus:border-[#fd3939]"
            : "border-[#efefef] focus:border-[#317dff]"
      }`}
    />
  );
}

export function StepAvailability({ availability, onChange, errors }: StepAvailabilityProps) {
  // Guarda o último horário de cada dia para que desligar e religar o dia
  // devolva o que o usuário tinha digitado, em vez do padrão.
  const [lastBlock, setLastBlock] = useState<Record<WeekdayKey, TimeBlock>>(() => {
    const initial = {} as Record<WeekdayKey, TimeBlock>;
    for (const day of weekdayOrder) {
      initial[day] = availability[day][0] ?? { ...defaultBlock };
    }
    return initial;
  });

  const activeDays = weekdayOrder.filter((d) => availability[d].length > 0);

  function toggleDay(day: WeekdayKey) {
    if (availability[day].length > 0) {
      setLastBlock((prev) => ({ ...prev, [day]: availability[day][0] }));
      onChange({ ...availability, [day]: [] });
    } else {
      onChange({ ...availability, [day]: [{ ...lastBlock[day] }] });
    }
  }

  function updateBlock(day: WeekdayKey, patch: Partial<TimeBlock>) {
    const current = availability[day][0];
    if (!current) return;
    const next = { ...current, ...patch };
    setLastBlock((prev) => ({ ...prev, [day]: next }));
    onChange({ ...availability, [day]: [next] });
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
      <div className="max-h-[340px] overflow-y-auto pr-[4px] [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa]">
        {/* w-fit + mx-auto: o bloco fica do tamanho exato do seu conteúdo e
            centralizado no card — assim o espaço que sobra (card mais largo
            que a linha) fica dividido nas duas bordas, e não empurrado todo
            para depois do toggle. */}
        <div className="w-fit mx-auto flex flex-col gap-[10px]">
        {weekdayOrder.map((day) => {
          const active = availability[day].length > 0;
          const block = availability[day][0] ?? lastBlock[day];
          const error = errors[day];

          return (
            <div key={day} className="flex flex-col gap-[6px]">
              {/* Ordem da linha: dia · horários · toggle (no lugar do antigo X).
                  94px é a largura do maior nome ("Segunda-feira") — a caixa
                  fica justa ao texto, sem sobrar espaço interno. O bloco
                  inteiro (todas as linhas) é centralizado no card mais abaixo,
                  em vez de esticar um elemento para não sobrar nada de um
                  lado só. */}
              <div className="flex items-center gap-[8px]">
                <span
                  className={`w-[94px] shrink-0 text-left font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] transition-colors ${
                    active ? "text-black" : "text-[#939393]"
                  }`}
                >
                  {weekdayLabels[day]}
                </span>

                <TimeInput
                  value={block.start}
                  onChange={(value) => updateBlock(day, { start: value })}
                  disabled={!active}
                  hasError={!!error}
                  ariaLabel={`Início em ${weekdayLabels[day]}`}
                />
                <span
                  className={`font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] shrink-0 ${
                    active ? "text-[#75787d]" : "text-[#c4c4c4]"
                  }`}
                >
                  até
                </span>
                <TimeInput
                  value={block.end}
                  onChange={(value) => updateBlock(day, { end: value })}
                  disabled={!active}
                  hasError={!!error}
                  ariaLabel={`Fim em ${weekdayLabels[day]}`}
                />

                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  aria-label={`Atender ${weekdayLabels[day]}`}
                  onClick={() => toggleDay(day)}
                  className="shrink-0 cursor-pointer"
                >
                  <span
                    className={`w-[36px] h-[20px] rounded-full flex items-center px-[2px] transition-colors ${
                      active ? "bg-[#317dff]" : "bg-[#e2e0d8]"
                    }`}
                  >
                    <span
                      className={`size-[16px] rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.15)] transition-transform ${
                        active ? "translate-x-[16px]" : "translate-x-0"
                      }`}
                    />
                  </span>
                </button>
              </div>

              {active && error && (
                // Mesma estrutura flex da linha acima (spacer invisível do
                // tamanho do nome do dia + gap) para o erro cair exatamente
                // sob o primeiro campo, já que a largura do nome agora varia.
                <div className="flex items-center gap-[8px]">
                  <span aria-hidden="true" className="w-[94px] shrink-0 invisible">
                    {weekdayLabels[day]}
                  </span>
                  <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#fd3939]">
                    {error}
                  </span>
                </div>
              )}
            </div>
          );
        })}
        </div>
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
