# 06 — CONTENT
**Padrões de linguagem, copy e conteúdo de interface do produto Dinamize.**

---

## 1. Tom de voz

**Profissional, direto e humano.**

O usuário do Dinamize é um profissional de marketing executando tarefas reais. A interface fala com ele como um colega competente, não como um tutorial.

| ✅ Fazer | ❌ Evitar |
|---------|---------|
| Direto ao ponto | Verboso, com explicações óbvias |
| Verbo de ação nos botões | Palavras genéricas (OK, Sim, Confirmar) |
| Erros que explicam E orientam | Erros técnicos ou vagos |
| Números formatados (1.234) | Números crus (1234) |
| Datas localizadas (30 jun) | Timestamps Unix |

---

## 2. Títulos de página

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Lista | Plural do objeto | "Contatos", "Fluxos", "Envios" |
| Criar | "Novo [Objeto]" | "Novo Envio", "Nova Segmentação" |
| Editar | "Editar [nome do item]" | "Editar Campanha Verão" |
| Detalhe | Nome do item | "João Silva", "Campanha Verão" |
| Configurações | "Configurações" + tab indica o contexto | — |

---

## 3. Labels de botão

### Regra: sempre verbo + objeto

| ✅ Correto | ❌ Errado |
|-----------|---------|
| Criar lista | Criar |
| Importar contatos | Importar |
| Salvar alterações | Salvar |
| Enviar agora | Enviar |
| Remover contato | Remover |
| Cancelar envio | Cancelar |
| Voltar | — (este está ok, é autoexplicativo) |

### Botões de ação destrutiva
Sempre descrevem o que será destruído:
- "Excluir fluxo" (não "Excluir")
- "Remover da lista" (não "Remover")

---

## 4. Mensagens de feedback

### Toast de sucesso
```
Título: [Objeto] [verbo no passado]
Corpo: [Contexto opcional ou próximo passo]

Exemplos:
✅ Envio agendado — "A campanha será enviada em 30/06 às 10h."
✅ Contatos importados — "142 contatos adicionados à lista."
✅ Fluxo ativado — "Os contatos já estão sendo processados."
```

### Toast de erro
```
Título: Não foi possível [ação]
Corpo: [Motivo] + [o que fazer]

Exemplos:
❌ Não foi possível salvar — "Verifique os campos marcados."
❌ Não foi possível enviar — "Limite de créditos atingido. Contrate mais créditos."
```

### Mensagens de erro de campo
- Curtas (≤ 60 caracteres)
- Diretas: "E-mail inválido", "Campo obrigatório", "Mínimo 8 caracteres"
- Nunca técnicas: ~~"Validation failed for field 'email'"~~

---

## 5. Empty States

### Estrutura obrigatória
```
[Ícone ilustrativo]
[Título: o que está vazio]
[Subtítulo: por que e o que fazer]
[CTA: ação para resolver]
```

### Exemplos por contexto

**Lista vazia — nunca usada:**
- Título: "Nenhuma lista criada ainda"
- Subtítulo: "Crie sua primeira lista para começar a enviar campanhas."
- CTA: "Criar lista"

**Busca sem resultado:**
- Título: "Nenhum resultado para '[termo]'"
- Subtítulo: "Tente outros termos ou remova os filtros."
- CTA: "Limpar busca"

**Filtro sem resultado:**
- Título: "Nenhum item encontrado"
- Subtítulo: "Ajuste os filtros para ver mais resultados."
- CTA: "Remover filtros"

**Erro de carregamento:**
- Título: "Não foi possível carregar"
- Subtítulo: "Ocorreu um erro ao buscar os dados. Tente novamente."
- CTA: "Tentar novamente"

---

## 6. Confirmações destrutivas

### Estrutura do modal
```
Título: [Ação] "[Nome do item]"?
Corpo: [Impacto exato da ação]. Esta ação não pode ser desfeita.
Botões: [Cancelar] [ação destrutiva com verbo]
```

### Exemplos
- "Excluir lista 'Clientes 2026'? Todos os 1.342 contatos serão removidos desta lista. Esta ação não pode ser desfeita."
- "Remover fluxo 'Boas-vindas'? O fluxo será desativado e os 23 contatos em andamento serão removidos."

---

## 7. Vocabulário do produto

Termos canônicos — usar sempre estas palavras, nunca sinônimos:

| Termo correto | Nunca usar |
|--------------|-----------|
| Contato | Lead, usuário, cliente (exceto no módulo CRM) |
| Lista | Grupo, segmento (segmento é outro conceito) |
| Segmentação | Filtro avançado, grupo dinâmico |
| Envio | Campanha (campanha é agrupador de envios) |
| Fluxo | Automação, workflow |
| Marcador | Tag, etiqueta |
| Temperatura | Score de engajamento |
| Descadastro | Opt-out, desinscrição |
| Bounce | — (manter o termo técnico para usuários avançados) |

---

## 8. Formatação de dados

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Número inteiro | Separador de milhar | 1.234, 12.500 |
| Percentual | 1 casa decimal | 24,3% |
| Data curta | DD mmm | 30 jun |
| Data longa | DD de mmmm de YYYY | 30 de junho de 2026 |
| Data + hora | DD mmm às HH:mm | 30 jun às 10:30 |
| Relativa | "há X horas", "há 2 dias" | Para eventos recentes |

---

## 9. Labels de status

### Status de envio

| Status | Badge | Label |
|--------|-------|-------|
| Rascunho | neutral | Rascunho |
| Agendado | info | Agendado |
| Em processamento | info animado | Processando |
| Enviado | success | Enviado |
| Cancelado | neutral | Cancelado |
| Com erro | error | Erro |

### Status de fluxo

| Status | Badge | Label |
|--------|-------|-------|
| Rascunho | neutral | Rascunho |
| Ativo | success | Ativo |
| Pausado | warning | Pausado |

### Status de contato

| Campo | Valores |
|-------|---------|
| Temperatura | Quente / Morno / Frio |
| Estágio | Visitantes / Contatos / Oportunidades / Clientes |
| Situação de e-mail | Válido / Inválido |

---

*Versão: 1.0 | Data: 2026-06-30 | Dependência: 00-CONSTITUTION.md*
