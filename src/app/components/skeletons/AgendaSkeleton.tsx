import { Skeleton, SkeletonBox, SkeletonCircle, SkeletonLine } from "./primitives";
import { ListSkeleton } from "./ListSkeleton";

/** Mini calendário da sub-sidebar da Agenda (7 colunas × 6 semanas). */
export function MiniCalendarSkeleton() {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <SkeletonLine w={110} h={13} />
        <div className="flex items-center gap-[2px]">
          <SkeletonBox w={24} h={24} radius={6} />
          <SkeletonBox w={24} h={24} radius={6} />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-[2px]">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={`h-${i}`} className="flex justify-center py-[2px]">
            <SkeletonLine w={8} h={10} />
          </div>
        ))}
        {Array.from({ length: 42 }, (_, i) => (
          <div key={i} className="aspect-square p-[3px]">
            <Skeleton className="size-full rounded-[6px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bloco de seção da sub-sidebar: título com divisor + linhas com contador. */
function SidebarSectionSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[8px] pb-[10px] border-b border-[#efefef]">
        <SkeletonBox w={14} h={14} radius={4} />
        <SkeletonLine w={110} h={14} />
      </div>
      <div className="flex flex-col gap-[4px]">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center justify-between px-[12px] py-[8px]">
            <div className="flex items-center gap-[8px]">
              <SkeletonCircle size={8} />
              <SkeletonLine w={i % 2 === 0 ? 96 : 74} h={13} />
            </div>
            <SkeletonBox w={20} h={20} radius={10} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Sub-sidebar completa da Agenda (mini calendário + filtros + pacientes de hoje). */
export function AgendaSidebarSkeleton() {
  return (
    <div className="flex flex-col gap-[24px]">
      <MiniCalendarSkeleton />
      <SidebarSectionSkeleton rows={5} />
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[8px] pb-[10px] border-b border-[#efefef]">
          <SkeletonBox w={14} h={14} radius={4} />
          <SkeletonLine w={120} h={14} />
        </div>
        <ListSkeleton rows={3} avatarSize={28} bordered={false} trailing={false} />
      </div>
    </div>
  );
}

/** Grade mensal (7 colunas × 6 semanas, células de 110px com marcadores). */
export function MonthGridSkeleton() {
  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-[#efefef] overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[#efefef] bg-[#fafafa]">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="py-[10px] flex justify-center">
            <SkeletonLine w={26} h={11} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        {Array.from({ length: 42 }, (_, i) => (
          <div
            key={i}
            className="min-h-[110px] border-r border-b border-[#f5f5f5] p-[8px] flex flex-col gap-[6px]"
          >
            <SkeletonLine w={16} h={13} />
            {i % 3 === 0 && <SkeletonBox w="100%" h={18} radius={6} />}
            {i % 5 === 0 && <SkeletonBox w="100%" h={18} radius={6} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Posições fictícias dos blocos de sessão: [coluna (1-based), hora, duração em horas]. */
const placeholderBlocks: [number, number, number][] = [
  [1, 0, 1],
  [2, 2, 1],
  [4, 1, 2],
  [5, 4, 1],
  [6, 3, 1],
];

/**
 * Grade da agenda (semana/dia), espelhando o WeekView: cabeçalho de dias,
 * faixas de hora de 64px e blocos de sessão posicionados.
 */
export function AgendaGridSkeleton({
  days = 7,
  /** Mesma faixa horária das views reais (07h–21h). */
  hours = 14,
  /** 64px no WeekView, 72px no DayView. */
  hourHeight = 64,
}: {
  days?: number;
  hours?: number;
  hourHeight?: number;
}) {
  const HOUR_HEIGHT = hourHeight;
  const template = `64px repeat(${days}, 1fr)`;
  const blocks = placeholderBlocks.filter(([col, row]) => col <= days && row < hours);

  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-[#efefef] overflow-hidden">
      {/* Cabeçalho dos dias */}
      <div
        className="grid border-b border-[#efefef] bg-[#fafafa]"
        style={{ gridTemplateColumns: template }}
      >
        <div />
        {Array.from({ length: days }, (_, i) => (
          <div key={i} className="flex flex-col items-center justify-center py-[12px] gap-[2px]">
            <SkeletonLine w={26} h={14} />
            <SkeletonLine w={18} h={20} />
          </div>
        ))}
      </div>

      {/* Faixas de hora */}
      <div className="relative">
        {Array.from({ length: hours }, (_, h) => (
          <div
            key={h}
            className="grid border-b border-[#f4f4f4] last:border-b-0"
            style={{ gridTemplateColumns: template, height: HOUR_HEIGHT }}
          >
            <div className="flex items-start justify-end pr-[8px] pt-[6px]">
              <SkeletonLine w={30} h={11} />
            </div>
            {Array.from({ length: days }, (_, d) => (
              <div key={d} className="border-l border-[#f4f4f4]" />
            ))}
          </div>
        ))}

        {/* Blocos de sessão */}
        <div
          className="absolute inset-0 grid pointer-events-none"
          style={{ gridTemplateColumns: template }}
        >
          <div />
          {Array.from({ length: days }, (_, d) => (
            <div key={d} className="relative">
              {blocks
                .filter(([col]) => col === d + 1)
                .map(([, row, span], i) => (
                  <Skeleton
                    key={i}
                    className="absolute left-[4px] right-[4px] rounded-[8px]"
                    style={{ top: row * HOUR_HEIGHT + 4, height: span * HOUR_HEIGHT - 8 }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
