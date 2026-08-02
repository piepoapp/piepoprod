import type { ReactNode } from "react";

interface EmptyStateAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface EmptyStateProps {
  /** Ilustração 3D importada de src/assets (empty states "ricos" do Dashboard). */
  image?: string;
  imageAlt?: string;
  /**
   * Ícone da Phosphor exibido dentro do contêiner arredondado — padrão do
   * componente Empty do shadcn, usado nos empty states dentro de tabelas/listas.
   */
  icon?: ReactNode;
  title: string;
  description: ReactNode;
  /** Ação primária (botão azul do design system). */
  action?: EmptyStateAction;
  /** Ação secundária (botão de contorno). */
  secondaryAction?: EmptyStateAction;
  className?: string;
}

export function EmptyState({
  image,
  imageAlt = "",
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center text-center gap-[16px] px-[24px] py-[40px] animate-in fade-in duration-200 ${className}`}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt}
          width={128}
          height={128}
          decoding="async"
          className="size-[128px] shrink-0 select-none pointer-events-none"
        />
      )}

      {!image && icon && (
        <div className="size-[40px] shrink-0 rounded-[8px] bg-[#f3f4f6] flex items-center justify-center text-[#737185]">
          {icon}
        </div>
      )}

      <div className="flex flex-col items-center gap-[8px] max-w-[440px]">
        <p className="font-['Geist',sans-serif] font-medium text-[18px] leading-[24px] text-[#111827]">
          {title}
        </p>
        <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#939393]">
          {description}
        </p>
      </div>

      {(action || secondaryAction) && (
        <div className="flex items-center justify-center gap-[12px] mt-[4px]">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="flex items-center justify-center gap-[8px] h-[40px] bg-[#317dff] hover:bg-[#2968d9] text-white rounded-[8px] px-[16px] cursor-pointer transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            >
              {action.icon}
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px]">
                {action.label}
              </span>
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="flex items-center justify-center gap-[8px] h-[40px] bg-white hover:bg-[#f9fafb] text-[#374151] rounded-[8px] px-[16px] border border-[#e4e4e7] cursor-pointer transition-colors"
            >
              {secondaryAction.icon}
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px]">
                {secondaryAction.label}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
