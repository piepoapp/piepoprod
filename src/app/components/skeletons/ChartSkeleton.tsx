import { SkeletonBox, SkeletonLine } from "./primitives";

/** Barras proporcionais ao gráfico semanal (altura útil de 240px). */
const barHeights = [0.45, 0.7, 0.35, 0.85, 0.55, 0.25];

export function ChartSkeleton({ height = 240, bars = 6 }: { height?: number; bars?: number }) {
  const usable = height - 32;
  return (
    <div className="flex-1 w-full flex flex-col gap-[10px]" style={{ minHeight: height }}>
      <div className="flex items-end justify-between gap-[12px] px-[12px]" style={{ height: usable }}>
        {Array.from({ length: bars }, (_, i) => (
          <SkeletonBox
            key={i}
            w="100%"
            h={Math.round(usable * barHeights[i % barHeights.length])}
            radius={8}
            className="flex-1"
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-[12px] px-[12px]">
        {Array.from({ length: bars }, (_, i) => (
          <div key={i} className="flex-1 flex justify-center">
            <SkeletonLine w={28} h={12} />
          </div>
        ))}
      </div>
    </div>
  );
}
