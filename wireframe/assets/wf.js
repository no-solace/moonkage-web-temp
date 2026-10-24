/**
 * wf.js – khung chạy chung cho wireframe low-fi Moonkage.
 * Chèn header/menu/breadcrumb/footer theo khu, công tắc vai, công tắc ghi chú,
 * cổng đăng nhập (AC-02.3) và cổng NFC (BR-23), rào chắn theo vai,
 * bảng "Thuyết minh bố cục" (đọc WHY trong why.js) và mục lục index.html.
 * Không gọi mạng; chỉ lưu vai và trạng thái ghi chú trong localStorage.
 */
(function () {
  'use strict';

  var body = document.body;
  var ZONE = body.dataset.zone || '';
  var PAGE_ID = body.dataset.page || '';
  var ROOT = (ZONE && ZONE !== 'INDEX') ? '../' : '';

  // 1. Lưu trữ vai và ghi chú -------------------------------------------------
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }
  var ROLE = load('wf_role', 'buyer');
  var NOTES_ON = load('wf_notes_visible', 'true') !== 'false';

  var isSeller = ROLE === 'seller-pending' || ROLE === 'seller-open';
  var isNfc = ROLE === 'buyer-nfc' || ROLE === 'seller-open' || ROLE === 'admin';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function findPage(id) {
    if (typeof PAGES === 'undefined') return null;
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return PAGES[i];
    return null;
  }
  function roleName(id) {
    if (typeof ROLES !== 'undefined') for (var i = 0; i < ROLES.length; i++) if (ROLES[i].id === id) return ROLES[i].name;
    return id;
  }
  function starts(prefix) { return PAGE_ID.indexOf(prefix) === 0; }
  function link(href, label, cls, extra) {
    return '<a href="' + ROOT + href + '" class="' + (cls || '') + '"' + (extra || '') + '>' + label + '</a>';
  }

  // 2. Breadcrumb từ cây cha–con trong PAGES ----------------------------------
  function buildBreadcrumb() {
    var trail = [];
    var cur = findPage(PAGE_ID);
    while (cur) { trail.unshift(cur); cur = cur.parent ? findPage(cur.parent) : null; }
    if (!trail.length) return '';
    var html = '<nav class="wf-breadcrumb" aria-label="Breadcrumb">' + link('index.html', 'Mục lục');
    trail.forEach(function (p, i) {
      html += '<span class="sep">›</span>';
      html += (i === trail.length - 1)
        ? '<strong>' + esc(p.name) + '</strong><code class="id">' + p.id + '</code>'
        : link(p.file, esc(p.name));
    });
    return html + '</nav>';
  }

  // 3. Header theo khu (mục 4 – Điều hướng) ----------------------------------
  var LOGO_MARK = '<span class="mark" aria-hidden="true"></span>';

  function headerM() {
    var top = link('m/m1-0.html', LOGO_MARK + 'MOONKAGE', 'wf-logo');
    top += '<form class="wf-search-form" role="search" action="' + ROOT + 'm/m2-0.html" method="get">' +
      '<label class="sr-only" for="wf-q">Tìm sản phẩm hoặc đơn vị cung cấp</label>' +
      '<input id="wf-q" type="search" name="q" class="wf-search-input" placeholder="Tìm bánh, nhân bánh hoặc tên đơn vị…">' +
      '<button type="submit" class="wf-search-btn">Tìm</button></form>';
    top += '<div class="wf-header-actions">';
    top += link('m/m1-1.html', '<span class="k">Giao tới</span> <strong>Hà Nội ▾</strong>', 'wf-hbtn');
    top += link('m/m4-0.html', '<span class="wf-icon" aria-hidden="true">GH</span><span class="lbl">Giỏ hàng</span> <span class="count">2</span>', 'wf-hbtn', ' data-needs-login="true" aria-label="Giỏ hàng, 2 món"');
    if (ROLE === 'guest') {
      top += link('m/m5-1.html', 'Đăng nhập', 'btn btn-primary btn-sm');
    } else {
      top += link('m/m6-6.html', '<span class="wf-icon" aria-hidden="true">TB</span> <span class="count">3</span>', 'wf-hbtn', ' aria-label="Thông báo, 3 chưa đọc"');
      top += '<div class="wf-dd">' + link('m/m6-0.html', '<span class="avatar" style="width:28px;height:28px">AM</span><span class="lbl">Tài khoản ▾</span>', 'wf-hbtn', ' aria-haspopup="true"') +
        '<div class="wf-dd-menu right">' +
        link('m/m6-0.html', 'Tổng quan', 'wf-dd-item') +
        link('m/m6-1.html', 'Đơn hàng', 'wf-dd-item') +
        link('m/m6-2.html', 'Yêu cầu và báo giá', 'wf-dd-item') +
        link('m/m6-3.html', 'Địa chỉ giao hàng', 'wf-dd-item') +
        link('m/m6-4.html', 'Xác minh danh tính <small>' + (isNfc ? 'Đã xác minh' : 'Chưa xác minh') + '</small>', 'wf-dd-item') +
        link('m/m6-5.html', 'Thông tin cá nhân', 'wf-dd-item') +
        '<div class="wf-dd-sep"></div>' +
        (isSeller ? link('b/b1-0.html', 'Kênh người bán ›', 'wf-dd-item') : link('m/m7-0.html', 'Bán hàng trên Moonkage', 'wf-dd-item')) +
        '<div class="wf-dd-sep"></div>' +
        link('m/m5-1.html', 'Đăng xuất', 'wf-dd-item', ' data-logout="true"') +
        '</div></div>';
    }
    top += '</div>';

    var nav = link('m/m2-0.html', 'Mua hàng có sẵn', 'wf-nav-item' + (starts('M2.') ? ' active' : ''));
    nav += '<div class="wf-dd">' + link('m/m3-0.html', 'Đặt theo yêu cầu ▾', 'wf-nav-item' + (starts('M3.') ? ' active' : ''), ' aria-haspopup="true"') +
      '<div class="wf-dd-menu">' +
      '<div class="wf-dd-desc">Số lượng lớn, in logo hoặc hàng phải làm riêng, dù ít hộp.</div>' +
      link('m/m3-1.html', 'Tạo yêu cầu báo giá <small>gửi nhiều nơi</small>', 'wf-dd-item') +
      link('m/m3-2.html', 'Đơn vị cung cấp <small>chọn một nơi</small>', 'wf-dd-item') +
      '</div></div>';
    return { top: top, nav: nav };
  }

  function headerB() {
    var open = ROLE === 'seller-open' || ROLE === 'admin';
    var top = link('b/b1-0.html', LOGO_MARK + 'MOONKAGE<span class="zone">Kênh người bán</span>', 'wf-logo');
    top += '<div class="wf-header-actions">' +
      '<span class="badge ' + (open ? 'badge-soft' : 'badge-dash') + '">Xưởng Bánh Nghệ Nhân · ' + (open ? 'Đang mở bán' : 'Hồ sơ chờ duyệt') + '</span>' +
      '</div>';
    var nav = link('b/b1-0.html', 'Tổng quan', 'wf-nav-item' + (PAGE_ID === 'B1.0' || PAGE_ID === 'B1.1' ? ' active' : ''));
    if (open) {
      nav += link('b/b2-0.html', 'Đơn hàng <span class="count">4</span>', 'wf-nav-item' + (starts('B2.') ? ' active' : ''));
      nav += link('b/b3-0.html', 'Yêu cầu báo giá <span class="count">2</span>', 'wf-nav-item' + (starts('B3.') ? ' active' : ''));
      nav += link('b/b4-0.html', 'Sản phẩm', 'wf-nav-item' + (starts('B4.') ? ' active' : ''));
      nav += link('b/b5-0.html', 'Tiền', 'wf-nav-item' + (starts('B5.') ? ' active' : ''));
    }
    nav += link('b/b6-0.html', 'Cài đặt bán hàng', 'wf-nav-item' + (starts('B6.') ? ' active' : ''));
    nav += '<span class="spacer"></span>';
    nav += link('m/m6-6.html?loc=ban', '<span class="wf-icon" aria-hidden="true">TB</span> Thông báo <span class="count">1</span>', 'wf-nav-item', ' aria-label="Thông báo, 1 chưa đọc"');
    nav += link('m/m1-0.html', '↩ Về trang mua hàng', 'wf-nav-item');
    return { top: top, nav: nav };
  }

  function headerQ() {
    var top = link('q/q1-0.html', LOGO_MARK + 'MOONKAGE<span class="zone">Quản trị</span>', 'wf-logo');
    top += '<div class="wf-header-actions"><span class="badge">Quản trị viên · Trần Hà</span></div>';
    var nav = link('q/q1-0.html', 'Tổng quan', 'wf-nav-item' + (PAGE_ID === 'Q1.0' ? ' active' : ''));
    nav += link('q/q2-0.html', 'Người bán <span class="count">1</span>', 'wf-nav-item' + (starts('Q2.') ? ' active' : ''));
    nav += link('q/q3-0.html', 'Sản phẩm', 'wf-nav-item' + (starts('Q3.') ? ' active' : ''));
    nav += link('q/q4-0.html', 'Tiền <span class="count">13</span>', 'wf-nav-item' + (starts('Q4.') ? ' active' : ''));
    nav += link('q/q5-0.html', 'Khiếu nại <span class="count">1</span>', 'wf-nav-item' + (starts('Q5.') ? ' active' : ''));
    nav += link('q/q6-0.html', 'Cấu hình', 'wf-nav-item' + (starts('Q6.') ? ' active' : ''));
    return { top: top, nav: nav };
  }

  function buildHeader() {
    var h = ZONE === 'M' ? headerM() : ZONE === 'B' ? headerB() : headerQ();
    return '<header class="wf-header">' +
      '<div class="wf-header-top">' +
      '<button type="button" class="wf-menu-btn btn btn-sm" aria-expanded="false" aria-controls="wf-nav-bar">☰<span class="sr-only">Menu</span></button>' +
      h.top + '</div>' +
      '<div class="wf-nav-bar" id="wf-nav-bar"><nav class="wf-nav" aria-label="Menu chính">' + h.nav + '</nav></div>' +
      '</header>';
  }

  function buildFooter() {
    if (ZONE !== 'M') return '';
    return '<footer class="wf-footer"><div class="wf-footer-in">' +
      '<div><strong>MOONKAGE</strong> · Wireframe low-fi, không phải giao diện cuối</div>' +
      '<div class="wf-footer-links">' +
      link('m/m7-0.html', 'Bán hàng trên Moonkage') +
      link('m/m8-0.html', 'Chính sách mua bán') +
      link('index.html', 'Mục lục wireframe') +
      '</div></div></footer>';
  }

  // 4. Thanh công tắc vai --------------------------------------------------
  function buildRoleBar() {
    var opts = '';
    if (typeof ROLES !== 'undefined') ROLES.forEach(function (r) {
      opts += '<option value="' + r.id + '"' + (r.id === ROLE ? ' selected' : '') + '>' + esc(r.name) + '</option>';
    });
    return '<div class="wf-role-bar" id="wf-role-bar">' +
      '<div class="wf-role-bar-left"><label for="wf-role-switcher"><strong>Vai thử</strong></label>' +
      '<select id="wf-role-switcher" class="wf-role-select">' + opts + '</select></div>' +
      '<div class="wf-role-bar-right">' +
      '<button type="button" id="wf-notes-toggle" aria-pressed="' + NOTES_ON + '">Ghi chú & thuyết minh: ' + (NOTES_ON ? 'BẬT' : 'TẮT') + '</button>' +
      link('index.html', 'Mục lục') +
      '</div></div>';
  }

  // 5. Rào chắn theo vai ---------------------------------------------------
  function permission() {
    var p = PAGE_ID;
    if (ZONE === 'Q') return {
      allow: ['admin'], suggest: 'admin',
      reason: 'Khu Quản trị chỉ dành cho tài khoản Quản trị.',
      back: 'm/m1-0.html', backText: 'Về trang chủ'
    };
    if (ZONE === 'B') {
      if (/^B[2-5]\./.test(p)) return {
        allow: ['seller-open', 'admin'], suggest: 'seller-open',
        reason: 'Đơn hàng, yêu cầu báo giá, sản phẩm và tiền chỉ mở sau khi hồ sơ được duyệt và đã đóng phí mở bán (FR-27).',
        back: 'b/b1-0.html', backText: 'Về Tổng quan Kênh người bán'
      };
      return {
        allow: ['seller-pending', 'seller-open', 'admin'], suggest: 'seller-pending',
        reason: 'Kênh người bán chỉ dành cho tài khoản đã khai hồ sơ người bán.',
        back: 'm/m7-0.html', backText: 'Xem Bán hàng trên Moonkage'
      };
    }
    if (['M3.1', 'M3.4', 'M7.1'].indexOf(p) !== -1) return {
      allow: ['buyer-nfc', 'seller-open', 'admin'], suggest: 'buyer-nfc',
      reason: 'Thao tác này cần xác minh danh tính bằng CCCD gắn chip trước (BR-23).',
      back: 'm/m6-4.html?next=' + p.toLowerCase().replace(/\./g, '-') + '.html', backText: 'Đi tới Xác minh danh tính'
    };
    if (p === 'M7.0') return {
      allow: ['guest', 'buyer', 'buyer-nfc', 'admin'], suggest: 'buyer',
      reason: 'Tài khoản đã là chủ người bán nên lối "Bán hàng trên Moonkage" được thay bằng "Kênh người bán".',
      back: 'b/b1-0.html', backText: 'Vào Kênh người bán'
    };
    if (/^M4\.|^M6\./.test(p)) return {
      allow: ['buyer', 'buyer-nfc', 'seller-pending', 'seller-open', 'admin'], suggest: 'buyer',
      reason: 'Trang này cần đăng nhập (AC-02.3). Khách không có giỏ hàng.',
      back: 'm/m5-1.html?next=' + p.toLowerCase().replace(/\./g, '-') + '.html', backText: 'Đăng nhập'
    };
    return null;
  }

  function enforceBoundary() {
    var perm = permission();
    if (!perm || perm.allow.indexOf(ROLE) !== -1) return true;
    var main = document.getElementById('content');
    if (!main) return false;
    main.innerHTML =
      '<div class="wf-role-boundary"><div class="wf-boundary-box">' +
      '<span class="eyebrow">Rào chắn theo vai · ' + esc(PAGE_ID) + '</span>' +
      '<h1>Vai "' + esc(roleName(ROLE)) + '" không vào được trang này</h1>' +
      '<p class="muted">' + esc(perm.reason) + '</p>' +
      '<dl class="kv"><dt>Vai được vào</dt><dd>' + perm.allow.map(roleName).join(', ') + '</dd></dl>' +
      '<div class="wf-boundary-actions">' +
      '<button type="button" class="btn btn-primary" data-switch-role="' + perm.suggest + '">Đổi sang vai "' + esc(roleName(perm.suggest)) + '"</button>' +
      link(perm.back, perm.backText, 'btn') +
      '</div></div></div>';
    return false;
  }

  // 6. Cột menu tài khoản (M6.0–M6.5) -----------------------------------------
  function attachAccountSidebar() {
    var main = document.getElementById('content');
    if (!main) return;
    function item(href, label, on, right) {
      return link(href, label + (right ? ' <small class="faint">' + right + '</small>' : ''), 'wf-account-nav-link' + (on ? ' active' : ''));
    }
    var status = { 'buyer-nfc': 'Đã xác minh danh tính', 'seller-open': 'Chủ người bán · đã mở bán', 'seller-pending': 'Chủ người bán · chờ duyệt', 'admin': 'Quản trị' }[ROLE] || 'Chưa xác minh danh tính';
    var html = '<div class="wf-account-user-card"><span class="avatar">AM</span><div><strong>Anh Minh</strong><br><small class="muted">' + status + '</small></div></div>' +
      '<nav class="wf-account-nav-list" aria-label="Tài khoản">' +
      item('m/m6-0.html', 'Tổng quan', PAGE_ID === 'M6.0') +
      item('m/m6-1.html', 'Đơn hàng', starts('M6.1')) +
      item('m/m6-2.html', 'Yêu cầu và báo giá', starts('M6.2')) +
      item('m/m6-3.html', 'Địa chỉ giao hàng', starts('M6.3')) +
      item('m/m6-4.html', 'Xác minh danh tính', PAGE_ID === 'M6.4', isNfc ? '✓' : 'chưa') +
      item('m/m6-5.html', 'Thông tin cá nhân', PAGE_ID === 'M6.5') +
      '<div class="wf-dd-sep"></div>' +
      (isSeller ? item('b/b1-0.html', 'Kênh người bán ›') : item('m/m7-0.html', 'Bán hàng trên Moonkage')) +
      link('m/m5-1.html', 'Đăng xuất', 'wf-account-nav-link', ' data-logout="true"') +
      '</nav>';
    var layout = document.createElement('div');
    layout.className = 'wf-account-layout';
    var side = document.createElement('aside');
    side.className = 'wf-account-sidebar';
    side.innerHTML = html;
    var wrap = document.createElement('div');
    wrap.className = 'wf-account-main-content';
    while (main.firstChild) wrap.appendChild(main.firstChild);
    layout.appendChild(side);
    layout.appendChild(wrap);
    main.appendChild(layout);
  }

  // 7. Cổng đăng nhập và cổng NFC ---------------------------------------------
  function setupGates() {
    document.querySelectorAll('[data-needs-login="true"], [data-needs-nfc="true"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var href = el.getAttribute('href');
        var here = location.pathname.split('/').pop() || 'm1-0.html';
        var next = (href && href !== '#') ? href.replace(/^\.\.\/m\//, '') : here;
        if (ROLE === 'guest') {
          e.preventDefault();
          location.href = ROOT + 'm/m5-1.html?next=' + encodeURIComponent(next);
          return;
        }
        if (el.getAttribute('data-needs-nfc') === 'true' && !isNfc) {
          e.preventDefault();
          location.href = ROOT + 'm/m6-4.html?next=' + encodeURIComponent(next);
        }
      });
    });
  }

  function applyRoleVisibility() {
    document.querySelectorAll('[data-show]').forEach(function (el) {
      var list = el.getAttribute('data-show').split(/\s+/);
      el.style.display = (list.indexOf(ROLE) !== -1 || list.indexOf('all') !== -1) ? '' : 'none';
    });
    document.querySelectorAll('[data-hide]').forEach(function (el) {
      if (el.getAttribute('data-hide').split(/\s+/).indexOf(ROLE) !== -1) el.style.display = 'none';
    });
  }

  // 8. Bảng "Thuyết minh bố cục" ----------------------------------------------
  function buildWhy() {
    var why = (typeof WHY !== 'undefined') ? WHY[PAGE_ID] : null;
    var notes = Array.prototype.slice.call(document.querySelectorAll('.wf-note'));
    if (!why && !notes.length) return;
    var page = findPage(PAGE_ID) || {};

    var pins = {};
    document.querySelectorAll('[data-why]').forEach(function (el) {
      var n = el.getAttribute('data-why');
      if (getComputedStyle(el).display === 'none') return;
      pins[n] = true;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'wf-pin';
      b.textContent = n;
      b.setAttribute('aria-label', 'Lý do bố cục số ' + n);
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var li = document.getElementById('wf-why-' + n);
        if (li) { li.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); flash(n); }
      });
      el.insertBefore(b, el.firstChild);
    });

    var html = '<div class="wf-why-head"><span class="eyebrow">Thuyết minh bố cục</span>' +
      '<h2>' + esc(page.name || PAGE_ID) + ' <code>' + esc(PAGE_ID) + '</code></h2>' +
      '<div class="meta">' + (page.template ? '<span class="badge">Khuôn: ' + esc(page.template) + '</span>' : '') +
      (page.fr ? '<span class="badge badge-dash">' + esc(page.fr) + '</span>' : '') + '</div></div>' +
      '<div class="wf-why-body">';
    if (why) {
      if (why.goal) html += '<section><h3>Trang này để làm gì</h3><p class="wf-why-goal">' + why.goal + '</p></section>';
      if (why.points && why.points.length) {
        html += '<section><h3>Vì sao bố cục như vậy</h3><ol class="wf-why-list">';
        why.points.forEach(function (pt, i) {
          var n = String(i + 1);
          html += '<li id="wf-why-' + n + '" data-n="' + n + '"><span class="n' + (pins[n] ? '' : ' off') + '">' + n + '</span>' +
            '<div><b>' + pt[0] + '</b>' + pt[1] + '</div></li>';
        });
        html += '</ol></section>';
      }
      if (why.rejected && why.rejected.length) {
        html += '<section><h3>Bố cục đã cân nhắc nhưng không chọn</h3><ul class="wf-why-rej">';
        why.rejected.forEach(function (r) { html += '<li>' + r + '</li>'; });
        html += '</ul></section>';
      }
    }
    html += '<section class="wf-why-notes"><h3>Ghi chú FR / AC</h3><div id="wf-why-notes"></div></section>';
    html += '</div>';

    var panel = document.createElement('aside');
    panel.className = 'wf-why';
    panel.setAttribute('aria-label', 'Thuyết minh bố cục');
    panel.innerHTML = html;
    var footer = document.querySelector('.wf-footer');
    if (footer) body.insertBefore(panel, footer); else body.appendChild(panel);
    var holder = panel.querySelector('#wf-why-notes');
    notes.forEach(function (n) { holder.appendChild(n); });
    if (!notes.length) holder.parentNode.remove();
    body.classList.add('has-why');

    panel.querySelectorAll('.wf-why-list li').forEach(function (li) {
      var n = li.getAttribute('data-n');
      li.addEventListener('mouseenter', function () { mark(n, true); });
      li.addEventListener('mouseleave', function () { mark(n, false); });
    });
  }
  function mark(n, on) {
    document.querySelectorAll('[data-why="' + n + '"]').forEach(function (el) { el.classList.toggle('wf-hl', on); });
  }
  function flash(n) {
    var li = document.getElementById('wf-why-' + n);
    mark(n, true); if (li) li.classList.add('wf-hl');
    setTimeout(function () { mark(n, false); if (li) li.classList.remove('wf-hl'); }, 1600);
  }

  // 9. Mục lục (index.html) dựng từ PAGES và FLOWS ----------------------------
  function renderIndex() {
    var root = document.getElementById('ix-root');
    if (!root || typeof PAGES === 'undefined') return;
    var html = '<section class="section"><div class="section-head"><h2>Luồng bấm xuyên suốt</h2>' +
      '<p>Chọn đúng vai ở thanh dưới rồi bấm lần lượt từng bước.</p></div>';
    FLOWS.forEach(function (f) {
      html += '<div class="flow"><div class="row-between"><div><strong>' + f.id + ' · ' + esc(f.name) + '</strong> <span class="muted sm">— ' + esc(f.persona) + '</span></div></div>' +
        '<div class="flow-steps">';
      f.steps.forEach(function (id, i) {
        var p = findPage(id);
        if (i) html += '<span class="arr">→</span>';
        html += p ? '<a href="' + p.file + '" title="' + esc(p.name) + '">' + id + ' ' + esc(p.name) + '</a>' : '<span class="badge badge-dash">' + id + '</span>';
      });
      html += '</div>' + (f.exceptions ? '<p class="sm muted mt-1">Nhánh / ngoại lệ: ' + esc(f.exceptions) + '</p>' : '') + '</div>';
    });
    html += '</section>';

    [['M', 'Mua hàng'], ['B', 'Kênh người bán'], ['Q', 'Quản trị']].forEach(function (z) {
      var rows = PAGES.filter(function (p) { return p.zone === z[0]; });
      html += '<section class="section" id="zone-' + z[0] + '"><div class="section-head"><h2>' + z[1] + ' <span class="faint">(' + z[0] + ') · ' + rows.length + ' trang</span></h2></div>' +
        '<div class="table-wrap"><table class="cards"><thead><tr><th>Mã</th><th>Tên trang</th><th>Khuôn</th><th>Ai thấy</th><th>FR</th><th>Luồng</th><th>Demo</th></tr></thead><tbody>';
      rows.forEach(function (p) {
        var demo = p.demo === 'Làm trọn' ? 'badge-soft' : p.demo === 'Hoãn' ? 'badge-dash' : '';
        html += '<tr><td data-label="Mã"><code>' + p.id + '</code></td>' +
          '<td data-label="Trang"><a href="' + p.file + '"><strong>' + esc(p.name) + '</strong></a><br><small class="faint">' + esc(p.path) + '</small></td>' +
          '<td data-label="Khuôn"><small>' + esc(p.template) + '</small></td>' +
          '<td data-label="Ai thấy"><small>' + esc(p.who) + '</small></td>' +
          '<td data-label="FR"><small>' + esc(p.fr) + '</small></td>' +
          '<td data-label="Luồng"><small>' + esc(p.flows) + '</small></td>' +
          '<td data-label="Demo"><span class="badge ' + demo + '">' + esc(p.demo) + '</span></td></tr>';
      });
      html += '</tbody></table></div></section>';
    });
    root.innerHTML = html;
  }

  // 10. Khởi chạy -------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    if (!NOTES_ON) body.classList.add('hide-notes');

    if (ZONE && ZONE !== 'INDEX') {
      body.insertAdjacentHTML('afterbegin', buildHeader() + buildBreadcrumb());
      var f = buildFooter();
      if (f) body.insertAdjacentHTML('beforeend', f);
    } else {
      renderIndex();
    }

    var ok = enforceBoundary();
    if (ok && ZONE === 'M' && starts('M6.') && PAGE_ID !== 'M6.6') attachAccountSidebar();

    body.insertAdjacentHTML('beforeend', buildRoleBar());
    applyRoleVisibility();
    if (ok) buildWhy();
    setupGates();

    document.getElementById('wf-role-switcher').addEventListener('change', function () {
      save('wf_role', this.value); location.reload();
    });
    document.getElementById('wf-notes-toggle').addEventListener('click', function () {
      NOTES_ON = !NOTES_ON;
      save('wf_notes_visible', NOTES_ON ? 'true' : 'false');
      body.classList.toggle('hide-notes', !NOTES_ON);
      this.textContent = 'Ghi chú & thuyết minh: ' + (NOTES_ON ? 'BẬT' : 'TẮT');
      this.setAttribute('aria-pressed', String(NOTES_ON));
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-logout], [data-switch-role], .wf-menu-btn, [data-set-role]');
      if (!t) return;
      if (t.hasAttribute('data-logout')) save('wf_role', 'guest');
      if (t.hasAttribute('data-set-role')) save('wf_role', t.getAttribute('data-set-role'));
      if (t.hasAttribute('data-switch-role')) { save('wf_role', t.getAttribute('data-switch-role')); location.reload(); }
      if (t.classList.contains('wf-menu-btn')) {
        var bar = document.getElementById('wf-nav-bar');
        var open = bar.classList.toggle('open');
        t.setAttribute('aria-expanded', String(open));
      }
    });
  });
})();
