# Análise do Sistema Atual
**Auditoria completa — Etapa 1 do plano de padronização. Gerado em 2026-06-30.**

---

## 1. Arquitetura do projeto

O projeto tem **três** camadas de implementação coexistindo, não duas:

| Camada | Arquivos | Papel real |
|---|---|---|
| `prototipos/dashboard-auto.html` | 1 arquivo, 13.047 linhas | **Produto real.** SPA com 12 views (`goToView()`), todo o CSS inline em `<style>`, é onde 100% do trabalho de feature recente aconteceu (Conversões, Score, Segmentações, Canais, Fluxos, Relatórios, IA, Configurações, Ajuda). |
| `prototipos/canais.html` + `style.css` + páginas de auth (`login`, `esqueci-senha`, `produtos`, `dashboard-canal`) | 7 arquivos | Satélites do produto real. `canais.html` é o único arquivo do produto que importa `V2/css/*` em vez de `style.css`. |
| `V2/*.html` (8 páginas) + `V2/css/*` + `V2/js/*` | 12 arquivos | **Implementação de referência mais limpa** (tokens separados, sem inline style em excesso) mas **não é o produto que está evoluindo** — nenhuma feature nova entrou aqui desde antes da criação de `dashboard-auto.html`. |

`governance/DECISIONS.md` (DEC-002, escrita na sessão anterior) declarou `V2/css/` como "fonte da verdade oficial" — **essa decisão não reflete a realidade**: o produto que o usuário pediu para evoluir em todas as últimas ~30 mensagens é `dashboard-auto.html`, que não consome `V2/css/` em nenhum momento (`<link href="style.css">`, linha 8 — não há nenhuma referência a `V2/css` no arquivo).

**Implicação:** os 14 documentos em `docs/` foram escritos na sessão anterior tomando `V2/css/tokens.css` como base. Vários valores documentados não correspondem ao que está implementado em `dashboard-auto.html`.

---

## 2. Achado crítico: cor de marca não tokenizada e divergente

- `docs/01-DESIGN-SYSTEM.md` define `--brand: #EA5456` (vermelho) como cor primária.
- `prototipos/style.css` (importado por `dashboard-auto.html`) define o mesmo: `--brand: #EA5456`.
- Mas dentro do `<style>` inline de `dashboard-auto.html`, **`#534CE7` (roxo) aparece 115 vezes** hardcoded, contra **apenas 33 ocorrências de `#EA5456`**. Nenhuma das duas está atrás de uma variável própria — `#534CE7` não existe em nenhum `:root`, em nenhum arquivo do projeto.
- Roxo aparece em componentes estruturais que não são exclusivos de um módulo: `.cv-email`, `.cv-act-btn:hover`, `.cv-tab.active`, `.cv-chip`, `.toast-action`, abas, chips, hovers — ou seja, **roxo está fazendo o papel de cor de ação primária da interface**, não de um acento isolado de módulo.

Isso não é um detalhe de polimento — toda a tarefa de "tokenizar cores" e "remover hardcoded" depende de saber qual das duas é a intenção real. Vou perguntar isso antes de tocar em qualquer cor (seção 6).

---

## 3. Inventário de views (`dashboard-auto.html`)

| View | Linha | Status |
|---|---|---|
| `view-dashboard` | 817 | Completo |
| `view-lists` | 1713 | Completo |
| `view-list-detail` | 1917 | Completo (abas: overview, contatos, segmentações, imports, exports, config) |
| `view-conversoes` | 2455 | **Incompleto** — conteúdo mínimo |
| `view-configurar-score` | 2548 | **Incompleto** — esqueleto apenas |
| `view-rfm` | 2589 | Completo (modal-based) |
| `view-fluxos` | 3025 | Parcial — "Novo fluxo" e "Versão para impressão" usam `showToast(...'em breve')` |
| `view-relatorios` | 3141 | Completo |
| `view-ia` | 3272 | Parcial — 2 sub-abas funcionais mas com `.ia-empty` como estado permanente (sem geração real) |
| `view-configuracoes` | 3330 | **Incompleto** — só a aba "Domínios" tem conteúdo real; "Conteúdo", "Envio", "Formulários", "Integração", "SPF/CNAME", "DKIM", "LP" estão `display:none` sem implementação |
| `view-ajuda` | 3459 | Parcial — "Central" e "Tutoriais" com dados mock, "Chamados" com 2 linhas de exemplo, criação de chamado é stub |
| `view-canais` | 3530 | Completo (mas ver nota abaixo) |

**Nota sobre Canais:** o nav agora navega para `canais.html` como página separada (`window.location.href='canais.html'`), não para `view-canais` dentro do SPA. A `view-canais` dentro de `dashboard-auto.html` ficou órfã — não está claro se ainda é alcançável ou se é código morto. Precisa verificação antes de decidir se remove.

---

## 4. Inconsistências de componentes (`dashboard-auto.html`)

| Categoria | Volume | Exemplos |
|---|---|---|
| Cores hardcoded (hex direto, não `var()`) | ~600+ instâncias | `#534CE7`×115, `#fff`×224, `#EDEEFF`×28, `#EA5456`×33, `#0EA679`/`#10b981`×62, `#F59E0B`/`#d97706`×32 |
| `style="..."` inline | 2.203 instâncias | linha 1725, 1920, 2196-2199, 3292-3296 — combinam classe + override inline de cor/tamanho |
| Variantes de "card" | 8+ padrões distintos sem sistema unificado | `.ch-kpi-card`, `.cv-sum-card`, `.list-card-*` (14+ subclasses), `.lp-dash-card`, `.fm-dash-card`, `.social-dash-card`, `.flow-tpl-card`, `.domain-card`/`.integration-card` (quase idênticos) |
| Variantes de "tab" | 5+ classes distintas | `.auto-tab-btn`, `.list-detail-tab-btn`, `.config-vertical-tab-btn`, `.ia-sub-item`, `.cfg-sub-item`, `.ajuda-sub-item` — sem base class compartilhada |
| Tamanhos de botão | sem escala documentada respeitada | `.btn-sm` (32px), `.btn-xs` (24px) + alturas inline arbitrárias: 28px, 30px, 34px, 38px |
| Z-index hardcoded | 13 valores únicos, fora da escala de `docs/03-LAYOUTS.md` | 400, 500, 600, 700, 720(!), 300, 100, 90, 20, 10, 5, 30, 3, 2, 1 — `720` não existe na escala documentada (90/100/400/500/600/700/800/9999) |
| Navegação | função dupla | a maioria usa `goToView()`; linha 1541 usa `navTo('screen-auto-email-list', this)` — função paralela não documentada |

**Drawers/modais:** 26 drawers + 10 modais inventariados, todos com `id` único e handler de fechamento próprio — **nenhuma duplicação real de propósito**, mas sufixos inconsistentes (`-new`, `-config`, `-detail`, `-wizard` usados sem critério entre si).

---

## 5. Estado de V2/ e protótipos legados (auth/seleção de produto)

- Todas as 8 páginas de `V2/` importam corretamente os 4 CSS compartilhados (`tokens.css`, `base.css`, `components.css`, `layout.css`) — arquitetura de CSS é a mais limpa do projeto.
- ~12 cores hardcoded encontradas mesmo assim (ex: `V2/ajuda.html:32` gradiente `#534CE7→#7B75F0` — **o mesmo roxo não-tokenizado do dashboard-auto.html**, reforçando que roxo é uma decisão de marca real, não um acidente isolado).
- Páginas com stubs "em breve": exportação de contatos, wizard de domínio (`configuracoes.html`), abertura de chamado (`ajuda.html`).
- `prototipos/dashboard-canal.html` (produto "CRM Atendimento", separado do Automação): 5 de 6 telas (`#screen-contacts`, `#screen-wizard`, `#screen-reports`, `#screen-landing`, `#screen-settings`) são containers vazios — só `#screen-dashboard` tem conteúdo.
- `produtos.html` → roteia para `dashboard-canal.html` (CRM Atendimento) ou `dashboard-auto.html` (CRM Automação) — confirma que são produtos irmãos, não uma migração de um para o outro.
- Nenhum link quebrado encontrado dentro de cada pasta.

---

## 6. Decisões que preciso de você antes de prosseguir

Ver mensagem de acompanhamento com as perguntas — resumo aqui para registro:

1. **Cor de marca real**: roxo `#534CE7` vira o token oficial de "Automação" (substituindo ou complementando o vermelho `#EA5456` documentado), ou o roxo é erro e deve ser substituído por `var(--brand)` vermelho em todo o `dashboard-auto.html`?
2. **Fonte da verdade**: trato `dashboard-auto.html` como o produto oficial daqui pra frente (e migro seu CSS inline para um arquivo de tokens próprio, aposentando `V2/` como referência histórica), ou a intenção é migrar o conteúdo de `dashboard-auto.html` para a arquitetura multi-página de `V2/`?

Essas duas decisões definem a ordem de praticamente todo o resto do trabalho descrito no plano (padronização de componentes, tokenização, conclusão de fluxos).
