import svgPaths from "../../imports/svg-ifwz00yaeh";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { listPatients } from "../../lib/api/patients";
import { listSessions } from "../../lib/api/sessions";
import { listRecordRefs, type RecordRef } from "../../lib/api/records";
import type { Patient } from "../data/mockData";
import type { Session } from "../data/agendaData";
import { computePendencias, type PendingItem } from "../data/pendencias";
import { NotificationsPanel } from "./NotificationsPanel";
import { CommandPalette } from "./CommandPalette";

/** Mac usa ⌘, o resto usa Ctrl. */
function useIsMac() {
  return useMemo(
    () => typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform),
    [],
  );
}

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isMac = useIsMac();

  const load = useCallback(async () => {
    setError(false);
    try {
      const [nextSessions, nextPatients] = await Promise.all([listSessions(), listPatients()]);
      setSessions(nextSessions);
      setPatients(nextPatients);
      // O prontuário depende de uma migration que pode não ter rodado ainda;
      // sem ela, as demais pendências continuam valendo.
      let records: RecordRef[] = [];
      try {
        records = await listRecordRefs();
      } catch {
        records = [];
      }
      setItems(computePendencias({ sessions: nextSessions, patients: nextPatients, records }));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Agir numa pendência muda o estado que a gerou; recalcular ao trocar de
  // página mantém o contador honesto sem precisar recarregar.
  useEffect(() => {
    void load();
  }, [pathname, load]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(false);
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setPaletteOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const count = items.length;

  return (
    // 32px alinha a busca com o conteúdo das páginas, que usa p-[32px].
    <div className="fixed top-0 left-[280px] right-0 h-[64px] bg-white border-b border-[#e6e6e1] z-30 flex items-center justify-between gap-[16px] px-[32px]">
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="h-[36px] w-[320px] max-w-[40vw] flex items-center gap-[8px] px-[12px] rounded-[10px] border border-[#efefef] bg-[#fafafa] hover:bg-white hover:border-[#d4d4d4] transition-colors cursor-pointer"
      >
        <MagnifyingGlass size={16} weight="bold" className="text-[#939393] shrink-0" />
        <span className="flex-1 text-left font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#939393]">
          Buscar…
        </span>
        <kbd className="shrink-0 h-[20px] px-[6px] flex items-center rounded-[5px] border border-[#e4e4e7] bg-white font-['Geist',sans-serif] font-medium text-[12px] leading-none text-[#939393]">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            if (next) void load();
          }}
          aria-label={count > 0 ? `Pendências (${count})` : "Pendências"}
          aria-expanded={isOpen}
          className="p-[8px] cursor-pointer relative rounded-[8px] hover:bg-[#f3f4f6] transition-colors"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d={svgPaths.p183ed280} fill="#4D4C57" />
          </svg>
          {count > 0 && (
            <span className="absolute top-[4px] right-[4px] min-w-[16px] h-[16px] px-[4px] bg-[#E7000B] rounded-full flex items-center justify-center">
              <span className="font-['Geist',sans-serif] font-medium text-[12px] text-white leading-none">
                {count > 9 ? "9+" : count}
              </span>
            </span>
          )}
        </button>

        {isOpen && (
          <NotificationsPanel
            items={items}
            loading={loading}
            error={error}
            onNavigate={() => setIsOpen(false)}
            onRetry={() => void load()}
          />
        )}
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        patients={patients}
        sessions={sessions}
      />
    </div>
  );
}
