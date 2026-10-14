(() => {
  const $ = (id) => document.getElementById(id);
  const form = $('calcForm');
  const storageKey = 'engageiq_history_v1';
  let historyItems = readHistory();
  let lastResult = null;
  let toastTimer;

  function readHistory() {
    try { const value = JSON.parse(localStorage.getItem(storageKey) || '[]'); return Array.isArray(value) ? value : []; }
    catch (_) { return []; }
  }
  function saveHistory() {
    try { localStorage.setItem(storageKey, JSON.stringify(historyItems)); }
    catch (_) { showToast('Browser storage is unavailable. You can still use the calculator.'); }
    updateHistoryCount();
  }
  function number(id) { return Number($(id).value || 0); }
  function fmt(n) { return Number(n).toLocaleString('en-IN'); }
  function rate(n) { return Number(n).toFixed(2); }
  function showToast(message) {
    const el = $('toast'); el.textContent = message; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }
  function updateHistoryCount() {
    $('historyCount').textContent = historyItems.length;
    $('historySummary').textContent = `${historyItems.length} calculation${historyItems.length === 1 ? '' : 's'}`;
  }
  function benchmark(value) {
    if (value < 1) return {label:'Room to grow', text:'Try testing a new hook, format, or posting time.', width:Math.max(7,value*20)};
    if (value < 3) return {label:'Developing', text:'A useful baseline. Compare similar posts to spot patterns.', width:Math.min(100,value*20)};
    if (value < 6) return {label:'Healthy engagement', text:'A promising result. Repeat what worked and keep tracking.', width:Math.min(100,value*16)};
    return {label:'Strong response', text:'High interaction for this calculation. Check that the data is accurate.', width:100};
  }
  function calculate(e) {
    if (e) e.preventDefault();
    $('formError').textContent = '';
    const followers = number('followers'), likes = number('likes'), comments = number('comments'), shares = number('shares'), saves = number('saves'), reach = number('reach');
    const inputs = [followers,likes,comments,shares,saves,reach];
    if (inputs.some(v => !Number.isFinite(v) || v < 0) || followers <= 0) {
      $('formError').textContent = 'Please enter valid non-negative numbers and a follower count greater than zero.'; return;
    }
    if ([likes,comments,shares,saves].some(v => !Number.isInteger(v))) {
      $('formError').textContent = 'Interactions must be whole numbers.'; return;
    }
    if (reach > 0 && !Number.isInteger(reach)) {
      $('formError').textContent = 'Reach must be a whole number.'; return;
    }
    const interactions = likes + comments + shares + saves;
    const engagement = interactions / followers * 100;
    const reachRate = reach > 0 ? interactions / reach * 100 : null;
    const b = benchmark(engagement);
    const item = {id:Date.now().toString(36)+Math.random().toString(36).slice(2,7), platform:$('platform').value, name:$('postName').value.trim() || 'Untitled post', followers, likes, comments, shares, saves, reach:reach || null, interactions, engagement, reachRate, date:new Date().toISOString()};
    lastResult = item;
    $('resultTitle').textContent = `${item.platform} performance`;
    $('rateValue').textContent = rate(engagement);
    $('resultCaption').textContent = reachRate !== null ? `Reach-based rate: ${rate(reachRate)}% · Follower-based rate shown above.` : 'Based on total interactions divided by followers.';
    $('totalInteractions').textContent = fmt(interactions);
    $('audienceValue').textContent = fmt(followers);
    $('benchmarkLabel').textContent = b.label;
    $('benchmarkText').textContent = b.text;
    $('meterFill').style.width = `${Math.min(100,b.width)}%`;
    historyItems.unshift(item); historyItems = historyItems.slice(0,100); saveHistory(); renderHistory();
    showToast('Engagement rate calculated and saved.');
    $('resultPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function renderHistory() {
    updateHistoryCount();
    const body = $('historyBody');
    if (!historyItems.length) {
      body.innerHTML = '<tr><td colspan="6" class="empty-state">No calculations yet. Run your first calculation to see it here.</td></tr>'; return;
    }
    body.innerHTML = historyItems.map(item => `<tr><td><strong>${escapeHTML(item.name)}</strong></td><td>${escapeHTML(item.platform)}</td><td><span class="rate-pill">${rate(item.engagement)}%</span></td><td>${fmt(item.interactions)}</td><td>${new Date(item.date).toLocaleDateString()}</td><td><button class="delete-row" data-delete="${escapeHTML(item.id)}" aria-label="Delete calculation">×</button></td></tr>`).join('');
  }
  function navigate(view) {
    ['calculator','history','guide'].forEach(name => $(name+'View').classList.toggle('hidden', name !== view));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active',btn.dataset.view === view));
    $('crumb').textContent = view === 'calculator' ? 'Calculator' : view === 'history' ? 'Calculation history' : 'Learn the metrics';
    $('sidebar').classList.remove('open');
    window.scrollTo({top:0,behavior:'smooth'});
    if(view === 'history') renderHistory();
  }
  form.addEventListener('submit', calculate);
  $('resetBtn').addEventListener('click', () => { setTimeout(() => { $('formError').textContent=''; },0); });
  document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.view)));
  $('formulaToggle').addEventListener('click', () => {
    const box = $('reachFormula'); const hidden = box.classList.toggle('hidden');
    $('formulaToggle').innerHTML = hidden ? 'Show reach-based formula <span>＋</span>' : 'Hide reach-based formula <span>−</span>';
  });
  $('demoBtn').addEventListener('click', () => {
    $('platform').value='Instagram'; $('followers').value=12500; $('likes').value=860; $('comments').value=74; $('shares').value=32; $('saves').value=55; $('reach').value=9800; $('postName').value='Summer launch reel';
    calculate(); showToast('Sample data loaded. Try changing the numbers!');
  });
  $('tipsBtn').addEventListener('click', () => navigate('guide'));
  $('menuBtn').addEventListener('click', () => $('sidebar').classList.toggle('open'));
  $('themeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const enabled = document.body.classList.contains('dark');
    try { localStorage.setItem('engageiq_dark', enabled ? '1' : '0'); } catch (_) {}
    $('themeBtn').textContent = enabled ? '☾' : '☼';
  });
  try { if(localStorage.getItem('engageiq_dark') === '1') { document.body.classList.add('dark'); $('themeBtn').textContent='☾'; } } catch (_) {}
  $('historyBody').addEventListener('click', e => {
    const button = e.target.closest('[data-delete]'); if(!button) return;
    historyItems = historyItems.filter(item => item.id !== button.dataset.delete); saveHistory(); renderHistory(); showToast('Calculation removed.');
  });
  $('clearHistoryBtn').addEventListener('click', () => {
    if (!historyItems.length) { showToast('History is already empty.'); return; }
    if (confirm('Delete all saved calculations from this browser?')) { historyItems=[]; saveHistory(); renderHistory(); showToast('History cleared.'); }
  });
  $('exportBtn').addEventListener('click', () => {
    if (!historyItems.length) { showToast('There is no history to export yet.'); return; }
    const columns = ['Date','Post / Campaign','Platform','Followers','Likes','Comments','Shares','Saves','Reach','Total Interactions','Follower-based Rate (%)','Reach-based Rate (%)'];
    const rows = historyItems.map(i => [new Date(i.date).toISOString(),i.name,i.platform,i.followers,i.likes,i.comments,i.shares,i.saves,i.reach ?? '',i.interactions,rate(i.engagement),i.reachRate === null ? '' : rate(i.reachRate)]);
    const csv = [columns,...rows].map(row => row.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');
    a.href=url; a.download='engageiq-calculation-history.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); showToast('CSV export downloaded.');
  });
  renderHistory();
})();