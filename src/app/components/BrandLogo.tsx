interface BrandLogoProps {
  /** Lado do quadrado, em px. */
  size?: number;
  className?: string;
}

/**
 * Marca do Piepo.
 *
 * Substitui o "o" que antes era escrito em Confiteria Script — fonte que nunca
 * chegou a ser carregada pelo app, então na prática caía no sans-serif padrão.
 * A cor vem de currentColor para permitir versão sobre fundo escuro.
 */
export function BrandLogo({ size = 32, className = "" }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 412 412"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Piepo"
      className={`shrink-0 text-[#317dff] ${className}`}
    >
      <path
        d="M0 64C0 33.8301 0 18.7452 9.37258 9.37258C18.7452 0 33.8301 0 64 0H264V186H48C25.3726 186 14.0589 186 7.02944 178.971C0 171.941 0 160.627 0 138V64Z"
        fill="currentColor"
      />
      <path
        d="M226 29.3684C226 24.3804 226 21.8864 226.369 19.8053C228.129 9.89093 235.891 2.12933 245.805 0.369415C247.886 0 250.38 0 255.368 0V0C281.971 0 295.273 0 306.372 1.97021C359.248 11.3564 400.644 52.7516 410.03 105.628C412 116.727 412 130.029 412 156.632V226H226V29.3684Z"
        fill="currentColor"
      />
      <path
        d="M0 263.2C0 250.889 0 244.734 2.20456 239.952C4.59698 234.763 8.76261 230.597 13.9522 228.205C18.7342 226 24.8895 226 37.2 226H186V374.8C186 387.111 186 393.266 183.795 398.048C181.403 403.237 177.237 407.403 172.048 409.795C167.266 412 161.111 412 148.8 412V412C99.558 412 74.9369 412 55.8087 403.182C35.0504 393.612 18.3879 376.95 8.81825 356.191C0 337.063 0 312.442 0 263.2V263.2Z"
        fill="currentColor"
      />
      <path
        d="M226 226H412V348C412 378.17 412 393.255 402.627 402.627C393.255 412 378.17 412 348 412H290C259.83 412 244.745 412 235.373 402.627C226 393.255 226 378.17 226 348V226Z"
        fill="currentColor"
      />
    </svg>
  );
}
