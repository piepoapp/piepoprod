import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { PasswordStrengthMeter } from "../PasswordStrengthMeter";
import { TextInput } from "../form";
import { Field, SectionCard } from "./SettingsShell";

export function AccountSection() {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const tooShort = password.length > 0 && password.length < 8;
  const dirty = password.length > 0;

  async function handleSave() {
    if (password.length < 8) {
      setError("A senha deve ter ao menos 8 caracteres.");
      return;
    }
    setError(undefined);
    setSaving(true);
    const { error: err } = await updatePassword(password);
    setSaving(false);
    if (err) {
      // O Supabase costuma exigir login recente para trocar a senha.
      setError("Não foi possível alterar a senha. Saia e entre de novo, depois tente outra vez.");
      return;
    }
    setPassword("");
    toast.success("Senha alterada");
  }

  return (
    <SectionCard
      title="Senha"
      description="A senha que você usa para entrar no Piepo."
      dirty={dirty}
      saving={saving}
      onSave={() => void handleSave()}
      saveLabel="Alterar senha"
    >
      <Field
        label="Nova senha"
        htmlFor="cfg-senha"
        error={error ?? (tooShort ? "A senha deve ter ao menos 8 caracteres." : undefined)}
        hint="Use ao menos 8 caracteres. Você continua conectado depois da troca."
      >
        <TextInput
          id="cfg-senha"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          hasError={!!error || tooShort}
        />
      </Field>

      {password.length > 0 && <PasswordStrengthMeter password={password} />}
    </SectionCard>
  );
}
