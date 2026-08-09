import { LegalArticleLayout, LegalNotice } from "./legal/LegalArticleLayout";
import { termsSections } from "./legal/termsSections";

export function TermsPage() {
  return (
    <LegalArticleLayout
      title="Termos de Uso"
      lastUpdated="[DEFINIR — data de publicação]"
      sections={termsSections}
      notice={
        <LegalNotice>
          Este conteúdo é uma minuta de trabalho, escrita com base nas funcionalidades reais da Piepo, e
          ainda não foi revisado por um(a) advogado(a). Trechos marcados como{" "}
          <strong>[DEFINIR]</strong> exigem uma decisão jurídica ou comercial antes da publicação. Não
          utilize este texto em produção sem validação profissional.
        </LegalNotice>
      }
    />
  );
}
