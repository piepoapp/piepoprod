import { play, setEnabled, setVolume, type SoundName } from "cuelume";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  setVolume(0.6);
  configured = true;
}

/**
 * Ponto único de reprodução de som da aplicação.
 *
 * O cuelume sintetiza cada cue via Web Audio (sem arquivos) e é no-op quando
 * o Web Audio não está disponível. Centralizar aqui deixa um lugar só para
 * ligar uma preferência de "silenciar sons" mais adiante.
 */
export function playCue(sound: SoundName) {
  ensureConfigured();
  play(sound);
}

/** Reservado para uma futura preferência do usuário. */
export function setSoundEnabled(enabled: boolean) {
  setEnabled(enabled);
}

const ARRIVAL_FLAG = "piepo:justOnboarded";

/**
 * Marca que o usuário acabou de concluir o onboarding.
 *
 * Usamos sessionStorage em vez do state do react-router porque o
 * ProtectedRoute redireciona por conta própria assim que o perfil é
 * atualizado, e esse redirect descartaria o state da navegação.
 */
export function markJustOnboarded() {
  try {
    sessionStorage.setItem(ARRIVAL_FLAG, "1");
  } catch {
    // sessionStorage indisponível: seguimos sem o som.
  }
}

/** Consome a marca — retorna true uma única vez por onboarding concluído. */
export function consumeJustOnboarded(): boolean {
  try {
    if (sessionStorage.getItem(ARRIVAL_FLAG) !== "1") return false;
    sessionStorage.removeItem(ARRIVAL_FLAG);
    return true;
  } catch {
    return false;
  }
}
