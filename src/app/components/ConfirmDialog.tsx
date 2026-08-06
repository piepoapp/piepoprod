import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pergunta objetiva, ex.: "Excluir paciente?" */
  title: string;
  /** Explica o impacto da ação e, se for o caso, que ela é irreversível. */
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

/**
 * AlertDialog para ações destrutivas ou que exigem confirmação explícita
 * (excluir, cancelar de forma irreversível). Segue a estrutura oficial do
 * shadcn/ui (Header com Title/Description + Footer com Cancel/Action),
 * recolorida com os tokens do Piepo. Não usar para avisos informativos ou
 * ações de baixo impacto — nesses casos, Toast, Dialog ou Popover.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border border-[#efefef] rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.18)] p-[24px] gap-[16px] max-w-[400px]">
        <AlertDialogHeader className="gap-[6px]">
          <AlertDialogTitle className="font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] text-black">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#4b5563]">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-[8px]">
          <AlertDialogCancel className="h-[40px] px-[16px] rounded-[8px] border border-[#efefef] bg-white hover:bg-[#fafafa] transition-colors font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-[40px] px-[16px] rounded-[8px] bg-[#b91c1c] hover:bg-[#991b1b] transition-colors font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
