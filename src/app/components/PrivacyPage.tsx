import { LegalArticleLayout, LegalNotice } from "./legal/LegalArticleLayout";
import { privacySections } from "./legal/privacySections";

export function PrivacyPage() {
  return (
    <LegalArticleLayout
      title="Política de Privacidade"
      lastUpdated="[DEFINIR — data de publicação]"
      sections={privacySections}
      notice={
        <LegalNotice>
          A Piepo trata <strong>dados sensíveis de saúde</strong> (art. 5º, II e art. 11 da LGPD), o que
          exige requisitos legais mais rigorosos do que dados pessoais comuns. Este conteúdo é uma minuta
          de trabalho e ainda não foi revisado por um(a) advogado(a) especializado(a) em LGPD. Trechos
          marcados como <strong>[DEFINIR]</strong> exigem uma decisão jurídica antes da publicação.
        </LegalNotice>
      }
    />
  );
}
