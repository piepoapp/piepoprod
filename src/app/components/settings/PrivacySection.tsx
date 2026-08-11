import { ArrowSquareOut, Info } from "@phosphor-icons/react";
import { Link } from "react-router";
import { SectionCard } from "./SettingsShell";

/**
 * Privacidade e dados.
 *
 * Em v1 exportação e encerramento passam pelo suporte: excluir a conta hoje
 * apagaria prontuários em cascata, e eles têm prazo legal de guarda. Tratar
 * caso a caso é mais honesto do que oferecer um botão irreversível.
 */
export function PrivacySection() {
  return (
    <SectionCard
      title="Privacidade e dados"
      description="O que fazemos com as informações do seu consultório."
    >
      <div className="flex items-start gap-[10px] w-full bg-[#f2f6ff] border border-[#d6e4ff] rounded-[10px] px-[14px] py-[12px]">
        <Info size={16} weight="bold" className="text-[#317dff] shrink-0 mt-[2px]" />
        <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#475569]">
          Os prontuários dos seus pacientes têm prazo legal de guarda e não são apagados junto com a
          conta. Por isso, exportação e encerramento passam pelo nosso suporte, que trata cada caso.
        </p>
      </div>

      <div className="flex flex-col gap-[12px]">
        <ActionRow
          title="Baixar meus dados"
          description="Um arquivo com seus pacientes, sessões e registros de prontuário."
          actionLabel="Solicitar exportação"
          href="mailto:suporte@piepo.com.br?subject=Exporta%C3%A7%C3%A3o%20de%20dados"
        />
        <ActionRow
          title="Encerrar minha conta"
          description="Você perde o acesso ao Piepo. Esta ação não pode ser desfeita."
          actionLabel="Solicitar encerramento"
          href="mailto:suporte@piepo.com.br?subject=Encerramento%20de%20conta"
          destructive
        />
      </div>

      <div className="flex flex-col gap-[8px] pt-[4px] border-t border-[#f3f4f6]">
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black pt-[16px]">
          Documentos
        </span>
        <div className="flex items-center gap-[16px]">
          <Link
            to="/termos"
            target="_blank"
            className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#317dff] hover:underline"
          >
            Termos de Uso
          </Link>
          <Link
            to="/privacidade"
            target="_blank"
            className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#317dff] hover:underline"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </SectionCard>
  );
}

function ActionRow({
  title,
  description,
  actionLabel,
  href,
  destructive,
}: {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  destructive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-[16px] w-full rounded-[12px] border border-[#efefef] px-[16px] py-[14px]">
      <div className="flex flex-col gap-[2px] min-w-0">
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#111827]">
          {title}
        </span>
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
          {description}
        </span>
      </div>
      <a
        href={href}
        className={`h-[36px] shrink-0 flex items-center gap-[6px] px-[14px] rounded-[8px] border transition-colors cursor-pointer ${
          destructive
            ? "border-[#fecaca] bg-white hover:bg-[#fef2f2] text-[#b91c1c]"
            : "border-[#e4e4e7] bg-white hover:bg-[#f9fafb] text-[#65635a]"
        }`}
      >
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px]">
          {actionLabel}
        </span>
        <ArrowSquareOut size={14} weight="bold" />
      </a>
    </div>
  );
}
