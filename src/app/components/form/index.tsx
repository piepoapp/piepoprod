import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

/**
 * Controles de formulário do Piepo.
 *
 * Nasceram dentro do NewPatientModal e foram extraídos para cá quando o
 * prontuário passou a precisar dos mesmos campos — sem alteração visual.
 */

export function InputField({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: FieldError;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-[1_0_0] min-w-0 flex-col gap-[8px] items-start">
      <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black w-full">
        {label} {required && <span className="text-[#fd3939]">*</span>}
        {optional && <span className="text-[#a29e9e]">(opcional)</span>}
      </p>
      {children}
      {error?.message && (
        <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939]">
          {error.message}
        </p>
      )}
    </div>
  );
}

export function SectionHeading({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black w-full">
        {children}
        {optional && <span className="text-[#a29e9e]"> (opcional)</span>}
      </p>
      <div className="h-px w-full bg-[#dbdbdb]" />
    </div>
  );
}

export const inputBaseClass =
  "w-full h-[44px] bg-white rounded-[12px] border-2 px-[16px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors";

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }
>(({ hasError, className, ...props }, ref) => (
  <input
    ref={ref}
    type={props.type ?? "text"}
    {...props}
    className={`${inputBaseClass} ${
      hasError ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
    } ${className ?? ""}`}
  />
));
TextInput.displayName = "TextInput";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }
>(({ hasError, className, ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`w-full h-[96px] bg-white rounded-[12px] border-2 px-[16px] py-[14px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors resize-none ${
      hasError ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
    } ${className ?? ""}`}
  />
));
Textarea.displayName = "Textarea";

export function ChipGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-[8px]">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(active ? "" : opt)}
            className={`h-[36px] px-[14px] rounded-full border-2 font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] transition-colors cursor-pointer ${
              active
                ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
