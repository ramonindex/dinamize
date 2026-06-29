/* ══════════════════════════════════════════════
   UI — Drawers, Modals, Dropdowns, Toast, ESC
══════════════════════════════════════════════ */

/* ── Toast ── */
function showToast(message, opts = {}) {
  const { type = 'success', title, actionLabel, onAction, duration = 4500 } = opts;
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = {
    success: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error:   `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:    `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]||icons.success}</span>
    <div class="toast-body">
      ${title ? `<div class="toast-title">${title}</div>` : ''}
      <div>${message}</div>
      ${actionLabel ? `<span class="toast-action" id="ta-${Date.now()}">${actionLabel}</span>` : ''}
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">×</button>
  `;
  if (onAction) {
    toast.querySelector('.toast-action')?.addEventListener('click', onAction);
  }
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ── Overlay/Drawer ── */
function openOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  closeAllDropdowns();
  el.classList.add('open');
  escStack.push(id);
  document.body.style.overflow = 'hidden';
}

function closeOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  const idx = escStack.indexOf(id);
  if (idx > -1) escStack.splice(idx, 1);
  if (escStack.length === 0) document.body.style.overflow = '';
}

function toggleOverlay(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.contains('open') ? closeOverlay(id) : openOverlay(id);
}

/* ── ESC stack ── */
const escStack = [];
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && escStack.length) {
    closeOverlay(escStack[escStack.length - 1]);
  }
});

/* ── Dropdown ── */
function toggleDropdown(el) {
  const dd = el.closest('.dropdown');
  if (!dd) return;
  const menu = dd.querySelector('.dropdown-menu');
  if (!menu) return;
  const wasOpen = dd.classList.contains('open');
  closeAllDropdowns();
  if (wasOpen) return;
  dd.classList.add('open');
  // Position with fixed coords to escape any overflow:hidden ancestor
  const btn = el.closest('button') || el;
  const r = btn.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.top = (r.bottom + 4) + 'px';
  menu.style.right = 'auto';
  menu.style.left = 'auto';
  // Temporarily show to measure width, then reposition
  menu.style.visibility = 'hidden';
  menu.style.display = 'block';
  const mw = menu.offsetWidth;
  menu.style.display = '';
  menu.style.visibility = '';
  const left = Math.max(8, r.right - mw);
  menu.style.left = left + 'px';
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.open').forEach(d => {
    d.classList.remove('open');
    const m = d.querySelector('.dropdown-menu');
    if (m) { m.style.position = ''; m.style.top = ''; m.style.left = ''; m.style.right = ''; }
  });
}

document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) closeAllDropdowns();
});

/* ── Sidebar nav ── */
function initSidebarNav() {
  document.querySelectorAll('.nav-item[data-sub]').forEach(item => {
    item.addEventListener('click', e => {
      const subId = item.dataset.sub;
      const sub = document.getElementById(subId);
      const isOpen = item.classList.contains('open');
      // close siblings
      document.querySelectorAll('.nav-item.open').forEach(i => {
        i.classList.remove('open');
        const s = document.getElementById(i.dataset.sub);
        if (s) s.style.display = 'none';
      });
      if (!isOpen && sub) {
        item.classList.add('open');
        sub.style.display = 'flex';
      }
    });
  });
  // init open state
  document.querySelectorAll('.nav-item.open[data-sub]').forEach(item => {
    const sub = document.getElementById(item.dataset.sub);
    if (sub) sub.style.display = 'flex';
  });
}

/* ── Tab system ── */
function switchTab(groupId, tabId) {
  const group = document.getElementById(groupId) || document.querySelector(`[data-tab-group="${groupId}"]`);
  const scope = group || document;
  scope.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  scope.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === tabId || p.dataset.pane === tabId));
}

function initTabs(scope = document) {
  scope.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const paneId = tab.dataset.tab;
      const container = tab.closest('[data-tab-group]') || tab.closest('.tabs')?.parentElement;
      if (!container) return;
      container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = container.querySelector(`[data-pane="${paneId}"], #${paneId}`);
      if (pane) pane.classList.add('active');
    });
  });
}

/* ── Select all checkbox ── */
function initSelectAll(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const masterCb = table.querySelector('.select-all-cb');
  if (!masterCb) return;
  masterCb.addEventListener('change', () => {
    table.querySelectorAll('.row-cb').forEach(cb => {
      cb.checked = masterCb.checked;
      cb.closest('tr')?.classList.toggle('selected', masterCb.checked);
    });
    updateBulkBar(tableId);
  });
  table.querySelectorAll('.row-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('tr')?.classList.toggle('selected', cb.checked);
      const all = table.querySelectorAll('.row-cb');
      const checked = table.querySelectorAll('.row-cb:checked');
      masterCb.indeterminate = checked.length > 0 && checked.length < all.length;
      masterCb.checked = checked.length === all.length;
      updateBulkBar(tableId);
    });
  });
}

function updateBulkBar(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const checked = table.querySelectorAll('.row-cb:checked').length;
  const bar = document.getElementById(tableId + '-bulk');
  if (!bar) return;
  if (checked > 0) {
    bar.style.display = 'flex';
    const countEl = bar.querySelector('.bulk-bar-count');
    if (countEl) countEl.textContent = `${checked} contato${checked > 1 ? 's' : ''} selecionado${checked > 1 ? 's' : ''}`;
  } else {
    bar.style.display = 'none';
  }
}

/* ── Format helpers ── */
function fmtNum(n) {
  if (n >= 1e6) return (n/1e6).toFixed(1).replace('.',',')+' M';
  if (n >= 1e3) return (n/1e3).toFixed(1).replace('.',',')+' K';
  return n.toLocaleString('pt-BR');
}
function fmtPct(n) { return (n*100).toFixed(1).replace('.',',')+'%'; }
function tempBadge(t) {
  const m = { Quente:'temp-hot', Morno:'temp-warm', Frio:'temp-cold' };
  return `<span class="badge ${m[t]||'badge-neutral'}">${t}</span>`;
}
function statusBadge(s) {
  const m = { sent:'badge-sent Enviado', sched:'badge-sched Agendado', draft:'badge-draft Rascunho', active:'badge-active Ativo', paused:'badge-paused Pausado' };
  const [cls, label] = (m[s]||'badge-neutral '+s).split(' ');
  return `<span class="badge ${cls}">${label||s}</span>`;
}
function avatarInitials(name) {
  return name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
}

/* ── View switcher (SPA-like) ── */
function showView(id, scope) {
  const parent = scope ? document.getElementById(scope) : document;
  parent.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = parent.querySelector(`#${id}`);
  if (target) target.classList.add('active');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initSidebarNav();
  initTabs();
});
