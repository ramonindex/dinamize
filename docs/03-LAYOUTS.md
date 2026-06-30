# 03 — LAYOUTS
**Padrões de layout e estrutura de páginas do produto Dinamize.**

---

## 1. App Shell

O shell da aplicação é a estrutura global que envolve todo o produto.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  .sidebar (220px)    │  .app-body                │
│  ─────────────────   │  ─────────────────────    │
│  .sidebar-logo       │  .topbar (52px, sticky)   │
│                      │                           │
│  .sidebar-nav        │  .main-content            │
│    .nav-item         │  (flex:1, overflow-y:auto)│
│    .nav-sub          │  padding: 24px            │
│                      │                           │
│  .sidebar-footer     │                           │
│    .user-widget      │                           │
└──────────────────────────────────────────────────┘
```

**Classes:** `.app` → flex container raiz

---

## 2. Sidebar

### Comportamento

| Estado | Largura | Conteúdo visível |
|--------|---------|-----------------|
| Expandida | 220px | Logo + texto, nav com labels, user widget |
| Colapsada | 60px | Apenas ícones, sem labels |

### Estrutura de navegação

```
.sidebar-logo         ← identidade da marca
.sidebar-nav          ← área scrollável de navegação
  .nav-section-label  ← agrupador (ex: "MÓDULOS")
  .nav-item           ← item de primeiro nível
  .nav-item.open      ← item expandido com sub-itens
  .nav-sub            ← lista de sub-itens
    .nav-sub-item     ← item de segundo nível
.sidebar-footer       ← usuário logado
```

### Regras

- Máximo 2 níveis de hierarquia na sidebar.
- Labels de seção (`nav-section-label`) devem ser curtos (≤ 12 caracteres).
- Item ativo tem `background: var(--auto-light)`, `color: var(--auto)`.
- Sub-item ativo tem apenas `color: var(--auto)` (sem background).

---

## 3. Topbar

**Altura fixa:** 52px | **Posição:** sticky, z-index 90

**Estrutura:**
```
[breadcrumb]  [search global - flex:1, max 420px]  [ações - margin-left:auto]
```

**Ações da topbar (da esquerda para direita):**
1. Outros módulos / quick actions
2. Notificações (com `.notif-dot`)
3. Avatar do usuário

---

## 4. Main Content

**Padding:** 24px em todos os lados  
**Overflow:** `overflow-y: auto`  
**Max-width do conteúdo interno:** 1440px (centralizado quando > 1440px)

### Page Header (sempre presente)

```html
<div class="page-header">
  <div>
    <h1 class="page-title">Título da Página</h1>
    <p class="page-subtitle">Subtítulo opcional</p>
  </div>
  <div class="page-actions">
    <!-- botões de ação da página -->
  </div>
</div>
```

### Section Header (dentro de uma página)

```html
<div class="section-header">
  <h2 class="section-title">Título da Seção</h2>
  <div><!-- ação da seção --></div>
</div>
```

---

## 5. Padrões de Página

### 5.1 Página de Listagem (padrão mais comum)

```
page-header
  ↓
[module-banner]  ← opcional, apenas na entrada do módulo
  ↓
filter-bar
  ↓
[bulk-bar]  ← condicional quando há seleção
  ↓
table-wrap
  data-table
  pagination
```

### 5.2 Página de Dashboard

```
page-header (título + CTA secundário)
  ↓
content-grid-4  ← 4 KPI cards
  ↓
content-grid-2-1  ← gráfico principal (2/3) + painel lateral (1/3)
  ↓
section-header
content-grid-2  ← cards de envios recentes, alertas
```

**Regra de dashboard:**
- Máximo 4 KPIs
- 1 Hero/banner
- 1 CTA principal
- Informação única (sem duplicação de métricas)

### 5.3 Página de Configurações

```
page-header
  ↓
sub-nav (tabs horizontal de categorias)
  ↓
[view ativa]
  form-group × n
  drawer-footer (sticky na bottom)
```

### 5.4 Wizard (múltiplos passos)

```
page-header
  ↓
stepper (3–5 etapas)
  ↓
[conteúdo da etapa atual]
  ↓
footer com [Voltar] e [Próximo / Finalizar]
```

### 5.5 Página de Detalhe (entity view)

```
page-header  ←  nome da entidade + ações (editar, etc.)
  ↓
content-grid-1-2 ou content-grid-2-1
  ↓
  painel esquerdo: informações principais
  painel direito: metadados, status, ações rápidas
```

---

## 6. Grids de Conteúdo

| Classe | Layout | Uso típico |
|--------|--------|-----------|
| `.content-grid-4` | `repeat(4, 1fr)` | KPI cards |
| `.content-grid-3` | `repeat(3, 1fr)` | Cards de feature, módulos |
| `.content-grid-2` | `repeat(2, 1fr)` | Dois painéis iguais |
| `.content-grid-1-2` | `1fr 2fr` | Sidebar de filtro + lista |
| `.content-grid-2-1` | `2fr 1fr` | Conteúdo principal + sidebar |

**Gap padrão:** 16px em todos os grids.

**Responsividade dos grids:**

| Grid | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| `grid-4` | 4 col | 2 col | 1 col |
| `grid-3` | 3 col | 2 col | 1 col |
| `grid-2` | 2 col | 2 col | 1 col |
| `grid-1-2` | 1fr 2fr | stack | stack |
| `grid-2-1` | 2fr 1fr | stack | stack |

---

## 7. Sub-navegação de Módulo

Quando um módulo tem sub-páginas (Canais → Email / SMS / WhatsApp):

```
topbar (breadcrumb mostra módulo pai)
  ↓
sub-nav (links para sub-páginas)
  ↓
main-content (24px padding)
```

A sub-nav fica **acima** do main-content, dentro do app-body, sem padding próprio.

---

## 8. Overlay System (Drawers e Modais)

```
z-index 9999 → Toasts
z-index 800  → Dropdowns
z-index 700  → Modal
z-index 600  → Drawer terciário (.z3)
z-index 500  → Drawer secundário (.z2)
z-index 400  → Drawer primário
z-index 100  → Sidebar
z-index 90   → Topbar
```

**Regra:** Nada exceto toasts pode ter z-index > 700. Modais sempre têm prioridade sobre drawers.

---

## 9. Responsividade

### Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1279px) { }

/* Desktop */
@media (min-width: 1280px) { }

/* Wide */
@media (min-width: 1920px) { }
```

### Comportamento por breakpoint

**Mobile (<768px):**
- Sidebar: oculta por padrão, abre como drawer (full-height, z-index 400)
- Main content: padding 16px
- Grids: todas as colunas viram 1 coluna (stack)
- Tabelas: scroll horizontal
- Drawers: 100vw

**Tablet (768–1279px):**
- Sidebar: colapsada (60px, apenas ícones)
- Main content: padding 20px
- `content-grid-4` → 2 colunas
- `content-grid-3` → 2 colunas
- Drawers: 80vw

**Desktop (≥1280px):**
- Sidebar: expandida (220px)
- Main content: padding 24px
- Todos os grids em sua configuração padrão

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md*
