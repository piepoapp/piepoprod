import svgPaths from "./svg-vr0b1fdaa6";

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 whitespace-nowrap">
      <p className="font-['Geist:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[20px] text-black">{`Saúde & anamnese`}</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#4b5563] text-[14px]">Histórico clínico inicial. Você pode complementar no prontuário após as primeiras sessões</p>
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
      <Frame2 />
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
            <line id="Line 3" stroke="var(--stroke-0, #317DFF)" strokeWidth="3" x2="158" y1="1.5" y2="1.5" />
            <line id="Line 2" stroke="var(--stroke-0, #317DFF)" strokeWidth="3" x1="166" x2="324" y1="1.5" y2="1.5" />
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
    <div className="bg-white h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[14px] relative size-full">
        <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Ex: Ansiedade generalizada, dificuldades no trabalho, episódios de pânico nos últimos 6 meses...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`Motivo da consulta `}</span>
        <span className="leading-[16.8px] text-[#fd3939]">*</span>
      </p>
      <Input1 />
    </div>
  );
}

function Field() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="field">
      <Input />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">Tratamentos anteriores</span>
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

function Input2() {
  return (
    <div className="bg-white h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[14px] relative size-full">
        <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Ex: Psicoterapia com outra profissional em 2021-2022 (TCC). Psiquiatra acompanhando desde 2020...</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Ex: Transtorno de ansiedade generalizada (F41.1), Depressão leve (F32.0)</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">{`Diagnósticos prévios conhecidos `}</span>
        <span className="leading-[16.8px] text-[#a29e9e]">(opcional)</span>
      </p>
      <Input4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Input3 />
    </div>
  );
}

function Field1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame4 />
      <Input2 />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] relative shrink-0 text-[14px] text-black w-full">Uso de medicamentos</p>
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

function Input6() {
  return (
    <div className="bg-white h-[44px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden="true" className="absolute border-2 border-[#efefef] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[14px] relative size-full">
          <p className="flex-[1_0_0] font-['Geist:Medium',sans-serif] font-medium leading-[16.8px] min-w-px relative text-[#737373] text-[14px]">Ex: Escitalopram 10mg 1x/dia, Clonazepam 0,5mg se necessário</p>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Input">
      <p className="font-['Geist:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[14px] text-black w-full">
        <span className="leading-[16.8px]">Medicamentos em uso</span>
        <span className="leading-[16.8px] text-[#a29e9e]">{` (opcional)`}</span>
      </p>
      <Input6 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Input5 />
    </div>
  );
}

function Field2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="field">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function FormArea() {
  return (
    <div className="bg-white relative rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="form-area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pt-[32px] px-[24px] relative size-full">
          <FormHead />
          <ProgressTracker />
          <Field />
          <Field1 />
          <Field2 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative size-[16px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d={svgPaths.pa45e380} fill="var(--fill-0, #65635A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#f5e5f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <Frame />
        </div>
      </div>
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#65635a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Voltar</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#f5e5f6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#65635a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Pular esta etapa</p>
      </div>
    </div>
  );
}

function Frame1() {
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
          <p className="font-['Geist:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#fafafa] text-[14px] text-center whitespace-nowrap">Próximo: Pagamento</p>
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="bg-white relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="buttons">
      <div className="flex flex-row justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-start justify-end px-[24px] py-[32px] relative size-full">
          <Button />
          <Button1 />
          <ButtonSendNf />
        </div>
      </div>
    </div>
  );
}

export default function ModalSaudeAnamnese() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Modal saúde & anamnese">
      <FormArea />
      <Buttons />
    </div>
  );
}