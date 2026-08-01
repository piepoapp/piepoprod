import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { Eye, EyeSlash, type IconProps } from "@phosphor-icons/react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  labelExtra?: ReactNode;
  icon?: React.ComponentType<IconProps>;
}

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, error, labelExtra, icon: Icon, className, id, type, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (visible ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black"
          >
            {label}
          </label>
          {labelExtra}
        </div>
        <div className="relative">
          {Icon && (
            <Icon
              size={16}
              weight="bold"
              className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none"
            />
          )}
          <input
            ref={ref}
            id={id}
            type={inputType}
            {...props}
            className={`w-full h-[44px] bg-white rounded-[12px] border-2 py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors ${
              Icon ? "pl-[40px]" : "pl-[16px]"
            } ${isPassword ? "pr-[40px]" : "pr-[16px]"} ${
              error ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
            } ${className ?? ""}`}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setVisible((v) => !v)}
              className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#65635a] transition-colors cursor-pointer"
            >
              {visible ? <EyeSlash size={16} weight="bold" /> : <Eye size={16} weight="bold" />}
            </button>
          )}
        </div>
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
