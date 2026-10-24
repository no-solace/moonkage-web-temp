// Thuyết minh bố cục – Kênh người bán (B). Cấu trúc như why-m.js.
var WHY = window.WHY || {};
window.WHY = WHY;

WHY['B1.0'] = {
  goal: 'Trang đầu Kênh người bán, có hai bố cục khác hẳn nhau: trước khi mở bán chỉ có một việc (theo dõi hồ sơ), sau khi mở bán có nhiều việc song song.',
  points: [
    ['Trước mở bán: một thẻ trạng thái lớn chiếm cột chính', 'Lúc này người bán chỉ hỏi "hồ sơ tới đâu, tôi cần làm gì". Một thẻ duy nhất với tiêu đề là trạng thái, một câu giải thích và đúng một nút (nếu có việc) trả lời đủ. Ba trạng thái (chờ / đã duyệt / cần bổ sung) dùng chung khung, chỉ đổi chữ và nút.'],
    ['Thanh 4 bước trong thẻ', 'Cho thấy đường tới lúc bán được, và phí nằm ở đâu trong đường đó, để người bán không bất ngờ.'],
    ['Cột phụ: lối xem hồ sơ và cài đặt', 'Hai mục duy nhất mở được trước khi mở bán; menu trên cũng chỉ còn các mục này.'],
    ['Sau mở bán: hàng 4 ô "Việc cần làm"', 'Đúng 4 loại việc của đặc tả, mỗi ô là số + nơi xử lý. Xếp ngang để thấy cả 4 trong một cái nhìn; ô nào bằng 0 vẫn giữ chỗ để vị trí không nhảy.'],
    ['"Cần chú ý" dạng danh sách dưới các ô', 'Việc có hạn (khiếu nại cần phản hồi) cần câu chữ và hạn chót, không gói được vào một con số, nên đứng riêng dạng dòng với nhãn nền đậm.']
  ],
  rejected: [
    'Biểu đồ doanh số trên trang tổng quan: không phục vụ việc cần làm hôm nay, và đặc tả không yêu cầu.',
    'Hiện menu Đơn hàng/Sản phẩm mờ trước khi mở bán: ẩn hẳn theo đặc tả để không có lối chết.'
  ]
};

WHY['B1.1'] = {
  goal: 'Khuôn T5 cho một khoản phí: xác nhận đã được duyệt, nói phí mở ra điều gì, rồi trả.',
  points: [
    ['Thanh bước nối tiếp thanh bước ở B1.0', 'Cùng 4 bước, giờ ở bước 3: người bán thấy đây là bước cuối trước khi bán.'],
    ['Cột chính: dải "Đã duyệt" và danh sách việc sau khi đóng', 'Trả lời "trả xong thì sao" bằng các bước cụ thể, thay cho danh sách quyền lợi quảng cáo.'],
    ['Cột tóm tắt phải giống M4.x, có "Để sau"', 'Cùng vị trí, cùng kiểu tóm tắt với mọi màn thanh toán. "Để sau" dạng chữ để không cạnh tranh với nút trả.']
  ],
  rejected: ['Danh sách "quyền lợi" và "không thu chiết khấu": quảng cáo, nhắc tới hoa hồng, trái luật mục 1.']
};

WHY['B2.0'] = {
  goal: 'Danh sách đơn (T1) của người bán: thấy ngay đơn nào đang chờ mình.',
  points: [
    ['Tab theo cách bán đã bật', 'Đơn Shop và đơn đặt hàng có quy trình khác nhau, nên hai bảng với cột riêng. Người chỉ bật một cách bán chỉ thấy một tab.'],
    ['Chip mặc định "Cần làm"', 'Người bán mở trang để xử lý, nên lọc sẵn những đơn chờ mình. "Chưa có hóa đơn" và "Đang khiếu nại" là chip riêng vì là việc riêng.'],
    ['Bảng 5 cột, nút cuối dòng đổi chữ theo việc', 'Nút "Xử lý" nền đậm cho đơn chờ mình, "Xem" viền mảnh cho đơn đang chạy: quét dọc cột nút là thấy việc.'],
    ['Nhãn "Đang khiếu nại" nền đậm cạnh trạng thái', 'Khiếu nại có hạn phản hồi; đặt cạnh trạng thái giao hàng để không bị lẫn vào dòng chữ phụ.']
  ],
  rejected: ['Thẻ đơn dạng lưới: người bán có nhiều đơn, cần so dọc trạng thái và tiền; bảng tiết kiệm chỗ hơn. Trên điện thoại bảng tự chuyển thành thẻ.']
};

WHY['B2.1'] = {
  goal: 'Chi tiết đơn Shop (T2) phía người bán. Khi có khiếu nại, khiếu nại là việc gấp nhất nên đứng đầu.',
  points: [
    ['Tiêu đề kèm hai nhãn: trạng thái giao và khiếu nại', 'Hai trạng thái độc lập (đã giao nhưng đang khiếu nại) hiện song song thay vì gộp thành một nhãn khó hiểu.'],
    ['Khối khiếu nại viền đậm đứng đầu cột chính', 'Có hạn phản hồi, ảnh hưởng tiền. Bố cục hai cột trong khối: bên trái điều người mua nói (đọc), bên phải đề xuất của bạn (làm) – đọc xong là trả lời ngay cạnh đó. Khi không có khiếu nại, khối này không hiện.'],
    ['Món trong đơn dạng danh sách gọn', 'Người bán đã biết hàng của mình; chỉ cần đối chiếu nhanh.'],
    ['Lịch sử dạng dòng thời gian', 'Cùng khối Lịch sử với mọi trang T2, mã vận đơn nằm ngay trong mốc "Đã giao".'],
    ['Cột hành động phải', 'Cùng vị trí với chi tiết đơn phía người mua. Nút đổi theo trạng thái; ở đây còn thiếu hóa đơn nên "Gắn hóa đơn" là nút chính.']
  ],
  rejected: ['Đặt khiếu nại ở cuối trang như bản cũ: người bán có thể bỏ lỡ hạn phản hồi.']
};

WHY['B2.2'] = {
  goal: 'Mặt người bán của đơn đặt hàng: cùng bố cục với M6.1.2 để hai bên nhìn thấy cùng một tiến trình.',
  points: [
    ['Nhãn trạng thái nói việc của người bán', '"Sửa maket theo góp ý" – nhãn nền đậm khi việc ở phía người bán, giống quy ước bên người mua.'],
    ['Cùng thanh 5 bước với M6.1.2', 'Người mua và người bán nói về cùng một bước khi trao đổi.'],
    ['Bốn tab, tab Giải ngân thay cho tab Thanh toán', 'Người bán quan tâm tiền được giải ngân, không phải tiền người mua trả; vị trí tab giữ nguyên.'],
    ['Hộp hành động phải nói đúng một việc', 'Đơn dài nhiều tuần; hộp phải trả lời "bây giờ tôi làm gì" kèm số tiền đang giữ.']
  ],
  rejected: []
};

WHY['B3.0'] = {
  goal: 'Danh sách yêu cầu (T1): người bán chọn yêu cầu đáng báo giá trước khi hết hạn.',
  points: [
    ['Ba tab theo vòng đời', 'Mới · Đã báo giá · Đã đóng – tab Mới mở sẵn với số đếm.'],
    ['Mỗi yêu cầu một thẻ: nội dung trái, hạn và nút phải', 'Người bán cần đọc yêu cầu (số hộp, làm riêng, nơi giao) để quyết định có làm không, nên phần chữ được chỗ rộng. Nhãn phân biệt "Gửi riêng cho bạn" (đậm) với "Lời mời" để ưu tiên.'],
    ['Hạn còn lại ngay trên nút', 'Hạn là lý do để làm trước; đặt cạnh nút "Báo giá" để quyết định và hành động ở cùng một chỗ.']
  ],
  rejected: ['Bảng như bản cũ: cột mô tả yêu cầu dài làm bảng vỡ trên điện thoại.']
};

WHY['B3.1'] = {
  goal: 'Đọc kỹ yêu cầu rồi chọn: báo giá hoặc từ chối.',
  points: [
    ['Tiêu đề kèm loại yêu cầu và hạn', 'Thông tin quyết định độ ưu tiên đặt ở đầu.'],
    ['Yêu cầu dạng cặp nhãn – giá trị', 'Dùng đúng các mục người mua đã điền ở M3.1, cùng thứ tự, để hai bên hiểu như nhau.'],
    ['Tệp người mua gửi tách riêng', 'Tệp cần mở xem, nên có khối riêng thay vì lẫn trong chữ.'],
    ['Cột phải: Báo giá là nút, Từ chối gập trong "details"', 'Hành động chính rõ ràng; từ chối cần chọn lý do nên gập lại để không bấm nhầm.']
  ],
  rejected: []
};

WHY['B3.2'] = {
  goal: 'Form báo giá (T3) với cột phải cho thấy đúng con số người mua sẽ thấy.',
  points: [
    ['Giá trước, làm và giao sau', 'Giá là quyết định chính; gợi ý theo bậc giá đặt ngay dưới ô đơn giá.'],
    ['Cột phải: bản xem trước tổng và cọc', 'Người bán thấy ngay tổng tiền và tiền cọc thay đổi theo đơn giá, giống cột trong bảng so sánh của người mua.']
  ],
  rejected: []
};

WHY['B4.0'] = {
  goal: 'Danh sách sản phẩm (T1): chỉnh giá, tồn, ẩn/hiện nhanh mà không mở từng sản phẩm.',
  points: [
    ['Tiêu đề trái, "Đăng sản phẩm" phải', 'Mẫu T1 chung.'],
    ['Ba tab theo trạng thái hiển thị', 'Đang bán · Đang ẩn · Bị gỡ: mỗi tab có thao tác khác nhau; không có tab hay nút xóa.'],
    ['Bảng có ảnh nhỏ, giá và tồn canh phải', 'Người bán so giá, tồn giữa các sản phẩm theo chiều dọc; số tồn thấp in đậm để thấy hàng sắp hết.'],
    ['Ô "Đang hiện" ngay trên dòng', 'Ẩn / hiện là thao tác hay dùng nhất (F7), làm được tại chỗ, không cần vào trang sửa.'],
    ['Sản phẩm bị gỡ có dải viền đứt riêng kèm lý do', 'Tách khỏi bảng chính để không lẫn với hàng đang bán, và lý do gỡ đọc được ngay.']
  ],
  rejected: []
};

WHY['B4.1'] = {
  goal: 'Form sản phẩm (T3) với bản xem trước thẻ sản phẩm như người mua sẽ thấy.',
  points: [
    ['Dải "Bị gỡ" trên cùng khi chỉ xem', 'Giải thích vì sao mọi ô bị khóa trước khi người bán thử bấm.'],
    ['Ảnh là nhóm đầu tiên', 'Ảnh là thứ người mua nhìn đầu tiên ở M2.0, nên người bán cũng điền đầu tiên. Lưới ô vuông cho thấy ảnh đã có và chỗ thêm.'],
    ['Vỏ và nhân dạng chip', 'Danh mục cố định, chọn nhiều; chip cho thấy hết lựa chọn trên một dòng và khớp đúng bộ lọc M2.0.'],
    ['Cột phải: thẻ sản phẩm xem trước', 'Dùng đúng thẻ của M2.0 để người bán kiểm tên dài, giá hiện ra sao.']
  ],
  rejected: []
};

WHY['B5.0'] = {
  goal: 'Trang trung chuyển của Tiền, thêm ba con số trả lời câu "tiền của tôi đang ở đâu".',
  points: [
    ['Ba ô số liệu trên cùng', 'Đang giữ → chờ chuyển → đã nhận: theo đúng dòng chảy của tiền, đọc trái sang phải.'],
    ['Hai thẻ lối vào bên dưới', 'Khuôn T4. Đặc tả cho phép bỏ trang này và mở thẳng Đối soát; ba ô số liệu là lý do để giữ lại.']
  ],
  rejected: []
};

WHY['B5.1'] = {
  goal: 'Bảng đối soát chỉ xem.',
  points: [['Bảng, các cột tiền canh phải, cột cuối là trạng thái chuyển', 'Đối soát là đọc số theo cột; cột "Bạn nhận" in đậm vì là con số người bán dò. Trạng thái chuyển dùng 3 mức nhãn: đậm (bị chặn), xám (đang chờ), viền đứt (xong).']],
  rejected: []
};

WHY['B5.2'] = {
  goal: 'Danh sách giải ngân cọc theo đơn.',
  points: [
    ['Nút tạo yêu cầu ở góc phải', 'Mẫu T1; cũng tạo được từ tab Giải ngân của B2.2.'],
    ['Cột "Còn giữ sau đó" cạnh số xin', 'Người bán thấy ngay phần cọc còn lại, không phải tự trừ.']
  ],
  rejected: []
};

WHY['B6.0'] = {
  goal: 'Trung chuyển tới các mục cài đặt, kèm trạng thái của từng mục.',
  points: [
    ['Danh sách dọc thay cho lưới thẻ', 'Bốn mục cài đặt là danh sách để kiểm tra, không phải lựa chọn; mỗi dòng có trạng thái (Chưa cài nền đậm) nên người bán thấy ngay còn thiếu gì.'],
    ['Mục chưa mở được vẫn hiện, ghi "Mở sau khi duyệt"', 'Người bán chờ duyệt biết trước việc sẽ phải làm.']
  ],
  rejected: []
};

WHY['B6.1'] = {
  goal: 'Xem hồ sơ đã nộp; nộp lại khi cần bổ sung.',
  points: [
    ['Nhãn trạng thái góc phải tiêu đề', 'Cho biết ngay trang này sửa được hay chỉ xem.'],
    ['Dải "Moonkage cần" có nút Nộp lại', 'Khi cần bổ sung, việc cần làm đứng trên mọi thông tin khác.'],
    ['Hai khối nền xám cạnh nhau', 'Nền xám = chỉ đọc. Đơn vị và chủ hộ là hai nhóm ngang hàng.']
  ],
  rejected: []
};

WHY['B6.2'] = {
  goal: 'Form vùng giao: nội tỉnh trước, liên tỉnh sau.',
  points: [
    ['Nội tỉnh là nhóm đầu', 'Hầu hết Shop giao trong tỉnh; nhóm này ngắn nhất.'],
    ['Liên tỉnh: bảng phí chỉ đọc', 'Phí liên tỉnh do Moonkage cấu hình (Q6.1), nên hiện dạng bảng để tham khảo, không phải ô nhập.'],
    ['Cột phải nói bước tiếp theo', 'Trang này nằm giữa luồng F4; cột phải dẫn sang bước sau.']
  ],
  rejected: []
};

WHY['B6.3'] = {
  goal: 'Form điều kiện nhận đặt hàng, có xem trước phần người mua thấy ở M3.3.',
  points: [
    ['Quy mô đầu tiên', 'Số hộp tối thiểu là điều kiện lọc mạnh nhất khi ghép yêu cầu báo giá.'],
    ['Vỏ, nhân dạng chip từ cùng danh mục', 'Giống B4.1 và bộ lọc M2.0 để dữ liệu khớp nhau.'],
    ['Cột phải: thẻ "Nhận làm" xem trước', 'Đúng khối hiện ở tab Nhận đặt hàng của M3.3.']
  ],
  rejected: []
};

WHY['B6.4'] = {
  goal: 'Trang hoãn.',
  points: [['Khung rỗng viền đứt, nhãn "Hoãn trong demo"', 'Cùng kiểu trạng thái rỗng để người review biết trang có trong IA nhưng không làm.']],
  rejected: []
};
