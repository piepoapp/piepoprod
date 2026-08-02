import { SkeletonBox, SkeletonCircle, SkeletonLine } from "./primitives";

interface TableSkeletonProps {
  /** Mesmo grid-template-columns da tabela real, para não haver layout shift. */
  gridTemplate: string;
  rows?: number;
  rowHeight?: number;
  /** Primeira coluna com avatar + nome (padrão das tabelas de paciente). */
  avatarFirstColumn?: boolean;
  /** Última coluna reservada para o menu de ações. */
  actionColumn?: boolean;
}

/** Larguras variadas para as células, dando ritmo natural ao carregamento. */
const cellWidths = [72, 96, 84, 110, 88];

export function TableSkeleton({
  gridTemplate,
  rows = 6,
  rowHeight = 64,
  avatarFirstColumn = true,
  actionColumn = true,
}: TableSkeletonProps) {
  const columnCount = gridTemplate.trim().split(/\s+/).length;
  const middleColumns = columnCount - (avatarFirstColumn ? 1 : 0) - (actionColumn ? 1 : 0);

  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid border-b border-[#e6e6e1] last:border-b-0"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {avatarFirstColumn && (
            <div
              className="flex items-center p-[24px] gap-[12px] min-w-0"
              style={{ height: rowHeight }}
            >
              <SkeletonCircle size={40} />
              <SkeletonLine w={rowIndex % 2 === 0 ? 140 : 112} h={14} />
            </div>
          )}
          {Array.from({ length: Math.max(middleColumns, 0) }, (_, cellIndex) => (
            <div
              key={cellIndex}
              className="flex items-center justify-center p-[24px]"
              style={{ height: rowHeight }}
            >
              <SkeletonLine w={cellWidths[(rowIndex + cellIndex) % cellWidths.length]} h={14} />
            </div>
          ))}
          {actionColumn && (
            <div className="flex items-center justify-center" style={{ height: rowHeight }}>
              <SkeletonBox w={20} h={20} radius={6} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
