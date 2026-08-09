import { LegalP, LegalUl, Placeholder, type LegalSection } from "./LegalArticleLayout";

/** Tabela dos dois papéis de tratamento (controlador × operador) — mesma
 *  informação da seção 1 do documento fonte, em formato de tabela. */
function RolesTable() {
  const rows = [
    {
      titular: "Profissional (você, que cria a conta)",
      finalidade: "A própria Piepo, quanto aos dados necessários para operar sua conta",
      papel: "Controladora",
    },
    {
      titular: "Paciente (cujos dados o profissional insere)",
      finalidade: "O profissional, que decide o que registrar e por quê",
      papel: "Operadora (o profissional é o controlador)",
    },
  ];
  return (
    <div className="w-full overflow-x-auto rounded-[12px] border border-[#e5e7eb]">
      <table className="w-full border-collapse font-['Geist',sans-serif] text-[14px] leading-[20px]">
        <thead>
          <tr className="bg-[#f9fafb]">
            <th className="text-left font-medium text-[#111827] px-[16px] py-[10px] border-b border-[#e5e7eb]">
              Titular dos dados
            </th>
            <th className="text-left font-medium text-[#111827] px-[16px] py-[10px] border-b border-[#e5e7eb]">
              Quem decide a finalidade do tratamento
            </th>
            <th className="text-left font-medium text-[#111827] px-[16px] py-[10px] border-b border-[#e5e7eb]">
              Papel da Piepo
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i !== rows.length - 1 ? "border-b border-[#e5e7eb]" : ""}>
              <td className="px-[16px] py-[10px] text-[#374151] align-top">
                <strong className="text-[#111827] font-medium">{row.titular}</strong>
              </td>
              <td className="px-[16px] py-[10px] text-[#374151] align-top">{row.finalidade}</td>
              <td className="px-[16px] py-[10px] text-[#374151] align-top">{row.papel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const privacySections: LegalSection[] = [
  {
    id: "introducao",
    number: "1",
    title: "Introdução e Papéis no Tratamento de Dados",
    body: (
      <>
        <LegalP>
          Esta Política de Privacidade descreve como a Piepo ("nós", "plataforma") coleta, usa, armazena e
          protege dados pessoais no contexto da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 —
          LGPD).
        </LegalP>
        <LegalP>
          A Piepo trata dois grupos distintos de dados, com papéis diferentes perante a LGPD:
        </LegalP>
        <RolesTable />
        <LegalP>
          Essa distinção importa porque, para os dados de pacientes — incluindo dados de saúde — é o
          profissional quem responde, como controlador, pela base legal de coleta e pelo consentimento do
          paciente. A Piepo processa esses dados <strong>em nome do profissional</strong>, seguindo suas
          instruções, com as medidas de segurança descritas nesta política.
        </LegalP>
      </>
    ),
  },
  {
    id: "dados-coletados",
    number: "2",
    title: "Dados que Coletamos",
    body: (
      <>
        <LegalP>
          <strong>2.1. Dados do profissional (usuário da conta)</strong>
        </LegalP>
        <LegalP>Coletados diretamente do profissional no cadastro e uso da plataforma:</LegalP>
        <LegalUl>
          <li>Nome completo, e-mail e telefone/WhatsApp;</li>
          <li>Senha (armazenada de forma criptografada, nunca em texto plano);</li>
          <li>Número de registro no Conselho Regional de Psicologia (CRP);</li>
          <li>Disponibilidade de horários de atendimento;</li>
          <li>Valor e duração padrão de sessão;</li>
          <li>
            Dados de autenticação e sessão (via Supabase Auth), incluindo data de criação da conta e
            último acesso.
          </li>
        </LegalUl>

        <LegalP>
          <strong>2.2. Dados de pacientes (inseridos pelo profissional)</strong>
        </LegalP>
        <LegalP>O profissional pode registrar, sobre seus pacientes:</LegalP>

        <LegalP>
          <strong>Dados de identificação e contato:</strong> nome completo, e-mail, telefone, data de
          nascimento, sexo, CEP, estado e cidade, nome e telefone de contato de emergência.
        </LegalP>
        <LegalP>
          <strong>Dados sensíveis de saúde</strong> (art. 5º, II, LGPD): motivo da consulta, tratamentos
          anteriores, diagnósticos prévios conhecidos, medicamentos em uso, observações clínicas
          registradas pelo profissional.
        </LegalP>
        <LegalP>
          <strong>Dados de contexto pessoal:</strong> situação profissional, com quem mora.
        </LegalP>
        <LegalP>
          <strong>Dados financeiros e de convênio:</strong> modalidade de pagamento, valor da sessão,
          frequência de atendimento, dados de plano de saúde/convênio quando aplicável (nome do plano,
          número da carteirinha, validade), forma de recebimento, política de cancelamento.
        </LegalP>
        <LegalP>
          <strong>Registro de consentimento:</strong> a plataforma registra, no momento do cadastro do
          paciente, o aceite do profissional quanto à coleta desses dados sob responsabilidade dele
          (LGPD), a data desse registro e a forma como o consentimento do paciente foi obtido (ex.:
          verbal na sessão, assinatura física, e-mail, assinatura eletrônica) — essa informação é
          preenchida pelo próprio profissional, e sua exatidão é de responsabilidade dele.
        </LegalP>

        <LegalP>
          <strong>2.3. Dados coletados automaticamente</strong>
        </LegalP>
        <LegalP>
          Dados técnicos básicos de operação (ex.: registros de acesso e erros do sistema) podem ser
          coletados para segurança e manutenção da plataforma.{" "}
          <Placeholder>
            confirmar se há ferramentas de analytics/rastreamento de uso implementadas antes de publicar
            esta seção; hoje a plataforma não implementa cookies de rastreamento de terceiros
          </Placeholder>
        </LegalP>
      </>
    ),
  },
  {
    id: "base-legal",
    number: "3",
    title: "Base Legal do Tratamento",
    body: (
      <LegalUl>
        <li>
          <strong>Dados do profissional:</strong> execução de contrato (art. 7º, V, LGPD), necessários
          para a prestação do serviço Piepo.
        </li>
        <li>
          <strong>Dados de pacientes, incluindo dados sensíveis de saúde:</strong> tratados pela Piepo
          como operadora, por instrução do profissional (controlador). A base legal para a coleta
          original desses dados — tipicamente consentimento do paciente (art. 11, I, LGPD) ou tutela da
          saúde exercida por profissional de saúde (art. 11, II, "f", LGPD) — é de responsabilidade do
          profissional, que deve garanti-la antes de inserir os dados na plataforma.
        </li>
      </LegalUl>
    ),
  },
  {
    id: "finalidade",
    number: "4",
    title: "Finalidade do Tratamento",
    body: (
      <>
        <LegalP>Utilizamos os dados coletados exclusivamente para:</LegalP>
        <LegalUl>
          <li>Permitir o cadastro, autenticação e uso da plataforma pelo profissional;</li>
          <li>Viabilizar o registro e a organização de pacientes, sessões e agenda;</li>
          <li>
            Calcular indicadores exibidos no painel (pacientes ativos, sessões agendadas, receita da
            semana);
          </li>
          <li>
            Enviar comunicações operacionais sobre a conta (ex.: confirmação de cadastro, redefinição de
            senha);
          </li>
          <li>
            Cumprir obrigações legais e responder a solicitações de autoridades competentes, quando
            exigido por lei.
          </li>
        </LegalUl>
        <LegalP>
          Não utilizamos dados de pacientes para publicidade, venda a terceiros ou qualquer finalidade
          além da operação da plataforma para o profissional responsável por aquele cadastro.
        </LegalP>
      </>
    ),
  },
  {
    id: "compartilhamento",
    number: "5",
    title: "Compartilhamento de Dados com Terceiros",
    body: (
      <>
        <LegalP>
          <strong>5.1. Infraestrutura técnica.</strong> Utilizamos os seguintes fornecedores para operar a
          Piepo, que têm acesso técnico aos dados armazenados na medida necessária à prestação de seus
          serviços:
        </LegalP>
        <LegalUl>
          <li>
            <strong>Supabase</strong> — banco de dados (PostgreSQL) e autenticação de usuários;
          </li>
          <li>
            <strong>Vercel</strong> — hospedagem da aplicação web.
          </li>
        </LegalUl>
        <LegalP>
          Esses fornecedores atuam como suboperadores, sujeitos a obrigações contratuais de
          confidencialidade e segurança da informação.
        </LegalP>
        <LegalP>
          <strong>5.2. Integrações opcionais (em desenvolvimento).</strong> Funcionalidades futuras de
          integração com Google Agenda e WhatsApp (para confirmação e cobrança de sessões) envolverão
          compartilhamento de dados limitado com esses serviços, mediante autorização explícita e
          específica do profissional no momento da conexão. Essas integrações ainda não estão disponíveis
          na plataforma.
        </LegalP>
        <LegalP>
          <strong>5.3. Não vendemos dados pessoais</strong> a terceiros para qualquer finalidade.
        </LegalP>
        <LegalP>
          <strong>5.4.</strong> Podemos compartilhar dados quando exigido por lei, ordem judicial ou
          requisição de autoridade competente.
        </LegalP>
      </>
    ),
  },
  {
    id: "armazenamento-seguranca",
    number: "6",
    title: "Armazenamento e Segurança",
    body: (
      <>
        <LegalP>
          6.1. Os dados são armazenados em banco de dados PostgreSQL hospedado pelo Supabase, com controle
          de acesso por linha (<em>Row Level Security</em>) configurado para que cada profissional acesse
          exclusivamente os dados de sua própria conta e de seus próprios pacientes.
        </LegalP>
        <LegalP>
          6.2. A comunicação entre o navegador e nossos servidores é criptografada via HTTPS/TLS.
        </LegalP>
        <LegalP>6.3. Senhas são armazenadas de forma criptografada (hash), nunca em texto plano.</LegalP>
        <LegalP>
          6.4. Apesar das medidas adotadas, nenhum sistema é absolutamente livre de riscos. Em caso de
          incidente de segurança que possa acarretar risco relevante aos titulares, seguiremos os
          procedimentos de notificação exigidos pela LGPD.
        </LegalP>
      </>
    ),
  },
  {
    id: "transferencia-internacional",
    number: "7",
    title: "Transferência Internacional de Dados",
    body: (
      <LegalP>
        <Placeholder>
          confirmar a região física de hospedagem dos servidores do Supabase e da Vercel utilizados pelo
          projeto. Caso os dados sejam processados ou armazenados fora do Brasil, esta seção deve
          detalhar o mecanismo de transferência internacional utilizado, conforme art. 33 da LGPD, e a
          adequação do país de destino
        </Placeholder>
      </LegalP>
    ),
  },
  {
    id: "retencao",
    number: "8",
    title: "Retenção e Exclusão de Dados",
    body: (
      <>
        <LegalP>
          8.1. Mantemos os dados enquanto a conta do profissional estiver ativa e pelo tempo necessário
          para cumprir as finalidades descritas nesta política.
        </LegalP>
        <LegalP>
          8.2. Após o encerramento da conta, os dados serão retidos por <Placeholder>prazo</Placeholder>{" "}
          antes da exclusão definitiva, salvo quando a retenção por prazo maior for exigida por lei (ex.:
          obrigações fiscais) ou necessária para o exercício regular de direitos em processo judicial,
          administrativo ou arbitral.
        </LegalP>
        <LegalP>
          8.3. O profissional pode solicitar a exclusão antecipada de dados de pacientes específicos a
          qualquer momento, diretamente na plataforma ou pelos canais de contato.
        </LegalP>
      </>
    ),
  },
  {
    id: "direitos-titular",
    number: "9",
    title: "Direitos do Titular",
    body: (
      <>
        <LegalP>
          Conforme o art. 18 da LGPD, o titular dos dados tem direito a solicitar, mediante requisição:
        </LegalP>
        <LegalUl>
          <li>Confirmação da existência de tratamento;</li>
          <li>Acesso aos dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade
            com a lei;
          </li>
          <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
          <li>
            Eliminação dos dados tratados com consentimento, exceto nas hipóteses de retenção legal
            previstas no art. 16 da LGPD;
          </li>
          <li>Informação sobre entidades com as quais os dados foram compartilhados;</li>
          <li>Revogação do consentimento.</li>
        </LegalUl>
        <LegalP>
          <strong>Se você é o profissional cadastrado</strong>, esses direitos podem ser exercidos
          diretamente pelos canais de contato desta política.
        </LegalP>
        <LegalP>
          <strong>Se você é paciente de um profissional que utiliza a Piepo</strong>, o profissional que
          atende você é o controlador responsável pelos seus dados nesta plataforma — o pedido deve ser
          dirigido a ele em primeiro lugar. A Piepo, como operadora, apoiará o profissional no atendimento
          a essas solicitações sempre que tecnicamente possível.
        </LegalP>
      </>
    ),
  },
  {
    id: "cookies",
    number: "10",
    title: "Cookies e Tecnologias Similares",
    body: (
      <LegalP>
        <Placeholder>
          hoje a plataforma não implementa cookies de rastreamento de terceiros ou ferramentas de
          analytics. Esta seção deve ser atualizada caso isso mude antes da publicação
        </Placeholder>{" "}
        Utilizamos apenas os mecanismos técnicos necessários para manter sua sessão autenticada (ex.:
        tokens de autenticação armazenados localmente no navegador).
      </LegalP>
    ),
  },
  {
    id: "encarregado",
    number: "11",
    title: "Encarregado de Proteção de Dados (DPO)",
    body: (
      <LegalP>
        Em conformidade com o art. 41 da LGPD, o Encarregado de Proteção de Dados da Piepo pode ser
        contatado em: <Placeholder>nome e e-mail do Encarregado/DPO</Placeholder>.
      </LegalP>
    ),
  },
  {
    id: "alteracoes",
    number: "12",
    title: "Alterações desta Política",
    body: (
      <LegalP>
        Podemos atualizar esta Política periodicamente para refletir mudanças na plataforma ou na
        legislação aplicável. Alterações relevantes serão comunicadas com antecedência razoável pelos
        canais de contato cadastrados ou por aviso na plataforma.
      </LegalP>
    ),
  },
  {
    id: "contato",
    number: "13",
    title: "Contato",
    body: (
      <LegalP>
        Dúvidas, solicitações ou reclamações relacionadas a esta Política podem ser encaminhadas para{" "}
        <Placeholder>e-mail de contato/privacidade</Placeholder>.
      </LegalP>
    ),
  },
];
