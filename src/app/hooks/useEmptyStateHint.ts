import { useEffect, useState } from "react";

/**
 * Lembra se o último carregamento deste bloco terminou vazio, para que o
 * skeleton exibido no próximo acesso tenha o mesmo formato do conteúdo que
 * realmente vai aparecer (lista/gráfico vs. empty state).
 *
 * Sem histórico, assume vazio — é o caso de quem acabou de criar a conta.
 */
export function useEmptyStateHint(key: string, loading: boolean, isEmpty: boolean): boolean {
  const storageKey = `piepo:empty:${key}`;

  const [hint] = useState(() => {
    try {
      return localStorage.getItem(storageKey) !== "0";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (loading) return;
    try {
      localStorage.setItem(storageKey, isEmpty ? "1" : "0");
    } catch {
      // localStorage indisponível (modo privado): seguimos com o padrão.
    }
  }, [loading, isEmpty, storageKey]);

  return hint;
}
