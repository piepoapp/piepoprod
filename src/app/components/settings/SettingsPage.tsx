import { useSearchParams } from "react-router";
import {
  CalendarBlank,
  CurrencyCircleDollar,
  ShieldCheck,
  UserCircle,
} from "@phosphor-icons/react";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { SkeletonBox, SkeletonLine } from "../skeletons";
import { useSmoothLoading } from "../../hooks/useSmoothLoading";
import { ProfileSection } from "./ProfileSection";
import { AttendanceSection } from "./AttendanceSection";
import { PricingSection } from "./PricingSection";
import { AccountSection } from "./AccountSection";
import { PrivacySection } from "./PrivacySection";

type SectionId = "perfil" | "atendimento" | "valores" | "privacidade";

const sections: {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "bold"; className?: string }>;
}[] = [
  // Ordem por motivo de visita, não por lógica de banco: identidade primeiro
  // como âncora, depois o que mais muda, e o destrutivo por último.
  { id: "perfil", label: "Perfil e conta", icon: UserCircle },
  { id: "atendimento", label: "Atendimento", icon: CalendarBlank },
  { id: "valores", label: "Valores e cobrança", icon: CurrencyCircleDollar },
  { id: "privacidade", label: "Privacidade e dados", icon: ShieldCheck },
];

function isSectionId(value: string | null): value is SectionId {
  return sections.some((s) => s.id === value);
}

export function SettingsPage() {
  const { profileLoading } = useAuth();
  const loading = useSmoothLoading(profileLoading);
  const [searchParams, setSearchParams] = useSearchParams();

  // A seção vive na URL para o voltar do navegador funcionar e o link ser
  // compartilhável — /configuracoes?secao=atendimento.
  const param = searchParams.get("secao");
  const active: SectionId = isSectionId(param) ? param : "perfil";

  function selectSection(id: SectionId) {
    searchParams.set("secao", id);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="flex flex-col p-[32px]">
      {/* 260 (nav) + 24 (gap) + 680 (card) = 964, centralizado na página. */}
      <div className="w-full max-w-[964px] mx-auto flex flex-col lg:flex-row gap-[24px] items-start">
        {/* Navegação de seções */}
        <nav className="w-full lg:w-[260px] shrink-0 bg-white rounded-[12px] border border-[#e6e6e1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-[8px] flex flex-col gap-[2px]">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectSection(s.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-[10px] w-full px-[12px] py-[10px] rounded-[8px] transition-colors cursor-pointer text-left ${
                  isActive ? "bg-[#ebf2ff]" : "hover:bg-[#fafafa]"
                }`}
              >
                <Icon
                  size={18}
                  weight="bold"
                  className={isActive ? "text-[#317dff]" : "text-[#737185]"}
                />
                <span
                  className={`font-['Geist',sans-serif] font-medium text-[14px] leading-[19.2px] truncate ${
                    isActive ? "text-[#317dff]" : "text-[#737185]"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        <main className="flex-1 min-w-0 w-full lg:max-w-[680px] flex flex-col gap-[16px]">
          {loading ? (
            <SectionSkeleton />
          ) : (
            <>
              {/* Perfil e senha ficam na mesma seção, mas em cards separados:
                  um grava em profiles, o outro no Supabase Auth, com erros e
                  confirmações próprios. */}
              {active === "perfil" && (
                <>
                  <ProfileSection />
                  <AccountSection />
                </>
              )}
              {active === "atendimento" && <AttendanceSection />}
              {active === "valores" && <PricingSection />}
              {active === "privacidade" && <PrivacySection />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="w-full bg-white rounded-[12px] border border-[#e6e6e1] px-[24px] py-[24px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[6px]">
        <SkeletonLine w={200} h={20} />
        <SkeletonLine w={320} h={14} />
      </div>
      <SkeletonBox w="100%" h={44} radius={12} />
      <SkeletonBox w="100%" h={44} radius={12} />
      <SkeletonBox w="100%" h={44} radius={12} />
    </div>
  );
}
