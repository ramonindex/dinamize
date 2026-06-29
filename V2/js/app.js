/* ══════════════════════════════════════════════
   APP — Dashboard page logic
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderKpis();
  renderRecentSends();
  renderListHealth();
  renderMiniChart();
  initTabs();
});

function renderKpis() {
  const k = DB.dashboardKpis;
  setEl('kpi-sends',      fmtNum(k.sends.value));
  setEl('kpi-delivered',  fmtNum(k.delivered.value));
  setEl('kpi-open-rate',  fmtPct(k.opens.rate));
  setEl('kpi-click-rate', fmtPct(k.clicks.rate));
  setEl('kpi-unsubs',     fmtNum(k.unsubs.value));

  const dA = k.opens.delta > 0;
  setEl('kpi-open-trend', `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="${dA?'18 15 12 9 6 15':'18 9 12 15 6 9'}"/>
    </svg>
    ${dA?'+':''}${(k.opens.delta*100).toFixed(1)}% vs mês ant.
  `);
  setEl('kpi-click-trend', `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="${k.clicks.delta>0?'18 15 12 9 6 15':'18 9 12 15 6 9'}"/>
    </svg>
    ${k.clicks.delta>0?'+':''}${(k.clicks.delta*100).toFixed(1)}% vs mês ant.
  `);
  const openTrendEl = document.getElementById('kpi-open-trend');
  if (openTrendEl) openTrendEl.className = `kpi-trend ${k.opens.delta>0?'trend-up':'trend-down'}`;
  const clickTrendEl = document.getElementById('kpi-click-trend');
  if (clickTrendEl) clickTrendEl.className = `kpi-trend ${k.clicks.delta>0?'trend-up':'trend-down'}`;
}

function renderRecentSends() {
  const tbody = document.getElementById('recent-sends-tbody');
  if (!tbody) return;
  const recent = DB.sends.filter(s => s.status === 'sent').slice(0, 5);
  tbody.innerHTML = recent.map(s => `
    <tr>
      <td>
        <div class="cell-primary truncate" style="max-width:260px">${s.name}</div>
        <div class="cell-secondary">${s.list}</div>
      </td>
      <td>${statusBadge(s.status)}</td>
      <td>${fmtNum(s.recipients)}</td>
      <td><span class="fw-6">${fmtPct(s.opens/s.recipients)}</span></td>
      <td><span class="fw-6">${fmtPct(s.clicks/s.opens)}</span></td>
      <td class="c-3 t-sm">${s.sentAt}</td>
    </tr>
  `).join('');
}

function renderListHealth() {
  const wrap = document.getElementById('list-health-rows');
  if (!wrap) return;
  wrap.innerHTML = DB.lists.slice(0,4).map(l => `
    <div class="stat-row">
      <span class="stat-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--auto)"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        ${l.name}
      </span>
      <span class="stat-value">${fmtNum(l.contacts)}</span>
    </div>
  `).join('');
}

let perfChart = null;
function renderMiniChart() {
  const canvas = document.getElementById('perf-chart');
  if (!canvas) return;
  const d = DB.chartData;
  if (perfChart) { perfChart.destroy(); perfChart = null; }
  perfChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Abertura',
          data: d.opens.map(v => +(v * 100).toFixed(1)),
          borderColor: '#534CE7', backgroundColor: 'rgba(83,76,231,0.1)',
          fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 6,
          pointBackgroundColor: '#534CE7', borderWidth: 2.5
        },
        {
          label: 'Clique',
          data: d.clicks.map(v => +(v * 100).toFixed(1)),
          borderColor: '#EA5456', backgroundColor: 'rgba(234,84,86,0.07)',
          fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 6,
          pointBackgroundColor: '#EA5456', borderWidth: 2.5
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ' ' + ctx.dataset.label + ': ' + ctx.parsed.y + '%' } }
      },
      scales: {
        x: {
          grid: { color: '#ECEEF3', drawTicks: false }, border: { display: false },
          ticks: { font: { size: 10, family: 'DM Sans' }, color: '#8891A8' }
        },
        y: {
          min: 0, max: 50,
          grid: { color: '#ECEEF3', drawTicks: false }, border: { display: false },
          ticks: { font: { size: 10, family: 'DM Sans' }, color: '#8891A8', callback: v => v + '%', stepSize: 10 }
        }
      }
    }
  });
}

function setEl(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
