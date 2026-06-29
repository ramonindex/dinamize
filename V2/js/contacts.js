/* ══════════════════════════════════════════════
   CONTACTS MODULE — V2
   Views: lists · list-detail · segments · rfm · score · conversoes
══════════════════════════════════════════════ */

/* ── State ── */
let activeListId      = null;
let contactsFiltered  = [];
let contactsSelected  = new Set();
let currentContact    = null;
let currentSegId      = null;
let bulkTagAction     = 'add';
let selectedBulkTag   = null;
let iwStep            = 1;
let iwOrigin          = 'file';
let iwTargetListId    = null;
let scStep            = 1;
let scSegId           = null;
let sgDeleteTargetId  = null;
let sgOperator        = 'and';
let deleteTargetId    = null;
let contactTempFilter = '';
let contactFunnelFilter = '';
let editContactTags   = [];

/* ═══════════════════════════════════════════
   NAV — Set active sidebar link
═══════════════════════════════════════════ */
function setNavActive(id) {
  document.querySelectorAll('.nav-sub-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function setTopbar(section, detail) {
  const sep   = document.getElementById('topbar-sep2');
  const curr  = document.getElementById('topbar-current');
  document.getElementById('topbar-section').textContent = section;
  if (detail) {
    sep.style.display = '';
    curr.style.display = '';
    curr.textContent = detail;
  } else {
    sep.style.display  = 'none';
    curr.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════
   VIEW ROUTING
═══════════════════════════════════════════ */
function goToLists() {
  showView('view-lists', 'contacts-app');
  setNavActive('nav-listas');
  setTopbar('Contatos', null);
}

function goToListDetail(listId) {
  activeListId = listId;
  const list = DB.lists.find(l => l.id === listId);
  if (!list) return;
  document.getElementById('detail-list-name').textContent = list.name;
  document.getElementById('detail-list-meta').textContent =
    `${fmtNum(list.contacts)} contatos · Criada em ${list.created}`;
  showView('view-list-detail', 'contacts-app');
  setNavActive('nav-listas');
  setTopbar('Contatos', list.name);
  switchDetailTab('contatos');
}

function goToSegments() {
  showView('view-segments', 'contacts-app');
  setNavActive('nav-segs');
  setTopbar('Contatos', 'Segmentações');
  renderSegsContent('global-segs-content', null);
}

function goToRFM() {
  showView('view-rfm', 'contacts-app');
  setNavActive('nav-rfm');
  setTopbar('Contatos', 'Matriz RFM');
  renderRFMGrid();
}

function goToScore() {
  showView('view-score', 'contacts-app');
  setNavActive('nav-score');
  setTopbar('Contatos', 'Configurar Score');
  renderScoreRules();
}

function goToConversoes() {
  showView('view-conversoes', 'contacts-app');
  setNavActive('nav-conversoes');
  setTopbar('Contatos', 'Conversões');
  renderConversoes();
}

function goBack() { goToLists(); }

/* ═══════════════════════════════════════════
   LIST DETAIL — TABS
═══════════════════════════════════════════ */
function switchDetailTab(tab) {
  ['contatos','segmentacoes','importacoes'].forEach(t => {
    const pane = document.getElementById(`detail-tab-${t}`);
    const btn  = document.getElementById(`sub-detail-${t}`);
    if (pane) pane.classList.toggle('active', t === tab);
    if (btn)  btn.classList.toggle('active', t === tab);
  });

  if (tab === 'contatos') {
    document.getElementById('btn-list-add-contact').style.display = '';
    renderContactsTable();
  }
  if (tab === 'segmentacoes') {
    document.getElementById('btn-list-add-contact').style.display = 'none';
    renderSegsContent('detail-segs-content', activeListId);
  }
  if (tab === 'importacoes') {
    document.getElementById('btn-list-add-contact').style.display = 'none';
    renderImportHistory();
  }
}

/* ═══════════════════════════════════════════
   CONTACTS TABLE
═══════════════════════════════════════════ */
function renderContactsTable(filter) {
  const q = (filter !== undefined ? filter : (document.getElementById('contact-search')?.value||'')).toLowerCase();
  let contacts = DB.contacts[activeListId] || [];

  contactsFiltered = contacts.filter(c => {
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    const matchT = !contactTempFilter   || c.temp   === contactTempFilter;
    const matchF = !contactFunnelFilter || c.funnel === contactFunnelFilter;
    return matchQ && matchT && matchF;
  });

  const tbody = document.getElementById('contacts-tbody');
  if (!tbody) return;

  const el = document.getElementById('contacts-count');
  if (el) el.textContent = `${fmtNum(contactsFiltered.length)} de ${fmtNum(contacts.length)} contatos`;
  const pi = document.getElementById('pagination-info');
  if (pi) pi.textContent = `Mostrando 1–${contactsFiltered.length} de ${fmtNum(contactsFiltered.length)}`;

  if (!contactsFiltered.length) {
    tbody.innerHTML = `<tr><td colspan="8">
      <div class="empty-state">
        <div class="empty-state-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
        <div class="empty-state-title">Nenhum contato encontrado</div>
        <div class="empty-state-text">Tente ajustar os filtros ou adicione novos contatos.</div>
      </div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = contactsFiltered.map(c => `
    <tr>
      <td class="col-check"><input type="checkbox" class="row-cb" value="${c.id}" onchange="toggleContactSelect('${c.id}',this)"></td>
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar avatar-sm">${avatarInitials(c.name)}</div>
          <div class="min-w-0">
            <div class="cell-primary truncate">${c.name}</div>
            <div class="cell-secondary truncate">${c.email}</div>
          </div>
        </div>
      </td>
      <td><div class="flex gap-1 flex-wrap">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')||'<span class="c-3 t-sm">—</span>'}</div></td>
      <td>${tempBadge(c.temp)}</td>
      <td>
        <div class="flex items-center gap-2">
          <div class="progress-bar" style="width:48px"><div class="progress-fill${c.score<40?' warning':''}" style="width:${c.score}%"></div></div>
          <span class="t-sm fw-6">${c.score}</span>
        </div>
      </td>
      <td><span class="badge badge-neutral">${c.funnel}</span></td>
      <td><span class="badge ${c.status==='Válido'?'badge-success':'badge-error'}">${c.status}</span></td>
      <td class="col-actions">
        <div class="row-actions">
          <button class="btn btn-ghost btn-icon-sm" data-tip="Ver perfil" onclick="openContactView('${c.id}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
          <button class="btn btn-ghost btn-icon-sm" data-tip="Editar" onclick="openContactEdit('${c.id}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="btn btn-ghost btn-icon-sm" data-tip="Excluir" style="color:var(--error)" onclick="confirmDeleteContact('${c.id}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterByTemp(t)   { contactTempFilter   = t; renderContactsTable(); }
function filterByFunnel(f) { contactFunnelFilter = f; renderContactsTable(); }
function filterListsGrid(q) {
  document.querySelectorAll('#lists-grid .list-card').forEach(c => {
    const name = c.querySelector('.list-card-title')?.textContent?.toLowerCase()||'';
    c.style.display = name.includes(q.toLowerCase()) ? '' : 'none';
  });
}

function toggleContactSelect(id, cb) {
  cb.checked ? contactsSelected.add(id) : contactsSelected.delete(id);
  cb.closest('tr').classList.toggle('selected', cb.checked);
  updateContactsBulkBar();
  const all    = document.querySelectorAll('#contacts-table .row-cb');
  const master = document.getElementById('contacts-master-cb');
  if (master) {
    master.checked       = contactsSelected.size > 0 && contactsSelected.size === all.length;
    master.indeterminate = contactsSelected.size > 0 && contactsSelected.size < all.length;
  }
}

function toggleAllContacts(cb) {
  document.querySelectorAll('#contacts-table .row-cb').forEach(c => {
    c.checked = cb.checked;
    c.closest('tr').classList.toggle('selected', cb.checked);
    cb.checked ? contactsSelected.add(c.value) : contactsSelected.delete(c.value);
  });
  updateContactsBulkBar();
}

function updateContactsBulkBar() {
  const bar = document.getElementById('contacts-bulk-bar');
  if (!bar) return;
  const n = contactsSelected.size;
  bar.style.display = n > 0 ? 'flex' : 'none';
  const el = document.getElementById('bulk-count');
  if (el) el.textContent = `${n} contato${n>1?'s':''} selecionado${n>1?'s':''}`;
}

/* ═══════════════════════════════════════════
   CONTACT VIEW DRAWER
═══════════════════════════════════════════ */
function openContactView(id) {
  const c = (DB.contacts[activeListId]||[]).find(x => x.id === id);
  if (!c) return;
  currentContact = c;
  document.getElementById('cv-avatar').textContent  = avatarInitials(c.name);
  document.getElementById('cv-name').textContent    = c.name;
  document.getElementById('cv-email').textContent   = c.email;
  document.getElementById('cv-score').textContent   = c.score;
  document.getElementById('cv-funnel').textContent  = c.funnel;
  document.getElementById('cv-origin').textContent  = c.origin;
  document.getElementById('cv-status').textContent  = c.status;
  document.getElementById('cv-phone').textContent   = c.phone || '—';
  document.getElementById('cv-updated').textContent = c.updated;
  document.getElementById('cv-temp-badge').innerHTML = tempBadge(c.temp);
  document.getElementById('cv-tags-list').innerHTML  = c.tags.length
    ? c.tags.map(t=>`<span class="tag">${t}</span>`).join('')
    : '<span class="c-3 t-sm">Nenhum marcador</span>';

  const events = [
    { color:'var(--success)', text:'Abriu o e-mail "Campanha Junho"', date:'12/06/2026 às 09:43' },
    { color:'var(--auto)',    text:'Clicou em link no e-mail',         date:'12/06/2026 às 09:45' },
    { color:'var(--info)',    text:'Contato adicionado à lista',        date:c.updated+' às 16:53' },
  ];
  document.getElementById('cv-timeline').innerHTML = events.map((e,i) => `
    <div style="display:flex;gap:14px;padding-bottom:${i<events.length-1?'16px':'0'}">
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="width:10px;height:10px;border-radius:50%;background:${e.color};flex-shrink:0;margin-top:3px"></div>
        ${i<events.length-1?'<div style="width:1px;flex:1;background:var(--border-light);margin-top:4px"></div>':''}
      </div>
      <div>
        <div style="font-size:13px;font-weight:500">${e.text}</div>
        <div style="font-size:11px;color:var(--text-3);margin-top:2px">${e.date}</div>
      </div>
    </div>
  `).join('');

  openOverlay('drawer-contact-view');
}

/* ═══════════════════════════════════════════
   CONTACT EDIT DRAWER
═══════════════════════════════════════════ */
function openContactEdit(id) {
  const c = (DB.contacts[activeListId]||[]).find(x => x.id === id);
  if (!c) return;
  currentContact = c;
  editContactTags = [...c.tags];
  document.getElementById('edit-email').value  = c.email;
  document.getElementById('edit-name').value   = c.name;
  document.getElementById('edit-phone').value  = c.phone||'';
  document.getElementById('edit-status').value = c.status;
  document.getElementById('edit-funnel').value = c.funnel;
  document.getElementById('edit-score').value  = c.score;
  renderEditTagsList();

  const tagsSel = document.querySelector('#drawer-contact-edit select[onchange]');
  if (tagsSel) {
    tagsSel.innerHTML = '<option value="">+ Adicionar marcador…</option>' +
      DB.tags.map(t => `<option value="${t}">${t}</option>`).join('');
  }
  openOverlay('drawer-contact-edit');
}

function renderEditTagsList() {
  const el = document.getElementById('edit-tags-list');
  if (!el) return;
  el.innerHTML = editContactTags.map(t =>
    `<span class="tag" style="cursor:pointer" onclick="removeTagFromEdit('${t}')">${t} ×</span>`
  ).join('') || '<span class="c-3 t-sm">Nenhum marcador</span>';
}

function addTagToEdit(tag) {
  if (!tag || editContactTags.includes(tag)) return;
  editContactTags.push(tag);
  renderEditTagsList();
}

function removeTagFromEdit(tag) {
  editContactTags = editContactTags.filter(t => t !== tag);
  renderEditTagsList();
}

function saveContactEdit() {
  if (!currentContact) return;
  const contacts = DB.contacts[activeListId];
  const idx = contacts.findIndex(c => c.id === currentContact.id);
  if (idx === -1) return;
  contacts[idx].email  = document.getElementById('edit-email').value;
  contacts[idx].name   = document.getElementById('edit-name').value;
  contacts[idx].phone  = document.getElementById('edit-phone').value;
  contacts[idx].status = document.getElementById('edit-status').value;
  contacts[idx].funnel = document.getElementById('edit-funnel').value;
  contacts[idx].score  = parseInt(document.getElementById('edit-score').value)||0;
  contacts[idx].tags   = [...editContactTags];
  closeOverlay('drawer-contact-edit');
  renderContactsTable();
  showToast('Contato atualizado com sucesso.', {type:'success'});
}

/* ═══════════════════════════════════════════
   NEW CONTACT
═══════════════════════════════════════════ */
function openNewContact() {
  ['nc-email','nc-name','nc-phone'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  openOverlay('drawer-new-contact');
}

function saveNewContact() {
  const email = document.getElementById('nc-email').value.trim();
  if (!email) { showToast('Informe o e-mail do contato.', {type:'warning'}); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('E-mail inválido.', {type:'error'}); return; }
  if ((DB.contacts[activeListId]||[]).find(c => c.email === email)) { showToast('Este e-mail já existe na lista.', {type:'error'}); return; }
  const name = document.getElementById('nc-name').value.trim() || email.split('@')[0];
  const newC = {
    id:'c'+Date.now(), name, email,
    phone: document.getElementById('nc-phone').value.trim(),
    origin:'Manual', temp:'Frio', score:0,
    funnel: document.getElementById('nc-funnel')?.value || 'Contatos',
    updated: new Date().toLocaleDateString('pt-BR'), status:'Válido', tags:[]
  };
  if (!DB.contacts[activeListId]) DB.contacts[activeListId] = [];
  DB.contacts[activeListId].unshift(newC);
  const list = DB.lists.find(l => l.id === activeListId);
  if (list) {
    list.contacts++;
    document.getElementById('detail-list-meta').textContent = `${fmtNum(list.contacts)} contatos · Criada em ${list.created}`;
  }
  closeOverlay('drawer-new-contact');
  renderContactsTable();
  showToast('Contato adicionado!', {type:'success', actionLabel:'Ver perfil', onAction:()=>openContactView(newC.id)});
}

/* ═══════════════════════════════════════════
   DELETE CONTACT
═══════════════════════════════════════════ */
function confirmDeleteContact(id) {
  deleteTargetId = id;
  const c = (DB.contacts[activeListId]||[]).find(x => x.id === id);
  if (!c) return;
  document.getElementById('del-contact-avatar').textContent = avatarInitials(c.name);
  document.getElementById('del-contact-name').textContent  = c.name;
  document.getElementById('del-contact-email').textContent = c.email;
  openOverlay('modal-delete-contact');
}

function doDeleteContact() {
  const contacts = DB.contacts[activeListId];
  const idx = contacts.findIndex(c => c.id === deleteTargetId);
  if (idx > -1) contacts.splice(idx, 1);
  const list = DB.lists.find(l => l.id === activeListId);
  if (list) {
    list.contacts = Math.max(0, list.contacts - 1);
    document.getElementById('detail-list-meta').textContent = `${fmtNum(list.contacts)} contatos · Criada em ${list.created}`;
  }
  closeOverlay('modal-delete-contact');
  renderContactsTable();
  showToast('Contato excluído.', {type:'success'});
}

/* ═══════════════════════════════════════════
   BULK TAG
═══════════════════════════════════════════ */
function openBulkTagModal(action) {
  bulkTagAction = action;
  selectedBulkTag = null;
  document.getElementById('bulk-tag-title').textContent = action === 'add' ? 'Adicionar marcador' : 'Remover marcador';
  document.getElementById('bulk-tag-subtitle').textContent =
    `${contactsSelected.size} contato${contactsSelected.size>1?'s':''} selecionado${contactsSelected.size>1?'s':''}`;
  const grid = document.getElementById('bulk-tags-grid');
  grid.innerHTML = DB.tags.map(t => `
    <button class="btn btn-ghost btn-sm" style="border:1px solid var(--border)" onclick="selectBulkTag(this,'${t}')">${t}</button>
  `).join('');
  openOverlay('modal-bulk-tag');
}

function selectBulkTag(el, tag) {
  document.querySelectorAll('#bulk-tags-grid .btn').forEach(b => b.classList.remove('btn-auto'));
  el.classList.add('btn-auto');
  selectedBulkTag = tag;
}

function saveBulkTag() {
  if (!selectedBulkTag) { showToast('Selecione um marcador.', {type:'warning'}); return; }
  const contacts = DB.contacts[activeListId] || [];
  contactsSelected.forEach(id => {
    const c = contacts.find(x => x.id === id);
    if (!c) return;
    if (bulkTagAction === 'add' && !c.tags.includes(selectedBulkTag)) c.tags.push(selectedBulkTag);
    if (bulkTagAction === 'remove') c.tags = c.tags.filter(t => t !== selectedBulkTag);
  });
  closeOverlay('modal-bulk-tag');
  renderContactsTable();
  const verb = bulkTagAction === 'add' ? 'adicionado' : 'removido';
  showToast(`Marcador "${selectedBulkTag}" ${verb} em ${contactsSelected.size} contato(s).`, {type:'success'});
}

/* ═══════════════════════════════════════════
   LISTS GRID
═══════════════════════════════════════════ */
const LIST_ICONS = {
  l1: { svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', bg:'var(--auto-light)', color:'var(--auto)' },
  l2: { svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>', bg:'var(--brand-light)', color:'var(--brand)' },
  l3: { svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', bg:'#E8F5E9', color:'var(--success)' },
  l4: { svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>', bg:'#EFF6FF', color:'#3B82F6' },
  l5: { svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>', bg:'rgba(245,158,11,.12)', color:'#d97706' },
  l6: { svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>', bg:'var(--error-light)', color:'var(--error)' },
};
const _DEFAULT_LIST_ICON = LIST_ICONS.l1;

function renderListsGrid() {
  const grid = document.getElementById('lists-grid');
  if (!grid) return;
  grid.innerHTML = DB.lists.map(l => {
    const ic = LIST_ICONS[l.id] || _DEFAULT_LIST_ICON;
    return `
    <div class="list-card" onclick="goToListDetail('${l.id}')">
      <div class="list-card-header">
        <div class="list-card-icon" style="background:${ic.bg};color:${ic.color}">
          ${ic.svg}
        </div>
        <div class="flex-1 min-w-0">
          <div class="list-card-title truncate">${l.name}</div>
          <div class="list-card-meta">Criada em ${l.created}</div>
        </div>
        <div class="dropdown">
          <button class="btn btn-ghost btn-icon-sm" onclick="event.stopPropagation();toggleDropdown(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item" onclick="event.stopPropagation();goToListDetail('${l.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>Ver contatos
            </div>
            <div class="dropdown-item" onclick="event.stopPropagation();openImportWizard('${l.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Importar
            </div>
            <div class="dropdown-item" onclick="event.stopPropagation();showToast('Novo envio em breve.',{type:'info'})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>Novo envio
            </div>
            <div class="dropdown-separator"></div>
            <div class="dropdown-item danger" onclick="event.stopPropagation();showToast('Excluir lista em breve.',{type:'warning'})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>Excluir lista
            </div>
          </div>
        </div>
      </div>
      <div class="list-card-stats">
        <div class="list-stat"><div class="list-stat-value">${fmtNum(l.contacts)}</div><div class="list-stat-label">Contatos</div></div>
        <div class="list-stat"><div class="list-stat-value">${l.sends}</div><div class="list-stat-label">Envios</div></div>
        <div class="list-stat"><div class="list-stat-value">${fmtPct(l.opens_rate)}</div><div class="list-stat-label">Abertura</div></div>
      </div>
    </div>
  `;
  }).join('');
}

function openNewList() {
  showToast('Nova lista: em breve você poderá criar listas diretamente.', {type:'info'});
}

/* ═══════════════════════════════════════════
   IMPORT HISTORY
═══════════════════════════════════════════ */
function renderImportHistory() {
  const el = document.getElementById('import-history-content');
  if (!el) return;
  const hist = DB.importHistory;
  if (!hist.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-state-title">Nenhuma importação realizada</div></div>';
    return;
  }
  el.innerHTML = `
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr>
          <th>Arquivo</th><th>Importados</th><th>Ignorados</th><th>Erros</th><th>Data</th><th>Status</th><th class="col-actions">Ações</th>
        </tr></thead>
        <tbody>
          ${hist.map(h => `<tr>
            <td class="cell-primary">${h.file}</td>
            <td><span class="fw-6">${fmtNum(h.imported)}</span></td>
            <td>${h.skipped}</td>
            <td style="color:${h.errors>0?'var(--error)':'var(--text-3)'}">${h.errors}</td>
            <td class="c-3 t-sm">${h.date}</td>
            <td><span class="badge ${h.status==='success'?'badge-success':'badge-error'}">${h.status==='success'?'Concluído':'Erro'}</span></td>
            <td class="col-actions">
              <div class="row-actions">
                <button class="btn btn-ghost btn-icon-sm" data-tip="Ver relatório" onclick="showToast('Relatório de importação em breve.',{type:'info'})">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

/* ═══════════════════════════════════════════
   SEGMENTAÇÕES SECTION (shared between tab and global view)
═══════════════════════════════════════════ */
function renderSegsContent(containerId, listId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const segs = listId ? DB.segments.filter(s => s.listId === listId) : DB.segments;

  const tplIcons = {
    edit:           `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    activity:       `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    eye:            `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    'mouse-pointer':`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>`,
    'map-pin':      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    users:          `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    'file-text':    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    'user-clock':   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 17H20a2 2 0 0 1 2 2v1"/><circle cx="18" cy="13" r="3"/><path d="M18 11v2l1 1"/><path d="M10 17H5a2 2 0 0 0-2 2v1"/><circle cx="7" cy="8" r="4"/></svg>`,
  };

  const tplCards = DB.segmentTemplates.map(t => {
    const isEg = t.kind === 'engajados';
    if (!t.active) return `
      <div class="seg-tpl-card disabled">
        <div class="seg-soon">Em breve</div>
        <div class="seg-tpl-icon">${tplIcons[t.icon]||''}</div>
        <div class="seg-tpl-name">${t.name}</div>
        <div class="seg-tpl-desc">${t.desc}</div>
      </div>`;
    if (isEg) return `
      <div class="seg-tpl-card eg-card">
        <div class="seg-tpl-icon eg">${tplIcons[t.icon]||''}</div>
        <div class="seg-tpl-name">${t.name}</div>
        <div class="seg-tpl-desc">${t.desc}</div>
        <div class="seg-tpl-actions">
          <button class="btn btn-auto btn-sm" onclick="event.stopPropagation();egOpen('${listId||'l1'}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();scOpen('sg2')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Enviar e-mail
          </button>
        </div>
      </div>`;
    return `
      <div class="seg-tpl-card" onclick="sgOpenNew('${t.id}')">
        <div class="seg-tpl-icon">${tplIcons[t.icon]||''}</div>
        <div class="seg-tpl-name">${t.name}</div>
        <div class="seg-tpl-desc">${t.desc}</div>
        <div class="seg-tpl-actions">
          <button class="btn btn-auto btn-sm">Criar segmentação</button>
        </div>
      </div>`;
  }).join('');

  const segsTable = segs.length ? `
    <div class="section-title" style="margin-bottom:12px">Segmentações criadas</div>
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr>
          <th>Nome</th><th>Tipo</th><th>Contatos</th><th>% da lista</th><th>Atualizado</th><th class="col-actions">Ações</th>
        </tr></thead>
        <tbody>
          ${segs.map(s => `<tr>
            <td class="cell-primary">${s.name}</td>
            <td><span class="badge badge-auto">${s.type}</span></td>
            <td><span class="fw-6">${fmtNum(s.contacts)}</span></td>
            <td><span class="fw-6">${s.pct}%</span></td>
            <td class="c-3 t-sm">${s.updated}</td>
            <td class="col-actions">
              <div class="row-actions">
                <button class="btn btn-ghost btn-icon-sm" data-tip="Ver contatos" onclick="sgOpenContacts('${s.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button class="btn btn-ghost btn-icon-sm" data-tip="Enviar e-mail" onclick="scOpen('${s.id}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </button>
                <button class="btn btn-ghost btn-icon-sm" data-tip="Editar" onclick="${s.kind==='engajados'?`egOpen('${listId||s.listId||'l1'}')`:`sgOpenEdit('${s.id}')`}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="btn btn-ghost btn-icon-sm" data-tip="Excluir" style="color:var(--error)" onclick="sgConfirmDelete('${s.id}','${s.name}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                </button>
              </div>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>` : `<div class="empty-state" style="padding:32px 0">
      <div class="empty-state-title">Nenhuma segmentação criada</div>
      <div class="empty-state-text">Use um dos templates acima para começar.</div>
    </div>`;

  el.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div class="section-title">Templates de segmentação</div>
        <button class="btn btn-auto btn-sm" onclick="sgOpenNew('tpl1')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nova segmentação
        </button>
      </div>
      <div class="seg-templates-grid">${tplCards}</div>
    </div>
    ${segsTable}`;
}

/* ═══════════════════════════════════════════
   SEGMENT BUILDER
═══════════════════════════════════════════ */
let sgRuleCount = 1;

const TPL_SEED_RULES = {
  tpl3: [{ f:'abriu_envio',     op:'é igual a',          v:'Sim' }],
  tpl4: [{ f:'clicou_url',      op:'contém',              v:'' }],
  tpl5: [{ f:'cidade',          op:'é igual a',           v:'' }, { f:'estado', op:'é igual a', v:'' }],
  tpl6: [{ f:'sexo',            op:'é igual a',           v:'' }],
  tpl7: [{ f:'origem',          op:'é igual a',           v:'' }, { f:'data_cadastro', op:'nos últimos (dias)', v:'' }],
  tpl8: [{ f:'data_cadastro',   op:'nos últimos (dias)',   v:'30' }],
};

function sgOpenNew(tplId) {
  const tpl = DB.segmentTemplates.find(t => t.id === tplId);
  document.getElementById('sg-builder-title').textContent = tpl && tpl.kind === 'engajados' ? 'Engajados' : 'Nova Segmentação';
  document.getElementById('sg-name').value = tpl && tpl.kind !== 'blank' ? tpl.name : '';
  const seeds = TPL_SEED_RULES[tplId] || [];
  sgRuleCount = Math.max(1, seeds.length);
  const wrap = document.getElementById('sg-rules-wrap');
  if (seeds.length) {
    wrap.innerHTML = seeds.map((s, i) => buildRuleRowHTML(i, s.f, s.op, s.v)).join('');
  } else {
    wrap.innerHTML = buildRuleRowHTML(0);
  }
  sgSetOperator('and');
  document.getElementById('sg-estimate').textContent = '~3.210 contatos';
  openOverlay('drawer-segment-builder');
}

function sgOpenEdit(id) {
  const s = DB.segments.find(x => x.id === id);
  if (!s) return;
  currentSegId = id;
  document.getElementById('sg-builder-title').textContent = 'Editar Segmentação';
  document.getElementById('sg-name').value = s.name;
  document.getElementById('sg-estimate').textContent = `~${fmtNum(s.contacts)} contatos`;
  openOverlay('drawer-segment-builder');
}

function buildRuleRowHTML(idx, field, operator, value) {
  const f = field || '';
  const op = operator || '';
  const v = value || '';
  const fieldOpts = [
    ['', 'Selecionar campo…'],
    ['__g1__', 'Dados do contato'],
    ['nome','Nome'], ['email','E-mail'], ['sexo','Sexo'],
    ['cidade','Cidade'], ['estado','Estado'],
    ['__g2__', 'Registro'],
    ['data_cadastro','Data de cadastro'], ['origem','Origem'], ['marcadores','Marcadores'],
    ['__g3__', 'Comportamento'],
    ['abriu_envio','Abriu algum envio'], ['clicou_url','Clicou em URL'],
    ['__g4__', 'Funil'],
    ['estagio','Estágio'], ['score','Score'],
  ];
  let fieldHtml = '';
  let inGroup = false;
  fieldOpts.forEach(([val, label]) => {
    if (val.startsWith('__g')) {
      if (inGroup) fieldHtml += '</optgroup>';
      fieldHtml += `<optgroup label="${label}">`;
      inGroup = true;
    } else {
      fieldHtml += `<option value="${val}"${val===f?' selected':''}>${label}</option>`;
    }
  });
  if (inGroup) fieldHtml += '</optgroup>';
  const opOpts = ['contém','não contém','é igual a','começa com','nos últimos (dias)'];
  const opHtml = opOpts.map(o => `<option${o===op?' selected':''}>${o}</option>`).join('');
  return `<div class="rule-row" data-rule="${idx}">
    <select class="form-select" style="font-size:12px;height:36px">${fieldHtml}</select>
    <select class="form-select" style="font-size:12px;height:36px">${opHtml}</select>
    <input type="text" class="form-input" placeholder="${f==='clicou_url'?'https://…':f==='sexo'?'Masculino ou Feminino':f==='data_cadastro'?'30':'Valor…'}" value="${v}" style="font-size:12px">
    <button class="btn btn-ghost btn-icon-sm" onclick="sgRemoveRule(this)" style="color:var(--error)">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>`;
}

function sgAddRule() {
  const wrap = document.getElementById('sg-rules-wrap');
  const connector = `<div class="rule-connector-row"><span class="rule-connector-badge ${sgOperator}" onclick="sgToggleOperator(this)">${sgOperator === 'and' ? 'E' : 'OU'}</span></div>`;
  wrap.insertAdjacentHTML('beforeend', connector + buildRuleRowHTML(sgRuleCount++));
}

function sgRemoveRule(btn) {
  const row = btn.closest('.rule-row');
  const prev = row.previousElementSibling;
  if (prev && prev.classList.contains('rule-connector-row')) prev.remove();
  row.remove();
}

function sgSetOperator(op) {
  sgOperator = op;
  document.getElementById('sg-op-and').className = `btn btn-sm ${op==='and'?'btn-auto':'btn-ghost'}`;
  document.getElementById('sg-op-or').className  = `btn btn-sm ${op==='or'?'btn-auto':'btn-ghost'}`;
  document.querySelectorAll('.rule-connector-badge').forEach(b => {
    b.className = `rule-connector-badge ${op}`;
    b.textContent = op === 'and' ? 'E' : 'OU';
  });
}

function sgToggleOperator(el) {
  sgOperator = sgOperator === 'and' ? 'or' : 'and';
  document.querySelectorAll('.rule-connector-badge').forEach(b => {
    b.className = `rule-connector-badge ${sgOperator}`;
    b.textContent = sgOperator === 'and' ? 'E' : 'OU';
  });
}

function sgPreviewContacts() {
  sgOpenContacts(null);
}

function sgOpenContacts(segId) {
  currentSegId = segId;
  const seg = segId ? DB.segments.find(s => s.id === segId) : null;
  document.getElementById('sg-contacts-title').textContent = seg ? seg.name : 'Pré-visualização';
  document.getElementById('sg-contacts-subtitle').textContent = seg
    ? `${fmtNum(seg.contacts)} contatos correspondem a este filtro`
    : 'Amostra de contatos que correspondem às regras';

  const allContacts = Object.values(DB.contacts).flat();
  const sample = allContacts.slice(0, 8);
  const tbody = document.getElementById('sg-contacts-tbody');
  tbody.innerHTML = sample.map(c => `<tr>
    <td>
      <div class="flex items-center gap-2">
        <div class="avatar avatar-sm">${avatarInitials(c.name)}</div>
        <div><div class="cell-primary">${c.name}</div><div class="cell-secondary">${c.email}</div></div>
      </div>
    </td>
    <td>${tempBadge(c.temp)}</td>
    <td><span class="fw-6">${c.score}</span></td>
    <td><span class="badge badge-neutral">${c.funnel}</span></td>
    <td><span class="badge ${c.status==='Válido'?'badge-success':'badge-error'}">${c.status}</span></td>
  </tr>`).join('');

  openOverlay('drawer-segment-contacts');
}

function sgConfirmDelete(id, name) {
  sgDeleteTargetId = id;
  document.getElementById('del-seg-name').textContent = name;
  openOverlay('modal-delete-segment');
}

function sgDoDelete() {
  const idx = DB.segments.findIndex(s => s.id === sgDeleteTargetId);
  if (idx > -1) DB.segments.splice(idx, 1);
  closeOverlay('modal-delete-segment');
  const listId = activeListId;
  if (document.getElementById('view-list-detail').classList.contains('active')) {
    renderSegsContent('detail-segs-content', listId);
  } else {
    renderSegsContent('global-segs-content', null);
  }
  showToast('Segmentação excluída.', {type:'success'});
}

function sgSave() {
  const name = document.getElementById('sg-name').value.trim();
  if (!name) { showToast('Informe o nome da segmentação.', {type:'warning'}); return; }
  const newSeg = {
    id:'sg'+Date.now(), name, kind:'custom', type:'Personalizada',
    contacts: Math.floor(Math.random()*5000+500), pct: Math.round(Math.random()*10+1),
    updated: new Date().toLocaleDateString('pt-BR'),
    listId: activeListId || 'l1'
  };
  DB.segments.push(newSeg);
  closeOverlay('drawer-segment-builder');
  if (document.getElementById('view-list-detail').classList.contains('active')) {
    renderSegsContent('detail-segs-content', activeListId);
  } else {
    renderSegsContent('global-segs-content', null);
  }
  showToast(`Segmentação "${name}" salva!`, {type:'success'});
}

/* ═══════════════════════════════════════════
   ENGAJADOS
═══════════════════════════════════════════ */
function egOpen(listId) {
  egTogglePeriodo('desde');
  egToggleAplicaA('todos');
  egToggleSegmentar('marcadores');
  const tagsGrid = document.getElementById('eg-tags-grid');
  if (tagsGrid) {
    tagsGrid.innerHTML = DB.tags.map(t =>
      `<button class="btn btn-ghost btn-sm" style="border:1px solid var(--border)" onclick="this.classList.toggle('btn-auto')">${t}</button>`
    ).join('');
  }
  openOverlay('drawer-engajados-config');
}

function egTogglePeriodo(tipo) {
  document.getElementById('eg-desde-config').style.display    = tipo === 'desde'    ? '' : 'none';
  document.getElementById('eg-intervalo-config').style.display = tipo === 'intervalo' ? '' : 'none';
  document.querySelectorAll('[name="eg-periodo"]').forEach(r => r.checked = r.value === tipo);
}

function egToggleAplicaA(tipo) {
  document.getElementById('eg-segmentar-config').style.display = tipo === 'segmentar' ? '' : 'none';
  document.querySelectorAll('[name="eg-aplica"]').forEach(r => r.checked = r.value === tipo);
}

function egToggleSegmentar(tipo) {
  document.getElementById('eg-marcadores-config').style.display = tipo === 'marcadores' ? '' : 'none';
  document.getElementById('eg-estagio-config').style.display    = tipo === 'estagio'    ? '' : 'none';
  document.getElementById('eg-tipo-marcadores').className = `btn btn-sm ${tipo==='marcadores'?'btn-auto':'btn-ghost'}`;
  document.getElementById('eg-tipo-estagio').className    = `btn btn-sm ${tipo==='estagio'?'btn-auto':'btn-ghost'}`;
}

function egPreview() {
  const allC = Object.values(DB.contacts).flat().filter(c => c.temp === 'Quente' || c.temp === 'Morno');
  const tbody = document.getElementById('eg-preview-tbody');
  const dias  = document.getElementById('eg-dias')?.value || 30;
  document.getElementById('eg-preview-subtitle').textContent =
    `Contatos engajados nos últimos ${dias} dias`;
  tbody.innerHTML = allC.slice(0,10).map(c => `<tr>
    <td><div class="flex items-center gap-2">
      <div class="avatar avatar-sm">${avatarInitials(c.name)}</div>
      <div><div class="cell-primary">${c.name}</div><div class="cell-secondary">${c.email}</div></div>
    </div></td>
    <td>${tempBadge(c.temp)}</td>
    <td><span class="fw-6">${c.score}</span></td>
    <td class="c-3 t-sm">${c.updated}</td>
  </tr>`).join('');
  openOverlay('drawer-engajados-preview');
}

function egSave() {
  const dias = document.getElementById('eg-dias')?.value || 30;
  closeOverlay('drawer-engajados-config');
  const seg = DB.segments.find(s => s.kind === 'engajados');
  if (seg) seg.updated = new Date().toLocaleDateString('pt-BR');
  showToast(`Engajados configurado: últimos ${dias} dias.`, {type:'success'});
}

/* ═══════════════════════════════════════════
   CAMPAIGN WIZARD
═══════════════════════════════════════════ */
function scOpen(segId) {
  scSegId = segId;
  scStep  = 1;
  const seg = DB.segments.find(s => s.id === segId);
  document.getElementById('sc-name').value    = '';
  document.getElementById('sc-subject').value = '';
  document.getElementById('sc-recipients-info').textContent =
    seg ? `${seg.name} · ${fmtNum(seg.contacts)} contatos` : '—';
  scUpdateUI();
  openOverlay('drawer-campaign-wizard');
}

function scUpdateUI() {
  [1,2,3].forEach(n => {
    const step = document.getElementById(`sc-step${n}`);
    const item = document.getElementById(`sc-step${n}-item`);
    if (step) step.style.display = n === scStep ? '' : 'none';
    if (item) {
      item.className = 'step-item' + (n < scStep ? ' done' : n === scStep ? ' active' : '');
    }
  });
  document.getElementById('sc-subtitle').textContent =
    ['Configure a campanha','Escolha o conteúdo','Defina o envio'][scStep-1];
  document.getElementById('sc-back-btn').style.display = scStep > 1 ? '' : 'none';
  document.getElementById('sc-next-btn').textContent =
    scStep < 3 ? 'Próximo' : 'Criar envio';
  if (scStep === 3) {
    const name    = document.getElementById('sc-name').value;
    const subject = document.getElementById('sc-subject').value;
    const seg     = DB.segments.find(s => s.id === scSegId);
    document.getElementById('sc-review').innerHTML =
      `<strong>Campanha:</strong> ${name||'—'}<br>
       <strong>Assunto:</strong> ${subject||'—'}<br>
       <strong>Destinatários:</strong> ${seg ? seg.name+' · '+fmtNum(seg.contacts)+' contatos' : '—'}`;
  }
  document.querySelectorAll('[name="sc-when"]').forEach(r => {
    r.addEventListener('change', () => {
      const sched = document.getElementById('sc-sched-fields');
      if (sched) sched.style.display = r.value === 'sched' && r.checked ? '' : 'none';
    });
  });
}

function scNext() {
  if (scStep === 1) {
    if (!document.getElementById('sc-name').value.trim()) { showToast('Informe o nome da campanha.', {type:'warning'}); return; }
    if (!document.getElementById('sc-subject').value.trim()) { showToast('Informe o assunto do e-mail.', {type:'warning'}); return; }
  }
  if (scStep < 3) { scStep++; scUpdateUI(); return; }
  // Finish
  const name = document.getElementById('sc-name').value;
  closeOverlay('drawer-campaign-wizard');
  showToast(`Campanha "${name}" criada e enviada!`, {type:'success', actionLabel:'Ver envio', onAction:()=>{}});
}

function scBack() {
  if (scStep > 1) { scStep--; scUpdateUI(); }
}

/* ═══════════════════════════════════════════
   IMPORT WIZARD
═══════════════════════════════════════════ */
function openImportWizard(listId) {
  iwStep         = 1;
  iwOrigin       = 'file';
  iwTargetListId = listId;
  iwUpdateUI();
  // Populate list select
  const sel = document.getElementById('iw-target-list');
  if (sel) {
    sel.innerHTML = '<option value="">Selecione uma lista…</option>' +
      DB.lists.map(l => `<option value="${l.id}" ${l.id===listId?'selected':''}>${l.name}</option>`).join('');
  }
  // Populate tags select
  const tagsSel = document.getElementById('iw-tags-select');
  if (tagsSel) {
    tagsSel.innerHTML = '<option value="">Selecione marcadores para adicionar…</option>' +
      DB.tags.map(t => `<option value="${t}">${t}</option>`).join('');
  }
  openOverlay('drawer-import-wizard');
}

function iwUpdateUI() {
  [1,2,3].forEach(n => {
    const step = document.getElementById(`iw-step${n}`);
    const item = document.getElementById(`iw-step${n}-item`);
    if (step) step.style.display = n === iwStep ? '' : 'none';
    if (item) item.className = 'step-item' + (n < iwStep ? ' done' : n === iwStep ? ' active' : '');
  });
  const subtitles = ['Escolha a origem dos dados','Mapeie as colunas do arquivo','Configure a importação'];
  const el = document.getElementById('iw-subtitle');
  if (el) el.textContent = subtitles[iwStep-1];
  const back = document.getElementById('iw-back-btn');
  const next = document.getElementById('iw-next-btn');
  if (back) back.style.display = iwStep > 1 ? '' : 'none';
  if (next) next.textContent = iwStep < 3 ? 'Próximo' : 'Importar contatos';
}

function iwSetOrigin(type) {
  iwOrigin = type;
  ['file','url','paste'].forEach(t => {
    const el = document.getElementById(`iw-origin-${t}`);
    if (el) el.style.display = t === type ? '' : 'none';
  });
}

function iwNext() {
  if (iwStep === 1) {
    if (iwOrigin === 'file' && !document.getElementById('iw-file-name').textContent.match(/\./)) {
      // no file selected — allow anyway for demo
    }
  }
  if (iwStep < 3) { iwStep++; iwUpdateUI(); return; }
  // Finish import
  const listSel = document.getElementById('iw-target-list');
  const listId  = listSel?.value || iwTargetListId;
  const list    = DB.lists.find(l => l.id === listId);
  closeOverlay('drawer-import-wizard');
  if (list) {
    list.contacts += 1840;
    if (activeListId === listId) {
      document.getElementById('detail-list-meta').textContent =
        `${fmtNum(list.contacts)} contatos · Criada em ${list.created}`;
    }
  }
  const newH = {
    id:'ih'+Date.now(), file:'importacao-'+new Date().toISOString().slice(0,10)+'.csv',
    list: list?.name||'—', imported:1840, skipped:23, errors:4,
    date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),
    status:'success'
  };
  DB.importHistory.unshift(newH);
  showToast('Importação concluída! 1.840 contatos adicionados.', {
    type:'success', actionLabel:'Ver histórico',
    onAction:() => { if(activeListId===listId) switchDetailTab('importacoes'); }
  });
}

function iwBack() { if (iwStep > 1) { iwStep--; iwUpdateUI(); } }
function iwClose() { closeOverlay('drawer-import-wizard'); }

function iwFileSelected(input) {
  const file = input.files[0];
  if (!file) return;
  const el = document.getElementById('iw-file-selected');
  const nm = document.getElementById('iw-file-name');
  if (el) { el.style.display = 'flex'; }
  if (nm) nm.textContent = file.name;
}

function iwClearFile() {
  document.getElementById('iw-file-input').value = '';
  const el = document.getElementById('iw-file-selected');
  if (el) el.style.display = 'none';
}

function iwOpenFormats()  { openOverlay('drawer-import-formats'); }
function openSaveFormatModal() {
  document.getElementById('fmt-name').value = '';
  openOverlay('modal-save-format');
}
function iwSaveFormat() {
  const name = document.getElementById('fmt-name').value.trim();
  if (!name) { showToast('Informe o nome do formato.', {type:'warning'}); return; }
  DB.savedFormats.push({ id:'fmt'+Date.now(), name, cols:['email','nome','telefone','cidade'] });
  closeOverlay('modal-save-format');
  showToast(`Formato "${name}" salvo!`, {type:'success'});
}

/* ═══════════════════════════════════════════
   MATRIZ RFM
═══════════════════════════════════════════ */
const RFM_COLORS = {
  'Campeões':            { color:'#fff', bg:'#0EA679' },
  'Clientes Fiéis':      { color:'#fff', bg:'#2563EB' },
  'Clientes Recentes':   { color:'#fff', bg:'#6366F1' },
  'Novos Clientes':      { color:'#fff', bg:'#06B6D4' },
  'Promissores':         { color:'#fff', bg:'#8B5CF6' },
  'Precisam de Atenção': { color:'#fff', bg:'#F59E0B' },
  'Prestes a Adormecer': { color:'#fff', bg:'#F97316' },
  'Em Risco':            { color:'#fff', bg:'#EA5456' },
  'Não Podem Perder':    { color:'#fff', bg:'#DC2626' },
  'Hibernando':          { color:'#fff', bg:'#64748B' },
  'Perdidos':            { color:'#fff', bg:'#334155' },
};

function renderRFMGrid() {
  const grid   = document.getElementById('rfm-grid-container');
  const legend = document.getElementById('rfm-legend');
  if (!grid) return;

  let html = '';
  // Top-left blank
  html += '<div class="rfm-axis-label" style="grid-column:1;grid-row:1"></div>';
  // Column headers (F1–F5)
  ['Freq. 1','Freq. 2','Freq. 3','Freq. 4','Freq. 5'].forEach((l,i) => {
    html += `<div class="rfm-axis-label" style="grid-column:${i+2};grid-row:1">${l}</div>`;
  });
  // Rows (R5 top → R1 bottom)
  DB.rfmGrid.forEach((row, ri) => {
    const rLabel = 5 - ri;
    html += `<div class="rfm-axis-label" style="grid-column:1;grid-row:${ri+2}">Rec. ${rLabel}</div>`;
    row.forEach((segName, ci) => {
      const c = RFM_COLORS[segName] || { color:'#fff', bg:'#94a3b8' };
      const count = DB.rfmCounts[segName] || 0;
      html += `<div class="rfm-cell" style="background:${c.bg};color:${c.color};grid-column:${ci+2};grid-row:${ri+2}" onclick="rfmOpenSegment('${segName}')">
        <div class="rfm-cell-name">${segName}</div>
        <div class="rfm-cell-count">${fmtNum(Math.floor(count/5))}</div>
      </div>`;
    });
  });
  grid.innerHTML = html;

  if (legend) {
    legend.innerHTML = DB.rfmSegments.map(s => `
      <div class="rfm-legend-item" onclick="rfmOpenSegment('${s.name}')">
        <div class="rfm-legend-dot" style="background:${s.color}"></div>
        <div>
          <div class="rfm-legend-name">${s.name}</div>
          <div class="rfm-legend-count">${fmtNum(s.count)} contatos — ${s.desc}</div>
        </div>
      </div>`).join('');
  }
}

function rfmOpenSegment(name) {
  const seg = DB.rfmSegments.find(s => s.name === name);
  if (!seg) return;
  showToast(`${seg.name}: ${fmtNum(seg.count)} contatos.`, {
    type:'info', actionLabel:'Ver contatos',
    onAction:() => showToast('Visualizar contatos do segmento em breve.', {type:'info'})
  });
}

/* ═══════════════════════════════════════════
   SCORE
═══════════════════════════════════════════ */
const SCORE_ICONS = {
  eye:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  click:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 9l5 12 1.774-5.226L21 14 9 9z"/></svg>`,
  check:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  alert:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  'x-circle':`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  'user-x':`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>`,
};

function renderScoreRules() {
  const el = document.getElementById('score-rules-list');
  if (!el) return;
  el.innerHTML = DB.scoreRules.map(r => `
    <div class="score-rule-card">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="score-event-icon" style="background:${r.points>0?'var(--fluxos-light)':'var(--error-light)'};color:${r.points>0?'var(--fluxos)':'var(--error)'}">
          ${SCORE_ICONS[r.icon]||''}
        </div>
        <div>
          <div style="font-size:14px;font-weight:600">${r.event}</div>
          <div style="font-size:11px;color:var(--text-3);margin-top:1px">${r.points>0?'Pontuação positiva':'Pontuação negativa'}</div>
        </div>
      </div>
      <label class="toggle">
        <input type="checkbox" ${r.enabled?'checked':''} onchange="toggleScoreRule('${r.id}',this.checked)">
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
      </label>
      <div class="score-pts-input">
        <input type="number" class="form-input" value="${r.points}" id="score-pts-${r.id}" style="width:64px;text-align:center">
        <span style="font-size:12px;color:var(--text-3)">pts</span>
      </div>
    </div>
  `).join('');
}

function toggleScoreRule(id, enabled) {
  const r = DB.scoreRules.find(x => x.id === id);
  if (r) r.enabled = enabled;
}

function toggleScoreDecay(enabled) {
  document.getElementById('score-decay-config').style.opacity = enabled ? '1' : '.4';
  document.getElementById('score-decay-config').style.pointerEvents = enabled ? '' : 'none';
}

function saveScoreConfig() {
  DB.scoreRules.forEach(r => {
    const inp = document.getElementById(`score-pts-${r.id}`);
    if (inp) r.points = parseInt(inp.value)||0;
  });
  DB.scoreDecay.enabled = document.getElementById('score-decay-toggle').checked;
  DB.scoreDecay.points  = parseInt(document.getElementById('decay-points').value)||1;
  DB.scoreDecay.days    = parseInt(document.getElementById('decay-days').value)||30;
  showToast('Configurações de score salvas!', {type:'success'});
}

/* ═══════════════════════════════════════════
   CONVERSÕES
═══════════════════════════════════════════ */
const CONV_ICONS = {
  cv1:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  cv2:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  cv3:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  cv4:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  cv5:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
};

function renderConversoes() {
  const el = document.getElementById('conversoes-list');
  if (!el) return;
  el.innerHTML = DB.conversoes.map(c => `
    <div class="conv-card">
      <div class="conv-icon">${CONV_ICONS[c.id]||''}</div>
      <div class="conv-info">
        <div class="conv-name">${c.name}</div>
        <div class="conv-desc">${c.desc}</div>
      </div>
      <div class="conv-actions">
        ${c.enabled ? `<span class="badge badge-success">Ativo</span>` : `<span class="badge badge-neutral">Inativo</span>`}
        <button class="btn btn-secondary btn-sm" onclick="openConversaoConfig('${c.id}')">Configurar</button>
        <label class="toggle">
          <input type="checkbox" ${c.enabled?'checked':''} onchange="toggleConversao('${c.id}',this.checked)">
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
        </label>
      </div>
    </div>
  `).join('');
}

function toggleConversao(id, enabled) {
  const c = DB.conversoes.find(x => x.id === id);
  if (c) {
    c.enabled = enabled;
    renderConversoes();
    showToast(`${c.name} ${enabled ? 'ativado' : 'desativado'}.`, {type: enabled?'success':'info'});
  }
}

function openConversaoConfig(id) {
  const c = DB.conversoes.find(x => x.id === id);
  if (!c) return;
  if (id === 'cv1') {
    showToast('Código do pixel: <script>dz.track("conversao")<\/script>', {type:'info', duration:6000});
  } else {
    showToast(`Configurações de ${c.name} em breve.`, {type:'info'});
  }
}

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSidebarNav();
  renderListsGrid();
  goToLists();

  document.getElementById('contact-search')?.addEventListener('input', e => {
    renderContactsTable(e.target.value);
  });
});
