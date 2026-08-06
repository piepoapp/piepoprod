import { useEffect, useRef, useState } from "react";
import { CaretUpDown, Check, MagnifyingGlass } from "@phosphor-icons/react";
import { OptionsSkeleton } from "./skeletons";

export interface ComboboxOption {
  value: string;
  label: string;
  shortLabel?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  hasError?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  requireSearch?: boolean;
  searchPromptMessage?: string;
  maxResults?: number;
  placement?: "auto" | "top" | "bottom";
}

export function Combobox({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Selecione",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhuma opção encontrada.",
  hasError,
  searchable = true,
  disabled,
  loading,
  requireSearch,
  searchPromptMessage = "Digite para buscar...",
  maxResults = 100,
  placement = "auto",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropUp, setDropUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);
  const showEmptyPrompt = requireSearch && query.trim() === "";
  const filtered = showEmptyPrompt
    ? []
    : searchable
      ? options
          .filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, maxResults)
      : options;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        onBlur?.();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onBlur]);

  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  useEffect(() => {
    if (!open || !rootRef.current) return;
    if (placement === "top") {
      setDropUp(true);
      return;
    }
    if (placement === "bottom") {
      setDropUp(false);
      return;
    }
    const rect = rootRef.current.getBoundingClientRect();
    const estimatedPanelHeight = 280;
    const spaceBelow = window.innerHeight - rect.bottom;
    setDropUp(spaceBelow < estimatedPanelHeight && rect.top > spaceBelow);
  }, [open, placement]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`w-full h-[44px] bg-white rounded-[12px] border-2 px-[16px] flex items-center justify-between gap-[8px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] outline-none transition-colors ${
          disabled
            ? "opacity-60 cursor-not-allowed bg-[#fafafa]"
            : "cursor-pointer"
        } ${
          hasError
            ? "border-[#fd3939] focus:border-[#fd3939]"
            : open
              ? "border-[#317dff]"
              : "border-[#efefef] hover:border-[#d4d4d4]"
        }`}
      >
        <span
          className={`truncate ${selected ? "text-black" : "text-[#737373]"}`}
        >
          {selected ? (selected.shortLabel ?? selected.label) : placeholder}
        </span>
        <CaretUpDown
          size={16}
          weight="bold"
          className="text-[#949494] shrink-0"
        />
      </button>

      {open && (
        <div className={`absolute left-0 z-50 min-w-full w-max max-w-[360px] bg-white rounded-[12px] border border-[#e4e4e7] shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in-95 duration-100 ${
          dropUp ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
        }`}>
          {searchable && (
            <div className="flex items-center gap-[8px] px-[12px] h-[40px] border-b border-[#efefef]">
              <MagnifyingGlass
                size={14}
                weight="bold"
                className="text-[#939393] shrink-0"
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent outline-none font-['Geist',sans-serif] font-normal text-[14px] text-black placeholder:text-[#939393]"
              />
            </div>
          )}

          <div className="max-h-[220px] overflow-y-auto p-[4px] [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa]">
            {loading ? (
              <OptionsSkeleton rows={4} />
            ) : showEmptyPrompt ? (
              <div className="px-[12px] py-[16px] text-center font-['Geist',sans-serif] font-normal text-[14px] text-[#939393]">
                {searchPromptMessage}
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-[12px] py-[16px] text-center font-['Geist',sans-serif] font-normal text-[14px] text-[#939393]">
                {emptyMessage}
              </div>
            ) : (
              filtered.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange?.(opt.value);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`w-full h-[36px] flex items-center justify-between gap-[8px] px-[10px] rounded-[8px] cursor-pointer transition-colors ${
                      isSelected ? "bg-[#f2f6ff]" : "hover:bg-[#f5f5f5]"
                    }`}
                  >
                    <span
                      className={`truncate font-['Geist',sans-serif] text-[14px] leading-[20px] text-left ${
                        isSelected
                          ? "font-medium text-[#317dff]"
                          : "font-normal text-[#363636]"
                      }`}
                    >
                      {opt.label}
                    </span>
                    {isSelected && (
                      <Check
                        size={14}
                        weight="bold"
                        className="text-[#317dff] shrink-0"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
