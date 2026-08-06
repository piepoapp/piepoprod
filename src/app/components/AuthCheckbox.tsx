import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "@phosphor-icons/react";
import type { ReactNode } from "react";

interface AuthCheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}

export function AuthCheckbox({ id, checked, onCheckedChange, error, children }: AuthCheckboxProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-center gap-[8px]">
        <CheckboxPrimitive.Root
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className={`shrink-0 size-[18px] rounded-[4px] border-2 flex items-center justify-center outline-none transition-colors cursor-pointer ${
            error
              ? "border-[#fd3939]"
              : checked
                ? "border-[#317dff] bg-[#317dff]"
                : "border-[#efefef] bg-white hover:border-[#317dff]"
          }`}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
            <Check size={12} weight="bold" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor={id}
          className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#75787d] cursor-pointer select-none"
        >
          {children}
        </label>
      </div>
      {error && (
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939] pl-[26px]">
          {error}
        </span>
      )}
    </div>
  );
}
