# 10 — INTERACTION ARCHITECTURE
**Arquitetura de interações e fluxos do produto Dinamize.**

---

## 1. Modelo de camadas de interação

```
Nível 4: Overlays pesados   → Modais, tela cheia (z: 700)
Nível 3: Drawers            → Painéis laterais (z: 400–600)
Nível 2: Inline             → Expansões, accordions, tabs (z: auto)
Nível 1: Página             → Navegação principal
```

**Regra:** Nunca abrir uma página nova para uma ação que pode ser feita em drawer. Nunca abrir um drawer para algo que cabe em inline.

---

## 2. Padrões de abertura

| Ação | Padrão de abertura |
|------|-------------------|
| Ver detalhes de item | Drawer primário (50vw) |
| Editar item simples | Drawer primário (480–560px) |
| Editar item complexo | Drawer primário (640–720px) |
| Configuração avançada dentro de drawer | Drawer secundário (.z2) |
| Confirmar ação destrutiva | Modal centrado |
| Criar item simples (≤6 campos) | Drawer primário |
| Criar item complexo / wizard | Página inteira (sub-rota) |
| Selecionar item de uma lista | Drawer secundário com lista |
| Preview rápido | Tooltip ou popover |

---

## 3. Fluxos detalhados

### 3.1 Fluxo: Enviar e-mail (5 etapas)

```
[Página: Canais → E-mail]
  Botão "Novo Envio"
    ↓
[Wizard: página inteira]
  Etapa 1: Configuração geral
    - Nome do envio
    - Público-alvo (todos / marcador / temperatura / filtro)
    - Exclusões opcionais
  ↓ [Próximo]
  Etapa 2: Edição do conteúdo
    - Seleção de modelo ou editor
  ↓ [Próximo]
  Etapa 3: Validações
    - Checklist automático de boas práticas
  ↓ [Próximo]
  Etapa 4: Interações
    - Rastreamento de cliques
    - Ações pós-abertura/clique
  ↓ [Próximo]
  Etapa 5: Agendamento
    - Enviar agora ou agendar
  ↓ [Finalizar]
[Toast: "Envio agendado com sucesso"]
[Redirect: lista de envios]
```

### 3.2 Fluxo: Importar contatos (3 etapas)

```
[Página: Contatos → Importar]
  ↓
[Wizard: página inteira]
  Etapa 1: Origem
    - Upload de arquivo / URL / Colar dados
  ↓ [Próximo]
  Etapa 2: Estrutura
    - Preview das primeiras linhas
    - Mapeamento de colunas
  ↓ [Próximo]
  Etapa 3: Identificação
    - Lista destino
    - Marcadores
    - Duplicatas
  ↓ [Importar]
[Estado: loading com progresso]
[Estado: sucesso com resumo]
  ou
[Estado: erro com lista de problemas]
```

### 3.3 Fluxo: Ver e editar contato

```
[Página: Contatos → Lista → Visualizar]
  Click em linha da tabela
    ↓
[Drawer primário: Ver contato]
  - Avatar + nome + email
  - Badges de marcadores
  - Resumo: temperatura / score / estágio
  - Tabs: Informações / Eventos / Contexto
  - Botão "Editar"
    ↓
[Drawer secundário (.z2): Editar contato]
  - Formulário de edição
  - [Cancelar] [Salvar]
    ↓ Salvar
[Drawer secundário fecha]
[Drawer primário atualiza dados]
[Toast: "Contato atualizado"]
```

### 3.4 Fluxo: Criar segmentação

```
[Página: Contatos → Segmentações]
  Botão "Nova Segmentação"
    ↓
[Drawer primário: Builder de Segmentação (50vw)]
  - Nome
  - Grupos de regras (AND/OR)
  - Preview de resultado estimado
  - [Cancelar] [Salvar segmentação]
    ↓ Salvar
[Toast: "Segmentação criada"]
[Lista atualiza com nova segmentação no topo]
```

---

## 4. Gerenciamento de estado de overlay

### Pilha de overlays

```javascript
// Comportamento esperado do ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Fechar o overlay de maior z-index que está aberto
    closeTopMostOverlay();
  }
});
```

### Regras de fechamento

- Click no overlay escuro → fecha o drawer/modal correspondente
- ESC → fecha o overlay mais recente
- Botão "×" → fecha o overlay correspondente
- Botão "Cancelar" no footer → fecha o overlay correspondente
- Salvar com sucesso → fecha automaticamente + toast

---

## 5. Padrões de loading

### Loading de página (inicial)

```
Skeleton da estrutura → Componentes reais
```

### Loading de ação (botão)

```
[Botão] → click → [Botão disabled + spinner] → resultado → [estado normal]
```

### Loading de tabela (filtro aplicado)

```
[Tabela atual] → fade 50% → [Spinner centralizado] → [Nova tabela]
```

### Loading de drawer (dados assíncronos)

```
[Drawer abre] → [Skeleton do conteúdo] → [Conteúdo real]
```

---

## 6. Padrões de validação

### Timing de validação

| Campo | Quando validar |
|-------|---------------|
| E-mail, URL | On blur (ao sair do campo) |
| Nome, texto | On submit apenas |
| Select obrigatório | On submit |
| Upload de arquivo | Imediato ao selecionar |
| Confirmação de senha | On blur da confirmação |

### Regras de display

- Mostrar erro abaixo do campo com `form-error.show`
- Nunca travar o formulário com erros de outros campos
- Scroll automático para o primeiro erro ao tentar submeter
- Remover erro quando usuário corrigir o campo (on change)

---

## 7. Seleção em massa

### Lifecycle

```
Estado zero (nenhum selecionado)
  checkbox individual → click
    ↓
Estado parcial (alguns selecionados)
  - Bulk bar aparece
  - Checkbox do header mostra "-" (indeterminate)
    ↓
Estado total (todos selecionados)
  - Checkbox do header marcado
  - Bulk bar mostra "Todos selecionados"
    ↓
Ação na bulk bar
  - Se destrutiva: modal de confirmação
  - Se não destrutiva: executa direto + toast
    ↓
Após ação: desmarca tudo, bulk bar desaparece
```

---

## 8. Busca global

### Comportamento esperado (a implementar)

- Atalho: `Cmd/Ctrl + K`
- Abre modal central de busca
- Busca em: contatos, envios, fluxos, segmentações, templates
- Resultados agrupados por tipo
- Enter no resultado → navega para item ou abre drawer de detalhe

---

## 9. Navegação do produto

### Hierarquia de rotas

```
/                     → Dashboard
/contatos             → Listas de contatos
/contatos/listas      → Lista de listas
/contatos/segmentacoes
/contatos/rfm
/canais               → Overview de canais
/canais/email
/canais/sms
/canais/whatsapp
/canais/landing-pages
/canais/popups
/canais/campanhas
/canais/webhooks
/fluxos
/relatorios/email
/relatorios/sms
/relatorios/consolidado
/ia/calendario
/ia/assistente
/configuracoes
/ajuda
```

### Sub-navegação

Módulos com sub-rotas usam `.sub-nav` logo abaixo do topbar.
A tab ativa corresponde à rota atual.

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md, 04-UX-PRINCIPLES.md*
