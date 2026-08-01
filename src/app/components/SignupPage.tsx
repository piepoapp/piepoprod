import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { UserCircle, At, Lock } from "@phosphor-icons/react";
import { useAuth } from "../../lib/auth/AuthProvider";
import { AuthLayout } from "./AuthLayout";
import { AuthField } from "./AuthField";
import { GoogleButton, AuthDivider } from "./AuthSocialButtons";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupPage() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  if (user) return <Navigate to="/" replace />;

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
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

        <AuthField
          id="password"
          label="Senha"
          type="password"
          icon={Lock}
          placeholder="Mínimo 6 caracteres"
          error={errors.password}
          {...register("password", {
            required: "Informe uma senha",
            minLength: { value: 6, message: "A senha deve ter ao menos 6 caracteres" },
          })}
        />

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

        <button
          type="submit"
          disabled={submitting}
          className={`h-[40px] rounded-[8px] flex items-center justify-center mt-[8px] transition-colors ${
            submitting ? "bg-[#a9c5ff] cursor-not-allowed" : "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
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
