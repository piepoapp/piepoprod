import { SkeletonBox, SkeletonLine } from "./primitives";

/**
 * Espelha o OnboardingLayout no primeiro passo (logo, card centralizado,
 * barras de progresso, cabeçalho, um campo e o botão).
 *
 * Usado enquanto o perfil é carregado em rota de onboarding — assim quem vem
 * do cadastro nunca vê o esqueleto do Dashboard, que não é para onde vai.
 */
export function OnboardingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-[24px] bg-[#fafafa] font-['Geist',sans-serif] px-[24px] py-[40px]">
      <div className="w-[512px] max-w-full flex flex-col gap-[24px]">
        <div className="flex justify-center">
          <SkeletonBox w={28} h={40} radius={8} />
        </div>

        <div className="bg-white rounded-[16px] border border-[#efefef] p-[32px] flex flex-col gap-[24px]">
          <div className="w-full flex items-center gap-[8px]">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-[2px] bg-[#e2e0d8]" />
            ))}
          </div>

          <div className="flex flex-col gap-[4px] items-center">
            <div className="flex items-center justify-center h-[24px]">
              <SkeletonLine w={220} h={18} />
            </div>
            <div className="flex items-center justify-center h-[21px]">
              <SkeletonLine w={300} h={14} />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <SkeletonLine w={110} h={14} />
            <SkeletonBox h={44} radius={12} />
            <SkeletonLine w="80%" h={12} />
          </div>

          <SkeletonBox h={40} radius={8} />
        </div>

        <div className="flex justify-center">
          <SkeletonLine w={90} h={12} />
        </div>
      </div>
    </div>
  );
}
