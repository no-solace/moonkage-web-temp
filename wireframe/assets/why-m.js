// Thuyết minh bố cục – khu Mua hàng (M).
// Mỗi khối có chốt số (data-why) trả lời 5 bước câu hỏi:
//   q[0] Mục đích   – đọc hay thao tác; bỏ khối đi có hoàn thành nhiệm vụ chính không
//   q[1] Dữ liệu    – số điểm dữ liệu; trạng thái dài nhất / ngắn nhất / rỗng
//   q[2] Phân cấp   – mỏ neo · bổ trợ · hành động
//   q[3] Khoảng cách – nhóm gần (4–8px) / nhóm xa (16–32px); có cần viền hay nền không
//   q[4] Lưới       – số cột trên lưới 12; cố định hay co giãn; lên điện thoại ra sao
// a: 'act' | 'read'; core: khối cốt lõi (phải nằm trên nếp gấp); span: số cột dự kiến ở màn 1920px.
// Số cột, kích thước px và vị trí so với nếp gấp do wf.js đo trực tiếp trên trang.
var WHY = window.WHY || {};
window.WHY = WHY;
function B(t, a, core, q, span) { return { t: t, a: a, core: core, q: q, span: span }; }

WHY['M1.0'] = {
  goal: 'Người dùng chọn đúng một trong hai lối mua (có sẵn / theo yêu cầu). Hướng bố cục mới (tham khảo Shopcart): hero lớn tạo điểm nhấn, các khối dưới hỗ trợ việc chọn.',
  points: [
    B('Hero lớn tràn ngang', 'act', true, [
      'Thao tác + nhận diện: một thông điệp, hai nút cho hai lối. Khách chưa chọn nơi giao có thêm một dòng "Chọn khu vực giao" (AC-05.3).',
      'Tiêu đề ≤ 2 dòng, 1 câu phụ, 2 nút. Không số liệu, không khuyến mãi (không có dữ liệu).',
      'Mỏ neo: tiêu đề 56px · Bổ trợ: câu phụ 19px xám · Hành động: nút đặc "Xem hàng có sẵn", nút viền "Đặt theo yêu cầu", bo tròn.',
      'Chỉ hero tràn hết bề ngang màn hình (ở mọi độ rộng); thanh tiện ích, header, footer nền trắng kẻ mảnh nên hero là dải màu duy nhất. Chữ và ảnh vẫn neo lưới 12 cột. Ảnh lớn 6/12 bên phải: Moonkage tự chụp, không dùng ảnh của một Shop.',
      '6 + 6 cột, cao ~520px.'
    ], 12),
    B('Hai thẻ lối vào (đè mép dưới hero)', 'act', true, [
      'Thao tác: giữ điều kiện thật của từng lối ngay màn đầu, vì hero chỉ có nút.',
      'Mỗi thẻ: nhãn lối, tên, điều kiện (1 đoạn), liên kết đi tiếp. Cả thẻ bấm được.',
      'Mỏ neo: tên lối 21px · Lối 2 nền đậm để phân biệt hai lối bằng màu.',
      'Đè 48px lên hero để nối hai khối thành một cụm quyết định.',
      '6 + 6 cột.'
    ], 12),
    B('"Việc cần bạn" (đã đăng nhập, có việc chờ)', 'act', false, [
      'Thao tác phụ, một dòng. Không có việc thì không hiện.',
      '2–3 liên kết + "Xem tất cả".',
      'Mỏ neo: nhãn đậm · Hành động: nút viền nhỏ.',
      'Viền đậm + vạch trái 4px.',
      '12/12.'
    ], 12),
    B('Tìm nhanh', 'act', false, [
      'Thao tác tắt: vào thẳng M2.0 đã lọc. Chỉ dùng bộ lọc có thật của M2.0 (vỏ, nhân, giá).',
      '7 chip + "Tất cả bộ lọc".',
      'Chip bo tròn, viền mảnh; "Tất cả bộ lọc" dạt mép phải.',
      'Một hàng, không viền khối.',
      '12/12.'
    ], 12),
    B('Có sẵn giao tới [tỉnh]', 'act', false, [
      'Đọc lướt và mua nhanh. Ẩn cả khối khi không có sản phẩm.',
      'Mỗi thẻ: ảnh vuông, tên + giá cùng dòng, Shop · đánh giá, nút "Thêm vào giỏ" (khách bấm → đăng nhập rồi tự thêm, AC-02.3).',
      'Mỏ neo: ảnh rồi tên · Giá đậm bên phải tên để quét nhanh · Hành động: nút viền nhỏ bo tròn.',
      'Không viền thẻ; ảnh nền xám đồng nhất che bớt ảnh Shop không đều.',
      '4 thẻ × 3 cột.'
    ], 12),
    B('Nhận đặt theo yêu cầu', 'act', false, [
      'Chọn đơn vị trước, sản phẩm sau (đặt riêng).',
      'Mỗi thẻ: avatar, tên, khu vực, nhận làm gì, 2 nhãn (tối thiểu, vùng giao), nút.',
      'Hành động: "Gửi yêu cầu cho [tên]" đặc · "Xem đơn vị ›" thành liên kết vì hai nút ngang bị vỡ hàng.',
      'Thẻ có viền.',
      '3 thẻ × 4 cột.'
    ], 12),
    B('Tiền của bạn đi thế nào', 'read', false, [
      'Đọc: giải tỏa lo ngại về tiền cọc trước khi đặt. Chỉ nêu quy tắc có trong đặc tả (VNPay, Moonkage giữ cọc, duyệt maket, phần còn lại trả sau khi giao).',
      '3 thẻ: số, tiêu đề, 1–2 câu.',
      'Mỏ neo: tiêu đề đậm · Bổ trợ: câu 14px xám.',
      'Nền xám, không viền.',
      '3 thẻ × 4 cột.'
    ], 12)
  ],
  rejected: [
    'Hai thẻ lối vào làm khối đầu trang (bố cục cũ): đúng nhiệm vụ nhưng màn đầu thiếu điểm nhấn; đã thay bằng hero lớn + thẻ lối vào đè mép dưới.',
    'Banner khuyến mãi "giảm %" như trang tham khảo: không có dữ liệu khuyến mãi, trái quy tắc không bịa số.',
    'Khối chọn khu vực riêng cho khách: chuyển lên thanh tiện ích (mọi trang) và một dòng trong hero.'
  ]
};

WHY['M1.1'] = {
  goal: 'Lấy đúng một thông tin (giao tới đâu) rồi trả người dùng về chỗ cũ.',
  points: [
    B('Địa chỉ đã lưu (đã đăng nhập)', 'act', true, [
      'Thao tác chọn. Có địa chỉ đã lưu thì đây là cách nhanh nhất, nên đứng đầu hộp thoại.',
      'Mỗi lựa chọn 2 điểm: tên gợi nhớ, địa chỉ. Địa chỉ dài ~60 ký tự xuống 2 dòng trong ô 432px. Hơn 3 địa chỉ thì hộp thoại cuộn bên trong.',
      'Mỏ neo: tên gợi nhớ đậm · Bổ trợ: địa chỉ 14px xám · Hành động: cả thẻ là vùng bấm (Fitts: vùng 56px cao, rộng hết hộp thoại).',
      'Các thẻ cách nhau 8px (cùng nhóm). Thẻ đang chọn viền 2px + nền xám: cần viền vì các lựa chọn nằm sát nhau.',
      'Rộng hết hộp thoại 480px (cố định theo DS). Điện thoại: hộp thoại rộng hết màn trừ lề 16px.'
    ]),
    B('Tỉnh / thành phố', 'act', true, [
      'Thao tác. Với khách đây là trường duy nhất.',
      '1 điểm: tên tỉnh, dài nhất ~20 ký tự ("Bà Rịa – Vũng Tàu") nên ô rộng hết hộp thoại là đủ.',
      'Mỏ neo: nhãn 14px đậm · Bổ trợ: gợi ý 14px xám dưới ô.',
      'Nhãn–ô–gợi ý cách 8px; cách nhóm trên 20px.',
      'Co giãn theo hộp thoại; ô cao 44px.'
    ]),
    B('Hai nút', 'act', true, [
      'Thao tác kết thúc hộp thoại.',
      '2 nút. Nút chính ghi kết quả ("Xem hàng giao tới đây").',
      'Hành động chính đặc, bên phải (cuối đường đọc) · "Để sau" là chữ, bên trái.',
      'Cách nội dung 24px để không bấm nhầm.',
      'Canh phải. Điện thoại: giữ một hàng vì hai nút ngắn.'
    ])
  ],
  rejected: ['Trang riêng: rời trang đang xem chỉ vì một ô chọn là thừa.']
};

WHY['M2.0'] = {
  goal: 'Thu hẹp nhiều hộp bánh xuống vài món để xem kỹ, luôn trong vùng giao được.',
  points: [
    B('Tiêu đề + vùng giao', 'read', true, [
      'Đọc. Bỏ dòng vùng giao thì người dùng không biết danh sách đã bị lọc theo tỉnh.',
      '2 điểm: tên trang, tỉnh đang lọc + liên kết đổi.',
      'Mỏ neo: tiêu đề 30px · Bổ trợ: dòng 16px xám · Hành động: liên kết chữ "Đổi khu vực".',
      'Tiêu đề–mô tả 8px; cách nội dung 24px. Không viền.',
      '12/12; liên kết ví dụ của wireframe bên phải xuống dòng khi hẹp.'
    ], 12),
    B('Khối Đơn vị cung cấp (khi tìm theo tên)', 'act', false, [
      'Thao tác phụ; chỉ hiện khi từ khóa khớp tên đơn vị (AC-14.5).',
      '1–3 đơn vị, mỗi dòng 4 điểm: tên, khu vực, nhận làm gì, tối thiểu. Hơn 3 → "Xem tất cả".',
      'Mỏ neo: tên đơn vị · Hành động: "Gửi yêu cầu cho [tên]" đặc.',
      'Viền đậm bao quanh: phải tách hẳn khỏi lưới sản phẩm để không lẫn đơn vị với sản phẩm.',
      '12/12. Điện thoại: nút xuống dưới tên.'
    ], 12),
    B('Cột bộ lọc', 'act', true, [
      'Thao tác lặp lại nhiều lần; bỏ đi thì không thu hẹp được. Đặt trái, bắt đầu trên nếp gấp.',
      '5 nhóm (giá, thương hiệu, vỏ, nhân, Shop) × 3–4 lựa chọn. Tên Shop dài 30 ký tự xuống 2 dòng trong 318px. Nhóm hơn 6 lựa chọn → "Xem thêm".',
      'Mỏ neo: tên nhóm 14px đậm · Bổ trợ: lựa chọn 16px · chú thích HOẶC/VÀ 14px xám ở cuối.',
      'Trong nhóm: lựa chọn cách 4px; giữa nhóm 20px + đường kẻ mảnh. Cả cột có viền vì đứng sát lưới sản phẩm.',
      '3/12 cột (318px, cố định theo lưới). <1024: gập thành nút "Bộ lọc" phía trên lưới.'
    ], 3),
    B('Chip lọc đang bật + sắp xếp', 'act', false, [
      'Thao tác: gỡ nhanh từng điều kiện. Không bắt buộc (cột lọc làm được) nên chỉ một dòng.',
      'Số chip = số điều kiện đang bật (0–8). Không có điều kiện → ẩn chip, chỉ còn sắp xếp.',
      'Chip đặc (đang bật) · "Xóa lọc" chữ · Sắp xếp là select 44px ở mép phải.',
      'Chip cách nhau 8px; sắp xếp tách sang phải bằng khoảng trắng.',
      '9/12 cùng lưới; xuống dòng khi nhiều chip.'
    ], 9),
    B('Lưới sản phẩm', 'read', true, [
      'Đọc và chọn; đây là kết quả của trang.',
      '4 điểm/thẻ: ảnh, tên (kẹp 2 dòng), Shop · đánh giá (1 dòng, cắt "…"), giá. Chưa có đánh giá → "chưa có đánh giá".',
      'Mỏ neo: ảnh rồi tên · Bổ trợ: Shop · Hành động: cả thẻ là liên kết.',
      'Không viền, thẻ cách nhau 24px; ảnh tự tạo ranh giới.',
      '4 thẻ/hàng trong vùng 9 cột (mỗi thẻ ≈238px, gần cỡ thẻ thật). 768–1023: 2 thẻ/hàng. <768: 2 thẻ/hàng.'
    ], 9),
    B('Trạng thái rỗng', 'act', false, [
      'Thao tác thoát ngõ cụt.',
      '1 câu, 1 gợi ý, 2 nút.',
      'Mỏ neo: câu đậm · Hành động: "Tạo yêu cầu báo giá" đặc, "Bỏ hết bộ lọc" viền.',
      'Viền đứt: khác hẳn thẻ sản phẩm để không bị đọc như một kết quả.',
      'Thay chỗ lưới, cùng 9 cột.'
    ], 9)
  ],
  rejected: ['Bộ lọc thanh ngang: 5 nhóm nhiều lựa chọn phải mở từng menu.', 'Cuộn vô tận: khó quay lại đúng chỗ sau khi xem chi tiết.']
};

WHY['M2.1'] = {
  goal: 'Trả lời: hộp trông thế nào, giá bao nhiêu, giao được không — rồi cho bấm "Thêm vào giỏ" ngay cạnh câu trả lời.',
  points: [
    B('Ảnh', 'read', true, [
      'Đọc: ảnh là lý do chọn hộp quà.',
      '1 ảnh chính + tối đa 4 ảnh phụ. 1 ảnh → bỏ hàng ảnh phụ.',
      'Mỏ neo: ảnh vuông lớn · Bổ trợ: ảnh phụ 1/4 chiều rộng.',
      'Ảnh chính–ảnh phụ cách 8px; không viền.',
      '6/12 cột, tỷ lệ 1:1 cố định. <1024: ảnh lên trên, thông tin xuống dưới.'
    ], 6),
    B('Nhãn "Sản phẩm của bạn" (chủ Shop)', 'read', false, [
      'Đọc: thay cho khối mua khi chủ Shop xem (BR-22).',
      '1 nhãn, 1 câu, 1 nút.',
      'Nhãn đặc · nút viền "Sửa sản phẩm".',
      'Dải viền đậm vì thay chỗ khối mua.',
      'Cùng 6 cột với khối mua.'
    ]),
    B('Giá', 'read', true, [
      'Đọc; thông tin quyết định thứ hai sau ảnh.',
      '1 điểm; dài nhất "1.250.000đ" (10 ký tự).',
      'Mỏ neo của cột phải: 30px.',
      'Cách tên 16px, cách khối mua 16px.',
      '6/12 cùng cột thông tin.'
    ]),
    B('Khối mua', 'act', true, [
      'Thao tác chính của trang; phải ở trên nếp gấp (đo: y≈338).',
      '4 điểm: tồn kho + vùng giao, phí giao, số lượng, nút. Hết hàng → nút mờ + lối "Gửi yêu cầu cho Shop này".',
      'Hành động: "Thêm vào giỏ" đặc, giãn hết phần còn lại của hàng (vùng bấm lớn) · Bổ trợ: nhãn tồn kho xám.',
      'Viền đậm gom 4 điểm thành một quyết định; bên trong cách 16px.',
      'Ô số lượng cố định 112px (≤ 5 chữ số); nút co giãn. Điện thoại: giữ một hàng.'
    ]),
    B('Lối "Gửi yêu cầu cho Shop này"', 'act', false, [
      'Thao tác phụ (F3); bỏ đi người mua lẻ vẫn mua được, nên đặt dưới khối mua và nhẹ hơn.',
      '1 câu hỏi, 1 nút.',
      'Nút viền nhỏ 36px.',
      'Nền xám, không viền đủ: nhẹ hơn khối mua.',
      'Cùng 6 cột.'
    ]),
    B('Trong hộp', 'read', false, [
      'Đọc để đối chiếu với bộ lọc ở M2.0; không bắt buộc để mua.',
      '4 cặp nhãn–giá trị. Danh sách nhân dài → xuống dòng trong cột giá trị.',
      'Bổ trợ: nhãn 14px xám · giá trị 16px đậm.',
      'Không viền; cách khối trên 32px.',
      'Cột nhãn co theo nội dung, cột giá trị co giãn.'
    ]),
    B('Đánh giá', 'read', false, [
      'Đọc thêm bằng chứng; dưới nếp gấp.',
      'Mỗi dòng 4 điểm: người, sao, ngày, nội dung. 0 đánh giá → "Chưa có đánh giá".',
      'Mỏ neo: tên + sao · Bổ trợ: ngày xám.',
      'Vách ngăn giữa các dòng vì là danh sách dày.',
      '12/12 dưới cả hai cột; nội dung giới hạn 65ch để dễ đọc.'
    ], 12)
  ],
  rejected: ['Nút "Mua ngay" bỏ qua giỏ: giỏ tính phí giao từng Shop.']
};

WHY['M3.0'] = {
  goal: 'Trang trung chuyển: chọn giữa gửi nhiều nơi và chọn một đơn vị.',
  points: [
    B('Tiêu đề + mô tả', 'read', true, [
      'Đọc: dòng mô tả là bộ lọc người dùng (ai không thuộc nhóm này quay lại).',
      '2 điểm. Mô tả 64 ký tự, 1 dòng.',
      'Mỏ neo: 30px · Bổ trợ: 16px xám.',
      'Cách 8px; không viền.',
      '12/12.'
    ], 12),
    B('Hai thẻ lối vào', 'act', true, [
      'Thao tác: nhiệm vụ của trang. Trên nếp gấp.',
      '4 điểm/thẻ, cùng thứ tự (nhãn, tên, khi nào chọn, điều kiện, nút) để mắt so ngang.',
      'Mỏ neo: tên 21px · Hành động: nút đặc / nút viền dính đáy thẻ.',
      'Thẻ sát nhau → có viền. Điều kiện trên nền xám ngay trên nút.',
      '6 + 6. <768: xếp chồng.'
    ], 12),
    B('Điều kiện thật', 'read', true, [
      'Đọc ngay trước khi bấm, để không bị chặn giữa đường (xác minh, cọc).',
      '3 dòng ≤ 70 ký tự.',
      'Bổ trợ: 14px trên nền xám.',
      'Nền xám thay viền.',
      'Rộng hết thẻ.'
    ]),
    B('Các bước sau khi gửi', 'read', false, [
      'Đọc cho người còn lưỡng lự; bỏ đi vẫn chọn được lối. Đặt dưới.',
      '5 bước, nhãn ≤ 25 ký tự.',
      'Bổ trợ: thanh bước mảnh.',
      'Cách thẻ 32px; không viền.',
      '12/12; điện thoại chỉ hiện số bước.'
    ], 12)
  ],
  rejected: ['Bảng so sánh hai cách: không có chỗ cho nút ở mỗi lối.']
};

WHY['M3.1'] = {
  goal: 'Mô tả nhu cầu đủ để các đơn vị báo giá, và biết ngay có bao nhiêu đơn vị sẽ nhận.',
  points: [
    B('1. Bánh và hộp', 'act', true, [
      'Thao tác; nhóm quyết định ai nhận yêu cầu nên đứng đầu, trên nếp gấp.',
      'Số hộp (≤ 5 chữ số), số bánh/hộp (4 lựa chọn), vỏ (3), nhân (4). Lỗi "0 đơn vị" hiện ngay dưới ô số hộp.',
      'Mỏ neo: tiêu đề nhóm 21px · nhãn 14px đậm · Bổ trợ: lỗi 14px đậm.',
      'Không viền nhóm: tiêu đề + khoảng 32px giữa nhóm đủ tách. Trường cách nhau 20px.',
      'Ô số hộp cố định 112px, select co theo nội dung; chip xuống dòng. 6/12 cột.'
    ], 6),
    B('2. Làm riêng', 'act', true, [
      'Thao tác; đổi số đơn vị khớp. Tệp logo không bắt buộc (bỏ đi vẫn gửi được) nên gập vào "+ Đính kèm" – trước đó nhóm cao 446px đẩy nhóm 3 xuống y≈1122.',
      '3 lựa chọn, nhãn ≤ 26 ký tự → đủ ngắn cho chip một hàng; giải thích chỉ cho lựa chọn đang chọn.',
      'Chip đặc = đang chọn · gợi ý 14px xám dưới · "+ Đính kèm" chữ đậm.',
      'Không viền nhóm; chip cách nhau 8px.',
      '6/12; chip xuống dòng trên điện thoại.'
    ], 6),
    B('3. Giao hàng', 'act', true, [
      'Thao tác.',
      'Ngày (DD/MM/YYYY, 10 ký tự), tỉnh, ghi chú (0–500 ký tự).',
      'Nhãn 14px đậm.',
      'Ngày và tỉnh cùng hàng vì ngắn; ghi chú rộng hết.',
      'Ô ngày cố định 168px; ghi chú 3 dòng, kéo giãn được.'
    ], 6),
    B('Cột "Sẽ gửi tới N đơn vị"', 'read', true, [
      'Đọc phản hồi tức thì khi chỉnh form; phải luôn trong tầm mắt.',
      '1 con số + 1 câu + gợi ý chỉnh. 0 đơn vị → gợi ý tăng hộp / bỏ in logo.',
      'Mỏ neo: con số 30px · Bổ trợ: giải thích 14px.',
      'Viền đậm cho số đơn vị; phần "sau khi gửi" nền xám, nhẹ hơn.',
      '3/12 cột, dính khi cuộn. <1024: xuống dưới form.'
    ], 3)
  ],
  rejected: ['Form nhiều bước: ~8 trường, chia bước làm mất phản hồi số đơn vị khớp.']
};

WHY['M3.2'] = {
  goal: 'Tìm một đơn vị (theo tên hoặc năng lực) rồi vào trang của họ hoặc gửi yêu cầu.',
  points: [
    B('Tiêu đề + nút chính', 'act', false, [
      'Đọc tiêu đề; nút "Tạo yêu cầu báo giá" là lối cho người chưa muốn chọn một nơi.',
      '2 điểm.',
      'Mỏ neo: tiêu đề 30px · Hành động: nút đặc ở mép phải.',
      'Không viền.',
      '12/12; điện thoại nút rộng hết hàng dưới tiêu đề.'
    ], 12),
    B('Tìm theo tên + chip năng lực', 'act', true, [
      'Thao tác chính (AC-14.6).',
      'Ô tìm (tên dài ~40 ký tự) + 4 chip.',
      'Ô tìm trước (cách chính) · chip sau.',
      'Cùng một hàng, cách 16px.',
      'Ô tìm 400px co giãn; chip xuống dòng khi hẹp.'
    ], 12),
    B('Danh sách đơn vị', 'read', true, [
      'Đọc để chọn.',
      'Mỗi dòng 5 điểm: tên, loại (nhãn), khu vực, đánh giá, tối thiểu, nhận làm gì. Đã đẩy công suất và thời gian maket sang M3.3 để không quá tải.',
      'Mỏ neo: tên đậm · Bổ trợ: 2 dòng 14px.',
      'Mỗi đơn vị một thẻ có viền vì các thẻ xếp sát; bên trong danh tính và nút tách 16px.',
      '12/12, dạng dòng ngang. <768: nút xuống dưới, rộng hết.'
    ], 12),
    B('Cặp nút cuối dòng', 'act', true, [
      'Thao tác.',
      '2 nút; nhãn "Gửi yêu cầu cho [tên]" dài tới ~30 ký tự.',
      '"Xem đơn vị" viền · "Gửi yêu cầu" đặc.',
      'Cách nhau 8px.',
      'Neo mép phải cố định, cùng vị trí ở mọi dòng.'
    ])
  ],
  rejected: ['Bảng 5 cột: cột năng lực dài làm vỡ bảng trên điện thoại.']
};

WHY['M3.3'] = {
  goal: 'Một trang cho cả Shop và hồ sơ nhận đặt hàng của một đơn vị.',
  points: [
    B('Băng danh tính', 'read', true, [
      'Đọc: biết đang ở đơn vị nào; giữ nguyên khi đổi tab.',
      '4 điểm: avatar, tên, địa chỉ · đánh giá, 2 nhãn. Tên dài 50 ký tự xuống 2 dòng.',
      'Mỏ neo: tên 30px · Hành động: nút đặc mép phải.',
      'Nền xám, không viền: tách khỏi phần thân bằng nền.',
      '12/12; avatar cố định 64px. Điện thoại: nút xuống dưới.'
    ], 12),
    B('Hai tab', 'act', true, [
      'Thao tác chuyển nội dung.',
      '2 tab; tab không áp dụng thì ẩn hẳn.',
      'Tab đang mở gạch dưới đậm.',
      'Đường kẻ mảnh dưới hàng tab.',
      '12/12, cuộn ngang nếu thêm tab.'
    ], 12),
    B('Lưới hàng có sẵn', 'read', true, [
      'Đọc và chọn.',
      'Thẻ sản phẩm như M2.0 (4 điểm).',
      'Như M2.0.',
      'Không viền.',
      '4 thẻ × 3 cột. <768: 2/hàng.'
    ], 12),
    B('Nhận làm + Điều kiện', 'read', true, [
      'Đọc để quyết định có gửi yêu cầu không.',
      '2 khối × 4 cặp nhãn–giá trị.',
      'Nhãn xám · giá trị đậm.',
      'Hai khối có viền vì nằm cạnh cột hành động.',
      '9/12 cột. <1024: rộng hết.'
    ], 9),
    B('Hộp hành động', 'act', true, [
      'Thao tác ngay sau khi đọc điều kiện.',
      '1 câu, 1 nút.',
      'Nút đặc rộng hết hộp.',
      'Viền đậm.',
      '3/12, dính khi cuộn.'
    ], 3)
  ],
  rejected: ['Một trang dài chứa cả hai phần: người chỉ mua hàng có sẵn phải cuộn qua hồ sơ năng lực.']
};

WHY['M3.4'] = {
  goal: 'Gửi yêu cầu cho một đơn vị; luôn nhìn thấy điều kiện của đơn vị đó khi điền.',
  points: [
    B('Form (cùng cấu trúc M3.1)', 'act', true, [
      'Thao tác; trên nếp gấp.',
      'Số hộp (112px), kiểu hộp, nhân, làm riêng, ngày (168px), địa chỉ, ghi chú.',
      'Như M3.1.',
      'Nhóm tách bằng tiêu đề + 32px, không viền.',
      '6/12 cột.'
    ], 6),
    B('Thẻ người nhận', 'read', true, [
      'Đọc để đối chiếu (tối thiểu, thời gian maket) trong khi điền.',
      '4 điểm: tên, khu vực, tối thiểu, maket.',
      'Mỏ neo: tên · Bổ trợ: cặp nhãn–giá trị 14px.',
      'Viền đậm vì là đối tượng của form.',
      '3/12, dính khi cuộn.'
    ], 3),
    B('Lối sang gửi nhiều nơi', 'act', false, [
      'Thao tác phụ; bỏ đi vẫn gửi được.',
      '1 câu có liên kết.',
      'Liên kết chữ.',
      'Nền xám, nhẹ.',
      '3/12 dưới thẻ người nhận.'
    ], 3)
  ],
  rejected: ['Ô "Đơn vị nhận" chỉ đọc trong form: tốn một trường mà ít thông tin hơn thẻ bên phải.']
};

WHY['M4.0'] = {
  goal: 'Rà món và thấy tổng tiền thật (gồm phí giao từng Shop) trước khi trả.',
  points: [
    B('Thanh 4 bước', 'read', false, [
      'Đọc định hướng.',
      '4 nhãn ≤ 22 ký tự.',
      'Bước hiện tại đậm.',
      'Không viền; vạch trên 4px.',
      '12/12; điện thoại chỉ hiện nhãn bước hiện tại.'
    ], 12),
    B('Nhóm theo Shop', 'read', true, [
      'Đọc: mỗi Shop thành một đơn, phí giao riêng.',
      'Tiêu đề Shop + phí giao + 1–n món.',
      'Mỏ neo: tên Shop 16px đậm · Bổ trợ: phí giao 14px xám mép phải.',
      'Mỗi Shop một thẻ có viền vì các nhóm xếp sát và món phải thuộc rõ về một Shop.',
      '9/12 cột.'
    ], 9),
    B('Dòng món', 'act', true, [
      'Thao tác sửa số lượng / xóa.',
      '5 điểm: ảnh, tên, đơn giá · tồn, số lượng, thành tiền. Tên dài → xuống 2 dòng trong phần co giãn.',
      'Mỏ neo: tên đậm · Bổ trợ: đơn giá xám · Hành động: ô số lượng, "Xóa" chữ cuối dòng (xa nút chính để tránh nhầm).',
      'Các phần cách 16px.',
      'Ảnh 64px và ô số lượng 112px cố định; tên co giãn; thành tiền canh phải 112px. <768: xuống dòng.'
    ]),
    B('Vượt tồn kho', 'act', false, [
      'Thao tác phụ (AC-08.2).',
      '1 câu, 1 nút.',
      'Nút viền nhỏ.',
      'Nền xám trong thẻ Shop: thuộc về đúng Shop đó.',
      'Rộng hết thẻ.'
    ]),
    B('Tóm tắt + Tiếp tục', 'act', true, [
      'Thao tác chính; trên nếp gấp và dính khi cuộn.',
      '3 dòng tiền + 1 ghi chú + nút. Tổng dài nhất ~12 ký tự.',
      'Mỏ neo: tổng 20px · Hành động: nút đặc 52px ngay dưới tổng.',
      'Viền đậm; dòng tổng tách bằng đường kẻ.',
      '3/12, dính. <1024: xuống cuối.'
    ], 3)
  ],
  rejected: ['Một bảng có tiêu đề cột cho mỗi Shop: lặp tiêu đề, nặng khi chỉ 1–2 món.']
};

WHY['M4.1'] = {
  goal: 'Chỉ hỏi những gì còn thiếu để giao và xuất hóa đơn.',
  points: [
    B('Giao tới', 'act', true, [
      'Thao tác chọn 1 địa chỉ.',
      '2 điểm/lựa chọn: tên + người nhận, địa chỉ.',
      'Cả thẻ là vùng bấm.',
      'Thẻ sát nhau → viền; thẻ chọn viền 2px.',
      '6/12; thẻ rộng hết.'
    ], 6),
    B('Hóa đơn doanh nghiệp', 'act', false, [
      'Thao tác tùy chọn: bỏ đi vẫn thanh toán được, nên đứng sau địa chỉ.',
      'Mã số thuế (10–14 ký tự → 240px), email, tên công ty (tới 120 ký tự → rộng hết).',
      'Ô đánh dấu đứng đầu nhóm.',
      'Không viền nhóm.',
      'MST cố định, email/tên công ty co giãn.'
    ], 6),
    B('Tóm tắt theo đơn', 'read', true, [
      'Đọc: tiền tách thành mấy đơn.',
      '1 dòng/đơn + tổng.',
      'Mỏ neo: tổng.',
      'Viền đậm.',
      '3/12, dính.'
    ], 3),
    B('Nút thanh toán', 'act', true, [
      'Thao tác chính; nút duy nhất của trang.',
      '1 nút.',
      'Đặc 52px, rộng hết cột.',
      'Ngay dưới tổng (16px).',
      'Rộng hết 4 cột; điện thoại rộng hết màn.'
    ])
  ],
  rejected: ['Form 5 ô địa chỉ cho mọi người.']
};

WHY['M4.2'] = {
  goal: 'Màn giả lập cổng VNPay dùng chung cho 4 loại tiền; cố ý trông khác Moonkage để người review không thiết kế nhầm.',
  points: [
    B('Thẻ cổng', 'act', true, [
      'Thao tác giả lập để luồng F1, F2, F4 bấm được trọn.',
      'Nội dung, số tiền, QR, 2 nút. Nội dung đổi theo loại tiền (mua, cọc, phần còn lại, phí mở bán).',
      'Mỏ neo: số tiền 30px · Bổ trợ: nhãn "Giả lập" viền đứt.',
      'Viền đứt cả thẻ = quy ước "ngoài hệ thống" của wireframe.',
      '4/12 cột căn giữa (cột 5–8, 432px), neo vào lưới thay cho 560px tự do. QR cố định 240px như .nfc-qr của DS.'
    ], 4),
    B('Nội dung thanh toán', 'read', true, [
      'Đọc để kiểm trước khi trả.',
      '3 cặp; nội dung dài nhất ~35 ký tự.',
      'Số tiền là chữ lớn nhất.',
      'Không viền trong thẻ.',
      'Rộng hết thẻ; cột nhãn co theo nội dung.'
    ]),
    B('Hai nút giả lập', 'act', true, [
      'Thao tác thử nhánh thành công / hủy.',
      '2 nút.',
      'Thành công đặc, hủy viền; cùng chiều rộng vì là hai kết quả của cổng, không phải chính/phụ của Moonkage.',
      'Cách nhau 8px.',
      'Rộng hết thẻ; điện thoại giữ nguyên.'
    ])
  ],
  rejected: []
};

WHY['M4.3'] = {
  goal: 'Xác nhận đã trả tiền và cho thấy tiền đã thành mấy đơn, mỗi đơn đi đâu.',
  points: [
    B('Kết quả', 'read', true, [
      'Đọc: câu trả lời "trả xong chưa".',
      'Dấu ✓, câu kết quả, mã lần thanh toán · số tiền · ngày.',
      'Mỏ neo: tiêu đề 30px · Bổ trợ: mã và ngày 16px xám.',
      'Không viền; căn giữa tạo một trục đọc từ ✓ xuống danh sách đơn.',
      '6/12 căn giữa (cột 4–9, 672px) thay cho 720px tự do.'
    ], 6),
    B('Các đơn vừa tạo', 'read', true, [
      'Đọc (AC-09.7); không đổi trạng thái gì.',
      'Mỗi dòng 4 điểm: mã + Shop, món, trạng thái, tiền. N đơn = N Shop trong giỏ (thường 1–3).',
      'Mỏ neo: mã đơn đậm · Hành động: "Xem đơn" viền nhỏ cuối dòng.',
      'Vách ngăn dòng.',
      '6/12; tiền canh phải 112px. <768: trạng thái và tiền xuống dòng 2.'
    ], 6),
    B('Nút tiếp theo', 'act', false, [
      'Thao tác; bỏ đi người dùng vẫn dùng menu được.',
      '2 nút.',
      '"Đến Đơn hàng" đặc (bước tiếp hợp lý nhất) · "Về trang chủ" chữ.',
      'Cách danh sách 32px.',
      'Căn giữa theo trục của trang.'
    ])
  ],
  rejected: ['Bảng 6 cột như bản đầu: quá rộng cho một trang xác nhận.']
};

WHY['M5.1'] = {
  goal: 'Đăng nhập rồi quay lại đúng việc đang dở (AC-02.3).',
  points: [
    B('Dải "xong sẽ quay về"', 'read', false, [
      'Đọc; chỉ hiện khi có trang quay về. Bỏ đi vẫn đăng nhập được, nhưng giữ để người bị chặn giữa chừng không bỏ đi.',
      '1 câu; tên trang dài tới ~30 ký tự.',
      'Bổ trợ 14px.',
      'Nền xám + vạch trái.',
      'Cùng chiều rộng 400px với form.'
    ]),
    B('Form đăng nhập', 'act', true, [
      'Thao tác duy nhất của trang.',
      'Email (tới 64 ký tự), mật khẩu, nút. Lỗi đăng nhập hiện trên nút, trong thẻ.',
      'Mỏ neo: tiêu đề · Hành động: nút đặc rộng hết thẻ, ngay dưới ô cuối (đường di chuyển ngắn nhất).',
      'Trường cách 20px; "Quên mật khẩu?" cùng hàng với nhãn mật khẩu (cùng nhóm nghĩa). Thẻ có viền vì đứng một mình giữa nền trống.',
      '400px cố định đúng .login__form của DS (≈3/12 cột), căn giữa. Điện thoại: rộng hết trừ lề 16px.'
    ]),
    B('Lối Đăng ký', 'act', false, [
      'Thao tác phụ.',
      '1 liên kết.',
      'Chữ thuần, ngoài thẻ để không cạnh tranh với nút Đăng nhập.',
      'Cách thẻ 16px.',
      'Căn giữa.'
    ])
  ],
  rejected: ['Hai cột có ảnh minh họa: thêm thứ để nhìn ở trang chỉ để đi qua.']
};
WHY['M5.2'] = {
  goal: 'Đăng ký bằng email (A-17).',
  points: [
    B('Form đăng ký', 'act', true, [
      'Thao tác.',
      'Email, mật khẩu, nhập lại; lỗi hiện tại ô sai ("Hai mật khẩu chưa khớp").',
      'Nút đặc rộng hết thẻ.',
      'Trường cách 20px; gợi ý độ dài sát ô (8px).',
      '400px như M5.1 để chuyển qua lại không giật.'
    ]),
    B('Lối Đăng nhập', 'act', false, ['Thao tác phụ.', '1 liên kết.', 'Chữ thuần.', 'Ngoài thẻ, cách 16px.', 'Cùng vị trí với lối Đăng ký ở M5.1 (hai trang soi gương).'])
  ],
  rejected: []
};
WHY['M5.3'] = {
  goal: 'Nhập mã xác nhận rồi đi tiếp.',
  points: [
    B('Form xác nhận', 'act', true, ['Thao tác.', 'Email đã gửi, 6 ô mã, nút, gửi lại / đổi email.', 'Nút đặc rộng hết; "Gửi lại mã" chữ ngay dưới.', 'Cách 20px.', '400px.']),
    B('6 ô mã', 'act', true, ['Thao tác.', 'Đúng 6 chữ số; số ô cho biết trước độ dài, dễ đối chiếu email từng số.', 'Chữ 20px đậm, căn giữa ô.', 'Ô cách 8px (cùng nhóm).', '6 × 48px cố định, cao 56px; điện thoại chia đều chiều rộng.'])
  ],
  rejected: []
};
WHY['M5.4'] = { goal: 'Gửi liên kết đặt lại mật khẩu.', points: [B('Form', 'act', true, ['Thao tác.', '1 ô email (tới 64 ký tự) + nút.', 'Nút đặc rộng hết; lối quay lại chữ ngoài thẻ.', 'Cách 20px.', '400px như M5.1.'])], rejected: [] };
WHY['M5.5'] = { goal: 'Đặt mật khẩu mới rồi đăng nhập.', points: [B('Form', 'act', true, ['Thao tác.', '2 ô + gợi ý độ dài dưới ô đầu.', 'Nút đặc rộng hết.', 'Hai ô cùng cỡ xếp dọc, cách 20px, để so ngay.', '400px.'])], rejected: [] };

WHY['M6.0'] = {
  goal: 'Trả lời "tôi cần làm gì bây giờ"; các mục khác đã có ở cột menu trái.',
  points: [
    B('Việc cần bạn', 'act', true, [
      'Thao tác; lý do chính để vào Tài khoản. Trên nếp gấp.',
      'Mỗi dòng 4 điểm: loại việc, mô tả, thời điểm, nút. 0 việc → một dòng "Không có việc chờ". Nhiều hơn 5 → "Xem tất cả".',
      'Mỏ neo: nhãn loại nền đậm + mô tả đậm · Bổ trợ: thời điểm 14px xám · Hành động: nút cuối dòng (đặc cho việc gấp nhất).',
      'Vách ngăn giữa dòng vì danh sách dày; không thêm khung ngoài.',
      '9/12 (bên phải cột menu 3/12). <768: nút xuống dòng.'
    ], 9),
    B('Ô số liệu', 'read', false, [
      'Đọc định hướng; bỏ đi vẫn tới được mọi mục qua menu.',
      '3 ô × 3 điểm: nhãn, số, liên kết.',
      'Mỏ neo: số 30px.',
      'Ba ô đặt sát nhau → viền mảnh.',
      '3 ô × 3 cột trong 9. <1024: 2 ô/hàng.'
    ], 9)
  ],
  rejected: ['6 thẻ lối vào lặp đúng cột menu trái.']
};

WHY['M6.1'] = {
  goal: 'Tìm một đơn và biết đơn đang ở đâu.',
  points: [
    B('Tab loại đơn', 'act', true, [
      'Thao tác chuyển giữa hai loại đơn có vòng đời khác nhau.',
      '2 tab.',
      'Tab đang mở gạch dưới đậm.',
      'Đường kẻ mảnh dưới hàng tab.',
      '9/12; cuộn ngang nếu thêm tab.'
    ], 9),
    B('Chip trạng thái', 'act', false, [
      'Thao tác lọc nhanh; bỏ đi vẫn tìm được đơn bằng cuộn.',
      '5 chip, nhãn ≤ 14 ký tự.',
      'Chip đặc = đang chọn.',
      'Chip cách 8px; cách bảng 16px.',
      'Xuống dòng khi hẹp.'
    ], 9),
    B('Nhóm theo lần thanh toán', 'read', true, [
      'Đọc: người mua nhớ "lần trả 1.145.000đ" hơn mã đơn từng Shop (AC-10.3).',
      'Đầu nhóm: mã lần thanh toán, ngày, tổng; bên trong 1–3 đơn.',
      'Bổ trợ: đầu nhóm 14px xám.',
      'Mỗi nhóm một thẻ có viền vì các nhóm xếp sát nhau và đơn phải thuộc rõ về một lần trả.',
      '9/12.'
    ], 9),
    B('Dòng đơn', 'act', true, [
      'Thao tác mở đơn.',
      '4 điểm: mã + Shop, món, trạng thái, tiền.',
      'Mỏ neo: mã đơn đậm · trạng thái đặt giữa để dò theo cột · "Xem" viền nhỏ cuối dòng.',
      'Vách ngăn dòng.',
      'Tiền canh phải 112px; <768 trạng thái và tiền xuống dòng 2.'
    ]),
    B('Bảng đơn đặt theo yêu cầu', 'read', true, [
      'Đọc: bước nào đang chờ mình.',
      '5 cột (>4 điểm nên dùng bảng thay thẻ).',
      'Nhãn bước nền đậm khi chờ người mua.',
      'Kẻ ngang.',
      '9/12. <768: bảng thành thẻ xếp chồng.'
    ], 9)
  ],
  rejected: ['Một bảng chung cho hai loại đơn: nhiều cột trống.']
};

WHY['M6.1.1'] = {
  goal: 'Biết đơn đang ở đâu và làm được bước tiếp theo.',
  points: [
    B('Tiêu đề + trạng thái', 'read', true, ['Đọc.', 'Loại đơn, mã, trạng thái, Shop · ngày · lần thanh toán.', 'Mỏ neo: mã 30px + nhãn trạng thái.', 'Không viền.', '12/12. Không có cột menu tài khoản: bỏ đi người dùng vẫn xong nhiệm vụ (đã có breadcrumb), trả chỗ cho cột hành động.'], 12),
    B('Tiến độ', 'read', true, ['Đọc.', '4 bước + mã vận đơn.', 'Bước hiện tại đậm.', 'Viền thẻ để tách khỏi danh sách món bên dưới.', '9/12.'], 9),
    B('Sản phẩm và tiền', 'read', false, ['Đọc như hóa đơn.', '1–n món + phí + tổng.', 'Mỏ neo: tổng.', 'Vách ngăn dòng.', '9/12; tiền canh phải.'], 9),
    B('Giao tới / Hóa đơn', 'read', false, ['Đọc tham khảo.', '2 khối × 2–3 dòng.', 'Tiêu đề 16px đậm.', 'Không viền: khoảng 24px giữa hai khối đủ tách.', '2 × 4 cột trong 8. <768: xếp chồng.'], 9),
    B('Lịch sử', 'read', false, ['Đọc.', 'Mỗi mốc 2 điểm: sự kiện, thời gian. Mới nhất trên.', 'Mỏ neo: sự kiện 16px đậm.', 'Chấm và đường nối thay viền.', '9/12.'], 9),
    B('Hộp hành động', 'act', true, ['Thao tác; trên nếp gấp, dính.', '3–4 nút theo trạng thái + lối báo vấn đề + hạn.', 'Nút chính đặc; nút chưa dùng được mờ; "Báo vấn đề" chữ, tách bằng đường kẻ.', 'Viền đậm.', '3/12; nút rộng hết hộp.'], 3)
  ],
  rejected: ['Giữ cột menu tài khoản: hộp hành động hẹp lại và nội dung chính mất 2 cột.']
};

WHY['M6.1.2'] = {
  goal: 'Đơn dài nhiều tuần: nói ngay đang chờ ai làm gì.',
  points: [
    B('Tiêu đề + trạng thái', 'read', true, ['Đọc.', 'Nhãn nói thẳng việc của người mua.', 'Nhãn đặc khi chờ người mua.', 'Không viền.', '12/12.'], 12),
    B('Thanh 5 bước', 'read', true, ['Đọc.', '5 nhãn ≤ 20 ký tự.', 'Bước hiện tại đậm.', 'Viền thẻ.', '12/12 rộng hết để đủ chỗ 5 nhãn.'], 12),
    B('Bốn tab', 'act', true, ['Thao tác.', '4 tab; tab có việc mở sẵn và có số đếm.', 'Gạch dưới.', 'Kẻ mảnh.', '9/12.'], 9),
    B('Tab Maket', 'act', true, ['Thao tác duyệt.', 'Ảnh, lần, ngày, ô góp ý; bản cũ gập.', 'Mỏ neo: ảnh.', 'Ảnh–góp ý cách 24px; không viền.', '2 × 4 cột trong 8. <768: xếp chồng.'], 9),
    B('Hộp hành động', 'act', true, ['Thao tác; trên nếp gấp.', '1 câu + 2 nút chính + 2 nút sau.', '"Duyệt maket" đặc · "Yêu cầu sửa" viền · trả tiền mờ.', 'Viền đậm.', '3/12, dính.'], 3)
  ],
  rejected: ['Hiện 4 phần trên một trang dài.']
};

WHY['M6.1.3'] = {
  goal: 'Báo vấn đề; xem kết quả trên cùng đường dẫn.',
  points: [
    B('Tiêu đề + hạn', 'read', true, ['Đọc: còn báo được không.', 'Đơn, Shop, ngày giao, hạn còn lại.', 'Hạn in đậm.', 'Không viền.', '12/12.'], 12),
    B('Form vấn đề', 'act', true, ['Thao tác.', '4 lựa chọn, mô tả (0–1.000 ký tự), ảnh (1–5).', 'Lựa chọn dạng thẻ.', 'Nhóm không viền.', '6/12; ảnh 4 ô vuông/hàng.'], 6),
    B('Sau khi gửi', 'read', false, ['Đọc trấn an.', '3 mốc.', 'Bổ trợ 14px.', 'Nền xám.', '3/12.'], 3)
  ],
  rejected: ['Ô "số tiền đề xuất" cho người mua: đặc tả để người bán đề xuất, quản trị quyết.']
};

WHY['M6.2'] = {
  goal: 'Thấy ngay yêu cầu nào đã có báo giá mới để vào so sánh.',
  points: [
    B('Tiêu đề + "Tạo yêu cầu báo giá"', 'act', false, [
      'Tiêu đề để đọc; nút là thao tác phụ (tạo yêu cầu mới không phải việc chính ở trang này).',
      '2 điểm: tên trang, nút.',
      'Mỏ neo: tiêu đề 30px · Hành động: nút đặc ở mép phải, chỗ quen của nút chính trong mọi danh sách (khuôn T1).',
      'Không viền; cách bảng 24px.',
      '9/12 cột (bên phải menu tài khoản). <768: nút xuống dòng, rộng hết.'
    ], 9),
    B('Bảng yêu cầu', 'read', true, [
      'Đọc để chọn yêu cầu cần mở; khối chính, trên nếp gấp.',
      'Mỗi yêu cầu 5 điểm (mã + tóm tắt, loại, mời/báo giá, trạng thái, nút) → quá 4 điểm cho một thẻ nên dùng bảng. Tóm tắt dài ("150 hộp in logo khắc laser nắp gỗ") cắt ở 1 dòng; ngày tạo xuống dòng 2. Rỗng → trạng thái rỗng có nút tạo yêu cầu.',
      'Mỏ neo: mã yêu cầu đậm · Bổ trợ: ngày 14px xám, loại là nhãn viền liền (gửi nhiều nơi) / viền đứt (gửi riêng) · Hành động: "So sánh" đặc chỉ ở dòng có báo giá mới, còn lại "Xem" viền.',
      'Chỉ kẻ ngang giữa các dòng (dữ liệu dày nên cần), không kẻ dọc; khoảng đệm ô 12/16px.',
      '9/12, co giãn. <768: mỗi dòng thành một thẻ xếp chồng, nhãn cột hiện trước giá trị.'
    ], 9),
    B('Cột "Mời / Báo giá"', 'read', true, [
      'Đọc: số báo giá là lý do mở yêu cầu.',
      '2 số "3 / 2"; tối đa 2 chữ số mỗi bên.',
      'Số báo giá đậm, số mời thường: mắt bắt con số sau dấu "/".',
      'Canh phải để các số thẳng hàng khi dò dọc.',
      'Cột co theo nội dung (~120px).'
    ])
  ],
  rejected: ['Thẻ cho mỗi yêu cầu: 5 điểm dữ liệu/thẻ, khó so dọc trạng thái và số báo giá.']
};

WHY['M6.2.1'] = {
  goal: 'So các báo giá trên cùng hàng tiêu chí rồi chấp nhận một báo giá.',
  points: [
    B('Tóm tắt yêu cầu', 'read', false, [
      'Đọc nhắc lại: người mua tự viết yêu cầu nên chỉ cần một dòng để đối chiếu; bỏ đi vẫn so được báo giá.',
      'Mã, số báo giá, tóm tắt (số hộp, làm riêng, nơi và hạn giao). Dòng dài nhất ~90 ký tự xuống 2 dòng; đủ chi tiết ở khối cuối trang.',
      'Mỏ neo: mã yêu cầu 30px + nhãn số báo giá · Bổ trợ: dòng tóm tắt 16px xám.',
      'Không viền; cách bảng 24px.',
      '12/12. Trang này bỏ cột menu tài khoản vì bảng so sánh cần đủ 12 cột (bỏ menu đi người dùng vẫn xong việc, đã có breadcrumb).'
    ], 12),
    B('Bảng so sánh', 'read', true, [
      'Đọc so ngang từng tiêu chí; khối chính.',
      'Cột = báo giá (2–5), hàng = 6 tiêu chí (giá, cọc, ngày giao, làm riêng, maket, đơn vị). Đơn vị chưa trả lời vẫn có cột mờ "—" để biết danh sách chưa đủ.',
      'Mỏ neo: hàng tổng giá chữ 30px · Bổ trợ: tên tiêu chí 14px xám ở cột trái.',
      'Kẻ ngang mảnh giữa tiêu chí; không đóng khung từng ô.',
      '12/12; cột tiêu chí cố định 160px, các cột báo giá chia đều phần còn lại. <768: khung bảng cuộn ngang, cột tiêu chí giữ nguyên.'
    ], 12),
    B('Hàng tổng giá', 'read', true, [
      'Đọc: tiêu chí so đầu tiên.',
      'Tổng (tới "120.000.000đ", 12 ký tự) + đơn giá mỗi hộp.',
      'Tổng 30px là chữ lớn nhất của bảng; đơn giá 14px xám ngay dưới (4px).',
      'Cùng kẻ ngang như các hàng khác.',
      'Theo cột báo giá.'
    ]),
    B('Nút "Chấp nhận" ở đầu mỗi cột', 'act', true, [
      'Thao tác chính. Ở bản trước nút nằm ở hàng cuối bảng, đo được y≈867, dưới nếp gấp → chuyển lên hàng tiêu đề, ngay dưới tên đơn vị.',
      '1 nút/cột báo giá; cột chưa có báo giá thay nút bằng nhãn "Chưa gửi báo giá".',
      'Nút đặc rộng hết cột: vùng bấm lớn và thẳng đúng cột để không chấp nhận nhầm.',
      'Tên đơn vị – nút cách 8px (cùng nhóm).',
      'Rộng theo cột; <768 cuộn cùng bảng.'
    ]),
    B('Yêu cầu bạn đã gửi', 'act', false, [
      'Đọc lại / đóng yêu cầu; hiếm dùng, bỏ đi vẫn chấp nhận được.',
      '4 cặp nhãn–giá trị + nút đóng.',
      'Bổ trợ: cặp nhãn–giá trị · Hành động: "Đóng yêu cầu" viền đứt (không đảo ngược được).',
      'Gập trong "details" có viền để ẩn mặc định.',
      '12/12.'
    ], 12)
  ],
  rejected: ['Nút "Chấp nhận" ở hàng cuối bảng: dưới nếp gấp.', 'Thẻ báo giá xếp dọc: phải nhớ giá thẻ trên khi đọc thẻ dưới.']
};

WHY['M6.2.2'] = {
  goal: 'Xác nhận đúng báo giá và hiểu rõ trả bao nhiêu bây giờ, bao nhiêu sau.',
  points: [
    B('Thanh 4 bước', 'read', false, [
      'Đọc định hướng: cùng khuôn T5 với giỏ hàng nên người dùng nhận ra đây là luồng thanh toán.',
      '4 nhãn ≤ 22 ký tự.',
      'Bước hiện tại đậm, bước đã qua có dấu ✓.',
      'Không viền; vạch trên 4px.',
      '12/12; điện thoại chỉ hiện nhãn bước hiện tại.'
    ], 12),
    B('Báo giá đã chọn', 'read', true, [
      'Đọc: nhắc lại đúng điều sắp đồng ý.',
      '4 cặp: số hộp, làm riêng, giao trước, maket + liên kết "Đổi báo giá".',
      'Mỏ neo: tên đơn vị · Bổ trợ: nhãn xám · Hành động: "Đổi báo giá" chữ ở góc thẻ.',
      'Viền mảnh để tách khỏi khối đồng ý bên dưới.',
      '9/12.'
    ], 9),
    B('Đồng ý', 'act', true, [
      'Thao tác bắt buộc trước khi trả.',
      '2 ô đánh dấu; câu đồng ý dài ~100 ký tự xuống 2 dòng.',
      'Ô đánh dấu 20px, vùng bấm gồm cả câu chữ.',
      'Không viền; tiêu đề nhóm và khoảng 32px tách khỏi thẻ trên.',
      '9/12.'
    ], 9),
    B('Tóm tắt + nút đặt cọc', 'act', true, [
      'Thao tác chính; trên nếp gấp và dính khi cuộn.',
      '3 số: giá trị đơn, cọc bây giờ, trả sau.',
      'Mỏ neo: "Đặt cọc bây giờ" 20px là số sẽ bị trừ ngay · Bổ trợ: trả sau 14px · Hành động: nút đặc 52px ngay dưới.',
      'Viền đậm; dòng cọc tách bằng đường kẻ.',
      '3/12, dính. <1024: xuống cuối.'
    ], 3)
  ],
  rejected: ['Trình bày "hợp đồng" nhiều đoạn: low-fi chỉ cần các điều khoản quyết định.']
};

WHY['M6.3'] = {
  goal: 'Quản lý vài địa chỉ đã lưu.',
  points: [
    B('Lưới địa chỉ', 'act', true, [
      'Thao tác sửa / xóa / thêm; khối chính.',
      '1–5 địa chỉ + ô "Thêm". Không có địa chỉ nào → chỉ còn ô "Thêm" lớn.',
      'Thẻ mặc định đứng đầu (vị trí đọc đầu tiên).',
      'Các thẻ đặt sát nhau trên lưới nên cần viền; ô "Thêm" viền đứt để không đọc nhầm thành một địa chỉ.',
      '2 thẻ × 6 cột trong phần 9 cột bên phải menu. <768: 1 cột.'
    ], 9),
    B('Thẻ mặc định', 'read', true, [
      'Đọc: địa chỉ này được chọn sẵn ở thanh toán và hộp chọn khu vực.',
      '3 điểm: tên gợi nhớ, người nhận · điện thoại, địa chỉ (tới 120 ký tự → 2 dòng).',
      'Mỏ neo: tên gợi nhớ đậm + nhãn "Mặc định" đặc · Bổ trợ: địa chỉ 14px xám.',
      'Viền đậm thay viền thường để nổi hơn các thẻ khác.',
      'Theo thẻ (6 cột).'
    ]),
    B('Nút trên thẻ', 'act', false, [
      'Thao tác sửa / đặt mặc định / xóa.',
      '1–3 nút; thẻ mặc định không có "Xóa" (phải đặt địa chỉ khác làm mặc định trước).',
      '"Sửa" là nút viền; các thao tác ít dùng là chữ.',
      'Đáy thẻ, cách nội dung 16px.',
      'Xuống dòng khi thẻ hẹp.'
    ])
  ],
  rejected: ['Bảng địa chỉ: địa chỉ dài nhiều dòng, bảng khiến cột địa chỉ rất cao và các cột khác trống.']
};

WHY['M6.3.1'] = {
  goal: 'Thêm hoặc sửa một địa chỉ.',
  points: [
    B('Người nhận', 'act', true, [
      'Thao tác.',
      'Họ tên (≤ 50 ký tự → ô tối đa 420px), điện thoại (12 ký tự → ô 200px). Ô rộng theo dữ liệu chứ không kéo hết hàng.',
      'Nhãn 14px đậm, dấu * cho trường bắt buộc.',
      'Không viền nhóm; tiêu đề nhóm 21px đủ tách.',
      'Hai trường cùng hàng ≥768px, xếp chồng trên điện thoại.'
    ], 6),
    B('Địa chỉ', 'act', true, [
      'Thao tác.',
      'Tỉnh (select), chi tiết (tới 120 ký tự → rộng hết 8 cột), tên gợi nhớ (≤ 20 ký tự), ô mặc định.',
      'Nhãn đậm · gợi ý 14px xám dưới ô.',
      'Trường cách nhau 20px; nhóm cách nhóm 32px.',
      '6/12 cột.'
    ], 6),
    B('Nút Lưu / Hủy', 'act', true, [
      'Thao tác kết thúc form.',
      '2 nút.',
      '"Lưu địa chỉ" đặc bên phải (cuối đường đọc) · "Hủy" chữ bên trái.',
      'Cách nhóm cuối 32px.',
      'Điện thoại: xếp chồng, nút chính trên, rộng hết (vùng bấm cho ngón cái).'
    ], 6)
  ],
  rejected: []
};

WHY['M6.3.2'] = {
  goal: 'Xác nhận xóa một địa chỉ.',
  points: [
    B('Câu hệ quả', 'read', true, [
      'Đọc trước khi quyết.',
      'Địa chỉ (≤ 120 ký tự) + 1 câu "đơn đã đặt không bị ảnh hưởng".',
      'Tiêu đề là câu hỏi có tên địa chỉ (21px); câu hệ quả 16px xám.',
      'Không viền trong hộp thoại.',
      'Hộp thoại 480px như DS; điện thoại rộng hết trừ lề 16px.'
    ]),
    B('Hai nút', 'act', true, [
      'Thao tác.',
      '2 nút.',
      '"Xóa địa chỉ" (ghi đúng hành động) bên phải · "Giữ lại" chữ bên trái.',
      'Cách nội dung 24px.',
      'Canh phải; giữ một hàng trên điện thoại.'
    ])
  ],
  rejected: []
};

WHY['M6.4'] = {
  goal: 'Màn chờ trong lúc người dùng làm các bước trên điện thoại; xong tự quay về việc đang làm.',
  points: [
    B('Dải "xong sẽ quay lại"', 'read', false, [
      'Đọc; chỉ hiện khi trang mở như bước chen (từ M3.1, M3.4, M7.1).',
      '1 câu + tên trang quay về.',
      'Bổ trợ 16px.',
      'Nền xám + vạch trái, không viền đủ.',
      '9/12.'
    ], 9),
    B('Mã QR + các bước', 'act', true, [
      'Thao tác quét; khối chính, trên nếp gấp.',
      'QR + 4 bước, mỗi bước ≤ 40 ký tự.',
      'Mỏ neo: QR 240px · Bổ trợ: các bước dạng thanh bước dọc.',
      'Viền đậm gom QR và các bước thành một việc.',
      'QR cố định 240px như .nfc-qr của DS; các bước co giãn. <1024: bước xuống dưới QR.'
    ]),
    B('Trạng thái phiên', 'read', true, [
      'Đọc: cho biết trang vẫn đang chờ, tự cập nhật.',
      '1 nhãn.',
      'Nhãn nền xám ngay dưới QR, nơi mắt nhìn sau khi quét.',
      'Cách QR 8px.',
      'Theo cột QR.'
    ]),
    B('Cột phụ', 'act', false, [
      'Thao tác khi có sự cố; bỏ đi người có app vẫn xong việc.',
      '1 câu "chưa có app", nút giả lập, ghi chú lỗi.',
      'Ghi chú lỗi 14px xám.',
      'Nền xám, nhẹ hơn khối QR.',
      '3/12 của phần nội dung; <1024 xuống dưới.'
    ])
  ],
  rejected: ['Hướng dẫn dạng đoạn văn: khó theo khi mắt chuyển giữa màn hình và điện thoại.']
};

WHY['M6.5'] = {
  goal: 'Xem thông tin tài khoản; tách rõ phần sửa được và phần chỉ xem.',
  points: [
    B('Tài khoản', 'act', false, [
      'Đọc, thỉnh thoảng sửa.',
      '3 cặp: tên hiển thị, email (tới 64 ký tự), mật khẩu.',
      'Nhãn 14px xám · giá trị 16px đậm · nút "Sửa" viền nhỏ ở góc.',
      'Không viền: khoảng 32px giữa hai nhóm đủ tách.',
      '6/12 (672px), không kéo hết 9 cột để dòng không quá dài.'
    ], 6),
    B('Danh tính đã xác minh', 'read', false, [
      'Đọc.',
      '3 cặp; số định danh che giữa.',
      'Nhãn "Chỉ xem" ở góc.',
      'Nền xám = quy ước chỉ đọc trong cả wireframe.',
      '6/12.'
    ], 6)
  ],
  rejected: []
};

WHY['M6.6'] = {
  goal: 'Thông báo mua hàng của tài khoản; mỗi dòng mở đúng trang. Thông báo cửa hàng ở hộp riêng (B7.0).',
  points: [
    B('Danh sách thông báo', 'act', true, [
      'Thao tác mở trang đích.',
      '3 điểm/dòng: tiêu đề (≤ 60 ký tự), nguồn · thời gian, nút. Rỗng → "Chưa có thông báo".',
      'Mỏ neo: tiêu đề đậm khi chưa đọc · Bổ trợ: nguồn 14px xám.',
      'Vách ngăn dòng; dòng chưa đọc nền xám.',
      '12/12 (trang này không có cột menu Tài khoản).'
    ], 12)
  ],
  rejected: [
    'Một hộp chung có lọc Mua / Bán: thông báo cửa hàng lẫn vào việc mua của chủ cửa hàng. Tách hai hộp, mỗi khu một chuông.'
  ]
};

WHY['M7.0'] = {
  goal: 'Người bán tự đánh giá có đủ điều kiện không trước khi khai hồ sơ.',
  points: [
    B('Tiêu đề + nút "Khai hồ sơ"', 'act', true, [
      'Thao tác cho người đã đọc từ lần trước; không bắt họ cuộn xuống tìm nút.',
      '2 điểm.',
      'Mỏ neo: tiêu đề 30px · Hành động: nút đặc 52px ở mép phải.',
      'Không viền.',
      '12/12; điện thoại nút rộng hết.'
    ], 12),
    B('Hai cách bán', 'read', true, [
      'Đọc so sánh.',
      '3 điểm/thẻ: tên, mô tả, 2 điều kiện.',
      'Mỏ neo: tên 21px · Bổ trợ: điều kiện trên nền xám.',
      'Hai thẻ sát nhau → viền.',
      '6 + 6. <768: xếp chồng.'
    ], 12),
    B('Các bước', 'read', false, [
      'Đọc: phí nằm ở bước 4, sau khi duyệt.',
      '5 nhãn.',
      'Thanh bước mảnh.',
      'Không viền.',
      '12/12; điện thoại chỉ số.'
    ], 12),
    B('Cần chuẩn bị / Công ty', 'read', false, [
      'Đọc kiểm điều kiện; người không đủ thấy ngay lối ra.',
      '3 dòng / 1 câu.',
      'Tiêu đề 16px đậm.',
      'Bên trái viền mảnh (danh sách cần làm), bên phải nền xám (trường hợp ngoại lệ).',
      '6 + 6. <768: xếp chồng.'
    ], 12)
  ],
  rejected: []
};

WHY['M7.1'] = {
  goal: 'Khai hồ sơ dài, cần giấy tờ, thường làm nhiều lần: mỗi màn chỉ một nhóm câu hỏi.',
  points: [
    B('Thanh 6 bước', 'read', true, [
      'Đọc: còn bao xa, bước nào đã xong.',
      '6 nhãn ≤ 22 ký tự.',
      'Bước hiện tại đậm, đã xong có ✓.',
      'Không viền.',
      '12/12; điện thoại chỉ nhãn bước hiện tại.'
    ], 12),
    B('Form bước hiện tại', 'act', true, [
      'Thao tác; trên nếp gấp.',
      '2–4 trường/bước. Mã đăng ký 10–14 ký tự → 240px; điện thoại 200px; tên và địa chỉ rộng hết.',
      'Tiêu đề bước 21px · nhãn 14px đậm.',
      'Không viền nhóm.',
      '6/12.'
    ], 6),
    B('Dữ liệu từ CCCD (bước 3)', 'read', false, [
      'Đọc, không gõ lại.',
      '2 cặp.',
      'Giá trị đậm.',
      'Nền xám = chỉ đọc.',
      'Rộng hết form.'
    ]),
    B('Quay lại / Tiếp tục', 'act', true, [
      'Thao tác chuyển bước.',
      '2 nút; bước cuối đổi thành "Nộp hồ sơ".',
      '"Tiếp tục" đặc bên phải, cùng chỗ ở mọi bước · "Quay lại" chữ bên trái.',
      'Cách nhóm 32px.',
      'Điện thoại: xếp chồng, nút chính trên.'
    ], 6),
    B('Sau khi nộp', 'read', false, [
      'Đọc trấn an; bỏ đi vẫn nộp được.',
      '1 câu.',
      'Bổ trợ 14px.',
      'Nền xám.',
      '3/12, dính. <1024: xuống dưới.'
    ], 3)
  ],
  rejected: ['Một form dài: mất chỗ khi quay lại sau lúc đi lấy giấy tờ.']
};

WHY['M8.0'] = {
  goal: 'Trang đọc chính sách: dễ đọc, nhảy được tới đúng mục.',
  points: [
    B('Dải "Cần xác nhận"', 'read', false, [
      'Đọc: báo cho người review nội dung chưa duyệt.',
      '1 nhãn + 1 câu.',
      'Nhãn viền đứt.',
      'Nền xám.',
      '12/12.'
    ], 12),
    B('Mục lục trang', 'act', false, [
      'Thao tác nhảy mục; trang ngắn thì bỏ được.',
      '3 liên kết.',
      'Tiêu đề "Trên trang này" đậm.',
      'Viền mảnh vì đứng cạnh khối chữ dài.',
      '3/12, dính khi cuộn. <1024: lên trên nội dung.'
    ], 3),
    B('Nội dung', 'read', true, [
      'Đọc.',
      '3 mục; thời hạn dạng bảng 2 cột để so ngay giữa các loại đơn.',
      'Tiêu đề mục 21px · đoạn 16px/26px.',
      'Không viền; mục cách mục 32px.',
      '8/12 cột cạnh mục lục 3/12 (để trống 1 cột bên phải), đoạn văn giới hạn 65 ký tự/dòng (khoảng 45–75) nên không kéo hết chiều rộng.'
    ], 8)
  ],
  rejected: []
};
