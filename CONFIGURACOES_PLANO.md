# Configurações — levantamento e planejamento

> Documento de produto/design. Sem código.
> Base: leitura do código em 10/08/2026 (commit `66f6e15`).

---

# Fase 1 — Levantamento

## 1.1 Configurações que já existem, espalhadas

| Onde | O que configura | Persiste em |
|---|---|---|
| **Onboarding** (3 passos) | CRP, disponibilidade semanal, valor padrão da sessão, duração padrão | `profiles` |
| **Modal da engrenagem na Agenda** | Disponibilidade semanal | `profiles.availability` |
| **Cadastro de paciente**, passo 3 | Modalidade de pagamento, valor, frequência, forma de recebimento, quando cobrar, política de cancelamento, dados do convênio | `patients.billing_info` (jsonb) |
| **Cadastro de paciente**, passo 4 | Aceite LGPD, responsabilidade pela guarda, data e forma do consentimento | `patients.lgpd_accepted`, `resp_accepted`, `consent_date`, `consent_method` |
| **Sidebar** (rodapé) | Nada — só exibe nome/e-mail e oferece Suporte/Sair | — |

O onboarding é hoje **a única forma de definir** CRP, valor e duração padrão. Depois de concluído,
não há interface para alterá-los — só a disponibilidade ganhou edição, e há poucos dias.

## 1.2 Campos no schema sem interface

Tabelas existentes: `profiles`, `patients`, `sessions`, `patient_records`.

**`profiles`**

| Campo | Situação |
|---|---|
| `full_name` | Vem do cadastro, exibido na sidebar, **não editável** |
| `email` | Duplicado de `auth.users`, **não editável** |
| `phone` | Gravado no cadastro por trigger, **nunca exibido nem editável** |
| `crp` | Só no onboarding, sem edição posterior |
| `default_session_price` | Só no onboarding, sem edição — **e sem leitura** (ver 1.3) |
| `default_session_duration` | Idem |
| `availability` | Editável pela engrenagem da Agenda |
| `onboarding_completed_at` | Controle interno, correto não expor |

**`patients.billing_info`** — `politicaCancelamento` é coletada no cadastro e não aparece em
nenhuma tela depois. Não achei consumo em lugar nenhum.

## 1.3 Decisões hardcoded que deveriam ser configuráveis

**O caso mais grave:** o onboarding pergunta valor e duração padrão da sessão, grava em `profiles`,
e **nada lê esses campos**. O `NewSessionModal` usa `useState("220")` e `useState("50")` fixos, e
sequer importa `useAuth`. Confirmei por busca: `defaultSessionPrice` e `defaultSessionDuration`
aparecem apenas em `profile.ts` (mapeamento) e no `OnboardingPage` (escrita). A promessa feita no
onboarding — *"Usado como sugestão ao agendar"* — não se cumpre.

Demais valores fixos:

| Valor | Onde | Observação |
|---|---|---|
| Durações `30/50/60/90` | `NewSessionModal`, `StepSession` | Lista duplicada em dois arquivos |
| Recorrências `Única…Mensal` | `NewSessionModal` | |
| Formas de recebimento `PIX, Cartão, Boleto, Dinheiro` | `NewPatientModal` | |
| Quando cobrar `Antes da sessão, No dia, Após a sessão, Mensal` | `NewPatientModal` | |
| Frequências `1x por semana…` | `NewPatientModal` | |
| Link de reunião | `generateMeetLink()` | **Gera link falso e aleatório** do Meet — não há integração |
| Volume do som `0.6` | `lib/sound.ts` | `setSoundEnabled` existe e **nunca é chamado** |
| Moeda `R$` | Vários | Formatação manual `toFixed(2).replace(".", ",")` |
| Notificações do sino | `Topbar` | Ainda vêm de `mockData` |

A grade de horários da agenda **deixou** de ser hardcoded — agora vem de `availability`.

## 1.4 Autenticação e perfil

- Supabase Auth, e-mail + senha. Botão do Google existe no login mas está desabilitado.
- `AuthProvider` expõe `signUp`, `signIn`, `signOut`, `resetPassword`, `updatePassword`.
- `updatePassword` **já existe** e só é usado no fluxo de recuperação por e-mail. Não há tela de
  trocar senha estando logado.
- Não existe: alterar e-mail, sessões ativas, 2FA, excluir conta.
- `profiles` é criada por trigger `handle_new_user` no cadastro.
- RLS por `owner_id = auth.uid()` em `patients`, `sessions`, `patient_records`.

## 1.5 Estrutura de settings iniciada

**Nenhuma.** Sem rota, sem componente, sem tabela.

E há um bug ativo: a sidebar lista **Configurações → `/configuracoes`**, rota que não existe.
Clicar cai no error boundary do React Router. O mesmo vale para **Suporte → `/suporte`**, no
dropdown do perfil. (O item Financeiro está correto: desabilitado com selo "Em breve".)

---

# Fase 2 — Planejamento

## 2.1 Arquitetura de informação

```
Configurações
│
├── Perfil profissional
│   ├── Nome completo
│   ├── CRP
│   ├── WhatsApp
│   └── E-mail (leitura; alteração vive em Conta)
│
├── Atendimento
│   ├── Disponibilidade semanal        ← move o modal da engrenagem
│   ├── Duração padrão da sessão
│   └── Modalidade padrão
│
├── Valores e cobrança
│   ├── Valor padrão da sessão
│   ├── Formas de recebimento aceitas
│   ├── Quando costuma cobrar
│   └── Política de cancelamento (texto padrão)
│
├── Comunicação                        ← depende do módulo de WhatsApp
│   ├── Lembrete de sessão
│   ├── Confirmação automática
│   └── Modelos de mensagem
│
├── Conta e segurança
│   ├── E-mail de acesso
│   ├── Senha
│   └── Sessões ativas
│
└── Privacidade e dados
    ├── Exportar meus dados
    ├── Guarda de prontuários (informativo)
    ├── Termos de Uso e Política de Privacidade (links)
    └── Encerrar conta
```

**Racional de cada grupo**

**Perfil profissional** — quem você é perante o paciente e o Conselho. Muda raramente, mas é o
primeiro lugar onde alguém confere se está na conta certa. Fica curto de propósito.

**Atendimento** — tudo que molda a agenda. Agrupado porque são decisões tomadas juntas: quem muda
horário costuma revisar duração na mesma sessão de trabalho.

**Valores e cobrança** — os *padrões* do consultório, que o cadastro de cada paciente pode
sobrescrever. Separado de Atendimento porque muda por outro motivo (reajuste anual, mudança de
política) e em outra frequência.

**Comunicação** — separado porque o gatilho é diferente: o psicólogo mexe aqui quando algo
incomodou o paciente, não quando está organizando a própria agenda.

**Conta e segurança** — credenciais de acesso, não do consultório. Convenção forte o suficiente
para que procurar "trocar senha" em outro lugar seja estranho.

**Privacidade e dados** — obrigações legais e ações irreversíveis. No fim por dois motivos: é
consultado raramente, e distância física dos controles rotineiros reduz clique acidental.

### O que NÃO deve entrar em Configurações

| Item | Por quê |
|---|---|
| Valor/frequência/forma de pagamento **de um paciente** | Já vivem no cadastro dele. Duplicar cria duas fontes de verdade e a dúvida "qual vale?". Configurações define o padrão; o paciente sobrescreve. |
| Conteúdo dos Termos e da Política | São páginas públicas (`/termos`, `/privacidade`). Entram como link. |
| Onboarding | É fluxo de entrada, não configuração. Reabri-lo confundiria. |
| Histórico de notificações | Evento, não preferência. A *preferência* de o que notificar é config; a lista não. |
| Relatórios e fechamento financeiro | Módulo próprio. Configuração define regra, não consulta resultado. |
| Tema, densidade, idioma | Não existem e não deveriam ser inventados no MVP. A paleta e a escala tipográfica são travadas de propósito, e o produto é só pt-BR. Criar o controle obriga a manter duas versões de tudo. |
| Exportar o prontuário **de um paciente** | Pertence à tela daquele paciente, onde o contexto existe. Configurações leva só a exportação global. |

## 2.2 Hierarquia e navegação

**Recomendação: página única, seções empilhadas, com índice lateral fixo à esquerda.**

Descartei as alternativas assim:

**Abas** — com 6 seções e 2 a 4 campos cada, cada aba abriria quase vazia. Abas escondem conteúdo e
cobram um clique para descobrir onde algo está; para um usuário com pouca familiaridade, "procurar
em qual aba está" é exatamente o atrito a evitar.

**Páginas separadas** — mesma objeção, com custo de navegação maior e URL para cada coisa. Faz
sentido quando cada seção é densa. Não é o caso.

**Acordeão** — some com tudo por padrão. Para uma tela consultada raramente, o usuário precisa
*varrer* para lembrar o que existe.

**Página única com índice** — tudo descoberto rolando, zero clique para achar, e o índice dá o mapa.
Já existe esse padrão no código (`LegalArticleLayout`, com índice fixo e scroll-spy), então há o que
reaproveitar. Em telas estreitas o índice vira uma barra horizontal de atalhos no topo, ou some — as
seções continuam acessíveis por rolagem, que é o comportamento nativo.

Ressalva honesta: o app hoje é desktop-first — a sidebar é `fixed w-[280px]` sem tratamento mobile.
Antes de otimizar Configurações para celular, vale decidir se o produto terá versão mobile.

**Ordem das seções**

1. **Perfil profissional** — não por frequência, mas por ser curto e confirmar contexto. Funciona
   como cabeçalho da página.
2. **Atendimento** — junto com Valores, o motivo mais comum de abrir esta tela.
3. **Valores e cobrança**
4. **Comunicação** — quando existir.
5. **Conta e segurança** — procurado quando procurado; ninguém "passa por acaso".
6. **Privacidade e dados** — raro e destrutivo, por último.

## 2.3 Detalhamento por seção

### Perfil profissional

| Campo | Controle | Padrão | Label (pt-BR) | Texto de apoio |
|---|---|---|---|---|
| `full_name` | Input texto | do cadastro | Nome completo | Aparece nos seus registros e nas mensagens enviadas aos pacientes. |
| `crp` | Input com máscara `00/000000` | do onboarding | Número do CRP | Como aparece na sua carteira profissional. |
| `phone` | Input com máscara | do cadastro | WhatsApp | Usado para falarmos com você. Não é o número mostrado aos pacientes. |
| `email` | Texto (leitura) | do cadastro | E-mail | Para trocar, vá em Conta e segurança. |

### Atendimento

| Campo | Controle | Padrão | Label (pt-BR) | Texto de apoio |
|---|---|---|---|---|
| `availability` | Editor de dias (o do onboarding) | Seg–sex, 08:00–18:00 | Dias e horários de atendimento | A agenda mostra apenas esta faixa. Fora dela não é possível agendar. |
| `default_session_duration` | Select | 50 minutos | Duração padrão da sessão | Sugerida ao criar uma sessão. Você pode mudar em cada uma. |
| `modalidade_padrao` *(campo novo)* | Segmentado: Online / Presencial | Online | Modalidade padrão | Vem preenchida ao agendar. |

### Valores e cobrança

| Campo | Controle | Padrão | Label (pt-BR) | Texto de apoio |
|---|---|---|---|---|
| `default_session_price` | Input numérico com prefixo R$ | vazio | Valor padrão da sessão | Sugerido ao agendar. Não altera sessões já criadas. |
| `formas_recebimento` *(novo)* | Chips múltipla escolha | PIX | Formas de recebimento que você aceita | Aparecem como opção ao cadastrar um paciente. |
| `quando_cobrar` *(novo)* | Select | Antes da sessão | Quando você costuma cobrar | Só um padrão; cada paciente pode ter o seu. |
| `politica_cancelamento` *(novo)* | Textarea | vazio | Política de cancelamento | Texto que você combina com o paciente. Fica visível no cadastro dele. |

### Comunicação *(v3 — depende do módulo)*

| Campo | Controle | Padrão | Label (pt-BR) | Texto de apoio |
|---|---|---|---|---|
| `lembrete_ativo` | Toggle | Desligado | Enviar lembrete antes da sessão | O paciente recebe uma mensagem no WhatsApp. |
| `lembrete_antecedencia` | Select | 24 horas | Enviar com quanta antecedência | |
| `template_lembrete` | Textarea com variáveis | modelo pronto | Texto do lembrete | Use `{paciente}`, `{data}` e `{horário}` para preencher automaticamente. |

### Conta e segurança

| Campo | Controle | Padrão | Label (pt-BR) | Texto de apoio |
|---|---|---|---|---|
| E-mail | Input + fluxo de confirmação | atual | E-mail de acesso | Você precisa confirmar o novo endereço antes da troca valer. |
| Senha | Botão → formulário | — | Senha | Recomendamos ao menos 8 caracteres. |
| Sessões ativas *(v3)* | Lista + botão encerrar | — | Aparelhos conectados | Encerre o acesso em aparelhos que não são seus. |

### Privacidade e dados

| Campo | Controle | Padrão | Label (pt-BR) | Texto de apoio |
|---|---|---|---|---|
| Exportar dados | Botão | — | Baixar meus dados | Um arquivo com seus pacientes, sessões e registros de prontuário. |
| Guarda de prontuários | Texto informativo | — | Guarda dos prontuários | *(verificar prazo — ver 2.6)* |
| Documentos | Dois links | — | Termos de Uso · Política de Privacidade | |
| Encerrar conta | Botão destrutivo | — | Encerrar minha conta | Esta ação não pode ser desfeita. |

## 2.4 Comportamento de salvamento

**Recomendação: salvar por seção.** Cada bloco tem seu próprio botão, desabilitado enquanto nada
mudou.

Por que não **autosave**: estes campos mexem em dinheiro e agenda. Gravar "valor: 22" enquanto o
usuário ainda digita "220" é um erro caro e silencioso, e não há desfazer. Autosave serve para
conteúdo que o usuário reconhece de imediato — o texto de uma evolução, por exemplo. Não para
parâmetros.

Por que não **salvar global**: um botão único no fim de uma página longa esconde o que está
pendente, e um erro numa seção trava o salvamento das outras.

**Exceção:** toggles booleanos salvam na hora. Não têm estado parcial e são reversíveis com o mesmo
gesto.

| Situação | Comportamento |
|---|---|
| Sucesso | Toast curto ("Alterações salvas") e o botão volta a desabilitado. Sem modal. |
| Erro de validação | Mensagem sob o campo, em vermelho, sem toast. O botão fica bloqueado. |
| Erro de rede | Toast de erro e **o texto editado permanece na tela**. Nunca descartar o que foi digitado. |
| Sair com alterações não salvas | Confirmação bloqueando a navegação, só se a seção estiver suja. "Você tem alterações não salvas em *Valores e cobrança*. Sair mesmo assim?" |
| Reautenticação | Trocar e-mail, trocar senha e encerrar conta pedem a senha atual antes de confirmar. *(verificar o que o Supabase já exige por padrão)* |

## 2.5 Ações sensíveis

**Encerrar conta.** Recomendo **não** oferecer exclusão imediata em v1. Hoje `patients` tem
`on delete cascade`, então apagar a conta apagaria prontuários — que têm prazo legal de guarda
(2.6). Com poucos usuários e onboarding manual, o certo é **"Solicitar encerramento"**, que abre
contato com o suporte e permite tratar a guarda caso a caso. Fluxo: confirmação com o usuário
**digitando o próprio e-mail** (não só "tenho certeza"), aviso explícito de que prontuários têm
prazo legal e não são apagados junto, e prazo de resposta. Irreversível quando executado.

**Exportar prontuários.** A exportação global (todos os pacientes) vive aqui. A de um paciente
específico vive no prontuário dele, onde o contexto existe. Em v1, aceitável ser assíncrona:
"Preparamos o arquivo e enviamos para o seu e-mail". *(verificar prazo legal de resposta a pedido
de titular.)*

**Revogar acesso.** Encerrar sessões em outros aparelhos é reversível — basta entrar de novo.
Confirmação simples, sem digitar nada.

**Dados que afetam registros passados.** Regra geral: **nada em Configurações reescreve o passado.**
Mudar o valor padrão não altera sessões já criadas; mudar a disponibilidade não apaga sessões fora
da nova faixa. Isso precisa estar no texto de apoio, não só no comportamento — "Não altera sessões
já criadas" evita o medo que trava o usuário.

Um caso que merece atenção: **reduzir a disponibilidade** com sessões já agendadas fora da nova
faixa. Elas devem continuar visíveis e editáveis. Vale um aviso no momento de salvar: "Há 3 sessões
agendadas fora do novo horário. Elas continuam na agenda."

## 2.6 Camada regulatória

Marquei como **verificar** tudo que eu não consigo afirmar com segurança. Não vale chutar prazo
em cima de obrigação legal.

| Exigência | Onde se manifesta | Confiança |
|---|---|---|
| **LGPD art. 18** — titular tem direito a acesso, correção, portabilidade e eliminação | O titular aqui é **o paciente**, e o controlador é **o psicólogo**. Logo, o Piepo precisa dar ao psicólogo meios de *responder* a esses pedidos: exportar e excluir os dados de um paciente. Isso mora no prontuário do paciente, não em Configurações. | Alta |
| **Piepo é operador, não controlador**, dos dados de paciente | Já está escrito na Política de Privacidade. Em Configurações aparece como link, e como contato do Encarregado do Piepo. | Alta — já documentado |
| **Consentimento do paciente** | Já é coletado no cadastro (`lgpd_accepted`, `consent_date`, `consent_method`). Configurações não precisa duplicar. | Alta — já implementado |
| **CFP Res. 001/2009** — registro documental / prontuário psicológico | Texto informativo em Privacidade e dados, explicando que prontuários não são apagados junto com a conta. | Média — a resolução existe e trata disso |
| **Prazo mínimo de guarda do prontuário** | Texto informativo e regra de exclusão de conta | **Verificar.** Circula amplamente o número de 5 anos, mas não vou afirmar prazo sem vocês confirmarem com o(a) advogado(a). É o mesmo `[DEFINIR]` que já ficou pendente na Política de Privacidade. |
| **Prazo de resposta a pedido de titular** | Copy da exportação ("enviamos em até X dias") | **Verificar** |
| **Encarregado / DPO do Piepo** | Contato exibido em Privacidade e dados | **Verificar** — ainda é `[DEFINIR]` na Política |

Observação de arquitetura que vale mais que qualquer copy: **excluir paciente hoje apaga em cascata
todo o histórico**, incluindo `patient_records`. Isso colide de frente com prazo de guarda. Já
sinalizei no plano do prontuário e continua valendo — provavelmente deve virar arquivamento, não
exclusão.

## 2.7 Faseamento

### v1 — o mínimo para os próximos onboardings

1. **Criar a rota `/configuracoes`** (fecha o 404 ativo da sidebar)
2. **Perfil profissional**: nome, CRP, WhatsApp
3. **Atendimento**: disponibilidade (mover o modal da engrenagem para cá, mantendo o atalho na
   agenda) + duração padrão
4. **Valores**: valor padrão da sessão
5. **Conta**: alterar senha (o `updatePassword` já existe)
6. **Privacidade**: links para Termos e Política + encerramento via suporte

**Corte justificado:** v1 é *tornar editável o que o onboarding já grava*. Hoje, quem erra o CRP ou
o valor fica preso sem passar por SQL. Nada aqui exige coluna nova — só `modalidade_padrao` ficaria
de fora por isso, e ela pode esperar.

**Pré-requisito que não é da tela:** fazer o `NewSessionModal` ler `default_session_price` e
`default_session_duration`. Sem isso, Configurações vai oferecer um campo que continua não
funcionando — e aí o problema deixa de ser invisível e passa a ser uma acusação contra a tela nova.

### v2

- Formas de recebimento, quando cobrar, política de cancelamento *(colunas novas)*
- Modalidade padrão
- Alterar e-mail
- Exportação real dos dados
- Preferência de sons (o `setSoundEnabled` já existe e nunca foi ligado)

### Depois

- Comunicação / WhatsApp — bloqueado pelo módulo não existir
- Sessões ativas, 2FA
- Encerramento de conta self-service — só depois de resolver arquivamento vs. exclusão
- Clínica com múltiplos profissionais — mudaria a arquitetura inteira desta tela

---

## Perguntas em aberto

1. **Prazo de guarda de prontuário** que vocês vão adotar. Trava a copy de Privacidade e a regra de
   encerramento de conta.
2. **Encerramento de conta**: self-service ou via suporte no MVP? Recomendei suporte, mas é decisão
   de produto.
3. **Alterar e-mail de acesso** deve ser permitido? Não afeta RLS (que usa `id`), mas muda login.
4. **Especialidade / abordagem** no perfil: lista fechada ou texto livre? Não incluí em v1 por não
   saber se é usada em algum lugar.
5. **Múltiplos profissionais** na mesma conta está no horizonte? Se sim, muda a divisão entre
   "consultório" e "profissional" desde já.
6. **Só BRL?** Toda a formatação assume real.
7. **Google OAuth** vai existir? O botão está no login, desabilitado. Se existir, "Conta e
   segurança" precisa mostrar as formas de acesso vinculadas.
8. **Link do Meet**: hoje é gerado falso e aleatório. Vai haver integração real, ou o campo deve
   virar "cole aqui o link da sua sala"? Isso muda o que entra em Atendimento.
