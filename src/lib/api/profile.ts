import { supabase } from "../supabase";
import type { Availability } from "../../app/data/availability";

export interface Profile {
  id: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  crp: string | null;
  availability: Availability | null;
  defaultSessionPrice: number | null;
  defaultSessionDuration: number | null;
  onboardingCompletedAt: string | null;
}

interface ProfileRow {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  crp: string | null;
  availability: Availability | null;
  default_session_price: number | string | null;
  default_session_duration: number | null;
  onboarding_completed_at: string | null;
}

function mapRowToProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    crp: row.crp,
    availability: row.availability,
    // numeric do Postgres pode chegar como string; normalizamos aqui.
    defaultSessionPrice: row.default_session_price == null ? null : Number(row.default_session_price),
    defaultSessionDuration: row.default_session_duration,
    onboardingCompletedAt: row.onboarding_completed_at,
  };
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRowToProfile(data as ProfileRow) : null;
}

export interface OnboardingData {
  crp: string;
  availability: Availability;
  defaultSessionPrice: number | null;
  defaultSessionDuration: number;
}

/** Edição avulsa da disponibilidade, feita direto pela Agenda. */
export async function updateAvailability(
  userId: string,
  availability: Availability,
): Promise<void> {
  const { error } = await supabase.from("profiles").update({ availability }).eq("id", userId);
  if (error) throw error;
}

export async function completeOnboarding(userId: string, data: OnboardingData): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({
      crp: data.crp,
      availability: data.availability,
      default_session_price: data.defaultSessionPrice,
      default_session_duration: data.defaultSessionDuration,
      onboarding_completed_at: new Date().toISOString(),
    })
    .eq("id", userId);
  if (error) throw error;
}
