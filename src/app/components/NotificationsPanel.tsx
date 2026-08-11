import { CaretRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { SkeletonLine } from "./skeletons";
import type { PendingItem, PendingTone } from "../data/pendencias";

const toneDot: Record<PendingTone, string> = {
  urgent: "bg-[#e7000b]",
  attention: "bg-[#eab308]",
  info: "bg-[#317dff]",
};

interface Props {
  items: PendingItem[];
  loading: boolean;
  error: boolean;
  onNavigate: () => void;
  onRetry: () => void;
}

export function NotificationsPanel({ items, loading, error, onNavigate, onRetry }: Props) {
  const navigate = useNavigate();

  function open(item: PendingItem) {
    onNavigate();
    navigate(item.to);
  }

  return (
    <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] bg-white rounded-[12px] shadow-[0px_12px_32px_-8px_rgba(0,0,0,0.16)] border border-[#e4e4e7] z-50 overflow-hidden">
      <div className="px-[16px] py-[14px] border-b border-[#e5e7eb]">
        <span className="font-['Geist',sans-serif] font-medium text-[16px] leading-[20px] text-[#111827]">
          Pendências
        </span>
      </div>

      <div className="max-h-[360px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]">
        {loading ? (
          <div className="flex flex-col gap-[14px] px-[16px] py-[16px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-[6px]">
                <SkeletonLine w="70%" h={14} />
                <SkeletonLine w="45%" h={12} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-[10px] px-[24px] py-[32px] text-center">
            <WarningCircle size={22} weight="bold" className="text-[#b91c1c]" />
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#6b7280]">
              Não foi possível carregar suas pendências.
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#317dff] hover:underline cursor-pointer"
            >
              Tentar novamente
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-[10px] px-[24px] py-[36px] text-center">
            <div className="size-[40px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
              <CheckCircle size={22} weight="bold" className="text-[#10b981]" />
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#111827]">
                Tudo em dia
              </p>
              <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393]">
                Nada esperando por você agora.
              </p>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => open(item)}
              className="w-full text-left px-[16px] py-[14px] flex gap-[12px] items-start cursor-pointer transition-colors hover:bg-[#f9fafb] border-b border-[#f3f4f6] last:border-b-0"
            >
              <span className={`size-[8px] rounded-full shrink-0 mt-[6px] ${toneDot[item.tone]}`} />
              <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#111827]">
                  {item.title}
                </span>
                <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393] truncate">
                  {item.description}
                </span>
              </div>
              <CaretRight size={14} weight="bold" className="text-[#c4c4c4] shrink-0 mt-[6px]" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
