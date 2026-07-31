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

export default function TableHeader() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Table header">
      <div className="content-stretch flex flex-col gap-[4px] items-start justify-center overflow-clip p-[8px] relative rounded-[inherit] size-full">
        <NavLink />
        <NavLink1 />
        <NavLink2 />
        <NavLink3 />
        <NavLink4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}