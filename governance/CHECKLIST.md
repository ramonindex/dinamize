# CHECKLIST DE GOVERNANÇA
**Executar ANTES de qualquer implementação. Sem exceções.**

---

## Pré-implementação

### Constitution
- [ ] Li `docs/00-CONSTITUTION.md` nesta sessão?
- [ ] A solução segue os princípios de UX definidos?
- [ ] A solução segue os princípios de UI definidos?
- [ ] A solução respeita as restrições absolutas?
- [ ] A solução segue as regras de Dashboard (se aplicável)?

### Componentes
- [ ] Existe componente existente que resolve o requisito?
  - **SE SIM:** Usar esse componente. Parar aqui.
- [ ] Existe componente existente que pode ser adaptado?
  - **SE SIM:** Documentar a variante. Usar esse componente.
- [ ] O componente existente pode ser evoluído com nova propriedade?
  - **SE SIM:** Evoluir e documentar. Registrar em CHANGELOG.
- [ ] É absolutamente necessário criar componente novo?
  - **SE SIM:** Documentar em DECISIONS.md antes de implementar.

### Tokens
- [ ] Todos os valores de cor usam tokens CSS (`var(--...)`)?
- [ ] Nenhum hex hardcoded foi introduzido?
- [ ] Todos os valores de z-index usam os valores definidos (90, 100, 400, 500, 600, 700, 800, 9999)?
- [ ] Os valores de spacing usam os valores do sistema (4, 8, 12, 14, 16, 20, 24, 28...)?

### Layout
- [ ] A solução usa grids definidos (`content-grid-*`)?
- [ ] Nenhum grid novo foi inventado sem necessidade?
- [ ] O layout respeita o padding padrão de `main-content` (24px)?

### Responsividade
- [ ] A solução funciona em mobile (360px)?
- [ ] A solução funciona em tablet (768px)?
- [ ] A solução funciona em desktop (1440px)?
- [ ] Drawers têm largura correta por breakpoint?
- [ ] Grids colapsam corretamente?

### Acessibilidade
- [ ] Elementos interativos têm labels/aria-labels?
- [ ] Estados de foco estão visíveis?
- [ ] Contraste AA garantido?
- [ ] Formulários com labels associados?
- [ ] Ações destrutivas têm confirmação?

### Motion
- [ ] Animações usam tokens de duration e easing?
- [ ] `prefers-reduced-motion` está respeitado?
- [ ] Máximo 1 animação de entrada por interação?

### Conteúdo
- [ ] Labels de botão são verbos de ação?
- [ ] Empty states têm título + subtítulo + CTA?
- [ ] Erros explicam o problema E a solução?
- [ ] Vocabulário segue `docs/06-CONTENT.md`?

---

## Pós-implementação

### Documentação
- [ ] Novos componentes foram documentados em `docs/02-COMPONENTS.md`?
- [ ] Novos tokens foram adicionados em `docs/01-DESIGN-SYSTEM.md`?
- [ ] Novos layouts foram documentados em `docs/03-LAYOUTS.md`?
- [ ] Mudanças foram registradas em `governance/CHANGELOG.md`?
- [ ] Decisões arquiteturais foram registradas em `governance/DECISIONS.md`?

### Consistência
- [ ] A solução é visualmente consistente com telas existentes?
- [ ] Componentes usados têm a mesma aparência do Design System?
- [ ] Não há variações não documentadas?

---

## Relatório de implementação

A cada entrega, informar:

```
## Relatório — [Nome da Feature]
Data: YYYY-MM-DD

### Componentes reutilizados
- [nome do componente] — como foi usado

### Componentes alterados
- [nome do componente] — o que mudou + motivo

### Componentes novos
- [nome do componente] — justificativa

### Tokens novos
- [nome do token] — valor + uso

### Atualizações de documentação necessárias
- [ ] [arquivo] — o que precisa ser atualizado

### Impacto no sistema
- [descrição do impacto em outros componentes/páginas]
```

---

*Versão: 1.0 | Data: 2026-06-30*
