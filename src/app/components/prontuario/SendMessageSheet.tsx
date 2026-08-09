import { useEffect, useRef, useState } from "react";
import { ArrowSquareOut, ChatCircleText, CheckCircle, WarningCircle, X } from "@phosphor-icons/react";

/**
 * Converte o telefone do cadastro — "(11) 98765-4321" — no formato que o
 * wa.me exige: só dígitos, com DDI. Retorna null se não der para montar.
 */
export function toWhatsAppNumber(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) return digits;
  return null;
}

type SheetState = "editing" | "sending" | "success" | "error";

interface Props {
  open: boolean;
  onClose: () => void;
  patientName: string;
  patientInitials: string;
  patientPhone: string;
}

export function SendMessageSheet({
  open,
  onClose,
  patientName,
  patientInitials,
  patientPhone,
}: Props) {
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SheetState>("editing");
  const [errorMessage, setErrorMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const waNumber = toWhatsAppNumber(patientPhone);
  const canSend = message.trim().length > 0 && !!waNumber && state !== "sending";

  useEffect(() => {
    if (!open) return;
    setMessage("");
    setState("editing");
    setErrorMessage("");
    const timer = setTimeout(() => textareaRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSend() {
    if (!canSend || !waNumber) return;
    setState("sending");
    setErrorMessage("");
    try {
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message.trim())}`;
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) {
        setState("error");
        setErrorMessage(
          "O navegador bloqueou a abertura do WhatsApp. Libere pop-ups para este site e tente de novo.",
        );
        return;
      }
      setState("success");
    } catch {
      setState("error");
      setErrorMessage("Não foi possível abrir o WhatsApp. Tente novamente.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Enviar mensagem para ${patientName}`}
        className="relative w-[440px] max-w-[calc(100vw-32px)] h-full bg-white shadow-xl border-l border-[#e5e7eb] flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Cabeçalho */}
        <div className="shrink-0 border-b border-[#e5e7eb] px-[24px] py-[20px] flex items-start justify-between gap-[12px]">
          <div className="flex items-center gap-[12px] min-w-0">
            <div className="size-[44px] rounded-full bg-[#ebf2ff] flex items-center justify-center shrink-0">
              <span className="font-['Geist',sans-serif] font-medium text-[16px] text-[#317dff]">
                {patientInitials}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] text-[#111827] truncate">
                Enviar mensagem
              </p>
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#939393] truncate">
                {patientName} · {patientPhone || "sem telefone"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-[8px] rounded-[8px] hover:bg-[#f3f4f6] cursor-pointer transition-colors shrink-0"
          >
            <X size={20} weight="bold" className="text-[#6b7280]" />
          </button>
        </div>

        {/* Corpo */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px] flex flex-col gap-[16px]">
          {state === "success" ? (
            <SuccessState patientName={patientName} onNew={() => { setMessage(""); setState("editing"); }} />
          ) : !waNumber ? (
            <Notice
              tone="warning"
              title="Sem número de WhatsApp válido"
              body="O telefone cadastrado para este paciente não permite montar um link do WhatsApp. Edite o cadastro e inclua um número com DDD."
            />
          ) : (
            <>
              <div className="flex flex-col gap-[8px]">
                <label
                  htmlFor="mensagem-whatsapp"
                  className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem-whatsapp"
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva a mensagem que você quer enviar…"
                  rows={7}
                  className="w-full min-h-[168px] bg-white rounded-[12px] border-2 border-[#efefef] focus:border-[#317dff] px-[16px] py-[14px] font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-black placeholder:text-[#737373] outline-none transition-colors resize-none"
                />
              </div>

              {state === "error" && (
                <Notice tone="error" title="Não foi possível abrir o WhatsApp" body={errorMessage} />
              )}

              <Notice
                tone="info"
                body="A conversa abre no WhatsApp com o texto já preenchido. O envio final é feito por você, dentro do WhatsApp."
              />
            </>
          )}
        </div>

        {/* Rodapé */}
        {state !== "success" && (
          <div className="shrink-0 border-t border-[#e5e7eb] px-[24px] py-[16px] flex items-center justify-end gap-[8px]">
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] flex items-center px-[17px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer"
            >
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
                Cancelar
              </span>
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={`h-[40px] flex items-center gap-[8px] px-[16px] rounded-[8px] transition-colors ${
                canSend
                  ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
                  : "bg-[#a9c5ff] cursor-not-allowed"
              }`}
            >
              <ArrowSquareOut size={16} weight="bold" className="text-white" />
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
                {state === "sending" ? "Abrindo WhatsApp…" : "Abrir no WhatsApp"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessState({ patientName, onNew }: { patientName: string; onNew: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-[12px] pt-[32px]">
      <div className="size-[56px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
        <CheckCircle size={30} weight="bold" className="text-[#10b981]" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="font-['Geist',sans-serif] font-medium text-[16px] leading-[22px] text-[#111827]">
          WhatsApp aberto
        </p>
        <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#4b5563] max-w-[300px]">
          A conversa com {patientName} abriu em outra aba com sua mensagem pronta. Confirme o envio
          por lá.
        </p>
      </div>
      <button
        type="button"
        onClick={onNew}
        className="mt-[4px] h-[36px] flex items-center gap-[8px] px-[14px] rounded-[8px] border border-[#e4e4e7] bg-white hover:bg-[#f9fafb] transition-colors cursor-pointer"
      >
        <ChatCircleText size={14} weight="bold" className="text-[#65635a]" />
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] text-[#65635a]">
          Escrever outra mensagem
        </span>
      </button>
    </div>
  );
}

function Notice({
  tone,
  title,
  body,
}: {
  tone: "info" | "warning" | "error";
  title?: string;
  body: string;
}) {
  const styles = {
    info: { box: "bg-[#f2f6ff] border-[#d6e4ff]", text: "text-[#475569]", icon: "text-[#317dff]" },
    warning: { box: "bg-[#fefae8] border-[#f5e7a3]", text: "text-[#8a6a00]", icon: "text-[#8a6a00]" },
    error: { box: "bg-[#fef2f2] border-[#fecaca]", text: "text-[#b91c1c]", icon: "text-[#b91c1c]" },
  }[tone];

  return (
    <div className={`flex items-start gap-[10px] w-full border rounded-[10px] px-[14px] py-[12px] ${styles.box}`}>
      <WarningCircle size={16} weight="bold" className={`${styles.icon} shrink-0 mt-[2px]`} />
      <div className="flex flex-col gap-[2px] min-w-0">
        {title && (
          <p className={`font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] ${styles.text}`}>
            {title}
          </p>
        )}
        <p className={`font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] ${styles.text}`}>
          {body}
        </p>
      </div>
    </div>
  );
}
