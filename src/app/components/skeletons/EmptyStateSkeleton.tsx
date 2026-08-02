import { SkeletonBox, SkeletonLine } from "./primitives";

interface EmptyStateSkeletonProps {
  /** "image" espelha a ilustração de 128px; "icon" o contêiner de 40px. */
  media?: "image" | "icon";
  /** Reserva o espaço do botão de ação. */
  withAction?: boolean;
  /** Quantas linhas a descrição real ocupa — mantém a altura idêntica. */
  descriptionLines?: number;
  className?: string;
}

/** leading-[21px] da descrição e leading-[24px] do título do EmptyState. */
const DESCRIPTION_LINE_HEIGHT = 21;
const TITLE_LINE_HEIGHT = 24;

/**
 * Espelha o EmptyState: mídia centralizada, título, duas linhas de descrição
 * e o botão de ação. Usado quando o carregamento provavelmente vai terminar
 * vazio, para que skeleton e conteúdo final tenham a mesma composição.
 */
export function EmptyStateSkeleton({
  media = "image",
  withAction = false,
  descriptionLines = 3,
  className = "",
}: EmptyStateSkeletonProps) {
  const lineWidths = ["92%", "84%", "70%", "58%"];
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center gap-[16px] px-[24px] py-[40px] ${className}`}
    >
      {media === "image" ? (
        <SkeletonBox w={128} h={128} radius={16} />
      ) : (
        <SkeletonBox w={40} h={40} radius={8} />
      )}

      <div className="flex flex-col items-center gap-[8px] w-full max-w-[440px]">
        {/* Título: bloco com a altura da linha real, barra centralizada dentro */}
        <div className="flex items-center justify-center" style={{ height: TITLE_LINE_HEIGHT }}>
          <SkeletonLine w={220} h={18} />
        </div>
        {/* Descrição: mesma altura total das N linhas de texto */}
        <div
          className="w-full flex flex-col items-center justify-between"
          style={{ height: descriptionLines * DESCRIPTION_LINE_HEIGHT }}
        >
          {Array.from({ length: descriptionLines }, (_, i) => (
            <SkeletonLine key={i} w={lineWidths[i % lineWidths.length]} h={12} />
          ))}
        </div>
      </div>

      {withAction && <SkeletonBox w={220} h={40} radius={8} className="mt-[4px]" />}
    </div>
  );
}
