import { supabase } from "../supabase";
import type { Session, SessionStatus } from "../../app/data/agendaData";

interface SessionRow {
  id: string;
  patient_id: string | null;
  patient_name: string;
  initials: string;
  date: string;
  start_time: string;
  end_time: string;
  status: Session["status"];
  modality: Session["modality"];
  payment: Session["payment"];
  amount: number;
  recurrence: Session["recurrence"];
  notes: string | null;
  meeting_provider: NonNullable<Session["meetingProvider"]> | null;
  meeting_link: string | null;
}

function mapRowToSession(row: SessionRow): Session {
  return {
    id: row.id,
    patientId: row.patient_id,
    patientName: row.patient_name,
    initials: row.initials,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    status: row.status,
    modality: row.modality,
    payment: row.payment,
    amount: row.amount,
    recurrence: row.recurrence,
    notes: row.notes ?? undefined,
    meetingProvider: row.meeting_provider ?? undefined,
    meetingLink: row.meeting_link ?? undefined,
  };
}

function toInsertRow(session: Omit<Session, "id">, ownerId: string) {
  return {
    owner_id: ownerId,
    patient_id: session.patientId,
    patient_name: session.patientName,
    initials: session.initials,
    date: session.date,
    start_time: session.startTime,
    end_time: session.endTime,
    status: session.status,
    modality: session.modality,
    payment: session.payment,
    amount: session.amount,
    recurrence: session.recurrence,
    notes: session.notes ?? null,
    meeting_provider: session.meetingProvider ?? null,
    meeting_link: session.meetingLink ?? null,
  };
}

export async function listSessions(): Promise<Session[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });
  if (error) throw error;
  return (data as SessionRow[]).map(mapRowToSession);
}

export async function listSessionsByPatient(patientId: string): Promise<Session[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("patient_id", patientId)
    .order("date", { ascending: false })
    .order("start_time", { ascending: false });
  if (error) throw error;
  return (data as SessionRow[]).map(mapRowToSession);
}

export async function createSession(
  session: Omit<Session, "id">,
  ownerId: string,
): Promise<Session> {
  const { data, error } = await supabase
    .from("sessions")
    .insert(toInsertRow(session, ownerId))
    .select()
    .single();
  if (error) throw error;
  return mapRowToSession(data as SessionRow);
}

export async function createSessions(
  sessionsToInsert: Omit<Session, "id">[],
  ownerId: string,
): Promise<Session[]> {
  const { data, error } = await supabase
    .from("sessions")
    .insert(sessionsToInsert.map((s) => toInsertRow(s, ownerId)))
    .select();
  if (error) throw error;
  return (data as SessionRow[]).map(mapRowToSession);
}

export async function updateSessionStatus(id: string, status: SessionStatus): Promise<void> {
  const { error } = await supabase.from("sessions").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteSession(id: string): Promise<void> {
  const { error } = await supabase.from("sessions").delete().eq("id", id);
  if (error) throw error;
}
