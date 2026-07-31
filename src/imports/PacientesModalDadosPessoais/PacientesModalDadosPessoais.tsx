import svgPaths from "./svg-55jbyvhzk5";
import imgEllipse1 from "./860a91f8be758fc5448baa362fe056cb97a0e18d.png";
import imgEllipse2 from "./860a91f8be758fc5448baa362fe056cb97a0e18d.png";

function OverlayBorder() {
  return (
    <div className="bg-[#ebf2ff] relative rounded-[8px] shrink-0" data-name="Overlay+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#317dff] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]">11</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(49,125,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Geist:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#0d0d0d] text-[20px] whitespace-nowrap">Pacientes</p>
      <OverlayBorder />
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Column">
      <div className="relative shrink-0 size-[32px]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="32" src={imgEllipse1} width="32" />
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <div className="absolute bg-white h-[64px] right-0 top-0 w-[1608px]" data-name="Topbar / 4 /">
      <div className="content-stretch flex items-center justify-between overflow-clip px-[40px] relative rounded-[inherit] size-full">
        <Frame51 />
        <Column />
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function MagnifyingGlassBold() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="magnifying-glass-bold (1) 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="magnifying-glass-bold (1) 1">
          <path d={svgPaths.p183baf00} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center px-[12px] py-[16px] relative rounded-[8px] shrink-0 w-[350px]" data-name="search-bar">
      <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <MagnifyingGlassBold />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] whitespace-nowrap">Buscar por nome, email ou telefone...</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p31365e00} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TasksConclued() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[9px] relative rounded-[8px] shrink-0" data-name="tasks conclued">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] whitespace-nowrap">Filtrar por</p>
      <Frame />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <SearchBar />
      <TasksConclued />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p24c89a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TasksConclued1() {
  return (
    <div className="bg-[#317dff] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[12px] py-[9px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="tasks conclued">
      <Frame1 />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-white w-[99px]">Novo Paciente</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <TasksConclued1 />
    </div>
  );
}

function SearchFilter() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="search&filter">
      <Frame64 />
      <Frame54 />
    </div>
  );
}

function Container() {
  return <div className="bg-[#317dff] rounded-[33554400px] shrink-0 size-[8px]" data-name="Container" />;
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Container />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Total</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-w-px relative">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px] whitespace-nowrap">11</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame46 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame56 />
      <Frame38 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="content">
      <Frame39 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">pacientes cadastrados</p>
    </div>
  );
}

function StatusPatient() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-patient">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <Content1 />
      </div>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[8px]" data-name="Container" />;
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Container1 />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Ativos</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-w-px relative">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px] whitespace-nowrap">8</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame47 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame57 />
      <Frame41 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="content">
      <Frame40 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">em acompanhamento</p>
    </div>
  );
}

function StatusPatient1() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-patient">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <Content2 />
      </div>
    </div>
  );
}

function Container2() {
  return <div className="bg-[#f5a14b] rounded-[33554400px] shrink-0 size-[8px]" data-name="Container" />;
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Container2 />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Pausados</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-w-px relative">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px] whitespace-nowrap">2</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame48 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame58 />
      <Frame43 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="content">
      <Frame42 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">temporariamente</p>
    </div>
  );
}

function StatusPatient2() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-patient">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <Content3 />
      </div>
    </div>
  );
}

function Container3() {
  return <div className="bg-[#e7000b] rounded-[33554400px] shrink-0 size-[8px]" data-name="Container" />;
}

function Frame59() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Container3 />
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Inativos</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-w-px relative">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#111827] text-[32px] whitespace-nowrap">1</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame49 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame59 />
      <Frame45 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="content">
      <Frame44 />
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#939393] text-[14px] w-full">sem sessões</p>
    </div>
  );
}

function StatusPatient3() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-patient">
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[24px] relative size-full">
        <Content4 />
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <StatusPatient />
      <StatusPatient1 />
      <StatusPatient2 />
      <StatusPatient3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3ae02a80} fill="var(--fill-0, #363636)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative rounded-tl-[8px] shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[24px] py-[10px] relative size-full">
          <Frame2 />
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap">Paciente</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none rounded-tl-[8px]" />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame52 />
        </div>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay1 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame53 />
        </div>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay2 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame60 />
        </div>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay3 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame61 />
        </div>
      </div>
    </div>
  );
}

function Overlay4() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay4 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame62 />
        </div>
      </div>
    </div>
  );
}

function Overlay5() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay5 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame63 />
        </div>
      </div>
    </div>
  );
}

function Overlay6() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay6 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame65 />
        </div>
      </div>
    </div>
  );
}

function Overlay7() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay7 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame66 />
        </div>
      </div>
    </div>
  );
}

function Overlay8() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay8 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame67 />
        </div>
      </div>
    </div>
  );
}

function Overlay9() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay9 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame68 />
        </div>
      </div>
    </div>
  );
}

function Overlay10() {
  return (
    <div className="bg-[#ebf2ff] h-full relative rounded-[96px] shrink-0 w-[40px]" data-name="Overlay">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[10.5px] pt-[9.5px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] min-w-px relative text-[#317dff] text-[14px] text-center">
            <p className="leading-[20px]">DL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Overlay10 />
      </div>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Denilson de Araujo Lopes</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[24px] relative size-full">
          <Frame69 />
        </div>
      </div>
    </div>
  );
}

function TableColumn() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[417px]" data-name="Table column">
      <TableHeader />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p1b02ef80} fill="var(--fill-0, #363636)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative size-full">
          <Frame3 />
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap">Contato</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">+55 75 99207-5053</p>
        </div>
      </div>
    </div>
  );
}

function TableColumn1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[215px]" data-name="Table column">
      <TableHeader1 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[24px] py-[10px] relative size-full">
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap">Plano ou frequência</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Semanal</p>
        </div>
      </div>
    </div>
  );
}

function TableColumn2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[192px]" data-name="Table column">
      <TableHeader2 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p2607de00} fill="var(--fill-0, #363636)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative size-full">
          <Frame4 />
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap">Data de início</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TableCell33() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Desde ago de 2024</p>
        </div>
      </div>
    </div>
  );
}

function TableColumn3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[215px]" data-name="Table column">
      <TableHeader3 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[10px] relative size-full">
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap">Modalidade</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame5 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame6 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame7 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame8 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell48() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame9 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell49() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame10 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame11 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame12 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame13 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame14 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p3b652800} fill="var(--fill-0, #939393)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[24px] relative size-full">
          <Frame15 />
          <p className="font-['Geist:Regular',sans-serif] font-normal leading-[16.8px] overflow-hidden relative shrink-0 text-[#575757] text-[14px] text-ellipsis whitespace-nowrap">Online</p>
        </div>
      </div>
    </div>
  );
}

function TableColumn4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[192px]" data-name="Table column">
      <TableHeader4 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
      <TableCell54 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p31fbdc00} fill="var(--fill-0, #363636)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableHeader5() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative size-full">
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap">Status</p>
          <Frame16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container5() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container5 />
      <Text />
    </div>
  );
}

function TableCell55() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container7 />
      <Text1 />
    </div>
  );
}

function TableCell56() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container9 />
      <Text2 />
    </div>
  );
}

function TableCell57() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container11 />
      <Text3 />
    </div>
  );
}

function TableCell58() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container13 />
      <Text4 />
    </div>
  );
}

function TableCell59() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container15 />
      <Text5 />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container17 />
      <Text6 />
    </div>
  );
}

function TableCell61() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return <div className="bg-[#05df72] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#037a48] text-[12px] top-0 whitespace-nowrap">Ativo</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[60.766px]" data-name="Container">
      <Container19 />
      <Text7 />
    </div>
  );
}

function TableCell62() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return <div className="bg-[#e7000b] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#b42318] text-[12px] top-0 whitespace-nowrap">Inativo</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#fef3f2] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[70.125px]" data-name="Container">
      <Container21 />
      <Text8 />
    </div>
  );
}

function TableCell63() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return <div className="bg-[#f5a14b] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#b54708] text-[12px] top-0 whitespace-nowrap">Pausado</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#fff6da] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[80.625px]" data-name="Container">
      <Container23 />
      <Text9 />
    </div>
  );
}

function TableCell64() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return <div className="bg-[#f5a14b] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text10() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Geist:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#b54708] text-[12px] top-0 whitespace-nowrap">Pausado</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#fff6da] content-stretch flex gap-[6px] h-[24px] items-center px-[10px] relative rounded-[33554400px] shrink-0 w-[80.625px]" data-name="Container">
      <Container25 />
      <Text10 />
    </div>
  );
}

function TableCell65() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function TableColumn5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[215px]" data-name="Table column">
      <TableHeader5 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell60 />
      <TableCell61 />
      <TableCell62 />
      <TableCell63 />
      <TableCell64 />
      <TableCell65 />
    </div>
  );
}

function TableHeader6() {
  return (
    <div className="bg-[#f9fafb] h-[56px] relative shrink-0 w-full" data-name="Table header">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell66() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell67() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell69() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell70() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell71() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell72() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell73() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell74() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell75() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p37524800} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TableCell76() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function TableColumn6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative self-stretch" data-name="Table column">
      <TableHeader6 />
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
      <TableCell71 />
      <TableCell72 />
      <TableCell73 />
      <TableCell74 />
      <TableCell75 />
      <TableCell76 />
    </div>
  );
}

function TableContainer() {
  return (
    <div className="h-[760px] relative rounded-[8px] shrink-0 w-full" data-name="Table container">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <TableColumn />
        <TableColumn1 />
        <TableColumn2 />
        <TableColumn3 />
        <TableColumn4 />
        <TableColumn5 />
        <TableColumn6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e6e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[312px] pb-[40px] pt-[24px] px-[40px] top-[64px] w-[1608px]" data-name="content">
      <SearchFilter />
      <Frame55 />
      <TableContainer />
    </div>
  );
}

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
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Row />
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p267fc080} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <Frame28 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-w-px relative text-[#737185] text-[14px]">Início</p>
    </div>
  );
}

function NavLink() {
  return (
    <div className="h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p29425600} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <Frame29 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-w-px relative text-[#737185] text-[14px]">Agenda</p>
    </div>
  );
}

function NavLink1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content6 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.pc8bd280} fill="var(--fill-0, #317DFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <Frame30 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-w-px relative text-[#317dff] text-[14px]">Pacientes</p>
    </div>
  );
}

function NavLink2() {
  return (
    <div className="bg-[#ebf2ff] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p1976bb40} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <Frame31 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-w-px relative text-[#737185] text-[14px]">Configurações</p>
    </div>
  );
}

function NavLink3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function MenuList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="Menu List">
      <NavLink />
      <NavLink1 />
      <NavLink2 />
      <NavLink3 />
    </div>
  );
}

function MenuWrapper() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Menu Wrapper">
      <div className="content-stretch flex flex-col items-start pt-[32px] px-[16px] relative size-full">
        <MenuList />
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame">
          <path d={svgPaths.p552c480} fill="var(--fill-0, #737185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Content">
      <Frame32 />
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-w-px relative text-[#737185] text-[14px]">Suporte</p>
    </div>
  );
}

function NavLink4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <NavLink4 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
            <line id="Divider" stroke="var(--stroke-0, #E6E6E1)" x2="280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame50 />
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
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px relative text-[14px]" data-name="Avatar Content">
      <p className="font-['Geist:Medium',sans-serif] font-medium relative shrink-0 text-black w-full">Mariana Lopes</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#737185] w-full">marianalopespsi@gmail.com</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-w-px relative" data-name="Profile">
      <div className="relative shrink-0 size-[32px]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="32" src={imgEllipse2} width="32" />
      </div>
      <AvatarContent />
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
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
      <Frame33 />
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
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] px-[16px] relative size-full">
        <Frame70 />
        <Row1 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white h-[911px] left-0 top-0 w-[312px]" data-name="sidebar">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <MenuTop />
        <MenuWrapper />
        <MenuBottom />
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e1] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 whitespace-nowrap">
      <p className="font-['Geist:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[20px] text-black">Dados pessoais</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#4b5563] text-[14px]">Informações de identificação e contato do paciente</p>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #75787D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #75787D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function FormHead() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="form-head">
      <Frame37 />
      <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Button - Fechar">
        <Svg />
      </div>
    </div>
  );
}

function ProgressTracker() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="progress-tracker">
      <div className="absolute inset-[-3px_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 656 3">
          <g id="progress-tracker">
            <line id="Line 2" stroke="var(--stroke-0, #317DFF)" strokeWidth="3" x2="158" y1="1.5" y2="1.5" />
            <line id="Line 3" stroke="var(--stroke-0, #E2E0D8)" strokeWidth="3" x1="166" x2="324" y1="1.5" y2="1.5" />
            <line id="Line 4" stroke="var(--stroke-0, #E2E0D8)" strokeWidth="3" x1="332" x2="490" y1="1.5" y2="1.5" />
            <line id="Line 5" stroke="var(--stroke-0, #E2E0D8)" strokeWidth="3" x1="498" x2="656" y1="1.5" y2="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Nome do paciente</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`Nome completo `}</span>
        <span className="leading-[16.8px] text-[#fd3939]">*</span>
      </p>
      <Input1 />
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">dd/mm/aaaa</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`Data de nascimento `}</span>
        <span className="leading-[16.8px] text-[#fd3939]">*</span>
      </p>
      <Input4 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p31365e00} fill="var(--fill-0, #949494)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Selecione</p>
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`Sexo `}</span>
        <span className="leading-[16.8px] text-[#fd3939]">*</span>
      </p>
      <Input6 />
    </div>
  );
}

function Input2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="input">
      <Input3 />
      <Input5 />
    </div>
  );
}

function Field() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Input />
      <Input2 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-black w-full">Contato</p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 656 1">
            <line id="Line 1" stroke="var(--stroke-0, #DBDBDB)" x2="656" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">000.000.000-00</p>
        </div>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`WhatsApp / Celular `}</span>
        <span className="leading-[16.8px] text-[#fd3939]">*</span>
      </p>
      <Input8 />
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Insira o e-mail</p>
        </div>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`E-mail `}</span>
        <span className="leading-[16.8px] text-[#a29e9e]">(opcional)</span>
      </p>
      <Input10 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Input7 />
      <Input9 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame73 />
    </div>
  );
}

function Field1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame71 />
      <Frame72 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">Endereço</span>
        <span className="leading-[16.8px] text-[#a29e9e]">{` (opcional)`}</span>
      </p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 656 1">
            <line id="Line 1" stroke="var(--stroke-0, #DBDBDB)" x2="656" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">000.000.000-00</p>
        </div>
      </div>
    </div>
  );
}

function Input11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-black w-full">CEP</p>
      <Input12 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.p31365e00} fill="var(--fill-0, #949494)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Input14() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Selecione</p>
          <Frame35 />
        </div>
      </div>
    </div>
  );
}

function Input13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-black w-full">Cidade / Estado</p>
      <Input14 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Input11 />
      <Input13 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame76 />
    </div>
  );
}

function Field2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame74 />
      <Frame75 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`Contato de emergência `}</span>
        <span className="leading-[16.8px] text-[#a29e9e]">(opcional)</span>
      </p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 656 1">
            <line id="Line 1" stroke="var(--stroke-0, #DBDBDB)" x2="656" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Input16() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Nome</p>
        </div>
      </div>
    </div>
  );
}

function Input15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-black w-full">{`Nome & relação`}</p>
      <Input16 />
    </div>
  );
}

function Input18() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">(00) 0000-0000</p>
        </div>
      </div>
    </div>
  );
}

function Input17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-black w-full">Telefone</p>
      <Input18 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Input15 />
      <Input17 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame79 />
    </div>
  );
}

function Field3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame77 />
      <Frame78 />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[17px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#f5e5f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#65635a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Cancelar</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.pa45e380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonSendNf() {
  return (
    <div className="bg-[#317dff] flex-[1_0_0] h-[40px] min-w-px relative rounded-[8px]" data-name="button-send-nf">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[16px] relative size-full">
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#fafafa] text-[14px] text-center whitespace-nowrap">{`Próximo: Saúde & anamnese`}</p>
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-full" data-name="buttons">
      <Button />
      <ButtonSendNf />
    </div>
  );
}

function FormArea() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col gap-[32px] items-start left-1/2 overflow-clip px-[24px] py-[32px] rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] top-1/2 w-[704px]" data-name="form-area">
      <FormHead />
      <ProgressTracker />
      <Field />
      <Field1 />
      <Field2 />
      <Field3 />
      <Buttons />
    </div>
  );
}

export default function PacientesModalDadosPessoais() {
  return (
    <div className="bg-white relative size-full" data-name="Pacientes: Modal - Dados pessoais">
      <Topbar />
      <Content />
      <Sidebar />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,0,0,0.25)] h-[1169px] left-1/2 top-1/2 w-[1920px]" data-name="background-opacity" />
      <FormArea />
    </div>
  );
}