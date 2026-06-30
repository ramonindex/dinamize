# CHANGELOG
**Histórico de mudanças no Design System Dinamize.**

---

## v1.0.0 — 2026-06-30

### Fundação do Design System

#### Documentação criada
- `docs/00-CONSTITUTION.md` — Lei máxima do produto
- `docs/01-DESIGN-SYSTEM.md` — Tokens, tipografia, cores, shadows, motion
- `docs/02-COMPONENTS.md` — Catálogo completo de 26 componentes
- `docs/03-LAYOUTS.md` — App shell, grids, padrões de página
- `docs/04-UX-PRINCIPLES.md` — Princípios de experiência
- `docs/05-MOTION.md` — Sistema de animações
- `docs/06-CONTENT.md` — Linguagem e copy
- `docs/07-ACCESSIBILITY.md` — Padrões WCAG 2.1 AA
- `docs/08-RESPONSIVE.md` — Breakpoints e responsividade
- `docs/09-DATA-DISPLAY.md` — Tabelas, gráficos, métricas
- `docs/10-INTERACTION-ARCHITECTURE.md` — Fluxos e padrões de interação
- `docs/11-VISUAL-LANGUAGE.md` — Linguagem visual
- `docs/12-BRANDING.md` — Marca e identidade
- `docs/13-GOVERNANCE.md` — Processo de governança
- `governance/CHECKLIST.md` — Checklist pré/pós implementação
- `governance/CHANGELOG.md` — Este arquivo
- `governance/DECISIONS.md` — Registro de decisões

#### Tokens documentados (de `V2/css/tokens.css`)
- Cores: brand, módulos, surfaces, borders, text, semantic
- Shadows: xs, sm, md, lg, xl
- Radius: xs, sm, md, lg, xl, 2xl, full
- Typography: display (Nunito), body (DM Sans)
- Layout: sidebar-w, topbar-h, content-max
- Motion: dur-fast, dur, dur-slow, ease, ease-out

#### Componentes documentados (de `V2/css/components.css`)
1. Buttons (5 variantes, 4 tamanhos, 3 icon sizes)
2. Forms (input, select, textarea, toggle, checkbox, radio-card)
3. Badges & Tags (7 tipos de badge, 3 de temperatura, tag)
4. Cards (card, kpi-card, list-card, flow-card)
5. Tables (data-table, col-check, col-actions, cell-primary/secondary)
6. Filter Bar (search-wrap, filter-chip, filter-divider)
7. Pagination
8. Tabs & Navigation (tabs, sub-nav, segmented)
9. Drawers (4 larguras, 3 níveis de z)
10. Modals
11. Dropdown Menu
12. Toasts (4 tipos)
13. Alerts (4 tipos)
14. Avatar (4 tamanhos)
15. Progress Bar (4 variantes de cor)
16. Stepper (3 estados)
17. Bulk Actions Bar
18. Empty State
19. Loading / Spinner
20. Toggle
21. Breadcrumb
22. Tooltip
23. KPI Card
24. List Card
25. Flow Card
26. Module Banner

#### Issues identificadas na auditoria (pendentes de correção)

**Críticas:**
- [ ] C1: `--auto === --brand` — tokens idênticos sem diferenciação semântica real
- [ ] C3: Z-index não tokenizados (valores hardcoded: 90, 100, 400, 500, 600, 700, 800, 9999)
- [ ] C4: Grade duplicada — `.grid-2/3/4` (base.css) vs `.content-grid-2/3/4` (layout.css)
- [ ] C5: Cores de temperatura hardcoded — não usam tokens
- [ ] C6: `#7F7BEE` (roxo) não tokenizado — usado em gradient e avatar
- [ ] C7: `--content-max: 1400px` mas DESIGN-HANDOFF define 1440px — inconsistência
- [ ] C8: Dois sistemas de tab (.tabs vs .sub-nav) — implementações separadas

**Médias:**
- [ ] M1: Dois componentes de busca (.search-wrap vs .topbar-search)
- [ ] M2: Tokens de spacing não definidos
- [ ] M3: Escala tipográfica sem tokens CSS
- [ ] M6: Skeleton loaders não implementados

---

## Template para próximas versões

```markdown
## v[X.Y.Z] — YYYY-MM-DD

### Novos componentes
- [NomeComponente] — descrição e local de uso

### Componentes alterados
- [NomeComponente] — o que mudou e motivo
  - BREAKING: sim/não

### Componentes removidos / deprecados
- [NomeComponente] — substituto sugerido

### Novos tokens
- `--nome-token` — valor e propósito

### Tokens alterados
- `--nome-token` — valor antigo → valor novo
  - BREAKING: sim/não

### Correções de bug
- Descrição do bug corrigido

### Documentação
- Arquivos atualizados

### Impacto
- Telas/componentes afetados
```

---

*Manter este arquivo ordenado do mais recente para o mais antigo.*
