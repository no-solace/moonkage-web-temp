// Thuyết minh bố cục – khu Mua hàng (M).
// Mỗi trang: goal (trang để làm gì), points ([tiêu đề, lý do] – số thứ tự khớp data-why trên trang),
// rejected (phương án đã cân nhắc nhưng không chọn).
var WHY = window.WHY || {};
window.WHY = WHY;

WHY['M1.0'] = {
  goal: 'Cửa vào chung cho hai kiểu mua rất khác nhau. Việc đầu tiên là giúp người dùng tự nhận ra mình thuộc kiểu nào, rồi mới cho xem hàng.',
  points: [
    ['Hỏi khu vực trước mọi thứ (chỉ khách)', 'Sản phẩm, giá và phí giao đều phụ thuộc vùng giao (AC-05.3). Hỏi trước thì mọi thứ hiện bên dưới đều đúng; hỏi sau thì người dùng thấy món ưng rồi mới biết không giao được.'],
    ['Hai thẻ lối vào ngang hàng, kèm điều kiện thật', 'Tree test (Đ1, cây B) cho thấy người dùng phân biệt theo "có sẵn hay phải làm", không theo số lượng. Hai thẻ cùng cỡ nói rằng hai lối quan trọng như nhau. Dòng điều kiện (xác minh, đặt cọc) cho người dùng chọn đúng ngay, khỏi đi nửa đường mới bị chặn.'],
    ['"Việc cần bạn" chỉ một dòng', 'Người quay lại thường đến để xử lý việc dở (maket, báo giá). Một dòng đủ để nhắc mà không đẩy nội dung mua xuống; chi tiết nằm ở Tài khoản.'],
    ['Tiêu đề lưới lặp lại tên tỉnh', '"Có sẵn giao tới Hà Nội" nhắc rằng bộ lọc vùng giao đang bật ngầm. Lưới 4 cột, ảnh 4:3: ảnh là thứ người mua quét đầu tiên khi chọn hộp quà; giá đặt cuối thẻ để mắt dừng ở đó.'],
    ['Đơn vị nhận đặt hàng ở cuối, mỗi thẻ có điều kiện riêng', 'Nhóm này ít người hơn nhưng đơn lớn, nên đứng sau hàng có sẵn. Mỗi thẻ ghi số hộp tối thiểu của chính đơn vị đó, không có ngưỡng chung. Nút dùng đúng nhãn "Gửi yêu cầu cho [tên]".']
  ],
  rejected: [
    'Hero lớn có khẩu hiệu và con số ("100% …"): trái luật không tuyên bố không kiểm chứng, lại đẩy hai lối vào xuống dưới nếp gấp.',
    'Lịch mùa, đồng hồ đếm ngược: đã loại theo Đ3.',
    'Một nút "Mua ngay" chung: xóa mất phân luồng có sẵn / theo yêu cầu đã chốt.'
  ]
};

WHY['M1.1'] = {
  goal: 'Lấy đúng một thông tin (giao tới đâu) với ít công nhất, rồi trả người dùng về chỗ cũ.',
  points: [
    ['Người đã đăng nhập chọn từ địa chỉ đã lưu', 'Họ đã nhập địa chỉ rồi, bắt chọn lại tỉnh là bắt làm lại việc. Thẻ radio lớn dễ bấm trên điện thoại và hiện đủ địa chỉ để phân biệt "Nhà" với "Văn phòng".'],
    ['Khách chỉ chọn tỉnh/thành', 'Vùng giao chỉ cần tới tỉnh để lọc sản phẩm. Hỏi địa chỉ chi tiết ở đây là hỏi quá sớm; để tới bước thanh toán.'],
    ['Hai nút: "Để sau" nhẹ, nút chính nói rõ kết quả', 'Khuôn T6 chỉ có hai nút. Nút chính ghi "Xem hàng giao tới đây" thay vì "Xác nhận" để người dùng biết bấm xong sẽ thấy gì. "Để sau" dạng chữ để không cạnh tranh với nút chính.']
  ],
  rejected: [
    'Trang riêng thay cho hộp thoại: rời khỏi trang đang xem chỉ vì một ô chọn là thừa.',
    'Tự đoán vị trí bằng GPS: cần xin quyền trình duyệt, dễ sai khi mua quà gửi tỉnh khác.'
  ]
};

WHY['M2.0'] = {
  goal: 'Giúp người mua thu hẹp nhanh từ nhiều hộp bánh xuống vài món để xem kỹ, luôn trong phạm vi giao được.',
  points: [
    ['Tiêu đề kèm "giao được tới Hà Nội · Đổi khu vực"', 'Vùng giao là bộ lọc ngầm luôn bật. Nói ra ngay dưới tiêu đề để người dùng không tưởng sàn ít hàng, và đổi được ngay tại chỗ.'],
    ['Khối Đơn vị cung cấp tách riêng, đặt trên lưới', 'Khi từ khóa là tên đơn vị (AC-14.5), người dùng đang tìm một nơi chứ không tìm một món. Khối viền đậm tách khỏi lưới để không lẫn với sản phẩm, và không bị lọc vùng giao vì đơn vị có thể giao toàn quốc.'],
    ['Bộ lọc cột trái theo đúng 5 nhóm của đặc tả', 'Cột trái cố định là mẫu quen thuộc của trang danh mục; người dùng chỉnh nhiều lần mà không mất vị trí. Dòng chú thích HOẶC / VÀ giải thích vì sao kết quả co lại. Trên điện thoại cột gập lại thành "Bộ lọc".'],
    ['Chip lọc đang bật ngay trên lưới', 'Người dùng thấy và gỡ từng điều kiện mà không phải kéo lên cột lọc. Sắp xếp đặt cùng hàng, bên phải, vì là thao tác phụ.'],
    ['Lưới 3 cột, mỗi thẻ: ảnh → tên → Shop + đánh giá → giá', 'Thứ tự theo cách người mua quét: nhìn hộp, đọc tên, tin được không, giá bao nhiêu. Cả thẻ là một liên kết lớn, dễ bấm.'],
    ['Trạng thái rỗng có hai lối ra', '"Bỏ hết bộ lọc" cho người lọc quá tay; "Tạo yêu cầu báo giá" cho người cần thứ không có sẵn. Không để người dùng đứng ở ngõ cụt.']
  ],
  rejected: [
    'Bộ lọc dạng thanh ngang trên cùng: 5 nhóm nhiều lựa chọn sẽ phải mở từng menu, khó thấy tổng thể.',
    'Cuộn vô tận: khó quay lại đúng chỗ sau khi xem chi tiết; giữ phân trang.'
  ]
};

WHY['M2.1'] = {
  goal: 'Trả lời đủ ba câu hỏi trước khi mua: hộp trông thế nào, ai làm, giao được không; rồi đặt nút mua ngay cạnh câu trả lời.',
  points: [
    ['Ảnh lớn bên trái, chiếm nửa màn hình', 'Bánh trung thu thường mua làm quà, nên hình hộp là lý do chính để chọn. Ảnh vuông và 4 ảnh phụ cho thấy hộp, bánh cắt, nhãn.'],
    ['Nhãn "Sản phẩm của bạn" thay cho khối mua (BR-22)', 'Chủ Shop không được mua hàng của mình. Thay khối mua bằng nhãn và nút "Sửa sản phẩm" để không có nút chết.'],
    ['Giá lớn, ngay dưới tên', 'Giá là thông tin quyết định thứ hai sau ảnh; đặt ở vị trí mắt tới ngay sau khi đọc tên.'],
    ['Khối mua viền đậm: tồn kho + vùng giao + số lượng + nút', 'Gom mọi thứ cần cho quyết định vào một khối. "Còn 42 hộp · giao tới Hà Nội" trả lời câu "giao được không" ngay cạnh nút. Phí giao chỉ ghi "từ …" vì tính theo Shop ở giỏ.'],
    ['Lối "Gửi yêu cầu cho Shop này" nằm dưới, nhẹ hơn', 'Phục vụ người cần số lượng lớn hoặc in logo (F3) mà không cạnh tranh với nút "Thêm vào giỏ".'],
    ['Thông tin hộp dạng cặp nhãn – giá trị', 'Vỏ, nhân, quy cách dùng đúng tên của bộ lọc ở M2.0, để người dùng đối chiếu được với điều họ đã lọc.'],
    ['Đánh giá ở cuối trang', 'Người cần thêm bằng chứng mới kéo xuống; không chen giữa ảnh và nút mua.']
  ],
  rejected: [
    'Nút "Mua ngay" bỏ qua giỏ: giỏ tách đơn theo Shop và tính phí giao từng Shop, bỏ qua giỏ sẽ làm sai phí.',
    'Câu chữ quảng cáo dài về sản phẩm: low-fi chỉ cần thông tin để chọn.'
  ]
};

WHY['M3.0'] = {
  goal: 'Trang trung chuyển (T4): người dùng chỉ cần chọn giữa hai cách đặt, nên bố cục chỉ có tiêu đề và hai thẻ.',
  points: [
    ['Tiêu đề + một dòng mô tả, không có gì khác phía trên', 'Ở trang trung chuyển, mọi khối đặt trên hai thẻ đều làm chậm quyết định. Dòng mô tả là bộ lọc: ai không thuộc nhóm này quay lại ngay.'],
    ['Hai thẻ cùng cỡ, đặt cạnh nhau', 'Đặt ngang hàng để mắt so sánh trực tiếp từng tầng của hai thẻ (khi nào chọn ↔ khi nào chọn, điều kiện ↔ điều kiện). Xếp dọc thì phải nhớ thẻ trên khi đọc thẻ dưới. Trên điện thoại hai thẻ mới xếp chồng.'],
    ['Cấu trúc trong thẻ giống hệt nhau: nhãn → tên → khi nào chọn → điều kiện → nút', 'Cùng thứ tự nên mắt đọc theo hàng ngang. Điều kiện nằm trong nền xám để tách khỏi mô tả, và đứng ngay trên nút để người dùng đọc trước khi bấm. Nút luôn dính đáy thẻ để hai nút thẳng hàng.'],
    ['Thanh 5 bước ở dưới cùng', 'Đặt sau hai thẻ vì là thông tin phụ: chỉ người còn lưỡng lự mới kéo xuống. Dạng thanh bước ngang cho thấy cả quy trình trong một hàng, không cần đọc đoạn văn.']
  ],
  rejected: [
    'Ba thẻ (thêm thẻ giải thích quy trình): làm loãng lựa chọn hai lối, nên quy trình bị hạ xuống thành thanh bước bên dưới.',
    'Bố cục dạng bảng so sánh: chính xác nhưng nặng, không có chỗ cho nút bấm rõ ràng ở mỗi lối.'
  ]
};

WHY['M3.1'] = {
  goal: 'Form một trang (T3) với cột phải cho kết quả dự kiến, để người dùng biết ngay yêu cầu của mình có ai nhận không.',
  points: [
    ['Form chia 3 nhóm fieldset theo thứ tự quyết định', 'Bánh và hộp → làm riêng → giao hàng: từ thứ người dùng chắc chắn nhất đến thứ phụ thuộc. Mỗi nhóm có viền và số thứ tự để form dài vẫn chia thành khúc ngắn dễ quét.'],
    ['Lỗi hiện ngay tại trường, viền đậm', 'Đặt thông báo dưới đúng ô gây lỗi để người dùng sửa tại chỗ, không phải cuộn lên đầu form tìm lỗi.'],
    ['Lựa chọn làm riêng dạng thẻ radio dọc', 'Mỗi lựa chọn cần một dòng giải thích phụ, nên thẻ dọc có chỗ hơn dropdown và cho thấy hết lựa chọn cùng lúc.'],
    ['Cột phải dính khi cuộn: "Sẽ gửi tới N đơn vị"', 'Đây là phản hồi cho từng thay đổi trong form, nên phải luôn trong tầm mắt. Đặt cạnh form (không phải cuối form) để người dùng thấy con số đổi khi đang chỉnh. Trên màn hẹp, cột này xuống dưới form.']
  ],
  rejected: [
    'Form nhiều bước: yêu cầu chỉ khoảng 8 trường; chia bước sẽ giấu mất những gì đã nhập khi người dùng muốn rà lại.',
    'Đặt số đơn vị khớp ở cuối form: người dùng chỉ biết "0 đơn vị" sau khi đã điền hết.'
  ]
};

WHY['M3.2'] = {
  goal: 'Danh sách (T1) để tìm một đơn vị theo tên hoặc theo năng lực rồi vào trang của họ.',
  points: [
    ['Tiêu đề trái, nút chính phải', 'Mẫu chung của khuôn T1. Nút "Tạo yêu cầu báo giá" ở góc phải là lối thoát cho người chưa muốn chọn một nơi cụ thể.'],
    ['Ô tìm và chip lọc trên cùng một hàng', 'Hai cách thu hẹp danh sách (theo tên, theo năng lực) nằm cạnh nhau nên người dùng thấy cả hai cùng lúc. Ô tìm đặt trước vì AC-14.6 coi tìm theo tên là cách chính.'],
    ['Mỗi đơn vị là một thẻ ngang: danh tính trái, nút phải', 'Thông tin để so sánh (khu vực, tối thiểu, công suất) xếp thành 2 dòng ngắn dưới tên, đọc dọc dễ hơn một bảng nhiều cột. Thẻ ngang đổi thành thẻ dọc trên điện thoại mà không mất cột nào.'],
    ['Hai nút luôn ở cùng một chỗ trên mỗi thẻ', 'Cột nút thẳng hàng bên phải giúp người dùng không phải tìm lại nút ở mỗi dòng. Nút "Xem đơn vị" viền mảnh, "Gửi yêu cầu" nền đậm theo thứ tự cam kết tăng dần.']
  ],
  rejected: [
    'Bảng 5 cột như bản cũ: chữ năng lực dài làm cột phình, trên điện thoại phải cuộn ngang.',
    'Lưới thẻ 3 cột: đơn vị không có ảnh sản phẩm để làm điểm nhìn, nên thẻ lưới chỉ toàn chữ và khó so sánh.'
  ]
};

WHY['M3.3'] = {
  goal: 'Trang chi tiết (T2) gộp Shop và hồ sơ nhận đặt hàng; đầu trang cố định, phần thân đổi theo tab.',
  points: [
    ['Băng đầu trang nền xám: danh tính trái, nút chính phải', 'Phần không đổi giữa hai tab gom vào một băng để người dùng luôn biết mình đang ở đơn vị nào. Nút "Gửi yêu cầu" đặt ở đây để dùng được từ cả hai tab.'],
    ['Hai tab thay vì hai trang', 'AC-34.1 gộp hai trang; tab cho phép ẩn hẳn tab không áp dụng (đơn vị không có Shop) mà bố cục vẫn giữ nguyên.'],
    ['Tab Hàng có sẵn dùng đúng lưới sản phẩm của M2.0', 'Cùng một thẻ sản phẩm ở mọi nơi nên người dùng không phải học lại cách đọc.'],
    ['Tab Nhận đặt hàng: hai khối cặp nhãn – giá trị', 'Tách "Nhận làm" và "Điều kiện" thành hai khối vì người dùng hỏi hai câu khác nhau: làm được không, và với điều kiện gì.'],
    ['Hộp hành động dính ở cột phải', 'Lặp lại nút chính ngay cạnh phần điều kiện, đúng lúc người dùng vừa đọc xong và quyết định.']
  ],
  rejected: [
    'Đặt cả hai phần trên một trang dài: người chỉ muốn mua hàng có sẵn phải cuộn qua hồ sơ năng lực và ngược lại.'
  ]
};

WHY['M3.4'] = {
  goal: 'Form gửi cho một đơn vị: giống M3.1 về cấu trúc, nhưng cột phải nhắc người nhận thay vì số đơn vị khớp.',
  points: [
    ['Cùng 3 nhóm fieldset như M3.1', 'Hai form yêu cầu dùng chung bố cục để người từng gửi một loại không phải học lại loại kia; React sau này dùng chung một component.'],
    ['Cột phải: thẻ người nhận viền đậm', 'Người dùng cần đối chiếu yêu cầu với điều kiện của đơn vị (tối thiểu, thời gian maket) khi đang điền, nên thẻ đặt cạnh form và dính khi cuộn.'],
    ['Lối chuyển sang "gửi nhiều nơi" ở dưới thẻ, nền xám nhạt', 'Có chỗ cho người đổi ý nhưng nhẹ hơn hẳn nút gửi để không kéo người dùng ra khỏi form.']
  ],
  rejected: [
    'Ô "Đơn vị nhận" chỉ đọc trong form như bản cũ: chiếm một trường mà không cho sửa; thẻ bên phải cho thấy nhiều hơn với cùng diện tích.'
  ]
};

WHY['M4.0'] = {
  goal: 'Bước 1 của khuôn T5: rà món và thấy tổng tiền thật (đã gồm phí giao từng Shop) trước khi trả.',
  points: [
    ['Thanh bước 4 bước trên cùng', 'Cho thấy người dùng đang ở đâu và còn mấy bước. Bốn bước giống hệt nhau ở M4.0, M4.1, M4.3 để thanh bước là "khung" cố định, chỉ nội dung giữa đổi.'],
    ['Món nhóm theo Shop, mỗi Shop một thẻ', 'Mỗi Shop giao riêng và tính phí riêng, sau này thành một đơn riêng. Đặt phí giao ở đầu thẻ Shop để người dùng hiểu vì sao tổng có nhiều dòng phí.'],
    ['Một dòng món: ảnh nhỏ → tên → số lượng → thành tiền → xóa', 'Đọc trái sang phải theo đúng thứ tự kiểm tra: đúng món chưa, bao nhiêu, hết bao nhiêu. Cột thành tiền canh phải để các số thẳng hàng. "Xóa" dạng chữ ở cuối để tránh bấm nhầm.'],
    ['Lối vượt ngưỡng nằm ngay trong thẻ Shop', 'Gợi ý "Gửi yêu cầu cho Shop này" gắn với đúng Shop đang thiếu hàng, không đặt chung ở cuối trang nơi người dùng không biết nó áp cho Shop nào.'],
    ['Cột tóm tắt bên phải, dính khi cuộn, nút chính ở đáy', 'Mẫu T5: tiền luôn trong tầm mắt dù giỏ dài. Nút "Tiếp tục" nằm ngay dưới con số tổng: đọc tổng xong là bấm. Trên điện thoại cột này xuống cuối.']
  ],
  rejected: [
    'Bảng chung cho mọi món như bản cũ (một bảng mỗi Shop có đủ tiêu đề cột): lặp tiêu đề, nặng mắt khi chỉ có 1–2 món.',
    'Đặt nút tiếp tục ở cuối danh sách: giỏ dài thì phải cuộn mới thấy nút.'
  ]
};

WHY['M4.1'] = {
  goal: 'Bước 2: chỉ hỏi những gì còn thiếu để giao và xuất hóa đơn; tiền vẫn nằm cố định bên phải.',
  points: [
    ['Địa chỉ dạng thẻ chọn từ địa chỉ đã lưu', 'Người mua đã có địa chỉ thì chọn một thẻ thay vì gõ 5 ô. Mỗi thẻ hiện đủ tên, số điện thoại, địa chỉ để chọn đúng. "+ Thêm địa chỉ" nằm cuối nhóm, nơi người dùng tìm khi không thấy địa chỉ mình cần.'],
    ['Hóa đơn: một ô đánh dấu mở các trường bên dưới', 'Nhập một lần cho mọi đơn của lần thanh toán. Ô đánh dấu đặt trên cùng để ai không cần hóa đơn bỏ qua cả nhóm. Mã số thuế và email cạnh nhau vì đều ngắn.'],
    ['Tóm tắt liệt kê theo đơn, không theo món', 'Ở bước này người dùng đã rà món xong; điều mới cần biết là tiền sẽ tách thành 2 đơn. Cùng vị trí với tóm tắt ở M4.0 để mắt không phải tìm lại.'],
    ['Nút thanh toán chỉ có ở cột tóm tắt', 'Một nút chính duy nhất, đặt dưới con số tổng. Form bên trái chỉ có lối "‹ Giỏ hàng" để quay lại, tránh hai nút chính cạnh tranh.']
  ],
  rejected: [
    'Form địa chỉ 5 ô cho mọi người: bắt người đã có địa chỉ gõ lại.',
    'Hiện ô voucher: tính năng hoãn trong demo, để ô trống sẽ gây hiểu nhầm.'
  ]
};

WHY['M4.2'] = {
  goal: 'Màn giả lập cổng VNPay: chỉ để luồng bấm được, nên bố cục cố ý trông khác Moonkage.',
  points: [
    ['Một thẻ giữa trang, viền nét đứt', 'Viền đứt và nhãn "Giả lập · ngoài hệ thống" báo cho người review đây không phải màn Moonkage cần thiết kế. Đặt giữa trang, hẹp, giống cổng thanh toán thật.'],
    ['Số tiền là dòng lớn nhất', 'Màn này dùng chung cho 4 loại tiền; con số và nội dung là thứ duy nhất người dùng cần kiểm trước khi trả.'],
    ['Hai nút xếp dọc, cùng chiều rộng', 'Hai kết quả (thành công / hủy) để thử cả hai nhánh của luồng; xếp dọc để không ai hiểu nhầm là "nút chính / nút phụ" của Moonkage.']
  ],
  rejected: []
};

WHY['M4.3'] = {
  goal: 'Bước cuối: xác nhận đã trả tiền và cho thấy tiền đã thành mấy đơn, mỗi đơn đi đâu.',
  points: [
    ['Khối kết quả căn giữa, cột hẹp 720px', 'Trang chỉ đọc, không nhập; cột hẹp ở giữa gom mắt vào một trục từ dấu ✓ xuống danh sách đơn rồi tới nút.'],
    ['Danh sách đơn thay cho bảng 6 cột', 'Mỗi đơn một dòng: mã + Shop → trạng thái → tiền → nút. Đủ để biết tiền chia thế nào (AC-09.7) mà không cần bảng ngang khó đọc trên điện thoại.'],
    ['Một nút chính "Đến Đơn hàng", một lối chữ về trang chủ', 'Bước tiếp theo hợp lý nhất là theo dõi đơn, nên chỉ nút đó được tô đậm.']
  ],
  rejected: [
    'Bỏ thanh bước ở trang kết quả: giữ lại với mọi bước đã ✓ để người dùng thấy quy trình đã kết thúc.'
  ]
};

WHY['M5.1'] = {
  goal: 'Cổng đăng nhập: một việc duy nhất, rồi trả người dùng về đúng thao tác họ đang làm dở (AC-02.3).',
  points: [
    ['Dải "xong sẽ quay về …" đặt trên form', 'Người tới đây thường bị chặn giữa chừng (thêm vào giỏ, gửi yêu cầu). Dải này nói trước rằng việc dở không mất, nên người dùng yên tâm đăng nhập thay vì quay đi. Chỉ hiện khi có trang quay về.'],
    ['Một cột hẹp 420px giữa trang, form trong một thẻ', 'Trang chỉ có 2 ô; cột hẹp giữ mắt đi thẳng một trục từ trên xuống, ô nhập không bị kéo dài vô nghĩa trên màn rộng. Cả 5 trang M5 dùng chung khung này.'],
    ['"Quên mật khẩu" cạnh nhãn mật khẩu, "Đăng ký" ngoài thẻ', 'Lối phụ đặt đúng chỗ người dùng cần: quên mật khẩu khi đang nhìn ô mật khẩu. Đăng ký nằm ngoài thẻ để không cạnh tranh với nút Đăng nhập.']
  ],
  rejected: [
    'Bố cục hai cột có ảnh minh họa bên cạnh: thêm thứ để nhìn ở một trang mà người dùng chỉ muốn đi qua nhanh.',
    'Hộp thoại đăng nhập chồng lên trang: bản React sẽ cần đường dẫn riêng /dang-nhap để nhận ?next=.'
  ]
};
WHY['M5.2'] = {
  goal: 'Đăng ký chỉ bằng email, cùng khung một cột với đăng nhập.',
  points: [
    ['Cùng khung với M5.1', 'Người dùng chuyển qua lại giữa đăng nhập và đăng ký; giữ nguyên vị trí thẻ và nút để việc chuyển không gây giật mắt. Lỗi hiện ngay dưới ô sai.'],
    ['Lối "Đăng nhập" ngoài thẻ, cùng vị trí với lối "Đăng ký" ở M5.1', 'Hai trang soi gương nhau: cùng một chỗ để chuyển sang trang kia.']
  ],
  rejected: []
};
WHY['M5.3'] = {
  goal: 'Nhập mã xác nhận và đi tiếp.',
  points: [
    ['Cùng khung một cột', 'Bước này nối tiếp M5.2 nên giữ nguyên khung.'],
    ['6 ô mã ngang hàng', 'Số ô cho biết trước độ dài mã và dễ đối chiếu với email từng số. Lối "Gửi lại mã" ngay dưới nút cho người chưa nhận được.']
  ],
  rejected: []
};
WHY['M5.4'] = {
  goal: 'Một ô email, một nút.',
  points: [['Cùng khung một cột, lối quay lại dưới thẻ', 'Trang phụ của đăng nhập nên dùng đúng khung đó; lối quay lại đặt dưới thẻ để người bấm nhầm thoát ra được ngay.']],
  rejected: []
};
WHY['M5.5'] = {
  goal: 'Đặt mật khẩu mới rồi đăng nhập.',
  points: [['Cùng khung một cột, hai ô xếp dọc', 'Hai ô cùng cỡ xếp dọc để so được ngay; gợi ý độ dài nằm dưới ô đầu, nơi người dùng đang gõ.']],
  rejected: []
};

WHY['M6.0'] = {
  goal: 'Trang đầu khu Tài khoản: trả lời "tôi cần làm gì bây giờ" trước, các mục khác đã có ở cột menu trái.',
  points: [
    ['"Việc cần bạn" đứng đầu, mỗi việc một dòng có nút riêng', 'Người vào Tài khoản thường để xử lý một việc cụ thể. Mỗi dòng: nhãn loại việc (nền đậm = cần hành động) → mô tả → nút làm ngay, nên không cần mở thêm trang để hiểu việc. Số đếm cạnh tiêu đề cho biết còn bao nhiêu.'],
    ['Ba ô số liệu nhỏ ở dưới', 'Chỉ giữ các con số giúp định hướng (đơn đang chạy, yêu cầu mở, trạng thái xác minh). Cột menu trái đã liệt kê đủ các mục, nên không lặp lại 6 thẻ lối vào như bản cũ.']
  ],
  rejected: [
    'Lưới 6 thẻ, mỗi thẻ là một mục menu: lặp đúng cột menu bên trái, đẩy "Việc cần bạn" thành phần nhỏ.'
  ]
};

WHY['M6.1'] = {
  goal: 'Danh sách đơn (T1) cho hai loại đơn có vòng đời rất khác nhau.',
  points: [
    ['Hai tab theo loại đơn', 'Đơn có sẵn và đơn đặt theo yêu cầu có các bước khác nhau, nên mỗi tab có cách hiển thị riêng thay vì một bảng chung toàn cột trống.'],
    ['Chip trạng thái ngay dưới tab', 'Lọc nhanh theo trạng thái là thao tác thường dùng nhất; chip thấy hết lựa chọn mà không cần mở menu.'],
    ['Tab có sẵn: nhóm đơn theo lần thanh toán', 'Người mua nhớ "lần tôi trả 1.145.000đ" chứ không nhớ mã đơn từng Shop (AC-10.3). Mỗi lần thanh toán là một thẻ, bên trong là các đơn con.'],
    ['Một dòng đơn: mã + Shop → trạng thái → tiền → nút', 'Nhãn trạng thái đặt giữa để mắt dò cột trạng thái theo chiều dọc; tiền canh phải; nút "Xem" ở cuối dòng cố định vị trí.'],
    ['Tab theo yêu cầu: cột "Đang ở bước" nhấn đậm khi chờ bạn', 'Đơn theo yêu cầu kéo dài nhiều tuần; điều quan trọng là bước nào đang chờ người mua, nên nhãn nền đậm chỉ dùng cho các bước đó. Bảng đổi thành thẻ trên điện thoại.']
  ],
  rejected: [
    'Một bảng chung cho cả hai loại đơn: cột mã vận đơn vô nghĩa với đơn đặt hàng, cột maket vô nghĩa với đơn có sẵn.'
  ]
};

WHY['M6.1.1'] = {
  goal: 'Chi tiết đơn (T2): biết đơn đang ở đâu, và làm được việc tiếp theo mà không phải tìm nút.',
  points: [
    ['Tiêu đề kèm nhãn trạng thái', 'Câu hỏi đầu tiên luôn là "đơn tới đâu rồi"; nhãn đặt ngay cạnh mã đơn trả lời trước khi đọc gì khác.'],
    ['Thanh tiến độ 4 bước ở đầu cột chính', 'Cho thấy cả quãng đường còn lại, không chỉ trạng thái hiện tại. Mã vận đơn nằm ngay dưới vì chỉ có ý nghĩa ở bước "Đang giao".'],
    ['Sản phẩm và tiền dạng danh sách có dòng tổng', 'Đọc như hóa đơn: món → phí giao → tổng, số canh phải.'],
    ['Giao tới và Hóa đơn: hai thẻ cạnh nhau', 'Hai khối tham khảo, ngắn, cùng tầm quan trọng; đặt ngang hàng để tiết kiệm chiều dọc.'],
    ['Lịch sử dạng dòng thời gian, mới nhất trên cùng', 'Khối Lịch sử của khuôn T2. Dòng thời gian dọc đọc nhanh hơn bảng 3 cột và dài ra tự nhiên khi đơn có thêm sự kiện.'],
    ['Cột phải: hành động theo trạng thái, dính khi cuộn', 'Mọi nút ở một chỗ cố định trên mọi trang chi tiết. Nút chính phụ thuộc trạng thái (đang giao → "Xác nhận đã nhận"); nút chưa dùng được thì mờ kèm lý do. "Báo vấn đề với đơn" tách bằng đường kẻ, dạng chữ, kèm hạn, để không bấm nhầm.']
  ],
  rejected: [
    'Khối tóm tắt 4 ô ở đầu trang như bản cũ: tách mã vận đơn, tiền, Shop ra xa nơi chúng có nghĩa.'
  ]
};

WHY['M6.1.2'] = {
  goal: 'Chi tiết đơn đặt hàng (T2): đơn kéo dài nhiều tuần, qua nhiều bước, nên bố cục phải nói ngay "đang chờ ai làm gì".',
  points: [
    ['Nhãn trạng thái nói thẳng người phải làm', '"Chờ bạn duyệt maket" thay cho "Đang xử lý": nhãn nền đậm chỉ dùng khi việc nằm ở phía người mua.'],
    ['Thanh 5 bước riêng một băng, trên cả hai cột', 'Đơn đặt hàng có nhiều mốc hơn đơn có sẵn; thanh bước rộng hết trang để đủ chỗ cho 5 nhãn và cho thấy đây là quy trình dài.'],
    ['Bốn tab, tab đang cần việc mở sẵn và có số đếm', 'Maket, tiến độ, tiền, hóa đơn là 4 chủ đề tách biệt; tab giữ trang ngắn. Trang mở đúng tab có việc chờ thay vì luôn mở tab đầu.'],
    ['Tab Maket: ảnh trái, góp ý phải; bản cũ gập lại', 'Người duyệt nhìn ảnh và viết góp ý cùng lúc nên hai thứ đặt cạnh nhau. Các lần maket trước gập trong "details" để không đẩy bản mới xuống.'],
    ['Hộp hành động đổi theo bước', 'Cùng vị trí với M6.1.1. Ở bước maket chỉ có "Duyệt" (đậm) và "Yêu cầu sửa"; nút trả phần còn lại hiện mờ kèm thời điểm dùng được để người mua biết trước bước sau.']
  ],
  rejected: [
    'Hiện cả 4 phần trên một trang dài: phần tiến độ và thanh toán đẩy maket (việc cần làm) xuống dưới nếp gấp.'
  ]
};

WHY['M6.1.3'] = {
  goal: 'Một trang cho hai trạng thái: chưa gửi (form) và đã gửi (kết quả). Đường dẫn giữ nguyên để thông báo luôn mở đúng chỗ.',
  points: [
    ['Hạn còn lại ngay trong dòng mô tả dưới tiêu đề', 'Thời hạn quyết định người dùng còn báo được không, nên đặt ở chỗ đọc đầu tiên.'],
    ['Lý do dạng thẻ chọn, rồi mô tả, rồi ảnh', 'Từ dễ đến khó: chọn một ô → viết vài chữ → tải ảnh. Ảnh dạng lưới ô vuông cho thấy đã tải gì và còn chỗ thêm.'],
    ['Cột phải giải thích điều xảy ra sau khi gửi', 'Người khiếu nại lo nhất là tiền. Dòng thời gian 3 bước cho thấy tiền được giữ ngay từ bước 1, đặt cạnh nút Gửi để giảm do dự.']
  ],
  rejected: [
    'Ô "số tiền đề xuất hoàn" trong form của người mua: đặc tả để người bán đề xuất và quản trị quyết định, người mua chỉ mô tả vấn đề.'
  ]
};

WHY['M6.2'] = {
  goal: 'Danh sách yêu cầu (T1): thấy ngay yêu cầu nào có báo giá mới để vào so sánh.',
  points: [
    ['Tiêu đề trái, "Tạo yêu cầu báo giá" phải', 'Cùng mẫu T1 với mọi danh sách khác.'],
    ['Bảng 5 cột, cột Loại dùng nhãn viền liền / viền đứt', 'Hai loại yêu cầu ("Gửi nhiều nơi" / "Gửi riêng [đơn vị]") phân biệt bằng kiểu viền để quét dọc thấy ngay. Bảng hợp ở đây vì mỗi dòng có nhiều số cần so (mời / báo giá).'],
    ['Cột "Mời / Báo giá" canh phải, số báo giá in đậm', 'Số báo giá là lý do để mở yêu cầu; in đậm số sau dấu "/" để mắt bắt ngay. Dòng có báo giá mới có nút nền đậm "So sánh".']
  ],
  rejected: []
};

WHY['M6.2.1'] = {
  goal: 'So sánh báo giá: đặt các báo giá thành cột cạnh nhau để so từng tiêu chí trên cùng một hàng.',
  points: [
    ['Tóm tắt yêu cầu thu gọn thành một dòng dưới tiêu đề', 'Người dùng đã tự viết yêu cầu; chỉ cần nhắc ngắn để đối chiếu. Đủ chi tiết nằm ở cuối trang. Số đơn vị chưa trả lời đặt góc phải để biết còn chờ thêm hay không.'],
    ['Bảng: mỗi báo giá một cột, mỗi tiêu chí một hàng', 'Mắt so ngang theo hàng (giá ↔ giá, ngày giao ↔ ngày giao). Đơn vị chưa trả lời vẫn có cột mờ để người dùng biết danh sách chưa đủ.'],
    ['Tổng giá là hàng đầu, chữ lớn nhất', 'Giá là tiêu chí so đầu tiên; đơn giá/hộp nhỏ bên dưới để so khi số hộp khác nhau.'],
    ['Nút "Chấp nhận" ở hàng cuối, đúng dưới mỗi cột', 'Đọc hết một cột là tới nút của cột đó, không thể bấm nhầm báo giá.'],
    ['Yêu cầu gốc gập lại ở cuối, kèm "Đóng yêu cầu"', 'Hành động hủy ít dùng và không đảo ngược được, nên giấu trong phần gập, viền đứt.']
  ],
  rejected: [
    'Thẻ báo giá xếp dọc như bản cũ: phải nhớ giá thẻ trên khi đọc thẻ dưới.',
    'Tô nổi "báo giá rẻ nhất": Moonkage không xếp hạng hộ người mua; mọi cột trông như nhau.'
  ]
};

WHY['M6.2.2'] = {
  goal: 'Bước T5: xác nhận đúng báo giá và hiểu rõ trả bao nhiêu bây giờ, bao nhiêu sau.',
  points: [
    ['Thanh bước 4 bước giống M4.x', 'Cùng khuôn T5 với giỏ hàng nên người dùng nhận ra đây là luồng thanh toán.'],
    ['Thẻ báo giá đã chọn, có "Đổi báo giá"', 'Nhắc lại đúng những gì sắp đồng ý, lối đổi đặt ở góc thẻ.'],
    ['Ô đồng ý đứng riêng một nhóm', 'Tách việc đồng ý ra khỏi thông tin để người dùng phải chủ động đánh dấu.'],
    ['Tóm tắt tiền: dòng tổng là "cọc bây giờ", phần còn lại nhỏ bên dưới', 'Con số in đậm phải là số sẽ trừ ngay; số trả sau ghi nhỏ để không nhầm.']
  ],
  rejected: ['Trình bày "hợp đồng" dài: low-fi chỉ cần các điều khoản quyết định (giá, hạn, giữ tiền).']
};

WHY['M6.3'] = {
  goal: 'Quản lý vài địa chỉ: mỗi địa chỉ một thẻ, thao tác ngay trên thẻ.',
  points: [
    ['Lưới 2 cột thẻ thay vì bảng', 'Địa chỉ là đoạn chữ dài nhiều dòng; thẻ giữ nguyên hình dạng một địa chỉ thật. Ô "+ Thêm địa chỉ" viền đứt nằm cuối lưới, đúng chỗ địa chỉ mới sẽ xuất hiện.'],
    ['Thẻ mặc định viền đậm, nhãn nền đậm, đứng đầu', 'Địa chỉ được dùng ở thanh toán và hộp thoại khu vực nên phải nhận ra ngay.'],
    ['Nút ở đáy thẻ; thẻ mặc định không có "Xóa"', 'Thay vì nút xóa bị mờ, bỏ hẳn: phải đặt địa chỉ khác làm mặc định trước. "Sửa" là nút, các thao tác ít dùng là chữ.']
  ],
  rejected: []
};

WHY['M6.3.1'] = {
  goal: 'Form ngắn (T3): người nhận, rồi địa chỉ.',
  points: [
    ['Họ tên và điện thoại trên một hàng', 'Hai trường ngắn đi đôi với nhau; ghép một hàng làm form ngắn đi một nửa.'],
    ['Tỉnh trước, chi tiết sau', 'Tỉnh quyết định vùng giao nên hỏi trước; ô chi tiết dài nhất để chiếm cả hàng.'],
    ['Nút Lưu cuối form, canh phải; Hủy là chữ bên trái', 'Mẫu chung của mọi form T3 trong wireframe.']
  ],
  rejected: []
};

WHY['M6.3.2'] = {
  goal: 'Hộp thoại xác nhận (T6) trên nền trang địa chỉ.',
  points: [
    ['Tiêu đề là câu hỏi có tên địa chỉ, nội dung nói hệ quả', 'Đọc tiêu đề là biết đang xóa cái gì; dòng dưới trả lời nỗi lo về đơn đã đặt.'],
    ['"Giữ lại" chữ, "Xóa địa chỉ" nút', 'Nút nói đúng hành động thay vì "Đồng ý", để không bấm theo thói quen.']
  ],
  rejected: []
};

WHY['M6.4'] = {
  goal: 'Màn chờ trong lúc người dùng làm việc trên điện thoại: phải cho thấy mã để quét, các bước bên app, và đang chờ tới đâu.',
  points: [
    ['Dải "xong sẽ quay lại …" trên cùng', 'Trang thường mở như bước chen giữa M3.1 / M3.4 / M7.1; nói trước rằng việc dở sẽ tiếp tục để người dùng không bỏ ngang.'],
    ['Mã QR trái, các bước bên app phải, trong một thẻ đậm', 'Người dùng nhìn mã khi cầm điện thoại, rồi nhìn các bước để biết làm gì tiếp; đặt cạnh nhau để không phải cuộn giữa chừng. Các bước xếp dọc vì mỗi bước là một hành động trên điện thoại.'],
    ['Nhãn trạng thái phiên ngay dưới mã', 'Trang tự cập nhật; nhãn "Đang chờ điện thoại quét…" cho biết trang vẫn sống, đặt cạnh mã để mắt thấy khi vừa quét xong.'],
    ['Cột phụ: chưa có app, giả lập, lỗi', 'Thông tin chỉ người gặp vấn đề mới cần, nên đứng ngoài thẻ chính.']
  ],
  rejected: ['Hướng dẫn dạng đoạn văn như bản cũ: khó theo dõi khi mắt chuyển qua lại giữa màn hình và điện thoại.']
};

WHY['M6.5'] = {
  goal: 'Xem thông tin tài khoản; tách rõ phần sửa được và phần không sửa được.',
  points: [
    ['Khối "Tài khoản" có nút Sửa', 'Phần người dùng tự đặt, sửa được, nền trắng như mọi form.'],
    ['Khối "Danh tính đã xác minh" nền xám, nhãn "Chỉ xem"', 'Nền xám là quy ước chỉ đọc trong cả wireframe. Số định danh đã che. Tách khối để người dùng không đi tìm nút sửa họ tên.']
  ],
  rejected: []
};

WHY['M6.6'] = {
  goal: 'Một hộp thông báo cho cả mua và bán (Đ7); mỗi dòng dẫn thẳng tới trang cần làm.',
  points: [
    ['Ba tab Tất cả / Mua / Bán', 'Từ Kênh người bán, chuông mở sẵn tab Bán; từ khu mua mở Tất cả. Tab Bán chỉ hiện với tài khoản có hồ sơ người bán.'],
    ['Dòng chưa đọc nền xám, nhãn khu bên trái, nút Mở bên phải', 'Nhãn Mua / Bán đứng đầu dòng để biết thông báo mở sang khu nào trước khi bấm; nhãn Bán nền đậm vì chuyển khu.']
  ],
  rejected: ['Thông báo nằm dưới menu Tài khoản (có cột trái): thông báo bán không thuộc tài khoản mua, nên trang đứng riêng, không có cột menu.']
};

WHY['M7.0'] = {
  goal: 'Trang giới thiệu: người dùng tự đánh giá mình có đủ điều kiện không trước khi khai hồ sơ.',
  points: [
    ['Nút "Khai hồ sơ" ngay đầu trang, bên phải', 'Người quay lại trang lần hai đã đọc rồi; không bắt họ cuộn xuống tìm nút.'],
    ['Hai cách bán dạng hai thẻ ngang hàng', 'Dùng lại khuôn thẻ lối vào của trang chủ; người bán so hai cách theo cùng cấu trúc.'],
    ['Thanh 5 bước, phí nằm ở bước 4', 'Đặt phí trong dòng các bước cho thấy phí chỉ đóng sau khi duyệt, thay vì một câu dễ bị đọc lướt.'],
    ['Cần chuẩn bị (trái) và trường hợp công ty (phải, nền xám)', 'Hai khối kiểm tra điều kiện đặt cuối, cạnh nhau: người đủ điều kiện đọc trái, người không đủ thấy ngay lối ra bên phải.']
  ],
  rejected: ['Khẩu hiệu "tiếp cận hàng chục ngàn người mua", "không chiết khấu": tuyên bố không kiểm chứng và nói về hoa hồng, trái luật mục 1.']
};

WHY['M7.1'] = {
  goal: 'Form nhiều bước (T3): hồ sơ dài, cần giấy tờ, thường làm làm nhiều lần; mỗi màn chỉ một nhóm câu hỏi.',
  points: [
    ['Thanh 6 bước trên cùng', 'Hồ sơ có ~15 trường và 2 tệp. Chia bước theo đúng thứ tự trong đặc tả để mỗi màn chỉ một chủ đề; thanh bước cho biết còn bao xa và bước nào đã xong.'],
    ['Một cột form hẹp, cột phải cho thông tin phụ', 'Cùng khung với mọi form T3. Cột phải chỉ trả lời câu "nộp xong thì sao", không có nút.'],
    ['Bước Chủ hộ hiện dữ liệu CCCD sẵn, nền xám', 'Thông tin lấy từ chip, không gõ lại; nền xám = chỉ đọc, đồng bộ với M6.5.'],
    ['Nút Quay lại (chữ, trái) – Tiếp tục (đậm, phải)', 'Hướng đi tới luôn ở bên phải, cùng một chỗ ở mọi bước; ở bước cuối nút đổi thành "Nộp hồ sơ".'],
    ['Bước Xem lại có "Sửa" cạnh từng mục', 'Nhảy thẳng về đúng bước thay vì bấm Quay lại nhiều lần.']
  ],
  rejected: ['Một form dài như bản cũ: người dùng mất chỗ khi quay lại sau lúc đi lấy giấy tờ, và lỗi ở cuối form khó thấy.']
};

WHY['M8.0'] = {
  goal: 'Trang đọc (chính sách): ưu tiên dễ đọc và nhảy tới đúng mục.',
  points: [
    ['Dải "Cần xác nhận" trên cùng', 'Trang chưa được duyệt nội dung; báo rõ cho người review.'],
    ['Mục lục dính ở cột trái', 'Người tới đây thường tìm một câu trả lời cụ thể (còn bao lâu để khiếu nại), mục lục cho nhảy thẳng tới.'],
    ['Cột chữ giới hạn ~68 ký tự, thời hạn dạng bảng', 'Dòng chữ ngắn dễ đọc; các con số thời hạn đặt trong bảng nhỏ để so ngay giữa các loại đơn.']
  ],
  rejected: []
};
