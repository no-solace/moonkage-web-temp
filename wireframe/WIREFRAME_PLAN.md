# Moonkage – Kế hoạch dựng wireframe low-fi (HTML, CSS, JS)

> **Dành cho agent (Antigravity).** Đây là toàn bộ đặc tả để dựng wireframe low-fi cho web Moonkage. Chỉ làm những gì ghi ở đây. Gặp điểm mơ hồ thì **dừng và hỏi**, không tự thêm trang, tính năng hay nhãn. Nguồn: kiến trúc thông tin (IA) ngày 23/10/2026, Requirement v1.8.

## 0. Mục tiêu và phạm vi

- Dựng wireframe **low-fi, bấm được** cho 3 khu web: **Mua hàng (M)**, **Kênh người bán (B)**, **Quản trị (Q)**. App Moonkage Verify (V1–V5) đã xong, **không làm**; chỉ đặt một trang giả lập "Mở app để xác minh" ở chỗ cần.
- Mục đích: nhóm thống nhất **bố cục, thứ tự nội dung, điều hướng và luồng** trước khi code React. Không phải giao diện cuối.
- Dùng **HTML + CSS + JS thuần**. Không framework, không bundler, không thư viện ngoài, không CDN. Mở trực tiếp bằng trình duyệt (file://) hoặc Live Server.

## 1. Luật low-fi (bắt buộc)

1. **Chỉ thang xám**: đen, trắng, 3–4 mức xám. Không màu thương hiệu, không token design system, không gradient, không bóng đổ, không bo góc lớn.
2. **Một font hệ thống** (`system-ui`), tối đa 4 cỡ chữ. Không icon font; icon là ô vuông có chữ (`[🔔]` thay bằng `[Thông báo]` hoặc ô 20×20 có `aria-label`).
3. **Ảnh = khung gạch chéo** có nhãn (`Ảnh sản phẩm`). Không dùng ảnh thật.
4. **Chữ thật, không lorem ipsum.** Nhãn menu, nút, tiêu đề lấy đúng mục 4–6 của file này. Dữ liệu mẫu ngắn, hợp lý (tên Shop, quận, giá). Thiếu số liệu thì để placeholder dạng `[SỐ SHOP]`.
5. **Không tuyên bố không kiểm chứng** ("số 1", "10K+ khách hàng"), không lịch mùa / hạn chót mùa, không hoa hồng, **không chat**.
6. **Định dạng:** tiền `245.000đ`; ngày `DD/MM/YYYY`; tên sản phẩm luôn là **Moonkage** (không phải MoonCage).
7. **Ghi chú thiết kế**: mỗi trang có các ô ghi chú (sticky) nêu mã FR/AC và quyết định liên quan, bật/tắt được bằng một nút chung. Ghi chú không thay cho nội dung trang.
8. **Accessible tối thiểu:** dùng `<a href>`, `<button>`, `<label>` + `<input>` thật; mọi trang có `<h1>` đúng tên trang.
9. **Responsive 2 mức:** ≥ 1024px (desktop) và ≤ 480px (phone). Phone: ô tìm kiếm xuống dòng 2, menu cấp 1 vào nút ☰.

## 2. Cấu trúc thư mục

```
wireframe/
├── index.html            # Mục lục: bảng mọi trang (theo khu) + danh sách luồng F1–F7, có link
├── assets/
│   ├── wf.css            # Toàn bộ style low-fi + 6 khuôn trang (T1–T6)
│   ├── wf.js             # Chèn header/footer/menu theo khu, công tắc vai, công tắc ghi chú, breadcrumb
│   └── data.js           # Mảng PAGES (mục 6) và FLOWS (mục 7) – nguồn duy nhất cho index, breadcrumb, menu
├── m/  m1-0.html …       # Khu Mua hàng: tên file = mã trang viết thường, dấu chấm thành gạch (M6.1.1 → m6-1-1.html)
├── b/  b1-0.html …       # Kênh người bán
└── q/  q1-0.html …       # Quản trị
```

Mỗi trang chỉ chứa phần thân. Khung chung do `wf.js` chèn dựa trên thuộc tính của `<body>`:

```html
<body data-zone="M" data-page="M2.0">
  <main id="content"> … nội dung trang … </main>
  <aside class="wf-note" data-ref="AC-14.5">Từ khóa khớp tên đơn vị → khối Đơn vị cung cấp…</aside>
  <script src="../assets/data.js"></script>
  <script src="../assets/wf.js"></script>
</body>
```

### wf.js phải làm

- Chèn **header toàn cục** theo `data-zone` (mục 4), đánh dấu mục đang mở, chèn **breadcrumb** từ cây cha–con trong `PAGES`, chèn **footer** cho khu M.
- **Công tắc vai** cố định góc dưới: `Khách · Người mua · Người mua đã xác minh NFC · Chủ người bán (chờ duyệt) · Chủ người bán (đã mở bán) · Quản trị`. Lưu trong `localStorage` (bọc try/catch). Menu và nút hiện/ẩn theo cột "Ai thấy" và "Điều kiện" (mục 4, 6) bằng `data-show="buyer seller-open …"` trên phần tử.
- **Cổng đăng nhập (AC-02.3):** khi vai là Khách, mọi phần tử có `data-needs-login` khi bấm sẽ sang `m/m5-1.html?next=<trang hiện tại>`; trang đăng nhập có nút "Đăng nhập (giả lập)" quay về `next`.
- **Cổng NFC (BR-23):** phần tử có `data-needs-nfc`, vai chưa xác minh → sang `m/m6-4.html?next=…`.
- **Công tắc ghi chú** bật/tắt mọi `.wf-note`.
- Không gọi mạng, không lưu dữ liệu thật.

## 3. Sáu khuôn trang (T1–T6) – dựng trước, các trang khác ghép từ đây

| Khuôn | Dùng cho | Bố cục |
| --- | --- | --- |
| **T1 Danh sách** | 18 trang (đơn hàng, sản phẩm, hồ sơ chờ duyệt, thông báo…) | Tiêu đề + nút chính bên phải · thanh tab (nếu có) · thanh lọc dạng chip · bảng (desktop) / thẻ (phone) · phân trang · trạng thái rỗng có hướng dẫn |
| **T2 Chi tiết** | 10 trang (chi tiết đơn, hồ sơ…) | Tiêu đề + nhãn trạng thái · khối tóm tắt · tab trong trang (ví dụ Tiến độ / Maket / Thanh toán / Hóa đơn) · cột phải: hành động khả dụng theo trạng thái · khối **Lịch sử** (quản trị: lịch sử nằm trong trang, không có trang nhật ký chung) |
| **T3 Form** | 14 trang | Tiêu đề + mô tả 1 dòng · nhóm trường có `<fieldset>` · lỗi tại trường · nút chính cuối form; form nhiều bước có thanh bước |
| **T4 Trung chuyển** | 5 trang | Tiêu đề · 2–3 thẻ lối vào, mỗi thẻ: tên, 1 dòng "khi nào chọn", điều kiện thật, nút |
| **T5 Bước** | 6 trang (giỏ → thanh toán → kết quả) | Thanh bước · nội dung bước · tóm tắt tiền cột phải · nút tiếp / quay lại |
| **T6 Hộp thoại** | 2 trang | Lớp phủ, tiêu đề, nội dung ngắn, 2 nút |

"Riêng" ở mục 6 = trang có bố cục riêng, dựng sau cùng trong mỗi khu.

## 4. Điều hướng

| Khu | Loại | Thứ tự | Nhãn | Đích | Ai thấy | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- |
| Mua hàng | Toàn cục | 1 | Ô tìm kiếm | M2.0 | Mọi người | Sản phẩm theo khu vực đang chọn; từ khóa khớp tên đơn vị nhận đặt hàng thì trang kết quả có thêm khối Đơn vị cung cấp, tách khỏi danh sách sản phẩm (AC-14.5, Đ2) |
| Mua hàng | Toàn cục | 2 | Mua hàng có sẵn | M2.0 | Mọi người | Chốt theo tree test (Đ1, cây B) |
| Mua hàng | Toàn cục | 3 | Đặt theo yêu cầu ▾ | M3.0 | Mọi người | Chốt theo tree test (Đ1, cây B). Menu con: Tạo yêu cầu báo giá (M3.1), Đơn vị cung cấp (M3.2) |
| Mua hàng | Toàn cục | 4 | Giao tới: [tỉnh/thành] | M1.1 | Mọi người | Thanh tiện ích trên cùng, bên trái |
| Mua hàng | Toàn cục | 5 | Giỏ hàng | M4.0 | Mọi người | Số món. Khách bấm thì sang đăng nhập rồi quay về; không có giỏ của khách (AC-02.3, Đ4) |
| Mua hàng | Toàn cục | 6 | Thông báo | M6.6 | Đã đăng nhập | Chỉ thông báo mua hàng; thông báo cửa hàng ở B7.0, hai hộp tách riêng; có aria-label (Đ7) |
| Mua hàng | Toàn cục | 7 | Tài khoản ▾ / Đăng nhập | M6.0 / M5.1 | | Khách thấy Đăng nhập |
| Mua hàng | Toàn cục | 8 | Bán hàng trên Moonkage / Kênh người bán › / Cửa hàng của bạn › | M7.0 / B1.0 / B1.0 | Mọi người trừ Quản trị | Chưa làm chủ người bán / hồ sơ chờ duyệt / đã mở bán. Không có trong menu Tài khoản ▾. Thanh tiện ích trên cùng, bên phải (cạnh Chính sách mua bán) |
| Menu Tài khoản | Menu | 1 | Tổng quan | M6.0 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 2 | Đơn hàng | M6.1 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 3 | Yêu cầu và báo giá | M6.2 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 4 | Địa chỉ giao hàng | M6.3 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 5 | Xác minh danh tính | M6.4 | Đã đăng nhập | Hiện trạng thái: chưa / đã xác minh |
| Menu Tài khoản | Menu | 6 | Thông tin cá nhân | M6.5 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 7 | Đăng xuất | M5.1 | Đã đăng nhập | |
| Mua hàng | Footer | 1 | Bán hàng trên Moonkage / Kênh người bán / Cửa hàng của bạn | M7.0 / B1.0 | Mọi người | Cùng nhãn với mục 8 thanh menu |
| Mua hàng | Footer | 2 | Chính sách mua bán | M8.0 | Mọi người | Cần xác nhận |
| Kênh người bán | Toàn cục | 1 | Tổng quan | B1.0 | Chủ người bán | |
| Kênh người bán | Toàn cục | 2 | Đơn hàng | B2.0 | Chủ người bán | Ẩn trước khi mở bán |
| Kênh người bán | Toàn cục | 3 | Yêu cầu báo giá | B3.0 | Nhận đặt hàng | Ẩn khi không nhận đặt hàng hoặc trước khi mở bán |
| Kênh người bán | Toàn cục | 4 | Sản phẩm | B4.0 | Có Shop | Ẩn khi không có Shop hoặc trước khi mở bán |
| Kênh người bán | Toàn cục | 5 | Tiền | B5.0 | Chủ người bán | Ẩn trước khi mở bán |
| Kênh người bán | Toàn cục | 6 | Cài đặt bán hàng | B6.0 | Chủ người bán | |
| Kênh người bán | Toàn cục | 7 | Thông báo | B7.0 | Chủ người bán | Hộp riêng của cửa hàng, tách khỏi thông báo mua hàng M6.6 (Đ7) |
| Kênh người bán | Toàn cục | 8 | ↩ Về trang mua hàng | M1.0 | Chủ người bán | |
| Mọi khu | Mẫu | 1 | Cổng đăng nhập | M5.1 → trang cũ | Khách | Thao tác cần tài khoản (thêm vào giỏ, gửi yêu cầu, tạo yêu cầu báo giá, khai hồ sơ người bán): đăng nhập, xác nhận tài khoản hoặc xác minh NFC nếu cần, rồi quay về. Thêm vào giỏ tự thực hiện; form mở lại với dữ liệu đã nhập để người dùng tự gửi (AC-02.3, Đ4) |
| Mọi khu | Mẫu | 2 | Đường dẫn chi tiết đơn | /tai-khoan/don-hang/:orderId · /kenh-ban/don-hang/:orderId | Người mua, Chủ người bán | Một đường dẫn cho hai loại đơn; trang tải đơn rồi chọn template theo loại đơn (Đ6) |
| Quản trị | Cục bộ | 1 | Lịch sử trong trang đối tượng | Q2.1, Q4.1, Q5.1 | Quản trị | Không có trang nhật ký chung; lịch sử duyệt, giải ngân, tiến độ hiện ngay trong trang ra quyết định (Đ5) |
| Quản trị | Toàn cục | 1 | Tổng quan | Q1.0 | Quản trị | |
| Quản trị | Toàn cục | 2 | Người bán | Q2.0 | Quản trị | Số hồ sơ chờ |
| Quản trị | Toàn cục | 3 | Sản phẩm | Q3.0 | Quản trị | |
| Quản trị | Toàn cục | 4 | Tiền | Q4.0 | Quản trị | Số giải ngân + chuyển tiền chờ |
| Quản trị | Toàn cục | 5 | Khiếu nại | Q5.0 | Quản trị | Số khiếu nại mở |
| Quản trị | Toàn cục | 6 | Cấu hình | Q6.0 | Quản trị | |

**Trang chủ M1.0 – năm khối theo thứ tự:** (1) hero là một tấm ảnh 1920×1080 tràn hết bề ngang màn hình (tỉ lệ 16:9), chữ và hai nút Xem hàng có sẵn / Đặt theo yêu cầu đặt trên ảnh; khách chưa chọn nơi giao có dòng Chọn khu vực giao; header, footer khu mua hàng nền trắng · (2) Tìm nhanh: chip vỏ, nhân, giá (bộ lọc M2.0) · (3) "Có sẵn giao tới [tỉnh]" (thẻ có nút Thêm vào giỏ) · (4) "Nhận đặt theo yêu cầu" · (5) "Tiền của bạn đi thế nào" (chỉ quy tắc có trong đặc tả). Bỏ hai thẻ lối vào và "Việc cần bạn" (đã có Thông báo). Không có lịch mùa, hạn chót, khuyến mãi, số liệu không tính từ dữ liệu, ngưỡng chung "30 hộp".

**Dòng mô tả dưới nhãn "Đặt theo yêu cầu"** (menu, thẻ trang chủ, M3.0): "Số lượng lớn, in logo hoặc hàng phải làm riêng, dù ít hộp."

## 5. Nhãn đã chốt (dùng đúng chữ)

| Dùng | Không dùng |
| --- | --- |
| Mua hàng có sẵn / Đặt theo yêu cầu (nhãn cấp 1) | Mua lẻ / Đặt số lượng lớn |
| Tạo yêu cầu báo giá (yêu cầu gửi nhiều nơi) | Yêu cầu mở |
| Gửi yêu cầu cho [tên đơn vị] | Yêu cầu trực tiếp |
| Đơn vị cung cấp | Nhà cung cấp, vendor |
| Yêu cầu và báo giá (menu tài khoản) | Yêu cầu |
| Thông tin cá nhân | Hồ sơ |
| Xác minh danh tính | NFC (trong menu) |
| Bán hàng trên Moonkage / Kênh người bán / Cửa hàng của bạn (cùng một vị trí, đổi theo trạng thái: chưa bán / chờ duyệt / đã mở bán) | Trở thành người bán |
| Báo vấn đề với đơn (nút khiếu nại, chỉ hiện khi còn hạn) | Khiếu nại (trên nút) |

Bộ lọc M2.0: giá (khoảng) · thương hiệu · vỏ bánh · nhân bánh · Shop. Nhiều giá trị trong một bộ lọc = HOẶC; giữa các bộ lọc = VÀ. Sắp xếp: giá, đánh giá. Vùng giao là bộ lọc ngầm, luôn bật.

## 6. Danh sách trang

Cột "Khuôn" cho biết ghép từ khuôn nào ở mục 3. Trang "Hoãn" chỉ làm khung có chữ "Hoãn trong demo".

(Tham khảo bảng mục 6 trong tài liệu đặc tả)

## 7. Luồng phải bấm xuyên suốt

Mỗi luồng phải đi được từ đầu đến cuối chỉ bằng cách bấm link/nút trên wireframe, với đúng vai đã chọn ở công tắc vai. `[ ]` = bước có điều kiện.

| Mã | Luồng | Nhân vật | Đường đi | Nhánh / ngoại lệ |
| --- | --- | --- | --- | --- |
| F1 | Mua hàng có sẵn | Anh Minh; chị Lan buổi tối | M1.0 → M1.1 → M2.0 → M2.1 → M5.1 (nếu là khách, rồi quay về – AC-02.3) → M4.0 → M4.1 → M4.2 → M4.3 → M6.1 → M6.1.1 | Vượt tồn kho/ngưỡng ở M4.0 → F3 (M3.4) |
| F2 | Yêu cầu báo giá có in logo | Chị Lan | M1.0 → M3.0 → M3.1 → [M6.4 nếu chưa xác minh] → M6.2 → M6.2.1 → M6.2.2 → M4.2 → M6.1.2 (Maket, Tiến độ, Thanh toán phần còn lại → M4.2) | Phía người bán: B3.0 → B3.1 → B3.2; B2.2; B5.2. Quản trị: Q4.1 |
| F3 | Gửi yêu cầu cho một đơn vị | Chị Thảo; anh Quân; bạn Vy | M2.0 (khối Đơn vị cung cấp khi gõ tên – AC-14.5) hoặc M3.2 (tìm theo tên – AC-14.6) hoặc M2.1 hoặc M4.0 → M3.3 → M3.4 → [M6.4] → M6.2 → M6.2.1 → nối F2 từ M6.2.2 | Không custom → bỏ tab Maket |
| F4 | Trở thành người bán | Cô Hoa; chị Thảo; anh Quân | M1.0 (thanh menu: Bán hàng trên Moonkage) → M7.0 → [M6.4] → M7.1 → B1.0 (Đang chờ) → Q2.0 → Q2.1 → B1.0 (Đã duyệt) → B1.1 → M4.2 → B6.2 → B4.1 và/hoặc B6.3 | Cần bổ sung → B6.1 nộp lại |
| F5 | Khiếu nại | Người mua; người bán; quản trị | M6.1.1/M6.1.2 (nút Báo vấn đề với đơn, còn hạn) → M6.1.3 → [giữ tiền, báo người bán] → B2.1/B2.2 (xem, phản hồi: đề xuất) → Q5.0 → Q5.1 → [hoàn VNPay nếu có] → M6.6 (người mua) và B7.0 (người bán) → M6.1.3 kết quả → Q4.2 phần còn lại | Quá hạn: nút ẩn. VNPay lỗi → tab Cần xử lý tay (Q5.0). Số hoàn > đang giữ: Q-01 |
| F6 | Xác minh NFC | Mọi người dùng cần đặt hàng hoặc bán | (M3.1 \| M3.4 \| M7.1) → M6.4 → V1 → V2 → V3 → V4 → V5 → M6.4 tự cập nhật → quay lại trang xuất phát | Sai thẻ → V3; khóa sau 5 lần (Q-30 tạm) |
| F7 | Quản lý sản phẩm | Anh Quân | B4.0 → B4.1 (đăng / sửa) → B4.0 (ẩn / hiện); Quản trị: Q3.0 gỡ | Bị gỡ → B4.1 chỉ xem |

## 8. Thứ tự làm và tiêu chí xong

Làm **từng giai đoạn**; hết giai đoạn thì dừng, báo danh sách file đã tạo và chờ duyệt.

| Giai đoạn | Việc | Xong khi |
| --- | --- | --- |
| 1. Nền | `wf.css`, `wf.js`, `data.js` (chép mục 6–7), `index.html` | Index liệt kê đủ trang và luồng; đổi vai thì menu đổi; ghi chú bật/tắt được |
| 2. Khuôn | Một trang mẫu cho mỗi khuôn T1–T6: M6.1 (T1), M6.1.2 (T2), M3.1 (T3), M3.0 (T4), M4.0→M4.3 (T5), M1.1 Chọn khu vực giao (T6) | Sáu khuôn đúng mục 3, chạy được ở 2 mức màn hình |
| 3. Luồng F1 | M1.0, M1.1, M2.0, M2.1, M5.1, M4.0–M4.3, M6.1, M6.1.1 | Bấm hết F1 với vai Khách (qua cổng đăng nhập rồi quay về) và vai Người mua |
| 4. Luồng F2, F3 | M3.0–M3.4, M6.2, M6.2.1, M6.2.2, M6.1.2, M6.4, B3.0–B3.2 | Bấm hết F2, F3; cổng NFC hoạt động; M2.0 có khối "Đơn vị cung cấp" khi tìm theo tên |
| 5. Luồng F4, F7 | M7.0, M7.1, B1.0, B1.1, B4.0, B4.1, B6.x, Q2.0, Q2.1, Q3.0 | Bấm hết F4 (chờ duyệt → duyệt → đóng phí → mở bán) và F7 |
| 6. Luồng F5 và phần còn lại | M6.1.3, B2.x, B5.x, Q1.0, Q4.x, Q5.x, Q6.x, M6.6, các trang còn lại | Mọi trang trong mục 6 có file; không còn link chết (link tới trang chưa làm phải ghi rõ "Chưa làm") |

# Moonkage – Kế hoạch dựng wireframe low-fi (HTML, CSS, JS)

> **Dành cho agent (Antigravity).** Đây là toàn bộ đặc tả để dựng wireframe low-fi cho web Moonkage. Chỉ làm những gì ghi ở đây. Gặp điểm mơ hồ thì **dừng và hỏi**, không tự thêm trang, tính năng hay nhãn. Nguồn: kiến trúc thông tin (IA) ngày 23/10/2026, Requirement v1.8.

## 0. Mục tiêu và phạm vi

- Dựng wireframe **low-fi, bấm được** cho 3 khu web: **Mua hàng (M)**, **Kênh người bán (B)**, **Quản trị (Q)**. App Moonkage Verify (V1–V5) đã xong, **không làm**; chỉ đặt một trang giả lập "Mở app để xác minh" ở chỗ cần.
- Mục đích: nhóm thống nhất **bố cục, thứ tự nội dung, điều hướng và luồng** trước khi code React. Không phải giao diện cuối.
- Dùng **HTML + CSS + JS thuần**. Không framework, không bundler, không thư viện ngoài, không CDN. Mở trực tiếp bằng trình duyệt (file://) hoặc Live Server.

## 1. Luật low-fi (bắt buộc)

1. **Chỉ thang xám**: đen, trắng, 3–4 mức xám. Không màu thương hiệu, không token design system, không gradient, không bóng đổ, không bo góc lớn.
2. **Một font hệ thống** (`system-ui`), tối đa 4 cỡ chữ. Không icon font; icon là ô vuông có chữ (`[🔔]` thay bằng `[Thông báo]` hoặc ô 20×20 có `aria-label`).
3. **Ảnh = khung gạch chéo** có nhãn (`Ảnh sản phẩm`). Không dùng ảnh thật.
4. **Chữ thật, không lorem ipsum.** Nhãn menu, nút, tiêu đề lấy đúng mục 4–6 của file này. Dữ liệu mẫu ngắn, hợp lý (tên Shop, quận, giá). Thiếu số liệu thì để placeholder dạng `[SỐ SHOP]`.
5. **Không tuyên bố không kiểm chứng** ("số 1", "10K+ khách hàng"), không lịch mùa / hạn chót mùa, không hoa hồng, **không chat**.
6. **Định dạng:** tiền `245.000đ`; ngày `DD/MM/YYYY`; tên sản phẩm luôn là **Moonkage** (không phải MoonCage).
7. **Ghi chú thiết kế**: mỗi trang có các ô ghi chú (sticky) nêu mã FR/AC và quyết định liên quan, bật/tắt được bằng một nút chung. Ghi chú không thay cho nội dung trang.
8. **Accessible tối thiểu:** dùng `<a href>`, `<button>`, `<label>` + `<input>` thật; mọi trang có `<h1>` đúng tên trang.
9. **Responsive 2 mức:** ≥ 1024px (desktop) và ≤ 480px (phone). Phone: ô tìm kiếm xuống dòng 2, menu cấp 1 vào nút ☰.

## 2. Cấu trúc thư mục

```
wireframe/
├── index.html            # Mục lục: bảng mọi trang (theo khu) + danh sách luồng F1–F7, có link
├── assets/
│   ├── wf.css            # Toàn bộ style low-fi + 6 khuôn trang (T1–T6)
│   ├── wf.js             # Chèn header/footer/menu theo khu, công tắc vai, công tắc ghi chú, breadcrumb
│   └── data.js           # Mảng PAGES (mục 6) và FLOWS (mục 7) – nguồn duy nhất cho index, breadcrumb, menu
├── m/  m1-0.html …       # Khu Mua hàng: tên file = mã trang viết thường, dấu chấm thành gạch (M6.1.1 → m6-1-1.html)
├── b/  b1-0.html …       # Kênh người bán
└── q/  q1-0.html …       # Quản trị
```

Mỗi trang chỉ chứa phần thân. Khung chung do `wf.js` chèn dựa trên thuộc tính của `<body>`:

```html
<body data-zone="M" data-page="M2.0">
  <main id="content"> … nội dung trang … </main>
  <aside class="wf-note" data-ref="AC-14.5">Từ khóa khớp tên đơn vị → khối Đơn vị cung cấp…</aside>
  <script src="../assets/data.js"></script>
  <script src="../assets/wf.js"></script>
</body>
```

### wf.js phải làm

- Chèn **header toàn cục** theo `data-zone` (mục 4), đánh dấu mục đang mở, chèn **breadcrumb** từ cây cha–con trong `PAGES`, chèn **footer** cho khu M.
- **Công tắc vai** cố định góc dưới: `Khách · Người mua · Người mua đã xác minh NFC · Chủ người bán (chờ duyệt) · Chủ người bán (đã mở bán) · Quản trị`. Lưu trong `localStorage` (bọc try/catch). Menu và nút hiện/ẩn theo cột "Ai thấy" và "Điều kiện" (mục 4, 6) bằng `data-show="buyer seller-open …"` trên phần tử.
- **Cổng đăng nhập (AC-02.3):** khi vai là Khách, mọi phần tử có `data-needs-login` khi bấm sẽ sang `m/m5-1.html?next=<trang hiện tại>`; trang đăng nhập có nút "Đăng nhập (giả lập)" quay về `next`.
- **Cổng NFC (BR-23):** phần tử có `data-needs-nfc`, vai chưa xác minh → sang `m/m6-4.html?next=…`.
- **Công tắc ghi chú** bật/tắt mọi `.wf-note`.
- Không gọi mạng, không lưu dữ liệu thật.

## 3. Sáu khuôn trang (T1–T6) – dựng trước, các trang khác ghép từ đây

| Khuôn | Dùng cho | Bố cục |
| --- | --- | --- |
| **T1 Danh sách** | 18 trang (đơn hàng, sản phẩm, hồ sơ chờ duyệt, thông báo…) | Tiêu đề + nút chính bên phải · thanh tab (nếu có) · thanh lọc dạng chip · bảng (desktop) / thẻ (phone) · phân trang · trạng thái rỗng có hướng dẫn |
| **T2 Chi tiết** | 10 trang (chi tiết đơn, hồ sơ…) | Tiêu đề + nhãn trạng thái · khối tóm tắt · tab trong trang (ví dụ Tiến độ / Maket / Thanh toán / Hóa đơn) · cột phải: hành động khả dụng theo trạng thái · khối **Lịch sử** (quản trị: lịch sử nằm trong trang, không có trang nhật ký chung) |
| **T3 Form** | 14 trang | Tiêu đề + mô tả 1 dòng · nhóm trường có `<fieldset>` · lỗi tại trường · nút chính cuối form; form nhiều bước có thanh bước |
| **T4 Trung chuyển** | 5 trang | Tiêu đề · 2–3 thẻ lối vào, mỗi thẻ: tên, 1 dòng "khi nào chọn", điều kiện thật, nút |
| **T5 Bước** | 6 trang (giỏ → thanh toán → kết quả) | Thanh bước · nội dung bước · tóm tắt tiền cột phải · nút tiếp / quay lại |
| **T6 Hộp thoại** | 2 trang | Lớp phủ, tiêu đề, nội dung ngắn, 2 nút |

"Riêng" ở mục 6 = trang có bố cục riêng, dựng sau cùng trong mỗi khu.

## 4. Điều hướng

| Khu | Loại | Thứ tự | Nhãn | Đích | Ai thấy | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- |
| Mua hàng | Toàn cục | 1 | Ô tìm kiếm | M2.0 | Mọi người | Sản phẩm theo khu vực đang chọn; từ khóa khớp tên đơn vị nhận đặt hàng thì trang kết quả có thêm khối Đơn vị cung cấp, tách khỏi danh sách sản phẩm (AC-14.5, Đ2) |
| Mua hàng | Toàn cục | 2 | Mua hàng có sẵn | M2.0 | Mọi người | Chốt theo tree test (Đ1, cây B) |
| Mua hàng | Toàn cục | 3 | Đặt theo yêu cầu ▾ | M3.0 | Mọi người | Chốt theo tree test (Đ1, cây B). Menu con: Tạo yêu cầu báo giá (M3.1), Đơn vị cung cấp (M3.2) |
| Mua hàng | Toàn cục | 4 | Giao tới: [tỉnh/thành] | M1.1 | Mọi người | Thanh tiện ích trên cùng, bên trái |
| Mua hàng | Toàn cục | 5 | Giỏ hàng | M4.0 | Mọi người | Số món. Khách bấm thì sang đăng nhập rồi quay về; không có giỏ của khách (AC-02.3, Đ4) |
| Mua hàng | Toàn cục | 6 | Thông báo | M6.6 | Đã đăng nhập | Chỉ thông báo mua hàng; thông báo cửa hàng ở B7.0, hai hộp tách riêng; có aria-label (Đ7) |
| Mua hàng | Toàn cục | 7 | Tài khoản ▾ / Đăng nhập | M6.0 / M5.1 | | Khách thấy Đăng nhập |
| Mua hàng | Toàn cục | 8 | Bán hàng trên Moonkage / Kênh người bán › / Cửa hàng của bạn › | M7.0 / B1.0 / B1.0 | Mọi người trừ Quản trị | Chưa làm chủ người bán / hồ sơ chờ duyệt / đã mở bán. Không có trong menu Tài khoản ▾. Thanh tiện ích trên cùng, bên phải (cạnh Chính sách mua bán) |
| Menu Tài khoản | Menu | 1 | Tổng quan | M6.0 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 2 | Đơn hàng | M6.1 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 3 | Yêu cầu và báo giá | M6.2 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 4 | Địa chỉ giao hàng | M6.3 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 5 | Xác minh danh tính | M6.4 | Đã đăng nhập | Hiện trạng thái: chưa / đã xác minh |
| Menu Tài khoản | Menu | 6 | Thông tin cá nhân | M6.5 | Đã đăng nhập | |
| Menu Tài khoản | Menu | 7 | Đăng xuất | M5.1 | Đã đăng nhập | |
| Mua hàng | Footer | 1 | Bán hàng trên Moonkage / Kênh người bán / Cửa hàng của bạn | M7.0 / B1.0 | Mọi người | Cùng nhãn với mục 8 thanh menu |
| Mua hàng | Footer | 2 | Chính sách mua bán | M8.0 | Mọi người | Cần xác nhận |
| Kênh người bán | Toàn cục | 1 | Tổng quan | B1.0 | Chủ người bán | |
| Kênh người bán | Toàn cục | 2 | Đơn hàng | B2.0 | Chủ người bán | Ẩn trước khi mở bán |
| Kênh người bán | Toàn cục | 3 | Yêu cầu báo giá | B3.0 | Nhận đặt hàng | Ẩn khi không nhận đặt hàng hoặc trước khi mở bán |
| Kênh người bán | Toàn cục | 4 | Sản phẩm | B4.0 | Có Shop | Ẩn khi không có Shop hoặc trước khi mở bán |
| Kênh người bán | Toàn cục | 5 | Tiền | B5.0 | Chủ người bán | Ẩn trước khi mở bán |
| Kênh người bán | Toàn cục | 6 | Cài đặt bán hàng | B6.0 | Chủ người bán | |
| Kênh người bán | Toàn cục | 7 | Thông báo | B7.0 | Chủ người bán | Hộp riêng của cửa hàng, tách khỏi thông báo mua hàng M6.6 (Đ7) |
| Kênh người bán | Toàn cục | 8 | ↩ Về trang mua hàng | M1.0 | Chủ người bán | |
| Mọi khu | Mẫu | 1 | Cổng đăng nhập | M5.1 → trang cũ | Khách | Thao tác cần tài khoản (thêm vào giỏ, gửi yêu cầu, tạo yêu cầu báo giá, khai hồ sơ người bán): đăng nhập, xác nhận tài khoản hoặc xác minh NFC nếu cần, rồi quay về. Thêm vào giỏ tự thực hiện; form mở lại với dữ liệu đã nhập để người dùng tự gửi (AC-02.3, Đ4) |
| Mọi khu | Mẫu | 2 | Đường dẫn chi tiết đơn | /tai-khoan/don-hang/:orderId · /kenh-ban/don-hang/:orderId | Người mua, Chủ người bán | Một đường dẫn cho hai loại đơn; trang tải đơn rồi chọn template theo loại đơn. Mọi liên kết tới đơn chỉ cần mã đơn (Đ6) |
| Quản trị | Cục bộ | 1 | Lịch sử trong trang đối tượng | Q2.1, Q4.1, Q5.1 | Quản trị | Không có trang nhật ký chung; lịch sử duyệt, giải ngân, tiến độ hiện ngay trong trang ra quyết định (Đ5) |
| Quản trị | Toàn cục | 1 | Tổng quan | Q1.0 | Quản trị | |
| Quản trị | Toàn cục | 2 | Người bán | Q2.0 | Quản trị | Số hồ sơ chờ |
| Quản trị | Toàn cục | 3 | Sản phẩm | Q3.0 | Quản trị | |
| Quản trị | Toàn cục | 4 | Tiền | Q4.0 | Quản trị | Số giải ngân + chuyển tiền chờ |
| Quản trị | Toàn cục | 5 | Khiếu nại | Q5.0 | Quản trị | Số khiếu nại mở |
| Quản trị | Toàn cục | 6 | Cấu hình | Q6.0 | Quản trị | |

**Trang chủ M1.0 – năm khối theo thứ tự:** (1) hero là một tấm ảnh 1920×1080 tràn hết bề ngang màn hình (tỉ lệ 16:9), chữ và hai nút Xem hàng có sẵn / Đặt theo yêu cầu đặt trên ảnh; khách chưa chọn nơi giao có dòng Chọn khu vực giao; header, footer khu mua hàng nền trắng · (2) Tìm nhanh: chip vỏ, nhân, giá (bộ lọc M2.0) · (3) "Có sẵn giao tới [tỉnh]" (thẻ có nút Thêm vào giỏ) · (4) "Nhận đặt theo yêu cầu" · (5) "Tiền của bạn đi thế nào" (chỉ quy tắc có trong đặc tả). Bỏ hai thẻ lối vào và "Việc cần bạn" (đã có Thông báo). Không có lịch mùa, hạn chót, khuyến mãi, số liệu không tính từ dữ liệu, ngưỡng chung "30 hộp".

**Dòng mô tả dưới nhãn "Đặt theo yêu cầu"** (menu, thẻ trang chủ, M3.0): "Số lượng lớn, in logo hoặc hàng phải làm riêng, dù ít hộp."

## 5. Nhãn đã chốt (dùng đúng chữ)

| Dùng | Không dùng |
| --- | --- |
| Mua hàng có sẵn / Đặt theo yêu cầu (nhãn cấp 1) | Mua lẻ / Đặt số lượng lớn |
| Tạo yêu cầu báo giá (yêu cầu gửi nhiều nơi) | Yêu cầu mở |
| Gửi yêu cầu cho [tên đơn vị] | Yêu cầu trực tiếp |
| Đơn vị cung cấp | Nhà cung cấp, vendor |
| Yêu cầu và báo giá (menu tài khoản) | Yêu cầu |
| Thông tin cá nhân | Hồ sơ |
| Xác minh danh tính | NFC (trong menu) |
| Bán hàng trên Moonkage / Kênh người bán / Cửa hàng của bạn (cùng một vị trí, đổi theo trạng thái: chưa bán / chờ duyệt / đã mở bán) | Trở thành người bán |
| Báo vấn đề với đơn (nút khiếu nại, chỉ hiện khi còn hạn) | Khiếu nại (trên nút) |

Bộ lọc M2.0: giá (khoảng) · thương hiệu · vỏ bánh · nhân bánh · Shop. Nhiều giá trị trong một bộ lọc = HOẶC; giữa các bộ lọc = VÀ. Sắp xếp: giá, đánh giá. Vùng giao là bộ lọc ngầm, luôn bật.

## 6. Danh sách trang

Cột "Khuôn" cho biết ghép từ khuôn nào ở mục 3. Trang "Hoãn" chỉ làm khung có chữ "Hoãn trong demo".

### M – Mua hàng

| ID | File | Tên trang | Khuôn | Đường dẫn (React sau này) | Ai thấy | Điều kiện | FR | Demo | Luồng | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1.0 | m/m1-0.html | Trang chủ | Riêng | / | Khách, Người mua | | FR-05, FR-06, FR-14, FR-16 (lối vào) | Làm trọn | F1, F2, F3 | Năm khối theo thứ tự (Đ3): 1 hero là một tấm ảnh 1920×1080 tràn màn hình, chữ và hai nút trên ảnh (khách chưa chọn nơi giao có dòng Chọn khu vực giao, AC-05.3) · 2 Tìm nhanh (chip bộ lọc M2.0) · 3 'Có sẵn giao tới [tỉnh]' (nút Thêm vào giỏ) · 4 'Nhận đặt theo yêu cầu' · 5 'Tiền của bạn đi thế nào'. Bỏ hai thẻ lối vào và 'Việc cần bạn' (đã có Thông báo). Không có: lịch mùa, hạn chót, khuyến mãi, số liệu không tính từ dữ liệu, ngưỡng chung '30 hộp' |
| M1.1 | m/m1-1.html | Chọn khu vực giao | T6 Hộp thoại | (hộp thoại) | Khách, Người mua | Mở trước khi hiện sản phẩm nếu chưa có khu vực | FR-03, FR-05 (AC-05.3) | Làm trọn | F1 | Người đã đăng nhập chọn từ địa chỉ đã lưu; khách chọn tỉnh/thành |
| M2.0 | m/m2-0.html | Mua hàng có sẵn | T1 Danh sách | /san-pham | Khách, Người mua | | FR-06, AC-14.5 | Làm trọn | F1, F3 | Nhãn chốt theo tree test (Đ1, cây B). Lọc giá, thương hiệu, vỏ bánh, nhân bánh, Shop (chọn nhiều trong một bộ lọc = HOẶC); sắp xếp giá, đánh giá. Từ khóa khớp tên đơn vị nhận đặt hàng → khối 'Đơn vị cung cấp' tách khỏi danh sách sản phẩm, không lọc vùng giao (AC-14.5, /api/suppliers?q=). Không có kết quả → gợi ý bỏ lọc + lối Tạo yêu cầu báo giá |
| M2.1 | m/m2-1.html | Chi tiết sản phẩm | T2 Chi tiết | /san-pham/:productId | Khách, Người mua | Chủ của Shop: nhãn "Sản phẩm của bạn", không có nút mua (BR-22) | FR-07, FR-08 | Làm trọn | F1, F3 | Có lối "Gửi yêu cầu cho Shop này" nếu người bán nhận đặt hàng |
| M3.0 | m/m3-0.html | Đặt theo yêu cầu | T4 Trung chuyển | /dat-theo-yeu-cau | Khách, Người mua | | FR-14, FR-16 | Làm trọn | F2, F3 | Nhãn chốt theo tree test (Đ1, cây B). Dòng mô tả dưới nhãn: số lượng lớn, in logo hoặc hàng phải làm riêng, dù ít hộp. Giải thích 2 cách: gửi nhiều nơi (yêu cầu báo giá) hoặc chọn một đơn vị |
| M3.1 | m/m3-1.html | Tạo yêu cầu báo giá | T3 Form | /dat-theo-yeu-cau/yeu-cau-moi | Người mua đã xác minh NFC | Chưa xác minh → M6.4 rồi quay lại | FR-16 | Làm trọn | F2 | Chính là yêu cầu mở. Không có người bán phù hợp → gợi ý chỉnh số lượng, custom, hạn giao |
| M3.2 | m/m3-2.html | Đơn vị cung cấp | T1 Danh sách | /don-vi-cung-cap | Khách, Người mua | | FR-14 (AC-14.3, AC-14.6) | Làm trọn | F3 | Ô tìm theo tên (AC-14.6). Gồm cả người bán chỉ nhận đặt hàng (nhãn 'Chỉ nhận đặt hàng') |
| M3.3 | m/m3-3.html | Trang đơn vị cung cấp | T2 Chi tiết | /don-vi-cung-cap/:vendorId | Khách, Người mua | Tab "Hàng có sẵn" chỉ khi có Shop; tab "Nhận đặt hàng" chỉ khi nhận đặt hàng | FR-14, AC-34.1 | Làm trọn | F1, F3 | Gộp "trang Shop" và "hồ sơ nhận đặt hàng" vào một trang hai tab |
| M3.4 | m/m3-4.html | Gửi yêu cầu cho đơn vị | T3 Form | /don-vi-cung-cap/:vendorId/yeu-cau | Người mua đã xác minh NFC | Chủ của người bán không thấy lối vào (BR-22) | FR-15 | Làm trọn | F3 | Chính là yêu cầu trực tiếp. Lối vào từ M2.1, M3.3 và giỏ hàng vượt ngưỡng (AC-08.2) |
| M4.0 | m/m4-0.html | Giỏ hàng | T5 Bước | /gio-hang | Người mua | Không có giỏ của khách: khách bấm thêm vào giỏ → đăng nhập, rồi tự thêm và quay về (AC-02.3) | FR-08, AC-02.3 | Làm trọn | F1 | Tách theo Shop, phí giao từng Shop. Giỏ thuộc tài khoản (root Cart) và BR-22 kiểm ngay lúc thêm (Đ4) |
| M4.1 | m/m4-1.html | Thanh toán | T5 Bước | /thanh-toan | Người mua | | FR-09, FR-24, FR-13 (hoãn) | Làm trọn | F1 | Địa chỉ, xuất hóa đơn doanh nghiệp (nhập một lần cho mọi đơn), phí giao. Ô voucher ẩn trong demo |
| M4.2 | m/m4-2.html | Cổng VNPay | Giả lập | (VNPay sandbox) | Người mua | | FR-09, FR-19, FR-22, FR-27 | Làm trọn | F1, F2, F4 | Dùng chung cho mua lẻ, cọc, phần còn lại, phí mở bán |
| M4.3 | m/m4-3.html | Kết quả thanh toán | T5 Bước | /thanh-toan/ket-qua | Người mua | | FR-09 (AC-09.7), BR-25 | Làm trọn | F1 | Hiện N đơn vừa tạo, nhóm theo lần thanh toán; chỉ hiển thị, không đổi trạng thái |
| M5.1 | m/m5-1.html | Đăng nhập | Riêng | /dang-nhap | Khách | | FR-02, AC-02.3 | Làm trọn | — | Cổng đăng nhập: nhận trang quay về và thao tác đang dở; xác nhận tài khoản (M5.3) hoặc xác minh NFC (M6.4) trước nếu cần (AC-02.3) |
| M5.2 | m/m5-2.html | Đăng ký | T3 Form | /dang-ky | Khách | | FR-01 | Đơn giản | — | Demo chỉ email (A-17) |
| M5.3 | m/m5-3.html | Xác nhận tài khoản | T5 Bước | /dang-ky/xac-nhan | Khách | | FR-01 | Đơn giản | — | |
| M5.4 | m/m5-4.html | Quên mật khẩu | T3 Form | /quen-mat-khau | Khách | | FR-02 | Làm trọn | — | |
| M5.5 | m/m5-5.html | Đặt lại mật khẩu | T3 Form | /dat-lai-mat-khau | Khách | | FR-02 | Làm trọn | — | |
| M6.0 | m/m6-0.html | Tài khoản của tôi | Riêng | /tai-khoan | Người mua | | FR-02 (AC-02.2) | Làm trọn | F2 | Khối "Việc cần bạn": maket chờ duyệt, báo giá mới, phần còn lại cần trả. Menu theo bảng nhãn |
| M6.1 | m/m6-1.html | Đơn hàng | T1 Danh sách | /tai-khoan/don-hang | Người mua | | FR-10 (AC-10.3), FR-02 | Làm trọn | F1, F2 | Hai tab: Mua hàng có sẵn (nhóm theo lần thanh toán) · Đặt theo yêu cầu |
| M6.1.1 | m/m6-1-1.html | Chi tiết đơn hàng có sẵn | T2 Chi tiết | /tai-khoan/don-hang/:orderId | Người mua | | FR-10, FR-11, FR-25 | Làm trọn | F1, F5 | Trạng thái, mã vận đơn, xác nhận đã nhận, đánh giá, tải hóa đơn, lối khiếu nại Cùng đường dẫn với M6.1.2: trang tải đơn rồi chọn template theo loại đơn (Đ6) |
| M6.1.2 | m/m6-1-2.html | Chi tiết đơn đặt hàng | T2 Chi tiết | /tai-khoan/don-hang/:orderId | Người mua | | FR-20, FR-21, FR-22, FR-25, FR-23 (hoãn) | Làm trọn | F2, F3, F5 | Tab: Tiến độ · Maket · Thanh toán · Hóa đơn. Nút "Đặt lại" ẩn trong demo Cùng đường dẫn với M6.1.1, chọn template theo loại đơn (Đ6) |
| M6.1.3 | m/m6-1-3.html | Khiếu nại của đơn | T3 Form | /tai-khoan/don-hang/:orderId/khieu-nai | Người mua | Nút "Báo vấn đề với đơn" chỉ hiện khi đã giao và còn hạn (3 ngày nội thành, 7 ngày liên tỉnh / đặt hàng, Q-10 tạm) | FR-12, FR-49 (kết quả) | Làm trọn | F5 | Chưa có khiếu nại: form lý do, mô tả, ảnh. Đã có: trạng thái, quyết định, số tiền hoàn. Lối vào từ M6.1.1 và M6.1.2 |
| M6.2 | m/m6-2.html | Yêu cầu và báo giá | T1 Danh sách | /tai-khoan/yeu-cau | Người mua | | FR-15, FR-16 (AC-16.3) | Làm trọn | F2, F3 | Cột loại: "Gửi nhiều nơi" / "Gửi riêng [đơn vị]"; số người bán được mời, số báo giá |
| M6.2.1 | m/m6-2-1.html | Chi tiết yêu cầu và so sánh báo giá | T2 Chi tiết | /tai-khoan/yeu-cau/:requestId | Người mua | | FR-17, FR-18 (hoãn) | Làm trọn | F2, F3 | Bảng báo giá cạnh nhau. Yêu cầu đã chốt → liên kết sang đơn đặt hàng |
| M6.2.2 | m/m6-2-2.html | Chấp nhận báo giá và đặt cọc | T5 Bước | /tai-khoan/yeu-cau/:requestId/dat-coc | Người mua | | FR-19, FR-24 | Làm trọn | F2, F3 | |
| M6.3 | m/m6-3.html | Địa chỉ giao hàng | Riêng | /tai-khoan/dia-chi | Người mua | | FR-03 | Làm trọn | — | |
| M6.3.1 | m/m6-3-1.html | Thêm / sửa địa chỉ | T3 Form | /tai-khoan/dia-chi/:addressId | Người mua | | FR-03 | Làm trọn | — | |
| M6.3.2 | m/m6-3-2.html | Xóa địa chỉ | T6 Hộp thoại | (hộp thoại) | Người mua | | FR-03 | Làm trọn | — | |
| M6.4 | m/m6-4.html | Xác minh danh tính | Riêng | /tai-khoan/xac-minh | Người mua | Cũng mở như bước chen từ M3.1, M3.4, M7.1 | FR-04 | Làm trọn | F6 | Mã QR, trạng thái phiên; xong tự quay về bước đang làm |
| M6.5 | m/m6-5.html | Thông tin cá nhân | Riêng | /tai-khoan/thong-tin | Người mua | | FR-02, AC-04.12 | Làm trọn | — | Họ tên, email, trạng thái xác minh, số định danh đã che |
| M6.6 | m/m6-6.html | Thông báo | T1 Danh sách | /thong-bao | Người mua, Chủ người bán | | NFR-10, AC-10.2, AC-21.2 | Đơn giản | F1–F5 | Chỉ thông báo mua hàng (Đ7, tách hai hộp): chuông ở thanh trên khu mua hàng. Thông báo cửa hàng ở B7.0. Giữ mã M6.6 dù không nằm dưới Tài khoản |
| M7.0 | m/m7-0.html | Bán hàng trên Moonkage | Riêng | /ban-hang/gioi-thieu | Khách, Người mua | Ẩn khi tài khoản đã làm chủ người bán | AC-26.4, AC-26.9 | Làm trọn | F4 | Điều kiện, hai cách bán, phí 200.000đ đóng sau khi duyệt; công ty liên hệ đội vận hành (BR-33) |
| M7.1 | m/m7-1.html | Khai hồ sơ người bán | T3 Form (nhiều bước) | /ban-hang/dang-ky | Người mua đã xác minh NFC | Chưa xác minh → M6.4 | FR-26, BR-27, BR-33 | Làm trọn | F4 | Bước: loại hình (HKD/DNTN) → đơn vị → chủ hộ → giấy tờ → nguồn hàng, cách bán → xem lại |
| M8.0 | m/m8-0.html | Chính sách mua bán | Riêng | /chinh-sach | Khách, Người mua | | (ngoài Requirement) | Cần xác nhận | — | Thời hạn khiếu nại, giữ tiền, giao liên tỉnh. Cần nhóm duyệt trước khi thêm |

### B – Kênh người bán

| ID | File | Tên trang | Khuôn | Đường dẫn (React sau này) | Ai thấy | Điều kiện | FR | Demo | Luồng | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B1.0 | b/b1-0.html | Tổng quan | Riêng | /kenh-ban | Chủ người bán | Trước khi mở bán: chỉ hiện trạng thái hồ sơ và phí | FR-27 | Làm trọn | F4 | Việc cần làm: đơn mới, yêu cầu mới, maket bị yêu cầu sửa, đơn chưa có hóa đơn |
| B1.1 | b/b1-1.html | Đóng phí mở bán | T5 Bước | /kenh-ban/phi-mo-ban | Chủ người bán | Hồ sơ đã duyệt, chưa đóng phí | FR-27 (AC-27.4, 27.5), FR-53 | Làm trọn | F4 | → VNPay (M4.2) |
| B2.0 | b/b2-0.html | Đơn hàng | T1 Danh sách | /kenh-ban/don-hang | Chủ người bán | Tab theo cách bán đã bật | FR-32, FR-44 (AC-44.3) | Làm trọn | F1, F2 | Tab: Đơn Shop · Đơn đặt hàng. Lọc "Chưa có hóa đơn". Nhãn "Đang khiếu nại" trên dòng đơn |
| B2.1 | b/b2-1.html | Chi tiết đơn Shop | T2 Chi tiết | /kenh-ban/don-hang/:orderId | Chủ người bán | Có Shop | FR-32, FR-44 | Làm trọn | F1 | Xác nhận → Đang giao (mã vận đơn nếu liên tỉnh) → Đã giao; gắn hóa đơn; khối Khiếu nại (xem, gửi phản hồi: đề xuất) Cùng đường dẫn với B2.2, chọn template theo loại đơn (Đ6) |
| B2.2 | b/b2-2.html | Chi tiết đơn đặt hàng | T2 Chi tiết | /kenh-ban/don-hang/:orderId | Chủ người bán | Nhận đặt hàng | FR-39, FR-40, FR-41, FR-42, FR-44 | Làm trọn | F2, F3 | Tab: Maket · Tiến độ · Giải ngân · Hóa đơn; khối Khiếu nại khi có Cùng đường dẫn với B2.1, chọn template theo loại đơn (Đ6) |
| B3.0 | b/b3-0.html | Yêu cầu báo giá | T1 Danh sách | /kenh-ban/yeu-cau | Chủ người bán | Nhận đặt hàng | FR-36 | Làm trọn | F2, F3 | Tab: Mới · Đã báo giá · Đã đóng. Gộp yêu cầu riêng và lời mời |
| B3.1 | b/b3-1.html | Chi tiết yêu cầu | T2 Chi tiết | /kenh-ban/yeu-cau/:requestId | Chủ người bán | | FR-36, FR-38 (AC-38.3) | Làm trọn | F2, F3 | Từ chối kèm lý do; thu hồi báo giá đã gửi |
| B3.2 | b/b3-2.html | Soạn báo giá | T3 Form | /kenh-ban/yeu-cau/:requestId/bao-gia | Chủ người bán | | FR-38, FR-37 (hoãn) | Làm trọn | F2, F3 | Đơn giá gợi ý theo bậc giá; cảnh báo công suất hoãn |
| B4.0 | b/b4-0.html | Sản phẩm | T1 Danh sách | /kenh-ban/san-pham | Chủ người bán | Có Shop | FR-30, FR-34 | Làm trọn | F7 | Tab: Đang bán · Đang ẩn · Bị gỡ. Không có thao tác xóa |
| B4.1 | b/b4-1.html | Thêm / sửa sản phẩm | T3 Form | /kenh-ban/san-pham/:productId | Chủ người bán | Sản phẩm bị gỡ: chỉ xem | FR-29, FR-30, FR-31, FR-33 | Làm trọn | F7 | Chọn ít nhất một vỏ, một nhân (nhiều được) từ danh mục; để trống thương hiệu thì lấy tên đơn vị (trừ người bán thuần bán lại) |
| B5.0 | b/b5-0.html | Tiền | T4 Trung chuyển | /kenh-ban/tien | Chủ người bán | | FR-43, FR-41 | Làm trọn | F2 | Có thể bỏ trang trung chuyển, menu mở thẳng B5.1 |
| B5.1 | b/b5-1.html | Đối soát | T1 Danh sách | /kenh-ban/tien/doi-soat | Chủ người bán | | FR-43 | Đơn giản | F1, F2 | Demo: chỉ xem bảng, chưa lọc và xuất file |
| B5.2 | b/b5-2.html | Giải ngân cọc | T1 Danh sách | /kenh-ban/tien/giai-ngan | Chủ người bán | Nhận đặt hàng | FR-41 | Làm trọn | F2 | Danh sách + trạng thái; tạo mới từ B2.2 hoặc tại đây |
| B6.0 | b/b6-0.html | Cài đặt bán hàng | T4 Trung chuyển | /kenh-ban/cai-dat | Chủ người bán | | FR-27, FR-28, FR-35 | Làm trọn | F4 | |
| B6.1 | b/b6-1.html | Thông tin pháp lý | Riêng | /kenh-ban/cai-dat/phap-ly | Chủ người bán | Cần bổ sung / bị từ chối: nộp lại được | FR-27 (AC-27.2, 27.6), FR-26 | Làm trọn | F4 | Chỉ xem sau khi duyệt (Q-26); tải hóa đơn phí mở bán |
| B6.2 | b/b6-2.html | Vùng giao và phí giao | T3 Form | /kenh-ban/cai-dat/vung-giao | Chủ người bán | Đã duyệt | FR-28 | Làm trọn | F4 | |
| B6.3 | b/b6-3.html | Điều kiện nhận đặt hàng | T3 Form | /kenh-ban/cai-dat/nhan-dat-hang | Chủ người bán | Nhận đặt hàng | FR-35 | Làm trọn | F4 | Lời của US-35: "khai điều kiện nhận đặt hàng". Vỏ và nhân làm được chọn từ cùng danh mục FR-54 |
| B6.4 | b/b6-4.html | Lịch công suất | Riêng | /kenh-ban/cai-dat/cong-suat | Chủ người bán | Tự sản xuất | FR-37 | Hoãn | — | |
| B7.0 | b/b7-0.html | Thông báo cửa hàng | T1 Danh sách | /kenh-ban/thong-bao | Chủ người bán | | NFR-10, AC-10.2, AC-21.2 | Đơn giản | F4, F5 | Hộp thông báo riêng của cửa hàng (Đ7, tách hai hộp): đơn, yêu cầu báo giá, maket, tiền, hồ sơ |

### Q – Quản trị

| ID | File | Tên trang | Khuôn | Đường dẫn (React sau này) | Ai thấy | Điều kiện | FR | Demo | Luồng | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Q1.0 | q/q1-0.html | Tổng quan | Riêng | /quan-tri | Quản trị | | FR-45, FR-47, FR-48, FR-49, FR-51 (hàng chờ) | Làm trọn | F4, F5 | Số việc chờ của từng hàng + đơn bị đánh dấu đối soát (AC-51.4) |
| Q2.0 | q/q2-0.html | Người bán | T1 Danh sách | /quan-tri/nguoi-ban | Quản trị | | FR-45, FR-46 | Làm trọn | F4 | Tab: Chờ duyệt · Cần bổ sung · Đã duyệt · Bị khóa · Bị từ chối |
| Q2.1 | q/q2-1.html | Hồ sơ người bán | T2 Chi tiết | /quan-tri/nguoi-ban/:vendorId | Quản trị | | FR-45, FR-46 | Làm trọn | F4 | Kết quả so định danh, ô xác nhận đối chiếu, duyệt / bổ sung / từ chối; khóa. Tab Lịch sử: các lần nộp, kết quả so chủ, quyết định và người duyệt (Đ5, AC-45.4) |
| Q3.0 | q/q3-0.html | Sản phẩm | T1 Danh sách | /quan-tri/san-pham | Quản trị | | FR-46 | Đơn giản | F7 | Tìm và gỡ kèm lý do |
| Q4.0 | q/q4-0.html | Tiền | T4 Trung chuyển | /quan-tri/tien | Quản trị | | FR-47, FR-48, FR-51 | Làm trọn | F2 | |
| Q4.1 | q/q4-1.html | Duyệt giải ngân | T1 Danh sách | /quan-tri/tien/giai-ngan | Quản trị | | FR-47 | Làm trọn | F2 | Ghi sổ (A-12). Kèm các lần giải ngân trước của đơn (Đ5, AC-47.1) |
| Q4.2 | q/q4-2.html | Chuyển tiền cho người bán | T1 Danh sách | /quan-tri/tien/chuyen-tien | Quản trị | | FR-48 | Làm trọn | F1, F2 | Chỉ liệt kê đơn đủ điều kiện; chặn khi có khiếu nại |
| Q4.3 | q/q4-3.html | Đối soát | T1 Danh sách | /quan-tri/tien/doi-soat | Quản trị | | FR-51 | Làm trọn | — | Gồm phí mở bán đã thu |
| Q5.0 | q/q5-0.html | Khiếu nại | T1 Danh sách | /quan-tri/khieu-nai | Quản trị | | FR-49 | Làm trọn | F5 | Tab: Đang mở · Đã quyết định · Cần xử lý tay |
| Q5.1 | q/q5-1.html | Xử lý khiếu nại | T2 Chi tiết | /quan-tri/khieu-nai/:disputeId | Quản trị | | FR-49 | Làm trọn | F5 | Xem đơn, báo giá, maket, tiến độ, bằng chứng hai bên, sổ tiền (đang giữ, đã giải ngân, tối đa hoàn được); hoàn toàn bộ / một phần / bác kèm lý do |
| Q6.0 | q/q6-0.html | Cấu hình | T4 Trung chuyển | /quan-tri/cau-hinh | Quản trị | | FR-52, FR-53, FR-54, FR-50 | Làm trọn | — | |
| Q6.1 | q/q6-1.html | Phí giao liên tỉnh | T3 Form | /quan-tri/cau-hinh/phi-lien-tinh | Quản trị | | FR-52 | Làm trọn | — | Không cho lưu khi thiếu tỉnh (AC-52.3) |
| Q6.2 | q/q6-2.html | Phí đăng ký mở bán | T3 Form | /quan-tri/cau-hinh/phi-mo-ban | Quản trị | | FR-53 | Làm trọn | — | |
| Q6.3 | q/q6-3.html | Voucher | T1 Danh sách | /quan-tri/cau-hinh/voucher | Quản trị | | FR-50 | Hoãn | — | |
| Q6.4 | q/q6-4.html | Vỏ và nhân bánh | T1 Danh sách | /quan-tri/cau-hinh/vo-nhan | Quản trị | | FR-54 | Làm trọn | F7 | Hai tab Vỏ · Nhân; thêm, đổi tên, kéo đổi thứ tự, ẩn / hiện; không xóa; không ẩn được giá trị cuối cùng của một nhóm |

## 7. Luồng phải bấm xuyên suốt

Mỗi luồng phải đi được từ đầu đến cuối chỉ bằng cách bấm link/nút trên wireframe, với đúng vai đã chọn ở công tắc vai. `[ ]` = bước có điều kiện.

| Mã | Luồng | Nhân vật | Đường đi | Nhánh / ngoại lệ |
| --- | --- | --- | --- | --- |
| F1 | Mua hàng có sẵn | Anh Minh; chị Lan buổi tối | M1.0 → M1.1 → M2.0 → M2.1 → M5.1 (nếu là khách, rồi quay về – AC-02.3) → M4.0 → M4.1 → M4.2 → M4.3 → M6.1 → M6.1.1 | Vượt tồn kho/ngưỡng ở M4.0 → F3 (M3.4) |
| F2 | Yêu cầu báo giá có in logo | Chị Lan | M1.0 → M3.0 → M3.1 → [M6.4 nếu chưa xác minh] → M6.2 → M6.2.1 → M6.2.2 → M4.2 → M6.1.2 (Maket, Tiến độ, Thanh toán phần còn lại → M4.2) | Phía người bán: B3.0 → B3.1 → B3.2; B2.2; B5.2. Quản trị: Q4.1 |
| F3 | Gửi yêu cầu cho một đơn vị | Chị Thảo; anh Quân; bạn Vy | M2.0 (khối Đơn vị cung cấp khi gõ tên – AC-14.5) hoặc M3.2 (tìm theo tên – AC-14.6) hoặc M2.1 hoặc M4.0 → M3.3 → M3.4 → [M6.4] → M6.2 → M6.2.1 → nối F2 từ M6.2.2 | Không custom → bỏ tab Maket |
| F4 | Trở thành người bán | Cô Hoa; chị Thảo; anh Quân | M1.0 (thanh menu: Bán hàng trên Moonkage) → M7.0 → [M6.4] → M7.1 → B1.0 (Đang chờ) → Q2.0 → Q2.1 → B1.0 (Đã duyệt) → B1.1 → M4.2 → B6.2 → B4.1 và/hoặc B6.3 | Cần bổ sung → B6.1 nộp lại |
| F5 | Khiếu nại | Người mua; người bán; quản trị | M6.1.1/M6.1.2 (nút Báo vấn đề với đơn, còn hạn) → M6.1.3 → [giữ tiền, báo người bán] → B2.1/B2.2 (xem, phản hồi: đề xuất) → Q5.0 → Q5.1 → [hoàn VNPay nếu có] → M6.6 (người mua) và B7.0 (người bán) → M6.1.3 kết quả → Q4.2 phần còn lại | Quá hạn: nút ẩn. VNPay lỗi → tab Cần xử lý tay (Q5.0). Số hoàn > đang giữ: Q-01 |
| F6 | Xác minh NFC | Mọi người dùng cần đặt hàng hoặc bán | (M3.1 \| M3.4 \| M7.1) → M6.4 → V1 → V2 → V3 → V4 → V5 → M6.4 tự cập nhật → quay lại trang xuất phát | Sai thẻ → V3; khóa sau 5 lần (Q-30 tạm) |
| F7 | Quản lý sản phẩm | Anh Quân | B4.0 → B4.1 (đăng / sửa) → B4.0 (ẩn / hiện); Quản trị: Q3.0 gỡ | Bị gỡ → B4.1 chỉ xem |

Trên `index.html`, mỗi luồng là một danh sách link theo thứ tự các bước để người review bấm lần lượt.

## 8. Thứ tự làm và tiêu chí xong

Làm **từng giai đoạn**; hết giai đoạn thì dừng, báo danh sách file đã tạo và chờ duyệt.

| Giai đoạn | Việc | Xong khi |
| --- | --- | --- |
| 1. Nền | `wf.css`, `wf.js`, `data.js` (chép mục 6–7), `index.html` | Index liệt kê đủ trang và luồng; đổi vai thì menu đổi; ghi chú bật/tắt được |
| 2. Khuôn | Một trang mẫu cho mỗi khuôn T1–T6: M6.1 (T1), M6.1.2 (T2), M3.1 (T3), M3.0 (T4), M4.0→M4.3 (T5), M1.1 Chọn khu vực giao (T6) | Sáu khuôn đúng mục 3, chạy được ở 2 mức màn hình |
| 3. Luồng F1 | M1.0, M1.1, M2.0, M2.1, M5.1, M4.0–M4.3, M6.1, M6.1.1 | Bấm hết F1 với vai Khách (qua cổng đăng nhập rồi quay về) và vai Người mua |
| 4. Luồng F2, F3 | M3.0–M3.4, M6.2, M6.2.1, M6.2.2, M6.1.2, M6.4, B3.0–B3.2 | Bấm hết F2, F3; cổng NFC hoạt động; M2.0 có khối "Đơn vị cung cấp" khi tìm theo tên |
| 5. Luồng F4, F7 | M7.0, M7.1, B1.0, B1.1, B4.0, B4.1, B6.x, Q2.0, Q2.1, Q3.0 | Bấm hết F4 (chờ duyệt → duyệt → đóng phí → mở bán) và F7 |
| 6. Luồng F5 và phần còn lại | M6.1.3, B2.x, B5.x, Q1.0, Q4.x, Q5.x, Q6.x, M6.6, các trang còn lại | Mọi trang trong mục 6 có file; không còn link chết (link tới trang chưa làm phải ghi rõ "Chưa làm") |

**Kiểm cuối:** mở `index.html`, bấm từng luồng F1–F5, F7; soát mục 1 (luật low-fi) và mục 5 (nhãn) trên mọi trang; không có chữ "MoonCage", "Mua lẻ", "Đặt số lượng lớn", "chat", "hoa hồng", "mùa".

## 9. Prompt mẫu cho từng giai đoạn

```
Đọc toàn bộ WIREFRAME_PLAN.md. Làm Giai đoạn <N> ở mục 8, đúng luật mục 1, cấu trúc mục 2,
khuôn mục 3, nhãn mục 4–5, dữ liệu trang mục 6. Không làm giai đoạn khác.
Xong thì liệt kê file đã tạo, luồng đã bấm thử, và điểm còn phân vân.
```

## 10. Ngoài phạm vi

- Không màu, không design system, không ảnh thật, không animation.
- Không backend, không gọi API, không lưu dữ liệu ngoài `localStorage` cho công tắc vai và ghi chú.
- Không thêm trang ngoài mục 6. Thiếu trang để luồng chạy được thì **hỏi**, không tự tạo.
- Không chat giữa người mua và người bán; không trang nhật ký thao tác chung; không giỏ hàng cho khách.
