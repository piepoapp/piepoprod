import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Command } from "cmdk";
import {
  CalendarBlank,
  CalendarPlus,
  Gear,
  MagnifyingGlass,
  Plus,
  SquaresFour,
  UserCircle,
  Users,
} from "@phosphor-icons/react";
import type { Patient } from "../data/mockData";
import { fromISODate, monthLabels, statusMeta, toISODate, type Session } from "../data/agendaData";

interface Entry {
  id: string;
  /** Texto usado na busca — inclui o que não aparece na tela, como telefone. */
  haystack: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
  to: string;
}

const navEntries: Entry[] = [
  { id: "nav-inicio", haystack: "início inicio dashboard painel", label: "Início", icon: SquaresFour, to: "/" },
  { id: "nav-pacientes", haystack: "pacientes lista", label: "Pacientes", icon: Users, to: "/pacientes" },
  { id: "nav-agenda", haystack: "agenda calendário calendario sessões sessoes", label: "Agenda", icon: CalendarBlank, to: "/agenda" },
  { id: "nav-cfg", haystack: "configurações configuracoes ajustes", label: "Configurações", icon: Gear, to: "/configuracoes" },
  { id: "nav-cfg-perfil", haystack: "perfil conta crp nome senha e-mail email", label: "Configurações · Perfil e conta", icon: Gear, to: "/configuracoes?secao=perfil" },
  { id: "nav-cfg-atend", haystack: "atendimento disponibilidade horários horarios duração duracao", label: "Configurações · Atendimento", icon: Gear, to: "/configuracoes?secao=atendimento" },
  { id: "nav-cfg-valores", haystack: "valores cobrança cobranca preço preco", label: "Configurações · Valores e cobrança", icon: Gear, to: "/configuracoes?secao=valores" },
  { id: "nav-cfg-privacidade", haystack: "privacidade dados lgpd exportar excluir conta", label: "Configurações · Privacidade e dados", icon: Gear, to: "/configuracoes?secao=privacidade" },
];

const actionEntries: Entry[] = [
  { id: "act-paciente", haystack: "novo paciente cadastrar adicionar", label: "Cadastrar novo paciente", icon: Plus, to: "/pacientes?novo=1" },
  { id: "act-sessao", haystack: "nova sessão sessao agendar marcar consulta", label: "Agendar nova sessão", icon: CalendarPlus, to: "/agenda" },
];

/** Minúsculas e sem acento, para "jose" encontrar "José". */
function norm(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matches(entry: { haystack: string }, query: string) {
  const q = norm(query);
  if (!q) return true;
  const h = norm(entry.haystack);
  // Todas as palavras precisam aparecer — "ana silva" não casa com "Ana Costa".
  return q.split(/\s+/).every((word) => h.includes(word));
}

function sessionLabel(s: Session) {
  const d = fromISODate(s.date);
  return `${String(d.getDate()).padStart(2, "0")} de ${monthLabels[d.getMonth()].toLowerCase()} · ${s.startTime}`;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patients: Patient[];
  sessions: Session[];
}

export function CommandPalette({ open, onOpenChange, patients, sessions }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const patientEntries = useMemo<Entry[]>(
    () =>
      patients.map((p) => ({
        id: `pac-${p.id}`,
        haystack: `${p.name} ${p.email} ${p.phone}`,
        label: p.name,
        hint: p.phone,
        icon: UserCircle,
        to: `/pacientes/${p.id}`,
      })),
    [patients],
  );

  const sessionEntries = useMemo<Entry[]>(() => {
    const today = toISODate(new Date());
    return sessions
      .filter((s) => s.status !== "blocked")
      .sort((a, b) => {
        // Futuras primeiro, da mais próxima para a mais distante; depois as passadas.
        const aFuture = a.date >= today;
        const bFuture = b.date >= today;
        if (aFuture !== bFuture) return aFuture ? -1 : 1;
        return aFuture ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
      })
      .map((s) => ({
        id: `ses-${s.id}`,
        haystack: `${s.patientName} ${sessionLabel(s)} ${statusMeta[s.status].label}`,
        label: s.patientName,
        hint: `${sessionLabel(s)} · ${statusMeta[s.status].label}`,
        icon: CalendarBlank,
        to: "/agenda",
      }));
  }, [sessions]);

  const groups = useMemo(() => {
    const take = (list: Entry[], limit: number) => list.filter((e) => matches(e, query)).slice(0, limit);
    // Sem busca o painel é um atalho de navegação, não um despejo de dados.
    if (!query.trim()) {
      return [
        { key: "ir", heading: "Ir para", entries: navEntries.slice(0, 4) },
        { key: "acoes", heading: "Ações", entries: actionEntries },
      ];
    }
    return [
      { key: "pacientes", heading: "Pacientes", entries: take(patientEntries, 6) },
      { key: "sessoes", heading: "Sessões", entries: take(sessionEntries, 5) },
      { key: "ir", heading: "Ir para", entries: take(navEntries, 5) },
      { key: "acoes", heading: "Ações", entries: take(actionEntries, 3) },
    ].filter((g) => g.entries.length > 0);
  }, [query, patientEntries, sessionEntries]);

  if (!open) return null;

  function run(entry: Entry) {
    onOpenChange(false);
    navigate(entry.to);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[96px] px-[24px]">
      <div className="absolute inset-0 bg-black/25" onClick={() => onOpenChange(false)} />

      <Command
        // O filtro é nosso: assim controlamos limite por grupo e ordenação.
        shouldFilter={false}
        loop
        className="relative w-[560px] max-w-full bg-white rounded-[16px] border border-[#efefef] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.22)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center gap-[10px] px-[16px] h-[52px] border-b border-[#efefef]">
          <MagnifyingGlass size={18} weight="bold" className="text-[#939393] shrink-0" />
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Buscar pacientes, sessões ou ir para uma seção…"
            className="flex-1 h-full bg-transparent outline-none font-['Geist',sans-serif] font-normal text-[14px] text-[#111827] placeholder:text-[#939393]"
          />
          <kbd className="shrink-0 h-[22px] px-[8px] flex items-center rounded-[6px] border border-[#e4e4e7] bg-[#fafafa] font-['Geist',sans-serif] font-medium text-[12px] text-[#939393]">
            esc
          </kbd>
        </div>

        <Command.List className="max-h-[360px] overflow-y-auto py-[8px] [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]">
          <Command.Empty className="px-[16px] py-[28px] text-center font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393]">
            Nada encontrado para “{query}”.
          </Command.Empty>

          {groups.map((group) => (
            <Command.Group
              key={group.key}
              heading={group.heading}
              className="px-[8px] [&_[cmdk-group-heading]]:px-[8px] [&_[cmdk-group-heading]]:pt-[8px] [&_[cmdk-group-heading]]:pb-[4px] [&_[cmdk-group-heading]]:font-['Geist',sans-serif] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:tracking-[0.5px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-[#a1a1aa]"
            >
              {group.entries.map((entry) => {
                const Icon = entry.icon;
                return (
                  <Command.Item
                    key={entry.id}
                    value={entry.id}
                    onSelect={() => run(entry)}
                    className="flex items-center gap-[10px] px-[8px] h-[40px] rounded-[8px] cursor-pointer data-[selected=true]:bg-[#f2f6ff]"
                  >
                    <Icon size={16} weight="bold" className="text-[#75787d] shrink-0" />
                    <span className="flex-1 min-w-0 truncate font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#111827]">
                      {entry.label}
                    </span>
                    {entry.hint && (
                      <span className="shrink-0 font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
                        {entry.hint}
                      </span>
                    )}
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
