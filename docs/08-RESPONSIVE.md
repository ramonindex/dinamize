# 08 — RESPONSIVE
**Estratégia de design responsivo do produto Dinamize.**

---

## 1. Breakpoints

| Nome | Range | Colunas | Sidebar |
|------|-------|---------|---------|
| Mobile compact | 360–389px | 4 | Oculta (drawer) |
| Mobile standard | 390–429px | 4 | Oculta (drawer) |
| Mobile large | 430–599px | 4 | Oculta (drawer) |
| Foldable / small tablet | 600–767px | 4 | Oculta (drawer) |
| Tablet portrait | 768–1023px | 8 | Colapsada (60px) |
| Tablet landscape | 1024–1279px | 8 | Colapsada (60px) |
| Laptop | 1280–1439px | 12 | Expandida (220px) |
| Desktop | 1440–1919px | 12 | Expandida (220px) |
| Wide | ≥1920px | 12 | Expandida (220px) |

---

## 2. Estratégia mobile-first

O código CSS deve ser escrito mobile-first:
```css
/* base → mobile */
.content-grid-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* tablet */
@media (min-width: 768px) {
  .content-grid-4 {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
```

---

## 3. Comportamento dos grids

| Grid | Mobile (<768) | Tablet (768–1279) | Desktop (≥1280) |
|------|--------------|---------------------|-----------------|
| `content-grid-4` | 2 colunas | 2 colunas | 4 colunas |
| `content-grid-3` | 1 coluna | 2 colunas | 3 colunas |
| `content-grid-2` | 1 coluna | 2 colunas | 2 colunas |
| `content-grid-1-2` | stack (1 col) | stack (1 col) | 1fr 2fr |
| `content-grid-2-1` | stack (1 col) | 2fr 1fr | 2fr 1fr |

---

## 4. Sidebar responsiva

### Desktop (≥1280px)
- Sidebar fixa, 220px, sempre visível
- Main content começa depois da sidebar

### Tablet (768–1279px)
- Sidebar colapsada, 60px, apenas ícones
- Tooltip no hover de cada ícone mostra o label
- Main content usa o espaço extra

### Mobile (<768px)
- Sidebar completamente oculta (position: fixed, translateX(-100%))
- Botão de hambúrguer na topbar
- Sidebar abre como overlay (100% height, z-index 400)
- Overlay escuro atrás

---

## 5. Topbar responsiva

### Desktop
```
[breadcrumb] [search (max 420px)] [ações]
```

### Tablet
```
[breadcrumb] [search (flex:1)] [ações]
```

### Mobile
```
[hambúrguer] [logo/título] [notif + avatar]
```
- Search global some da topbar (move para página ou bottom sheet)

---

## 6. Drawers responsivos

| Viewport | Largura padrão |
|----------|---------------|
| Desktop (≥1280px) | 50vw ou classe explícita (480–720px) |
| Tablet (768–1279px) | 80vw |
| Mobile (<768px) | 100vw, comporta-se como bottom sheet |

Em mobile, drawers entram de baixo para cima (transform: translateY) ao invés de da direita.

---

## 7. Tabelas em mobile

Tabelas com muitas colunas não quebram em mobile — recebem scroll horizontal:
```css
.table-wrap {
  overflow-x: auto;
}
```

Para mobile, colunas menos prioritárias podem ser ocultadas:
```css
@media (max-width: 767px) {
  .col-hide-mobile { display: none; }
}
```

**Prioridade de colunas em mobile:**
1. Checkbox (manter)
2. Nome/identificador (manter)
3. Status badge (manter)
4. Ações (manter)
5. Demais colunas (ocultar com `.col-hide-mobile`)

---

## 8. Tipografia fluida

Para títulos de página e KPI values:

```css
/* page-title */
font-size: clamp(18px, 2vw, 22px);

/* kpi-value */
font-size: clamp(22px, 2.5vw, 28px);
```

Textos de interface (13px padrão) não escalam — são fixos.

---

## 9. Espaçamento responsivo

| Propriedade | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| `main-content` padding | 16px | 20px | 24px |
| `page-header` margin-bottom | 16px | 20px | 24px |
| Grid gap | 12px | 14px | 16px |
| Card padding | 14px 16px | 16px 18px | 16px 18px |

---

## 10. Touch targets

Em mobile, todos os elementos tocáveis devem ter área mínima de 44×44px:
- Botões icon-only: manter 44px mesmo que visual seja menor
- Links de nav: altura mínima 44px
- Checkboxes em tabela: área clicável 44px

---

## 11. Matriz de validação

Antes de declarar responsividade completa, validar em:

| Viewport | Prioridade |
|----------|-----------|
| 360×800 (mobile compact) | ⭐⭐⭐ Crítico |
| 390×844 (iPhone padrão) | ⭐⭐⭐ Crítico |
| 768×1024 (iPad portrait) | ⭐⭐ Importante |
| 1024×768 (iPad landscape) | ⭐⭐ Importante |
| 1366×768 (laptop) | ⭐⭐⭐ Crítico |
| 1440×900 (desktop padrão) | ⭐⭐⭐ Crítico |
| 1920×1080 (wide) | ⭐ Básico |

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md, 03-LAYOUTS.md*
