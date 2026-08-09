import { supabase } from "../supabase";

export type RecordType = "evolucao" | "avulso" | "encerramento";

export interface PatientRecord {
  id: string;
  patientId: string;
  sessionId: string | null;
  type: RecordType;
  content: string;
  isDraft: boolean;
  recordDate: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

interface RecordRow {
  id: string;
  patient_id: string;
  session_id: string | null;
  type: RecordType;
  content: string;
  is_draft: boolean;
  record_date: string;
  created_at: string;
  updated_at: string;
}

function mapRow(row: RecordRow): PatientRecord {
  return {
    id: row.id,
    patientId: row.patient_id,
    sessionId: row.session_id,
    type: row.type,
    content: row.content,
    isDraft: row.is_draft,
    recordDate: row.record_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listRecordsByPatient(patientId: string): Promise<PatientRecord[]> {
  const { data, error } = await supabase
    .from("patient_records")
    .select("*")
    .eq("patient_id", patientId)
    .order("record_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as RecordRow[]).map(mapRow);
}

export interface NewRecordInput {
  patientId: string;
  sessionId?: string | null;
  type?: RecordType;
  content: string;
  isDraft?: boolean;
  recordDate: string;
}

export async function createRecord(
  input: NewRecordInput,
  ownerId: string,
): Promise<PatientRecord> {
  const { data, error } = await supabase
    .from("patient_records")
    .insert({
      owner_id: ownerId,
      patient_id: input.patientId,
      session_id: input.sessionId ?? null,
      type: input.type ?? "evolucao",
      content: input.content,
      is_draft: input.isDraft ?? false,
      record_date: input.recordDate,
    })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data as RecordRow);
}

export async function updateRecord(
  id: string,
  patch: { content?: string; isDraft?: boolean; recordDate?: string },
): Promise<PatientRecord> {
  const { data, error } = await supabase
    .from("patient_records")
    .update({
      ...(patch.content !== undefined && { content: patch.content }),
      ...(patch.isDraft !== undefined && { is_draft: patch.isDraft }),
      ...(patch.recordDate !== undefined && { record_date: patch.recordDate }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapRow(data as RecordRow);
}

export async function deleteRecord(id: string): Promise<void> {
  const { error } = await supabase.from("patient_records").delete().eq("id", id);
  if (error) throw error;
}
