import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "@phosphor-icons/react";
import { BrandLogo } from "../BrandLogo";

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  body: ReactNode;
}

interface LegalArticleLayoutProps {
  title: string;
  lastUpdated: string;
  notice: ReactNode;
  sections: LegalSection[];
}

export function LegalArticleLayout({ title, lastUpdated, notice, sections }: LegalArticleLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    function syncActive() {
      // Última seção cujo topo já passou da faixa de leitura; no fim da página,
      // a última seção vence mesmo que curta demais para alcançar essa faixa.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        setActiveId(sections[sections.length - 1]?.id);
        return;
      }
      let current = sections[0]?.id;
      for (const section of sections) {
        const el = sectionRefs.current[section.id];
        if (el && el.getBoundingClientRect().top <= 120) current = section.id;
      }
      setActiveId(current);
    }

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [sections]);

  function scrollToSection(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-['Geist',sans-serif]">
      {/* Faixa superior: logo + retorno ao cadastro, presa no topo para navegar mesmo com scroll longo */}
      <div className="sticky top-0 z-10 h-[64px] bg-white border-b border-[#e6e6e1] flex items-center px-[24px] md:px-[40px]">
        <div className="w-full max-w-[1120px] mx-auto flex items-center justify-between">
          <BrandLogo size={26} />
          <Link
            to="/signup"
            className="inline-flex items-center gap-[6px] font-['Geist',sans-serif] font-medium text-[14px] text-[#75787d] hover:text-[#317dff] transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            Voltar para o cadastro
          </Link>
        </div>
      </div>

      <div className="w-full max-w-[1120px] mx-auto px-[24px] md:px-[40px] py-[48px] flex gap-[64px] items-start">
        {/* Conteúdo */}
        <main className="flex-1 min-w-0 max-w-[760px] flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-['Geist',sans-serif] font-semibold text-[32px] leading-[38px] tracking-[-0.75px] text-[#111827]">
              {title}
            </h1>
            <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#939393]">
              Última atualização: <span className="font-medium text-[#65635a]">{lastUpdated}</span>
            </p>
          </div>

          {notice}

          <div className="flex flex-col gap-[28px]">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el;
                }}
                className="scroll-mt-[96px] flex flex-col gap-[12px]"
              >
                <h2 className="font-['Geist',sans-serif] font-semibold text-[24px] leading-[30px] tracking-[-0.5px] text-[#111827]">
                  {section.number}. {section.title}
                </h2>
                <div className="flex flex-col gap-[14px]">{section.body}</div>
              </section>
            ))}
          </div>
        </main>

        {/* Sumário — "Neste artigo" */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-[96px] flex flex-col gap-[12px]">
            <p className="font-['Geist',sans-serif] font-semibold text-[12px] leading-[16px] tracking-[0.5px] text-[#a1a1aa] uppercase">
              Neste artigo
            </p>
            <nav className="flex flex-col">
              {sections.map((section) => {
                const active = section.id === activeId;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left pl-[12px] py-[6px] border-l-2 transition-colors cursor-pointer font-['Geist',sans-serif] text-[14px] leading-[18px] ${
                      active
                        ? "border-[#317dff] text-[#317dff] font-medium"
                        : "border-[#e6e6e1] text-[#75787d] hover:text-[#363636] hover:border-[#c4c4c4] font-normal"
                    }`}
                  >
                    {section.number}. {section.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Parágrafo padrão do corpo do texto legal. */
export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="font-['Geist',sans-serif] font-normal text-[16px] leading-[24px] text-[#374151]">{children}</p>
  );
}

/** Lista com marcador na cor da marca, mesmo texto do corpo. */
export function LegalUl({ children }: { children: ReactNode }) {
  return (
    <ul className="flex flex-col gap-[6px] pl-[20px] list-disc marker:text-[#317dff] font-['Geist',sans-serif] font-normal text-[16px] leading-[24px] text-[#374151]">
      {children}
    </ul>
  );
}

/** Trecho ainda não definido (dado jurídico/comercial pendente) — destacado em amarelo,
 *  no mesmo tom de aviso já usado no restante do app (LGPD banners, etc.). */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline bg-[#fefae8] text-[#8a6a00] px-[6px] py-[1px] rounded-[4px] font-medium">
      [DEFINIR — {children}]
    </span>
  );
}

/** Aviso de que o conteúdo é uma minuta e precisa de revisão jurídica. */
export function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-[10px] w-full bg-[#fefae8] border border-[#f5e7a3] rounded-[10px] px-[16px] py-[14px]">
      <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#8a6a00]">{children}</p>
    </div>
  );
}
