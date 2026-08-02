import type { ReactNode } from "react";
import { SkeletonBox, SkeletonCircle, SkeletonLine } from "./primitives";

/** Casca de card do design system (mesma borda/raio/sombra dos cards reais). */
export function CardSkeleton({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] min-w-0 ${className}`}
    >
      {children}
    </div>
  );
}

/** Espelha o StatusCard do Dashboard (label, número, descrição + ícone à direita). */
export function StatCardSkeleton() {
  return (
    <CardSkeleton className="flex-1">
      <div className="flex gap-[8px] items-start p-[24px]">
        <div className="flex flex-col gap-[12px] flex-1 min-w-0">
          <div className="flex flex-col gap-[12px]">
            {/* Rótulo ocupa duas linhas, como nos cards reais */}
            <div className="flex flex-col gap-[6px]">
              <SkeletonLine w="90%" h={14} />
              <SkeletonLine w="55%" h={14} />
            </div>
            <SkeletonLine w={56} h={24} />
          </div>
          <div className="flex flex-col gap-[6px]">
            <SkeletonLine w="80%" h={14} />
            <SkeletonLine w="45%" h={14} />
          </div>
        </div>
        <SkeletonBox w={40} h={40} radius={6} />
      </div>
    </CardSkeleton>
  );
}

export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-[16px] w-full">
      {Array.from({ length: count }, (_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Espelha os cards de contagem da tela de Pacientes (dot + label, número, descrição). */
export function CountCardSkeleton() {
  return (
    <CardSkeleton className="flex-1 flex flex-col gap-[12px] px-[24px] py-[18px]">
      <div className="flex items-center gap-[8px] w-full h-[17px]">
        <SkeletonCircle size={8} />
        <SkeletonLine w={64} h={14} />
      </div>
      <SkeletonLine w={40} h={24} />
      <SkeletonLine w={110} h={17} />
    </CardSkeleton>
  );
}

export function CountCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-[24px] items-start w-full">
      {Array.from({ length: count }, (_, i) => (
        <CountCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Cabeçalho de card com ícone + título + subtítulo (Próximos atendimentos, gráfico...). */
export function CardHeaderSkeleton() {
  return (
    <div className="flex gap-[8px] items-start">
      <SkeletonBox w={20} h={20} radius={6} className="mt-[2px]" />
      <div className="flex flex-col gap-[4px]">
        <SkeletonLine w={180} h={16} />
        <SkeletonLine w={220} h={14} />
      </div>
    </div>
  );
}
