import svgPaths from "./svg-ifwz00yaeh";
import imgEllipse1 from "figma:asset/860a91f8be758fc5448baa362fe056cb97a0e18d.png";

function Row() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] relative size-full">
          <p className="font-['Confiteria_Script:Bold',sans-serif] leading-[28.8px] not-italic relative shrink-0 text-[#0055e7] text-[48px] tracking-[0.96px] whitespace-nowrap">o</p>
        </div>
      </div>
    </div>
  );
}

function MenuTop() {
  return (
    <div className="relative shrink-0 w-full" data-name="Menu Top">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <Row />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p267fc080} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <Frame />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#317dff] text-[14px]">Início</p>
    </div>
  );
}

function NavLink() {
  return (
    <div className="bg-[#ebf2ff] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.pc8bd280} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <Frame1 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#737185] text-[14px]">Pacientes</p>
    </div>
  );
}

function NavLink1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p29425600} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <Frame2 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#737185] text-[14px]">Agenda</p>
    </div>
  );
}

function NavLink2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p67b1a00} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <Frame3 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#737185] text-[14px]">Financeiro</p>
    </div>
  );
}

function NavLink3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function MenuList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Menu List">
      <NavLink />
      <NavLink1 />
      <NavLink2 />
      <NavLink3 />
    </div>
  );
}

function MenuWrapper() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Menu Wrapper">
      <div className="content-stretch flex flex-col items-start pt-[32px] px-[16px] relative size-full">
        <MenuList />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p552c480} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <Frame4 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#737185] text-[14px]">Suporte</p>
    </div>
  );
}

function NavLink4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p1976bb40} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <Frame5 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#737185] text-[14px]">Configurações</p>
    </div>
  );
}

function NavLink5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <NavLink4 />
      <NavLink5 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Divider" stroke="var(--stroke-0, #E6E6E1)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame46 />
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Divider" stroke="var(--stroke-0, #E6E6E1)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AvatarContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-h-px min-w-px relative text-[14px]" data-name="Avatar Content">
      <p className="font-['Geist:Medium',sans-serif] font-medium relative shrink-0 text-black w-full">Mariana Lopes</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#737185] w-full">marianalopespsi@gmail.com</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative" data-name="Profile">
      <div className="relative shrink-0 size-[32px]">
        <img alt="" className="absolute block max-w-none size-full" height="32" src={imgEllipse1} width="32" />
      </div>
      <AvatarContent />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative shrink-0" data-name="Action">
      <Frame6 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Row">
      <Profile />
      <Action />
    </div>
  );
}

function MenuBottom() {
  return (
    <div className="relative shrink-0 w-full" data-name="Menu Bottom">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] px-[16px] relative w-full">
        <Frame53 />
        <Row1 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white h-[911px] left-0 top-0 w-[312px]" data-name="Sidebar / 3 /">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <MenuTop />
        <MenuWrapper />
        <MenuBottom />
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[38.4px] relative shrink-0 text-[#111827] text-[32px] tracking-[-0.75px] w-full">Olá, Mariana 👋</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[19.2px] relative shrink-0 text-[#6b7280] text-[16px] w-full">Quinta-feira, 18 de Dezembro de 2025</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p25cf7300} fill="var(--fill-0, #7D7D7D)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TasksConclued() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[12px] py-[9px] relative rounded-[8px] shrink-0 w-[191px]" data-name="tasks conclued">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Frame7 />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Selecione o período</p>
    </div>
  );
}

function Titles() {
  return (
    <div className="content-stretch flex gap-[4px] items-end justify-end relative shrink-0 w-full" data-name="titles">
      <Frame47 />
      <TasksConclued />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-h-px min-w-px relative">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px] whitespace-nowrap">28</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame39 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] w-full">Pacientes em acompanhamento</p>
      <Frame30 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="content">
      <Frame31 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">pacientes ativos no momento</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p16d6a180} fill="var(--fill-0, #2563EB)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#ebf2ff] content-stretch flex items-start p-[8px] relative rounded-[6px] shrink-0" data-name="Icon">
      <Frame8 />
    </div>
  );
}

function StatusPatient() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="status-patient">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[8px] items-start p-[24px] relative w-full">
        <Content7 />
        <Icon />
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex items-end relative shrink-0">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px] whitespace-nowrap">9</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame40 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] w-full">Sessões agendadas</p>
      <Frame33 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="content">
      <Frame32 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">sessões futuras</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p43a0080} fill="var(--fill-0, #8E51FF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="bg-[#f3e7fe] content-stretch flex items-start p-[8px] relative rounded-[6px] shrink-0" data-name="Icon">
      <Frame9 />
    </div>
  );
}

function StatusSessions() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="status-sessions">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[8px] items-start p-[24px] relative w-full">
        <Content8 />
        <Icon1 />
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 whitespace-nowrap">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px]">42</p>
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[14.4px] opacity-0 relative shrink-0 text-[#9a9a9a] text-[12px]">este mês</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame41 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Sessões realizadas</p>
      <Frame35 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="content">
      <Frame34 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">atendimentos concluídos</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p1466a080} fill="var(--fill-0, #05DF72)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="bg-[rgba(0,153,102,0.1)] content-stretch flex items-start p-[8px] relative rounded-[6px] shrink-0" data-name="Icon">
      <Frame10 />
    </div>
  );
}

function StatusSessionsConclued() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="status-sessions-conclued">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[8px] items-start p-[24px] relative w-full">
        <Content9 />
        <Icon2 />
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0 whitespace-nowrap">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px]">4</p>
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[14.4px] opacity-0 relative shrink-0 text-[#9a9a9a] text-[12px]">este mês</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame42 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Sessões remarcadas</p>
      <Frame37 />
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="content">
      <Frame36 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">sessões reagendadas</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.pd712180} fill="var(--fill-0, #E7000B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="bg-[rgba(231,0,11,0.1)] content-stretch flex items-start p-[8px] relative rounded-[6px] shrink-0" data-name="Icon">
      <Frame11 />
    </div>
  );
}

function StatusCanceledSessions() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="status-canceled-sessions">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[8px] items-start p-[24px] relative w-full">
        <Content10 />
        <Icon3 />
      </div>
    </div>
  );
}

function Status() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="status">
      <StatusPatient />
      <StatusSessions />
      <StatusSessionsConclued />
      <StatusCanceledSessions />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p311f5400} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[16px] text-black w-full">Próximos atendimentos</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">Veja quem você atende a seguir</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-start min-h-px min-w-px relative">
      <Frame12 />
      <Frame38 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame43 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[#317dff] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[33554400px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[14px] text-center text-white">
            <p className="leading-[20px]">RC</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <Overlay />
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.p2d2f6100} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame14 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">Hoje às 10h</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656972] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">•</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.pdac3800} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame15 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">Google Meet</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[208px]" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[16px] w-full">
        <p className="leading-[19.2px]">Roberto Costa</p>
      </div>
      <Container2 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[#317dff] relative rounded-[8px] shrink-0" data-name="Overlay+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
          <p className="leading-[16px]">Primeira sessão</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(159,95,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <OverlayBorder />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <Container6 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p1c5a2600} fill="var(--fill-0, #6C7E9B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Action1() {
  return (
    <div className="bg-[rgba(80,144,255,0.2)] content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Action">
      <Frame16 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative">
        <Frame45 />
        <Action1 />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#ebf2ff] relative rounded-[8px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden="true" className="absolute border border-[#ebf2ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-[20px] relative w-full">
          <Frame44 />
          <Frame50 />
        </div>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[#ebf2ff] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[96px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">JO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <Overlay1 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.p2d2f6100} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame18 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">Amanhã às 16h</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656972] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">•</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.pdac3800} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame19 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">Google Meet</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[231px]" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[16px] w-full">
        <p className="leading-[19.2px]">João Oliveira</p>
      </div>
      <Container9 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[#ebf2ff] relative rounded-[8px] shrink-0" data-name="Overlay+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#317dff] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]">Retorno</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(49,125,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p1c5a2600} fill="var(--fill-0, #8495B2)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Action2() {
  return (
    <div className="bg-[#eff5ff] content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Action">
      <Frame20 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <OverlayBorder1 />
        <Action2 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-[20px] relative w-full">
          <Frame49 />
          <Frame51 />
        </div>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[#ebf2ff] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[33554400px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">JO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <Overlay2 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.p2d2f6100} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame22 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">22 de Dez às 11h</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656972] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">•</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.pdac3800} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame23 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">Google Meet</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[240px]" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[16px] w-full">
        <p className="leading-[19.2px]">João Oliveira</p>
      </div>
      <Container15 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function OverlayBorder2() {
  return (
    <div className="bg-[#ebf2ff] relative rounded-[8px] shrink-0" data-name="Overlay+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#317dff] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]">Retorno</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(49,125,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p1c5a2600} fill="var(--fill-0, #8495B2)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Action3() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Action">
      <Frame24 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <OverlayBorder2 />
        <Action3 />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-[20px] relative w-full">
          <Frame52 />
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[#ebf2ff] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[33554400px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start justify-center overflow-clip relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <Overlay3 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.p2d2f6100} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame26 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">25 de Dez às 10h</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#656972] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">•</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Frame">
          <path d={svgPaths.pdac3800} fill="var(--fill-0, #656972)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <Frame27 />
      <div className="flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#656972] text-[14px] whitespace-nowrap">
        <p className="leading-[16.8px]">Google Meet</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[245px]" data-name="Container">
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1c1c1c] text-[16px] w-full">
        <p className="leading-[19.2px]">Paula Monteiro</p>
      </div>
      <Container21 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function OverlayBorder3() {
  return (
    <div className="bg-[#fff5e6] relative rounded-[8px] shrink-0" data-name="Overlay+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#f5a14b] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]">Remarcado</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(254,154,0,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p1c5a2600} fill="var(--fill-0, #8495B2)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Action4() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Action">
      <Frame28 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <OverlayBorder3 />
        <Action4 />
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-[20px] relative w-full">
          <Frame55 />
          <Frame56 />
        </div>
      </div>
    </div>
  );
}

function ProdutividadePainel() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[12px]" data-name="produtividade painel">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center pb-[48px] pt-[24px] px-[24px] relative w-full">
          <Frame48 />
          <Frame13 />
          <Frame17 />
          <Frame21 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.p27b3b400} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Texts() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="texts">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[16px] text-black w-full">Atendimentos na semana</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">Quantidade de sessões por dia</p>
    </div>
  );
}

function IconTitleSubtitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="icon-title-subtitle">
      <Icon4 />
      <Texts />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[2.15%_1.23%_15.02%_1.23%]" data-name="Group">
      <div className="absolute inset-[-0.17%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 632.009 302.931">
          <g id="Group">
            <path d="M0 302.431H632.009" id="Vector" stroke="var(--stroke-0, #E5E5E5)" strokeOpacity="0.5" strokeWidth="0.999463" />
            <path d="M0 226.948H632.009" id="Vector_2" stroke="var(--stroke-0, #E5E5E5)" strokeOpacity="0.5" strokeWidth="0.999463" />
            <path d="M0 151.466H632.009" id="Vector_3" stroke="var(--stroke-0, #E5E5E5)" strokeOpacity="0.5" strokeWidth="0.999463" />
            <path d="M0 75.9827H632.009" id="Vector_4" stroke="var(--stroke-0, #E5E5E5)" strokeOpacity="0.5" strokeWidth="0.999463" />
            <path d="M0 0.499732H632.009" id="Vector_5" stroke="var(--stroke-0, #E5E5E5)" strokeOpacity="0.5" strokeWidth="0.999463" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[2.15%_1.23%_15.02%_1.23%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[90.35%_88.1%_2.78%_6.83%]" data-name="Group">
      <p className="absolute font-['Geist:Regular',sans-serif] font-normal inset-[90.35%_88.1%_2.78%_6.83%] leading-[normal] text-[#737373] text-[11.994px] text-center">Seg</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[90.35%_71.85%_2.78%_23.08%]" data-name="Group">
      <p className="absolute font-['Geist:Regular',sans-serif] font-normal inset-[90.35%_71.85%_2.78%_23.08%] leading-[normal] text-[#737373] text-[11.994px] text-center">Ter</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[90.35%_55.71%_2.78%_38.98%]" data-name="Group">
      <p className="absolute font-['Geist:Regular',sans-serif] font-normal inset-[90.35%_55.71%_2.78%_38.98%] leading-[normal] text-[#737373] text-[11.994px] text-center">Qua</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[90.35%_39.7%_2.78%_55.47%]" data-name="Group">
      <p className="absolute font-['Geist:Regular',sans-serif] font-normal inset-[90.35%_39.7%_2.78%_55.47%] leading-[normal] text-[#737373] text-[11.994px] text-center">Qui</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[90.35%_22.96%_2.78%_71.24%]" data-name="Group">
      <p className="absolute font-['Geist:Regular',sans-serif] font-normal inset-[90.35%_22.96%_2.78%_71.24%] leading-[normal] text-[#737373] text-[11.994px] text-center">Sex</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[90.35%_6.94%_2.78%_87.74%]" data-name="Group">
      <p className="absolute font-['Geist:Regular',sans-serif] font-normal inset-[90.35%_6.94%_2.78%_87.74%] leading-[normal] text-[#737373] text-[11.994px] text-center">Sab</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[90.35%_6.94%_2.78%_6.83%]" data-name="Group">
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[90.35%_6.94%_2.78%_6.83%]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[36.83%_84.35%_15.02%_2.86%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.912 175.498">
        <g id="Group">
          <path d={svgPaths.p168ab500} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[6.03%_68.09%_15.02%_19.11%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.912 287.778">
        <g id="Group">
          <path d={svgPaths.p3520ea00} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[23.63%_51.83%_15.02%_35.37%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.912 223.618">
        <g id="Group">
          <path d={svgPaths.p10e9f00} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute inset-[66.08%_35.58%_15.02%_51.63%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.912 68.8766">
        <g id="Group">
          <path d={svgPaths.p173be380} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[30.88%_19.32%_15.02%_67.88%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.912 197.199">
        <g id="Group">
          <path d={svgPaths.p3e64dd00} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute inset-[29.58%_3.07%_15.02%_84.14%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.912 201.917">
        <g id="Group">
          <path d={svgPaths.p186f2400} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[6.03%_3.07%_15.02%_2.86%]" data-name="Group">
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
      <Group17 />
      <Group18 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[6.03%_3.07%_15.02%_2.86%]" data-name="Group">
      <Group12 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[6.03%_3.07%_15.02%_2.86%]" data-name="Group">
      <Group11 />
    </div>
  );
}

function Application() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Application">
      <Group />
      <Group2 />
      <Group10 />
    </div>
  );
}

function Container26() {
  return (
    <div className="aspect-[414/232.8800048828125] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Application />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container26 />
    </div>
  );
}

function AtendimentosNaSemana() {
  return (
    <div className="bg-white relative rounded-[12px] self-stretch shrink-0 w-[696px]" data-name="atendimentos-na-semana">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center pb-[48px] pt-[24px] px-[24px] relative size-full">
          <IconTitleSubtitle />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function ContentOverview() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="content overview">
      <ProdutividadePainel />
      <AtendimentosNaSemana />
    </div>
  );
}

function Content6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[312px] p-[32px] top-[64px] w-[1608px]" data-name="content">
      <Titles />
      <Status />
      <ContentOverview />
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p183ed280} fill="var(--fill-0, #4D4C57)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Action5() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative shrink-0" data-name="Action">
      <Frame29 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[32px] relative w-full">
          <Action5 />
        </div>
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <div className="absolute bg-white h-[64px] right-0 top-0 w-[1608px]" data-name="Topbar / 4 /">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Container27 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function DashboardInicialExemploComDados() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard inicial - exemplo com dados">
      <Sidebar />
      <Content6 />
      <Topbar />
    </div>
  );
}