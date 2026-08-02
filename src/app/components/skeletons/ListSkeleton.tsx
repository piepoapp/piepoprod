import { SkeletonBox, SkeletonCircle, SkeletonLine } from "./primitives";

interface ListSkeletonProps {
  /** Quantidade de itens exibidos. */
  rows?: number;
  /** Diâmetro do avatar (40 nas listas de card, 28 na sidebar da agenda). */
  avatarSize?: number;
  /** Item com borda e raio, como as linhas de "Próximos atendimentos". */
  bordered?: boolean;
  /** Reserva espaço para badge + ação à direita. */
  trailing?: boolean;
  className?: string;
}

/**
 * Lista de pessoas: avatar + nome + linha secundária.
 * Cobre tanto as linhas do Dashboard quanto as listas compactas da Agenda.
 */
export function ListSkeleton({
  rows = 4,
  avatarSize = 40,
  bordered = true,
  trailing = true,
  className = "",
}: ListSkeletonProps) {
  const compact = avatarSize < 36;
  return (
    <div className={`flex flex-col ${bordered ? "gap-[16px]" : "gap-[4px]"} ${className}`}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className={
            bordered
              ? "w-full rounded-[8px] border border-[#e5e7eb] flex items-center justify-between px-[17px] py-[20px]"
              : "w-full flex items-center justify-between p-[8px] rounded-[8px]"
          }
        >
          <div className={`flex items-center ${compact ? "gap-[10px]" : "gap-[16px]"} min-w-0`}>
            <SkeletonCircle size={avatarSize} />
            <div className={`flex flex-col ${compact ? "gap-[4px]" : "gap-[6px]"} min-w-0`}>
              <SkeletonLine w={compact ? 92 : 140} h={compact ? 12 : 15} />
              <SkeletonLine w={compact ? 68 : 180} h={compact ? 11 : 14} />
            </div>
          </div>
          {trailing && (
            <div className="flex items-center gap-[8px] shrink-0">
              <SkeletonBox w={96} h={22} radius={8} />
              <SkeletonBox w={20} h={20} radius={6} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
