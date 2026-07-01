# CHANGELOG
**Histórico de mudanças no Design System Dinamize.**

---

## v1.0.4 — 2026-06-30

### Relatórios completo (mapeado no sistema do cliente, implementado em dashboard-auto.html)
- 3 sub-abas novas no menu Relatórios: **Envio de relatório** (CRUD de agendamento de disparo automático — nome, conteúdo, proprietário, frequência/horário, destinatários), **Sites** (relatório estilo Google Analytics — abas Acessos/Visualizações com gráfico de linha de 8 séries por canal de aquisição via Chart.js, aba E-commerce com tabela por campanha), **SEO** (analisador de URL assíncrono — score circular + checklist de itens técnicos, simulando o "processando..." do cliente)
- Sub-abas já existentes (E-mail, SMS, WhatsApp, Consolidado, Consumo, Landing Pages) mantidas — já tinham boa cobertura de KPIs, gráficos e tabelas

### Componentes novos
- `.spinner` + `@keyframes spin` — adicionado ao design system (documentado em `docs/01-DESIGN-SYSTEM.md` mas nunca implementado em CSS; usado no estado "processando" da análise de SEO)

### Componentes reutilizados
- Chart.js (já carregado via CDN) — reaproveitado para o gráfico de linha de Sites, mesmo padrão dos gráficos já existentes em Relatórios de E-mail
- `.segmented`/`.seg-btn` — abas internas de Sites (Acessos/Visualizações/E-commerce) e toggle Cronológico/Totalizado
- `modal-canal-excluir` — estendido para tipo `rpt-config`

### Impacto
- Telas afetadas: `view-relatorios` em `prototipos/dashboard-auto.html`
- Com esta entrega, os três fluxos solicitados (Canais, Fluxos, Relatórios) estão completos e mapeados 1:1 com o sistema do cliente, adaptados ao nosso Design System

---

## v1.0.3 — 2026-06-30

### Fluxos completo (mapeado no sistema do cliente, implementado em dashboard-auto.html)
- Nova view `fluxos-builder-mode` dentro de `view-fluxos` (toggle lista/construtor)
- "Novo fluxo" e os 8 templates (Crie do zero, Boas-vindas, Aniversário, Conversão, Carrinho abandonado, Produto visitado, Produtos de interesse, Recompra) agora abrem o construtor real — templates pré-selecionam gatilho e abrem automaticamente o modal de configuração, igual ao sistema do cliente
- Canvas de automação: cada gatilho é um card com resumo, tarefas empilhadas (Tempo + Ação + resumo), "Adicionar tarefa", "Adicionar novo gatilho", "Remover"
- 6 tipos de gatilho com configuração própria (Entrada de novos contatos, Comportamento do contato, Verificação diária, Atualização no contato, Navegação no site, Conversão de contatos) + critério comum "todos os contatos / segmentar"
- 5 tipos de ação por tarefa: Enviar e-mail (reaproveita `canaisData.emailSends` + atalho para criar novo), Atualizar dados (6 modos), Enviar SMS/WhatsApp (bloqueados com aviso de plano, replicando o "Oops!" do cliente), Enviar webhook (reaproveita `canaisData.webhooks`)
- Restrições de execução (fins de semana, período, data de parada), Pausar automação, Salvar automação
- "Configurar" em fluxo existente abre o construtor pré-preenchido; "Versão para impressão" abre modal com checkbox "Incluir tarefas pausadas"
- Lista de fluxos migrada de HTML estático para `FLOWS_DATA` dinâmico, com exclusão via modal genérico (`canalOpenDeleteModal`)

### Componentes reutilizados
- `.eg-plain-radio`, `.checkbox-row`, `.cv-sale-overlay`/`.cv-sale-modal` — modais de configuração de gatilho/ação
- `modal-canal-excluir` (genérico, criado na sessão de Canais) — estendido para tipo `fluxo`

### Impacto
- Telas afetadas: `view-fluxos` em `prototipos/dashboard-auto.html`
- Próximo: Relatórios (mapeamento no sistema cliente em andamento)

---

## v1.0.2 — 2026-06-30

### Canais completos (mapeados no sistema do cliente, implementados em dashboard-auto.html)
- **Landing Pages**: cards → tabela (Nome/URL, Status, Visitas, Conversão, Ação), mesmo padrão de Email/SMS/WhatsApp
- **Webhooks**: modelo corrigido de outbound (URL de destino) para inbound (URL gerada pelo sistema, receptor) — Tipo de evento (contato/texto fixo/campo JSON), catálogo de integrações pré-configuradas, tabela de mapeamento de campos, edição real
- **Campanhas**: campo Proprietário, ação Editar real (reabre drawer preenchido), modal de Compartilhamento (radio: não compartilhar/equipe/todos), confirmação de exclusão
- **Mídias Sociais**: drawer "Nova Publicação" completo — redes de destino, campanha, conteúdo, imagem, encurtar links, publicar agora vs agendar
- **Pop-ups**: wizard de 4 passos (Estrutura → Configurações → Layout → Customizações) com stepper, galeria de 6 templates, preview ao vivo de cores/textos
- **Formulários**: cards → tabela (Nome/Tipo/Conversões/Criado em/Ação); wizard 2 passos — tipo (Site/WordPress/Facebook/Facebook Leads/Joomla) e, para tipo Site, configuração completa (campos dinâmicos, marcadores, mensagem de confirmação, estilo, captcha, double opt-in, encaminhamento, alertas)
- Modal de exclusão genérico reutilizável (`modal-canal-excluir`) para webhook/campanha/popup/formulário/publicação — substitui exclusões diretas sem confirmação (violação da Constitution corrigida)

### Componentes reutilizados
- `.iw-stepper`/`.iw-step*` (do wizard de importação) — reaproveitado nos wizards de Pop-up e Formulário
- `.sg-template-card` (padrão Segmentações) — galeria de layouts do Pop-up
- `.eg-plain-radio`, `.cv-chip`, `.checkbox-row`, `.cv-sale-overlay`/`.cv-sale-modal` — reaproveitados nos novos formulários/modais

### Limpeza
- Removido CSS órfão: `.lp-dash-card` (já substituído por `.sg-template-card` desde sessão anterior), `.fm-dash-grid`/`.fm-dash-card`

### Impacto
- Telas afetadas: `view-canais` (todos os 9 sub-canais) em `prototipos/dashboard-auto.html`
- Próximo: Fluxos e Relatórios (mapeamento no sistema cliente concluído/em andamento, implementação a seguir)

---

## v1.0.1 — 2026-06-30

### Auditoria completa (Etapa 1 do plano de padronização)
- `docs/current-system-analysis.md` — mapeamento de arquitetura (`dashboard-auto.html` vs `V2/` vs protótipos legados), inventário de 12 views, inconsistências de componentes
- `docs/pending-flows.md` — plano priorizado de fluxos incompletos e itens de limpeza

### Correções de bug
- Cor de marca incorreta: `#534CE7` (roxo, hardcoded, sem token) substituído por `var(--brand)` (`#EA5456`) em `prototipos/dashboard-auto.html` (115 instâncias), `prototipos/canais.html` (2), `V2/canais.html` (2), `V2/ia.html` (1), `V2/ajuda.html` (7). Variante clara pareada `#EDEEFF` substituída por `var(--brand-light)`. Ver DEC-008.

### Decisões de governança
- DEC-002 deprecada — `V2/css/` declarado fonte da verdade não correspondia à realidade do projeto
- DEC-008 — cor de marca oficial confirmada como vermelho `#EA5456`, não roxo
- DEC-009 — `prototipos/dashboard-auto.html` confirmado como produto oficial em evolução; `V2/` vira referência congelada

### Impacto
- Nenhuma mudança visual de cor nesta entrada além da correção roxo→vermelho (era um bug, não uma decisão de design nova)
- Próximo passo (P1 em `docs/pending-flows.md`): extrair `<style>` inline de `dashboard-auto.html` para arquivo de tokens próprio

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
