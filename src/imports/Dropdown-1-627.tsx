import svgPaths from "./svg-wjlfzdiovt";

function Frame() {
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
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="tasks conclued">
      <div aria-hidden="true" className="absolute border-2 border-[#317dff] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[9px] relative size-full">
          <Frame />
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Selecione o período</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#2a99ff] text-[14px]">Ultimas 24h</p>
    </div>
  );
}

function NavLink() {
  return (
    <div className="bg-[#f2f6ff] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#515155] text-[14px]">Últimos 7 dias</p>
    </div>
  );
}

function NavLink1() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#515155] text-[14px]">Últimos 30 dias</p>
    </div>
  );
}

function NavLink2() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#515155] text-[14px]">Últimos 90 dias</p>
    </div>
  );
}

function NavLink3() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[19.2px] min-h-px min-w-px relative text-[#515155] text-[14px]">Últimos 365 dias</p>
    </div>
  );
}

function NavLink4() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Nav Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Table header">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center p-[8px] relative w-full">
          <NavLink />
          <NavLink1 />
          <NavLink2 />
          <NavLink3 />
          <NavLink4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export default function Dropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="dropdown">
      <TasksConclued />
      <TableHeader />
    </div>
  );
}