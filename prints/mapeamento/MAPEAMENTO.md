# Mapeamento do Sistema Dinamize Panel
**Data:** 18/06/2026 | **Fonte:** panel.dinamize.com (acesso direto via Playwright)

Este documento é o mapeamento completo de todos os módulos, fluxos, campos e padrões de UI do sistema atual. Serve como referência para o redesign no novo protótipo (`prototipos/dashboard-auto.html`).

---

## Estrutura de Navegação Global

```
Página inicial
Contatos
  ├── Listas                   #!/mkt/contact
  ├── Importar                 (modal → #!/mkt/contact/import/)
  ├── Segmentações             (modal → #!/mkt/contact/segmentation/)
  ├── Matriz RFM               (modal → #!/mkt/contact/segmentation_rfm/)
  ├── Conversões               (modal → #!/mkt/contact/integrationsList/)
  └── Configurar score         (modal → #!/mkt/contact/score/)
Canais
  ├── E-mail                   #!/mkt/send/?t=email
  ├── Mídias Sociais           #!/mkt/social
  ├── Landing pages            #!/mkt/send/landing-page
  ├── Formulários              (modal)
  ├── Pop-ups                  #!/mkt/config/popup/
  ├── SMS                      #!/mkt/send/?t=sms
  ├── WhatsApp                 #!/mkt/send/?t=whatsapp
  ├── Campanhas                #!/mkt/send/campaign
  ├── Webhooks                 #!/mkt/webhooks
  └── Integrações              (externo: dinamize.com.br/integracoes/)
Fluxos                         #!/mkt/send/workflow/1
Relatórios
  ├── E-mail                   #!/mkt/report/send/?t=email
  ├── SMS                      #!/mkt/report/send/?t=sms
  ├── Whatsapp                 #!/mkt/report/send/?t=whatsapp
  ├── Consumo                  #!/mkt/report/extract
  ├── Consolidado              #!/mkt/report/consolidated
  ├── Envio de relatório       (modal)
  ├── Landing pages            #!/mkt/report/landing-page-list
  ├── Sites                    (modal)
  └── SEO                      #!/mkt/report/seo
IA
  ├── Calendário inteligente   #!/mkt/ia/calendario-inteligente
  └── Assistente de fluxo      #!/mkt/ia/assistente-fluxo
Configurações                  #!/mkt/config
Ajuda
  ├── Central de ajuda         (externo: help.dinamize.com)
  ├── Tutoriais                #!/mkt/help/video-tutorials
  └── Chamados                 #!/mkt/help/list-ticket
```

---

## 1. Contatos

### 1.1 Listas (`#!/mkt/contact`)
**Screenshot:** `03-contatos-listas.png`, `03b-lista-expandida.png`

**Layout:** Grade de cards. Cada card representa uma lista de contatos.

**Card de lista (estado colapsado):**
- Nome da lista
- Data de criação + hora
- Quantidade de contatos
- Ícone de expansão

**Card de lista (estado expandido) — `03b-lista-expandida.png`:**
- Submenu de envios: Novo envio / Envio segmentado por marcador / Envio segmentado por filtro / Em andamento / Histórico
- Submenu de automação: Gerenciar contatos → Visualizar / Segmentação / Cadastrar manualmente / Importar / Histórico de importações / Histórico de exportações
- Submenu de estatísticas: Estatísticas de Uso / Configurar score / Descadastro → Solicitações / Denúncias de SPAM / Motivos
- Submenu de origem: Histórico de importações / Entrada de novos contatos / Formulário de integração / Landing pages / Sistemas de terceiros / Relatório de Origem

**Ações no card:**
- Abrir lista → vai para Visualizar contatos
- Expandir/colapsar menu contextual

---

### 1.2 Visualizar Contatos (`Listas → Gerenciar contatos → Visualizar`)
**Screenshot:** `04-contatos-visualizar.png`

**Tabela de contatos:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Nome completo do contato |
| E-mail | E-mail do contato |
| Data inclusão | Data em que foi adicionado à lista |
| Temperatura | Badge visual (Quente/Morno/Frio) |
| Score atual | Valor numérico de score |
| Estágio no funil | Visitantes / Contatos / Oportunidades / Clientes |
| Ação | 3 ícones: Ver / Editar / Remover |

**Filtros disponíveis:**
- Campo de busca por nome ou e-mail
- Filtro por temperatura
- Filtro por marcador (tag)
- Seleção em massa (checkbox por linha + checkbox do header)

**Barra de ações em massa (quando contatos selecionados):**
- Adicionar marcador
- Remover marcador
- Exportar
- Remover contatos

---

### 1.3 Detalhe/Perfil do Contato
**Screenshot:** `05-contato-detalhe.png`, `05b-contato-acoes.png`, `05c-modal-aberto.png`, `05d-contato-edicao-modal.png`

**Drawer de visualização (click em "Ver"):**
- Avatar com inicial do nome
- Nome + e-mail
- Badges de marcadores
- Resumo: temperatura / score / estágio
- Tabs: Informações / Eventos / Contexto

**Modal de edição (click em "Editar"):**
**Campos:**
- E-mail (texto, obrigatório)
- Nome (texto)
- Marcadores (multi-select de tags)
- Situação do e-mail: Válido / Inválido (radio/select)
- Data de descanso (date picker)
- Estágio: Visitantes / Contatos / Oportunidades / Clientes (select)

**Ações do modal:**
- Cancelar
- Salvar

---

### 1.4 Importar Contatos (Wizard 3 etapas)
**Screenshot:** `26-importar.png`

**Stepper:**
1. **Origem** — Como os dados serão importados
2. **Estrutura** — Mapeamento de colunas
3. **Identificação** — Marcadores, lista destino

**Etapa 1 — Origem:**
- Upload de arquivo (CSV / XLS / XLSX / TXT / ZIP, até 30MB)
- Importação remota (URL)
- Sistemas de terceiros
- Colar texto/dados

**Etapa 2 — Estrutura:**
- Preview das primeiras linhas do arquivo
- Mapeamento: coluna do arquivo → campo do sistema
- Opção de salvar como formato reutilizável
- Gerenciar formatos salvos (drawer secundário)

**Etapa 3 — Identificação:**
- Marcadores a aplicar nos contatos importados
- Nome da lista (nova ou existente)
- Opção de atualizar duplicatas

**Estados finais:**
- Sucesso: quantidade total / importados / atualizados / com erro / descadastrados
- Erro: lista de linhas com problema + opções: Corrigir mapeamento / Tentar novamente / Cancelar

---

### 1.5 Segmentações (`#!/mkt/contact/segmentation/`)
**Screenshot:** `06-segmentacoes.png`

**Layout:** Grid de templates + tabela de segmentações criadas

**Templates disponíveis:**
1. Modelo em branco (ativo)
2. Engajados (ativo — com botões "Editar" e "Enviar e-mail")
3. Visualizaram campanhas (em breve)
4. Clicaram em links (em breve)
5. Últimos cadastrados (em breve)
6. Geolocalização (em breve)
7. Sexo (em breve)
8. Campos personalizados (em breve)

**Tabela de segmentações criadas:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Nome da segmentação |
| Tipo | Comportamento / Personalizada |
| Contatos | Quantidade de contatos |
| % da lista | Percentual |
| Atualizado | Data da última atualização |
| Ações | Editar / Visualizar contatos / Enviar e-mail / Duplicar / Excluir |

**Builder genérico (drawer 50vw):**
- Nome da segmentação
- Grupos de campos:
  - **Dados do contato:** nome / email / telefone / cidade / estado / país / sexo
  - **Lista:** data_cadastro / origem / marcadores
  - **Funil:** estágio
- Operadores por tipo:
  - Texto: contém / não contém / igual / começa com / termina com
  - Data: antes de / depois de / entre / nos últimos X dias
  - Select: é / não é
  - Tags: contém / não contém
- Conectores: E (AND) / OU (OR) entre regras
- Preview de resultado estimado

---

### 1.6 Matriz RFM (`#!/mkt/contact/segmentation_rfm/`)
**Screenshot:** `23-matriz-rfm.png`

**Layout:** Grade 5×5 com 11 segmentos nomeados

**Eixos:**
- Horizontal: Recência (Recente → Antigo)
- Vertical: Frequência × Valor (Alto → Baixo)

**Segmentos nomeados:**
1. Campeões
2. Clientes fiéis
3. Fiéis em potencial
4. Clientes recentes
5. Promissores
6. Precisam de atenção
7. Prestes a hibernar
8. Em risco
9. Não posso perdê-los
10. Hibernando
11. Perdidos

**Ações:**
- Click em célula → ver contatos do segmento
- Enviar campanha para o segmento

---

### 1.7 Conversões (`#!/mkt/contact/integrationsList/`)
**Screenshot:** `24-conversoes.png`

**Conceito:** Integração com plataformas externas para rastrear conversões de contatos.

**Integrações listadas:** conectores com e-commerce e CRM externos.

---

### 1.8 Configurar Score (`#!/mkt/contact/score/`)
**Screenshot:** `25-score.png`

**Regras de pontuação:**
| Evento | Pontos |
|--------|--------|
| Abertura de e-mail | +1 pt |
| Clique em links | +5 pt |
| Conversão | +10 pt |

**Decay:** Configuração de decaimento do score ao longo do tempo (sem ação).

---

## 2. Canais

### 2.1 E-mail (`#!/mkt/send/?t=email`)
**Screenshot:** `07-canais-email.png`

**Layout:** Lista de envios com status, tabs de filtro: Todos / Agendados / Enviados / Rascunhos

**Colunas da tabela:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Nome do envio |
| Tipo | Pontual / Teste A/B |
| Status | Rascunho / Agendado / Enviado / Em processamento |
| Criado em | Data de criação |
| Enviado em | Data/hora do envio |
| Contatos | Quantidade de destinatários |
| Ações | Dropdown com opções |

**Ações por envio (dropdown select2):**
- Editar
- Compartilhar
- Duplicar
- Relatório
- Remover

**Botão principal:** "Novo Envio" → abre wizard de 5 passos

---

### 2.2 Wizard de Novo Envio (5 etapas)
**Screenshot:** `08-novo-envio-wizard.png`, `08b-envio-passo2-edicao.png`

**Stepper:**
1. **Tipo de E-mail** — configurações gerais do envio
2. **Edição da Mensagem** — editor de template/HTML
3. **Validações** — checklist de boas práticas
4. **Interações** — rastreamento de cliques e automações pós-envio
5. **Agendamento** — data/hora de envio

**Passo 1 — Tipo de E-mail (campos):**
- **Público:** Todos os contatos / Por marcador / Por temperatura / Por filtro / Por importação
  - Opção de exclusão: excluir contatos com marcador X / temperatura Y
- **Campanha:** Select de campanhas cadastradas (opcional)
- **Nome do envio:** Campo texto
- **Tipo:** Pontual / Teste A/B

**Passo 2 — Edição:**
- Editor visual com drag-and-drop de blocos
- Variáveis de personalização: {{nome}}, {{email}}, etc.
- Preview desktop/mobile

**Modelos de E-mail (`#!/mkt/send/email-models`):**
**Screenshot:** `09-modelos-email.png`
- Biblioteca de templates categorizados
- Busca por nome
- Preview ao hover
- Ações: Usar / Editar / Duplicar / Excluir

---

### 2.3 SMS (`#!/mkt/send/?t=sms`)
**Screenshot:** `16-sms.png`

**Layout:** Similar ao E-mail, adaptado para SMS.
- Lista de envios com status
- Novo envio: público + texto da mensagem + agendamento
- Limite de caracteres por SMS
- Preview da mensagem

---

### 2.4 WhatsApp (`#!/mkt/send/?t=whatsapp`)
**Screenshot:** `17-whatsapp.png`

**Layout:** Similar ao SMS mas com templates de mensagem WhatsApp Business.
- Seleção de template aprovado pelo Meta
- Variáveis do template
- Público + agendamento

---

### 2.5 Landing Pages (`#!/mkt/send/landing-page`)
**Screenshot:** `18-landing-pages.png`

**Layout:** Grid/lista de landing pages criadas.
- Status: Publicada / Rascunho / Arquivada
- Preview thumbnail
- URL da landing page
- Ações: Editar / Duplicar / Ver relatório / Publicar/Despublicar / Excluir

---

### 2.6 Pop-ups (`#!/mkt/config/popup/`)
**Screenshot:** `21-popups.png`

**Layout:** Lista de pop-ups configurados por site.
- Trigger: ao entrar / ao sair / após X segundos / após scroll Y%
- Segmentação: para quais visitantes exibir
- Status: Ativo / Pausado

---

### 2.7 Campanhas (`#!/mkt/send/campaign`)
**Screenshot:** `19-campanhas.png`

**Conceito:** Agrupador de envios para fins de relatório e análise comparativa.

**Campos de cadastro:**
- Nome da campanha
- Objetivo
- Período (data início / fim)

---

### 2.8 Webhooks (`#!/mkt/webhooks`)
**Screenshot:** `20-webhooks.png`

**Layout:** Lista de webhooks configurados.
**Campos:**
- URL de destino
- Evento gatilho: contato adicionado / atualizado / removido / abertura / clique / conversão
- Status: Ativo / Inativo
- Método: POST

---

### 2.9 Mídias Sociais (`#!/mkt/social`)
**Screenshot:** `22-midias-sociais.png`

**Integrações:** Facebook / Instagram
- Publicações agendadas
- Boost de posts
- Sincronização de audiência

---

## 3. Fluxos de Automação (`#!/mkt/send/workflow/`)
**Screenshot:** `10-fluxos.png`, `10b-fluxos-dropdown.png`, `10c-fluxos-editor.png`

### 3.1 Lista de Fluxos

**Tabela:**
| Coluna | Descrição |
|--------|-----------|
| Nome | Nome do fluxo |
| Status | Ativo / Pausado / Rascunho |
| Contatos | Quantidade de contatos no fluxo |
| Criado em | Data de criação |
| Ações | Dropdown de opções |

**Ações por fluxo (dropdown):**
- Editar
- Compartilhar
- Duplicar
- Relatório
- Remover

---

### 3.2 Editor de Fluxo (`#!/mkt/send/workflow/edit/{id}`)
**Screenshot:** `10c-fluxos-editor.png`

**Layout:** Canvas visual com nós conectados por setas.

**Tipos de nó — Gatilhos (entrada do fluxo):**
1. Entrada de novos contatos (adicionado à lista)
2. Comportamento do contato (abriu e-mail / clicou em link)
3. Verificação diária (hora específica todo dia)
4. Atualização no contato (campo alterado)
5. Navegação no site (visitou URL X)
6. Conversão (completou evento de conversão)

**Tipos de nó — Condições:**
- Se / Senão
- Esperar X dias/horas
- Verificar condição (campo = valor)

**Tipos de nó — Ações:**
1. Enviar e-mail (selecionar template)
2. Enviar SMS
3. Enviar WhatsApp
4. Enviar webhook
5. Atualizar dados do contato (campo + valor)
6. Colocar em descanso (por X dias)
7. Adicionar marcador
8. Remover marcador
9. Mover para lista
10. Remover da lista

**Configurações do fluxo:**
- Nome
- Limite de período: contato só pode entrar 1x a cada X dias
- Limite de finais de semana: pausar envios sáb/dom

---

## 4. Relatórios

### 4.1 Relatório de E-mail (`#!/mkt/report/send/?t=email`)
**Screenshot:** `11-relatorios-email.png`

**KPIs principais:**
- Enviados
- Entregues (+ taxa %)
- Abertos (+ taxa % de entregues)
- Cliques únicos (+ taxa % de abertos)
- Descadastros
- Bounces (suaves / duros)
- SPAM

**Gráficos:**
- Linha temporal de aberturas (hora a hora no dia do envio)
- Mapa de calor de cliques no e-mail
- Dispositivos: Desktop / Mobile / Tablet

**Tabela de links clicados:**
| URL | Cliques | Cliques únicos |

---

### 4.2 Relatório Consolidado (`#!/mkt/report/consolidated`)
**Screenshot:** `12-relatorios-consolidado.png`

**Filtros:**
- Período (data início / fim)
- Canal (E-mail / SMS / WhatsApp)
- Campanha

**Visão:** Agregado de todos os envios no período selecionado.
- Totais por KPI
- Comparativo entre períodos
- Top envios por taxa de abertura

---

### 4.3 Relatório de Consumo (`#!/mkt/report/extract`)
**Screenshot:** `27-relatorio-consumo.png`

**Conceito:** Histórico de consumo de créditos da conta.

**Colunas:**
| Tipo | Período | Quantidade | Créditos usados |

---

## 5. IA

### 5.1 Calendário Inteligente (`#!/mkt/ia/calendario-inteligente`)
**Screenshot:** `13-ia-calendario.png`

**Formulário de geração:**
- **Domínio/segmento:** Select (e-commerce / moda / saúde / financeiro / educação / etc.)
- **Frequência desejada:** X envios por semana/mês
- **Mês de referência:** Date picker (mês + ano)
- **Observações adicionais:** Textarea livre
- **Botão:** "Gerar calendário"

**Output:**
- Calendário mensal com sugestões de datas e temas para envios
- Cada sugestão: data / assunto sugerido / tipo de conteúdo / emoji/hook

---

### 5.2 Assistente de Fluxo (`#!/mkt/ia/assistente-fluxo`)
**Screenshot:** `14-ia-assistente.png`

**Formulário de geração:**
- **Domínio/segmento:** Select (igual ao calendário)
- **Tipo de automação:** Multi-select
  - Boas-vindas
  - Carrinho abandonado
  - Pós-compra
  - Reengajamento
  - Aniversário
  - Nutrição de leads
- **Botão:** "Gerar fluxo"

**Output:**
- Diagrama textual do fluxo sugerido
- Cada nó: tipo + conteúdo sugerido + timing

---

## 6. Configurações (`#!/mkt/config`)
**Screenshot:** `15-configuracoes.png`

**Tabs:**

| Tab | Conteúdo |
|-----|----------|
| DOMÍNIOS | Domínios de envio verificados (SPF/DKIM/CNAME) |
| CONTEÚDO | Endereço físico padrão, rodapé, link de descadastro |
| ENVIO | Velocidade de envio, janelas de silêncio |
| FORMULÁRIOS | Campos e aparência dos formulários de captura |
| INTEGRAÇÃO | Tokens de API, integrações ativas |
| SPF/CNAME | Wizard de configuração de DNS |
| DKIM | Chave DKIM para assinatura de e-mails |
| LANDING PAGE | Domínio personalizado para landing pages |

---

## 7. Ajuda

### 7.1 Tutoriais (`#!/mkt/help/video-tutorials`)
- Grade de vídeos categorizados
- Busca por título
- Categorias: E-mail / SMS / Fluxos / Contatos / Configurações

### 7.2 Chamados (`#!/mkt/help/list-ticket`)
**Screenshot:** `28-ajuda-chamados.png`
- Lista de chamados abertos/fechados
- Colunas: Chamado / Assunto / Status / Atualizado em / Ação
- Botão "Abrir um chamado"
- Horário de atendimento: seg-sex 8:30–18:00

---

## 8. Dashboard (`#!/mkt`)
**Screenshot:** `01-dashboard.png`

**Seções:**
- Resumo do mês: envios / aberturas / cliques
- Gráfico de linha: performance últimos 30 dias
- Últimos envios: tabela resumida com status
- Saúde da lista: % válidos / inválidos / descadastrados
- Próximos agendamentos

---

## 9. Padrões de UI Globais

### 9.1 Padrão de tabelas
- Header com checkbox de seleção em massa
- Linha com hover highlight
- Última coluna sempre "Ações" (ícone ou dropdown)
- Paginação: 30 itens/página por padrão (select de 10/30/50/100)
- Contagem: "Visualizando X de Y itens na página Z"

### 9.2 Padrão de drawers
- **Primário:** desliza da direita, largura ~50vw ou 480–640px, overlay escuro atrás
- **Secundário:** sobrepõe o primário, z-index maior, 640px
- **Header:** título + botão fechar (×)
- **Body:** conteúdo scrollável
- **Footer:** ações principais (Cancelar / Confirmar)
- ESC fecha o mais recente primeiro

### 9.3 Padrão de wizards / steppers
- Linha horizontal com círculos numerados
- Estado: futuro (cinza) / ativo (cor principal) / concluído (check)
- Botões de navegação: "Voltar" (esquerda) + "Próximo" / "Finalizar" (direita)
- Validação antes de avançar etapa

### 9.4 Padrão de modais centrados
- Overlay escuro
- Card centralizado, largura fixa (~520px)
- Header + body + footer (mesma estrutura do drawer)
- Fechar: botão × ou clique no overlay

### 9.5 Padrão de dropdowns de ação
- Ícone de 3 pontos (⋮) ou chevron
- Biblioteca select2
- Opções: Editar / Compartilhar / Duplicar / Relatório / Remover (varia por contexto)

### 9.6 Notificações (toast)
- Canto inferior direito
- Auto-dismiss ~4–5s
- Tipos: sucesso (verde) / erro (vermelho) / aviso (amarelo) / info (azul)
- Ação opcional: link clicável no toast

### 9.7 Badges de temperatura
- **Quente:** fundo vermelho claro, texto vermelho escuro
- **Morno:** fundo amarelo claro, texto âmbar
- **Frio:** fundo azul claro, texto azul escuro

### 9.8 Estágios do funil
1. Visitantes
2. Contatos
3. Oportunidades
4. Clientes

---

## 10. Campos e Vocabulário do Sistema

### Entidade: Contato
| Campo | Tipo | Valores |
|-------|------|---------|
| E-mail | texto | — |
| Nome | texto | — |
| Telefone | texto | — |
| Cidade | texto | — |
| Estado | texto | UF |
| País | texto | — |
| Sexo | select | Masculino / Feminino / Não informado |
| Temperatura | calculado | Quente / Morno / Frio |
| Score | numérico | 0–100+ |
| Estágio | select | Visitantes / Contatos / Oportunidades / Clientes |
| Situação e-mail | select | Válido / Inválido |
| Data de descanso | data | — |
| Marcadores | tags | livres |
| Data de inclusão | data | automático |
| Origem | select | Formulário / Importação / Manual / API |

### Entidade: Envio
| Campo | Valores |
|-------|---------|
| Tipo de canal | E-mail / SMS / WhatsApp |
| Tipo de envio | Pontual / Teste A/B |
| Status | Rascunho / Agendado / Em processamento / Enviado / Cancelado |
| Público | Todos / Marcador / Temperatura / Filtro / Importação |

### Entidade: Segmentação
| Campo | Valores |
|-------|---------|
| Tipo (display) | Personalizada / Comportamento |
| Kind (interno) | custom / engajados |

---

## 11. Oportunidades de Melhoria de UX (para o redesign)

1. **Navegação de Listas:** O sistema atual usa cards colapsáveis com submenus longos. Oportunidade: hierarquia mais clara com mini-SPA dedicada (já implementada no protótipo).

2. **Wizard de Envio:** 5 passos com muita informação no passo 1. Oportunidade: simplificar agrupando público + nome em passo único, mover configurações avançadas para seção colapsável.

3. **Fluxos de automação:** Editor canvas sem grade visual clara. Oportunidade: canvas com snap-to-grid, zoom, minimap.

4. **Relatórios:** Cada canal tem relatório separado. Oportunidade: visão unificada com filtro de canal, comparativos side-by-side.

5. **Configurações:** Abas sem hierarquia visual. Oportunidade: sidebar de navegação nas configs com destaque de seção ativa.

6. **Segmentações:** Templates "em breve" geram frustração. Oportunidade: esconder templates não prontos ou substituir por "lista de espera" interativa.

7. **Mobile:** Sistema atual não é responsivo. Oportunidade: componentes com breakpoints no protótipo.

8. **Busca global:** Não existe. Oportunidade: search bar na topbar que busca em contatos + envios + fluxos.

---

*Mapeamento gerado via acesso direto ao painel: 29 screenshots em `prints/mapeamento/`*
