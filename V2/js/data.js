/* ══════════════════════════════════════════════
   MOCK DATA — Dinamize V2
══════════════════════════════════════════════ */

const DB = {

  lists: [
    { id:'l1', name:'Meus Contatos',       contacts:85420, created:'16/03/2026', sends:14, opens_rate:0.312, lastSend:'15/06/2026' },
    { id:'l2', name:'Leads Captados',      contacts:12840, created:'02/01/2026', sends:8,  opens_rate:0.285, lastSend:'12/06/2026' },
    { id:'l3', name:'Clientes Ativos',     contacts:5630,  created:'10/01/2026', sends:22, opens_rate:0.408, lastSend:'14/06/2026' },
    { id:'l4', name:'Re-engajamento',      contacts:9210,  created:'20/02/2026', sends:5,  opens_rate:0.197, lastSend:'08/06/2026' },
    { id:'l5', name:'Newsletter',          contacts:34100, created:'05/12/2025', sends:31, opens_rate:0.349, lastSend:'16/06/2026' },
    { id:'l6', name:'Abandono de Carrinho',contacts:3890,  created:'01/03/2026', sends:19, opens_rate:0.421, lastSend:'17/06/2026' },
  ],

  contacts: {
    l1: [
      { id:'c1',  name:'Ana Paula Rodrigues', email:'ana.rodrigues@empresa.com.br', phone:'(11)99123-4567', origin:'Formulário', temp:'Quente', score:87, funnel:'Clientes',      updated:'15/06/2026', status:'Válido',   tags:['VIP','São Paulo'] },
      { id:'c2',  name:'Carlos Mendes',        email:'carlos.mendes@outlook.com',   phone:'(21)98765-4321', origin:'Importação', temp:'Morno',  score:54, funnel:'Oportunidades', updated:'14/06/2026', status:'Válido',   tags:['Lead Quente'] },
      { id:'c3',  name:'Fernanda Lima',         email:'fernanda.lima@gmail.com',     phone:'(31)97654-8765', origin:'Manual',     temp:'Frio',   score:18, funnel:'Contatos',      updated:'10/06/2026', status:'Válido',   tags:[] },
      { id:'c4',  name:'Roberto Alves Costa',   email:'roberto.alves@tech.io',       phone:'(11)96543-2109', origin:'API',        temp:'Quente', score:92, funnel:'Clientes',      updated:'16/06/2026', status:'Válido',   tags:['VIP'] },
      { id:'c5',  name:'Juliana Ferreira',      email:'juh.ferreira@yahoo.com',      phone:'(41)95432-1098', origin:'Formulário', temp:'Morno',  score:61, funnel:'Oportunidades', updated:'13/06/2026', status:'Válido',   tags:['Newsletter'] },
      { id:'c6',  name:'Marcos Vinicius Souza', email:'mvsouza@empresa.com',         phone:'(51)94321-0987', origin:'Importação', temp:'Frio',   score:22, funnel:'Visitantes',    updated:'08/06/2026', status:'Inválido', tags:[] },
      { id:'c7',  name:'Patricia Nunes',        email:'pat.nunes@hotmail.com',       phone:'(11)93210-9876', origin:'Manual',     temp:'Quente', score:78, funnel:'Clientes',      updated:'15/06/2026', status:'Válido',   tags:['VIP','Rio de Janeiro'] },
      { id:'c8',  name:'Diego Santana',         email:'diego.s@startupbr.com.br',   phone:'(21)92109-8765', origin:'API',        temp:'Morno',  score:46, funnel:'Contatos',      updated:'11/06/2026', status:'Válido',   tags:['Lead Quente'] },
      { id:'c9',  name:'Camila Oliveira',       email:'camila.o@comercio.net',       phone:'(31)91098-7654', origin:'Formulário', temp:'Quente', score:83, funnel:'Oportunidades', updated:'14/06/2026', status:'Válido',   tags:['São Paulo'] },
      { id:'c10', name:'Lucas Barros',          email:'lbarros@gmail.com',           phone:'(71)90987-6543', origin:'Importação', temp:'Frio',   score:9,  funnel:'Visitantes',    updated:'05/06/2026', status:'Válido',   tags:[] },
      { id:'c11', name:'Isabela Matos',         email:'isa.matos@corp.com',          phone:'(11)99876-5432', origin:'Manual',     temp:'Morno',  score:55, funnel:'Contatos',      updated:'12/06/2026', status:'Válido',   tags:['Newsletter'] },
      { id:'c12', name:'André Pinheiro',        email:'andre.p@outlook.com',         phone:'(41)98765-4321', origin:'Formulário', temp:'Quente', score:74, funnel:'Clientes',      updated:'15/06/2026', status:'Válido',   tags:['VIP'] },
    ],
    l2: [
      { id:'c20', name:'Bruno Carvalho',   email:'b.carvalho@leads.com',  phone:'(11)91111-2222', origin:'Formulário', temp:'Quente', score:68, funnel:'Oportunidades', updated:'16/06/2026', status:'Válido',   tags:['Lead Quente'] },
      { id:'c21', name:'Marina Costa',     email:'marina.costa@gmail.com', phone:'(21)92222-3333', origin:'Formulário', temp:'Morno',  score:41, funnel:'Contatos',      updated:'14/06/2026', status:'Válido',   tags:[] },
      { id:'c22', name:'Felipe Rocha',     email:'f.rocha@empresa.net',    phone:'(31)93333-4444', origin:'API',        temp:'Frio',   score:12, funnel:'Visitantes',    updated:'10/06/2026', status:'Válido',   tags:['Newsletter'] },
    ],
    l3: [
      { id:'c30', name:'Tatiane Freitas',  email:'tati.freitas@corp.com',  phone:'(11)94444-5555', origin:'Manual',     temp:'Quente', score:91, funnel:'Clientes',      updated:'17/06/2026', status:'Válido',   tags:['VIP','Cliente Premium'] },
      { id:'c31', name:'Rodrigo Leite',    email:'r.leite@clientes.com',   phone:'(21)95555-6666', origin:'Importação', temp:'Morno',  score:67, funnel:'Clientes',      updated:'15/06/2026', status:'Válido',   tags:['Cliente Premium'] },
      { id:'c32', name:'Aline Dias',       email:'aline.dias@outlook.com', phone:'(31)96666-7777', origin:'Formulário', temp:'Quente', score:83, funnel:'Oportunidades', updated:'14/06/2026', status:'Válido',   tags:['VIP'] },
    ],
    l4: [], l5: [], l6: [],
  },

  tags: ['VIP','São Paulo','Rio de Janeiro','Lead Quente','Newsletter','Parceiro','Cliente Premium','Re-engajar'],

  sends: [
    { id:'s1', name:'Campanha Junho — Oferta Especial',  type:'Pontual',   status:'sent',  list:'Meus Contatos',       recipients:85420, opens:26600, clicks:8040, created:'10/06/2026', sentAt:'12/06/2026 09:00', campaign:'Junho 2026' },
    { id:'s2', name:'Newsletter Semanal #24',            type:'Pontual',   status:'sent',  list:'Newsletter',           recipients:34100, opens:11900, clicks:3290, created:'08/06/2026', sentAt:'09/06/2026 08:00', campaign:'' },
    { id:'s3', name:'Boas-vindas Leads Captados',        type:'Pontual',   status:'sent',  list:'Leads Captados',       recipients:12840, opens:5370,  clicks:1680, created:'01/06/2026', sentAt:'01/06/2026 10:30', campaign:'Onboarding' },
    { id:'s4', name:'Oferta Exclusiva Clientes Ativos',  type:'Pontual',   status:'sent',  list:'Clientes Ativos',      recipients:5630,  opens:2300,  clicks:920,  created:'05/06/2026', sentAt:'06/06/2026 14:00', campaign:'Junho 2026' },
    { id:'s5', name:'Recuperação Abandono #3',           type:'Pontual',   status:'sent',  list:'Abandono de Carrinho', recipients:3890,  opens:1639,  clicks:742,  created:'03/06/2026', sentAt:'04/06/2026 11:00', campaign:'Recuperação' },
    { id:'s6', name:'Campanha Julho — Prévia Exclusiva', type:'Teste A/B', status:'sched', list:'Meus Contatos',        recipients:85420, opens:0,     clicks:0,    created:'17/06/2026', sentAt:'25/06/2026 09:00', campaign:'Julho 2026' },
    { id:'s7', name:'Re-engajamento — Inativos 90 dias', type:'Pontual',   status:'sched', list:'Re-engajamento',       recipients:9210,  opens:0,     clicks:0,    created:'16/06/2026', sentAt:'20/06/2026 10:00', campaign:'' },
    { id:'s8', name:'Newsletter Semanal #25 [rascunho]', type:'Pontual',   status:'draft', list:'Newsletter',           recipients:34100, opens:0,     clicks:0,    created:'17/06/2026', sentAt:'—', campaign:'' },
    { id:'s9', name:'Black Friday — Teaser',             type:'Pontual',   status:'draft', list:'Meus Contatos',        recipients:85420, opens:0,     clicks:0,    created:'15/06/2026', sentAt:'—', campaign:'' },
  ],

  flows: [
    { id:'f1', name:'Boas-vindas Automático', status:'active', contacts:1240, trigger:'Entrada de novos contatos', steps:5, created:'15/01/2026', updated:'12/06/2026' },
    { id:'f2', name:'Nutrição de Leads',      status:'active', contacts:3860, trigger:'Verificação diária',        steps:9, created:'20/02/2026', updated:'15/06/2026' },
    { id:'f3', name:'Recuperação Carrinho',   status:'active', contacts:428,  trigger:'Conversão',                 steps:4, created:'01/03/2026', updated:'17/06/2026' },
    { id:'f4', name:'Reengajamento 90 dias',  status:'paused', contacts:2140, trigger:'Verificação diária',        steps:6, created:'10/04/2026', updated:'01/06/2026' },
    { id:'f5', name:'Aniversário do Cliente', status:'active', contacts:89,   trigger:'Verificação diária',        steps:3, created:'05/05/2026', updated:'18/05/2026' },
    { id:'f6', name:'Pós-venda Premium',      status:'draft',  contacts:0,    trigger:'Atualização no contato',    steps:7, created:'17/06/2026', updated:'17/06/2026' },
  ],

  segments: [
    { id:'sg1', name:'Clientes VIP São Paulo', kind:'custom',    type:'Personalizada', contacts:1840,  pct:2.2,  updated:'14/06/2026', listId:'l1' },
    { id:'sg2', name:'Engajados',              kind:'engajados', type:'Comportamento', contacts:62357, pct:73.0, updated:'15/06/2026', listId:'l1' },
    { id:'sg3', name:'Leads com Score Alto',   kind:'custom',    type:'Personalizada', contacts:3210,  pct:3.8,  updated:'12/06/2026', listId:'l1' },
    { id:'sg4', name:'Engajados — Leads',      kind:'engajados', type:'Comportamento', contacts:4820,  pct:37.5, updated:'17/06/2026', listId:'l2' },
  ],

  segmentTemplates: [
    { id:'tpl1', name:'Modelo em branco',             desc:'Crie uma segmentação personalizada com suas próprias regras',        kind:'blank',     icon:'edit',           active:true },
    { id:'tpl2', name:'Engajados',                    desc:'Contatos que abriram ou clicaram em e-mails recentemente',           kind:'engajados', icon:'activity',       active:true },
    { id:'tpl3', name:'Visualizaram algum envio',     desc:'Contatos que abriram pelo menos um e-mail enviado pela conta',       kind:'custom',    icon:'eye',            active:true },
    { id:'tpl4', name:'Clicaram na URL',              desc:'Contatos que clicaram em um link específico dentro dos envios',      kind:'custom',    icon:'mouse-pointer',  active:true },
    { id:'tpl5', name:'Geolocalização',               desc:'Segmente por cidade, estado ou região geográfica',                   kind:'custom',    icon:'map-pin',        active:true },
    { id:'tpl6', name:'Sexo',                         desc:'Filtre contatos pelo campo de gênero informado no cadastro',         kind:'custom',    icon:'users',          active:true },
    { id:'tpl7', name:'Informações do registro',      desc:'Segmente por origem, data de cadastro ou campo personalizado',       kind:'custom',    icon:'file-text',      active:true },
    { id:'tpl8', name:'Últimos contatos cadastrados', desc:'Contatos adicionados nos últimos dias — intervalo configurável',     kind:'custom',    icon:'user-clock',     active:true },
  ],

  engajadosConfig: {
    periodoTipo: 'desde',
    periodoDias: 30,
    dataInicio: '',
    dataFim: '',
    aplicaA: 'todos',
    segmentarTipo: 'marcadores',
    marcadores: [],
    estagio: '',
  },

  rfmSegments: [
    { id:'rfm1',  name:'Campeões',              color:'#0EA679', bg:'#E6FAF3', count:8420,  desc:'Compraram recentemente, frequentemente e gastaram mais' },
    { id:'rfm2',  name:'Clientes Fiéis',        color:'#2563EB', bg:'#EFF6FF', count:12840, desc:'Compram regularmente com bom valor monetário' },
    { id:'rfm3',  name:'Clientes Recentes',     color:'#6366F1', bg:'#EEF2FF', count:5230,  desc:'Compraram recentemente mas poucas vezes' },
    { id:'rfm4',  name:'Promissores',           color:'#8B5CF6', bg:'#F5F3FF', count:9180,  desc:'Recência alta mas baixa frequência' },
    { id:'rfm5',  name:'Precisam de Atenção',   color:'#F59E0B', bg:'#FFFBEB', count:11240, desc:'Recência e frequência acima da média, mas inatividade crescente' },
    { id:'rfm6',  name:'Prestes a Adormecer',   color:'#F97316', bg:'#FFF7ED', count:7830,  desc:'Abaixo da média em recência e frequência' },
    { id:'rfm7',  name:'Em Risco',              color:'#EA5456', bg:'#FEF2F2', count:6420,  desc:'Já foram muito engajados, mas há muito tempo' },
    { id:'rfm8',  name:'Não Podem Perder',      color:'#DC2626', bg:'#FEF2F2', count:3210,  desc:'Gastaram muito mas não voltam há bastante tempo' },
    { id:'rfm9',  name:'Hibernando',            color:'#64748B', bg:'#F1F5F9', count:9850,  desc:'Recência e frequência muito baixas' },
    { id:'rfm10', name:'Perdidos',              color:'#334155', bg:'#F1F5F9', count:12100, desc:'Menor recência, frequência e valor monetário' },
    { id:'rfm11', name:'Novos Clientes',        color:'#06B6D4', bg:'#ECFEFF', count:4380,  desc:'Compraram recentemente pela primeira vez' },
  ],

  rfmGrid: [
    // Each row = [R-level high→low], each col = [FM-level low→high]
    // rfmGrid[row][col] = segment name  (row 0 = R=5 most recent)
    ['Clientes Recentes','Novos Clientes','Promissores','Clientes Fiéis','Campeões'],
    ['Precisam de Atenção','Precisam de Atenção','Promissores','Clientes Fiéis','Campeões'],
    ['Em Risco','Prestes a Adormecer','Precisam de Atenção','Promissores','Promissores'],
    ['Em Risco','Hibernando','Prestes a Adormecer','Em Risco','Não Podem Perder'],
    ['Perdidos','Perdidos','Hibernando','Hibernando','Não Podem Perder'],
  ],

  rfmCounts: {
    'Campeões':8420,'Clientes Fiéis':12840,'Clientes Recentes':5230,'Promissores':9180,
    'Precisam de Atenção':11240,'Prestes a Adormecer':7830,'Em Risco':6420,
    'Não Podem Perder':3210,'Hibernando':9850,'Perdidos':12100,'Novos Clientes':4380,
  },

  scoreRules: [
    { id:'sr1', event:'Abertura de e-mail',  icon:'eye',       points:1,   enabled:true,  color:'var(--success)' },
    { id:'sr2', event:'Clique em link',      icon:'click',     points:5,   enabled:true,  color:'var(--auto)' },
    { id:'sr3', event:'Conversão (pixel)',   icon:'check',     points:10,  enabled:true,  color:'var(--fluxos)' },
    { id:'sr4', event:'Soft bounce',         icon:'alert',     points:-2,  enabled:true,  color:'var(--warning)' },
    { id:'sr5', event:'Hard bounce',         icon:'x-circle',  points:-10, enabled:true,  color:'var(--error)' },
    { id:'sr6', event:'Descadastro',         icon:'user-x',    points:-20, enabled:true,  color:'var(--error)' },
  ],

  scoreDecay: { enabled:true, points:1, days:30 },
  scoreResetOnUnsub: true,

  conversoes: [
    { id:'cv1', name:'Pixel JavaScript', desc:'Rastreie conversões em seu site com um snippet JavaScript personalizado', enabled:true  },
    { id:'cv2', name:'Google Analytics', desc:'Sincronize metas e eventos do Google Analytics 4 com seu painel',       enabled:false },
    { id:'cv3', name:'Webhook',          desc:'Receba notificações de conversão em tempo real via HTTP POST',           enabled:true  },
    { id:'cv4', name:'WooCommerce',      desc:'Integre automaticamente com seu e-commerce WordPress',                  enabled:false },
    { id:'cv5', name:'Shopify',          desc:'Conecte sua loja Shopify e rastreie compras como conversões',           enabled:false },
  ],

  importHistory: [
    { id:'ih1', file:'clientes-junho-2026.csv',  list:'Meus Contatos',  imported:1840, skipped:23, errors:4,   date:'15/06/2026 10:32', status:'success' },
    { id:'ih2', file:'leads-maio-2026.xlsx',     list:'Leads Captados', imported:3210, skipped:87, errors:12,  date:'05/06/2026 14:15', status:'success' },
    { id:'ih3', file:'clientes-antigos.txt',     list:'Re-engajamento', imported:0,    skipped:0,  errors:254, date:'20/05/2026 09:48', status:'error' },
    { id:'ih4', file:'newsletter-base.csv',      list:'Newsletter',     imported:5420, skipped:108,errors:31,  date:'12/05/2026 11:00', status:'success' },
  ],

  savedFormats: [
    { id:'fmt1', name:'Padrão CRM', cols:['email','nome','telefone','cidade'] },
    { id:'fmt2', name:'Export Shopify', cols:['Email','First Name','Last Name','Phone'] },
  ],

  smsSends: [
    { id:'sms1', name:'Promoção Junho — Alerta Flash',    status:'sent',  list:'Meus Contatos',     recipients:5420, delivered:5380, created:'14/06/2026', sentAt:'14/06/2026 10:00' },
    { id:'sms2', name:'50% OFF — Somente Hoje',           status:'sent',  list:'Clientes Ativos',   recipients:2100, delivered:2095, created:'10/06/2026', sentAt:'10/06/2026 12:00' },
    { id:'sms3', name:'Lembrete Webinar Julho',           status:'sched', list:'Newsletter',         recipients:8400, delivered:0,    created:'17/06/2026', sentAt:'25/06/2026 09:00' },
    { id:'sms4', name:'Reativação Inativos 90 dias',      status:'draft', list:'Re-engajamento',     recipients:3200, delivered:0,    created:'16/06/2026', sentAt:'—' },
  ],

  waSends: [
    { id:'wa1', name:'Boas-vindas WhatsApp',       template:'boas_vindas_v2',      status:'sent',  list:'Leads Captados',       recipients:1840, delivered:1820, read:1640, created:'12/06/2026', sentAt:'12/06/2026 09:00' },
    { id:'wa2', name:'Recuperação Carrinho WA',    template:'carrinho_abandonado', status:'sent',  list:'Abandono de Carrinho', recipients:890,  delivered:882,  read:710,  created:'08/06/2026', sentAt:'09/06/2026 14:00' },
    { id:'wa3', name:'Promoção Exclusiva WA',      template:'promo_exclusiva_jun', status:'sched', list:'Clientes Ativos',      recipients:2400, delivered:0,    read:0,    created:'17/06/2026', sentAt:'22/06/2026 10:00' },
    { id:'wa4', name:'Confirmação de Pedido WA',   template:'confirma_pedido_v1',  status:'draft', list:'Clientes Ativos',      recipients:0,    delivered:0,    read:0,    created:'17/06/2026', sentAt:'—' },
  ],

  waTemplates: [
    { id:'wt1', name:'boas_vindas_v2',      label:'Boas-vindas v2',           vars:['{{nome}}','{{empresa}}'],             approved:true },
    { id:'wt2', name:'carrinho_abandonado', label:'Carrinho Abandonado',       vars:['{{nome}}','{{produto}}','{{link}}'],  approved:true },
    { id:'wt3', name:'promo_exclusiva_jun', label:'Promoção Exclusiva Junho',  vars:['{{nome}}','{{desconto}}'],            approved:true },
    { id:'wt4', name:'confirma_pedido_v1',  label:'Confirmação de Pedido v1',  vars:['{{nome}}','{{pedido}}','{{valor}}'],  approved:true },
  ],

  landingPages: [
    { id:'lp1', name:'Oferta Junho 2026',           status:'published', url:'seudominio.com/lp/junho',       visits:8420,  convRate:0.124, created:'01/06/2026', updated:'15/06/2026' },
    { id:'lp2', name:'Cadastro Newsletter',          status:'published', url:'seudominio.com/lp/newsletter', visits:12840, convRate:0.318, created:'15/03/2026', updated:'10/06/2026' },
    { id:'lp3', name:'Ebook Gratuito — Marketing',  status:'published', url:'seudominio.com/lp/ebook-mkt',  visits:5630,  convRate:0.267, created:'20/04/2026', updated:'12/06/2026' },
    { id:'lp4', name:'Webinar Julho 2026',           status:'draft',     url:'—',                             visits:0,     convRate:0,     created:'16/06/2026', updated:'17/06/2026' },
    { id:'lp5', name:'Black Friday 2025',            status:'archived',  url:'seudominio.com/lp/bf-2025',    visits:24100, convRate:0.089, created:'01/10/2025', updated:'30/11/2025' },
  ],

  popups: [
    { id:'pp1', name:'Newsletter Signup',   site:'seudominio.com.br',       trigger:'Saída da página',     audience:'Todos os visitantes',    status:'active', views:12840, conversions:1284, convRate:0.100 },
    { id:'pp2', name:'Promoção Flash',      site:'loja.seudominio.com.br',  trigger:'Após 30 segundos',    audience:'Novos visitantes',        status:'active', views:5430,  conversions:868,  convRate:0.160 },
    { id:'pp3', name:'Pesquisa de Saída',   site:'seudominio.com.br',       trigger:'Saída da página',     audience:'Visitantes recorrentes',  status:'paused', views:3210,  conversions:289,  convRate:0.090 },
  ],

  campanhas: [
    { id:'ca1', name:'Junho 2026',   objective:'Vendas',         start:'01/06/2026', end:'30/06/2026', sends:4, opens:0.334, clicks:0.087, revenue:'R$ 48.400' },
    { id:'ca2', name:'Julho 2026',   objective:'Lançamento',     start:'01/07/2026', end:'31/07/2026', sends:1, opens:0,     clicks:0,     revenue:'—' },
    { id:'ca3', name:'Onboarding',   objective:'Retenção',       start:'01/01/2026', end:'31/12/2026', sends:8, opens:0.418, clicks:0.131, revenue:'—' },
    { id:'ca4', name:'Recuperação',  objective:'Re-engajamento', start:'01/03/2026', end:'30/06/2026', sends:5, opens:0.421, clicks:0.190, revenue:'R$ 12.800' },
  ],

  formularios: [
    { id:'fm1', name:'Formulário de Contato',       fields:5, submissions:1840,  status:'active', created:'10/01/2026' },
    { id:'fm2', name:'Cadastro Newsletter',          fields:3, submissions:12640, status:'active', created:'15/03/2026' },
    { id:'fm3', name:'Solicitação de Orçamento',    fields:8, submissions:312,   status:'active', created:'20/04/2026' },
    { id:'fm4', name:'Pesquisa de Satisfação',      fields:6, submissions:89,    status:'paused', created:'01/06/2026' },
  ],

  webhooks: [
    { id:'wh1', url:'https://api.seucrm.com/webhooks/dinamize',          event:'Contato adicionado', method:'POST', status:'active', lastTriggered:'17/06/2026 14:32', calls:8420 },
    { id:'wh2', url:'https://hooks.zapier.com/hooks/catch/1234567',      event:'Conversão',           method:'POST', status:'active', lastTriggered:'17/06/2026 09:18', calls:1240 },
    { id:'wh3', url:'https://api.pipedrive.com/v1/webhooks/in/abcdef12', event:'Abertura de e-mail', method:'POST', status:'paused', lastTriggered:'10/06/2026 11:00', calls:5630 },
  ],

  socialPosts: [
    { id:'sp1', network:'instagram', content:'✨ Transforme sua estratégia de marketing com Dinamize', scheduledAt:'18/06/2026 14:00', status:'published', likes:284 },
    { id:'sp2', network:'facebook',  content:'📧 Dica da semana: personalize com variáveis {{nome}}',  scheduledAt:'15/06/2026 09:00', status:'published', likes:142 },
    { id:'sp3', network:'facebook',  content:'🚀 Novidade: confira nossa oferta exclusiva de junho!', scheduledAt:'20/06/2026 10:00', status:'scheduled', likes:0   },
  ],

  socialAccounts: [
    { id:'sa1', network:'facebook',  name:'Dinamize Automation', connected:true,  followers:'8.4K',  lastSync:'17/06/2026 08:00' },
    { id:'sa2', network:'instagram', name:'@dinamize.automation', connected:true,  followers:'12.1K', lastSync:'17/06/2026 08:00' },
  ],

  reportEmail: {
    selectedId: 's1',
    sends: [
      { id:'s1', name:'Campanha Junho — Oferta Especial', sentAt:'12/06/2026 09:00', list:'Meus Contatos',
        enviados:85420, entregues:83920, entreguesTaxa:0.9824,
        abertos:28482, abertosTaxa:0.3394, cliques:8740, cliquesTaxa:0.3069,
        descadastros:142, bounceSuave:890, bounceDuro:610, spam:23,
        devices:{ desktop:0.62, mobile:0.31, tablet:0.07 },
        hourly:[0,0,0,0,0,0,0,0,0.12,0.24,0.18,0.14,0.08,0.06,0.05,0.04,0.03,0.02,0.01,0.01,0,0,0,0],
        links:[
          { url:'https://seudominio.com/oferta-especial', cliques:3420, unicos:2980 },
          { url:'https://seudominio.com/categorias/verao', cliques:2140, unicos:1890 },
          { url:'https://seudominio.com/contato', cliques:980, unicos:870 },
          { url:'https://seudominio.com/blog', cliques:640, unicos:580 },
          { url:'https://seudominio.com/instagram', cliques:420, unicos:390 },
        ],
      },
      { id:'s2', name:'Newsletter Semanal #24', sentAt:'09/06/2026 08:00', list:'Newsletter',
        enviados:34100, entregues:33580, entreguesTaxa:0.9847,
        abertos:11900, abertosTaxa:0.3544, cliques:3290, cliquesTaxa:0.2765,
        descadastros:48, bounceSuave:340, bounceDuro:180, spam:8,
        devices:{ desktop:0.58, mobile:0.36, tablet:0.06 },
        hourly:[0,0,0,0,0,0,0,0,0.18,0.26,0.16,0.12,0.07,0.05,0.04,0.03,0.02,0.01,0.01,0,0,0,0,0],
        links:[
          { url:'https://seudominio.com/blog/novidades', cliques:1840, unicos:1620 },
          { url:'https://seudominio.com/produtos', cliques:980, unicos:870 },
          { url:'https://seudominio.com/sobre', cliques:470, unicos:420 },
        ],
      },
    ],
  },

  reportConsolidado: {
    kpis:{ enviados:151880, entregues:149230, entreguesTaxa:0.9826, abertos:50692, abertosTaxa:0.3397, cliques:15510, cliquesTaxa:0.3060, descadastros:478 },
    topSends:[
      { name:'Recuperação Abandono #3',  lista:'Abandono de Carrinho', abertura:0.421, cliques:0.453 },
      { name:'Oferta Exclusiva Clientes', lista:'Clientes Ativos',     abertura:0.408, cliques:0.400 },
      { name:'Boas-vindas Leads',         lista:'Leads Captados',       abertura:0.418, cliques:0.313 },
      { name:'Newsletter Semanal #24',    lista:'Newsletter',            abertura:0.349, cliques:0.277 },
      { name:'Campanha Junho',            lista:'Meus Contatos',         abertura:0.312, cliques:0.302 },
    ],
  },

  reportConsumo:[
    { tipo:'E-mail',    periodo:'Junho 2026', quantidade:9, creditos:141080 },
    { tipo:'SMS',       periodo:'Junho 2026', quantidade:2, creditos:7475   },
    { tipo:'WhatsApp',  periodo:'Junho 2026', quantidade:2, creditos:2730   },
    { tipo:'E-mail',    periodo:'Maio 2026',  quantidade:7, creditos:118640 },
    { tipo:'SMS',       periodo:'Maio 2026',  quantidade:1, creditos:3200   },
    { tipo:'E-mail',    periodo:'Abril 2026', quantidade:6, creditos:95420  },
    { tipo:'WhatsApp',  periodo:'Abril 2026', quantidade:1, creditos:890    },
  ],

  reportLP:[
    { name:'Oferta Junho 2026',          period:'Jun 2026', visits:8420,  unique:7230,  conversions:1045, convRate:0.124 },
    { name:'Cadastro Newsletter',        period:'Jun 2026', visits:12840, unique:11200, conversions:4083, convRate:0.318 },
    { name:'Ebook Gratuito — Marketing', period:'Jun 2026', visits:5630,  unique:4980,  conversions:1503, convRate:0.267 },
    { name:'Black Friday 2025',          period:'Nov 2025', visits:24100, unique:19840, conversions:2145, convRate:0.089 },
  ],

  dashboardKpis: {
    sends:     { value:6,      delta:+1,    period:'últimos 30 dias' },
    delivered: { value:141080, rate:0.983,  delta:+0.005 },
    opens:     { value:47809,  rate:0.339,  delta:+0.021 },
    clicks:    { value:14672,  rate:0.307,  delta:-0.008 },
    unsubs:    { value:312,    rate:0.002,  delta:-0.001 },
  },

  chartData: {
    labels:['01/06','04/06','07/06','10/06','13/06','16/06','18/06'],
    opens:  [0.28,  0.32,   0.29,   0.34,   0.31,   0.34,   0.33 ],
    clicks: [0.085, 0.092,  0.088,  0.104,  0.098,  0.097,  0.095],
  },
};
