import { Link } from "react-router";
import { LegalP, LegalUl, Placeholder, type LegalSection } from "./LegalArticleLayout";

export const termsSections: LegalSection[] = [
  {
    id: "aceitacao",
    number: "1",
    title: "Aceitação dos Termos",
    body: (
      <>
        <LegalP>
          Estes Termos de Uso ("Termos") regem o acesso e a utilização da plataforma Piepo ("Piepo",
          "plataforma", "nós"), um software como serviço (SaaS) de gestão de consultório voltado a
          psicólogos(as) e demais profissionais de saúde mental ("você", "profissional", "usuário").
        </LegalP>
        <LegalP>
          Ao criar uma conta ou utilizar a Piepo de qualquer forma, você declara que leu, entendeu e
          concorda integralmente com estes Termos e com a nossa{" "}
          <Link to="/privacidade" className="text-[#317dff] hover:underline" target="_blank">
            Política de Privacidade
          </Link>
          . Caso não concorde, não utilize a plataforma.
        </LegalP>
      </>
    ),
  },
  {
    id: "descricao",
    number: "2",
    title: "Descrição do Serviço",
    body: (
      <>
        <LegalP>A Piepo oferece, entre outras, as seguintes funcionalidades:</LegalP>
        <LegalUl>
          <li>
            Cadastro e gestão de pacientes, incluindo dados de identificação, contato, saúde e histórico
            clínico inseridos pelo profissional;
          </li>
          <li>
            Agenda de sessões (visualização diária, semanal e mensal), incluindo recorrência, bloqueio de
            horários e reagendamento;
          </li>
          <li>
            Registro de informações financeiras associadas a cada sessão (valor, forma de pagamento,
            status de cobrança);
          </li>
          <li>
            Painel com indicadores de atendimento (pacientes ativos, sessões agendadas e realizadas);
          </li>
          <li>
            Onboarding profissional com registro de CRP, disponibilidade de horários e configurações
            padrão de sessão;
          </li>
          <li>
            Funcionalidades futuras/em desenvolvimento: integração com Google Agenda, envio de mensagens
            via WhatsApp para confirmação e cobrança de sessões, e módulo financeiro completo. Recursos
            marcados como "Em breve" na plataforma ainda não estão disponíveis.
          </li>
        </LegalUl>
        <LegalP>
          A Piepo é uma <strong>ferramenta de apoio à gestão administrativa do consultório</strong>. Ela
          não presta, substitui ou interfere no exercício da psicologia, no julgamento clínico do
          profissional ou na relação terapêutica entre profissional e paciente.
        </LegalP>
      </>
    ),
  },
  {
    id: "cadastro",
    number: "3",
    title: "Cadastro e Elegibilidade",
    body: (
      <>
        <LegalP>3.1. Para utilizar a Piepo, você declara e garante que:</LegalP>
        <LegalUl>
          <li>
            É psicólogo(a) devidamente inscrito(a) no Conselho Regional de Psicologia (CRP) de sua
            jurisdição, ou profissional legalmente habilitado a prestar o tipo de atendimento que registra
            na plataforma;
          </li>
          <li>Tem capacidade civil para contratar;</li>
          <li>
            Fornece informações verdadeiras, completas e atualizadas no cadastro (nome, e-mail, telefone e
            número de CRP);
          </li>
          <li>
            É o único responsável pela veracidade dos dados de CRP informados — a Piepo não valida
            ativamente o registro junto ao Conselho Federal de Psicologia no momento do cadastro.
          </li>
        </LegalUl>
        <LegalP>
          3.2. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades
          realizadas em sua conta. Notifique-nos imediatamente em caso de uso não autorizado.
        </LegalP>
        <LegalP>
          3.3. A Piepo reserva-se o direito de suspender ou encerrar contas que forneçam informações
          falsas, incompletas ou que não correspondam a um profissional habilitado.
        </LegalP>
      </>
    ),
  },
  {
    id: "responsabilidades",
    number: "4",
    title: "Responsabilidades do Profissional Usuário",
    body: (
      <>
        <LegalP>
          4.1. <strong>Você é o responsável exclusivo pelos dados de pacientes que insere na
          plataforma.</strong> Isso inclui, sem limitação:
        </LegalP>
        <LegalUl>
          <li>
            Garantir que possui base legal e consentimento adequados do paciente (ou de seu representante
            legal) para coletar, registrar e armazenar os dados inseridos, incluindo dados de saúde;
          </li>
          <li>
            Cumprir o Código de Ética Profissional do Psicólogo e as resoluções do CFP relativas a sigilo
            profissional, prontuário psicológico e guarda de documentos;
          </li>
          <li>
            Cumprir a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) na condição de{" "}
            <strong>controlador</strong> dos dados pessoais e dados sensíveis de saúde de seus pacientes
            que insere na plataforma (veja a seção 10 e a Política de Privacidade para o detalhamento dos
            papéis de controlador e operador).
          </li>
        </LegalUl>
        <LegalP>
          4.2. A Piepo atua como <strong>operadora</strong> desses dados: processa e armazena as
          informações que você insere, seguindo suas instruções enquanto controlador, mas não define a
          finalidade do tratamento nem decide sobre a coleta desses dados — essa decisão é sua.
        </LegalP>
        <LegalP>4.3. É vedado ao usuário:</LegalP>
        <LegalUl>
          <li>Inserir dados de pacientes sem amparo legal ou consentimento válido;</li>
          <li>Utilizar a plataforma para finalidade diversa da gestão de sua prática profissional;</li>
          <li>Tentar acessar, sem autorização, contas, dados ou sistemas de outros usuários;</li>
          <li>
            Realizar engenharia reversa, copiar, revender ou redistribuir a plataforma ou seu código;
          </li>
          <li>
            Utilizar a Piepo para armazenar dados de pacientes fora do escopo de sua atuação profissional
            regular.
          </li>
        </LegalUl>
      </>
    ),
  },
  {
    id: "planos",
    number: "5",
    title: "Planos, Preços e Cobrança",
    body: (
      <LegalP>
        <Placeholder>
          a estrutura comercial (planos gratuitos/pagos, periodicidade de cobrança, política de reembolso,
          forma de pagamento) ainda está em definição. Esta seção deve ser escrita quando o modelo de
          cobrança for finalizado, antes da publicação destes Termos
        </Placeholder>
      </LegalP>
    ),
  },
  {
    id: "propriedade-intelectual",
    number: "6",
    title: "Propriedade Intelectual",
    body: (
      <>
        <LegalP>
          6.1. A Piepo, sua marca, layout, código-fonte, funcionalidades e demais elementos são de
          propriedade exclusiva de <Placeholder>razão social</Placeholder> ou de seus licenciadores,
          protegidos pela legislação de propriedade intelectual aplicável.
        </LegalP>
        <LegalP>
          6.2. Os dados que você insere na plataforma (informações de pacientes, agenda, anotações)
          continuam de sua titularidade e responsabilidade. A Piepo não reivindica propriedade sobre esses
          dados; nós apenas os armazenamos e processamos conforme descrito nestes Termos e na Política de
          Privacidade.
        </LegalP>
      </>
    ),
  },
  {
    id: "disponibilidade",
    number: "7",
    title: "Disponibilidade do Serviço",
    body: (
      <>
        <LegalP>
          7.1. Envidamos esforços razoáveis para manter a plataforma disponível de forma contínua, mas não
          garantimos operação ininterrupta ou livre de erros. Podem ocorrer interrupções para manutenção,
          atualização ou por motivos fora de nosso controle.
        </LegalP>
        <LegalP>
          7.2. Recomendamos que você mantenha registros próprios (fora da plataforma) de informações
          críticas, especialmente durante o período de testes/lançamento do produto.
        </LegalP>
      </>
    ),
  },
  {
    id: "limitacao-responsabilidade",
    number: "8",
    title: "Limitação de Responsabilidade",
    body: (
      <>
        <LegalP>
          8.1. Na máxima extensão permitida pela lei aplicável, a Piepo não se responsabiliza por:
        </LegalP>
        <LegalUl>
          <li>
            Decisões clínicas, terapêuticas ou administrativas tomadas com base nas informações
            registradas na plataforma;
          </li>
          <li>
            Danos indiretos, incidentais ou lucros cessantes decorrentes do uso ou da impossibilidade de
            uso da plataforma;
          </li>
          <li>
            Perda de dados decorrente de uso indevido da plataforma pelo usuário, incluindo
            compartilhamento de credenciais de acesso.
          </li>
        </LegalUl>
        <LegalP>
          8.2. Nada nestes Termos exclui responsabilidades que não possam ser legalmente limitadas ou
          excluídas, como as decorrentes de dolo, culpa grave ou violação de direitos do titular de dados
          prevista na LGPD.
        </LegalP>
      </>
    ),
  },
  {
    id: "sigilo",
    number: "9",
    title: "Sigilo Profissional e Relação com Pacientes",
    body: (
      <>
        <LegalP>
          9.1. A Piepo não tem relação contratual, terapêutica ou de qualquer natureza com os pacientes
          cujos dados são inseridos pelo profissional. Toda comunicação, consentimento e relação de
          confiança referentes ao sigilo profissional permanecem exclusivamente entre você e seu paciente.
        </LegalP>
        <LegalP>
          9.2. Caso funcionalidades de comunicação direta com pacientes sejam habilitadas no futuro (ex.:
          confirmação de sessão por WhatsApp), o uso dessas funcionalidades exigirá consentimento
          específico do paciente, do qual você, como controlador dos dados, será responsável por obter e
          documentar.
        </LegalP>
      </>
    ),
  },
  {
    id: "protecao-dados",
    number: "10",
    title: "Proteção de Dados",
    body: (
      <LegalP>
        O tratamento de dados pessoais na Piepo — tanto os seus, como profissional cadastrado, quanto os
        de seus pacientes — é regido pela nossa{" "}
        <Link to="/privacidade" className="text-[#317dff] hover:underline" target="_blank">
          Política de Privacidade
        </Link>
        , parte integrante destes Termos.
      </LegalP>
    ),
  },
  {
    id: "rescisao",
    number: "11",
    title: "Rescisão e Cancelamento de Conta",
    body: (
      <>
        <LegalP>
          11.1. Você pode encerrar sua conta a qualquer momento, mediante solicitação pelos canais de
          suporte indicados na plataforma.
        </LegalP>
        <LegalP>
          11.2. A Piepo pode suspender ou encerrar contas que violem estes Termos, mediante notificação
          prévia sempre que possível, exceto em casos de violação grave ou risco à segurança da plataforma
          ou de terceiros.
        </LegalP>
        <LegalP>
          11.3. Após o encerramento da conta, os dados serão tratados conforme os prazos de retenção
          descritos na Política de Privacidade.
        </LegalP>
      </>
    ),
  },
  {
    id: "alteracoes",
    number: "12",
    title: "Alterações nestes Termos",
    body: (
      <LegalP>
        Podemos atualizar estes Termos periodicamente. Alterações relevantes serão comunicadas com
        antecedência razoável pelos canais de contato cadastrados ou por aviso na plataforma. O uso
        continuado da Piepo após a vigência das alterações constitui aceite dos novos Termos.
      </LegalP>
    ),
  },
  {
    id: "foro",
    number: "13",
    title: "Legislação Aplicável e Foro",
    body: (
      <LegalP>
        Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da
        comarca de <Placeholder>comarca</Placeholder> para dirimir quaisquer controvérsias decorrentes
        destes Termos, com renúncia a qualquer outro, por mais privilegiado que seja.
      </LegalP>
    ),
  },
  {
    id: "contato",
    number: "14",
    title: "Contato",
    body: (
      <LegalP>
        Dúvidas sobre estes Termos podem ser enviadas para <Placeholder>e-mail de contato</Placeholder>.
      </LegalP>
    ),
  },
];
