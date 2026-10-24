// Thuyết minh bố cục – khu Quản trị (Q). Cấu trúc như why-m.js:
// q[0] Mục đích · q[1] Dữ liệu · q[2] Phân cấp · q[3] Khoảng cách · q[4] Lưới.
var WHY = window.WHY || {};
window.WHY = WHY;
function B(t, a, core, q, span) { return { t: t, a: a, core: core, q: q, span: span }; }

WHY['Q1.0'] = {
  goal: 'Bàn làm việc của quản trị: hàng chờ nào dài, việc nào đã chờ lâu nhất.',
  points: [
    B('Bốn ô hàng chờ', 'act', true, [
      'Thao tác vào hàng chờ; trên nếp gấp.',
      '3 điểm/ô: nhãn, số, liên kết. Số dài nhất 3 chữ số. Ô bằng 0 giữ chỗ.',
      'Mỏ neo: số 30px · Hành động: cả ô là liên kết.',
      'Ô sát nhau → viền mảnh; cách 24px.',
      '4 × 3 cột, cùng thứ tự với menu trên. <1024: 2/hàng.'
    ], 12),
    B('Cũ nhất trong hàng chờ', 'act', true, [
      'Thao tác theo thứ tự thời gian chờ, không theo loại.',
      'Mỗi dòng 4 điểm: loại, mô tả, thời gian chờ, nút. Tối đa 5 dòng.',
      'Nhãn loại đầu dòng (khiếu nại đặc vì có hạn) · thời gian 14px xám · nút cuối.',
      'Vách ngăn dòng.',
      '12/12. <768: nút xuống dòng.'
    ], 12),
    B('Đơn bị đánh dấu đối soát', 'act', false, [
      'Thao tác ngoại lệ (AC-51.4); hiếm nhưng nghiêm trọng. Không có thì ẩn.',
      '1 dòng/đơn.',
      'Số đếm đặc cạnh tiêu đề.',
      'Dải viền đậm, tách khỏi việc thường.',
      '12/12.'
    ], 12)
  ],
  rejected: ['Biểu đồ doanh thu: không phục vụ xử lý hàng chờ.']
};

WHY['Q2.0'] = {
  goal: 'Danh sách người bán theo trạng thái hồ sơ.',
  points: [
    B('Năm tab trạng thái', 'act', true, ['Thao tác.', '5 tab; tab Chờ duyệt có số đếm và mở sẵn.', 'Gạch dưới.', 'Kẻ mảnh.', '12/12; cuộn ngang trên điện thoại.'], 12),
    B('Bảng hồ sơ', 'act', true, [
      'Thao tác mở hồ sơ.',
      '5 cột: đơn vị (tên + nơi + cách bán + lần nộp), loại hình, so khớp, ngày nộp + thời gian chờ, nút.',
      'Mỏ neo: tên đơn vị · Hành động: "Xem hồ sơ" đặc.',
      'Kẻ ngang.',
      '12/12. <768: thẻ.'
    ], 12),
    B('Cột so khớp chủ hộ', 'read', true, ['Đọc: hồ sơ nào cần soi kỹ trước khi mở.', '1 nhãn: khớp / không khớp.', '"Không khớp" sẽ là nhãn đặc.', 'Trong ô.', 'Cột co.'])
  ],
  rejected: []
};

WHY['Q2.1'] = {
  goal: 'Ra quyết định duyệt: bằng chứng ở cột chính, quyết định ở cột phải, lịch sử ngay trong trang (Đ5).',
  points: [
    B('Tiêu đề + lần nộp', 'read', true, ['Đọc.', 'Lần nộp, tên, trạng thái, loại hình · nơi · ngày.', 'Mỏ neo: tên 30px.', 'Không viền.', '12/12.'], 12),
    B('Bảng so khớp chủ hộ', 'read', true, [
      'Đọc bằng chứng quan trọng nhất.',
      '2 hàng × 3 cột (trên giấy / từ chip / kết quả).',
      'Kết quả là nhãn.',
      'Viền đậm khung; kẻ ngang bên trong.',
      '9/12.'
    ], 9),
    B('Giấy tờ', 'read', true, ['Đọc ảnh giấy tờ gốc.', '2–4 tệp.', 'Tên giấy tờ đậm trên ảnh.', 'Không viền; ảnh tự là khung.', '2 × 4 cột trong 8. <768: xếp chồng.'], 9),
    B('Tab Lịch sử', 'read', false, ['Đọc các lần nộp, quyết định, người duyệt (AC-45.4).', 'Mốc + thời gian.', 'Sự kiện đậm.', 'Chấm + đường nối.', '8/12.'], 8),
    B('Cột quyết định', 'act', true, [
      'Thao tác; trên nếp gấp.',
      'Ô xác nhận, Duyệt, Bổ sung (gập), Từ chối (gập), Khóa.',
      '"Duyệt" đặc, đặt sau ô xác nhận · hai quyết định cần lý do gập lại · Khóa chữ mờ.',
      'Viền đậm.',
      '3/12, dính.'
    ], 3)
  ],
  rejected: ['Ba nút quyết định ngang hàng: dễ bấm nhầm Từ chối, không có chỗ ghi lý do.']
};

WHY['Q3.0'] = {
  goal: 'Tìm sản phẩm bị báo và gỡ kèm lý do.',
  points: [
    B('Tìm + lọc', 'act', true, ['Thao tác chính.', 'Ô tìm (400px) + 2 chip.', 'Ô tìm trước.', 'Một hàng.', '12/12.'], 12),
    B('Bảng sản phẩm', 'read', true, ['Đọc để xác định đúng sản phẩm.', '4 điểm: ảnh, tên, Shop, giá.', 'Tên đậm.', 'Kẻ ngang.', '12/12; ảnh 48px.'], 12),
    B('Gỡ kèm lý do', 'act', true, ['Thao tác.', 'Ô lý do (người bán sẽ đọc) + nút.', 'Nút "Gỡ" viền đứt mở ô lý do tại chỗ.', 'Mở ngay trong dòng.', 'Cột cuối.'])
  ],
  rejected: []
};

WHY['Q4.0'] = {
  goal: 'Trung chuyển Tiền, mỗi lối ghi số việc chờ.',
  points: [B('Ba thẻ', 'act', true, ['Thao tác.', '3 điểm/thẻ: số chờ, tên, mô tả.', 'Số chờ ở dòng nhãn đầu thẻ.', 'Thẻ sát → viền.', '3 × 4 cột.'], 12)],
  rejected: []
};

WHY['Q4.1'] = {
  goal: 'Duyệt từng yêu cầu giải ngân với đủ sổ tiền của đơn ngay trong thẻ (Đ5).',
  points: [
    B('Thẻ yêu cầu', 'act', true, ['Thao tác.', 'Đơn, người bán, mốc, số tiền.', 'Số tiền 30px góc phải.', 'Viền đậm; mỗi yêu cầu một thẻ vì các thẻ xếp sát.', '12/12.'], 12),
    B('Sổ tiền của đơn', 'read', true, ['Đọc hệ quả trước khi duyệt.', '3 dòng.', '"Còn giữ nếu duyệt" đậm.', 'Vách ngăn.', '6 cột trong thẻ.']),
    B('Lần trước + bằng chứng', 'read', false, ['Đọc (AC-47.1).', 'Danh sách lần trước + ảnh.', 'Tiêu đề 16px đậm.', 'Không viền.', '6 cột trong thẻ.']),
    B('Nút quyết định', 'act', true, ['Thao tác.', '2.', 'Duyệt đặc phải · Từ chối chữ trái.', 'Đáy thẻ, cách 16px.', 'Canh phải.'])
  ],
  rejected: []
};

WHY['Q4.2'] = {
  goal: 'Chuyển tiền hàng loạt nhưng không để lọt đơn đang khiếu nại.',
  points: [
    B('Bảng có ô chọn', 'act', true, ['Thao tác chọn nhiều.', '5 cột; 10–100 dòng mỗi ngày.', 'Nút "Chuyển N đơn" ở góc phải tiêu đề, ghi số đơn đang chọn.', 'Kẻ ngang.', '12/12.'], 12),
    B('Đơn bị chặn', 'read', true, ['Đọc lý do.', '1 dòng mờ, ô chọn khóa.', 'Nhãn "Chặn · đang khiếu nại" đặc.', 'Cùng bảng.', 'Theo bảng.'])
  ],
  rejected: []
};

WHY['Q4.3'] = {
  goal: 'Đối soát: tổng trước, chi tiết sau, chỗ lệch nổi lên.',
  points: [
    B('Bốn ô tổng', 'read', true, ['Đọc kiểm nhanh.', '4 số theo dòng tiền.', 'Số 30px.', 'Ô sát → viền.', '4 × 3 cột. <1024: 2/hàng.'], 12),
    B('Bảng giao dịch', 'read', true, ['Đọc chỗ lệch.', '5 cột; số tiền canh phải.', 'Dòng lệch nhãn đặc; khớp viền đứt mờ.', 'Kẻ ngang.', '12/12.'], 12)
  ],
  rejected: []
};

WHY['Q5.0'] = {
  goal: 'Danh sách khiếu nại theo tình trạng.',
  points: [
    B('Ba tab', 'act', true, ['Thao tác.', 'Đang mở · Đã quyết định · Cần xử lý tay.', 'Gạch dưới; số đếm.', 'Kẻ mảnh.', '12/12.'], 12),
    B('Bảng khiếu nại', 'act', true, ['Thao tác mở.', '6 cột: mã + đơn, người mua · lý do, người bán, đang ở, giữ, nút.', '"Đang ở" đặc khi chờ quản trị.', 'Kẻ ngang.', '12/12. <768: thẻ.'], 12)
  ],
  rejected: []
};

WHY['Q5.1'] = {
  goal: 'Phân xử: hai bên cạnh nhau ở cột chính; tiền và quyết định gom trong một hộp ở cột phải.',
  points: [
    B('Tiêu đề hai bên', 'read', true, ['Đọc.', 'Mã, đơn, người mua ↔ người bán, ngày mở.', 'Mã 30px + nhãn.', 'Không viền.', '12/12.'], 12),
    B('Người mua | Người bán', 'read', true, [
      'Đọc so sánh.',
      'Mỗi bên: lý do/đề xuất, lời, ảnh (0–5).',
      'Nhãn bên (caption) · lý do đậm.',
      'Hai thẻ cùng cỡ, viền mảnh, không thiên bên nào.',
      '2 × 4 cột trong 8. <768: xếp chồng.'
    ], 9),
    B('Đơn và lịch sử', 'read', false, ['Đọc thêm khi cần.', 'Món, phí, mốc.', 'Tiền canh phải.', 'Vách ngăn.', '9/12.'], 9),
    B('Hộp quyết định (gồm sổ tiền)', 'act', true, [
      'Thao tác chính. Bản trước tách "Sổ tiền" và "Quyết định" thành hai hộp; nút Gửi rơi xuống y≈1050 → gộp lại để nút nằm trên nếp gấp.',
      '3 số tiền, 3 lựa chọn, số tiền hoàn (200px), lý do, nút.',
      '"Tối đa hoàn" đứng ngay trên ô số tiền (chặn vượt số đang giữ, Q-01) · Gửi đặc.',
      'Viền đậm; các phần cách 12px.',
      '3/12, dính.'
    ], 3),
    B('Ba lựa chọn dạng chip', 'act', true, ['Thao tác chọn một trong ba quyết định.', '3 nhãn ≤ 8 ký tự.', 'Chip đặc = đang chọn; chưa chọn thì nút Gửi mờ.', 'Chip cách nhau 8px (cùng nhóm), cách ô số tiền 12px.', 'Trong hộp 390px (438 trừ đệm) ba chip nằm trên một hàng; mỗi chip cao 36px, đủ vùng bấm. Gọn hơn 3 thẻ chọn 56px (tiết kiệm ~100px chiều cao).'])
  ],
  rejected: ['Ba nút quyết định ngang hàng: một cú bấm là ra quyết định, không có lý do.', 'Thẻ chọn cao 56px cho 3 lựa chọn: đẩy nút Gửi xuống dưới nếp gấp.']
};

WHY['Q6.0'] = {
  goal: 'Trung chuyển cấu hình kèm giá trị hiện tại.',
  points: [B('Danh sách cấu hình', 'act', true, ['Thao tác.', '4 dòng: tên, mô tả, giá trị hiện tại, nút.', 'Giá trị hiện tại là nhãn trước nút.', 'Vách ngăn.', '12/12.'], 12)],
  rejected: []
};

WHY['Q6.1'] = {
  goal: 'Nhập phí cho 63 tỉnh; không cho lưu khi thiếu (AC-52.3).',
  points: [
    B('Dải "còn thiếu"', 'act', true, ['Thao tác tới ô trống.', '1 câu + nút.', 'Nút viền.', 'Viền đậm.', '6/12.'], 6),
    B('Lọc + áp hàng loạt', 'act', false, ['Thao tác cho nhiều tỉnh cùng mức.', 'Ô lọc + nút.', 'Nút viền nhỏ.', 'Một hàng.', '6/12.'], 6),
    B('Bảng 63 tỉnh', 'act', true, ['Thao tác nhập tại chỗ.', '63 dòng; ô phí 200px.', 'Ô thiếu viền 2px + lỗi.', 'Kẻ ngang.', '6/12 (924px) thay cho 760px tự do.'], 6)
  ],
  rejected: ['Ba mức theo miền: đặc tả cần phí theo từng tỉnh.']
};

WHY['Q6.2'] = {
  goal: 'Một trường, một nút.',
  points: [B('Mức phí', 'act', true, ['Thao tác.', '1 ô tiền (200px) + gợi ý phạm vi áp dụng.', 'Nhãn đậm.', 'Không viền.', '6/12.'], 6)],
  rejected: []
};

WHY['Q6.3'] = {
  goal: 'Trang hoãn.',
  points: [B('Khung hoãn', 'read', false, ['Đọc.', '1 nhãn + 1 câu.', 'Nhãn viền đứt.', 'Viền đứt.', '4/12 căn giữa (cột 5–8).'], 4)],
  rejected: []
};

WHY['Q6.4'] = {
  goal: 'Danh mục dùng chung: thêm, đổi tên, đổi thứ tự, ẩn/hiện – không xóa.',
  points: [
    B('Hai tab', 'act', true, ['Thao tác.', 'Vỏ · Nhân.', 'Gạch dưới; số đếm.', 'Kẻ mảnh.', '12/12.'], 12),
    B('Danh sách giá trị', 'act', true, ['Thao tác tại dòng.', '4 điểm: tay kéo, tên (≤ 30 ký tự → ô 420px), trạng thái, nút.', 'Tên trong ô nhập · trạng thái nhãn.', 'Vách ngăn.', '12/12; tay kéo 24px cố định.'], 12),
    B('Luật không xóa', 'read', false, ['Đọc: vì sao không có nút xóa.', '1 câu.', '14px xám.', 'Ngay dưới danh sách (8px).', '12/12.'], 12)
  ],
  rejected: []
};
