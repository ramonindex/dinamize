# 02 — COMPONENTS
**Catálogo completo de componentes do Design System Dinamize.**

> Para cada novo componente: primeiro verificar se existe variante reutilizável. Criar apenas quando justificado em `governance/DECISIONS.md`.

---

## Índice

1. [Buttons](#1-buttons)
2. [Forms](#2-forms)
3. [Badges & Tags](#3-badges--tags)
4. [Cards](#4-cards)
5. [Tables](#5-tables)
6. [Filter Bar](#6-filter-bar)
7. [Pagination](#7-pagination)
8. [Tabs & Navigation](#8-tabs--navigation)
9. [Drawers](#9-drawers)
10. [Modals](#10-modals)
11. [Dropdown Menu](#11-dropdown-menu)
12. [Toasts](#12-toasts)
13. [Alerts](#13-alerts)
14. [Avatar](#14-avatar)
15. [Progress Bar](#15-progress-bar)
16. [Stepper](#16-stepper)
17. [Bulk Actions Bar](#17-bulk-actions-bar)
18. [Empty State](#18-empty-state)
19. [Loading / Skeleton](#19-loading--skeleton)
20. [Toggle](#20-toggle)
21. [Breadcrumb](#21-breadcrumb)
22. [Tooltip](#22-tooltip)
23. [KPI Card](#23-kpi-card)
24. [List Card](#24-list-card)
25. [Flow Card](#25-flow-card)
26. [Module Banner](#26-module-banner)

---

## 1. Buttons

**Objetivo:** Acionar uma ação do sistema.

**Quando usar:** Para qualquer ação interativa que não seja navegação de link.

**Quando NÃO usar:** Para navegar entre páginas (usar `<a>` ou link). Para ações destrutivas sem confirmação.

### Variantes

| Classe | Uso |
|--------|-----|
| `.btn-primary` | Ação principal da tela. Máximo 1 por seção. |
| `.btn-secondary` | Ações secundárias, cancelar, voltar. |
| `.btn-ghost` | Ações terciárias, links sutis. |
| `.btn-danger` | Ações destrutivas após confirmação. |
| `.btn-auto` | Alias de `.btn-primary` — usar em contexto de módulo (cor pode evoluir independentemente). |

### Tamanhos

| Modificador | Quando usar |
|-------------|-------------|
| `.btn-sm` | Em filtros, tabelas, header de card |
| (padrão) | Footers de modal/drawer, ações de página |
| `.btn-lg` | CTA principal de módulo |
| `.btn-xl` | CTA de hero, banners de produto |
| `.btn-full` | Formulários em coluna única |

### Ícone

| Modificador | Tamanho | Uso |
|-------------|---------|-----|
| `.btn-icon` | 34×34 | Ações em topbar e toolbars |
| `.btn-icon-sm` | 28×28 | Ações dentro de cards |
| `.btn-icon-xs` | 24×24 | Ações secundárias compactas |

### Estados

| Estado | Comportamento visual |
|--------|---------------------|
| Default | Cor base do variante |
| Hover | `translateY(-1px)`, sombra colorida (primary), border mais escuro (secondary) |
| Active | `translateY(0)` |
| Disabled | `opacity: 0.45`, `cursor: not-allowed`, sem transform |
| Loading | Substituir label por spinner + texto (implementar via JS) |

### Responsividade
- Em mobile (<480px), botões de ação principal usam `.btn-full`.
- Icon buttons mantêm tamanho em todos os viewports.

---

## 2. Forms

### Form Group
**Estrutura obrigatória:**
```html
<div class="form-group">
  <label class="form-label">Label <span class="req">*</span></label>
  <input class="form-input" />
  <span class="form-help">Texto auxiliar</span>
  <span class="form-error">Mensagem de erro</span>
</div>
```

### Inputs

| Classe | Elemento | Uso |
|--------|---------|-----|
| `.form-input` | `<input>` | Texto, email, senha, número |
| `.form-select` | `<select>` | Seleção de opção única |
| `.form-textarea` | `<textarea>` | Texto longo, observações |

### Input com ícone
```html
<div class="input-wrap">
  <span class="input-icon"><!-- ícone SVG --></span>
  <input class="form-input" />
</div>
```

### Layouts de form

| Classe | Colunas | Uso |
|--------|---------|-----|
| (padrão) | 1 coluna | Formulários em drawer |
| `.form-row` | 2 colunas | Campos correlatos (nome + sobrenome) |
| `.form-row-3` | 3 colunas | Cidade + estado + CEP |

### Toggle
- Componente: `<button class="toggle">`, adicionar `.on` via JS
- Sempre acompanhar de label descritivo
- Tamanho: 38×22px, thumb 16×16px

### Checkbox
```html
<label class="checkbox-row">
  <input type="checkbox" />
  <span>Label do checkbox</span>
</label>
```

### Radio Card
- Para seleção entre opções com mais contexto visual
- Estados: default, hover (border brand), selected (border brand + bg-light)
- Nunca usar para mais de 4 opções (usar select)

### Estados de Form

| Estado | Visual |
|--------|--------|
| Default | `border: 1.5px solid var(--border)` |
| Focus | `border-color: var(--auto)` + box-shadow ring |
| Error | `.form-error.show` → exibir, border muda para `--error` |
| Disabled | `opacity: 0.6`, `cursor: not-allowed` |

---

## 3. Badges & Tags

### Badges

**Objetivo:** Indicar status, categoria ou estado de um item.

| Classe | Cor | Uso |
|--------|-----|-----|
| `.badge-success` | Verde | Ativo, enviado, válido |
| `.badge-warning` | Âmbar | Agendado, atenção, pausado |
| `.badge-error` | Vermelho | Erro, inválido, falha |
| `.badge-info` | Azul | Informação, em processamento |
| `.badge-neutral` | Cinza | Rascunho, arquivado |
| `.badge-brand` | Brand | Destaque brand |
| `.badge-auto` | Auto | Contexto de automação |

**Status específicos:**

| Classe | Uso |
|--------|-----|
| `.badge-draft` | Rascunho |
| `.badge-sched` | Agendado |
| `.badge-sent` | Enviado |
| `.badge-active` | Ativo |
| `.badge-paused` | Pausado |

**Temperatura de contato:**

| Classe | Uso |
|--------|-----|
| `.temp-hot` | Contato quente |
| `.temp-warm` | Contato morno |
| `.temp-cold` | Contato frio |

**Estrutura com dot:**
```html
<span class="badge badge-success">
  <span class="badge-dot"></span>
  Ativo
</span>
```

**Quando usar:** Sempre inline, nunca como substituto de um botão. Máximo 3 badges por linha de tabela.

### Tags (marcadores)

**Objetivo:** Representar marcadores/labels aplicados a um contato ou item.

```html
<span class="tag">
  Marketing
  <button class="tag-remove">×</button>
</span>
```

**Quando usar:** Para marcadores removíveis. Para marcadores fixos, usar badge-neutral.

---

## 4. Cards

### Card padrão

```html
<div class="card">
  <div class="card-header">
    <div>
      <div class="card-title">Título</div>
      <div class="card-subtitle">Subtítulo</div>
    </div>
    <!-- ações do header -->
  </div>
  <div class="card-body">
    <!-- conteúdo -->
  </div>
</div>
```

**Modificadores:**
- `.card-padded` → padding uniforme (sem header/body estruturado)

### Regras de cards

- Cards NÃO têm shadow em repouso — apenas borda.
- Shadow aparece no hover via `:hover { box-shadow: var(--shadow-md) }`.
- Nunca aninhar cards (card dentro de card).
- Padding padrão: header `14px 18px`, body `16px 18px 18px`.

### KPI Card → ver [seção 23](#23-kpi-card)
### List Card → ver [seção 24](#24-list-card)
### Flow Card → ver [seção 25](#25-flow-card)

---

## 5. Tables

**Estrutura:**
```html
<div class="table-wrap">
  <table class="data-table">
    <thead>
      <tr>
        <th class="col-check"><!-- checkbox --></th>
        <th class="sortable">Coluna</th>
        <th class="col-actions">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox"></td>
        <td>
          <div class="cell-primary">Nome principal</div>
          <div class="cell-secondary">Metadado</div>
        </td>
        <td class="col-actions">
          <div class="row-actions"><!-- buttons --></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Padrões obrigatórios

- Primeira coluna: checkbox de seleção (`.col-check`, 40px)
- Última coluna: ações (`.col-actions`, auto-width, align right)
- Headers: uppercase, 11px, `--text-3`, `--bg` de background
- Hover de linha: `background: #FAFBFD`
- Linha selecionada: `background: var(--auto-light)`
- Paginação: sempre presente quando dados > 10 itens

### Paginação padrão
- 30 itens por página (default)
- Select de: 10 / 30 / 50 / 100
- Texto: "Visualizando X–Y de Z resultados"

---

## 6. Filter Bar

**Objetivo:** Filtrar e buscar em listagens.

```html
<div class="filter-bar">
  <div class="search-wrap">
    <span class="search-icon"><!-- ícone --></span>
    <input placeholder="Buscar..." />
  </div>
  <div class="filter-divider"></div>
  <button class="filter-chip">
    <!-- ícone --> Filtro
  </button>
  <button class="filter-chip active">Ativo</button>
</div>
```

**Quando usar:** Sempre antes de tabelas ou listas filtráveis.

**Quando NÃO usar:** Em drawers compactos. Dentro de cards menores (usar select).

**Estados do filter-chip:**
- Default: borda `--border`, cor `--text-2`
- Hover: borda `--auto`, cor `--auto`
- Active: borda `--auto`, bg `--auto-light`, cor `--auto`

---

## 7. Pagination

```html
<div class="pagination">
  <span class="pagination-info">Mostrando 1–30 de 142</span>
  <div class="page-btns">
    <button class="page-btn">←</button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">→</button>
  </div>
</div>
```

**Posição:** Sempre no rodapé do `table-wrap`, com `border-top`.

---

## 8. Tabs & Navigation

### Tabs de conteúdo (`.tabs`)
**Uso:** Alternar entre seções de conteúdo dentro de uma mesma página.

```html
<div class="tabs">
  <button class="tab active">Tab 1</button>
  <button class="tab">Tab 2</button>
</div>
<div class="tab-pane active">Conteúdo 1</div>
<div class="tab-pane">Conteúdo 2</div>
```

### Sub-navegação de módulo (`.sub-nav`)
**Uso:** Navegação horizontal entre sub-páginas de um módulo (email, SMS, WhatsApp).

```html
<nav class="sub-nav">
  <a class="sub-nav-item active" href="#">
    E-mail
    <span class="sub-nav-count">24</span>
  </a>
  <a class="sub-nav-item" href="#">SMS</a>
</nav>
```

### Segmented Control (`.segmented`)
**Uso:** Alternar entre 2–4 opções mutuamente exclusivas dentro de um componente (ex: visualização em lista vs grid).

```html
<div class="segmented">
  <button class="seg-btn active">Lista</button>
  <button class="seg-btn">Grid</button>
</div>
```

### Diferença entre os três

| Componente | Nível | Escopo |
|-----------|-------|--------|
| Sub-nav | Módulo | Altera a URL/rota |
| Tabs | Página | Altera seção visível |
| Segmented | Componente | Altera modo de exibição |

---

## 9. Drawers

**Objetivo:** Exibir formulário, detalhes ou ação lateral sem sair da tela.

### Estrutura

```html
<div class="overlay" id="drawer-id">
  <div class="drawer drawer-480">
    <div class="drawer-header">
      <div>
        <div class="drawer-title">Título</div>
        <div class="drawer-subtitle">Subtítulo opcional</div>
      </div>
      <button class="drawer-close">×</button>
    </div>
    <div class="drawer-body"><!-- conteúdo scrollável --></div>
    <div class="drawer-footer">
      <button class="btn btn-secondary">Cancelar</button>
      <button class="btn btn-primary">Confirmar</button>
    </div>
  </div>
</div>
```

### Larguras

| Classe | px | Uso |
|--------|-----|-----|
| (padrão) | 50vw | Drawer primário geral |
| `.drawer-480` | 480px | Formulários simples |
| `.drawer-560` | 560px | Formulários médios |
| `.drawer-640` | 640px | Formulários complexos, drawer secundário |
| `.drawer-720` | 720px | Wizards ou conteúdo rico |

### Empilhamento

| Classe | z-index | Uso |
|--------|---------|-----|
| (padrão) | 400 | Drawer primário |
| `.z2` | 500 | Drawer sobre drawer |
| `.z3` | 600 | Drawer terciário |

**Regra:** Máximo 2 drawers empilhados. ESC fecha o mais recente.

### Responsividade
- Em tablet: drawer ocupa 80vw
- Em mobile: drawer ocupa 100vw, comporta-se como bottom sheet

---

## 10. Modals

**Objetivo:** Confirmar ação destrutiva ou exibir formulário que requer foco total.

**Quando usar:** Confirmações de exclusão. Formulários simples (até 6 campos). Visualizações de detalhe rápida.

**Quando NÃO usar:** Formulários complexos (usar drawer). Conteúdo que precisa de scroll longo.

```html
<div class="modal-overlay" id="modal-id">
  <div class="modal-box">
    <div class="drawer-header"><!-- mesmo padrão do drawer --></div>
    <div class="drawer-body"><!-- conteúdo --></div>
    <div class="drawer-footer"><!-- ações --></div>
  </div>
</div>
```

**Max-width:** 500px padrão. Pode variar com inline style para casos específicos.

---

## 11. Dropdown Menu

```html
<div class="dropdown">
  <button class="btn btn-icon btn-secondary">⋮</button>
  <div class="dropdown-menu">
    <div class="dropdown-item">
      <!-- ícone --> Editar
    </div>
    <div class="dropdown-item">Duplicar</div>
    <div class="dropdown-separator"></div>
    <div class="dropdown-item danger">Remover</div>
  </div>
</div>
```

**Posição:** Sempre `right: 0` (alinha à direita do trigger).

**Ordem padrão de ações:**
1. Editar
2. Duplicar / Compartilhar
3. Relatório / Visualizar
4. --- separador ---
5. Remover (danger)

---

## 12. Toasts

**Objetivo:** Notificações não-bloqueantes de feedback de ação.

```html
<div id="toast-container">
  <div class="toast success">
    <span class="toast-icon"><!-- ícone --></span>
    <div class="toast-body">
      <div class="toast-title">Enviado com sucesso</div>
      <div class="toast-text">Sua campanha foi agendada.</div>
    </div>
    <button class="toast-close">×</button>
  </div>
</div>
```

### Tipos

| Classe | Ícone | Uso |
|--------|-------|-----|
| `.toast.success` | Check verde | Operação concluída |
| `.toast.error` | X vermelho | Erro do sistema |
| `.toast.warning` | ! âmbar | Atenção necessária |
| `.toast.info` | i azul | Informação neutra |

**Comportamento:**
- Auto-dismiss: 4 segundos (padrão)
- Posição: canto inferior direito
- Entrada: `slideInRight 0.22s`
- Máximo simultâneo: 3 toasts

---

## 13. Alerts

**Objetivo:** Mensagens contextuais que ficam fixas na tela.

**Quando usar:** Avisos persistentes (ex: "Seu plano vence em 3 dias"). Resultados de ação que precisam de contexto maior.

**Quando NÃO usar:** Para feedback de ação pontual (usar toast).

| Classe | Uso |
|--------|-----|
| `.alert-success` | Confirmação de estado |
| `.alert-warning` | Aviso de limite ou prazo |
| `.alert-info` | Informação de contexto |
| `.alert-error` | Erro de sistema persistente |

---

## 14. Avatar

**Objetivo:** Representar um usuário ou contato visualmente.

| Classe | Tamanho | Uso |
|--------|---------|-----|
| `.avatar-sm` | 28px | Inline em tabelas |
| `.avatar` | 36px | Sidebar, listas |
| `.avatar-lg` | 48px | Headers de perfil |
| `.avatar-xl` | 60px | Perfil detalhado |

**Implementação:** Inicial do nome sobre gradiente `--auto` → `--accent-purple`.

---

## 15. Progress Bar

```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 67%"></div>
</div>
```

**Variantes de cor:**
- Default: `--auto` (brand)
- `.success`: `--success`
- `.warning`: `--warning`
- `.error`: `--error`

---

## 16. Stepper

**Objetivo:** Indicar progresso em wizard de múltiplas etapas.

**Regra:** Mínimo 2 etapas, máximo 5.

### Estados dos círculos

| Classe | Visual | Significado |
|--------|--------|------------|
| `.future` | Cinza, borda | Etapa não alcançada |
| `.active` | Brand, ring de luz | Etapa atual |
| `.done` | Brand sólido | Etapa concluída |

---

## 17. Bulk Actions Bar

**Objetivo:** Exibir ações disponíveis quando múltiplos itens estão selecionados.

**Comportamento:** Aparece via `fadeIn` quando há itens selecionados, desaparece quando seleção é desmarcada.

**Posição:** Logo acima da tabela, substituindo o filter-bar quando ativo.

**Ações padrão (variam por contexto):**
- Adicionar marcador
- Remover marcador
- Exportar
- Remover (danger)

---

## 18. Empty State

**Objetivo:** Comunicar ausência de dados de forma útil.

**Variantes por contexto:**

| Contexto | Ícone sugerido | CTA |
|---------|---------------|-----|
| Lista vazia (nunca usada) | Inbox | Botão primário "Criar primeiro [item]" |
| Busca sem resultados | SearchX | Ghost "Limpar busca" |
| Filtro sem resultados | Filter | Ghost "Remover filtros" |
| Erro de carregamento | AlertCircle | Primary "Tentar novamente" |
| Permissão negada | Lock | — |

---

## 19. Loading / Skeleton

### Spinner
- Classe: `.spinner`
- Tamanho: 18px (padrão)
- Cor: `border-top-color: var(--brand)`
- Uso: dentro de botões, em centros de seção durante carregamento

### Skeleton (a implementar)
- Retângulos com `background: linear-gradient(...)` animado
- Simular a estrutura real do conteúdo que vai carregar
- Altura deve corresponder ao elemento que vai substituir

---

## 20. Toggle

**Objetivo:** Habilitar/desabilitar configuração binária.

- Sempre acompanhar de label textual (`<label>`)
- O estado ON é comunicado visualmente pela cor brand
- Não usar como substituto de checkbox em formulários

---

## 21. Breadcrumb

**Objetivo:** Mostrar localização do usuário dentro da hierarquia.

```html
<nav class="topbar-breadcrumb">
  <a href="#">Canais</a>
  <span class="sep">/</span>
  <a href="#">E-mail</a>
  <span class="sep">/</span>
  <span class="current">Novo Envio</span>
</nav>
```

**Regra:** Máximo 3 níveis visíveis. O item atual não é clicável.

---

## 22. Tooltip

**Implementação atual:** CSS puro via `[data-tip]`.

```html
<button data-tip="Duplicar envio" class="btn btn-icon btn-secondary">
  <!-- ícone -->
</button>
```

**Limitações da implementação atual:** Apenas posição acima (top). Sem suporte a posições laterais. Para tooltips ricos, implementar via JS.

---

## 23. KPI Card

**Objetivo:** Exibir métrica-chave com variação percentual.

```html
<div class="kpi-card">
  <div class="kpi-label">TAXA DE ABERTURA</div>
  <div class="kpi-value">24,3%</div>
  <div class="kpi-trend trend-up">↑ 2,1% vs mês anterior</div>
</div>
```

**Regra de dashboard:** Máximo 4 KPI cards por bloco hero.

**Trends:**
- `.trend-up` → `--success`
- `.trend-down` → `--error`
- `.trend-neutral` → `--text-3`

---

## 24. List Card

**Objetivo:** Representar uma entidade (lista de contatos, campanha) com seus KPIs inline.

**Estrutura:**
```
┌─────────────────────────────┐
│ [ícone] Título              │
│         Metadado            │
├──────────┬──────────┬───────┤
│ Métrica1 │ Métrica2 │ Métr3 │
└──────────┴──────────┴───────┘
```

**Regra:** Máximo 4 métricas na barra inferior. Sempre usar `.list-stat-label` e `.list-stat-value`.

---

## 25. Flow Card

**Objetivo:** Representar um fluxo de automação em formato de card.

**Diferencial do List Card:** Usa ícone com cor `--fluxos` (verde) ao invés de `--auto`.

---

## 26. Module Banner

**Objetivo:** Introduzir um módulo com hero colorido.

**Regra:** Máximo 1 por tela. Não usar em sub-páginas de módulo (apenas na entrada do módulo).

**Gradient padrão:** `linear-gradient(135deg, var(--auto) 0%, var(--accent-purple) 100%)`

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md, 01-DESIGN-SYSTEM.md*
