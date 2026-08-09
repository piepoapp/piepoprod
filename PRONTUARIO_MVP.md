# Prontuário — planejamento de MVP

> Documento de produto/design. Não é implementação.
> Base: análise do código atual (`patients`, `sessions`, `NewPatientModal`, `PatientsPage`, `AgendaPage`).

---

## Parte 1 — Análise crítica antes de desenhar

### 1.1 O prontuário não é uma tela nova. É a tela de paciente que já falta.

Hoje o app tem um `PatientDetailPanel` (drawer de 480px em `PatientsPage.tsx:73`) que já mostra
contato, contadores de sessão, modalidade e observações. E o `NewPatientModal` já tem um botão
"Abrir prontuário" com `// TODO: apontar para /pacientes/:id/prontuario quando a rota existir`
(`NewPatientModal.tsx:167`).

Se criarmos uma rota `/pacientes/:id/prontuario` separada, passamos a ter **duas superfícies
concorrentes** para a mesma entidade: um drawer com dados do paciente e uma página com o prontuário.
Isso vai gerar divergência de conteúdo e a pergunta "onde eu vejo X?" toda vez.

**Recomendação:** promover o drawer a página real em **`/pacientes/:id`**, e o prontuário é o
conteúdo principal dessa página. Uma entidade, uma URL, um lugar.

**Trade-off:** perde-se o "espiar rápido sem sair da lista" do drawer. Aceitável — na prática o
psicólogo abre o paciente para *trabalhar*, não para espiar. E ganhar URL compartilhável/favoritável
vale mais no dia a dia. Se sentirmos falta, um hover card na tabela resolve depois.

### 1.2 Do ponto de vista regulatório, falta pouca coisa — e é sempre a mesma coisa

A Resolução CFP nº 001/2009 estrutura o registro documental em quatro blocos:

| Bloco | Existe hoje? | Onde |
|---|---|---|
| Identificação do usuário | ✅ Completo | `patients` (nome, nascimento, contato, endereço, emergência) |
| Avaliação de demanda / anamnese | ✅ Completo | `patients.clinical_info` (motivo, tratamentos anteriores, diagnósticos, medicação, contexto de vida) |
| **Registro da evolução** | ❌ **Não existe** | — |
| Encerramento / encaminhamento | ❌ Não existe | — |

Ou seja: **75% do prontuário já foi coletado no cadastro.** O que falta é o registro por sessão.

Isso muda completamente o escopo do MVP. O prontuário **não é um formulário grande**: é uma
**timeline de evoluções** montada em cima de dados que já temos, com **uma única ação de escrita**.

### 1.3 O maior risco de UX não é a tela — é o lugar onde se escreve

O psicólogo termina a sessão às 15h50 e a próxima começa às 16h. Ele tem 5 minutos.

Se o fluxo for `Pacientes → buscar → abrir → nova evolução`, são 4+ interações num momento de
pressão máxima. O resultado previsível é: não registra, e o prontuário morre vazio.

**Recomendação:** o registro de evolução precisa nascer **na Agenda e no Dashboard**, onde a sessão
já está na frente do psicólogo, e ser o *mesmo* componente aberto pelo prontuário.

> A página de prontuário é onde se **lê** o histórico. A Agenda é onde se **escreve**.

### 1.4 Não reaproveitar `sessions.notes`

`sessions.notes` já existe, mas é a observação **de agendamento** — preenchida no `NewSessionModal`
antes da sessão, exibida no painel da agenda. Misturar registro clínico ali seria errado por três
motivos: muda a natureza do dado (logística → dado sensível de saúde), aparece em superfícies onde
não deveria, e impede tratar os dois com regras de acesso/retenção diferentes.

**Recomendação:** tabela separada. Ver §1.6.

### 1.5 Falta o status "Realizada" — e isso trava o prontuário

`SessionStatus` hoje é `confirmed | pending | cancelled | first | blocked` (`agendaData.ts:1`).
Não existe "realizada".

Consequências: não dá para saber quais sessões aconteceram, "total de sessões" não tem como estar
certo, e não há gancho para sugerir "registre a evolução desta sessão".

**Recomendação:** adicionar `completed` ("Realizada"). E — este é o ganho de cliques mais importante
do projeto — **registrar a evolução marca a sessão como realizada automaticamente**. Uma ação, dois
efeitos, zero trabalho administrativo extra.

Visualmente, "Realizada" deve **recuar**, não competir com "Confirmada" (verde). Sugestão: cinza-azulado
neutro com ícone de check — é um estado passado, não um alerta.

### 1.6 Um problema de dados que já existe hoje

`patients.total_sessions`, `last_session` e `next_session` são lidos e exibidos
(`patients.ts:87`, `PatientsPage.tsx:141`), mas **nenhum caminho de escrita no cliente atualiza esses
campos** — `createSession`/`updateSessionStatus` não tocam em `patients`. Ou seja, muito
provavelmente estão sempre no default.

O prontuário vai expor isso de forma óbvia (vai mostrar 12 sessões na timeline e "0 sessões" no card).

**Recomendação:** **derivar** esses números de `sessions` em vez de criar mais um caminho de escrita
para mantê-los sincronizados. Menos código, impossível dessincronizar. (Se virar problema de
performance, uma view materializada resolve — não no MVP.)

### 1.7 Os componentes de formulário estão presos dentro do `NewPatientModal`

`TextInput`, `Textarea`, `InputField`, `SectionHeading` e `ChipGroup` são funções privadas de
`NewPatientModal.tsx` (linhas 967–1156), não exportadas.

Para o prontuário ficar visualmente consistente sem copiar/colar CSS, é preciso **extrair para
`src/app/components/form/`** antes de começar. É um refactor pequeno, sem mudança visual, e evita
divergência de estilo daqui pra frente.

---

## Parte 2 — Escopo

### Entra no MVP

1. Página `/pacientes/:id` com identidade do paciente e ficha do cadastro (somente leitura).
2. Timeline de registros, ordem cronológica inversa.
3. Registrar evolução: texto livre + vínculo opcional com sessão.
4. Editar e excluir um registro próprio.
5. Registrar evolução a partir da Agenda e do Dashboard (mesmo componente).
6. Marcar sessão como realizada — manual, e automático ao registrar evolução.
7. Registro de encerramento/alta (é só um `type` na mesma tabela — custo marginal ~zero).
8. Contadores de sessão derivados de dados reais.

### Fica para depois

| Item | Por que não agora |
|---|---|
| Modelos de anotação (SOAP, DAP) | Precisa de dados de uso reais para saber quais modelos importam |
| Anexos e documentos | Storage, antivírus, política de retenção — projeto próprio |
| Testes e escalas (PHQ-9, GAD-7) | Precisa de licenciamento e de gráfico de evolução para fazer sentido |
| Exportar prontuário em PDF | Alto valor, mas só depois que houver conteúdo para exportar |
| Versionamento / trilha de auditoria | "Editado em" resolve 90% no MVP |
| Plano terapêutico estruturado, genograma | Muito dependente de abordagem teórica |
| Busca full-text nas anotações | Barato (`ilike`), mas inútil com poucos registros. v1.5 |
| Compartilhamento / encaminhamento formal | Envolve terceiros, sigilo e consentimento específico |

### A decisão mais contra-intuitiva: anotação é texto livre

A tentação é estruturar a evolução em campos (queixa / intervenção / plano / evolução). **Recomendo
não fazer isso no MVP.** Psicólogos escrevem de forma narrativa e cada abordagem (TCC, psicanálise,
fenomenologia, ACT) organiza o registro de um jeito. Um formulário rígido vira atrito e o
psicólogo simplesmente para de registrar.

Texto livre agora; estrutura opcional via modelos depois, quando soubermos o que as pessoas
realmente escrevem.

---

## Parte 3 — Arquitetura da tela

Rota: **`/pacientes/:id`** — dentro do `Layout` (sidebar + topbar), irmã de `/pacientes`.

```
┌─ Breadcrumb: Pacientes / Ana Souza ──────────────────────── [⋯ ações] ┐
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │ (AS)  Ana Souza                            [+ Registrar sessão]│   │  ← HEADER
│  │       ● Ativo · 38 anos · Presencial · Semanal                 │   │
│  │       ─────────────────────────────────────────────────────    │   │
│  │       Motivo: Burnout profissional, transição de carreira      │   │
│  │       46 sessões · última 01/03 · próxima 08/03 14:00          │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌─────────────────────────────────────┐  ┌──────────────────────┐    │
│  │ EVOLUÇÃO                            │  │ FICHA DO PACIENTE    │    │
│  │ ┌─────────────────────────────────┐ │  │ (sticky)             │    │
│  │ │ ✎ Registrar evolução de hoje... │ │  │                      │    │
│  │ └─────────────────────────────────┘ │  │ ▸ Contato        [↗] │    │
│  │                                     │  │ ▾ Anamnese           │    │
│  │ ── 01/03/2026 · Sessão 14:00 ────── │  │   Medicação: ...     │    │
│  │ Trouxe o episódio com a chefe...    │  │   Diagnósticos: ...  │    │
│  │                          [editar ⋯] │  │   Contexto: ...      │    │
│  │                                     │  │ ▸ Emergência         │    │
│  │ ── 22/02/2026 · Sessão 14:00 ────── │  │ ▸ Pagamento          │    │
│  │ ...                                 │  │ ▸ Consentimento LGPD │    │
│  └─────────────────────────────────────┘  └──────────────────────┘    │
│              flex-1 (máx ~720px)              320px sticky            │
└────────────────────────────────────────────────────────────────────────┘
```

### Por que duas colunas e não abas

Abas escondem conteúdo e cobram um clique. Mas o motivo principal é a heurística de
**reconhecer em vez de lembrar** (Nielsen #6): enquanto escreve a evolução, o psicólogo precisa ver
medicação em uso, diagnósticos prévios e contexto de vida **ao lado**, não a uma aba de distância.
A coluna direita não é decoração — ela é a razão de a escrita acontecer nesta tela e não num
editor solto.

Quando o prontuário ganhar documentos, testes e financeiro do paciente (v2), aí sim abas.

### Por que a ficha é somente leitura

Editar cadastro aqui significaria manter dois formulários para os mesmos campos. A ficha mostra e
oferece **"Editar cadastro" [↗]**, que abre o `NewPatientModal` em modo edição no passo certo.
Um formulário, uma fonte de verdade.

---

## Parte 4 — Hierarquia da informação

Ordenada por "o que o psicólogo precisa 2 minutos antes da sessão":

| Nível | Conteúdo | Tipografia (escala travada) |
|---|---|---|
| 1 | Nome do paciente | 24px Semibold |
| 2 | Status, idade, modalidade, frequência | 14px Regular + badge |
| 3 | **Motivo da consulta** | 16px Regular, destacado |
| 4 | Contadores: total / última / próxima | 14px Medium |
| 5 | Campo de nova evolução | placeholder 14px |
| 6 | Última evolução (íntegra, sem truncar) | 16px / 24px |
| 7 | Evoluções anteriores | idem, com separador de data |
| 8 | Ficha lateral: contato, anamnese, financeiro | 14px, seções colapsáveis |

**O motivo da consulta sai da anamnese e sobe para o header.** É a âncora clínica que o psicólogo
relê com mais frequência — deixá-lo dentro de um accordion fechado é enterrá-lo.

A **última evolução nunca é truncada.** É a informação de maior valor da tela. Truncar com "ver mais"
economiza pixels e custa o único clique que realmente importa.

---

## Parte 5 — Componentes

### Reaproveitados (sem alteração)

| Componente | Uso |
|---|---|
| `EmptyState` | Estados vazios da timeline |
| `ConfirmDialog` | Excluir registro / registrar encerramento |
| `DropdownMenu` | Ações do registro e do paciente |
| `skeletons/*` + `useSmoothLoading` | Loading (evita flash) |
| `ui/accordion` | Seções colapsáveis da ficha |
| `sonner` (toast) | Confirmações e erros |
| Badges de `statusConfig` / `paymentMeta` | Consistência com Pacientes e Agenda |

### A extrair antes de começar (refactor sem mudança visual)

`src/app/components/form/` ← `TextInput`, `Textarea`, `InputField`, `SectionHeading`, `ChipGroup`
(hoje privados em `NewPatientModal.tsx`).

### Novos

| Componente | Responsabilidade |
|---|---|
| `PatientRecordPage` | Rota `/pacientes/:id`, orquestra carregamento e estados |
| `PatientRecordHeader` | Identidade, badges, motivo, contadores, ação primária |
| `PatientSideSheet` | Ficha lateral sticky, seções colapsáveis, link de edição |
| `RecordTimeline` | Lista agrupada por data + separadores |
| `RecordEntry` | Um registro: cabeçalho, corpo, ações, "editado em" |
| `RecordComposer` | **O componente central.** Escrita, rascunho, autosave, vínculo com sessão |
| `RecordComposerDrawer` | Casca que permite abrir o composer da Agenda/Dashboard |

O `RecordComposer` é **um só** componente usado em três lugares (prontuário inline, drawer da Agenda,
drawer do Dashboard). Isso é o que garante que o fluxo rápido e o fluxo completo nunca divirjam.

---

## Parte 6 — Modelo de dados

```sql
create table public.patient_records (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references auth.users(id) on delete cascade,
  patient_id   uuid not null references public.patients(id) on delete cascade,
  session_id   uuid references public.sessions(id) on delete set null,

  type         text not null default 'evolucao',   -- evolucao | avulso | encerramento
  content      text not null default '',
  is_draft     boolean not null default true,
  record_date  date not null default current_date,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index on public.patient_records (patient_id, record_date desc);
alter table public.patient_records enable row level security;
-- policy: owner_id = auth.uid()  (mesmo padrão de patients/sessions)
```

E em `sessions`: acrescentar `'completed'` ao domínio de `status`.

### Tabela separada vs. coluna em `sessions` — o trade-off

Uma coluna `clinical_note` em `sessions` seria mais barata: sem join, sem RLS nova, relação 1:1.

Escolhi a tabela separada porque **dois casos aparecem na primeira semana de uso real** e a coluna
não os cobre:

- registro **sem sessão** — falta, contato por telefone, situação de crise;
- registro de **encerramento/alta**, que é do tratamento, não de uma sessão.

Com a coluna, esses casos exigiriam criar sessões falsas na agenda — o que polui a agenda e
corrompe as métricas. O custo da tabela extra é uma migration; o custo do workaround é permanente.

### `is_draft` — por que vale o campo booleano

Sem rascunho, o psicólogo só escreve quando tem o texto pronto na cabeça. Com rascunho, ele anota
três linhas entre sessões e completa no fim do dia. Isso muda a frequência de uso do produto
inteiro, e custa um `boolean`.

O rascunho aparece com badge "Rascunho" na timeline e um lembrete discreto no header
("2 evoluções em rascunho").

---

## Parte 7 — Estados

### Loading

Skeleton com o mesmo layout final (header → duas colunas), via `useSmoothLoading` para não piscar
em conexão rápida. Header e ficha carregam de `patients` (rápido); a timeline pode carregar depois,
com skeleton próprio — a tela nunca fica inteiramente cinza.

### Vazios (três situações diferentes, três mensagens diferentes)

| Situação | Título | Descrição | Ação |
|---|---|---|---|
| Sem registros, com sessões realizadas | "Nenhuma evolução registrada" | "Você já realizou 3 sessões com Ana. Registrar a evolução ajuda a acompanhar o processo entre uma sessão e outra." | Registrar evolução |
| Sem registros, sem sessões | "O prontuário começa na primeira sessão" | "Assim que a primeira sessão acontecer, você pode registrar a evolução aqui." | Agendar 1ª sessão |
| Ficha com anamnese vazia | — (inline na seção) | "Anamnese não preenchida." | Completar anamnese ↗ |

Tratar as três com o mesmo texto genérico seria desperdiçar o momento em que o usuário mais precisa
de orientação.

### Erro

| Erro | Comportamento |
|---|---|
| Paciente não encontrado / sem acesso | Estado de página inteira + "Voltar para Pacientes" |
| Falha ao carregar timeline | Header e ficha continuam funcionando; só a coluna mostra erro + "Tentar novamente" |
| **Falha ao salvar registro** | **Texto nunca é descartado.** Mantém em `localStorage` por `patient_id`, badge "Não sincronizado", retry automático + botão manual |
| Falha ao excluir | Rollback otimista + toast (mesmo padrão de `PatientsPage.tsx:244`) |

A linha em negrito é inegociável. Perder uma anotação clínica destrói a confiança no produto de
forma que nenhuma outra falha destrói.

---

## Parte 8 — Fluxos

### Fluxo A — depois da sessão (o mais importante) — 2 cliques

```
Agenda → clica na sessão → SessionDetailPanel
  → [Registrar evolução]                                    ← clique 1
  → drawer abre com paciente, data e sessão já vinculados
  → digita (autosave a cada ~2s)
  → [Salvar registro]  ou  Cmd/Ctrl + Enter                 ← clique 2
  → sessão vira "Realizada" automaticamente
  → toast "Evolução registrada" + [Ver prontuário]
```

Sem navegação, sem seletor de paciente, sem seletor de data, sem marcar a sessão à mão.

### Fluxo B — preparação antes da sessão — 1 clique

```
Dashboard "Próximas sessões" ou Agenda → clica no nome do paciente
  → /pacientes/:id, última evolução visível sem rolar
```

### Fluxo C — dentro do prontuário

```
/pacientes/:id → composer inline já focável no topo da timeline
  → se houver sessão realizada sem registro, aparece o chip
    "Vincular à sessão de 01/03 · 14:00"  (evita abrir date picker)
  → salvar
```

### Fluxo D — encerramento

```
Header → [⋯] → "Registrar encerramento"
  → ConfirmDialog explicando o efeito (paciente vai para "Inativo")
  → composer com placeholder de motivo/encaminhamento
  → registro type='encerramento' fixado no topo da timeline
```

---

## Parte 9 — Above the fold

Alvo: 1440×900, sem rolagem.

**Aparece:** nome, status, idade, modalidade, frequência · motivo da consulta · contadores
(total/última/próxima) · botão "Registrar sessão" · composer · **última evolução completa** ·
início da ficha lateral (contato + anamnese).

**Não aparece:** evoluções anteriores, seções financeiras/consentimento, histórico completo de sessões.

Orçamento vertical: header ≤ 180px, composer recolhido ≤ 64px — o que sobra é da última evolução.
Se o header crescer além disso, o conteúdo mais valioso da tela sai da dobra.

---

## Parte 10 — Redução de cliques

| # | Onde | Antes | Depois | Ganho |
|---|---|---|---|---|
| 1 | Tabela de pacientes | `⋯` → "Ver detalhes" | linha inteira clicável | −1 clique, padrão esperado |
| 2 | Registrar evolução | navegar até o paciente | ação direta na Agenda/Dashboard | −3 a −4 |
| 3 | Marcar realizada | ação manual separada | automático ao registrar | −1 |
| 4 | Data do registro | date picker | herda da sessão; chip para vincular | −2 |
| 5 | Salvar | mouse até o botão | `Cmd/Ctrl + Enter` | −1 |
| 6 | Salvar rascunho | ação explícita | autosave | −1 |
| 7 | Ver ficha enquanto escreve | trocar de aba/tela | coluna sempre visível | −2 por consulta |
| 8 | Pós-cadastro | — | "Abrir prontuário" já existe, só ligar a rota | resolve TODO |

### O item 3 merece cuidado

Automação silenciosa viola "controle e liberdade do usuário" (Nielsen #3) se for invisível.
Mitigação: o composer mostra, antes de salvar, uma linha discreta —
*"Esta sessão será marcada como realizada."* — com opção de desmarcar. Automático **e** previsível.

---

## Parte 11 — Aproveitamento do que já foi cadastrado

Regra: **nada que já esteja em `patients` é pedido de novo.**

| Dado do cadastro | Onde reaparece | Reescrito? |
|---|---|---|
| nome, iniciais, nascimento→idade, gênero | Header | Não |
| status, modalidade, frequência | Badges do header | Não |
| `clinical_info.motivoConsulta` | Header, destaque | Não |
| `clinical_info.*` (tratamentos, diagnósticos, medicação, contexto) | Ficha → Anamnese | Não |
| email, telefone, endereço, emergência | Ficha → Contato | Não |
| `billing_info.*` | Ficha → Pagamento | Não |
| `lgpd_accepted`, `consent_date`, `consent_method` | Ficha → Consentimento | Não |
| `sessions` do paciente | Contadores + vínculo do registro | Não |

**Único dado novo que o psicólogo digita: o texto da evolução.** Se algum outro campo aparecer no
formulário do prontuário, é sinal de que o cadastro deveria tê-lo coletado — ou de que ele não é
necessário.

### O caso de `observacoesClinicas`

O cadastro já coleta "Observações clínicas iniciais" (`NewPatientModal.tsx:495`). Isso é, na prática,
o **registro zero** do prontuário.

**Recomendação:** exibi-lo na timeline como o item mais antigo, rotulado
*"Observações iniciais · registradas no cadastro"*. Custo zero, e o prontuário nunca nasce vazio
para quem preencheu o cadastro completo.

---

## Parte 12 — UX de simplicidade, confiança e rapidez

### Confiança (é dado sensível de saúde — LGPD art. 5º II e art. 11)

- Reaproveitar o aviso azul que já existe: *"visível somente para você"* (`NewPatientModal.tsx:502`).
  Colocá-lo uma vez, no rodapé do composer — não repetir em cada registro.
- Estado de salvamento sempre visível: `Salvando… → Salvo às 15:52`. Silêncio, aqui, é ansiedade.
- "Editado em 03/03 às 16:10" quando um registro é alterado — transparência sem versionamento.
- Excluir registro sempre passa por `ConfirmDialog`, com o aviso de que é permanente.
- Nunca usar a palavra "deletar" ou linguagem de sistema. Vocabulário do CFP: *evolução, anamnese,
  encerramento, prontuário*.

### Rapidez

- Autosave com debounce (~2s) — nunca bloqueia a digitação.
- Atualização otimista: o registro aparece na timeline antes da confirmação do servidor.
- `Cmd/Ctrl + Enter` salva; `Esc` fecha o drawer perguntando se quer manter rascunho.
- Textarea cresce com o conteúdo até uma altura máxima. Caixa fixa pequena sinaliza "escreva pouco".
- Header e ficha renderizam a partir de `patients` sem esperar a timeline.

### Simplicidade

- Uma ação primária azul na tela. Todo o resto é secundário ou está no `⋯`.
- Sem contador de caracteres, sem campos obrigatórios além do texto, sem editor rich-text.
- Densidade da timeline: separador de data + parágrafo. Sem cards com borda em volta de cada registro
  — cards fragmentam a leitura contínua, que é como se lê um histórico clínico.

### Heurísticas de Nielsen — onde cada uma está sendo aplicada

| Heurística | Aplicação |
|---|---|
| 1. Visibilidade do estado | "Salvando/Salvo às HH:MM", badge de rascunho |
| 2. Correspondência com o mundo real | Linguagem CFP; timeline cronológica como um prontuário de papel |
| 3. Controle e liberdade | Rascunho, editar, desfazer o "marcar como realizada" |
| 4. Consistência | Mesmos badges, botões, drawer e toasts de Pacientes/Agenda |
| 5. Prevenção de erro | Confirmação para excluir e encerrar; texto preservado em falha de rede |
| 6. Reconhecer em vez de lembrar | Ficha lateral visível durante a escrita; chip de sessão sugerida |
| 7. Flexibilidade | Atalhos de teclado; três pontos de entrada para a mesma ação |
| 8. Estética minimalista | Uma ação primária; sem editor rico; sem campos supérfluos |
| 9. Recuperação de erros | Retry com texto intacto; rollback otimista com toast |
| 10. Ajuda | Empty states que explicam, em vez de só informar que está vazio |

---

## Parte 13 — Ordem sugerida de implementação

| Fase | Entrega | Por quê primeiro |
|---|---|---|
| 0 | Extrair componentes de formulário; SQL (`patient_records` + status `completed`) | Base de tudo |
| 1 | Rota `/pacientes/:id` + header + ficha lateral (só leitura) | Já entrega valor sozinha; resolve o TODO do cadastro |
| 2 | Timeline + `RecordComposer` inline | O prontuário propriamente dito |
| 3 | Drawer na Agenda/Dashboard + "realizada" automático | O fluxo que faz o produto ser usado |
| 4 | Encerramento, rascunhos, contadores derivados | Fechamento do ciclo |

Cada fase é entregável e testável sozinha. A fase 1 já pode ir para produção.

---

## Perguntas em aberto (decisão de produto, não de design)

1. Sessão cancelada ou falta deve permitir registro? *(Recomendo sim — falta é dado clínico
   relevante. Registro `type='avulso'`.)*
2. Editar um registro antigo deve ter limite de tempo? *(Recomendo não no MVP; "editado em" basta.)*
3. Excluir paciente hoje apaga tudo em cascata. Com prontuário formal, isso conflita com o prazo
   mínimo de guarda de 5 anos da Res. CFP 001/2009. **Vale revisar antes de lançar o prontuário** —
   provavelmente arquivar em vez de excluir.
4. O prontuário precisa ser exportável no MVP para atender a pedido de titular (LGPD art. 18)?
   *(Contorno aceitável no curto prazo: exportar via suporte, manualmente.)*
