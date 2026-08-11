# Tabela de Pacientes — análise e proposta

> Documento de produto/design. Base: leitura do código em 11/08/2026.

---

## 1. Diagnóstico coluna a coluna

Hoje a tabela tem 6 colunas de dado + ações. Avaliei cada uma por um critério só:
**essa coluna ajuda o psicólogo a decidir alguma coisa?**

| Coluna | O que mostra | Veredito |
|---|---|---|
| **Paciente** | Avatar + nome | **Fica.** É a âncora de tudo. |
| **Contato** | Telefone cru | **Sai.** Ver 1.1 |
| **Plano ou frequência** | Só a frequência | **Vira secundária.** Ver 1.2 |
| **Data de início** | "Desde ago de 2026" | **Sai.** Ver 1.3 |
| **Modalidade** | Online / Presencial | **Sai — está quebrada.** Ver 1.4 |
| **Status** | Ativo / Pausado / Inativo | **Fica, com ressalva.** Ver 1.5 |

### 1.1 Contato — dado não escaneável

Ninguém varre uma lista de telefones para encontrar uma pessoa. O telefone não é
informação de *leitura*, é ponto de partida de uma *ação* — ligar ou mandar mensagem.
Como coluna, ocupa largura e não responde a nenhuma pergunta.

Além disso ele já é pesquisável (a busca cobre nome, e-mail e telefone), então tirar da
tabela não torna ninguém inencontrável.

**Onde deveria estar:** como ação na linha ("Enviar mensagem") e no prontuário.

### 1.2 "Plano ou frequência" — o cabeçalho promete o que a célula não entrega

A coluna se chama "Plano ou frequência" e mostra **apenas** a frequência. O plano de saúde
existe (`billing_info.nomePlano`, coletado no cadastro) e **nunca aparece em lugar nenhum**.

Ou o cabeçalho mente, ou a célula está incompleta. Nos dois casos, o usuário que procura o
convênio não encontra.

### 1.3 Data de início — contexto, não decisão

"Desde ago de 2026" é uma informação de relacionamento, não de operação. Ninguém escolhe o
que fazer hoje com base em quando o acompanhamento começou.

Ela já existe no prontuário, e melhor: como **"Acompanhamento: 11 meses"**, que é o que a
pessoa realmente quer saber. Calcular "quanto tempo faz" de cabeça a partir de "ago de 2026"
é trabalho que a interface deveria ter feito.

### 1.4 Modalidade — coluna morta mostrando dado falso

Este é o achado mais sério. Verifiquei o `createPatient`: o insert **não inclui `modality`**.
E o formulário de cadastro **nunca pergunta a modalidade de atendimento** — o que ele coleta é
`modalidadePagamento`, que é outra coisa (particular / convênio).

Consequência: a coluna mostra o **default do banco para todos os pacientes, sempre**. No
print, "Online". Vai continuar "Online" para todo mundo até alguém escrever esse campo.

E mesmo consertando: modalidade é atributo **da sessão**, não do paciente — a mesma pessoa
alterna presencial e online. `sessions.modality` já guarda isso corretamente. Um campo de
modalidade no paciente seria uma verdade pela metade.

### 1.5 Status — correto, mas redundante com o filtro

Funciona. A ressalva é que, no momento em que o usuário filtra por "Ativos", a coluna passa a
mostrar o mesmo valor em todas as linhas — vira ruído. Vale manter porque a visão padrão é
"Todos", mas ela não merece posição de destaque.

---

## 2. O que está faltando — e é o que mais importa

A tabela responde "quem são meus pacientes". Não responde **"como está cada acompanhamento"**,
que é a pergunta real de quem tem dezenas ou centenas deles.

Faltam três coisas, em ordem de valor:

**Última sessão.** "Faz quanto tempo que não vejo essa pessoa?" é a pergunta que dispara ação.
Um paciente marcado como Ativo que não é atendido há seis semanas é o item mais acionável da
lista inteira — e hoje é **invisível**.

**Próxima sessão.** Distingue "ativo com retorno marcado" de "ativo à deriva". São situações
completamente diferentes que hoje aparecem idênticas.

**Estados derivados.** Ativo/Pausado/Inativo é um estado que alguém marcou à mão e esquece de
atualizar. O que descreve a realidade é calculado: sem sessão futura, sem sessão há muito tempo,
recém-cadastrado e ainda sem primeira sessão.

### O obstáculo

`Patient` já tem os campos `lastSession`, `nextSession` e `totalSessions` — e **nenhum deles é
escrito**. Não estão no insert do `createPatient`, e nenhum caminho do cliente os atualiza. São
sempre o default.

A saída é a mesma que adotei no prontuário: **derivar de `sessions`**, que é a fonte de verdade.
Menos código e impossível dessincronizar. Isso exige a `PatientsPage` carregar sessões, o que
hoje ela não faz — só chama `listPatients`.

---

## 3. Proposta

### 3.1 Colunas que ficam

| # | Coluna | Conteúdo |
|---|---|---|
| 1 | **Paciente** | Avatar + nome, com a frequência em linha secundária |
| 2 | **Última sessão** | Data relativa: "há 5 dias", "há 3 semanas" |
| 3 | **Próxima sessão** | "Amanhã · 14:00", "Qui, 21 ago" ou "—" |
| 4 | **Status** | Badge |
| 5 | — | Ações (`⋯`) |

Quatro colunas de dado, contra seis. Menos carga visual **e** mais informação útil.

### 3.2 Colunas removidas

| Removida | Motivo | Para onde vai |
|---|---|---|
| Contato | Não é escaneável; é ação disfarçada de dado | Menu da linha + prontuário |
| Data de início | Contexto, não decisão | Prontuário, como "Acompanhamento: X meses" |
| Modalidade | Nunca preenchida; e é atributo da sessão | Já vive em `sessions.modality` |
| Plano ou frequência (como coluna) | Cabeçalho ambíguo | Frequência vira linha secundária; plano vai para o prontuário |

### 3.3 O que entra

**Última sessão** e **Próxima sessão**, ambas derivadas de `sessions`.

**Datas relativas, não absolutas.** "há 3 semanas" é lido de relance; "22/07/2026" exige
calcular. Para a próxima sessão, "Amanhã · 14:00" e "Qui, 21 ago" — proximidade importa mais
que precisão.

**Sinal de atenção inline**, ao lado do nome, quando o acompanhamento sai do esperado.

### 3.4 Estados

Dois níveis. O **status** continua sendo o que o profissional declara. O **sinal de atenção**
é calculado e não substitui o status — convive com ele.

| Estado | Como é definido | Aparência |
|---|---|---|
| Ativo / Pausado / Inativo | Declarado (já existe) | Badge, como hoje |
| **Novo** | Cadastrado, nenhuma sessão realizada | Chip azul "Novo" |
| **Sem retorno** | Ativo, já teve sessão, sem próxima agendada | Chip âmbar "Sem retorno" |
| **Afastado** | Ativo, última sessão além do esperado para a frequência | Chip âmbar "Há X semanas" |

**Sobre o limite de "afastado":** proponho derivar da frequência em vez de um número fixo —
semanal alerta em ~3 semanas, quinzenal em ~5, mensal em ~2 meses. Um corte fixo de 30 dias
trataria como igual um paciente semanal (muito atrasado) e um mensal (em dia). Se preferir
simplicidade, um valor fixo funciona; só é menos justo.

### 3.5 Ordem das colunas

```
Paciente          Última sessão     Próxima sessão     Status      ⋯
(nome+frequência)  (relativa)        (relativa)        (badge)
```

O racional: o nome ancora a varredura; as duas datas ficam lado a lado porque a pergunta real
é a **relação entre elas** ("vi há 3 semanas e não tem retorno" é uma leitura só); o status vai
depois porque é badge — alta saliência visual, encontrado em qualquer posição — e porque
frequentemente está filtrado.

### 3.6 Ações por linha

Hoje: Abrir prontuário, Pausar/Retomar, Excluir.

| Ação | Situação |
|---|---|
| Abrir prontuário | Já existe (e a linha inteira já leva lá) |
| **Agendar sessão** | **Falta.** É a resposta natural a "sem retorno". O atalho já existe: `/agenda?agendar=<id>` |
| **Enviar mensagem** | **Falta.** O `SendMessageSheet` e o `toWhatsAppNumber` já estão prontos, feitos para o prontuário |
| Pausar / Retomar | Já existe |
| Excluir | Já existe — **mas ver 5.2** |

As duas que faltam fecham o ciclo: a tabela passa a mostrar o problema *e* oferecer a saída, em
vez de só apontar.

### 3.7 Busca, filtros e ordenação

**Busca** — mantém nome, e-mail e telefone. Já resolve.

**Filtros rápidos**, com contador, substituindo o dropdown atual:

```
Todos · Ativos · Sem retorno · Afastados · Pausados · Inativos
```

"Sem retorno" e "Afastados" são os filtros que geram trabalho. "Pausados" e "Inativos" são
consulta. Os quatro cards de contagem no topo (Total/Ativos/Pausados/Inativos) hoje **parecem
clicáveis e não são** — deveriam virar esses filtros, ou sair.

**Ordenação** — nenhuma coluna é ordenável hoje. As úteis:

- Última sessão (mais antiga primeiro) — a fila de quem precisa de atenção
- Nome (A–Z) — quando se procura alguém específico
- Próxima sessão — planejamento da semana

Padrão sugerido: **nome A–Z**. Ordenar por atenção logo de cara transforma a lista numa lista de
cobranças, o que é ansiogênico para uma tela consultada o tempo todo. Quem quer isso, filtra.

### 3.8 Estrutura visual

Mantendo os componentes e tokens atuais:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [busca                    ]   Todos 12 · Ativos 9 · Sem retorno 2 · …   │  ← filtros com contador
├──────────────────────────────────────────────────────────────────────────┤
│  PACIENTE            ÚLTIMA SESSÃO    PRÓXIMA SESSÃO     STATUS          │
├──────────────────────────────────────────────────────────────────────────┤
│  (RC) Roberto Costa   há 5 dias       Amanhã · 14:00     ● Ativo      ⋯  │
│       Semanal                                                            │
├──────────────────────────────────────────────────────────────────────────┤
│  (AS) Ana Souza       há 3 semanas    —                  ● Ativo      ⋯  │
│       Semanal  ⚠ Sem retorno                                             │
└──────────────────────────────────────────────────────────────────────────┘
```

Decisões visuais:

- **Célula do paciente em duas linhas** — nome em cima, frequência e sinal de atenção embaixo,
  menores e em cinza. Elimina uma coluna e agrupa "quem é" com "como é o acompanhamento".
- **Alinhamento à esquerda** em tudo. Hoje quatro colunas são centralizadas, o que cria quatro
  eixos de leitura diferentes e obriga o olho a saltar. Texto centralizado em tabela é sempre
  mais lento de varrer.
- **Altura da linha em 64px**, como hoje — cabe a segunda linha sem aumentar nada.
- **"—" para vazio**, nunca célula em branco: distingue "não tem" de "não carregou".
- **Sem zebra striping.** A borda inferior que já existe basta; fundo alternado com 4 colunas
  é peso sem função.
- **Chip de atenção em âmbar**, reaproveitando `#fef9c3`/`#854d0e` que já são o par de
  "aguardando" na agenda. Nada de cor nova.

---

## 4. Dependências

Nada disso funciona sem duas mudanças fora da tabela:

1. **`PatientsPage` precisa carregar sessões.** Hoje só chama `listPatients`. Última e próxima
   sessão saem de `sessions`, não de `patients`.
2. **Decidir sobre `last_session` / `next_session` / `total_sessions`.** Recomendo **derivar** e
   parar de manter os campos, em vez de criar caminhos de escrita para sincronizá-los. É a mesma
   decisão que tomei no prontuário, pelo mesmo motivo.

Ponto de atenção de performance: com centenas de pacientes, carregar todas as sessões e cruzar
no cliente fica pesado. Para o MVP funciona. Se crescer, uma view no Postgres com o agregado por
paciente resolve sem mudar a interface.

---

## 5. Faseamento

### v1 — o que dá valor imediato

1. Remover **Modalidade** (mostra dado falso hoje — é correção, não melhoria)
2. Remover **Contato** e **Data de início**
3. Frequência vira linha secundária no nome
4. Adicionar **Última sessão** e **Próxima sessão**, derivadas
5. Alinhar tudo à esquerda
6. Ações **Agendar sessão** e **Enviar mensagem** na linha

### v2

- Sinais de atenção calculados (Novo, Sem retorno, Afastado)
- Filtros rápidos com contador, substituindo os cards decorativos
- Ordenação por coluna

### Depois

- Agregado no banco, se o volume exigir
- Busca por queixa/motivo da consulta
- Seleção múltipla para ações em lote

---

## 6. Duas coisas que precisam da sua decisão

**5.1 — Limite de "afastado".** Derivado da frequência (mais justo, mais complexo) ou fixo em
30 dias (mais simples)? Recomendo o derivado.

**5.2 — Excluir paciente.** Continua sendo exclusão em cascata, que apaga prontuário junto.
Já sinalizei isso duas vezes e continua valendo: provavelmente deveria ser arquivamento. Como a
tabela é o único lugar onde essa ação existe, é aqui que a decisão se materializa.

**5.3 — Plano de saúde.** É coletado no cadastro e não aparece em lugar nenhum. Deve ir para o
prontuário, virar coluna opcional, ou foi coletado sem necessidade? Não sei o uso pretendido.
