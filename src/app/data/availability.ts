export type WeekdayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface TimeBlock {
  start: string; // "08:00"
  end: string; // "12:00"
}

/** Dia sem blocos = não atende naquele dia. */
export type Availability = Record<WeekdayKey, TimeBlock[]>;

export const weekdayOrder: WeekdayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const weekdayLabels: Record<WeekdayKey, string> = {
  mon: "Segunda-feira",
  tue: "Terça-feira",
  wed: "Quarta-feira",
  thu: "Quinta-feira",
  fri: "Sexta-feira",
  sat: "Sábado",
  sun: "Domingo",
};

/** Manhã + tarde de segunda a sexta — o caso mais comum, já com o intervalo de almoço. */
export function createDefaultAvailability(): Availability {
  const workday = (): TimeBlock[] => [
    { start: "08:00", end: "12:00" },
    { start: "13:00", end: "18:00" },
  ];
  return {
    mon: workday(),
    tue: workday(),
    wed: workday(),
    thu: workday(),
    fri: workday(),
    sat: [],
    sun: [],
  };
}

export const emptyAvailability: Availability = {
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
};

/** Bloco sugerido ao ligar um dia que estava desativado. */
export const defaultBlock: TimeBlock = { start: "08:00", end: "18:00" };

/** Opções de 30 em 30 minutos, das 06:00 às 22:00. */
export const timeOptions: string[] = (() => {
  const out: string[] = [];
  for (let minutes = 6 * 60; minutes <= 22 * 60; minutes += 30) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    out.push(`${h}:${m}`);
  }
  return out;
})();

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Valida os blocos de um dia: fim depois do início e sem sobreposição.
 * Retorna a mensagem de erro ou null se estiver tudo certo.
 */
export function validateDayBlocks(blocks: TimeBlock[]): string | null {
  for (const block of blocks) {
    if (toMinutes(block.end) <= toMinutes(block.start)) {
      return "O horário final precisa ser depois do inicial.";
    }
  }
  const sorted = [...blocks].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  for (let i = 1; i < sorted.length; i++) {
    if (toMinutes(sorted[i].start) < toMinutes(sorted[i - 1].end)) {
      return "Os intervalos deste dia estão se sobrepondo.";
    }
  }
  return null;
}

export function validateAvailability(availability: Availability): Partial<Record<WeekdayKey, string>> {
  const errors: Partial<Record<WeekdayKey, string>> = {};
  for (const day of weekdayOrder) {
    const error = validateDayBlocks(availability[day]);
    if (error) errors[day] = error;
  }
  return errors;
}

/**
 * Faixa de horas que a agenda precisa mostrar para caber toda a disponibilidade.
 * Usado para substituir o 7h–21h fixo das views de semana e dia.
 */
export function availabilityBounds(
  availability: Availability | null,
): { startHour: number; endHour: number } {
  const blocks = availability ? weekdayOrder.flatMap((day) => availability[day]) : [];
  if (blocks.length === 0) return { startHour: 7, endHour: 21 };
  const earliest = Math.min(...blocks.map((b) => toMinutes(b.start)));
  const latest = Math.max(...blocks.map((b) => toMinutes(b.end)));
  return {
    startHour: Math.floor(earliest / 60),
    endHour: Math.ceil(latest / 60),
  };
}
