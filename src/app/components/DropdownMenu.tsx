import { useEffect, useRef, useState, type ReactNode } from "react";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  destructive?: boolean;
  separatorBefore?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
}

export function DropdownMenu({
  trigger,
  items,
  align = "end",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div
          className={`absolute top-[calc(100%+6px)] z-50 min-w-[180px] bg-white rounded-[8px] border border-[#e4e4e7] shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.12)] p-[4px] animate-in fade-in zoom-in-95 duration-100 ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, i) => (
            <div key={`${item.label}-${i}`}>
              {item.separatorBefore && (
                <div className="h-px bg-[#efefef] my-[4px] -mx-[4px]" />
              )}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
                className={`w-full h-[36px] flex items-center gap-[10px] px-[10px] rounded-[8px] cursor-pointer transition-colors ${
                  item.destructive ? "hover:bg-[#fef3f2]" : "hover:bg-[#f5f5f5]"
                }`}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span
                  className={`truncate text-left font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] ${
                    item.destructive ? "text-[#b42318]" : "text-[#363636]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
