import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../../lib/auth/AuthProvider";
import { AuthLayout } from "./AuthLayout";
import { AuthField } from "./AuthField";

interface FormValues {
  email: string;
}

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    setErrorMessage(null);
    const { error } = await resetPassword(data.email);
    setSubmitting(false);
    if (error) {
      setErrorMessage("Não foi possível enviar o e-mail. Tente novamente.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout title="Verifique seu e-mail" subtitle="Enviamos um link para redefinir sua senha">
        <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#75787d] text-center">
          Não recebeu?{" "}
          <button
            type="button"
            onClick={() => setSent(false)}
            className="font-medium text-[#317dff] hover:underline cursor-pointer"
          >
            Tentar de novo
          </button>
        </p>
        <Link
          to="/login"
          className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#75787d] text-center hover:underline"
        >
          Voltar para o login
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Esqueceu sua senha?" subtitle="Informe seu e-mail para receber um link de redefinição">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
        <AuthField
          id="email"
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          error={errors.email}
          {...register("email", { required: "Informe seu e-mail" })}
        />

        {errorMessage && (
          <span className="font-['Geist',sans-serif] font-normal text-[12px] leading-[14px] text-[#fd3939]">
            {errorMessage}
          </span>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`h-[40px] rounded-[8px] flex items-center justify-center mt-[8px] transition-colors ${
            submitting ? "bg-[#a9c5ff] cursor-not-allowed" : "bg-[#317dff] hover:bg-[#2968d9] cursor-pointer"
          }`}
        >
          <span className="font-['Geist',sans-serif] font-medium text-[14px] leading-[20px] text-white">
            {submitting ? "Enviando..." : "Enviar link de redefinição"}
          </span>
        </button>

        <p className="font-['Geist',sans-serif] font-normal text-[13px] leading-[18px] text-[#75787d] text-center">
          Lembrou a senha?{" "}
          <Link to="/login" className="font-medium text-[#317dff] hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
