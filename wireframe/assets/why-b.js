// Thuyết minh bố cục – Kênh người bán (B). Cấu trúc như why-m.js:
// q[0] Mục đích · q[1] Dữ liệu · q[2] Phân cấp · q[3] Khoảng cách · q[4] Lưới.
var WHY = window.WHY || {};
window.WHY = WHY;
function B(t, a, core, q, span) { return { t: t, a: a, core: core, q: q, span: span }; }

WHY['B1.0'] = {
  goal: 'Trang đầu Kênh người bán, hai bố cục: trước mở bán chỉ theo dõi hồ sơ; sau mở bán xử lý nhiều việc song song.',
  points: [
    B('Thẻ trạng thái hồ sơ (trước mở bán)', 'act', true, [
      'Đọc trạng thái và làm đúng một việc (nếu có). Đây là toàn bộ nhiệm vụ trước khi mở bán.',
      '4 điểm: nhãn, trạng thái, một câu giải thích, nút. Ba trạng thái (chờ / đã duyệt / cần bổ sung) cùng khung; "chờ" không có nút.',
      'Mỏ neo: trạng thái 21px · Bổ trợ: giải thích 16px xám · Hành động: một nút đặc duy nhất.',
      'Viền đậm: là khối duy nhất cần chú ý trên trang.',
      '8/12. <1024: rộng hết.'
    ], 8),
    B('Thanh 4 bước trong thẻ', 'read', false, [
      'Đọc: đường tới lúc bán được, và phí nằm ở bước nào.',
      '4 nhãn; nhãn dài nhất ~30 ký tự xuống 2 dòng.',
      'Bước hiện tại đậm.',
      'Trong thẻ, cách câu giải thích 16px.',
      'Rộng hết thẻ; điện thoại chỉ nhãn bước hiện tại.'
    ]),
    B('Cột phụ trong lúc chờ', 'act', false, [
      'Thao tác phụ: hai mục duy nhất mở được trước khi duyệt.',
      '2 liên kết + nút của người review.',
      'Liên kết chữ.',
      'Nền xám, nhẹ hơn thẻ trạng thái.',
      '4/12.'
    ], 4),
    B('Việc cần làm (sau mở bán)', 'act', true, [
      'Thao tác: 4 hàng việc của đặc tả. Trên nếp gấp.',
      '3 điểm/ô: nhãn, số, nơi xử lý. Ô bằng 0 vẫn giữ chỗ để vị trí không nhảy.',
      'Mỏ neo: số 30px · Bổ trợ: nhãn 14px · Hành động: cả ô là liên kết.',
      'Ô sát nhau → viền mảnh; cách nhau 24px.',
      '4 ô × 3 cột. <1024: 2 ô/hàng.'
    ], 12),
    B('Cần chú ý', 'act', true, [
      'Thao tác có hạn chót (khiếu nại cần phản hồi).',
      'Mỗi dòng 3 điểm: loại, mô tả kèm hạn, nút. Không có gì → ẩn khối.',
      'Nhãn loại đặc · hạn in đậm trong câu · nút cuối dòng.',
      'Vách ngăn dòng.',
      '12/12.'
    ], 12)
  ],
  rejected: ['Biểu đồ doanh số: không phục vụ việc cần làm hôm nay.', 'Hiện mục menu mờ trước khi mở bán: ẩn hẳn để không có lối chết.']
};

WHY['B1.1'] = {
  goal: 'Xác nhận đã được duyệt, nói phí mở ra điều gì, rồi trả.',
  points: [
    B('Thanh bước', 'read', false, ['Đọc: nối tiếp thanh bước ở B1.0.', '4 nhãn.', 'Bước hiện tại đậm.', 'Không viền.', '12/12.'], 12),
    B('Đã duyệt + việc sau khi đóng', 'read', true, [
      'Đọc trấn an và định hướng.',
      'Nhãn + 1 câu; 3 việc tiếp theo.',
      'Nhãn "Đã duyệt" đặc · danh sách 14px.',
      'Dải nền xám, rồi thẻ viền mảnh.',
      '8/12.'
    ], 8),
    B('Tóm tắt phí + nút trả', 'act', true, [
      'Thao tác chính; trên nếp gấp.',
      '1 khoản, tổng, ghi chú hóa đơn, 2 nút.',
      'Mỏ neo: tổng · Hành động: nút đặc 52px · "Để sau" chữ.',
      'Viền đậm, giống tóm tắt ở M4.x.',
      '4/12, dính.'
    ], 4)
  ],
  rejected: ['Danh sách "quyền lợi": quảng cáo, nhắc tới hoa hồng.']
};

WHY['B2.0'] = {
  goal: 'Thấy ngay đơn nào đang chờ người bán.',
  points: [
    B('Tab theo cách bán', 'act', true, ['Thao tác.', '1–2 tab theo cách bán đã bật; số đếm đơn cần làm.', 'Gạch dưới đậm.', 'Kẻ mảnh.', '12/12.'], 12),
    B('Chip lọc', 'act', true, ['Thao tác; mặc định "Cần làm".', '5 chip.', 'Chip đặc = đang chọn.', 'Cách 8px.', 'Xuống dòng khi hẹp.'], 12),
    B('Bảng đơn', 'act', true, [
      'Thao tác chọn đơn để xử lý.',
      '5 cột: đơn (mã + ngày + số món), người mua · giao tới, trạng thái, tiền, nút. Địa chỉ dài cắt ở quận, tỉnh.',
      'Mỏ neo: mã đơn · Hành động: "Xử lý" đặc cho đơn chờ mình, "Xem" viền cho đơn đang chạy (quét dọc cột nút là thấy việc).',
      'Kẻ ngang (dữ liệu dày).',
      '12/12. <768: mỗi đơn thành thẻ.'
    ], 12),
    B('Nhãn "Đang khiếu nại"', 'read', true, ['Đọc: có hạn phản hồi.', '1 nhãn.', 'Đặc, cạnh trạng thái giao.', '4px cạnh nhãn trạng thái.', 'Theo cột trạng thái.'])
  ],
  rejected: ['Lưới thẻ đơn: khó so dọc trạng thái và tiền.']
};

WHY['B2.1'] = {
  goal: 'Xử lý đơn Shop; khi có khiếu nại thì khiếu nại là việc gấp nhất.',
  points: [
    B('Tiêu đề + hai nhãn', 'read', true, ['Đọc.', 'Mã, trạng thái giao, nhãn khiếu nại, người mua · nơi · ngày.', 'Mỏ neo: mã 30px; hai nhãn cạnh nhau.', 'Không viền.', '12/12.'], 12),
    B('Khối khiếu nại', 'act', true, [
      'Thao tác có hạn; trên nếp gấp.',
      'Trái: lý do, lời người mua, ảnh. Phải: đề xuất (3 lựa chọn), số tiền, giải thích, nút.',
      'Mỏ neo: hạn phản hồi (nhãn đặc góc phải) · Hành động: "Gửi đề xuất" đặc.',
      'Viền đậm; hai nửa cách 24px: đọc bên trái, làm bên phải.',
      '8/12; bên trong chia 2 × 4 cột. Ô tiền 200px. <768: xếp chồng.'
    ], 8),
    B('Món trong đơn', 'read', false, ['Đọc đối chiếu.', '1–n món + phí.', 'Tiền canh phải.', 'Vách ngăn.', '8/12.'], 8),
    B('Lịch sử', 'read', false, ['Đọc.', 'Mốc + thời gian + mã vận đơn.', 'Sự kiện đậm.', 'Chấm + đường nối.', '8/12.'], 8),
    B('Cột xử lý đơn', 'act', true, ['Thao tác theo trạng thái.', '2 cặp + nút + gợi ý.', 'Nút chính đặc theo trạng thái (ở đây: gắn hóa đơn).', 'Viền đậm.', '4/12, dính.'], 4)
  ],
  rejected: ['Khiếu nại ở cuối trang: dễ lỡ hạn.']
};

WHY['B2.2'] = {
  goal: 'Mặt người bán của đơn đặt hàng, cùng bố cục với M6.1.2.',
  points: [
    B('Tiêu đề + trạng thái', 'read', true, ['Đọc.', 'Nhãn nói việc của người bán.', 'Nhãn đặc khi chờ người bán.', 'Không viền.', '12/12.'], 12),
    B('Thanh 5 bước', 'read', true, ['Đọc; cùng thanh với người mua.', '5 nhãn.', 'Bước hiện tại đậm.', 'Viền thẻ.', '12/12.'], 12),
    B('Bốn tab', 'act', true, ['Thao tác.', '4 tab; Giải ngân thay cho Thanh toán.', 'Gạch dưới; số đếm ở tab có việc.', 'Kẻ mảnh.', '8/12.'], 8),
    B('Hộp hành động', 'act', true, ['Thao tác.', '1 câu + nút + 2 số tiền.', 'Nút đặc.', 'Viền đậm.', '4/12, dính.'], 4)
  ],
  rejected: []
};

WHY['B3.0'] = {
  goal: 'Chọn yêu cầu đáng báo giá trước khi hết hạn.',
  points: [
    B('Ba tab', 'act', true, ['Thao tác.', 'Mới · Đã báo giá · Đã đóng.', 'Tab Mới mở sẵn, có số đếm.', 'Kẻ mảnh.', '12/12.'], 12),
    B('Bảng yêu cầu', 'act', true, [
      'Đọc để quyết định làm hay không, rồi bấm báo giá.',
      'Mỗi yêu cầu có ~9 điểm (mã, số hộp, làm riêng, vỏ, nhân, loại, người mua, nơi, hạn) → quá 4–5 điểm cho một thẻ; chuyển từ thẻ sang bảng 5 cột, gom phụ vào dòng 2 xám của ô.',
      'Mỏ neo: mã + số hộp đậm · Bổ trợ: dòng 2 xám · Hành động: "Báo giá" đặc, "Xem" viền.',
      'Kẻ ngang.',
      '12/12. <768: thẻ.'
    ], 12),
    B('Hạn trả lời', 'read', true, ['Đọc: lý do để làm trước.', '1 nhãn.', 'Đặc khi < 24 giờ.', 'Cạnh cột nút.', 'Cột co theo nội dung.'])
  ],
  rejected: ['Thẻ nhiều dòng (bản trước): 9 điểm dữ liệu một thẻ, khó quét.']
};

WHY['B3.1'] = {
  goal: 'Đọc kỹ một yêu cầu rồi chọn: báo giá hoặc từ chối.',
  points: [
    B('Tiêu đề + hạn', 'read', true, ['Đọc: yêu cầu nào, còn bao lâu.', 'Loại, mã, hạn, người mua.', 'Mỏ neo: mã 30px + nhãn hạn đặc · Bổ trợ: người mua 16px xám.', 'Không viền.', '12/12.'], 12),
    B('Người mua cần', 'read', true, ['Đọc để quyết định có làm không.', '5 cặp, cùng thứ tự với form M3.1 để hai bên hiểu như nhau; ghi chú dài tới 500 ký tự xuống nhiều dòng trong cột giá trị.', 'Nhãn 14px xám · giá trị 16px đậm.', 'Viền mảnh vì đứng cạnh cột phản hồi.', '8/12.'], 8),
    B('Tệp người mua gửi', 'read', false, ['Đọc / mở tệp; không có tệp thì ẩn khối.', '0–5 tệp.', 'Tên tệp dưới ô xem trước.', 'Không viền; ô xem trước tự là khung.', 'Mỗi tệp 4 cột (3 tệp/hàng).'], 8),
    B('Phản hồi', 'act', true, ['Thao tác; trên nếp gấp.', 'Nút báo giá, từ chối (gập, chọn lý do), ghi chú thu hồi.', '"Soạn báo giá" đặc · "Từ chối" gập trong details và dùng nút viền đứt vì cần lý do.', 'Viền đậm.', '4/12, dính.'], 4)
  ],
  rejected: []
};

WHY['B3.2'] = {
  goal: 'Soạn báo giá; thấy đúng con số người mua sẽ thấy.',
  points: [
    B('1. Giá', 'act', true, ['Thao tác.', 'Đơn giá (≤ 12 ký tự → 200px), cọc (select). Gợi ý theo bậc giá dưới ô.', 'Nhãn đậm · gợi ý xám.', 'Không viền.', '8/12; ô cố định theo dữ liệu.'], 8),
    B('Người mua sẽ thấy', 'read', true, ['Đọc kiểm.', 'Phép tính, tổng, cọc.', 'Tổng 20px.', 'Viền đậm.', '4/12, dính.'], 4)
  ],
  rejected: []
};

WHY['B4.0'] = {
  goal: 'Chỉnh giá, tồn, ẩn/hiện nhanh mà không phải mở từng sản phẩm.',
  points: [
    B('Tiêu đề + "Đăng sản phẩm"', 'act', false, ['Tiêu đề để đọc; đăng mới là thao tác phụ ở trang này.', '2.', 'Nút đặc mép phải (khuôn T1).', 'Không viền.', '12/12.'], 12),
    B('Ba tab', 'act', true, ['Thao tác.', 'Đang bán · Đang ẩn · Bị gỡ, có số đếm; không có tab hay nút xóa.', 'Gạch dưới tab đang mở.', 'Kẻ mảnh.', '12/12.'], 12),
    B('Bảng sản phẩm', 'act', true, [
      'Thao tác sửa nhanh.',
      '5 điểm: ảnh, tên + vỏ/nhân, giá, tồn, hiện. Tên dài tới 120 ký tự → kẹp 2 dòng; tồn ≤ 5 → in đậm.',
      'Mỏ neo: tên · Bổ trợ: vỏ/nhân 14px xám · Hành động: ô "Đang hiện" và "Sửa".',
      'Kẻ ngang (dữ liệu dày).',
      '12/12; ảnh 48px cố định; giá, tồn canh phải. <768: thẻ.'
    ], 12),
    B('Ô "Đang hiện"', 'act', true, ['Ẩn/hiện là thao tác hay dùng nhất (F7), làm tại chỗ.', '1 ô đánh dấu + nhãn.', 'Ô 20px, vùng bấm gồm cả nhãn.', 'Cách tên cột 16px.', 'Cột co theo nội dung.']),
    B('Sản phẩm bị gỡ', 'read', false, ['Đọc lý do gỡ.', 'Tên, ngày, lý do (≤ 200 ký tự).', 'Nhãn viền đứt · "Xem" viền.', 'Viền đứt, tách khỏi bảng hàng đang bán.', '12/12.'], 12)
  ],
  rejected: []
};

WHY['B4.1'] = {
  goal: 'Form sản phẩm (T3), có xem trước thẻ đúng như người mua sẽ thấy.',
  points: [
    B('Dải "Bị gỡ"', 'read', false, ['Đọc: vì sao mọi ô bị khóa; chỉ khi sản phẩm bị gỡ.', 'Ngày + lý do.', 'Nhãn đặc.', 'Viền đậm.', '12/12.'], 12),
    B('1. Ảnh', 'act', true, ['Thao tác; ảnh là thứ người mua nhìn đầu tiên ở M2.0 nên điền đầu tiên.', '1–8 ảnh; ảnh đầu là ảnh chính.', 'Ô "+ Thêm" viền đứt.', 'Không viền nhóm.', '4 ô vuông/hàng trong 8 cột; <768: 2/hàng.'], 8),
    B('3. Vỏ và nhân', 'act', true, ['Thao tác.', 'Chip theo danh mục FR-54; ít nhất 1 vỏ, 1 nhân.', 'Chip đặc = đã chọn.', 'Chip cách 8px; hai hàng cách 20px.', '8/12; xuống dòng khi hẹp.'], 8),
    B('Xem trước thẻ', 'read', false, ['Đọc kiểm tên dài bị kẹp, giá hiện ra sao.', 'Thẻ sản phẩm thật (4 điểm).', 'Như M2.0.', 'Không viền, như ở M2.0.', '4/12, dính. Rộng 315px ≈ thẻ thật ở M2.0 (230px) nên chỉ là ước lượng.'], 4)
  ],
  rejected: []
};

WHY['B5.0'] = {
  goal: 'Tiền của tôi đang ở đâu.',
  points: [
    B('Ba con số', 'read', true, ['Đọc.', 'Đang giữ → chờ chuyển → đã nhận (theo dòng chảy tiền).', 'Số 30px.', 'Ô sát → viền.', '3 × 4 cột.'], 12),
    B('Hai lối vào', 'act', true, ['Thao tác.', '2 thẻ.', 'Tên 21px.', 'Viền.', '6 + 6.'], 12)
  ],
  rejected: []
};

WHY['B5.1'] = {
  goal: 'Bảng đối soát chỉ xem.',
  points: [B('Bảng đối soát', 'read', true, ['Đọc theo cột số.', '6 cột; tiền tới 12 ký tự.', '"Bạn nhận" đậm.', 'Kẻ ngang.', '12/12; cột tiền canh phải.'], 12)],
  rejected: []
};

WHY['B5.2'] = {
  goal: 'Danh sách giải ngân cọc theo đơn.',
  points: [
    B('Tiêu đề + tạo yêu cầu', 'act', false, ['Thao tác phụ.', '2.', 'Nút đặc phải.', 'Không viền.', '12/12.'], 12),
    B('Bảng giải ngân', 'read', true, ['Đọc.', '5 cột; "còn giữ" cạnh số xin.', 'Trạng thái 3 mức nhãn.', 'Kẻ ngang.', '12/12.'], 12)
  ],
  rejected: []
};

WHY['B6.0'] = {
  goal: 'Trung chuyển tới các mục cài đặt, kèm trạng thái để biết còn thiếu gì.',
  points: [
    B('Danh sách mục cài đặt', 'act', true, ['Thao tác chọn mục.', '4 dòng × 3 điểm: tên, mô tả, trạng thái + nút.', 'Tên đậm · "Chưa cài" nhãn đặc · nút "Mở" cuối dòng.', 'Vách ngăn dòng.', '12/12.'], 12),
    B('Mục chưa mở được', 'read', false, ['Đọc trước việc sẽ phải làm sau khi duyệt.', '1 nhãn.', 'Viền đứt, không có nút.', 'Cùng dòng.', 'Theo danh sách.'])
  ],
  rejected: ['Lưới thẻ: không thấy ngay mục nào còn thiếu.']
};

WHY['B6.1'] = {
  goal: 'Xem hồ sơ đã nộp; nộp lại khi cần bổ sung.',
  points: [
    B('Tiêu đề + trạng thái', 'read', true, ['Đọc: sửa được hay chỉ xem.', 'Tên, loại hình, nhãn trạng thái.', 'Nhãn ở góc phải tiêu đề.', 'Không viền.', '12/12.'], 12),
    B('Dải "Moonkage cần"', 'act', true, ['Thao tác khi cần bổ sung; đứng trên mọi thông tin.', '1 câu (≤ 200 ký tự) + nút.', 'Nút đặc.', 'Viền đậm.', '12/12.'], 12),
    B('Đơn vị / Chủ hộ', 'read', false, ['Đọc.', '2 khối × 2–3 cặp; địa chỉ xuống 2 dòng.', 'Nhãn xám · giá trị đậm.', 'Nền xám = chỉ đọc.', '6 + 6. <768: xếp chồng.'], 12)
  ],
  rejected: []
};

WHY['B6.2'] = {
  goal: 'Khai vùng giao và phí giao, bước giữa của luồng F4.',
  points: [
    B('Nội tỉnh', 'act', true, ['Thao tác.', '1 ô đánh dấu + phí (tới "50.000đ" → ô 200px).', 'Nhãn đậm.', 'Không viền nhóm.', '8/12.'], 8),
    B('Liên tỉnh', 'act', false, ['Thao tác bật/tắt; phí do Moonkage cấu hình nên chỉ đọc.', 'Bảng 63 tỉnh (hiện 2 dòng + "…").', 'Phí canh phải.', 'Kẻ ngang.', '8/12.'], 8),
    B('Bước tiếp theo', 'read', false, ['Đọc: dẫn sang bước sau trong luồng.', '1 câu + liên kết.', 'Liên kết chữ.', 'Nền xám.', '4/12, dính.'], 4)
  ],
  rejected: []
};

WHY['B6.3'] = {
  goal: 'Khai điều kiện nhận đặt hàng; xem trước khối sẽ hiện ở M3.3.',
  points: [
    B('1. Quy mô', 'act', true, ['Thao tác; tối thiểu là điều kiện lọc mạnh nhất khi ghép yêu cầu.', 'Tối thiểu (≤ 5 chữ số → 112px), thời gian maket (select co theo nội dung).', 'Nhãn đậm.', 'Không viền nhóm.', '8/12.'], 8),
    B('2. Vỏ và nhân', 'act', true, ['Thao tác.', 'Chip FR-54, giống B4.1 và bộ lọc M2.0.', 'Chip đặc = chọn.', 'Cách 8px.', '8/12.'], 8),
    B('Người mua sẽ thấy', 'read', false, ['Đọc kiểm.', '3 cặp, đúng khối "Nhận làm" ở M3.3.', 'Giá trị đậm.', 'Viền mảnh như ở M3.3.', '4/12, dính.'], 4)
  ],
  rejected: []
};

WHY['B6.4'] = {
  goal: 'Trang hoãn trong demo.',
  points: [B('Khung hoãn', 'read', false, ['Đọc: trang có trong IA nhưng không làm.', '1 nhãn + 1 câu + lối quay lại.', 'Nhãn viền đứt.', 'Viền đứt cả khung.', '6/12 căn giữa (cột 4–9).'], 6)],
  rejected: []
};
