import type { ReactNode } from "react";
import { BrandLogo } from "../BrandLogo";

interface OnboardingLayoutProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Moldura do onboarding: logo acima de um card branco sobre fundo #fafafa.
 *
 * O cabeçalho é alinhado à esquerda e segue a ordem "Etapa X de N → título →
 * subtítulo → progresso": o contador nomeia onde o usuário está antes de a
 * barra mostrar o quanto falta.
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
          <BrandLogo size={32} />
        </div>

        <div className="bg-white rounded-[16px] border border-[#efefef] p-[32px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#a1a1aa]">
                Etapa {step} de {totalSteps}
              </span>
              <h1 className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
                {title}
              </h1>
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#75787d]">
                {subtitle}
              </p>
            </div>

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
          </div>

          {children}

          <div className="flex items-center gap-[8px]">{footer}</div>
        </div>
      </div>
    </div>
  );
}
