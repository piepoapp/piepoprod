import { IMaskInput } from "react-imask";
import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import type { IconProps } from "@phosphor-icons/react";

interface PhoneFieldProps<T extends FieldValues> {
  id: string;
  name: Path<T>;
  control: Control<T>;
  label: string;
  icon?: React.ComponentType<IconProps>;
  placeholder?: string;
  error?: FieldError;
  rules?: RegisterOptions<T, Path<T>>;
}

export function PhoneField<T extends FieldValues>({
  id,
  name,
  control,
  label,
  icon: Icon,
  placeholder,
  error,
  rules,
}: PhoneFieldProps<T>) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={id} className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            weight="bold"
            className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none"
          />
        )}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <IMaskInput
              id={id}
              mask="(00) 00000-0000"
              value={field.value ?? ""}
              unmask={false}
              onAccept={(v: string) => field.onChange(v)}
              onBlur={field.onBlur}
              inputRef={field.ref}
              placeholder={placeholder}
              className={`w-full h-[44px] bg-white rounded-[12px] border-2 py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors ${
                Icon ? "pl-[40px]" : "pl-[16px]"
              } pr-[16px] ${
                error ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
              }`}
            />
          )}
        />
      </div>
      {error?.message && (
        <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939]">
          {error.message}
        </span>
      )}
    </div>
  );
}
