import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../lib/auth/AuthProvider";
import { AuthLayout } from "./AuthLayout";
import { AuthField } from "./AuthField";

interface FormValues {
  password: string;
  confirmPassword: string;
}

export function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    const { error } = await updatePassword(data.password);
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível redefinir a senha. O link pode ter expirado.");
      return;
    }
    toast.success("Senha redefinida com sucesso!");
    navigate("/");
  }

  return (
    <AuthLayout title="Redefinir senha" subtitle="Escolha uma nova senha para sua conta">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
        <AuthField
          id="password"
          label="Nova senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          error={errors.password}
          {...register("password", {
            required: "Informe uma senha",
            minLength: { value: 6, message: "A senha deve ter ao menos 6 caracteres" },
          })}
        />

        <AuthField
          id="confirmPassword"
          label="Confirmar nova senha"
          type="password"
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
            {submitting ? "Salvando..." : "Redefinir senha"}
          </span>
        </button>
      </form>
    </AuthLayout>
  );
}
