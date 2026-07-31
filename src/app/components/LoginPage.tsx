import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../lib/auth/AuthProvider";
import { AuthLayout } from "./AuthLayout";
import { AuthField } from "./AuthField";

interface FormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (user) return <Navigate to="/" replace />;

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    const { error } = await signIn(data.email, data.password);
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível entrar. Verifique e-mail e senha.");
      return;
    }
    navigate("/");
  }

  return (
    <AuthLayout
      title="Entrar no Piepo"
      subtitle="Acesse sua conta para gerenciar seus pacientes"
      footer={
        <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#75787d] text-center">
          Ainda não tem conta?{" "}
          <Link to="/signup" className="font-medium text-[#317dff] hover:underline">
            Cadastre-se
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
        <AuthField
          id="email"
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          error={errors.email}
          {...register("email", { required: "Informe seu e-mail" })}
        />

        <AuthField
          id="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          error={errors.password}
          {...register("password", { required: "Informe sua senha" })}
        />

        <button
          type="submit"
          disabled={submitting}
          className={`h-[40px] rounded-[8px] flex items-center justify-center mt-[8px] transition-colors ${
            submitting ? "bg-[#a9c5ff] cursor-not-allowed" : "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
          }`}
        >
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
            {submitting ? "Entrando..." : "Entrar"}
          </span>
        </button>
      </form>
    </AuthLayout>
  );
}
