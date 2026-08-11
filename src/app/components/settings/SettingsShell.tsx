import { useState, type ReactNode } from "react";

/**
 * Casca de uma seção de Configurações: título, descrição, campos e um único
 * botão de salvar por seção.
 *
 * O botão nasce desabilitado e só libera quando algo muda — assim o usuário vê
 * de longe se deixou alteração pendente, sem precisar comparar valores.
 */
export function SectionCard({
  title,
  description,
  dirty,
  saving,
  onSave,
  saveLabel = "Salvar alterações",
  children,
  footer,
}: {
  title: string;
  description?: string;
  /** Quando ausente, a seção é só leitura e o botão não aparece. */
  dirty?: boolean;
  saving?: boolean;
  onSave?: () => void;
  saveLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const canSave = !!dirty && !saving;

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col">
      <div className="flex flex-col gap-[4px] px-[24px] pt-[24px]">
        <h2 className="font-['Geist',sans-serif] font-medium text-[18px] leading-[24px] text-[#111827]">
          {title}
        </h2>
        {description && (
          <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#75787d]">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[20px] px-[24px] py-[24px]">{children}</div>

      {(onSave || footer) && (
        <div className="flex items-center justify-between gap-[12px] px-[24px] py-[16px] border-t border-[#f3f4f6]">
          <div className="min-w-0">{footer}</div>
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={!canSave}
              className={`h-[40px] shrink-0 flex items-center px-[16px] rounded-[8px] transition-colors ${
                canSave
                  ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
                  : "bg-[#a9c5ff] cursor-not-allowed"
              }`}
            >
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
                {saving ? "Salvando…" : saveLabel}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** Campo com rótulo acima e texto de apoio abaixo — o padrão da referência. */
export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <label
        htmlFor={htmlFor}
        className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#fd3939]">
          {error}
        </p>
      ) : (
        hint && (
          <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** Linha de leitura, para dados que não se editam nesta seção. */
export function ReadOnlyRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black">
        {label}
      </span>
      <div className="w-full h-[44px] flex items-center px-[16px] rounded-[12px] border-2 border-[#efefef] bg-[#fafafa]">
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-[#75787d] truncate">
          {value}
        </span>
      </div>
      {hint && (
        <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#939393]">
          {hint}
        </p>
      )}
    </div>
  );
}

/**
 * Estado local de um formulário de seção.
 *
 * Guarda o valor gravado para saber o que está sujo: comparar com o servidor,
 * e não com o valor inicial do render, evita o botão ficar habilitado depois de
 * o usuário desfazer a própria edição na mão.
 */
export function useSectionForm<T extends Record<string, unknown>>(initial: T) {
  const [saved, setSaved] = useState<T>(initial);
  const [draft, setDraft] = useState<T>(initial);

  const dirty = Object.keys(saved).some((k) => saved[k] !== draft[k]);

  function set<K extends keyof T>(key: K, value: T[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  /** Sincroniza com o que veio do servidor (ex.: perfil recarregado). */
  function reset(next: T) {
    setSaved(next);
    setDraft(next);
  }

  /** Marca o rascunho atual como gravado. */
  function commit() {
    setSaved(draft);
  }

  return { draft, saved, dirty, set, reset, commit };
}
