import { useEffect, useRef, useState } from "react";

/**
 * Evita flickering do skeleton em respostas muito rápidas: uma vez exibido,
 * o estado de carregamento permanece por pelo menos `minDuration` ms.
 */
export function useSmoothLoading(loading: boolean, minDuration = 400): boolean {
  const [visible, setVisible] = useState(loading);
  const startedAt = useRef<number | null>(loading ? Date.now() : null);

  useEffect(() => {
    if (loading) {
      startedAt.current = Date.now();
      setVisible(true);
      return;
    }
    const elapsed = startedAt.current ? Date.now() - startedAt.current : minDuration;
    const remaining = Math.max(0, minDuration - elapsed);
    if (remaining === 0) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(timer);
  }, [loading, minDuration]);

  return visible;
}
