import { SkeletonBox, SkeletonLine } from "./primitives";

interface FormSkeletonProps {
  /** Quantidade de campos. */
  fields?: number;
  /** Campos por linha (2 nos modais em grid, 1 nos formulários em coluna). */
  columns?: number;
  /** Altura do input — 44px nos modais, 40px nos formulários de auth. */
  inputHeight?: number;
  /** Exibe um botão de ação no final. */
  footerAction?: boolean;
  className?: string;
}

export function FieldSkeleton({ inputHeight = 44 }: { inputHeight?: number }) {
  return (
    <div className="flex flex-col gap-[6px] min-w-0">
      <SkeletonLine w={96} h={12} />
      <SkeletonBox h={inputHeight} radius={12} />
    </div>
  );
}

export function FormSkeleton({
  fields = 6,
  columns = 2,
  inputHeight = 44,
  footerAction = true,
  className = "",
}: FormSkeletonProps) {
  return (
    <div className={`flex flex-col gap-[16px] w-full ${className}`}>
      <div
        className="grid gap-[16px]"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: fields }, (_, i) => (
          <FieldSkeleton key={i} inputHeight={inputHeight} />
        ))}
      </div>
      {footerAction && (
        <div className="flex items-center justify-end gap-[12px] pt-[8px]">
          <SkeletonBox w={96} h={40} radius={8} />
          <SkeletonBox w={132} h={40} radius={8} />
        </div>
      )}
    </div>
  );
}
