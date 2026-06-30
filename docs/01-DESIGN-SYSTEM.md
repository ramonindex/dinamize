# 01 — DESIGN SYSTEM
**Fonte da verdade para todos os valores visuais do produto Dinamize.**

> Antes de usar qualquer valor, verificar se existe token correspondente. Nunca hardcodar valores que estejam aqui.

---

## 1. Tipografia

### Famílias

| Papel | Fonte | Uso |
|-------|-------|-----|
| Display | Nunito | Títulos de página, KPI values, títulos de cards, logo |
| Body | DM Sans | Todo texto de interface, botões, labels, dados |

**Regra:** `font-display` para hierarquia; `font-body` para tudo mais. Nunca misturar dentro do mesmo componente sem motivo.

### Escala tipográfica

| Tamanho | px | Peso típico | Uso |
|---------|-----|-------------|-----|
| xs | 11px | 600–700 | Badges, labels uppercase, metadados |
| sm | 12px | 400–600 | Sub-labels, célula secundária de tabela, help text |
| base | 13px | 400–500 | Corpo de texto, itens de lista, dropdowns |
| md | 14px | 500 | Texto de interface ligeiramente destacado |
| lg | 15px | 700 | Títulos de cards, list-card-title |
| xl | 17px | 700–800 | Títulos de seção, drawer-title |
| 2xl | 20px | 800 | module-banner-title |
| 3xl | 24px | 800 | — (reservado) |
| page | 22px | 800 | page-title |
| kpi | 28px | 800 | kpi-value |

### Pesos permitidos

| fw | Uso |
|----|-----|
| 400 | Texto corrido, dados de tabela |
| 500 | Interface padrão, nav items, chips |
| 600 | Ênfase, labels de form, section titles |
| 700 | Títulos de componente, nomes em cards |
| 800 | Títulos de página, KPI values, display |

### Letter spacing

| Classe | Valor | Uso |
|--------|-------|-----|
| `.ls-tight` | -0.4px | Títulos grandes (display) |
| `.ls-wide` | +0.6px | Labels uppercase (badges, table headers) |
| `.uppercase` | — | Labels de seção, headers de tabela |

---

## 2. Paleta de Cores

### Brand

```
--brand:        #EA5456   ← vermelho principal Dinamize
--brand-dark:   #D43840   ← hover/pressed do brand
--brand-light:  #FEF1F1   ← backgrounds de destaque brand
--brand-mid:    #FCCECE   ← borders e divisores brand
--brand-rgb:    234, 84, 86  ← para rgba()
```

### Cores de Módulo

```
--auto:         #EA5456   (alias brand — usar para módulo Automação/Canais)
--auto-dark:    #D43840
--auto-light:   #FEF1F1
--auto-mid:     #FCCECE
--auto-rgb:     234, 84, 86

--fluxos:       #0EA679   ← verde para módulo Fluxos
--fluxos-light: #E6FAF3

--ia:           #F59E0B   ← âmbar para módulo IA
--ia-light:     #FFFBEB

--accent-purple: #7F7BEE  ← roxo para gradientes e avatares (pendente token oficial)
```

**Nota:** `--auto` e `--brand` são atualmente idênticos. Usar `--auto` em componentes de interface e `--brand` apenas para identidade de marca. Quando o produto evoluir e as cores divergirem, a separação já estará no código.

### Surfaces

```
--bg:           #F2F3F7   ← background da aplicação
--bg-subtle:    #EDEEF2   ← variante mais escura do bg
--surface:      #FFFFFF   ← cards, sidebar, topbar
--surface-2:    #F8F9FB   ← surface secundária (hover de tabela)
```

### Borders

```
--border:       #E2E4EA   ← borda padrão
--border-light: #ECEEF3   ← borda interna, divisores sutis
--border-strong:#C8CBD5   ← borda em hover ou ênfase
```

### Texto

```
--text-1:  #1E2130   ← primário (headings, valores)
--text-2:  #4A5168   ← secundário (labels, nav)
--text-3:  #8891A8   ← muted (metadados, placeholders de label)
--text-4:  #B8BECC   ← placeholder de input
```

### Semânticas

```
Sucesso:
--success:       #1a9e6f
--success-light: #e8f8f2
--success-mid:   #a3e6cb

Warning:
--warning:       #d97b0e
--warning-light: #fef7e8
--warning-mid:   #fcd998

Info:
--info:          #2d74d8
--info-light:    #eff5fe
--info-mid:      #aac8f5

Erro:
--error:         #d63b3b
--error-light:   #fdf2f2
--error-mid:     #f5aaaa
```

### Temperatura de Contatos (pendente tokenização)

```
Quente:  bg #fff5f0 / text #c0392b
Morno:   bg #fef3c7 / text #d97706
Frio:    bg #dbeafe / text #2563eb
```

---

## 3. Shadows

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,.04)` | Botões toggle, elementos minimamente elevados |
| `--shadow-sm` | `0 1px 3px ...` | Cards em repouso (opcional) |
| `--shadow` | `0 2px 8px ...` | Estado padrão de cards com shadow |
| `--shadow-md` | `0 4px 16px ...` | Hover de cards, drawers fechados |
| `--shadow-lg` | `0 8px 32px ...` | Toasts, dropdown menus |
| `--shadow-xl` | `0 16px 48px ...` | Modais, drawers abertos |

**Regra:** Cards com borda (`border: 1px solid var(--border)`) não devem ter shadow em repouso. Shadow aparece apenas no hover.

---

## 4. Bordas / Radius

| Token | Valor | Uso canônico |
|-------|-------|-------------|
| `--radius-xs` | 4px | Tags, badges, inputs, checkbox |
| `--radius-sm` | 6px | Botões, chips, dropdowns, nav items |
| `--radius` | 8px | Cards menores, radio-cards, form-group |
| `--radius-md` | 10px | Toasts, dropdown-menu container |
| `--radius-lg` | 12px | Cards principais, table-wrap, list-cards |
| `--radius-xl` | 16px | Modais, empty-state icons |
| `--radius-2xl` | 20px | Module banners |
| `--radius-full` | 9999px | Badges pill, avatares, toggles, progress |

---

## 5. Espaçamento

Base: **8px**. Todos os espaçamentos são múltiplos ou meios deste valor.

| Valor | Uso |
|-------|-----|
| 4px | Gap mínimo entre ícone e texto |
| 5px | Gap interno de badges e tags |
| 6px | Padding de botão sm, gap de chips |
| 7px | Gap padrão de botões |
| 8px | Gap de grid utilities, spacing mínimo de lista |
| 10px | Padding de nav items |
| 12px | Padding de botão sm, padding de dropdown items |
| 14px | Margin-bottom de form groups |
| 16px | Padding padrão de cards, gap de grids |
| 18px | Padding de headers de card |
| 20px | Padding de card-padded, kpi-card |
| 24px | Padding do main-content, gap de seções, drawer header/body |
| 28px | Padding de module-banner |
| 32px | — |
| 40px | — |
| 48px | — |
| 60px | Padding vertical de empty states |

---

## 6. Motion

### Durations

| Token | Valor | Uso |
|-------|-------|-----|
| `--dur-fast` | 0.12s | Cor, opacity, border-color (hover states) |
| `--dur` | 0.18s | Transições padrão de transform e shadow |
| `--dur-slow` | 0.28s | Drawers, overlays, elementos de entrada |

### Easings

| Token | Valor | Uso |
|-------|-------|-----|
| `--ease` | `cubic-bezier(.32,0,.18,1)` | Movimentos de posição, slide, scale |
| `--ease-out` | `cubic-bezier(0,0,.58,1)` | Elementos que "chegam" (saída rápida) |

### Animações definidas

| Nome | Comportamento | Uso |
|------|--------------|-----|
| `fadeIn` | opacity 0→1 + translateY(6px→0) | Panes, views |
| `fadeInScale` | opacity 0→1 + scale(.97→1) | Dropdown menus |
| `slideInRight` | opacity 0→1 + translateX(8px→0) | Toasts |
| `spin` | rotate 360° infinito | Spinners de loading |

### Regras de motion

- Máximo de **1 animação de entrada** por vez na tela.
- Drawers e modais sempre com `--dur-slow` na entrada e no overlay.
- Hover states sempre com `--dur-fast`.
- Nunca animar `width` ou `height` diretamente — preferir `transform: scaleX()` ou `max-height`.

---

## 7. Ícones

- Biblioteca: **Lucide Icons** (SVG inline, `currentColor`)
- Tamanho padrão: **16px** em interface; **20px** em nav; **18px** em botões com texto
- `pointer-events: none` obrigatório em SVGs dentro de botões
- Nunca usar imagens para ícones de interface

---

## 8. Layout e Grid

### App Shell

```
┌─────────────────────────────────────┐
│  Sidebar (220px)  │  App Body       │
│                   │  ┌────────────┐ │
│  Logo             │  │  Topbar    │ │ ← 52px
│  Nav              │  │  (52px)    │ │
│                   │  ├────────────┤ │
│  User widget      │  │  Content   │ │ ← flex: 1, overflow-y: auto
│                   │  │  (24px pad)│ │
└─────────────────────────────────────┘
```

### Breakpoints

| Nome | Viewport | Comportamento |
|------|----------|--------------|
| Desktop | ≥1280px | Sidebar expandida, 12 colunas |
| Tablet | 768–1279px | Sidebar colapsada (60px), 8 colunas |
| Mobile | <768px | Sidebar em drawer, 4 colunas |

### Grids de conteúdo

```css
.content-grid-4   → repeat(4, 1fr)   /* KPI cards */
.content-grid-3   → repeat(3, 1fr)   /* Cards de módulo */
.content-grid-2   → repeat(2, 1fr)   /* Painéis paralelos */
.content-grid-1-2 → 1fr 2fr          /* Sidebar + conteúdo */
.content-grid-2-1 → 2fr 1fr          /* Conteúdo + painel */
```

---

## 9. Estados globais

### Loading
- Spinner: `18px`, border de 2px, `border-top-color: var(--brand)`, animação `spin 0.7s linear`
- Skeleton: retângulos com background animado (pendente implementação)
- Botão loading: substituir label por spinner + texto "Aguarde..."

### Empty State
- Ícone: container `52px × 52px`, `--bg-subtle`, `--radius-xl`, `color: var(--text-3)`
- Título: `font-display`, 15px, 700, `--text-1`
- Texto: 13px, `--text-3`, max-width 320px, line-height 1.5
- CTA: botão primário ou ghost dependendo da ação

### Erro
- Inline: `font-size: 11px`, `color: var(--error)`, abaixo do campo
- Alert: componente `.alert-error` com ícone e texto
- Toast: `.toast.error` no canto inferior direito

### Sucesso
- Toast: `.toast.success`, auto-dismiss 4s
- Alert inline: `.alert-success`
- Badge: `.badge-success`

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md*
