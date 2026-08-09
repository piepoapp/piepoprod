# Política de Privacidade — Piepo

> **⚠️ AVISO IMPORTANTE — LEIA ANTES DE PUBLICAR**
>
> Este documento é uma **minuta de trabalho**, escrita com base nos dados que a Piepo
> efetivamente coleta e nos serviços de infraestrutura que efetivamente utiliza hoje.
> **Não é aconselhamento jurídico e não foi revisado por um advogado.** A Piepo trata
> **dados sensíveis de saúde** (art. 5º, II e art. 11 da LGPD), o que exige requisitos
> legais mais rigorosos do que dados pessoais comuns. Antes de publicar este texto,
> um advogado especializado em LGPD e, se possível, em direito da saúde, deve revisar
> integralmente o conteúdo — em especial as seções de base legal, retenção e
> transferência internacional de dados.
>
> Pontos que precisam de definição, marcados como `[DEFINIR]`:
> - Razão social, CNPJ, endereço da empresa e dados de contato do Encarregado (DPO).
> - Confirmação da região de hospedagem dos dados no Supabase/Vercel (impacta a seção
>   de transferência internacional).
> - Prazos exatos de retenção de dados após exclusão de conta.

**Última atualização:** `[DEFINIR — data de publicação]`

---

## 1. Introdução e Papéis no Tratamento de Dados

Esta Política de Privacidade descreve como a Piepo ("nós", "plataforma") coleta, usa,
armazena e protege dados pessoais no contexto da Lei Geral de Proteção de Dados
(Lei nº 13.709/2018 — LGPD).

A Piepo trata dois grupos distintos de dados, com papéis diferentes perante a LGPD:

| Titular dos dados | Quem decide a finalidade do tratamento | Papel da Piepo |
|---|---|---|
| **Profissional** (você, que cria a conta) | A própria Piepo, quanto aos dados necessários para operar sua conta | **Controladora** |
| **Paciente** (cujos dados o profissional insere) | O profissional, que decide o que registrar e por quê | **Operadora** (o profissional é o **controlador**) |

Essa distinção importa porque, para os dados de pacientes — incluindo dados de saúde —
é o profissional quem responde, como controlador, pela base legal de coleta e pelo
consentimento do paciente. A Piepo processa esses dados **em nome do profissional**,
seguindo suas instruções, com as medidas de segurança descritas nesta política.

## 2. Dados que Coletamos

### 2.1. Dados do profissional (usuário da conta)

Coletados diretamente do profissional no cadastro e uso da plataforma:

- Nome completo, e-mail e telefone/WhatsApp;
- Senha (armazenada de forma criptografada, nunca em texto plano);
- Número de registro no Conselho Regional de Psicologia (CRP);
- Disponibilidade de horários de atendimento;
- Valor e duração padrão de sessão;
- Dados de autenticação e sessão (via Supabase Auth), incluindo data de criação da
  conta e último acesso.

### 2.2. Dados de pacientes (inseridos pelo profissional)

O profissional pode registrar, sobre seus pacientes:

**Dados de identificação e contato:**
Nome completo, e-mail, telefone, data de nascimento, sexo, CEP, estado e cidade,
nome e telefone de contato de emergência.

**Dados sensíveis de saúde** (art. 5º, II, LGPD):
Motivo da consulta, tratamentos anteriores, diagnósticos prévios conhecidos,
medicamentos em uso, observações clínicas registradas pelo profissional.

**Dados de contexto pessoal:**
Situação profissional, com quem mora.

**Dados financeiros e de convênio:**
Modalidade de pagamento, valor da sessão, frequência de atendimento, dados de plano de
saúde/convênio quando aplicável (nome do plano, número da carteirinha, validade),
forma de recebimento, política de cancelamento.

**Registro de consentimento:**
A plataforma registra, no momento do cadastro do paciente, o aceite do profissional
quanto à coleta desses dados sob responsabilidade dele (LGPD), a data desse registro e
a forma como o consentimento do paciente foi obtido (ex.: verbal na sessão, assinatura
física, e-mail, assinatura eletrônica) — essa informação é preenchida pelo próprio
profissional, e sua exatidão é de responsabilidade dele.

### 2.3. Dados coletados automaticamente

Dados técnicos básicos de operação (ex.: registros de acesso e erros do sistema)
podem ser coletados para segurança e manutenção da plataforma. `[DEFINIR — confirmar
se há ferramentas de analytics/rastreamento de uso implementadas antes de publicar
esta seção; hoje a plataforma não implementa cookies de rastreamento de terceiros.]`

## 3. Base Legal do Tratamento

- **Dados do profissional:** execução de contrato (art. 7º, V, LGPD), necessários para
  a prestação do serviço Piepo.
- **Dados de pacientes, incluindo dados sensíveis de saúde:** tratados pela Piepo como
  operadora, por instrução do profissional (controlador). A base legal para a coleta
  original desses dados — tipicamente consentimento do paciente (art. 11, I, LGPD) ou
  tutela da saúde exercida por profissional de saúde (art. 11, II, "f", LGPD) — é de
  responsabilidade do profissional, que deve garanti-la antes de inserir os dados na
  plataforma.

## 4. Finalidade do Tratamento

Utilizamos os dados coletados exclusivamente para:

- Permitir o cadastro, autenticação e uso da plataforma pelo profissional;
- Viabilizar o registro e a organização de pacientes, sessões e agenda;
- Calcular indicadores exibidos no painel (pacientes ativos, sessões agendadas,
  receita da semana);
- Enviar comunicações operacionais sobre a conta (ex.: confirmação de cadastro,
  redefinição de senha);
- Cumprir obrigações legais e responder a solicitações de autoridades competentes,
  quando exigido por lei.

Não utilizamos dados de pacientes para publicidade, venda a terceiros ou qualquer
finalidade além da operação da plataforma para o profissional responsável por aquele
cadastro.

## 5. Compartilhamento de Dados com Terceiros

5.1. **Infraestrutura técnica.** Utilizamos os seguintes fornecedores para operar a
Piepo, que têm acesso técnico aos dados armazenados na medida necessária à prestação
de seus serviços:

- **Supabase** — banco de dados (PostgreSQL) e autenticação de usuários;
- **Vercel** — hospedagem da aplicação web.

Esses fornecedores atuam como suboperadores, sujeitos a obrigações contratuais de
confidencialidade e segurança da informação.

5.2. **Integrações opcionais (em desenvolvimento).** Funcionalidades futuras de
integração com Google Agenda e WhatsApp (para confirmação e cobrança de sessões)
envolverão compartilhamento de dados limitado com esses serviços, mediante
autorização explícita e específica do profissional no momento da conexão. Essas
integrações ainda não estão disponíveis na plataforma.

5.3. **Não vendemos dados pessoais** a terceiros para qualquer finalidade.

5.4. Podemos compartilhar dados quando exigido por lei, ordem judicial ou requisição
de autoridade competente.

## 6. Armazenamento e Segurança

6.1. Os dados são armazenados em banco de dados PostgreSQL hospedado pelo Supabase,
com controle de acesso por linha (*Row Level Security*) configurado para que cada
profissional acesse exclusivamente os dados de sua própria conta e de seus próprios
pacientes.

6.2. A comunicação entre o navegador e nossos servidores é criptografada via HTTPS/TLS.

6.3. Senhas são armazenadas de forma criptografada (hash), nunca em texto plano.

6.4. Apesar das medidas adotadas, nenhum sistema é absolutamente livre de riscos.
Em caso de incidente de segurança que possa acarretar risco relevante aos titulares,
seguiremos os procedimentos de notificação exigidos pela LGPD.

## 7. Transferência Internacional de Dados

`[DEFINIR — confirmar a região física de hospedagem dos servidores do Supabase e da
Vercel utilizados pelo projeto. Caso os dados sejam processados ou armazenados fora do
Brasil, esta seção deve detalhar o mecanismo de transferência internacional utilizado,
conforme art. 33 da LGPD, e a adequação do país de destino.]`

## 8. Retenção e Exclusão de Dados

8.1. Mantemos os dados enquanto a conta do profissional estiver ativa e pelo tempo
necessário para cumprir as finalidades descritas nesta política.

8.2. Após o encerramento da conta, os dados serão retidos por `[DEFINIR — prazo]`
antes da exclusão definitiva, salvo quando a retenção por prazo maior for exigida por
lei (ex.: obrigações fiscais) ou necessária para o exercício regular de direitos em
processo judicial, administrativo ou arbitral.

8.3. O profissional pode solicitar a exclusão antecipada de dados de pacientes
específicos a qualquer momento, diretamente na plataforma ou pelos canais de contato.

## 9. Direitos do Titular

Conforme o art. 18 da LGPD, o titular dos dados tem direito a solicitar, mediante
requisição:

- Confirmação da existência de tratamento;
- Acesso aos dados;
- Correção de dados incompletos, inexatos ou desatualizados;
- Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em
  desconformidade com a lei;
- Portabilidade dos dados a outro fornecedor de serviço;
- Eliminação dos dados tratados com consentimento, exceto nas hipóteses de retenção
  legal previstas no art. 16 da LGPD;
- Informação sobre entidades com as quais os dados foram compartilhados;
- Revogação do consentimento.

**Se você é o profissional cadastrado**, esses direitos podem ser exercidos
diretamente pelos canais de contato desta política.

**Se você é paciente de um profissional que utiliza a Piepo**, o profissional que
atende você é o controlador responsável pelos seus dados nesta plataforma — o pedido
deve ser dirigido a ele em primeiro lugar. A Piepo, como operadora, apoiará o
profissional no atendimento a essas solicitações sempre que tecnicamente possível.

## 10. Cookies e Tecnologias Similares

`[DEFINIR — hoje a plataforma não implementa cookies de rastreamento de terceiros ou
ferramentas de analytics. Esta seção deve ser atualizada caso isso mude antes da
publicação.]` Utilizamos apenas os mecanismos técnicos necessários para manter sua
sessão autenticada (ex.: tokens de autenticação armazenados localmente no navegador).

## 11. Encarregado de Proteção de Dados (DPO)

Em conformidade com o art. 41 da LGPD, o Encarregado de Proteção de Dados da Piepo
pode ser contatado em: `[DEFINIR — nome e e-mail do Encarregado/DPO]`.

## 12. Alterações desta Política

Podemos atualizar esta Política periodicamente para refletir mudanças na plataforma ou
na legislação aplicável. Alterações relevantes serão comunicadas com antecedência
razoável pelos canais de contato cadastrados ou por aviso na plataforma.

## 13. Contato

Dúvidas, solicitações ou reclamações relacionadas a esta Política podem ser
encaminhadas para `[DEFINIR — e-mail de contato/privacidade]`.

---

*Este documento foi gerado como ponto de partida para revisão jurídica e não deve ser
publicado como versão final sem validação por advogado(a) habilitado(a), especialmente
quanto ao tratamento de dados sensíveis de saúde.*
