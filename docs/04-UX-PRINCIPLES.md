# 04 — UX PRINCIPLES
**Princípios de experiência aplicados ao produto Dinamize.**

---

## 1. Filosofia central

O Dinamize é uma ferramenta de trabalho, não de entretenimento. O usuário está aqui para executar uma tarefa — não para explorar. Cada tela deve responder: **"O que o usuário precisa fazer agora?"**

---

## 2. Hierarquia de ação

Toda tela tem exatamente **uma ação primária**. As demais são secundárias ou terciárias.

| Nível | Componente | Quantidade por tela |
|-------|-----------|---------------------|
| Primária | `.btn-primary` | 1 |
| Secundária | `.btn-secondary` | Até 2 |
| Terciária | `.btn-ghost` ou icon btn | Ilimitado, mas com critério |

**Nunca dois botões primários lado a lado.**

---

## 3. Padrões de fluxo

### 3.1 Listagem → Detalhe

```
Lista (tabela ou grid)
  → Click em linha → Drawer lateral (detalhe rápido)
  → Click em "Editar" no drawer → Drawer secundário (formulário)
  → Salvar → Fecha drawer secundário, atualiza drawer primário
```

### 3.2 Criar novo item

```
Botão "Novo [Item]" na page-header
  → Se simples (≤6 campos): Drawer primário com formulário
  → Se complexo (>6 campos ou multi-step): Wizard de página inteira
  → Salvar → Toast de sucesso + item aparece no topo da lista
```

### 3.3 Deletar item

```
Dropdown de ações → "Remover" (danger)
  → Modal de confirmação centrado
  → "Cancelar" ou "Confirmar exclusão" (btn-danger)
  → Confirmar → Toast de sucesso + item some da lista com fade
```

### 3.4 Ação em massa

```
Checkbox nas linhas da tabela
  → Bulk actions bar aparece (substitui/sobrepõe filter-bar)
  → Ação na bulk bar → Confirmação se destrutiva
  → Resultado → Toast + atualização da lista
```

---

## 4. Feedback de estado

### 4.1 Loading
- **< 100ms:** nenhum indicador (parecer instantâneo)
- **100ms–1s:** spinner no botão que acionou a ação
- **> 1s:** spinner + desabilitar interações da área afetada
- **> 3s:** skeleton do conteúdo esperado + mensagem "Carregando..."

### 4.2 Erros

| Tipo | Onde exibir | Componente |
|------|------------|-----------|
| Erro de campo | Abaixo do campo | `.form-error.show` |
| Erro de formulário | Topo do form | `.alert-error` |
| Erro de sistema | Global | `.toast.error` |
| Erro de página | Centro da tela | Empty state com ícone de alerta |

### 4.3 Sucesso
- Sempre toast no canto inferior direito
- Auto-dismiss: 4 segundos
- Ação concluída deve ser visível na interface (item aparece/desaparece)

---

## 5. Progressive Disclosure

### Regra dos 3 níveis

```
Nível 1 → Sempre visível: essencial para a tarefa
Nível 2 → Expansível: configurações comuns (accordion, tab)
Nível 3 → Sob demanda: configurações avançadas (drawer, modal)
```

### Aplicações no produto

| Área | Nível 1 | Nível 2 | Nível 3 |
|------|---------|---------|---------|
| Contato | Nome, email, temperatura | Marcadores, estágio | Histórico completo, score |
| Envio | Nome, status, data | Destinatários, tipo | Configurações de rastreamento |
| Fluxo | Nome, status, contatos ativos | Nós do fluxo | Configurações avançadas |
| Segmentação | Nome, tipo, total | Regras aplicadas | Builder completo |

---

## 6. Confirmação de ações destrutivas

### Sempre confirmar quando:
- Deletar item (modal de confirmação)
- Remover contatos em massa (modal)
- Cancelar wizard em andamento (modal)
- Desativar fluxo com contatos ativos (modal com aviso de impacto)

### Texto padrão de confirmação

```
Título: Remover [nome do item]?
Corpo: Esta ação não pode ser desfeita. [Impacto específico].
Botões: [Cancelar] [Remover] (danger)
```

**Nunca:** "Tem certeza?", "OK/Cancelar", ação destrutiva em dropdown direto.

---

## 7. Navegação e orientação

### Onde o usuário está
- Breadcrumb no topbar indica hierarquia atual
- Item ativo na sidebar sempre visível
- Título da página sempre descreve o conteúdo

### Como voltar
- Botão "Cancelar" sempre fecha o contexto atual (drawer/modal)
- ESC fecha o overlay mais recente
- Browser back não deve quebrar o estado da aplicação

### Persistência de estado
- Filtros aplicados persistem ao voltar à lista
- Posição de scroll é mantida ao fechar um drawer
- Aba ativa em tabs persiste durante a sessão

---

## 8. Linguagem de interface

### Tom de voz
- Direto e funcional — o usuário está trabalhando
- Sem exclamações desnecessárias
- Erros explicam o que aconteceu E o que fazer

### Labels de botão
- Verbo de ação: "Enviar", "Salvar", "Criar", "Importar"
- Nunca genérico: ~~"OK"~~, ~~"Sim"~~, ~~"Confirmar"~~
- Botões destrutivos descrevem a destruição: "Remover contato", "Excluir lista"

### Placeholders
- Exemplos reais, não instruções: `usuario@empresa.com` (não ~~"Digite seu email"~~)
- Ou campo em branco — sem placeholder se o label já é claro

### Mensagens de empty state
- O que está vazio: "Nenhuma lista criada ainda"
- Por que está vazio (quando relevante): "Crie sua primeira lista para começar a enviar"
- CTA claro: "Criar lista"

---

## 9. Acessibilidade mínima

- Todo input tem `<label>` associado
- Botões icon-only têm `aria-label` descritivo
- Focus visible em todos os elementos interativos
- Contraste mínimo AA (4.5:1 para texto, 3:1 para UI)
- Toasts não são o único meio de comunicar estado crítico
- Ordem de foco lógica (não depende de CSS grid/flex visual)

---

## 10. Princípio da consistência

> Quando em dúvida, faça como já existe no sistema.

Antes de inventar um padrão:
1. Verificar se já existe em outro lugar do produto
2. Verificar `docs/02-COMPONENTS.md`
3. Verificar `docs/03-LAYOUTS.md`
4. Só então propor nova solução, documentando em `governance/DECISIONS.md`

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md*
