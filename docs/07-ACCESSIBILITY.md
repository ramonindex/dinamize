# 07 — ACCESSIBILITY
**Padrões de acessibilidade do produto Dinamize. Target: WCAG 2.1 AA.**

---

## 1. Contraste de cores

| Tipo | Ratio mínimo | Verificar |
|------|-------------|---------|
| Texto normal (< 18px regular / < 14px bold) | 4.5:1 | Todos os textos de interface |
| Texto grande (≥ 18px regular / ≥ 14px bold) | 3:1 | Títulos de página, KPI values |
| Componentes de UI e estados | 3:1 | Bordas de input, ícones, botões |

### Pares aprovados

| Foreground | Background | Ratio | Uso |
|-----------|-----------|-------|-----|
| `--text-1` (#1E2130) | `--surface` (#FFF) | ~16:1 | Texto principal |
| `--text-2` (#4A5168) | `--surface` (#FFF) | ~8:1 | Texto secundário |
| `--text-3` (#8891A8) | `--surface` (#FFF) | ~4.6:1 | ✅ mínimo AA |
| `--brand` (#EA5456) | `#FFF` | ~4.0:1 | ⚠️ Apenas texto grande |
| `#FFF` | `--brand` (#EA5456) | ~4.0:1 | ⚠️ Botão primário — texto deve ser bold |

**Atenção:** `--text-3` em backgrounds escuros (`--bg`) pode não passar. Sempre verificar combinações novas.

---

## 2. Foco visível

Todo elemento interativo deve ter estado de foco visível:

```css
/* Ring padrão do sistema */
:focus-visible {
  outline: 2px solid var(--auto);
  outline-offset: 2px;
}

/* Para inputs — já implementado */
.form-input:focus {
  border-color: var(--auto);
  box-shadow: 0 0 0 3px rgba(var(--auto-rgb), .1);
}
```

**Nunca:** `outline: none` sem alternativa visual equivalente.

---

## 3. Semântica HTML

### Estrutura de página
```html
<header>  <!-- topbar -->
<nav>     <!-- sidebar -->
<main>    <!-- main-content -->
<aside>   <!-- drawer/panel lateral -->
```

### Hierarquia de headings
```
h1 → page-title (1 por página)
h2 → section-title
h3 → card-title, drawer-title
```
Nunca pular níveis (h1 → h3) por motivos visuais.

### Botões vs Links
- `<button>` → ação (submit, abrir modal, toggle)
- `<a>` → navegação (mudar de URL)
- Nunca usar `<div>` ou `<span>` como botão clicável

---

## 4. ARIA

### Casos obrigatórios

| Elemento | ARIA necessário |
|---------|----------------|
| Icon button sem texto | `aria-label="Descrição da ação"` |
| Modal aberto | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"` |
| Drawer aberto | `role="dialog"`, `aria-labelledby="drawer-title"` |
| Toggle | `role="switch"`, `aria-checked="true/false"` |
| Badge de status | `aria-label` se o status for comunicado apenas por cor |
| Loading | `aria-live="polite"` na região que vai receber o conteúdo |
| Toast | `role="status"` ou `role="alert"` dependendo da urgência |
| Nav sidebar | `role="navigation"`, `aria-label="Navegação principal"` |

### Casos comuns

```html
<!-- Icon button -->
<button class="btn-icon" aria-label="Fechar">
  <svg><!-- × --></svg>
</button>

<!-- Toggle -->
<button class="toggle" role="switch" aria-checked="false" aria-label="Ativar notificações">
</button>

<!-- Toast crítico -->
<div class="toast error" role="alert">...</div>

<!-- Toast informativo -->
<div class="toast info" role="status">...</div>
```

---

## 5. Teclado

### Navegação esperada

| Tecla | Comportamento |
|-------|-------------|
| Tab | Avança para próximo elemento interativo |
| Shift+Tab | Retrocede para elemento anterior |
| Enter/Space | Ativa botão ou link com foco |
| Escape | Fecha modal/drawer/dropdown mais recente |
| Arrow keys | Navega em tabs, select, dropdown menu |

### Trap de foco (modais e drawers)

Quando um modal ou drawer está aberto:
- O foco deve ficar preso dentro do overlay
- Tab no último elemento → vai para o primeiro elemento do overlay
- ESC fecha e retorna o foco ao elemento que abriu o overlay

---

## 6. Imagens e ícones

- Ícones decorativos: `aria-hidden="true"`
- Ícones com significado: `aria-label` no elemento pai ou `<title>` no SVG
- Imagens: sempre `alt` descritivo; `alt=""` para decorativas

---

## 7. Formulários

```html
<!-- Sempre: label associado explicitamente -->
<label for="email-input" class="form-label">E-mail</label>
<input id="email-input" class="form-input" type="email" 
       aria-required="true"
       aria-describedby="email-help email-error" />
<span id="email-help" class="form-help">Use seu e-mail corporativo</span>
<span id="email-error" class="form-error" role="alert">E-mail inválido</span>
```

- `aria-required="true"` em campos obrigatórios
- `aria-invalid="true"` quando há erro de validação
- `aria-describedby` apontando para help text e error
- Erros anunciados por `role="alert"` quando aparecem dinamicamente

---

## 8. Cores e informação

Nunca transmitir informação **apenas** por cor:
- Badges de status: sempre ter texto além da cor
- Temperatura de contato: ícone ou texto além da cor
- Erros de formulário: texto além de border vermelha
- Gráficos: padrão ou texture além de cor

---

## 9. prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

A interface deve funcionar completamente sem animações.

---

## 10. Checklist de acessibilidade

Antes de entregar qualquer tela:

- [ ] Todos os textos passam contraste AA?
- [ ] Foco visível em todos os elementos interativos?
- [ ] Hierarquia de headings correta (h1 → h2 → h3)?
- [ ] Botões/links com propósito semântico correto?
- [ ] Icon buttons têm aria-label?
- [ ] Modais/drawers têm trap de foco?
- [ ] Formulários têm labels associados?
- [ ] Erros de form anunciados por role="alert"?
- [ ] Cores não são o único meio de transmitir informação?
- [ ] prefers-reduced-motion está respeitado?

---

*Versão: 1.0 | Data: 2026-06-30 | Target: WCAG 2.1 AA*
