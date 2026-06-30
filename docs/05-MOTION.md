# 05 — MOTION
**Sistema de animações e transições do produto Dinamize.**

---

## Filosofia

Motion no Dinamize serve para:
1. **Orientar** — mostrar de onde veio e para onde foi um elemento
2. **Confirmar** — dar feedback imediato de interação
3. **Conectar** — ligar ação a resultado

Motion **não** serve para: decoração, demonstrar tecnologia, chamar atenção.

---

## Tokens de motion

| Token | Valor | Propósito |
|-------|-------|-----------|
| `--dur-fast` | 0.12s | Mudanças de cor, opacity, border |
| `--dur` | 0.18s | Transições de transform, shadow |
| `--dur-slow` | 0.28s | Elementos de grande área (drawers, overlays) |
| `--ease` | `cubic-bezier(.32, 0, .18, 1)` | Movimentos de posição e escala |
| `--ease-out` | `cubic-bezier(0, 0, .58, 1)` | Elementos que entram na tela |

---

## Animações definidas

### fadeIn
**Uso:** Panes de tab, views ao trocar de seção, conteúdo carregado assincronamente.
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
**Duration:** `--dur` (0.18s)

### fadeInScale
**Uso:** Dropdown menus, tooltips.
```css
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(.97); }
  to   { opacity: 1; transform: scale(1); }
}
```
**Duration:** `--dur-fast` (0.12s) — deve ser instantâneo perceptivamente

### slideInRight
**Uso:** Toasts de notificação.
```css
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(8px); }
  to   { opacity: 1; transform: translateX(0); }
}
```
**Duration:** 0.22s (valor fixo, ligeiramente acima do `--dur-fast`)

### spin
**Uso:** Spinners de loading.
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```
**Duration:** 0.7s linear infinite

---

## Padrões por componente

### Botões
- Hover: `translateY(-1px)` + sombra colorida — `--dur-fast`
- Active/pressed: `translateY(0)` — imediato (sem duration)
- Disabled: sem transição (estado estático)

### Cards
- Hover: `box-shadow: var(--shadow-md)` — `--dur`
- Nunca animar posição ou tamanho de card

### Drawers
- Entrada: `translateX(100%) → translateX(0)` — `--dur-slow`, `--ease`
- Overlay: `opacity: 0 → 1` — `--dur-slow`, `--ease`
- Saída: reverso com mesma duração

### Modais
- Entrada: `scale(.97) → scale(1)` — `--dur`, `--ease`
- Overlay: `opacity: 0 → 1` — `--dur`, `--ease`
- Mais rápido que drawer pois é menor

### Dropdown menus
- Entrada: `fadeInScale` — `--dur-fast`
- Saída: `display: none` imediato (sem animação de saída)

### Toasts
- Entrada: `slideInRight` — 0.22s
- Saída: fade — 0.2s ao auto-dismiss

### Tabs / Views
- Troca de conteúdo: `fadeIn` — `--dur`
- Indicador de tab ativo: `border-color` — `--dur-fast`

### Toggles
- Estado on/off: `background` — 0.2s, transform do thumb — 0.2s

### Progress bar
- Preenchimento: `width` — 0.5s, `--ease`

### Stepper
- Mudança de estado: `background`, `color`, `box-shadow` — `--dur`
- Linha de progresso: `background` — `--dur`

---

## Regras de motion

### O que animar
✅ `opacity` — mudanças de presença  
✅ `transform` — posição, escala, rotação  
✅ `box-shadow` — elevação  
✅ `border-color` — estados de foco/hover  
✅ `background-color` — estados interativos  
✅ `color` — mudanças de texto (raro)

### O que NÃO animar
❌ `width` / `height` diretamente — causa layout reflow  
❌ `top` / `left` — usar `transform: translate()` no lugar  
❌ `border-width` — causa layout reflow  
❌ `font-size` — causa reflow  
❌ Múltiplos elementos entrando simultaneamente  

### Regras gerais
- `will-change: transform` apenas quando necessário (drawers, elementos que animam repetidamente)
- Respeitar `prefers-reduced-motion` — todas as animações devem ter fallback estático
- Máximo 1 animação de entrada por interação do usuário
- Animações de loop (spin) devem ter `animation-play-state: paused` quando o elemento não está visível

---

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Esta regra deve estar no `base.css`. Usuários com sensibilidade a movimento recebem a interface funcional sem animações.

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md, 01-DESIGN-SYSTEM.md*
