import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-[24px] bg-[#fafafa] font-['Geist',sans-serif] px-[24px]">
      <div className="w-[400px] max-w-full flex flex-col gap-[24px]">
        <div className="flex justify-center">
          <p className="font-['Confiteria_Script',sans-serif] font-bold text-[#0055e7] text-[40px] leading-none tracking-[0.96px]">
            o
          </p>
        </div>
        <div className="bg-white rounded-[16px] border border-[#efefef] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.1)] p-[32px] flex flex-col gap-[24px]">
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
