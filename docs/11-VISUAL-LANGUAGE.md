# 11 — VISUAL LANGUAGE
**Linguagem visual do produto Dinamize — como os elementos se comportam visualmente.**

---

## 1. Filosofia visual

**Clean. Premium. Funcional.**

O Dinamize compete com ferramentas como HubSpot, Mailchimp e RD Station. O visual deve transmitir confiança, maturidade e profissionalismo — não startup exuberante.

Referências visuais de ordem de prioridade:
1. **Linear** → densidade informacional com leveza
2. **Stripe Dashboard** → tabelas e dados com elegância
3. **Notion** → hierarquia limpa, espaço generoso
4. **Apple Settings** → precisão, consistência
5. **Airbnb** → cards com proporção certa

---

## 2. Princípios visuais

### 2.1 Espaço como design
Espaço em branco não é espaço desperdiçado. Ele cria respiração, hierarquia e foco.
- Entre cards: sempre 16px
- Entre seções de página: sempre 24px
- Dentro de cards: padding consistente (16–24px)

### 2.2 Uma cor, um propósito
- Brand/Auto (`#EA5456`): ações primárias e elementos de destaque
- Fluxos (`#0EA679`): exclusivo para módulo de fluxos
- IA (`#F59E0B`): exclusivo para módulo de IA
- Semânticas (success/warning/error/info): apenas para estados

Nunca usar a cor brand para decoração. Cada aparição da cor brand chama atenção — deve haver razão.

### 2.3 Textura através de dados
O design não precisa de elementos decorativos. A textura vem dos próprios dados bem apresentados.

### 2.4 Hierarquia tipográfica forte
```
page-title (22px, 800) → h1 da tela
section-title (15px, 700) → agrupador
card-title (14px, 700) → cabeçalho de card
corpo (13px, 400–500) → dados e texto
muted (12–11px, 400) → metadados
```

Nunca usar bold em texto muted. Nunca usar tamanho grande em texto secundário.

---

## 3. Elevação e profundidade

O sistema usa 3 planos visuais:

```
Plano 0: Background da aplicação (--bg: #F2F3F7)
Plano 1: Cards e surfaces (--surface: #FFF, border 1px)
Plano 2: Overlays (drawers, modais — shadow-xl)
```

**Regra:** Nunca criar um 4º plano (card dentro de card com shadow).

### Comunicação de elevação

| Nível | Como comunicar |
|-------|---------------|
| Background | `--bg` (#F2F3F7) |
| Surface em repouso | `--surface` + `border: 1px solid var(--border)` |
| Surface em hover | `box-shadow: var(--shadow-md)` |
| Overlay | `box-shadow: var(--shadow-xl)` |

**Nunca usar shadow em elemento que já tem borda E está em repouso.**

---

## 4. Bordas e radius

### Consistência de radius por tipo de elemento

| Elemento | Radius | Motivo |
|---------|--------|--------|
| Tags, badges | `--radius-xs` (4px) | Compactos, densos |
| Botões, inputs, chips | `--radius-sm` (6px) | Interface padrão |
| Cards, table-wrap | `--radius-lg` (12px) | Containers de conteúdo |
| Modais | `--radius-xl` (16px) | Destaque, mais "premium" |
| Module banner | `--radius-2xl` (20px) | Hero, mais suave |
| Toggles, avatares | `--radius-full` (9999px) | Circular por design |

**Nunca misturar:** um card não pode ter parte com `--radius-sm` e parte com `--radius-lg`.

---

## 5. Ícones

### Sistema de ícones
- Biblioteca: **Lucide Icons** (consistente, open source, SVG limpo)
- Estilo: outline (nunca solid exceto em badges/estados específicos)
- Cor: `currentColor` (herda do contexto)
- `pointer-events: none` obrigatório em SVGs dentro de botões

### Tamanhos

| Contexto | Tamanho |
|---------|---------|
| Nav sidebar | 18px |
| Botões com texto | 16px |
| Icon buttons | 16px |
| Badges | 12px |
| Tabela (ações) | 15px |
| Empty state | 22px |
| Module banner | 28px |

### Ícones por módulo

| Módulo | Ícone sugerido |
|--------|---------------|
| Contatos | Users |
| Listas | List |
| Segmentações | Filter |
| Importar | Upload |
| E-mail | Mail |
| SMS | MessageSquare |
| WhatsApp | MessageCircle |
| Landing Pages | Globe |
| Fluxos | GitBranch |
| Relatórios | BarChart2 |
| IA | Sparkles |
| Configurações | Settings |
| Ajuda | HelpCircle |
| Dashboard | LayoutDashboard |

---

## 6. Gradientes

Gradientes são restritos a dois contextos:

1. **Module banner** — horizontal/diagonal com `--auto` e `--accent-purple`
2. **Avatar** — quando sem foto, usando mesmo gradiente

```css
/* Único gradiente permitido */
background: linear-gradient(135deg, var(--auto) 0%, var(--accent-purple) 100%);
```

**Nunca:** gradientes de fundo de página, gradientes em cards, gradientes em botões.

---

## 7. Imagens e ilustrações

- Imagens da Dinamize: usar logos e ícones de produtos do sistema
- SVGs de produto: `CRM_ATENDIMENTO.svg`, `CRM_AUTOMACAO.svg`, `CRM_VENDAS.svg`
- Ilustrações de empty state: ícones Lucide com background `--bg-subtle` (sem ilustrações complexas)
- Screenshots de produto: apenas para onboarding, não em interface transacional

---

## 8. Padrões proibidos

| Padrão | Motivo |
|--------|--------|
| Glassmorphism (backdrop-filter em conteúdo) | Legibilidade ruim, peso visual |
| Skeuomorphism | Out of place no contexto |
| Animações de hover em imagens (zoom, parallax) | Distração |
| Cores neon ou muito saturadas | Fora da paleta |
| Fontes além de Nunito e DM Sans | Consistência |
| Múltiplas cores de ícone numa mesma seção | Ruído visual |
| Separadores decorativos (linhas coloridas) | Desnecessário |
| Hero sections em sub-páginas | Só para entrada de módulo |

---

## 9. Module brand colors

Cada módulo tem sua identidade visual de cor:

| Módulo | Cor | Token |
|--------|-----|-------|
| Dashboard | Brand vermelho | `--brand` |
| Contatos | Brand vermelho | `--auto` |
| Canais / E-mail / SMS / WhatsApp | Brand vermelho | `--auto` |
| Fluxos | Verde | `--fluxos` |
| Relatórios | Brand vermelho | `--auto` |
| IA | Âmbar | `--ia` |
| Configurações | Neutro | `--text-2` |

A cor do módulo aparece em:
- Nav item ativo (background: `--auto-light`, color: `--auto`)
- Ícone de cards do módulo
- Linha ativa de sub-nav
- Stepper do módulo

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md, 01-DESIGN-SYSTEM.md*
