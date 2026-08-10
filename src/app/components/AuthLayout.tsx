import type { ReactNode } from "react";
import { BrandLogo } from "./BrandLogo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-[24px] bg-[#fafafa] font-['Geist',sans-serif] px-[24px]">
      <div className="w-[512px] max-w-full flex flex-col gap-[24px]">
        <div className="flex justify-center">
          <BrandLogo size={44} />
        </div>
        <div className="bg-white rounded-[16px] border border-[#efefef] p-[32px] flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[4px] items-center text-center">
            <h1 className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
              {title}
            </h1>
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#75787d]">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
