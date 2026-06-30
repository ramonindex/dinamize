# 12 — BRANDING
**Identidade de marca Dinamize aplicada ao produto.**

---

## 1. Marca

**Nome:** Dinamize  
**Segmento:** Plataforma de automação de marketing  
**Público:** Profissionais de marketing digital, e-commerce, agências

---

## 2. Logo e símbolos

### Arquivos disponíveis

| Arquivo | Uso |
|---------|-----|
| `mp5krbgm-Dinamize-Logo.svg` | Logo completo (símbolo + nome) |
| `mp5krbgm-Dinamize-Simbolo.svg` | Símbolo isolado (sidebar colapsada) |
| `mp5krbgm-Dinamize-automation.svg` | Variante com tagline de automação |

### Regras de uso do logo

- **Sidebar expandida:** Logo completo (30px de altura)
- **Sidebar colapsada:** Apenas símbolo (30×30px)
- **Nunca:** Redimensionar de forma desproporcional, aplicar filtros, alterar cores
- **Nunca:** Usar logo sobre fundos que comprometam legibilidade

### Sidebar logo mark (CSS)

O logo mark interno da sidebar usa o gradiente brand:
```css
.sidebar-logo-mark {
  background: linear-gradient(135deg, var(--auto), #8681F0);
}
```
Este é o único lugar onde o gradiente azul-roxo é usado além do avatar.

---

## 3. Cor brand

**Vermelho Dinamize:** `#EA5456` (`--brand`)

Esta é a cor primária de toda ação, destaque e identidade visual do produto.

**Derivações:**
- Hover/dark: `#D43840`
- Light background: `#FEF1F1`
- Mid (borders): `#FCCECE`

---

## 4. Tipografia brand

**Display (títulos):** Nunito — expressa modernidade e clareza  
**Body (interface):** DM Sans — neutra, legível, profissional

---

## 5. Módulos de produto

### CRM (produtos opcionais)

| Produto | SVG | Cor conceitual |
|---------|-----|---------------|
| CRM Atendimento | `CRM _ ATENDIMENTO.svg` | — |
| CRM Automação | `CRM _ AUTOMACAO.svg` | — |
| CRM Vendas | `CRM _ VENDAS.svg` | — |

Estes produtos aparecem na tela de `produtos.html` como upsell.

---

## 6. Posicionamento visual

O Dinamize se posiciona como ferramenta **premium e profissional** — não como ferramenta "simples" ou "para iniciantes". O visual deve refletir:

- Capacidade de lidar com dados complexos elegantemente
- Interface que respeita o tempo do usuário
- Sofisticação sem excesso

**Não é:** casual, colorido, exuberante  
**É:** preciso, confiável, eficiente

---

## 7. Tom visual por módulo

| Módulo | Tom | Visual |
|--------|-----|--------|
| Dashboard | Executivo | Dados claros, KPIs prominentes |
| Contatos | Operacional | Tabelas densas e eficientes |
| Canais | Criativo | Mais espaço para preview de conteúdo |
| Fluxos | Técnico | Canvas visual, nós e conexões |
| Relatórios | Analítico | Gráficos e métricas centrais |
| IA | Futurista (sutil) | Âmbar, sugestões, geração |

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md*
