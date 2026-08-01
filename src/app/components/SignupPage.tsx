import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Navigate, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { UserCircle, At, Lock, Phone } from "@phosphor-icons/react";
import { useAuth } from "../../lib/auth/AuthProvider";
import { AuthLayout } from "./AuthLayout";
import { AuthField } from "./AuthField";
import { AuthCheckbox } from "./AuthCheckbox";
import { PhoneField } from "./PhoneField";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { GoogleButton, AuthDivider } from "./AuthSocialButtons";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export function SignupPage() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { acceptedTerms: false } });

  if (user) return <Navigate to="/" replace />;

  const passwordValue = watch("password");
  const confirmValue = watch("confirmPassword");
  const acceptedTerms = watch("acceptedTerms");
  const passwordsOk = !!passwordValue && passwordValue.length >= 8 && passwordValue === confirmValue;
  const ready = passwordsOk && !!acceptedTerms;

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.fullName, data.phone);
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível criar sua conta. " + error);
      return;
    }
    toast.success("Conta criada com sucesso!");
    navigate("/");
  }

  return (
    <AuthLayout title="Criar conta no Piepo" subtitle="Cadastre-se para começar a gerenciar seus pacientes">
      <div className="flex flex-col gap-[16px]">
        <GoogleButton label="Cadastrar com Google" />
        <AuthDivider label="Ou continue com" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
        <AuthField
          id="fullName"
          label="Nome completo"
          type="text"
          icon={UserCircle}
          placeholder="Seu nome"
          error={errors.fullName}
          {...register("fullName", { required: "Informe seu nome" })}
        />

        <AuthField
          id="email"
          label="E-mail"
          type="email"
          icon={At}
          placeholder="Insira o seu e-mail"
          error={errors.email}
          {...register("email", { required: "Informe seu e-mail" })}
        />

        <PhoneField
          id="phone"
          name="phone"
          control={control}
          label="Telefone"
          icon={Phone}
          placeholder="(00) 00000-0000"
          error={errors.phone}
          rules={{
            required: "Informe seu telefone",
            pattern: { value: /^\(\d{2}\) \d{5}-\d{4}$/, message: "Telefone inválido" },
          }}
        />

        <div className="flex flex-col gap-[8px]">
          <AuthField
            id="password"
            label="Senha"
            type="password"
            icon={Lock}
            placeholder="Mínimo 8 caracteres"
            error={errors.password}
            {...register("password", {
              required: "Informe uma senha",
              minLength: { value: 8, message: "A senha deve ter ao menos 8 caracteres" },
            })}
          />
          <PasswordStrengthMeter password={passwordValue ?? ""} />
        </div>

        <AuthField
          id="confirmPassword"
          label="Confirmar senha"
          type="password"
          icon={Lock}
          placeholder="Repita a senha"
          error={errors.confirmPassword}
          {...register("confirmPassword", {
            required: "Confirme a senha",
            validate: (value) => value === watch("password") || "As senhas não coincidem",
          })}
        />

        <Controller
          name="acceptedTerms"
          control={control}
          rules={{ required: "Você precisa aceitar os termos para continuar" }}
          render={({ field }) => (
            <AuthCheckbox
              id="acceptedTerms"
              checked={field.value}
              onCheckedChange={field.onChange}
              error={errors.acceptedTerms?.message}
            >
              Eu li e aceito os{" "}
              <Link to="/termos" target="_blank" className="font-medium text-[#317dff] hover:underline">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link to="/privacidade" target="_blank" className="font-medium text-[#317dff] hover:underline">
                Política de Privacidade
              </Link>
              .
            </AuthCheckbox>
          )}
        />

        <button
          type="submit"
          disabled={submitting || !ready}
          className={`h-[40px] rounded-[8px] flex items-center justify-center mt-[8px] transition-colors ${
            ready && !submitting ? "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer" : "bg-[#a9c5ff] cursor-not-allowed"
          }`}
        >
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
            {submitting ? "Criando conta..." : "Criar conta"}
          </span>
        </button>

        <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#75787d] text-center">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-[#317dff] hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
