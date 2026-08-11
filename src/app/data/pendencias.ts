import type { RecordRef } from "../../lib/api/records";
import type { Patient } from "./mockData";
import { fromISODate, monthLabels, timeToMinutes, toISODate, type Session } from "./agendaData";

export type PendingTone = "urgent" | "attention" | "info";

export interface PendingItem {
  id: string;
  tone: PendingTone;
  title: string;
  description: string;
  /** Destino do clique — toda pendência precisa levar a algum lugar. */
  to: string;
}

interface Input {
  sessions: Session[];
  patients: Patient[];
  /** Vazio quando a tabela de prontuário ainda não existe. */
  records: RecordRef[];
  now?: Date;
}

function isRealSession(s: Session) {
  return s.status !== "blocked" && s.status !== "cancelled";
}

function shortDate(iso: string) {
  const d = fromISODate(iso);
  return `${String(d.getDate()).padStart(2, "0")} de ${monthLabels[d.getMonth()].toLowerCase()}`;
}

function money(v: number) {
  return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

function plural(n: number, one: string, many: string) {
  return n === 1 ? one : many.replace("{n}", String(n));
}

/**
 * Pendências são calculadas a partir do estado atual, não guardadas.
 *
 * Sem tabela e sem "lido/não lido": o item existe enquanto o motivo dele
 * existir e some quando o trabalho é feito — que é a recompensa de resolvê-lo.
 */
export function computePendencias({ sessions, patients, records, now = new Date() }: Input): PendingItem[] {
  const items: PendingItem[] = [];
  const today = toISODate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // 1. A próxima sessão de hoje — a única pendência sensível ao relógio.
  const nextToday = sessions
    .filter((s) => s.date === today && isRealSession(s) && s.status !== "completed")
    .filter((s) => timeToMinutes(s.startTime) >= nowMinutes)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))[0];

  if (nextToday) {
    const minutesAway = timeToMinutes(nextToday.startTime) - nowMinutes;
    const soon = minutesAway <= 60;
    items.push({
      id: "proxima-sessao",
      tone: soon ? "urgent" : "info",
      title: soon
        ? minutesAway <= 1
          ? "Sessão começando agora"
          : `Sessão em ${minutesAway} minutos`
        : `Próxima sessão hoje às ${nextToday.startTime}`,
      description: `${nextToday.patientName} · ${nextToday.modality === "online" ? "Online" : "Presencial"}`,
      to: "/agenda",
    });
  }

  // 2. Sessões futuras que o paciente ainda não confirmou.
  const awaiting = sessions.filter(
    (s) => s.status === "pending" && s.date >= today,
  );
  if (awaiting.length > 0) {
    items.push({
      id: "aguardando-confirmacao",
      tone: "attention",
      title: plural(
        awaiting.length,
        "1 sessão aguardando confirmação",
        "{n} sessões aguardando confirmação",
      ),
      description: `A partir de ${shortDate(
        [...awaiting].sort((a, b) => a.date.localeCompare(b.date))[0].date,
      )}`,
      to: "/agenda",
    });
  }

  // 3. Sessões que aconteceram e não viraram evolução no prontuário.
  const withRecord = new Set(records.map((r) => r.sessionId).filter(Boolean));
  const unregistered = sessions
    .filter((s) => s.status === "completed" && !!s.patientId && !withRecord.has(s.id))
    .sort((a, b) => b.date.localeCompare(a.date));

  if (unregistered.length > 0) {
    const first = unregistered[0];
    items.push({
      id: "sem-evolucao",
      tone: "attention",
      title: plural(
        unregistered.length,
        "1 sessão sem evolução registrada",
        "{n} sessões sem evolução registrada",
      ),
      description:
        unregistered.length === 1
          ? `${first.patientName} · ${shortDate(first.date)}`
          : `A mais recente é de ${first.patientName}`,
      // Com uma só, já abre o compositor com a sessão vinculada.
      to:
        unregistered.length === 1
          ? `/pacientes/${first.patientId}?registrar=${first.id}`
          : `/pacientes/${first.patientId}`,
    });
  }

  // 4. Evoluções começadas e não finalizadas.
  const drafts = records.filter((r) => r.isDraft);
  if (drafts.length > 0) {
    items.push({
      id: "rascunhos",
      tone: "info",
      title: plural(drafts.length, "1 evolução em rascunho", "{n} evoluções em rascunho"),
      description: "Finalize para que entrem no prontuário.",
      to: `/pacientes/${drafts[0].patientId}`,
    });
  }

  // 5. Pacientes em acompanhamento sem nenhuma sessão marcada à frente.
  const futureByPatient = new Set(
    sessions
      .filter((s) => s.date >= today && isRealSession(s) && s.patientId)
      .map((s) => s.patientId as string),
  );
  const adrift = patients.filter((p) => p.status === "ativo" && !futureByPatient.has(p.id));
  if (adrift.length > 0) {
    items.push({
      id: "sem-retorno",
      tone: "attention",
      title: plural(
        adrift.length,
        "1 paciente sem retorno agendado",
        "{n} pacientes sem retorno agendado",
      ),
      description:
        adrift.length === 1 ? adrift[0].name : `Inclui ${adrift[0].name} e outros`,
      to: "/pacientes",
    });
  }

  // 6. Cobranças em aberto de sessões que já ocorreram.
  const unpaid = sessions.filter(
    (s) => isRealSession(s) && s.date <= today && (s.payment === "pending" || s.payment === "overdue"),
  );
  if (unpaid.length > 0) {
    const total = unpaid.reduce((sum, s) => sum + (s.amount ?? 0), 0);
    items.push({
      id: "pagamentos",
      tone: "attention",
      title: plural(unpaid.length, "1 pagamento pendente", "{n} pagamentos pendentes"),
      description: `${money(total)} em aberto`,
      to: "/agenda",
    });
  }

  return items;
}
