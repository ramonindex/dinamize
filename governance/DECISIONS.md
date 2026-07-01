# DECISIONS
**Registro de decisões arquiteturais do Design System Dinamize.**

---

## Formato

```
### DEC-XXX — [Título da decisão]
**Data:** YYYY-MM-DD  
**Status:** Proposta | Aprovada | Rejeitada | Deprecada  
**Autor:** [nome]

**Decisão:**
[O que foi decidido, em 1–2 frases]

**Motivação:**
[Por que esta decisão foi tomada]

**Alternativas descartadas:**
- [Alternativa A] — por que foi descartada
- [Alternativa B] — por que foi descartada

**Impacto:**
- Telas afetadas: [lista]
- Tokens afetados: [lista]
- Componentes afetados: [lista]
- Breaking change: sim/não

**Revisão:** [Data prevista para revisão, se aplicável]
```

---

## Decisões registradas

---

### DEC-001 — Separação de tokens `--brand` e `--auto`
**Data:** 2026-06-30  
**Status:** Proposta  
**Autor:** Design System Guardian

**Decisão:**
Manter ambos os tokens (`--brand` e `--auto`) com os mesmos valores por enquanto, mas com semântica diferente: `--brand` para identidade de marca, `--auto` para interface e interação.

**Motivação:**
Atualmente `--auto === --brand` — ambos são `#EA5456`. Isso cria confusão: não está claro quando usar qual. A separação semântica hoje (sem diferença de valor) prepara o sistema para quando as cores divergirem (ex: brand mudar e auto não, ou vice-versa).

**Alternativas descartadas:**
- Unificar em `--brand` e remover `--auto` — descartado pois todos os componentes de UI usam `--auto`; uma mudança de brand quebraria todos os estados de foco, botões, etc.
- Unificar em `--auto` e remover `--brand` — descartado pois brand é o token de identidade, não deve desaparecer

**Impacto:**
- Sem impacto imediato (valores idênticos)
- Permite evolução independente futura
- Breaking change: não

---

### DEC-002 — Dois sistemas de CSS (prototipos/ vs V2/)
**Data:** 2026-06-30  
**Status:** Deprecada — substituída por DEC-009  
**Autor:** Design System Guardian

**Decisão:**
Declarar `V2/css/` como fonte da verdade oficial. `prototipos/style.css` é legado e não deve ser expandido.

**Motivação:**
O projeto tem dois sistemas CSS paralelos: `prototipos/style.css` (monolítico, inline nos HTMLs) e `V2/css/` (separado em tokens, base, components, layout). A coexistência cria desvio invisível — componentes surgem no monolítico que não existem no sistema.

**Por que foi revertida:**
Esta decisão foi tomada sem confirmar com o responsável do produto qual base estava de fato em evolução. Na prática, 100% do trabalho de feature subsequente a esta decisão continuou em `prototipos/dashboard-auto.html` (que usa `prototipos/style.css`), nunca em `V2/`. DEC-009 corrige isso com a confirmação explícita do responsável do produto.

**Alternativas descartadas:**
- Manter ambos em paralelo — descartado pois divergência aumenta exponencialmente
- Migrar tudo para o monolítico — descartado pois perde a separação e manutenibilidade

**Impacto:**
- Telas afetadas: todos os HTMLs em `prototipos/`
- Ação necessária: gradualmente migrar protótipos para usar `V2/css/`
- Breaking change: não (migração gradual)

---

### DEC-003 — Drawer como padrão para formulários
**Data:** 2026-06-30  
**Status:** Aprovada  
**Autor:** Design System Guardian

**Decisão:**
Formulários de criação/edição de entidades (contatos, listas, segmentações, envios simples) abrem em drawers, não em páginas ou modais.

**Motivação:**
Drawers permitem ao usuário ver o contexto (lista atrás) enquanto preenche o formulário. Modais bloqueiam o contexto. Páginas exigem navegação de volta.

**Exceções:**
- Wizard de múltiplas etapas (>3 passos): página inteira
- Confirmação destrutiva: modal centrado
- Preview rápido: tooltip ou popover

**Alternativas descartadas:**
- Modal para todos os formulários — bloqueante, sem contexto
- Página para todos os formulários — navegação desnecessária para ações simples

**Impacto:**
- Padrão adotado em todos os módulos
- Breaking change: não (formalização do que já existia)

---

### DEC-004 — Skeleton loaders (pendente implementação)
**Data:** 2026-06-30  
**Status:** Proposta  
**Autor:** Design System Guardian

**Decisão:**
Implementar skeleton loaders como componente padrão, substituindo estados de loading com spinner centralizado em tabelas e listas.

**Motivação:**
Spinner centralizado cria flash de conteúdo ("content jump") quando o dado chega. Skeleton mantém o layout estável e comunica que conteúdo está chegando, reduzindo percepção de lentidão.

**Alternativas descartadas:**
- Manter spinner para todos os casos — adequado para ações pontuais (botões), inadequado para carregamento de listas

**Impacto:**
- Requer implementação de CSS de skeleton
- Deve ser documentado em `docs/02-COMPONENTS.md#19`
- Breaking change: não (adição)
- Prioridade: média

---

### DEC-005 — Tokenização de z-index (pendente)
**Data:** 2026-06-30  
**Status:** Proposta  
**Autor:** Design System Guardian

**Decisão:**
Definir tokens CSS para todos os valores de z-index usados no sistema.

**Motivação:**
Valores de z-index hardcoded (90, 100, 400, 500, 600, 700, 800, 9999) são impossíveis de rastrear. Um novo componente com z-index errado pode quebrar overlays sem ser detectado.

**Implementação proposta:**
```css
:root {
  --z-topbar:    90;
  --z-sidebar:   100;
  --z-overlay-1: 400;
  --z-overlay-2: 500;
  --z-overlay-3: 600;
  --z-modal:     700;
  --z-dropdown:  800;
  --z-toast:     9999;
}
```

**Impacto:**
- Afeta: `layout.css`, `components.css`
- Requer busca e substituição de todos os z-index hardcoded
- Breaking change: não (valores idênticos, apenas tokenizados)
- Prioridade: alta

---

### DEC-006 — Tokenização de cores de temperatura (pendente)
**Data:** 2026-06-30  
**Status:** Proposta  
**Autor:** Design System Guardian

**Decisão:**
Adicionar tokens para as cores de temperatura de contato.

**Implementação proposta:**
```css
:root {
  --temp-hot:       #fff5f0;
  --temp-hot-text:  #c0392b;
  --temp-warm:      #fef3c7;
  --temp-warm-text: #d97706;
  --temp-cold:      #dbeafe;
  --temp-cold-text: #2563eb;
}
```

**Motivação:**
Cores hardcoded em `.temp-hot/warm/cold` — impossíveis de manter sistematicamente.

**Impacto:**
- Afeta: `components.css:207-209`
- Breaking change: não
- Prioridade: alta

---

### DEC-007 — Token `--accent-purple` (pendente)
**Data:** 2026-06-30  
**Status:** Proposta  
**Autor:** Design System Guardian

**Decisão:**
Adicionar `--accent-purple: #7F7BEE` como token oficial.

**Motivação:**
`#7F7BEE` aparece em module-banner gradient e avatar gradient sem ser definido como token. Qualquer mudança nessa cor exigiria busca manual por todos os arquivos.

**Impacto:**
- Afeta: `layout.css` (module-banner), `components.css` (avatar)
- Breaking change: não
- Prioridade: média

---

### DEC-008 — Cor de marca: vermelho `#EA5456`, não roxo `#534CE7`
**Data:** 2026-06-30  
**Status:** Aprovada  
**Autor:** Ramon Oliver (confirmado via pergunta direta do Design System Guardian)

**Decisão:**
`var(--brand)` / `var(--auto)` = `#EA5456` (vermelho) é a cor de ação primária oficial do produto. `#534CE7` (roxo) era um valor hardcoded incorreto, não um token intencional.

**Motivação:**
Auditoria (`docs/current-system-analysis.md`, seção 2) encontrou `#534CE7` hardcoded 115 vezes em `prototipos/dashboard-auto.html` — mais do que o `#EA5456` documentado (33 vezes) — em componentes estruturais (`.cv-act-btn:hover`, `.cv-chip`, `.flow-node.action`, abas ativas). Como nenhuma das duas cores estava atrás de uma variável própria dentro do `<style>` inline do arquivo, era impossível saber qual era a intenção sem perguntar.

**Alternativas descartadas:**
- Tokenizar roxo como `--auto` oficial do módulo Automação — descartada pelo responsável do produto.

**Impacto:**
- Telas afetadas: `prototipos/dashboard-auto.html` (115 instâncias), `prototipos/canais.html` (2), `V2/canais.html` (2), `V2/ia.html` (1), `V2/ajuda.html` (7)
- Ação executada: substituição mecânica `#534CE7` → `var(--brand)` e `#EDEEFF` (variante clara pareada) → `var(--brand-light)` nos 5 arquivos acima
- Fora do escopo desta correção: `mp5lyxql-index.html` e `uploads/index.html` (artefatos fora do produto ativo, não tocados)
- Gradiente `var(--brand) → #7B75F0` em `V2/ajuda.html` mantido — é o padrão documentado de gradient brand+accent-purple (`docs/12-BRANDING.md`), não o erro de cor primária
- Breaking change: não (corrige para o valor já documentado)

---

### DEC-009 — Fonte da verdade: `prototipos/dashboard-auto.html`
**Data:** 2026-06-30  
**Status:** Aprovada  
**Autor:** Ramon Oliver (confirmado via pergunta direta do Design System Guardian)

**Decisão:**
`prototipos/dashboard-auto.html` é o produto oficial em evolução. `V2/` passa a ser referência histórica/congelada — não recebe mais features novas. Substitui DEC-002.

**Motivação:**
Auditoria confirmou que toda feature recente (Conversões, Configurar Score, Segmentações, Canais, Fluxos, Relatórios, IA, Configurações, Ajuda) foi implementada em `dashboard-auto.html`, nunca em `V2/`, apesar de DEC-002 ter declarado `V2/css/` como fonte da verdade. A decisão anterior não correspondia ao comportamento real do projeto.

**Plano de ação decorrente:**
- Extrair o `<style>` inline de `dashboard-auto.html` (13k linhas) para um arquivo de tokens próprio, eliminando cores/z-index hardcoded — ver `docs/pending-flows.md` P1.
- `V2/` mantido no repositório como referência de arquitetura de CSS limpa (separação tokens/base/components/layout), mas sem novas features.

**Alternativas descartadas:**
- Migrar `dashboard-auto.html` para a arquitetura multi-página de `V2/` — descartada pelo responsável do produto (esforço de migração maior antes de poder padronizar qualquer coisa).
- Manter os dois ativos em paralelo — descartada (era o cenário que já causou a divergência da DEC-002).

**Impacto:**
- Telas afetadas: nenhuma mudança visual imediata; afeta onde o trabalho futuro acontece
- Breaking change: não

---

*Manter ordenado do mais recente para o mais antigo. Numerar sequencialmente (DEC-001, DEC-002...).*
