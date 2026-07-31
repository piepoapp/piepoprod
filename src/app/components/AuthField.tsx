import { forwardRef, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor={id}
          className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          {...props}
          className={`w-full h-[44px] bg-white rounded-[12px] border-2 px-[16px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors ${
            error ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
          } ${className ?? ""}`}
        />
        {error?.message && (
          <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939]">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
AuthField.displayName = "AuthField";
