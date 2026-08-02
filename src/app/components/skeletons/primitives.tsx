import { Skeleton } from "../ui/skeleton";

export { Skeleton };

/** Linha de texto. Altura em px, largura aceita px ou %. */
export function SkeletonLine({
  w = "100%",
  h = 14,
  className = "",
}: {
  w?: number | string;
  h?: number;
  className?: string;
}) {
  return (
    <Skeleton
      className={`rounded-[6px] shrink-0 ${className}`}
      style={{ width: typeof w === "number" ? `${w}px` : w, height: `${h}px` }}
    />
  );
}

/** Avatar / ícone circular. */
export function SkeletonCircle({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <Skeleton
      className={`rounded-full shrink-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

/** Bloco genérico (ícone quadrado, badge, botão, input...). */
export function SkeletonBox({
  w = "100%",
  h = 40,
  radius = 8,
  className = "",
}: {
  w?: number | string;
  h?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <Skeleton
      className={`shrink-0 ${className}`}
      style={{
        width: typeof w === "number" ? `${w}px` : w,
        height: `${h}px`,
        borderRadius: `${radius}px`,
      }}
    />
  );
}

/**
 * Envelope de transição: aplica um fade-in curto quando o conteúdo real entra
 * no lugar do skeleton, evitando o "corte seco" entre os dois estados.
 */
export function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-in fade-in duration-200 ${className}`}>{children}</div>
  );
}
