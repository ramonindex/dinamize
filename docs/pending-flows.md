# Fluxos Pendentes — Plano Priorizado
**Baseado em `docs/current-system-analysis.md`. Gerado em 2026-06-30.**

Legenda de prioridade: 🔴 Alta (bloqueia consistência geral) · 🟡 Média (fluxo incompleto visível ao usuário) · 🟢 Baixa (polimento)

---

## P0 — Decisões de arquitetura (bloqueiam tudo abaixo)
🔴 Definir cor de marca real (roxo vs vermelho) — ver pergunta ao usuário
🔴 Definir fonte da verdade (`dashboard-auto.html` vs `V2/`) — ver pergunta ao usuário

## P1 — Fundação técnica (depois do P0)
🔴 Extrair `<style>` inline de `dashboard-auto.html` (13k linhas) para arquivo de tokens próprio, eliminando hardcoded hex (~600 instâncias) — requer decisão P0.1 primeiro
🔴 Tokenizar z-index (escala 90/100/400/500/600/700/800/9999), remover valor órfão `720`
🔴 Unificar `goToView()` e `navTo()` em uma única função de navegação
🟡 Unificar sistema de cards (8 variantes → 1 base `.card` + modificadores, conforme `docs/02-COMPONENTS.md#4`)
🟡 Unificar sistema de tabs (5 variantes → `.tabs`/`.sub-nav`/`.segmented` conforme `docs/02-COMPONENTS.md#8`)
🟡 Normalizar alturas de botão para a escala documentada (remover alturas inline 28/30/34/38px)

## P2 — Fluxos incompletos (requerem verificação no sistema do cliente)
🟡 **Contatos → Conversões** (`view-conversoes`, linha 2455) — conteúdo mínimo, precisa mapear fluxo completo no painel do cliente
🟡 **Contatos → Configurar Score** (`view-configurar-score`, linha 2548) — esqueleto apenas
🟡 **Fluxos** — "Novo fluxo" (assistente de criação) e "Versão para impressão" são stubs (`showToast('em breve')`)
🟡 **IA** — Calendário Inteligente e Assistente de Fluxo têm formulário mas saída é sempre `.ia-empty`; geração real não implementada
🟡 **Configurações** — apenas aba "Domínios" tem conteúdo; "Conteúdo", "Envio", "Formulários", "Integração", "SPF/CNAME", "DKIM", "LP" estão ocultas sem implementação
🟡 **Ajuda → Chamados** — abertura de chamado é stub; histórico tem só 2 linhas mock
🟢 **CRM Atendimento** (`prototipos/dashboard-canal.html`) — 5 de 6 telas vazias (Contatos, Wizard, Relatórios, Landing, Settings) — confirmar com usuário se este produto está em escopo agora ou é fora do escopo atual (o pedido do usuário foi sobre o produto Automação)

## P3 — Limpeza e itens órfãos
🟢 Investigar se `view-canais` dentro de `dashboard-auto.html` ainda é alcançável após a navegação ter passado a usar `canais.html` como página separada — remover se for código morto
🟢 V2/: ~12 cores hardcoded restantes (mesmo roxo `#534CE7` aparece em `V2/ajuda.html:32`)
🟢 V2/configuracoes.html, ajuda.html: stubs "em breve" (exportar contatos, wizard de domínio, abrir chamado) — mesmos itens do P2, decidir se V2 também recebe a implementação ou fica congelado como referência

## P4 — Documentação (acompanha cada entrega, não é fase isolada)
Por entrega: atualizar `docs/02-COMPONENTS.md` (componentes novos/alterados), `docs/01-DESIGN-SYSTEM.md` (tokens novos), `governance/CHANGELOG.md` (sempre), `governance/DECISIONS.md` (decisões de arquitetura) — conforme `governance/CHECKLIST.md`.

---

## Fora de escopo até segunda ordem
- Acesso ao sistema do cliente (`panel.dinamize.com`) para mapear fluxos do zero — reservado para os itens P2 que não tiverem informação suficiente no histórico do projeto. Não vou logar com as credenciais para revalidar fluxos já implementados e funcionando.
