import { differenceInYears, parse } from "date-fns";
import { supabase } from "../supabase";
import type { Patient } from "../../app/data/mockData";

export interface NewPatientFormValues {
  nome: string;
  dataNascimento: string;
  sexo: string;
  whatsapp: string;
  email: string;
  cep: string;
  estado: string;
  cidade: string;
  emergenciaNome: string;
  emergenciaTelefone: string;
  motivoConsulta: string;
  tratamentosAnteriores: string;
  diagnosticosPrevios: string;
  medicamentosEmUso: string;
  situacaoProfissional: string;
  comQuemMora: string;
  observacoesClinicas: string;
  modalidadePagamento: string;
  valorSessao: string;
  frequenciaPadrao: string;
  formaRecebimento: string;
  quandoCobrar: string;
  politicaCancelamento: string;
  nomePlano: string;
  numeroCarteirinha: string;
  validadePlano: string;
  coparticipacao: string;
}

export interface NewPatientConsent {
  lgpdAccepted: boolean;
  respAccepted: boolean;
  dataConsentimento: string;
  formaRegistro: string;
}

interface PatientRow {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  birth_date: string | null;
  gender: string;
  status: Patient["status"];
  modality: Patient["modality"];
  start_date: string;
  last_session: string | null;
  next_session: string | null;
  total_sessions: number;
  frequency: Patient["frequency"];
  notes: string;
}

const genderLabel: Record<string, Patient["gender"]> = {
  feminino: "Feminino",
  masculino: "Masculino",
  outro: "Outro",
  prefiro_nao_dizer: "Outro",
};

const frequencyLabel: Record<string, Patient["frequency"]> = {
  "1x por semana": "Semanal",
  "2x por semana": "Semanal",
  Quinzenal: "Quinzenal",
  Mensal: "Mensal",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function parseBrDate(value: string): string | null {
  if (!value) return null;
  const parsed = parse(value, "dd/MM/yyyy", new Date());
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function mapRowToPatient(row: PatientRow): Patient {
  return {
    id: row.id,
    name: row.name,
    initials: getInitials(row.name),
    email: row.email ?? "",
    phone: row.phone,
    age: row.birth_date ? differenceInYears(new Date(), new Date(row.birth_date)) : 0,
    gender: genderLabel[row.gender] ?? "Outro",
    status: row.status,
    modality: row.modality,
    startDate: row.start_date,
    lastSession: row.last_session,
    nextSession: row.next_session,
    totalSessions: row.total_sessions,
    frequency: row.frequency,
    notes: row.notes ?? "",
  };
}

export async function listPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as PatientRow[]).map(mapRowToPatient);
}

export async function createPatient(
  form: NewPatientFormValues,
  consent: NewPatientConsent,
  ownerId: string,
): Promise<Patient> {
  const { data, error } = await supabase
    .from("patients")
    .insert({
      owner_id: ownerId,
      name: form.nome,
      email: form.email || null,
      phone: form.whatsapp,
      birth_date: parseBrDate(form.dataNascimento),
      gender: form.sexo,
      cep: form.cep || null,
      estado: form.estado || null,
      cidade: form.cidade || null,
      emergencia_nome: form.emergenciaNome || null,
      emergencia_telefone: form.emergenciaTelefone || null,
      clinical_info: {
        motivoConsulta: form.motivoConsulta,
        tratamentosAnteriores: form.tratamentosAnteriores,
        diagnosticosPrevios: form.diagnosticosPrevios,
        medicamentosEmUso: form.medicamentosEmUso,
        situacaoProfissional: form.situacaoProfissional,
        comQuemMora: form.comQuemMora,
        observacoesClinicas: form.observacoesClinicas,
      },
      billing_info: {
        modalidadePagamento: form.modalidadePagamento,
        nomePlano: form.nomePlano,
        numeroCarteirinha: form.numeroCarteirinha,
        validadePlano: form.validadePlano,
        coparticipacao: form.coparticipacao,
        valorSessao: form.valorSessao,
        frequenciaPadrao: form.frequenciaPadrao,
        formaRecebimento: form.formaRecebimento,
        quandoCobrar: form.quandoCobrar,
        politicaCancelamento: form.politicaCancelamento,
      },
      lgpd_accepted: consent.lgpdAccepted,
      resp_accepted: consent.respAccepted,
      consent_date: consent.dataConsentimento || null,
      consent_method: consent.formaRegistro || null,
      frequency: frequencyLabel[form.frequenciaPadrao] ?? "Semanal",
    })
    .select()
    .single();

  if (error) throw error;
  return mapRowToPatient(data as PatientRow);
}

export async function updatePatientStatus(id: string, status: Patient["status"]): Promise<void> {
  const { error } = await supabase.from("patients").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deletePatient(id: string): Promise<void> {
  const { error } = await supabase.from("patients").delete().eq("id", id);
  if (error) throw error;
}
