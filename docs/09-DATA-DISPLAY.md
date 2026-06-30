# 09 — DATA DISPLAY
**Padrões para exibição de dados, métricas, gráficos e tabelas no produto Dinamize.**

---

## 1. Filosofia de dados

**Uma métrica, um lugar.** Nunca exibir o mesmo dado em dois lugares diferentes da mesma tela.

**Contexto > Número.** Dados brutos sem contexto não informam. Sempre acompanhar de variação, tendência ou comparação.

**Hierarquia.** O número mais importante é o maior e mais proeminente. Metadados são menores e com `--text-3`.

---

## 2. KPI Cards

### Anatomia

```
┌─────────────────────────────┐
│ TAXA DE ABERTURA            │  ← kpi-label (11px, uppercase, --text-3)
│                             │
│ 24,3%                       │  ← kpi-value (28px, 800, --text-1, Nunito)
│                             │
│ ↑ 2,1% vs período anterior  │  ← kpi-trend (12px, 500, trend-up/down/neutral)
└─────────────────────────────┘
```

### Regras de KPI

- **Máximo 4** por bloco de dashboard
- KPI label em **UPPERCASE** (auxilia diferenciação visual)
- Variação sempre comparada a período equivalente
- Número principal: sem casa decimal para inteiros; 1 casa decimal para percentuais
- Ícone de trend: ↑ (up), ↓ (down), → (neutro)

### Quando usar trend-up vs trend-down

| Métrica | Subiu | Desceu |
|---------|-------|--------|
| Taxa de abertura | ↑ success | ↓ error |
| Cliques | ↑ success | ↓ error |
| Bounces | ↑ error | ↓ success |
| Descadastros | ↑ error | ↓ success |
| Reclamações de SPAM | ↑ error | ↓ success |

---

## 3. Stat Rows

Para informações complementares dentro de um card:

```html
<div class="stat-row">
  <span class="stat-label">
    <svg><!-- ícone --></svg>
    Entregues
  </span>
  <span class="stat-value">12.450</span>
</div>
```

- Borda inferior entre rows (`--border-light`)
- Último item sem borda
- Valores alinhados à direita
- Labels com ícone opcional à esquerda

---

## 4. Tabelas de dados

Ver `docs/02-COMPONENTS.md#5-tables` para estrutura completa.

### Tipos de células

| Classe | Uso | Formato |
|--------|-----|---------|
| `.cell-primary` | Identificador principal | Nome, título |
| `.cell-secondary` | Metadado sob o primário | Data, tipo |
| `.cell-mono` | Dados técnicos | ID, código, URL |
| (padrão) | Dados regulares | Números, texto |

### Alinhamento de colunas

| Tipo de dado | Alinhamento |
|-------------|------------|
| Texto (nome, título) | Esquerda |
| Números inteiros | Direita |
| Percentuais | Direita |
| Datas | Esquerda |
| Status (badge) | Esquerda |
| Ações | Direita |

### Colunas especiais

| Classe | Uso |
|--------|-----|
| `.col-check` | Checkbox de seleção (40px) |
| `.col-actions` | Ações (width: 1%, nowrap) |

---

## 5. Gráficos

### Tipos suportados

| Tipo | Uso no produto | Biblioteca recomendada |
|------|---------------|----------------------|
| Linha | Performance ao longo do tempo | Chart.js ou Recharts |
| Barra | Comparação entre campanhas | Chart.js ou Recharts |
| Donut/Pizza | Distribuição (dispositivos, canais) | Chart.js |
| Heat map | Mapa de cliques em e-mail | Personalizado |
| Grid 5×5 | Matriz RFM | Personalizado |

### Paleta de gráficos (tokens de cor)

```
Série 1 (principal): var(--auto)     → #EA5456
Série 2:            var(--fluxos)   → #0EA679
Série 3:            var(--ia)       → #F59E0B
Série 4:            var(--info)     → #2d74d8
Série 5 (neutro):   var(--text-3)   → #8891A8
```

Nunca usar cores fora deste conjunto sem adicionar ao token list.

### Padrões visuais

- Grid lines: `var(--border-light)`, opacity 0.5
- Axis labels: 11px, `var(--text-3)`
- Tooltips: card com shadow-lg, fundo branco
- Sem bordas em barras (borda causa ruído visual)
- Linhas: `strokeWidth: 2`, sem pontos (exceto no hover)
- Area charts: fill com opacity 0.08–0.12

### Legenda

- Máximo 5 séries por gráfico
- Legenda abaixo do gráfico, não ao lado
- Clicks na legenda mostram/ocultam séries

---

## 6. Formatação de números

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Inteiros pequenos (< 1000) | Sem formatação | 247 |
| Inteiros médios (1k–999k) | Milhar com ponto | 12.450 |
| Inteiros grandes (≥ 1M) | Abreviado | 1,2M |
| Percentual | 1 decimal + % | 24,3% |
| Percentual < 1% | 2 decimais | 0,42% |
| Taxa | X em Y | "3 em cada 10" |
| Variação positiva | +X% | +2,1% |
| Variação negativa | -X% | -0,8% |

---

## 7. Datas e horários

| Contexto | Formato |
|----------|---------|
| Data recente (hoje/ontem) | "Hoje", "Ontem" |
| Data desta semana | "seg, 15:30" |
| Data deste ano | "30 jun, 10:30" |
| Data de outro ano | "30 jun 2025" |
| Intervalo de datas | "1–30 jun" |
| Data + hora longa | "30 de junho às 10h30" |
| Timestamp relativo | "há 2 horas", "há 3 dias" |

---

## 8. Indicadores de progresso

### Progress bar (linear)
- Para processos que têm % de conclusão conhecida
- Cor indica tipo: brand (geral), success (ótimo), warning (atenção), error (ruim)

### Stat de saúde de lista

```
Válidos: ████████████████░░░░  82%
Inválidos: ████░░░░░░░░░░░░░░  12%
Descadastros: ██░░░░░░░░░░░░░   6%
```

Usar progress bars com cores semânticas.

---

## 9. Comparações e rankings

### Top items (ex: links mais clicados)

```
1. https://site.com/produto     1.234 cliques  ████████████  45%
2. https://site.com/oferta       876 cliques  █████████     32%
3. https://site.com/home         630 cliques  ██████        23%
```

- Rank numérico à esquerda
- Barra visual proporcional
- Percentual à direita

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md, 01-DESIGN-SYSTEM.md*
