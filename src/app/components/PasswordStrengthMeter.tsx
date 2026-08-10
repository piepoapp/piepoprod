export type PasswordStrengthScore = 0 | 1 | 2 | 3;

export interface PasswordStrength {
  score: PasswordStrengthScore;
  label: "Fraca" | "Média" | "Forte";
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "Fraca" };

  let points = 0;
  if (password.length >= 8) points += 1;
  if (password.length >= 12) points += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points += 1;
  if (/\d/.test(password)) points += 1;
  if (/[^A-Za-z0-9]/.test(password)) points += 1;

  if (points <= 2) return { score: 1, label: "Fraca" };
  if (points === 3) return { score: 2, label: "Média" };
  return { score: 3, label: "Forte" };
}

const scoreStyles: Record<PasswordStrengthScore, { bar: string; text: string }> = {
  0: { bar: "bg-[#e5e7eb]", text: "text-[#a1a1aa]" },
  1: { bar: "bg-[#fd3939]", text: "text-[#fd3939]" },
  2: { bar: "bg-[#eab308]", text: "text-[#854d0e]" },
  3: { bar: "bg-[#10b981]", text: "text-[#047857]" },
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const { score, label } = getPasswordStrength(password);
  const active = scoreStyles[score];

  return (
    <div className="flex flex-col gap-[6px] items-start">
      {/* Segmentos de largura fixa: a barra indica força, não progresso —
          esticá-la na largura do campo dava peso visual demais. */}
      <div className="flex gap-[4px]">
        {[1, 2, 3].map((seg) => (
          <div
            key={seg}
            className={`w-[12px] h-[4px] rounded-full transition-colors ${seg <= score ? active.bar : "bg-[#e5e7eb]"}`}
          />
        ))}
      </div>
      <span className={`font-['Geist',sans-serif] font-medium text-[12px] leading-[14px] ${active.text}`}>
        Força da senha: {label}
      </span>
    </div>
  );
}
