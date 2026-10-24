/**
 * Prototype runtime shared by the three art directions.
 * - A small neutral control (bottom right) to jump between directions, screens and states.
 * - Simulated states from the URL (?as=buyer, ?q=..., ?empty=1), mirroring the wireframe's examples.
 * - Gates (sign-in, identity check) and out-of-scope links give feedback through the direction's own toast style.
 * - UI-only behaviours: mobile nav, dropdowns, filter drawer, filter chips that follow the checkboxes.
 * No data, no network, no storage. Filters do not change results (same as the wireframe).
 */
(function () {
  'use strict';
  var body = document.body;
  var DIR = body.dataset.dir;          // a | b | c
  var SCREEN = body.dataset.screen;    // m1-0 | m2-0 | m3-0 | q1-0
  var qs = new URLSearchParams(location.search);
  var AS = qs.get('as') || (SCREEN === 'q1-0' ? 'admin' : 'guest');

  var SCREENS = [['m1-0', 'M1.0 Trang chủ'], ['m2-0', 'M2.0 Mua hàng có sẵn'], ['m3-0', 'M3.0 Đặt theo yêu cầu'], ['q1-0', 'Q1.0 Tổng quan quản trị']];
  var DIRS = [['a', 'A · Biên tập'], ['b', 'B · Thủ công hiện đại'], ['c', 'C · Cấu trúc']];
  var WF = { 'm1-0': 'm/m1-0.html', 'm2-0': 'm/m2-0.html', 'm3-0': 'm/m3-0.html', 'q1-0': 'q/q1-0.html' };

  // 1. States shown or hidden by URL ----------------------------------------
  function match(expr) {
    return expr.split(' ').some(function (e) {
      var kv = e.split('=');
      return kv[0] === 'as' ? kv[1].split(',').indexOf(AS) !== -1 : (kv.length > 1 ? qs.get(kv[0]) === kv[1] : qs.has(kv[0]));
    });
  }
  document.querySelectorAll('[data-if]').forEach(function (el) { if (!match(el.dataset.if)) el.hidden = true; });
  document.querySelectorAll('[data-unless]').forEach(function (el) { if (match(el.dataset.unless)) el.hidden = true; });
  var q = qs.get('q');
  document.querySelectorAll('[data-q-echo]').forEach(function (el) { if (q) el.textContent = q; });
  if (q) document.querySelectorAll('input[type="search"]').forEach(function (i) { i.value = q; });

  // Keep the simulated state on links between the four screens
  if (AS !== 'guest' && AS !== 'admin') document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (/^(m1-0|m2-0|m3-0)\.html$/.test(h)) a.setAttribute('href', h + '?as=' + AS);
  });

  // 2. Toasts ------------------------------------------------------------------
  var toasts = document.createElement('div');
  toasts.className = 'proto-toasts';
  toasts.setAttribute('role', 'status');
  toasts.setAttribute('aria-live', 'polite');
  body.appendChild(toasts);
  function toast(title, text, kind) {
    var t = document.createElement('div');
    t.className = 'toast' + (kind ? ' toast--' + kind : '');
    t.innerHTML = '<strong>' + title + '</strong>' + (text ? '<span>' + text + '</span>' : '');
    toasts.appendChild(t);
    setTimeout(function () { t.classList.add('toast--out'); }, 3600);
    setTimeout(function () { t.remove(); }, 4000);
  }

  // 3. Gates and out-of-scope links ---------------------------------------------
  document.addEventListener('click', function (e) {
    var gate = e.target.closest('[data-gate]');
    if (gate) {
      e.preventDefault();
      var target = gate.dataset.gate;
      if (AS === 'guest') toast('Cần đăng nhập', 'Khách bấm "' + gate.textContent.trim() + '" → Đăng nhập (M5.1), rồi xác minh danh tính (M6.4), rồi quay lại ' + target + ' (AC-02.3, BR-23).', 'info');
      else if (AS === 'buyer') toast('Cần xác minh danh tính', 'Tài khoản chưa xác minh → Xác minh danh tính (M6.4) bằng CCCD gắn chip, xong tự quay lại ' + target + ' (BR-23).', 'info');
      else toast(target + ' nằm ngoài 4 màn khám phá', 'Đã xác minh: nút mở thẳng ' + target + '. Xem bản wireframe để đi tiếp.');
      return;
    }
    var out = e.target.closest('[data-out]');
    if (out) {
      e.preventDefault();
      toast(out.dataset.out + ' nằm ngoài 4 màn khám phá', 'Liên kết này dẫn tới màn chưa có trong prototype.');
      return;
    }
    var nav = e.target.closest('[data-nav-toggle]');
    if (nav) { var open = body.classList.toggle('nav-open'); nav.setAttribute('aria-expanded', String(open)); return; }
    var fl = e.target.closest('[data-filter-toggle]');
    if (fl) { var o = body.classList.toggle('filters-open'); document.querySelectorAll('[data-filter-toggle]').forEach(function (b) { b.setAttribute('aria-expanded', String(o)); }); return; }
    var dd = e.target.closest('[data-dd]');
    if (dd) {
      e.preventDefault();
      var wrap = dd.parentElement;
      var on = wrap.classList.toggle('dd-open');
      dd.setAttribute('aria-expanded', String(on));
      return;
    }
    document.querySelectorAll('.dd-open').forEach(function (w) { if (!w.contains(e.target)) { w.classList.remove('dd-open'); var b = w.querySelector('[data-dd]'); if (b) b.setAttribute('aria-expanded', 'false'); } });
    var chipX = e.target.closest('[data-chip-for]');
    if (chipX) {
      var box = document.getElementById(chipX.dataset.chipFor);
      if (box) { box.checked = false; syncChips(); }
    }
    var clear = e.target.closest('[data-clear-filters]');
    if (clear) { e.preventDefault(); document.querySelectorAll('[data-chip]').forEach(function (c) { c.checked = false; }); syncChips(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { body.classList.remove('nav-open', 'filters-open'); document.querySelectorAll('.dd-open').forEach(function (w) { w.classList.remove('dd-open'); }); }
  });

  // 4. Filter chips follow the checkboxes (UI only, results do not change) -------
  var chipBox = document.querySelector('[data-chips]');
  function syncChips() {
    if (!chipBox) return;
    var html = '';
    var n = 0;
    document.querySelectorAll('[data-chip]').forEach(function (c) {
      if (!c.checked) return;
      n++;
      html += '<button type="button" class="chip chip--on" data-chip-for="' + c.id + '" aria-label="Bỏ lọc ' + c.dataset.chip + '">' + c.dataset.chip + '<span aria-hidden="true"> ×</span></button>';
    });
    chipBox.innerHTML = html;
    document.querySelectorAll('[data-filter-count]').forEach(function (el) { el.textContent = n ? '(' + n + ')' : ''; });
    document.querySelectorAll('[data-when-filters]').forEach(function (el) { el.hidden = n === 0; });
  }
  document.addEventListener('change', function (e) { if (e.target.matches('[data-chip]')) syncChips(); });
  syncChips();

  // 5. Prototype control --------------------------------------------------------
  var states = [];
  try { states = JSON.parse(body.dataset.states || '[]'); } catch (err) {}
  function row(items) { return '<div class="proto-row">' + items.join('') + '</div>'; }
  var here = location.search;
  var html = '<button type="button" class="proto-pill" aria-expanded="false" aria-controls="proto-panel"><b>Prototype</b> ' + DIR.toUpperCase() + ' · ' + SCREEN.replace('-', '.').toUpperCase() + '</button>' +
    '<div class="proto-panel" id="proto-panel" role="dialog" aria-label="Điều khiển prototype">' +
    '<h4>Hướng thiết kế</h4>' + row(DIRS.map(function (d) {
      return '<a href="../direction-' + d[0] + '/' + SCREEN + '.html' + here + '" aria-current="' + (d[0] === DIR) + '">' + d[1] + '</a>';
    })) +
    '<h4>Màn</h4>' + row(SCREENS.map(function (s) {
      return '<a href="' + s[0] + '.html" aria-current="' + (s[0] === SCREEN) + '">' + s[1] + '</a>';
    })) +
    (states.length ? '<h4>Trạng thái</h4>' + row(states.map(function (s) {
      return '<a href="' + SCREEN + '.html' + s[1] + '" aria-current="' + (s[1] === here || (!here && s[1] === '')) + '">' + s[0] + '</a>';
    })) : '') +
    '<p>Bản gốc: <a href="../../wireframe/' + WF[SCREEN] + '">wireframe ' + SCREEN.replace('-', '.').toUpperCase() + '</a> · <a href="../index.html">Tất cả hướng</a>. Ảnh là chỗ trống minh họa, không phải ảnh sản phẩm thật.</p>' +
    '</div>';
  var bar = document.createElement('div');
  bar.className = 'proto-bar';
  bar.innerHTML = html;
  body.appendChild(bar);
  bar.querySelector('.proto-pill').addEventListener('click', function () {
    var o = bar.classList.toggle('open');
    this.setAttribute('aria-expanded', String(o));
  });
})();
