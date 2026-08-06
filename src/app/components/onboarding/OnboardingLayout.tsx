import type { ReactNode } from "react";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Mesma moldura visual das telas de auth (fundo #fafafa, logo acima de um card
 * branco centralizado), com o indicador de progresso em barras que o
 * NewPatientModal já usa.
 */
export function OnboardingLayout({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  footer,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-[24px] bg-[#fafafa] font-['Geist',sans-serif] px-[24px] py-[40px]">
      <div className="w-[512px] max-w-full flex flex-col gap-[24px]">
        <div className="flex justify-center">
          <p className="font-['Confiteria_Script',sans-serif] font-bold text-[#0055e7] text-[40px] leading-none tracking-[0.96px]">
            o
          </p>
        </div>

        <div className="bg-white rounded-[16px] border border-[#efefef] p-[32px] flex flex-col gap-[24px]">
          {/* Progresso */}
          <div className="w-full flex items-center gap-[8px]">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-[2px] transition-colors ${
                  i < step ? "bg-[#317dff]" : "bg-[#e2e0d8]"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-[4px] items-center text-center">
            <h1 className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
              {title}
            </h1>
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#75787d]">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="flex items-center gap-[8px]">{footer}</div>
        </div>

        <p className="text-center font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#a1a1aa]">
          Etapa {step} de {totalSteps}
        </p>
      </div>
    </div>
  );
}
