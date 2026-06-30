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
**Status:** Proposta  
**Autor:** Design System Guardian

**Decisão:**
Declarar `V2/css/` como fonte da verdade oficial. `prototipos/style.css` é legado e não deve ser expandido.

**Motivação:**
O projeto tem dois sistemas CSS paralelos: `prototipos/style.css` (monolítico, inline nos HTMLs) e `V2/css/` (separado em tokens, base, components, layout). A coexistência cria desvio invisível — componentes surgem no monolítico que não existem no sistema.

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

*Manter ordenado do mais recente para o mais antigo. Numerar sequencialmente (DEC-001, DEC-002...).*
