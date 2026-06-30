# 00 — CONSTITUTION
**Lei máxima do produto Dinamize. Todo trabalho futuro deve ser validado contra este documento antes de qualquer implementação.**

---

## Propósito

Este documento define os princípios inegociáveis de UX, UI, componentes, tokens e governança do sistema Dinamize. Ele não é uma sugestão — é um contrato. Qualquer decisão que conflite com esta constituição requer justificativa documentada em `governance/DECISIONS.md`.

---

## 1. Princípios de UX

### 1.1 Clareza acima de tudo
- O usuário deve entender o que a interface faz antes de interagir com ela.
- Labels descrevem ações, não estados. Botões dizem o que fazem ("Enviar e-mail"), não o que são ("OK").
- Nunca deixar o usuário adivinhar o que aconteceu após uma ação.

### 1.2 Baixa carga cognitiva
- Máximo de 3 ações primárias visíveis por tela.
- Informações secundárias ficam ocultas até serem necessárias (Progressive Disclosure).
- Agrupamento lógico: coisas relacionadas ficam visualmente juntas.

### 1.3 Reconhecimento acima de memorização
- O usuário não deve precisar lembrar onde uma função está.
- Ícones sempre acompanham labels em navegação primária.
- Estados persistem: filtros, seleções e posição de scroll se mantêm ao navegar.

### 1.4 Hierarquia visual forte
- Uma coisa mais importante por seção — nunca dois elementos disputando atenção primária.
- Títulos de página (`page-title`) são os maiores elementos textuais de cada tela.
- KPIs e métricas são maiores que seus labels.

### 1.5 Ações previsíveis
- O mesmo gesto sempre produz o mesmo resultado.
- Destructive actions (deletar, remover) exigem confirmação — nunca ação direta.
- Botões primários ficam sempre à direita em footers de modais e drawers.

### 1.6 Poucos caminhos por tarefa
- Máximo de 5 passos para completar qualquer fluxo crítico.
- Wizards usam no mínimo 3 e no máximo 5 etapas.
- Nunca exigir mais de 2 cliques para ação frequente.

### 1.7 Feedback imediato
- Toda ação do usuário recebe resposta visual em menos de 100ms.
- Operações longas (>300ms) exibem loading state.
- Erros são exibidos próximos ao campo que os causou, não no topo da página.

### 1.8 Progressive Disclosure
- Mostre primeiro o essencial; revele complexidade sob demanda.
- Configurações avançadas ficam em seções colapsáveis ou drawers secundários.
- Templates e presets reduzem fricção no primeiro uso.

### 1.9 Consistência acima de inovação
- Antes de criar um novo padrão, verificar se existe componente reutilizável.
- Padrões novos exigem documentação prévia em `docs/02-COMPONENTS.md`.
- Inovação visual é permitida apenas quando melhora mensurável a experiência.

---

## 2. Princípios de UI

### 2.1 Visual clean e premium
- Espaço em branco é design. Não preencher espaços vazios por insegurança.
- Cada elemento tem sua função. Elementos decorativos sem função são removidos.
- A qualidade percebida vem da consistência, não da quantidade de elementos.

### 2.2 Light-first
- O tema base é claro. Branco `#FFFFFF` é a surface primária.
- Background da aplicação é `#F2F3F7` — suave, não branco puro.
- Contraste de texto mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande).

### 2.3 Referências visuais
- **Apple:** Precisão tipográfica, espaçamento generoso, estados hover sutis.
- **Linear:** Densidade de informação com leveza, navegação lateral limpa.
- **Stripe:** Consistência de componentes, tabelas legíveis, dados apresentados com elegância.
- **Notion:** Hierarquia sem peso visual, Progressive Disclosure natural.
- **Airbnb:** Cards com proporção certa, estados de loading polidos.

### 2.4 Proibições visuais

**NUNCA usar:**
- Glassmorphism (backdrop-filter: blur em superfícies de conteúdo)
- Gradientes como background de páginas
- Mais de 3 níveis visuais de profundidade em uma mesma tela
- Cards dentro de cards (nesting de superfícies)
- Sombras em elementos que já têm borda
- Animações de entrada em mais de 1 elemento por vez
- Cores fora dos tokens definidos
- Texto sobre imagens sem overlay

---

## 3. Regras de Componentes

### 3.1 Hierarquia de decisão

Antes de qualquer implementação, percorrer esta hierarquia obrigatoriamente:

```
1. REUTILIZAR    → Usar componente existente sem modificação
2. ADAPTAR       → Usar componente existente com variante documentada
3. EVOLUIR       → Extender componente existente com nova propriedade
4. CRIAR         → Novo componente (requer justificativa em DECISIONS.md)
```

A criação de novo componente **sem justificativa** é violação de governança.

### 3.2 Padrão obrigatório para todo componente

Todo componente deve ter:
- Objetivo claro (1 frase)
- Quando usar / quando NÃO usar
- Estados: default, hover, active, disabled, loading (quando aplicável)
- Variantes permitidas (documentadas, não inventadas na hora)
- Comportamento responsivo

### 3.3 Nomenclatura de classes CSS

```
Padrão BEM simplificado:
.bloco              → componente raiz
.bloco-elemento     → parte interna
.bloco--modificador → variante ou estado

Exemplos corretos:
.btn                → botão base
.btn-primary        → variante primária
.btn-sm             → tamanho small
.btn:disabled       → estado via pseudo-classe

Proibido:
.bttn               → erro de digitação como classe
.button-big-red     → semântica hardcoded
.myButton           → camelCase
```

---

## 4. Tokens

### 4.1 Cores — escala completa

| Categoria | Tokens |
|-----------|--------|
| Brand | `--brand`, `--brand-dark`, `--brand-light`, `--brand-mid`, `--brand-rgb` |
| Módulos | `--auto` (alias brand), `--fluxos`, `--fluxos-light`, `--ia`, `--ia-light`, `--canal` (alias brand) |
| Surfaces | `--bg`, `--bg-subtle`, `--surface`, `--surface-2` |
| Borders | `--border`, `--border-light`, `--border-strong` |
| Text | `--text-1` (primário), `--text-2` (secundário), `--text-3` (muted), `--text-4` (placeholder) |
| Semantic | `--success`, `--success-light`, `--success-mid` |
| | `--warning`, `--warning-light`, `--warning-mid` |
| | `--info`, `--info-light`, `--info-mid` |
| | `--error`, `--error-light`, `--error-mid` |
| Temperatura | `--temp-hot`, `--temp-hot-text`, `--temp-warm`, `--temp-warm-text`, `--temp-cold`, `--temp-cold-text` ⚠️ *pendente tokenização* |
| Acento | `--accent-purple: #7F7BEE` ⚠️ *pendente tokenização* |

### 4.2 Escala de radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | 4px | Tags, badges pequenos, inputs |
| `--radius-sm` | 6px | Botões, chips, dropdowns |
| `--radius` | 8px | Cards menores, radio-cards |
| `--radius-md` | 10px | Toasts, dropdown menus |
| `--radius-lg` | 12px | Cards principais, tabelas |
| `--radius-xl` | 16px | Modais, empty state icons |
| `--radius-2xl` | 20px | Module banners |
| `--radius-full` | 9999px | Badges, pills, avatares |

### 4.3 Escala de spacing

Base 8px. Valores permitidos:

| Valor | Uso típico |
|-------|-----------|
| 4px | Gap mínimo entre ícone e label |
| 8px | Gap padrão entre elementos inline |
| 12px | Padding de itens compactos |
| 14px | Gap de form-groups |
| 16px | Padding padrão de cards, gap de grid |
| 20px | Padding interno de cards maiores |
| 24px | Padding do main-content, gap de seções |
| 28px | Padding de module-banners |
| 32px | Margem entre seções maiores |
| 40px | Espaçamento de separação de blocos |
| 48px | Padding de empty states |
| 60px | Padding vertical de empty states |

### 4.4 Escala de Z-index (tokenização pendente)

| Nome | Valor | Uso |
|------|-------|-----|
| `--z-sidebar` | 100 | Sidebar fixa |
| `--z-topbar` | 90 | Topbar sticky |
| `--z-overlay-1` | 400 | Drawer primário |
| `--z-overlay-2` | 500 | Drawer secundário |
| `--z-overlay-3` | 600 | Drawer terciário |
| `--z-modal` | 700 | Modal centrado |
| `--z-dropdown` | 800 | Dropdowns e menus |
| `--z-toast` | 9999 | Toasts e notificações |

### 4.5 Tipografia

| Token | Valor |
|-------|-------|
| `--font-display` | Nunito, sans-serif |
| `--font-body` | DM Sans, sans-serif |

**Escala de tamanhos:**

| Classe | Tamanho | Uso |
|--------|---------|-----|
| `.t-xs` | 11px | Labels uppercase, badges |
| `.t-sm` | 12px | Metadados, subtítulos de tabela |
| `.t-base` | 13px | Texto corpo padrão |
| `.t-md` | 14px | Texto de interface ligeiramente maior |
| `.t-lg` | 15px | Títulos de cards |
| `.t-xl` | 17px | Títulos de seção |
| `.t-2xl` | 20px | Títulos de módulo |
| `.t-3xl` | 24px | — |
| `.t-4xl` | 30px | — |

**Pesos:**
- 400 → texto corrido
- 500 → interface padrão
- 600 → ênfase
- 700 → títulos
- 800 → títulos de página e KPIs

### 4.6 Shadows

| Token | Uso |
|-------|-----|
| `--shadow-xs` | Elementos flutuantes mínimos |
| `--shadow-sm` | Cards em repouso |
| `--shadow` | Cards com hover leve |
| `--shadow-md` | Cards em hover, dropdowns |
| `--shadow-lg` | Toasts, dropdown menus |
| `--shadow-xl` | Modais e drawers |

### 4.7 Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--dur-fast` | 0.12s | Hover states, cores |
| `--dur` | 0.18s | Transições padrão |
| `--dur-slow` | 0.28s | Drawers, overlays |
| `--ease` | cubic-bezier(.32,0,.18,1) | Transições de posição |
| `--ease-out` | cubic-bezier(0,0,.58,1) | Elementos que entram |

---

## 5. Regras de Dashboard

- **Máximo 4 KPIs** no bloco hero do dashboard.
- **1 Hero section** por página de dashboard — nunca dois blocos de destaque.
- **1 CTA principal** por página — ações secundárias são ghost ou icon buttons.
- **Informação única:** uma métrica nunca aparece em dois lugares diferentes da mesma tela.
- **Nunca repetir dados:** se o KPI "Enviados" está no hero, não aparece na tabela abaixo como total.

---

## 6. Grid e Layout

### 6.1 Grid

| Breakpoint | Colunas | Uso |
|-----------|---------|-----|
| Desktop (≥1280px) | 12 colunas | Principal |
| Tablet (768–1279px) | 8 colunas | Sidebar colapsada |
| Mobile (<768px) | 4 colunas | Stack vertical |

### 6.2 Container

- Container máximo: **1440px**
- Padding horizontal do main-content: **24px**
- Sidebar width: **220px** (expandida) / **60px** (colapsada)
- Topbar height: **52px**

### 6.3 Content grids (classes)

| Classe | Colunas | Uso |
|--------|---------|-----|
| `.content-grid-4` | 4 iguais | KPI cards |
| `.content-grid-3` | 3 iguais | Cards de módulo |
| `.content-grid-2` | 2 iguais | Painéis lado a lado |
| `.content-grid-1-2` | 1/3 + 2/3 | Sidebar + conteúdo |
| `.content-grid-2-1` | 2/3 + 1/3 | Conteúdo + painel lateral |

---

## 7. Restrições absolutas

| Proibido | Motivo |
|---------|--------|
| Cores fora dos tokens | Desvio impossível de rastrear |
| Glassmorphism | Legibilidade ruim, peso visual |
| Gradientes de fundo em páginas | Polui hierarquia visual |
| Mais de 3 níveis de profundidade (card > card > card) | Complexidade desnecessária |
| Duplicação de métricas na mesma tela | Informação redundante = ruído |
| CTAs primários repetidos | Dilui hierarquia de ação |
| Classes CSS sem correspondência no componente documentado | Cria "componentes fantasmas" |
| Criar componente sem documentar em 02-COMPONENTS.md | Viola governança |
| Z-index hardcoded (usar tokens) | Colisões invisíveis |
| Cores hardcoded (usar tokens) | Impossibilita theming |

---

## 8. Checklist pré-implementação

Antes de implementar qualquer feature ou componente, responder:

- [ ] Existe componente existente que resolve isso?
- [ ] A solução usa apenas tokens definidos?
- [ ] Existe variante documentada que resolve ou precisa ser criada?
- [ ] O novo código tem no máximo 1 nível de especificidade CSS?
- [ ] Todos os estados (hover, active, disabled, loading, empty) foram considerados?
- [ ] A solução funciona em mobile (≥360px)?
- [ ] O componente/seção foi documentado ou a documentação existente foi atualizada?

---

*Versão: 1.0 | Data: 2026-06-30 | Status: Ativo*
