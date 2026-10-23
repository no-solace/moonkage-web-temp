/**
 * wf.js - Bộ khung runtime cho Low-fi Wireframe Moonkage
 * Chèn Header/Footer/Menu theo khu, công tắc vai, công tắc ghi chú, breadcrumb, cổng đăng nhập & NFC
 */

(function () {
  'use strict';

  // Xác định đường dẫn tương đối về thư mục gốc wireframe/
  var isSubDir = (document.body.dataset.zone && document.body.dataset.zone !== 'INDEX');
  var ROOT = isSubDir ? '../' : '';

  // 1. Quản lý Vai trò người dùng (Role Store)
  function getSavedRole() {
    try {
      return localStorage.getItem('wf_role') || 'buyer';
    } catch (e) {
      return 'buyer';
    }
  }

  function setSavedRole(role) {
    try {
      localStorage.setItem('wf_role', role);
    } catch (e) {}
  }

  // Quản lý Bật/Tắt Ghi chú
  function areNotesVisible() {
    try {
      return localStorage.getItem('wf_notes_visible') !== 'false';
    } catch (e) {
      return true;
    }
  }

  function setNotesVisible(visible) {
    try {
      localStorage.setItem('wf_notes_visible', visible ? 'true' : 'false');
    } catch (e) {}
  }

  // 2. Tra cứu trang trong PAGES
  function findPage(pageId) {
    if (typeof PAGES === 'undefined') return null;
    return PAGES.find(function (p) { return p.id === pageId; });
  }

  // 3. Render Breadcrumb
  function buildBreadcrumb(currentPageId) {
    if (!currentPageId || typeof PAGES === 'undefined') return '';
    var trail = [];
    var curr = findPage(currentPageId);
    while (curr) {
      trail.unshift(curr);
      curr = curr.parent ? findPage(curr.parent) : null;
    }

    if (trail.length === 0) return '';

    var html = '<nav class="wf-breadcrumb" aria-label="Breadcrumb">';
    html += '<a href="' + ROOT + 'index.html">Mục lục</a>';

    trail.forEach(function (p, idx) {
      html += ' <span>›</span> ';
      if (idx === trail.length - 1) {
        html += '<strong>' + p.name + ' (' + p.id + ')</strong>';
      } else {
        html += '<a href="' + ROOT + p.file + '">' + p.name + '</a>';
      }
    });

    html += '</nav>';
    return html;
  }

  // 4. Render Header theo Phân Khu
  function buildHeader(zone, currentPageId, currentRole) {
    if (!zone || zone === 'INDEX') return '';

    var html = '<header class="wf-header">';
    html += '<div class="wf-header-top">';

    // Logo theo khu
    if (zone === 'M') {
      html += '<a href="' + ROOT + 'm/m1-0.html" class="wf-logo">MOONKAGE</a>';
      // Ô tìm kiếm Mua hàng
      html += '<form class="wf-search-form" action="' + ROOT + 'm/m2-0.html" method="GET">';
      html += '<input type="text" name="q" class="wf-search-input" placeholder="Tìm bánh trung thu, nhân bánh, xưởng..." aria-label="Tìm kiếm">';
      html += '<button type="submit" class="wf-search-btn">[Tìm]</button>';
      html += '</form>';

      // Hành động bên phải
      html += '<div class="wf-header-actions">';
      html += '<a href="' + ROOT + 'm/m1-1.html" class="meta-tag" title="Bấm để đổi khu vực giao hàng"><strong>[Giao tới: Hà Nội ▾]</strong></a>';
      html += '<a href="' + ROOT + 'm/m4-0.html" data-needs-login="true" class="meta-tag">[Giỏ hàng (2)]</a>';
      
      if (currentRole === 'guest') {
        html += '<a href="' + ROOT + 'm/m5-1.html" class="btn btn-primary">Đăng nhập</a>';
      } else {
        html += '<a href="' + ROOT + 'm/m6-6.html" class="meta-tag" aria-label="Thông báo">[Thông báo]</a>';
        html += '<div class="wf-account-dropdown">';
        html += '<a href="' + ROOT + 'm/m6-0.html" class="meta-tag wf-account-dropdown-toggle"><strong>Tài khoản ▾</strong></a>';
        html += '<div class="wf-account-menu">';
        html += '<a href="' + ROOT + 'm/m6-0.html" class="wf-account-item">Tổng quan</a>';
        html += '<a href="' + ROOT + 'm/m6-1.html" class="wf-account-item">Đơn hàng</a>';
        html += '<a href="' + ROOT + 'm/m6-2.html" class="wf-account-item">Yêu cầu và báo giá</a>';
        html += '<a href="' + ROOT + 'm/m6-3.html" class="wf-account-item">Địa chỉ giao hàng</a>';
        html += '<a href="' + ROOT + 'm/m6-4.html" class="wf-account-item">Xác minh danh tính</a>';
        html += '<a href="' + ROOT + 'm/m6-5.html" class="wf-account-item">Thông tin cá nhân</a>';
        if (currentRole === 'seller-pending' || currentRole === 'seller-open') {
          html += '<a href="' + ROOT + 'b/b1-0.html" class="wf-account-item">Kênh người bán</a>';
        } else {
          html += '<a href="' + ROOT + 'm/m7-0.html" class="wf-account-item">Bán hàng trên Moonkage</a>';
        }
        html += '<a href="' + ROOT + 'm/m5-1.html" class="wf-account-item" id="wf-logout-link" style="border-top:1px solid #000; font-weight:700;">Đăng xuất</a>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';
    } else if (zone === 'B') {
      html += '<a href="' + ROOT + 'b/b1-0.html" class="wf-logo">MOONKAGE · KÊNH NGƯỜI BÁN</a>';
      html += '<div class="wf-header-actions">';
      html += '<a href="' + ROOT + 'm/m6-6.html" class="meta-tag">[Thông báo bán]</a>';
      html += '<a href="' + ROOT + 'm/m1-0.html" class="btn">↩ Về trang mua hàng</a>';
      html += '</div>';
    } else if (zone === 'Q') {
      html += '<a href="' + ROOT + 'q/q1-0.html" class="wf-logo">MOONKAGE · QUẢN TRỊ HỆ THỐNG</a>';
      html += '<div class="wf-header-actions">';
      html += '<span class="meta-tag">[Quản trị viên]</span>';
      html += '<a href="' + ROOT + 'm/m1-0.html" class="btn">Về Web Mua hàng</a>';
      html += '</div>';
    }

    html += '</div>'; // end wf-header-top

    // Menu toàn cục cấp 1
    html += '<nav class="wf-nav">';
    if (zone === 'M') {
      html += '<a href="' + ROOT + 'm/m2-0.html" class="wf-nav-item ' + (currentPageId === 'M2.0' ? 'active' : '') + '">Mua hàng có sẵn</a>';
      html += '<a href="' + ROOT + 'm/m3-0.html" class="wf-nav-item ' + (currentPageId.indexOf('M3.') === 0 ? 'active' : '') + '">Đặt theo yêu cầu ▾</a>';
      html += '<a href="' + ROOT + 'm/m3-2.html" class="wf-nav-item ' + (currentPageId === 'M3.2' ? 'active' : '') + '">Đơn vị cung cấp</a>';

      if (currentRole === 'seller-pending' || currentRole === 'seller-open') {
        html += '<a href="' + ROOT + 'b/b1-0.html" class="wf-nav-item" style="border:1px dashed #000;">Kênh người bán</a>';
      } else {
        html += '<a href="' + ROOT + 'm/m7-0.html" class="wf-nav-item ' + (currentPageId.indexOf('M7.') === 0 ? 'active' : '') + '">Bán hàng trên Moonkage</a>';
      }
    } else if (zone === 'B') {
      html += '<a href="' + ROOT + 'b/b1-0.html" class="wf-nav-item ' + (currentPageId === 'B1.0' ? 'active' : '') + '">Tổng quan</a>';
      
      // Các mục chỉ hiện khi đã mở bán (seller-open)
      var isOpen = (currentRole === 'seller-open');
      if (isOpen) {
        html += '<a href="' + ROOT + 'b/b2-0.html" class="wf-nav-item ' + (currentPageId.indexOf('B2.') === 0 ? 'active' : '') + '">Đơn hàng</a>';
        html += '<a href="' + ROOT + 'b/b3-0.html" class="wf-nav-item ' + (currentPageId.indexOf('B3.') === 0 ? 'active' : '') + '">Yêu cầu báo giá</a>';
        html += '<a href="' + ROOT + 'b/b4-0.html" class="wf-nav-item ' + (currentPageId.indexOf('B4.') === 0 ? 'active' : '') + '">Sản phẩm</a>';
        html += '<a href="' + ROOT + 'b/b5-0.html" class="wf-nav-item ' + (currentPageId.indexOf('B5.') === 0 ? 'active' : '') + '">Tiền</a>';
      } else {
        html += '<span class="wf-nav-item" style="color:#888;" title="Chỉ mở sau khi nộp hồ sơ và đóng phí mở bán">(Chờ mở bán...)</span>';
      }
      html += '<a href="' + ROOT + 'b/b6-0.html" class="wf-nav-item ' + (currentPageId.indexOf('B6.') === 0 ? 'active' : '') + '">Cài đặt bán hàng</a>';
    } else if (zone === 'Q') {
      html += '<a href="' + ROOT + 'q/q1-0.html" class="wf-nav-item ' + (currentPageId === 'Q1.0' ? 'active' : '') + '">Tổng quan</a>';
      html += '<a href="' + ROOT + 'q/q2-0.html" class="wf-nav-item ' + (currentPageId.indexOf('Q2.') === 0 ? 'active' : '') + '">Người bán (Chờ duyệt)</a>';
      html += '<a href="' + ROOT + 'q/q3-0.html" class="wf-nav-item ' + (currentPageId.indexOf('Q3.') === 0 ? 'active' : '') + '">Sản phẩm</a>';
      html += '<a href="' + ROOT + 'q/q4-0.html" class="wf-nav-item ' + (currentPageId.indexOf('Q4.') === 0 ? 'active' : '') + '">Tiền (Giải ngân / Chuyển tiền)</a>';
      html += '<a href="' + ROOT + 'q/q5-0.html" class="wf-nav-item ' + (currentPageId.indexOf('Q5.') === 0 ? 'active' : '') + '">Khiếu nại</a>';
      html += '<a href="' + ROOT + 'q/q6-0.html" class="wf-nav-item ' + (currentPageId.indexOf('Q6.') === 0 ? 'active' : '') + '">Cấu hình</a>';
    }
    html += '</nav>';
    html += '</header>';

    return html;
  }

  // 5. Render Footer cho Khu M
  function buildFooter(zone) {
    if (zone !== 'M') return '';
    var html = '<footer class="wf-footer">';
    html += '<div><strong>MOONKAGE</strong> — Sàn thương mại điện tử Bánh Trung Thu (Wireframe Low-fi)</div>';
    html += '<div class="wf-footer-links">';
    html += '<a href="' + ROOT + 'm/m7-0.html">Bán hàng trên Moonkage</a>';
    html += '<a href="' + ROOT + 'm/m8-0.html">Chính sách mua bán</a>';
    html += '<a href="' + ROOT + 'index.html">Mục lục Wireframe</a>';
    html += '</div>';
    html += '</footer>';
    return html;
  }

  // 6. Thanh Công Tắc Vai & Ghi Chú Cố Định (Fixed Role Bar)
  function buildRoleBar(currentRole, notesVisible) {
    var html = '<div class="wf-role-bar" id="wf-role-bar">';
    
    html += '<div class="wf-role-bar-left">';
    html += '<strong>[Vai thử nghiệm]:</strong> ';
    html += '<select id="wf-role-switcher" class="wf-role-select">';
    
    if (typeof ROLES !== 'undefined') {
      ROLES.forEach(function (r) {
        var sel = (r.id === currentRole) ? ' selected' : '';
        html += '<option value="' + r.id + '"' + sel + '>' + r.name + '</option>';
      });
    }
    html += '</select>';
    html += '</div>';

    html += '<div class="wf-role-bar-right">';
    html += '<button type="button" id="wf-notes-toggle" class="btn" style="padding:2px 8px; font-size:12px;">';
    html += notesVisible ? '[Ghi chú: BẬT]' : '[Ghi chú: TẮT]';
    html += '</button>';
    html += '<a href="' + ROOT + 'index.html">[Mục lục 68 trang]</a>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  // 7. Xử lý Cổng Đăng Nhập & Cổng NFC (AC-02.3, BR-23)
  function setupGates(currentRole) {
    // Xử lý tất cả các phần tử có yêu cầu đăng nhập hoặc yêu cầu NFC
    document.querySelectorAll('[data-needs-login="true"], [data-needs-nfc="true"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var needsLogin = el.getAttribute('data-needs-login') === 'true';
        var needsNfc = el.getAttribute('data-needs-nfc') === 'true';

        // Lấy trang mục tiêu (ưu tiên href của thẻ <a>, nếu là button thì lấy trang hiện tại)
        var targetHref = el.getAttribute('href');
        var currentPage = window.location.pathname.split('/').pop() || 'm1-0.html';
        var nextTarget = (targetHref && targetHref !== '#' && targetHref.indexOf('javascript:') !== 0) ? targetHref : currentPage;

        // BƯỚC 1: Nếu chưa đăng nhập (vai Khách)
        // Bắt buộc chuyển sang trang đăng nhập (M5.1) trước khi làm bất kỳ thao tác nào
        if (currentRole === 'guest') {
          e.preventDefault();
          window.location.href = ROOT + 'm/m5-1.html?next=' + encodeURIComponent(nextTarget);
          return;
        }

        // BƯỚC 2: Đã đăng nhập nhưng chưa xác minh NFC (vai chưa phải buyer-nfc, seller-open, admin)
        // Nếu chức năng yêu cầu NFC -> chuyển sang trang xác minh NFC (M6.4)
        if (needsNfc) {
          var isNfcVerified = (currentRole === 'buyer-nfc' || currentRole === 'admin' || currentRole === 'seller-open');
          if (!isNfcVerified) {
            e.preventDefault();
            window.location.href = ROOT + 'm/m6-4.html?next=' + encodeURIComponent(nextTarget);
            return;
          }
        }
      });
    });
  }

  // 8. Cập nhật hiển thị theo thuộc tính data-show
  function applyRoleVisibility(currentRole) {
    document.querySelectorAll('[data-show]').forEach(function (el) {
      var allowedRoles = el.getAttribute('data-show').split(' ');
      if (allowedRoles.indexOf(currentRole) !== -1 || allowedRoles.indexOf('all') !== -1) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // 9. Dựng và chèn Sidebar cho Phân khu Tài khoản (M6.0 - M6.5)
  function buildAccountSidebarHtml(currentPageId, currentRole) {
    var isOverview = (currentPageId === 'M6.0');
    var isOrders = (currentPageId.indexOf('M6.1') === 0);
    var isRfq = (currentPageId.indexOf('M6.2') === 0);
    var isAddr = (currentPageId.indexOf('M6.3') === 0);
    var isNfc = (currentPageId === 'M6.4');
    var isProfile = (currentPageId === 'M6.5');

    var html = '<div class="wf-account-user-card">';
    html += '<div class="wf-account-avatar">[Avatar]</div>';
    html += '<div class="wf-account-user-meta">';
    html += '<strong>Anh Minh</strong><br>';
    html += '<small style="color: #666;">';
    if (currentRole === 'buyer-nfc') {
      html += 'Đã xác minh NFC';
    } else if (currentRole === 'seller-open') {
      html += 'Chủ người bán';
    } else if (currentRole === 'seller-pending') {
      html += 'Chờ duyệt mở bán';
    } else if (currentRole === 'admin') {
      html += 'Quản trị viên';
    } else if (currentRole === 'guest') {
      html += 'Khách';
    } else {
      html += 'Người mua';
    }
    html += '</small>';
    html += '</div>';
    html += '</div>';

    html += '<nav class="wf-account-nav-list">';
    html += '<a href="' + ROOT + 'm/m6-0.html" class="wf-account-nav-link ' + (isOverview ? 'active' : '') + '">Tổng quan</a>';
    html += '<a href="' + ROOT + 'm/m6-1.html" class="wf-account-nav-link ' + (isOrders ? 'active' : '') + '">Đơn hàng</a>';
    html += '<a href="' + ROOT + 'm/m6-2.html" class="wf-account-nav-link ' + (isRfq ? 'active' : '') + '">Yêu cầu và báo giá</a>';
    html += '<a href="' + ROOT + 'm/m6-3.html" class="wf-account-nav-link ' + (isAddr ? 'active' : '') + '">Địa chỉ giao hàng</a>';
    html += '<a href="' + ROOT + 'm/m6-4.html" class="wf-account-nav-link ' + (isNfc ? 'active' : '') + '">Xác minh danh tính</a>';
    html += '<a href="' + ROOT + 'm/m6-5.html" class="wf-account-nav-link ' + (isProfile ? 'active' : '') + '">Thông tin cá nhân</a>';
    
    html += '<div style="border-top: 1px solid #ccc; margin: 8px 0;"></div>';
    
    if (currentRole === 'seller-pending' || currentRole === 'seller-open') {
      html += '<a href="' + ROOT + 'b/b1-0.html" class="wf-account-nav-link" style="font-weight: 700;">Kênh người bán ›</a>';
    } else {
      html += '<a href="' + ROOT + 'm/m7-0.html" class="wf-account-nav-link">Bán hàng trên Moonkage</a>';
    }
    
    if (currentRole === 'guest') {
      html += '<a href="' + ROOT + 'm/m5-1.html" class="wf-account-nav-link" style="border-top: 1px solid #000; font-weight: 700; margin-top: 4px;">Đăng nhập</a>';
    } else {
      html += '<a href="' + ROOT + 'm/m5-1.html" class="wf-account-nav-link" id="wf-sidebar-logout-link" style="border-top: 1px solid #000; font-weight: 700; margin-top: 4px;">Đăng xuất</a>';
    }
    html += '</nav>';
    return html;
  }

  function attachAccountSidebar(currentPageId, currentRole) {
    var mainContent = document.getElementById('content');
    if (!mainContent) return;

    var layout = document.createElement('div');
    layout.className = 'wf-account-layout';

    var sidebar = document.createElement('aside');
    sidebar.className = 'wf-account-sidebar';
    sidebar.innerHTML = buildAccountSidebarHtml(currentPageId, currentRole);

    var contentWrap = document.createElement('div');
    contentWrap.className = 'wf-account-main-content';

    while (mainContent.firstChild) {
      contentWrap.appendChild(mainContent.firstChild);
    }

    layout.appendChild(sidebar);
    layout.appendChild(contentWrap);
    mainContent.appendChild(layout);

    var sidebarLogout = document.getElementById('wf-sidebar-logout-link');
    if (sidebarLogout) {
      sidebarLogout.addEventListener('click', function () {
        setSavedRole('guest');
      });
    }
  }

  // 10. Rào chắn phân quyền vai trò (Role Boundary Enforcement)
  function getRoleName(roleId) {
    if (typeof ROLES !== 'undefined') {
      for (var i = 0; i < ROLES.length; i++) {
        if (ROLES[i].id === roleId) return ROLES[i].name;
      }
    }
    return roleId;
  }

  function getPagePermission(pageId, zone) {
    // 1. Phân khu Quản trị (Zone Q)
    if (zone === 'Q' || pageId.indexOf('Q') === 0) {
      return {
        allowedRoles: ['admin'],
        recommendedRole: 'admin',
        reason: 'Khu vực quản trị hệ thống chỉ dành riêng cho tài khoản Quản trị viên (admin). Các vai trò người mua hoặc người bán không được phép xem hoặc thao tác tại khu vực này.',
        fallbackLink: ROOT + 'm/m1-0.html',
        fallbackText: 'Quay về trang chủ Mua hàng (M1.0)'
      };
    }

    // 2. Phân khu Kênh người bán (Zone B)
    if (zone === 'B' || pageId.indexOf('B') === 0) {
      var openShopOnly = [
        'B2.0', 'B2.1', 'B2.2',
        'B3.0', 'B3.1', 'B3.2',
        'B4.0', 'B4.1',
        'B5.0', 'B5.1', 'B5.2'
      ];
      if (openShopOnly.indexOf(pageId) !== -1) {
        return {
          allowedRoles: ['seller-open', 'admin'],
          recommendedRole: 'seller-open',
          reason: 'Chức năng quản lý đơn hàng, báo giá, sản phẩm và tiền chỉ mở sau khi hồ sơ người bán đã được duyệt và hoàn tất đóng phí mở bán (FR-27).',
          fallbackLink: ROOT + 'b/b1-0.html',
          fallbackText: 'Về trang Tổng quan hồ sơ (B1.0)'
        };
      }
      return {
        allowedRoles: ['seller-pending', 'seller-open', 'admin'],
        recommendedRole: 'seller-pending',
        reason: 'Kênh người bán chỉ dành cho chủ cơ sở sản xuất hoặc chủ gian hàng đã gửi hồ sơ đăng ký. Người mua hoặc khách vãng lai không có quyền truy cập khu vực này.',
        fallbackLink: ROOT + 'm/m7-0.html',
        fallbackText: 'Xem hướng dẫn Bán hàng trên Moonkage (M7.0)'
      };
    }

    // 3. Phân khu Mua hàng (Zone M)
    var nfcPages = ['M3.1', 'M3.4', 'M7.1'];
    if (nfcPages.indexOf(pageId) !== -1) {
      return {
        allowedRoles: ['buyer-nfc', 'seller-open', 'admin'],
        recommendedRole: 'buyer-nfc',
        reason: 'Theo quy định phòng chống gian lận đơn hàng lớn và đăng ký bán hàng (BR-23), bạn cần xác minh danh tính qua thẻ CCCD gắn chip (NFC) trước khi truy cập chức năng này.',
        fallbackLink: ROOT + 'm/m6-4.html?next=' + pageId.toLowerCase().replace('.', '-') + '.html',
        fallbackText: 'Đi tới Xác minh danh tính NFC (M6.4)'
      };
    }

    if (pageId === 'M7.0') {
      return {
        allowedRoles: ['guest', 'buyer', 'buyer-nfc', 'admin'],
        recommendedRole: 'buyer',
        reason: 'Tài khoản của bạn đã là chủ người bán trên hệ thống Moonkage. Vui lòng truy cập Kênh người bán để quản lý hoạt động kinh doanh.',
        fallbackLink: ROOT + 'b/b1-0.html',
        fallbackText: 'Vào Kênh người bán (B1.0)'
      };
    }

    var authRequiredPages = [
      'M4.0', 'M4.1', 'M4.2', 'M4.3',
      'M6.0', 'M6.1', 'M6.1.1', 'M6.1.2', 'M6.1.3',
      'M6.2', 'M6.2.1', 'M6.2.2',
      'M6.3', 'M6.3.1', 'M6.3.2',
      'M6.4', 'M6.5', 'M6.6'
    ];
    if (authRequiredPages.indexOf(pageId) !== -1) {
      return {
        allowedRoles: ['buyer', 'buyer-nfc', 'seller-pending', 'seller-open', 'admin'],
        recommendedRole: 'buyer',
        reason: 'Khu vực quản lý giỏ hàng, đơn hàng, yêu cầu báo giá và thông tin cá nhân yêu cầu tài khoản đã đăng nhập (AC-02.3). Khách chưa đăng nhập không thể xem thông tin này.',
        fallbackLink: ROOT + 'm/m5-1.html?next=' + pageId.toLowerCase().replace('.', '-') + '.html',
        fallbackText: 'Đăng nhập tài khoản ngay (M5.1)'
      };
    }

    return {
      allowedRoles: ['guest', 'buyer', 'buyer-nfc', 'seller-pending', 'seller-open', 'admin'],
      recommendedRole: '',
      reason: ''
    };
  }

  function enforceRoleBoundary(zone, pageId, currentRole) {
    if (!zone || zone === 'INDEX') return true;

    var perm = getPagePermission(pageId, zone);
    var isAllowed = (perm.allowedRoles.indexOf(currentRole) !== -1 || perm.allowedRoles.indexOf('all') !== -1);

    if (isAllowed) return true;

    var mainContent = document.getElementById('content');
    if (!mainContent) return false;

    var allowedNames = perm.allowedRoles.map(function(r) { return getRoleName(r); }).join(', ');
    var currentName = getRoleName(currentRole);

    var boundaryHtml = '<div class="wf-role-boundary">';
    boundaryHtml += '<div class="wf-boundary-box">';
    boundaryHtml += '<div class="wf-boundary-icon">[!] RÀO CHẮN PHÂN QUYỀN (ROLE BOUNDARY)</div>';
    boundaryHtml += '<h2>Truy cập bị giới hạn theo vai trò</h2>';
    boundaryHtml += '<p class="wf-boundary-desc">' + perm.reason + '</p>';
    
    boundaryHtml += '<div class="wf-boundary-meta">';
    boundaryHtml += '<div><strong>Màn hình:</strong> <code>' + pageId + '</code></div>';
    boundaryHtml += '<div><strong>Vai trò được phép xem:</strong> <span style="font-weight:700;">' + allowedNames + '</span></div>';
    boundaryHtml += '<div><strong>Vai trò hiện tại của bạn:</strong> <span style="font-weight:700; text-decoration: underline;">' + currentName + '</span></div>';
    boundaryHtml += '</div>';

    boundaryHtml += '<div class="wf-boundary-actions">';
    if (perm.recommendedRole) {
      boundaryHtml += '<button type="button" class="btn btn-primary" onclick="switchRoleAndReload(\'' + perm.recommendedRole + '\')">';
      boundaryHtml += 'Chuyển sang vai [' + getRoleName(perm.recommendedRole) + '] để thử nghiệm ›';
      boundaryHtml += '</button>';
    }
    if (perm.fallbackLink) {
      boundaryHtml += '<a href="' + perm.fallbackLink + '" class="btn">';
      boundaryHtml += '‹ ' + perm.fallbackText;
      boundaryHtml += '</a>';
    } else {
      boundaryHtml += '<a href="' + ROOT + 'm/m1-0.html" class="btn">';
      boundaryHtml += '‹ Quay về Trang chủ Mua hàng (M1.0)';
      boundaryHtml += '</a>';
    }
    boundaryHtml += '</div>';

    boundaryHtml += '<small style="color: #666; display: block; margin-top: 14px;">';
    boundaryHtml += '* Gợi ý: Trong chế độ thử nghiệm wireframe, bạn có thể chuyển đổi giữa các vai bằng thanh điều khiển ở đáy màn hình hoặc bấm nút phía trên.';
    boundaryHtml += '</small>';

    boundaryHtml += '</div>';
    boundaryHtml += '</div>';

    mainContent.innerHTML = boundaryHtml;
    return false;
  }

  window.switchRoleAndReload = function (newRole) {
    setSavedRole(newRole);
    window.location.reload();
  };

  // Khởi chạy khi DOM sẵn sàng
  document.addEventListener('DOMContentLoaded', function () {
    var zone = document.body.dataset.zone || '';
    var pageId = document.body.dataset.page || '';
    var currentRole = getSavedRole();
    var notesVisible = areNotesVisible();

    if (!notesVisible) {
      document.body.classList.add('hide-notes');
    }

    // Chèn Header & Breadcrumb
    if (zone && zone !== 'INDEX') {
      var headerHtml = buildHeader(zone, pageId, currentRole);
      var breadcrumbHtml = buildBreadcrumb(pageId);
      document.body.insertAdjacentHTML('afterbegin', headerHtml + breadcrumbHtml);

      // Chèn Footer
      var footerHtml = buildFooter(zone);
      if (footerHtml) {
        document.body.insertAdjacentHTML('beforeend', footerHtml);
      }
    }

    // Kiểm tra rào chắn phân quyền vai trò (Role Boundary)
    var isAccessPermitted = enforceRoleBoundary(zone, pageId, currentRole);

    // Chỉ chèn Sidebar tài khoản nếu vai trò hợp lệ
    if (isAccessPermitted && zone === 'M' && pageId.indexOf('M6.') === 0 && pageId !== 'M6.6') {
      attachAccountSidebar(pageId, currentRole);
    }

    // Chèn thanh vai trò cố định
    var roleBarHtml = buildRoleBar(currentRole, notesVisible);
    document.body.insertAdjacentHTML('beforeend', roleBarHtml);

    // Gắn sự kiện đổi vai
    var roleSelect = document.getElementById('wf-role-switcher');
    if (roleSelect) {
      roleSelect.addEventListener('change', function () {
        var newRole = this.value;
        setSavedRole(newRole);
        window.location.reload();
      });
    }

    // Gắn sự kiện bật/tắt ghi chú
    var notesBtn = document.getElementById('wf-notes-toggle');
    if (notesBtn) {
      notesBtn.addEventListener('click', function () {
        var visible = !areNotesVisible();
        setNotesVisible(visible);
        if (visible) {
          document.body.classList.remove('hide-notes');
          this.textContent = '[Ghi chú: BẬT]';
        } else {
          document.body.classList.add('hide-notes');
          this.textContent = '[Ghi chú: TẮT]';
        }
      });
    }

    // Gắn sự kiện Đăng xuất trong menu Tài khoản
    var logoutLink = document.getElementById('wf-logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', function (e) {
        setSavedRole('guest');
      });
    }

    // Xử lý cổng đăng nhập & cổng NFC
    setupGates(currentRole);
    applyRoleVisibility(currentRole);
  });

})();
