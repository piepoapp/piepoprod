import svgPaths from "./svg-20u79vinly";

function Frame3() {
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
      <Frame3 />
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

function Frame() {
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
          <Frame />
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

function Frame5() {
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

function Frame6() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Input7 />
      <Input9 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame6 />
    </div>
  );
}

function Field1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame5 />
      <Frame4 />
    </div>
  );
}

function Frame7() {
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

function Frame1() {
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
          <Frame1 />
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

function Frame9() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Input11 />
      <Input13 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Field2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame10() {
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

function Frame12() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Input15 />
      <Input17 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame12 />
    </div>
  );
}

function Field3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame10 />
      <Frame11 />
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

function Frame2() {
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
          <Frame2 />
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

export default function FormArea() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[32px] items-start overflow-clip px-[24px] py-[32px] relative rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] size-full" data-name="form-area">
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