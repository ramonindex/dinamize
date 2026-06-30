# 13 — GOVERNANCE
**Processo de governança do Design System Dinamize.**

---

## 1. O que é a governança

A governança garante que o Design System permaneça consistente, escalável e documentado à medida que o produto cresce.

Sem governança: cada feature vira um snowflake. Com governança: features viram tijolos que se encaixam.

---

## 2. Papéis

### Design System Guardian (papel atual: Claude Code)
- Auditar novas implementações antes de entregar
- Garantir que componentes sejam reutilizados
- Documentar novos padrões quando aprovados
- Atualizar CHANGELOG a cada mudança

### Responsável do produto (Ramon Oliver)
- Aprovar criação de novos componentes
- Tomar decisões arquiteturais registradas em DECISIONS.md
- Revisar CHANGELOG a cada sprint

---

## 3. Processo de implementação

### Passo a passo obrigatório

```
1. ENTENDER o requisito completamente
2. CONSULTAR docs/00-CONSTITUTION.md
3. CONSULTAR docs/02-COMPONENTS.md — existe componente?
4. CONSULTAR docs/03-LAYOUTS.md — existe padrão de layout?
5. CONSULTAR docs/04-UX-PRINCIPLES.md — existe padrão de fluxo?
6. CONSULTAR governance/CHECKLIST.md — verificar cada item
7. PROPOR solução usando componentes existentes
8. SE componente novo: documentar antes de implementar
9. IMPLEMENTAR
10. ATUALIZAR documentação se necessário
11. REGISTRAR em governance/CHANGELOG.md
```

### Quando criar componente novo

Criar componente novo **somente** quando:
1. Não existe nada parecido no sistema
2. Existe mas não pode ser adaptado sem quebrar outros usos
3. O novo padrão será usado em ≥2 lugares diferentes
4. Foi aprovado e documentado em DECISIONS.md

---

## 4. Métricas de saúde do sistema

### Meta permanente

| Métrica | Meta |
|---------|------|
| Reutilização de componentes | ≥ 95% |
| Componentes documentados | 100% |
| Cores tokenizadas | 100% (zero hardcoded) |
| Z-index tokenizados | 100% |
| Componentes com todos os estados documentados | 100% |

### Revisão trimestral

A cada 3 meses, revisar:
1. Existem componentes sem documentação?
2. Existem padrões emergentes não documentados?
3. Existem hardcoded values que deveriam ser tokens?
4. Há oportunidade de consolidação?

---

## 5. Regras de evolução

### Evolução compatível (não-breaking)
- Adicionar nova variante de componente existente
- Adicionar novo token (sem remover existente)
- Expandir documentação de componente
- Adicionar estado novo a componente

**Processo:** Implementar + documentar + CHANGELOG

### Evolução breaking (requer cuidado)
- Alterar nome de classe CSS
- Mudar valor de token existente
- Remover componente ou variante
- Mudar estrutura HTML de componente

**Processo:** Decisão documentada em DECISIONS.md + plano de migração + CHANGELOG com "breaking change"

---

## 6. Documentação contínua

**Regra:** Se não está documentado, não existe.

Todo trabalho deve resultar em atualização de:
- `docs/02-COMPONENTS.md` — se novo componente criado ou existente alterado
- `docs/01-DESIGN-SYSTEM.md` — se novo token adicionado
- `governance/CHANGELOG.md` — toda mudança, sem exceção
- `governance/DECISIONS.md` — toda decisão arquitetural

---

## 7. Versionamento

### Semver simplificado

```
v[MAJOR].[MINOR].[PATCH]

MAJOR: mudanças breaking (alterar token, renomear componente)
MINOR: novas adições (novo componente, nova variante, novo token)
PATCH: correções e documentação (fix de bug, melhoria de doc)
```

### Versão atual: v1.0.0

---

## 8. Processo de auditoria

### Auditoria de sprint (a cada feature entregue)

Verificar:
- A feature usou componentes existentes?
- Alguma cor foi hardcoded?
- Algum z-index foi hardcoded?
- A documentação foi atualizada?

### Auditoria de release (antes de deploy)

Verificar:
- CHANGELOG atualizado?
- Novos componentes documentados?
- Nenhuma regressão visual?
- Responsividade verificada nos breakpoints críticos?

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md*
