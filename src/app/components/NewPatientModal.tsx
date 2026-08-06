import { forwardRef, useEffect, useState } from "react";
import { useForm, Controller, useWatch, type Control, type FieldError } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { X, ArrowRight, ArrowLeft, Info, Check, CheckCircle, CalendarPlus, FileText } from "@phosphor-icons/react";
import { Combobox } from "./Combobox";
import { brazilStates, fetchCitiesByState } from "../data/brazilStates";
import { useAuth } from "../../lib/auth/AuthProvider";
import { createPatient, type NewPatientFormValues } from "../../lib/api/patients";
import type { Patient } from "../data/mockData";

interface NewPatientModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (patient: Patient) => void;
}

type FormValues = NewPatientFormValues;

const defaultValues: FormValues = {
  nome: "",
  dataNascimento: "",
  sexo: "",
  whatsapp: "",
  email: "",
  cep: "",
  estado: "",
  cidade: "",
  emergenciaNome: "",
  emergenciaTelefone: "",
  motivoConsulta: "",
  tratamentosAnteriores: "",
  diagnosticosPrevios: "",
  medicamentosEmUso: "",
  situacaoProfissional: "",
  comQuemMora: "",
  observacoesClinicas: "",
  modalidadePagamento: "particular",
  valorSessao: "",
  frequenciaPadrao: "1x por semana",
  formaRecebimento: "PIX",
  quandoCobrar: "Antes da sessão",
  politicaCancelamento: "",
  nomePlano: "",
  numeroCarteirinha: "",
  validadePlano: "",
  coparticipacao: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Step = 1 | 2 | 3 | 4 | 5;

const stepMeta: Record<Exclude<Step, 5>, { title: string; subtitle: string; nextLabel: string }> = {
  1: {
    title: "Dados pessoais",
    subtitle: "Identificação e contato do paciente",
    nextLabel: "Próximo: Saúde & anamnese",
  },
  2: {
    title: "Saúde & anamnese",
    subtitle: "Histórico clínico inicial. Complete no prontuário após as primeiras sessões",
    nextLabel: "Próximo: Pagamento & convênio",
  },
  3: {
    title: "Pagamento & convênio",
    subtitle: "Define como as sessões serão cobradas. Pode ser alterado depois nas configurações do paciente.",
    nextLabel: "Próximo: Termo LGPD",
  },
  4: {
    title: "Termo de consentimento",
    subtitle: "Registro da autorização para coleta e tratamento de dados do paciente conforme a LGPD.",
    nextLabel: "Salvar paciente",
  },
};

const step1Fields = ["nome", "dataNascimento", "sexo", "whatsapp"] as const;

export function NewPatientModal({ open, onClose, onCreated }: NewPatientModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues, mode: "onChange" });

  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>(1);
  const [savedPatient, setSavedPatient] = useState<FormValues | null>(null);
  const [createdPatientId, setCreatedPatientId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [respAccepted, setRespAccepted] = useState(false);
  const [dataConsentimento, setDataConsentimento] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [formaRegistro, setFormaRegistro] = useState("");
  const watched = useWatch({ control });

  const cepValue = useWatch({ control, name: "cep" });

  useEffect(() => {
    const digits = (cepValue ?? "").replace(/\D/g, "");
    if (digits.length !== 8) return;
    let cancelled = false;
    fetch(`https://viacep.com.br/ws/${digits}/json/`)
      .then((r) => r.json())
      .then((data: { uf?: string; localidade?: string; erro?: boolean }) => {
        if (cancelled || data.erro) return;
        if (data.uf) setValue("estado", data.uf, { shouldValidate: true });
        if (data.localidade)
          setValue("cidade", data.localidade, { shouldValidate: true });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [cepValue, setValue]);

  if (!open) return null;

  const handleClose = () => {
    reset(defaultValues);
    setStep(1);
    setLgpdAccepted(false);
    setRespAccepted(false);
    setDataConsentimento(new Date().toISOString().slice(0, 10));
    setFormaRegistro("");
    setSavedPatient(null);
    setCreatedPatientId(null);
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    if (step !== 4 || !lgpdAccepted || !respAccepted || !dataConsentimento || !user) return;
    setSubmitting(true);
    try {
      const patient = await createPatient(
        data,
        { lgpdAccepted, respAccepted, dataConsentimento, formaRegistro },
        user.id,
      );
      setSavedPatient(data);
      setCreatedPatientId(patient.id);
      setStep(5);
      onCreated?.(patient);
      toast.success("Paciente cadastrado com sucesso");
    } catch (err) {
      toast.error("Não foi possível salvar o paciente. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleScheduleSession = () => {
    const patientId = createdPatientId;
    handleClose();
    navigate(patientId ? `/agenda?novoPaciente=${patientId}` : "/agenda");
  };

  const handleOpenProntuario = () => {
    // TODO: apontar para /pacientes/:id/prontuario quando a rota existir
    handleClose();
    navigate("/pacientes");
  };

  const handleNext = async () => {
    if (step === 1) {
      const ok = await trigger(step1Fields as unknown as (keyof FormValues)[]);
      if (ok) setStep(2);
    } else if (step === 2) {
      const ok = await trigger(["motivoConsulta"]);
      if (ok) setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const step1Complete = step1Fields.every((f) => {
    const v = watched[f];
    if (!v) return false;
    if (f === "dataNascimento")
      return /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);
    if (f === "whatsapp") return /^\(\d{2}\) \d{5}-\d{4}$/.test(v);
    return true;
  });
  const step2Complete = true;
  const needsPlano =
    watched.modalidadePagamento === "convenio" ||
    watched.modalidadePagamento === "misto";
  const step3Complete =
    !!watched.modalidadePagamento &&
    (!needsPlano ||
      (!!watched.nomePlano?.trim() &&
        !!watched.numeroCarteirinha?.trim() &&
        !!watched.validadePlano?.trim()));

  const step4Complete = lgpdAccepted && respAccepted && !!dataConsentimento;

  const nextEnabled =
    step === 1 ? step1Complete : step === 2 ? step2Complete : step === 3 ? step3Complete : step4Complete;
  const meta = step === 5 ? null : stepMeta[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[24px]">
      <div className="absolute inset-0 bg-black/30" onClick={handleClose} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] w-[656px] max-w-full max-h-[calc(100vh-48px)] flex flex-col px-[24px] py-[32px] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* form-head */}
        {meta && (
          <div className="flex items-center justify-between w-full mb-[24px] gap-[16px] shrink-0">
            <div className="flex flex-col gap-[8px] items-start min-w-0">
              <p className="font-['Geist',sans-serif] font-medium leading-[24px] text-[20px] text-black whitespace-nowrap">
                {meta.title}
              </p>
              <p className="font-['Geist',sans-serif] font-normal leading-[21px] text-[14px] text-[#4b5563]">
                {meta.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center justify-center rounded-[8px] size-[40px] hover:bg-[#f5f5f5] transition-colors cursor-pointer shrink-0"
            >
              <X size={16} weight="bold" className="text-[#75787d]" />
            </button>
          </div>
        )}

        {/* progress-tracker */}
        {step !== 5 && (
          <div className="w-full flex items-center gap-[8px] mb-[24px] shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-[2px] ${
                  i <= step ? "bg-[#317dff]" : "bg-[#e2e0d8]"
                }`}
              />
            ))}
          </div>
        )}

        <div className={`flex-1 min-h-0 overflow-y-auto -mx-[24px] px-[24px] ${step !== 5 ? "mb-[24px]" : ""} [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa]`}>
        {step === 1 && (
          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
              <InputField label="Nome completo" required error={errors.nome}>
                <TextInput
                  placeholder="Nome do paciente"
                  hasError={!!errors.nome}
                  {...register("nome", {
                    required: "Informe o nome completo",
                    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                  })}
                />
              </InputField>
              <div className="flex gap-[16px] w-full">
                <InputField label="Data de nascimento" required error={errors.dataNascimento}>
                  <MaskedInput
                    name="dataNascimento"
                    control={control}
                    mask="00/00/0000"
                    placeholder="dd/mm/aaaa"
                    rules={{
                      required: "Informe a data",
                      pattern: {
                        value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                        message: "Data inválida",
                      },
                    }}
                    hasError={!!errors.dataNascimento}
                  />
                </InputField>
                <InputField label="Sexo" required error={errors.sexo}>
                  <Controller
                    name="sexo"
                    control={control}
                    rules={{ required: "Selecione o sexo" }}
                    render={({ field }) => (
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Selecione"
                        searchable={false}
                        hasError={!!errors.sexo}
                        options={[
                          { value: "feminino", label: "Feminino" },
                          { value: "masculino", label: "Masculino" },
                          { value: "outro", label: "Outro" },
                          { value: "prefiro_nao_dizer", label: "Prefiro não dizer" },
                        ]}
                      />
                    )}
                  />
                </InputField>
              </div>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading>Contato</SectionHeading>
              <div className="flex gap-[16px] w-full">
                <InputField label="WhatsApp / Celular" required error={errors.whatsapp}>
                  <MaskedInput
                    name="whatsapp"
                    control={control}
                    mask="(00) 00000-0000"
                    placeholder="(00) 00000-0000"
                    rules={{
                      required: "Informe o WhatsApp",
                      pattern: {
                        value: /^\(\d{2}\) \d{5}-\d{4}$/,
                        message: "Telefone inválido",
                      },
                    }}
                    hasError={!!errors.whatsapp}
                  />
                </InputField>
                <InputField label="E-mail" optional error={errors.email}>
                  <TextInput
                    placeholder="Insira o e-mail"
                    type="email"
                    hasError={!!errors.email}
                    {...register("email", {
                      validate: (v) =>
                        !v || emailPattern.test(v) || "E-mail inválido",
                    })}
                  />
                </InputField>
              </div>
              <div className="flex items-start gap-[10px] w-full bg-[#fefae8] border border-[#f5e7a3] rounded-[10px] px-[14px] py-[10px] -mt-[12px]">
                <Info size={16} weight="bold" className="text-[#b38600] shrink-0 mt-[2px]" />
                <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#8a6a00]">
                  O WhatsApp será usado futuramente pela IA de lembretes automáticos.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading optional>Endereço</SectionHeading>
              <div className="flex gap-[16px] w-full">
                <InputField label="CEP" error={errors.cep}>
                  <MaskedInput
                    name="cep"
                    control={control}
                    mask="00000-000"
                    placeholder="00000-000"
                    rules={{
                      validate: (v) =>
                        !v || /^\d{5}-\d{3}$/.test(v) || "CEP inválido",
                    }}
                    hasError={!!errors.cep}
                  />
                </InputField>
                <InputField label="Estado">
                  <Controller
                    name="estado"
                    control={control}
                    render={({ field }) => (
                      <Combobox
                        value={field.value}
                        onChange={(v) => {
                          field.onChange(v);
                          setValue("cidade", "");
                        }}
                        onBlur={field.onBlur}
                        placeholder="Selecione"
                        searchPlaceholder="Buscar estado..."
                        options={brazilStates.map((s) => ({
                          value: s.uf,
                          label: `${s.name} (${s.uf})`,
                          shortLabel: s.uf,
                        }))}
                      />
                    )}
                  />
                </InputField>
                <InputField label="Cidade">
                  <CityField control={control} />
                </InputField>
              </div>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading optional>Contato de emergência</SectionHeading>
              <div className="flex gap-[16px] w-full">
                <InputField label="Nome & relação">
                  <TextInput placeholder="Nome" {...register("emergenciaNome")} />
                </InputField>
                <InputField label="Telefone" error={errors.emergenciaTelefone}>
                  <MaskedInput
                    name="emergenciaTelefone"
                    control={control}
                    mask="(00) 0000-0000[0]"
                    placeholder="(00) 0000-0000"
                    rules={{
                      validate: (v) =>
                        !v ||
                        /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) ||
                        "Telefone inválido",
                    }}
                    hasError={!!errors.emergenciaTelefone}
                  />
                </InputField>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-[32px] w-full">
            <InputField label="Motivo da consulta" optional error={errors.motivoConsulta}>
              <Textarea
                placeholder="Ex: Ansiedade generalizada, dificuldades no trabalho, episódios de pânico nos últimos 6 meses..."
                hasError={!!errors.motivoConsulta}
                {...register("motivoConsulta")}
              />
            </InputField>

            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading optional>Tratamentos anteriores</SectionHeading>
              <Textarea
                placeholder="Ex: Psicoterapia com outra profissional em 2021-2022 (TCC). Psiquiatra acompanhando desde 2020..."
                {...register("tratamentosAnteriores")}
              />
              <InputField label="Diagnósticos prévios conhecidos" optional>
                <TextInput
                  placeholder="Ex: Transtorno de ansiedade generalizada (F41.1), Depressão leve (F32.0)"
                  {...register("diagnosticosPrevios")}
                />
              </InputField>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading>Uso de medicamentos</SectionHeading>
              <InputField label="Medicamentos em uso" optional>
                <TextInput
                  placeholder="Ex: Escitalopram 10mg 1x/dia, Clonazepam 0,5mg se necessário"
                  {...register("medicamentosEmUso")}
                />
              </InputField>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading>Contexto de vida</SectionHeading>

              <InputField label="Situação profissional" optional>
                <Controller
                  name="situacaoProfissional"
                  control={control}
                  render={({ field }) => (
                    <ChipGroup
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        "Empregado(a)",
                        "Autônomo(a)",
                        "Estudante",
                        "Desempregado(a)",
                        "Aposentado(a)",
                      ]}
                    />
                  )}
                />
              </InputField>

              <InputField label="Com quem mora" optional>
                <Controller
                  name="comQuemMora"
                  control={control}
                  render={({ field }) => (
                    <ChipGroup
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        "Sozinho(a)",
                        "Cônjuge/parceiro(a)",
                        "Filhos",
                        "Pais",
                        "Outros",
                      ]}
                    />
                  )}
                />
              </InputField>

              <InputField label="Observações clínicas iniciais" optional>
                <Textarea
                  placeholder="Anotações da triagem, impressões da primeira conversa, pontos de atenção..."
                  {...register("observacoesClinicas")}
                />
              </InputField>

              <div className="flex items-start gap-[10px] w-full bg-[#f2f6ff] border border-[#d6e4ff] rounded-[10px] px-[14px] py-[12px]">
                <Info size={16} weight="bold" className="text-[#317dff] shrink-0 mt-[2px]" />
                <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#475569]">
                  Estas informações ficam no prontuário e são visíveis{" "}
                  <span className="font-medium text-[#317dff]">somente para você</span>
                  . O paciente não tem acesso à plataforma.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-[24px] w-full">
            <div className="flex flex-col gap-[12px] w-full">
              <SectionHeading>
                Modalidade de pagamento <span className="text-[#fd3939]">*</span>
              </SectionHeading>
              <Controller
                name="modalidadePagamento"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex flex-col gap-[10px] w-full">
                    {[
                      { value: "particular", title: "Particular", desc: "Cobrado diretamente ao paciente" },
                      { value: "convenio", title: "Convênio / Plano de saúde", desc: "A cobrança vai para o plano" },
                    ].map((opt) => (
                      <RadioCard
                        key={opt.value}
                        active={field.value === opt.value}
                        title={opt.title}
                        description={opt.desc}
                        onClick={() => field.onChange(opt.value)}
                      />
                    ))}
                  </div>
                )}
              />
            </div>

            {needsPlano && (
              <div className="flex flex-col gap-[16px] w-full">
                <SectionHeading>Dados do plano</SectionHeading>
                <div className="flex gap-[16px] w-full">
                  <InputField label="Nome do plano" required>
                    <TextInput
                      placeholder="Ex: Unimed, Bradesco Saúde"
                      {...register("nomePlano")}
                    />
                  </InputField>
                  <InputField label="Número da carteirinha" required>
                    <MaskedInput
                      name="numeroCarteirinha"
                      control={control}
                      mask="0000.0000.0000.0000"
                      placeholder="0000.0000.0000.0000"
                    />
                  </InputField>
                </div>
                <div className="flex gap-[16px] w-full">
                  <InputField label="Validade" required>
                    <MaskedInput
                      name="validadePlano"
                      control={control}
                      mask="00/00/0000"
                      placeholder="dd/mm/aaaa"
                    />
                  </InputField>
                  <InputField label="Coparticipação" optional>
                    <TextInput
                      placeholder="R$ 0,00 (se houver)"
                      {...register("coparticipacao")}
                    />
                  </InputField>
                </div>
              </div>
            )}

            {watched.modalidadePagamento !== "convenio" && (
            <div className="flex flex-col gap-[16px] w-full">
              <SectionHeading>Valores</SectionHeading>
              <div className="flex gap-[16px] w-full">
                <InputField label="Valor da sessão" required>
                  <TextInput
                    placeholder="R$ 0,00"
                    {...register("valorSessao")}
                  />
                </InputField>
                <InputField label="Frequência padrão" required>
                  <Controller
                    name="frequenciaPadrao"
                    control={control}
                    render={({ field }) => (
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        searchable={false}
                        placeholder="Selecione"
                        options={[
                          { value: "1x por semana", label: "1x por semana" },
                          { value: "2x por semana", label: "2x por semana" },
                          { value: "Quinzenal", label: "Quinzenal" },
                          { value: "Mensal", label: "Mensal" },
                        ]}
                      />
                    )}
                  />
                </InputField>
              </div>

              <InputField label="Forma de recebimento preferida" required>
                <Controller
                  name="formaRecebimento"
                  control={control}
                  render={({ field }) => (
                    <ChipGroup
                      value={field.value}
                      onChange={field.onChange}
                      options={["PIX", "Cartão", "Boleto", "Dinheiro"]}
                    />
                  )}
                />
              </InputField>

              <InputField label="Quando cobrar" required>
                <Controller
                  name="quandoCobrar"
                  control={control}
                  render={({ field }) => (
                    <ChipGroup
                      value={field.value}
                      onChange={field.onChange}
                      options={["Antes da sessão", "No dia", "Após a sessão", "Mensal"]}
                    />
                  )}
                />
              </InputField>

              <InputField label="Política de cancelamento" optional>
                <Controller
                  name="politicaCancelamento"
                  control={control}
                  render={({ field }) => (
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      searchable={false}
                      placeholder="Sem política definida"
                      options={[
                        { value: "Sem política definida", label: "Sem política definida" },
                        { value: "Cobra 100% se cancelar com menos de 24h", label: "Cobra 100% se cancelar com menos de 24h" },
                        { value: "Cobra 50% se cancelar com menos de 24h", label: "Cobra 50% se cancelar com menos de 24h" },
                        { value: "Não cobra cancelamentos", label: "Não cobra cancelamentos" },
                        { value: "Personalizado", label: "Personalizado" },
                      ]}
                    />
                  )}
                />
              </InputField>
            </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-[20px] w-full">
            {/* TCLE scroll box */}
            <div className="w-full h-[230px] overflow-y-auto rounded-[10px] border border-[#e9e7e1] bg-[#fafaf9] px-[16px] py-[14px] [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4d4d8] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#a1a1aa]">
              <div className="flex flex-col gap-[14px]">
                <p className="font-['Geist',sans-serif] font-semibold text-[14px] leading-[20px] text-[#1c1b1a]">
                  Termo de Consentimento Livre e Esclarecido (TCLE)
                </p>
                <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#65635a]">
                  Eu, paciente identificado(a) neste cadastro, declaro que fui informado(a), de forma clara e detalhada, sobre a coleta e tratamento dos meus dados pessoais e dados sensíveis de saúde pela profissional responsável, para fins de prestação de serviços psicológicos.
                </p>

                {[
                  {
                    title: "1. Dados coletados",
                    body: "Nome completo, CPF, data de nascimento, contato (telefone e e-mail), endereço, histórico clínico, diagnósticos, medicamentos e informações de saúde mental relevantes ao tratamento.",
                  },
                  {
                    title: "2. Finalidade do tratamento",
                    body: "Os dados serão utilizados exclusivamente para: (a) prestação de atendimento psicológico; (b) elaboração e manutenção de prontuário; (c) comunicações referentes ao agendamento e lembrete de sessões; (d) cobrança pelos serviços prestados.",
                  },
                  {
                    title: "3. Armazenamento e segurança",
                    body: "Os dados são armazenados de forma segura com criptografia AES-256, em servidores localizados no Brasil, e acessados somente pela profissional responsável. Não há compartilhamento com terceiros, salvo obrigação legal.",
                  },
                  {
                    title: "4. Direitos do titular",
                    body: "Conforme a Lei nº 13.709/2018 (LGPD), o titular tem direito a: acessar seus dados, solicitar correção, portabilidade, revogação do consentimento e exclusão dos dados a qualquer momento, mediante solicitação à profissional.",
                  },
                  {
                    title: "5. Prazo de retenção",
                    body: "Os dados serão mantidos pelo prazo de 5 anos após o encerramento do atendimento, conforme obrigação regulatória do CFP (Resolução nº 001/2009), após o qual serão eliminados de forma segura.",
                  },
                ].map((s) => (
                  <div key={s.title} className="flex flex-col gap-[6px]">
                    <p className="font-['Geist',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1c1b1a]">
                      {s.title}
                    </p>
                    <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[20px] text-[#65635a]">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmation cards */}
            <div className="flex flex-col gap-[10px] w-full">
              {[
                {
                  active: lgpdAccepted,
                  toggle: () => setLgpdAccepted((v) => !v),
                  title: "O paciente foi informado e concorda com os termos",
                  desc: "Confirmação verbal ou assinatura física coletada na sessão",
                },
                {
                  active: respAccepted,
                  toggle: () => setRespAccepted((v) => !v),
                  title: "Assumo a responsabilidade pelo armazenamento seguro dos dados",
                  desc: "Como profissional responsável pelo atendimento",
                },
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={opt.toggle}
                  className={`flex items-center gap-[12px] w-full rounded-[10px] border px-[16px] py-[14px] text-left transition-colors cursor-pointer ${
                    opt.active
                      ? "border-[#10b981] bg-[#ecfdf5]"
                      : "border-[#e9e7e1] bg-white hover:border-[#c4c2ba]"
                  }`}
                >
                  <div
                    className={`shrink-0 size-[20px] rounded-full flex items-center justify-center transition-colors ${
                      opt.active ? "bg-[#10b981]" : "border-2 border-[#c4c2ba] bg-white"
                    }`}
                  >
                    {opt.active && <Check size={12} weight="bold" className="text-white" />}
                  </div>
                  <div className="flex flex-col gap-[2px] min-w-0">
                    <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-[#1c1b1a]">
                      {opt.title}
                    </p>
                    <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[16px] text-[#65635a]">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <InputField label="Data do consentimento">
              <input
                type="date"
                value={dataConsentimento}
                onChange={(e) => setDataConsentimento(e.target.value)}
                className="w-full h-[44px] bg-white rounded-[12px] border-2 border-[#efefef] px-[16px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black outline-none focus:border-[#317dff] transition-colors"
              />
            </InputField>

            <InputField label="Forma de registro do consentimento" optional>
              <Combobox
                value={formaRegistro}
                onChange={setFormaRegistro}
                searchable={false}
                placeholder="Selecione"
                options={[
                  { value: "Confirmação verbal na sessão", label: "Confirmação verbal na sessão" },
                  { value: "Assinatura física do documento", label: "Assinatura física do documento" },
                  { value: "E-mail de confirmação enviado", label: "E-mail de confirmação enviado" },
                  { value: "Assinatura eletrônica (outro sistema)", label: "Assinatura eletrônica (outro sistema)" },
                ]}
              />
            </InputField>
          </div>
        )}

        {step === 5 && savedPatient && (
          <SuccessSummary
            patient={savedPatient}
            onSchedule={handleScheduleSession}
            onProntuario={handleOpenProntuario}
            onClose={handleClose}
          />
        )}

        </div>

        {step !== 5 && (
        <div className="flex gap-[8px] items-start justify-end w-full shrink-0">
          {step === 1 ? (
            <button
              type="button"
              onClick={handleClose}
              className="h-[40px] flex items-center justify-center px-[17px] rounded-[8px] border border-[#f5e5f6] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
            >
              <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
                Cancelar
              </span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep((step - 1) as Step)}
                className="h-[40px] flex items-center gap-[8px] justify-center px-[16px] rounded-[8px] border border-[#f5e5f6] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} weight="bold" className="text-[#65635a]" />
                <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
                  Voltar
                </span>
              </button>
              {step !== 3 && step !== 4 && (
                <button
                  type="button"
                  onClick={() => setStep((step + 1) as Step)}
                  className="h-[40px] flex items-center justify-center px-[16px] rounded-[8px] border border-[#f5e5f6] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
                >
                  <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
                    Pular esta etapa
                  </span>
                </button>
              )}
            </>
          )}

          <button
            type={step === 4 ? "submit" : "button"}
            onClick={step === 4 ? undefined : handleNext}
            disabled={!nextEnabled || submitting}
            className={`flex-1 h-[40px] rounded-[8px] flex items-center justify-center gap-[8px] px-[16px] transition-colors ${
              nextEnabled && !submitting
                ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
                : "bg-[#a9c5ff] cursor-not-allowed"
            }`}
          >
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#fafafa]">
              {step === 4 && submitting ? "Salvando..." : meta.nextLabel}
            </span>
            <ArrowRight size={16} weight="bold" className="text-white" />
          </button>
        </div>
        )}
      </form>
    </div>
  );
}

function SuccessSummary({
  patient,
  onSchedule,
  onProntuario,
  onClose,
}: {
  patient: FormValues;
  onSchedule: () => void;
  onProntuario: () => void;
  onClose: () => void;
}) {
  const modalidadeLabel: Record<string, string> = {
    particular: "Particular",
    convenio: "Convênio / Plano de saúde",
    misto: "Misto",
  };

  const rows: Array<{ label: string; value: string }> = [
    { label: "Nome", value: patient.nome || "—" },
    { label: "Data de nascimento", value: patient.dataNascimento || "—" },
    { label: "WhatsApp", value: patient.whatsapp || "—" },
    { label: "E-mail", value: patient.email || "—" },
    {
      label: "Localização",
      value:
        [patient.cidade, patient.estado].filter(Boolean).join(" / ") || "—",
    },
    {
      label: "Modalidade de pagamento",
      value: modalidadeLabel[patient.modalidadePagamento] ?? "—",
    },
    {
      label: "Valor da sessão",
      value: patient.valorSessao || "—",
    },
    {
      label: "Frequência padrão",
      value: patient.frequenciaPadrao || "—",
    },
  ];

  return (
    <div className="flex flex-col gap-[24px] w-full items-center">
      <div className="flex flex-col items-center gap-[12px] text-center">
        <div className="size-[64px] rounded-full bg-[#ecfdf5] flex items-center justify-center">
          <CheckCircle size={36} weight="bold" className="text-[#10b981]" />
        </div>
        <div className="flex flex-col gap-[6px] items-center">
          <p className="font-['Geist',sans-serif] font-medium text-[20px] leading-[24px] text-black">
            Paciente cadastrado com sucesso
          </p>
          <p className="font-['Geist',sans-serif] font-normal text-[14px] leading-[21px] text-[#4b5563] max-w-[420px]">
            {patient.nome
              ? `${patient.nome} foi adicionado(a) à sua lista. Veja o resumo abaixo.`
              : "O paciente foi adicionado à sua lista. Veja o resumo abaixo."}
          </p>
        </div>
      </div>

      <div className="w-full rounded-[12px] border border-[#efefef] bg-[#fafafa] divide-y divide-[#efefef]">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-[16px] px-[16px] py-[12px]"
          >
            <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[18px] text-[#65635a]">
              {r.label}
            </span>
            <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[18px] text-black text-right truncate">
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-[8px] items-start justify-end w-full">
        <button
          type="button"
          onClick={onClose}
          className="h-[40px] flex items-center justify-center px-[17px] rounded-[8px] border border-[#f5e5f6] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
        >
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
            Fechar
          </span>
        </button>
        <button
          type="button"
          onClick={onProntuario}
          className="h-[40px] flex items-center gap-[8px] justify-center px-[16px] rounded-[8px] border border-[#f5e5f6] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer"
        >
          <FileText size={16} weight="bold" className="text-[#65635a]" />
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#65635a]">
            Abrir prontuário
          </span>
        </button>
        <button
          type="button"
          onClick={onSchedule}
          className="flex-1 h-[40px] rounded-[8px] flex items-center justify-center gap-[8px] px-[16px] bg-[#317dff] hover:bg-[#2968d9] transition-colors cursor-pointer"
        >
          <CalendarPlus size={16} weight="bold" className="text-white" />
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-[#fafafa]">
            Agendar 1ª sessão
          </span>
        </button>
      </div>
    </div>
  );
}

function InputField({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: FieldError;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-[1_0_0] min-w-0 flex-col gap-[8px] items-start">
      <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black w-full">
        {label}{" "}
        {required && <span className="text-[#fd3939]">*</span>}
        {optional && <span className="text-[#a29e9e]">(opcional)</span>}
      </p>
      {children}
      {error?.message && (
        <p className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939]">
          {error.message}
        </p>
      )}
    </div>
  );
}

function SectionHeading({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <p className="font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black w-full">
        {children}
        {optional && <span className="text-[#a29e9e]"> (opcional)</span>}
      </p>
      <div className="h-px w-full bg-[#dbdbdb]" />
    </div>
  );
}

const inputBaseClass =
  "w-full h-[44px] bg-white rounded-[12px] border-2 px-[16px] py-0 font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors";

const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }
>(({ hasError, className, ...props }, ref) => (
  <input
    ref={ref}
    type={props.type ?? "text"}
    {...props}
    className={`${inputBaseClass} ${
      hasError ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
    } ${className ?? ""}`}
  />
));
TextInput.displayName = "TextInput";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }
>(({ hasError, className, ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`w-full h-[96px] bg-white rounded-[12px] border-2 px-[16px] py-[14px] font-['Geist',sans-serif] font-medium text-[14px] leading-[16.8px] text-black placeholder:text-[#737373] outline-none transition-colors resize-none ${
      hasError ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
    } ${className ?? ""}`}
  />
));
Textarea.displayName = "Textarea";

function MaskedInput({
  name,
  control,
  mask,
  placeholder,
  rules,
  hasError,
}: {
  name: keyof FormValues;
  control: Control<FormValues>;
  mask: string;
  placeholder: string;
  rules?: Parameters<typeof Controller>[0]["rules"];
  hasError?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <IMaskInput
          mask={mask}
          value={field.value ?? ""}
          unmask={false}
          onAccept={(v: string) => field.onChange(v)}
          onBlur={field.onBlur}
          inputRef={field.ref}
          placeholder={placeholder}
          className={`${inputBaseClass} ${
            hasError ? "border-[#fd3939] focus:border-[#fd3939]" : "border-[#efefef] focus:border-[#317dff]"
          }`}
        />
      )}
    />
  );
}

function RadioCard({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-[12px] rounded-[12px] border-2 px-[16px] py-[14px] transition-colors cursor-pointer text-left ${
        active
          ? "border-[#317dff] bg-[#f2f6ff]"
          : "border-[#efefef] bg-white hover:border-[#d4d4d4]"
      }`}
    >
      <span
        className={`flex items-center justify-center size-[18px] rounded-full border-2 shrink-0 ${
          active ? "border-[#317dff]" : "border-[#d4d4d4]"
        }`}
      >
        {active && <span className="size-[8px] rounded-full bg-[#317dff]" />}
      </span>
      <div className="flex flex-col gap-[4px] min-w-0">
        <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[17px] text-black">
          {title}
        </span>
        <span className="font-['Geist',sans-serif] font-normal text-[14px] leading-[17px] text-[#65635a]">
          {description}
        </span>
      </div>
    </button>
  );
}

function ChipGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-[8px]">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(active ? "" : opt)}
            className={`h-[36px] px-[14px] rounded-full border-2 font-['Geist',sans-serif] font-medium text-[14px] leading-[16px] transition-colors cursor-pointer ${
              active
                ? "border-[#317dff] bg-[#f2f6ff] text-[#317dff]"
                : "border-[#efefef] bg-white text-[#363636] hover:border-[#d4d4d4]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function CityField({ control }: { control: Control<FormValues> }) {
  const estado = useWatch({ control, name: "estado" });
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!estado) {
      setCities([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchCitiesByState(estado)
      .then((list) => {
        if (!cancelled) setCities(list);
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [estado]);

  return (
    <Controller
      name="cidade"
      control={control}
      render={({ field }) => (
        <Combobox
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          placeholder={estado ? "Selecione a cidade" : "Selecione o estado primeiro"}
          searchPlaceholder="Buscar cidade..."
          disabled={!estado}
          loading={loading}
          requireSearch
          searchPromptMessage="Digite o nome da cidade..."
          options={cities.map((name) => ({ value: name, label: name }))}
        />
      )}
    />
  );
}