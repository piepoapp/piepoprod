import { Skeleton, SkeletonBox, SkeletonCircle, SkeletonLine } from "./primitives";
import { CardSkeleton, CardHeaderSkeleton, StatCardsSkeleton } from "./CardSkeleton";
import { ListSkeleton } from "./ListSkeleton";
import { EmptyStateSkeleton } from "./EmptyStateSkeleton";
import { ChartSkeleton } from "./ChartSkeleton";

/** Título + subtítulo de página (ex.: saudação do Dashboard). */
export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-[8px]">
      <SkeletonLine w={240} h={28} />
      <SkeletonLine w={300} h={16} />
    </div>
  );
}

/** Lê o mesmo hint do useEmptyStateHint, mas de forma síncrona (sem estado). */
function lastLoadWasEmpty(key: string) {
  try {
    return localStorage.getItem(`piepo:empty:${key}`) !== "0";
  } catch {
    return true;
  }
}

/** Conteúdo do Dashboard: cards de status + lista de atendimentos + gráfico. */
export function DashboardContentSkeleton() {
  const appointmentsEmpty = lastLoadWasEmpty("dashboard.appointments");
  const chartEmpty = lastLoadWasEmpty("dashboard.weeklyChart");

  return (
    <div className="flex flex-col gap-[24px] p-[32px]">
      <PageHeaderSkeleton />
      <StatCardsSkeleton />
      <div className="flex gap-[16px] items-start w-full">
        <CardSkeleton className="flex-1">
          <div className="flex flex-col gap-[16px] px-[24px] pt-[24px] pb-[48px]">
            <CardHeaderSkeleton />
            {appointmentsEmpty ? (
              <EmptyStateSkeleton media="image" withAction descriptionLines={3} />
            ) : (
              <ListSkeleton rows={4} />
            )}
          </div>
        </CardSkeleton>
        <CardSkeleton className="flex-1 self-stretch">
          <div className="flex flex-col gap-[16px] pb-[48px] pt-[24px] px-[24px] h-full">
            <CardHeaderSkeleton />
            {chartEmpty ? (
              <EmptyStateSkeleton media="image" descriptionLines={3} />
            ) : (
              <ChartSkeleton />
            )}
          </div>
        </CardSkeleton>
      </div>
    </div>
  );
}

/** Sidebar fixa da aplicação (logo, navegação e perfil). */
function SidebarSkeleton() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-[#e6e6e1] flex flex-col z-10">
      <div className="h-[64px] shrink-0 px-[16px] flex items-center border-b border-[#e6e6e1] box-border">
        <div className="pl-[8px]">
          <SkeletonBox w={28} h={32} radius={8} />
        </div>
      </div>
      <div className="flex-1 pt-[32px] px-[16px]">
        <div className="flex flex-col">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center gap-[8px] w-full p-[12px]">
              <SkeletonBox w={20} h={20} radius={6} />
              <SkeletonLine w={i % 2 === 0 ? 92 : 74} h={14} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-[16px] pb-[24px]">
        <div className="h-px bg-[#e6e6e1] mb-[16px]" />
        <div className="flex items-center gap-[12px] w-full p-[4px]">
          <SkeletonCircle size={32} />
          <div className="flex flex-col gap-[6px] flex-1 min-w-0">
            <SkeletonLine w={110} h={14} />
            <SkeletonLine w={150} h={12} />
          </div>
          <SkeletonBox w={20} h={20} radius={6} />
        </div>
      </div>
    </div>
  );
}

/** Topbar fixa da aplicação (sino de notificações). */
function TopbarSkeleton() {
  return (
    <div className="fixed top-0 left-[280px] right-0 h-[64px] bg-white border-b border-[#e6e6e1] z-30 flex items-center justify-end px-[40px]">
      <SkeletonBox w={36} h={36} radius={8} />
    </div>
  );
}

/**
 * Esqueleto da aplicação inteira — usado enquanto a sessão do usuário é
 * restaurada, no lugar de uma tela em branco ou de um texto "Carregando...".
 */
export function PageSkeleton() {
  return (
    <div className="bg-white min-h-screen font-['Geist',sans-serif]">
      <SidebarSkeleton />
      <TopbarSkeleton />
      <main className="ml-[280px] pt-[64px]">
        <DashboardContentSkeleton />
      </main>
    </div>
  );
}

/** Linhas de opção usadas dentro de dropdowns/comboboxes assíncronos. */
export function OptionsSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-[2px] p-[2px]">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-[36px] flex items-center px-[10px]">
          <Skeleton
            className="rounded-[6px] h-[14px]"
            style={{ width: `${[70, 55, 80, 62, 74][i % 5]}%` }}
          />
        </div>
      ))}
    </div>
  );
}
