import type { ReactNode } from "react";
import { Link } from "react-router";
import { Info, ArrowLeft } from "@phosphor-icons/react";

export function LegalPageLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fafafa] font-['Geist',sans-serif] px-[24px] py-[48px]">
      <div className="w-[720px] max-w-full flex flex-col gap-[24px]">
        <div className="flex justify-center">
          <p className="font-['Confiteria_Script',sans-serif] font-bold text-[#0055e7] text-[40px] leading-none tracking-[0.96px]">
            o
          </p>
        </div>
        <div className="bg-white rounded-[16px] border border-[#efefef] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.1)] p-[32px] flex flex-col gap-[20px]">
          <Link
            to="/signup"
            className="inline-flex items-center gap-[6px] font-['Geist',sans-serif] font-medium text-[14px] text-[#75787d] hover:text-[#317dff] transition-colors w-fit"
          >
            <ArrowLeft size={14} weight="bold" />
            Voltar para o cadastro
          </Link>
          <h1 className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">{title}</h1>
          <div className="flex items-start gap-[10px] w-full bg-[#fefae8] border border-[#f5e7a3] rounded-[10px] px-[14px] py-[10px]">
            <Info size={16} weight="bold" className="text-[#b38600] shrink-0 mt-[2px]" />
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#8a6a00]">
              Este conteúdo é um placeholder e ainda não foi revisado por um advogado ou profissional de compliance.
              Não utilize em produção sem validação jurídica.
            </p>
          </div>
          <div className="flex flex-col gap-[14px] font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#65635a]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
