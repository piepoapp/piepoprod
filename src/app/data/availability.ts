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

/**
 * Segunda a sexta, das 08:00 às 18:00.
 *
 * O tipo continua sendo uma lista de blocos por dia, ainda que a tela de
 * onboarding edite só um: assim dá para reintroduzir intervalos (almoço)
 * depois sem mexer no que já está gravado.
 */
export function createDefaultAvailability(): Availability {
  const workday = (): TimeBlock[] => [{ start: "08:00", end: "18:00" }];
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

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Um horário só conta quando está completo, no formato HH:MM. */
export function isCompleteTime(time: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

/**
 * Valida os blocos de um dia: fim depois do início e sem sobreposição.
 * Retorna a mensagem de erro ou null se estiver tudo certo.
 *
 * Horário incompleto (digitação em andamento, ex. "08:") não gera mensagem —
 * isso aconteceria a cada tecla digitada. Quem barra o avanço nesse caso é
 * isAvailabilityComplete, sem exibir texto de erro.
 */
export function validateDayBlocks(blocks: TimeBlock[]): string | null {
  for (const block of blocks) {
    if (!isCompleteTime(block.start) || !isCompleteTime(block.end)) {
      return null;
    }
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

/** Todo horário de todo dia ativo está completo (formato HH:MM)? Usado para
 *  travar o avanço sem exibir mensagem enquanto o usuário ainda digita. */
export function isAvailabilityComplete(availability: Availability): boolean {
  return weekdayOrder.every((day) =>
    availability[day].every((b) => isCompleteTime(b.start) && isCompleteTime(b.end)),
  );
}

/** getDay() é 0 = domingo; esta lista traduz para as chaves usadas aqui. */
const keyByWeekday: WeekdayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function weekdayKeyFromISO(dateISO: string): WeekdayKey {
  const [y, m, d] = dateISO.split("-").map(Number);
  return keyByWeekday[new Date(y, m - 1, d, 12, 0, 0).getDay()];
}

/**
 * O profissional atende neste dia?
 *
 * Sem disponibilidade configurada (conta antiga, onboarding não concluído) nada
 * é bloqueado — é melhor a agenda ficar permissiva do que inutilizável.
 */
export function isDayAvailable(availability: Availability | null, dateISO: string): boolean {
  if (!availability) return true;
  return availability[weekdayKeyFromISO(dateISO)].length > 0;
}

/** O horário cai dentro de algum bloco de atendimento daquele dia? */
export function isSlotAvailable(
  availability: Availability | null,
  dateISO: string,
  time: string,
): boolean {
  if (!availability) return true;
  const blocks = availability[weekdayKeyFromISO(dateISO)];
  if (blocks.length === 0) return false;
  const minutes = toMinutes(time);
  return blocks.some((b) => minutes >= toMinutes(b.start) && minutes < toMinutes(b.end));
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
