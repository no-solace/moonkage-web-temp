// Thuyết minh bố cục – khu Quản trị (Q). Cấu trúc như why-m.js.
var WHY = window.WHY || {};
window.WHY = WHY;

WHY['Q1.0'] = {
  goal: 'Bàn làm việc của quản trị: mọi việc là một hàng chờ; trang cho biết hàng nào dài và việc nào đã chờ lâu nhất.',
  points: [
    ['Bốn ô hàng chờ, cùng thứ tự với menu', 'Mỗi ô là một hàng chờ của đặc tả, số lớn để so độ dài các hàng trong một cái nhìn; thứ tự trùng menu trên nên vị trí ô = vị trí mục menu.'],
    ['"Cũ nhất trong hàng chờ" trộn mọi loại', 'Quản trị cần làm theo thứ tự thời gian chờ, không theo loại. Danh sách sắp theo thời gian chờ, nhãn loại ở đầu dòng.'],
    ['Đơn bị đánh dấu đối soát đứng riêng, viền đậm', 'Lệch tiền là ngoại lệ hiếm nhưng nghiêm trọng (AC-51.4); để riêng để không chìm giữa việc thường.']
  ],
  rejected: ['Biểu đồ doanh thu: không phục vụ công việc xử lý hàng chờ.']
};

WHY['Q2.0'] = {
  goal: 'Danh sách người bán (T1) theo trạng thái hồ sơ.',
  points: [
    ['Năm tab theo trạng thái, tab Chờ duyệt có số đếm', 'Trạng thái quyết định quản trị làm gì với hồ sơ; tab mở sẵn hàng chờ.'],
    ['Bảng bốn cột, nút cuối dòng', 'Mẫu T1 chung. Cột "Nộp" ghi cả thời gian đã chờ để xử lý theo thứ tự.'],
    ['Kết quả so khớp chủ hộ ngay trên dòng', 'Quản trị thấy trước hồ sơ nào cần soi kỹ (không khớp) trước khi mở.']
  ],
  rejected: []
};

WHY['Q2.1'] = {
  goal: 'Trang ra quyết định (T2): mọi bằng chứng ở cột chính, quyết định ở cột phải, lịch sử trong trang (Đ5).',
  points: [
    ['Tiêu đề kèm lần nộp và trạng thái', 'Hồ sơ nộp lại nhiều lần; "lần nộp 1" cho biết có lịch sử cần xem hay không.'],
    ['Bảng so khớp đặt đầu tiên, viền đậm', 'Đây là bằng chứng quan trọng nhất. Ba cột (trên giấy / từ chip / kết quả) để mắt so ngang từng trường.'],
    ['Giấy tờ dạng hai ô ảnh lớn cạnh nhau', 'Quản trị cần nhìn giấy tờ thật; ảnh lớn hơn danh sách tên tệp.'],
    ['Tab Lịch sử trong trang', 'Đặc tả bỏ trang nhật ký chung; lịch sử các lần nộp và quyết định nằm ngay nơi ra quyết định.'],
    ['Cột quyết định: ô xác nhận → Duyệt; Bổ sung và Từ chối gập lại', 'Ô xác nhận đứng trước nút Duyệt để buộc đối chiếu. Hai quyết định còn lại cần viết lý do nên gập trong "details", không bấm nhầm được.']
  ],
  rejected: ['Ba nút ngang hàng như bản cũ: nút từ chối dễ bị bấm nhầm và không có chỗ ghi lý do.']
};

WHY['Q3.0'] = {
  goal: 'Tìm sản phẩm và gỡ kèm lý do.',
  points: [
    ['Ô tìm là thứ đầu tiên', 'Quản trị thường tới đây vì một sản phẩm cụ thể bị báo; tìm là thao tác chính.'],
    ['Bảng gọn: ảnh, tên, Shop, giá', 'Đủ để xác định đúng sản phẩm; không cần thêm cột.'],
    ['"Gỡ" mở ô lý do ngay tại dòng', 'Lý do bắt buộc và người bán sẽ đọc nó ở B4.1; mở tại chỗ để không mất ngữ cảnh.']
  ],
  rejected: []
};

WHY['Q4.0'] = {
  goal: 'Trung chuyển của Tiền (T4), mỗi thẻ ghi số việc đang chờ.',
  points: [['Ba thẻ cùng cỡ, số chờ ở dòng nhãn trên cùng', 'Số chờ quyết định thẻ nào mở trước; đặt trên tên thẻ để đọc trước.']],
  rejected: []
};

WHY['Q4.1'] = {
  goal: 'Duyệt từng yêu cầu giải ngân với đủ sổ tiền của đơn ngay trong thẻ (Đ5).',
  points: [
    ['Mỗi yêu cầu một thẻ lớn, số tiền góc phải', 'Mỗi quyết định cần nhiều thông tin; thẻ chứa đủ để duyệt mà không mở trang khác.'],
    ['Sổ tiền của đơn trái', 'Đang giữ → đã giải ngân → còn giữ nếu duyệt: thấy hệ quả của quyết định trước khi bấm.'],
    ['Các lần giải ngân trước và bằng chứng phải', 'Đặc tả yêu cầu lịch sử giải ngân nằm ngay trong trang ra quyết định (AC-47.1).'],
    ['Nút ở góc dưới phải của thẻ', 'Đọc hết thẻ mới tới nút; Từ chối dạng chữ bên trái nút Duyệt.']
  ],
  rejected: []
};

WHY['Q4.2'] = {
  goal: 'Chuyển tiền hàng loạt, nhưng không để lọt đơn đang khiếu nại.',
  points: [
    ['Bảng có ô chọn, nút chuyển hàng loạt ở góc phải', 'Có nhiều đơn đủ điều kiện mỗi ngày; chọn tất rồi chuyển một lần. Nút ghi số đơn đang chọn.'],
    ['Đơn bị chặn vẫn hiện, mờ, ô chọn khóa', 'Quản trị thấy vì sao một đơn không được chuyển; nhãn nền đậm "Chặn · đang khiếu nại".']
  ],
  rejected: []
};

WHY['Q4.3'] = {
  goal: 'Đối soát: tổng trước, chi tiết sau, chỗ lệch nổi lên.',
  points: [
    ['Bốn ô tổng theo dòng tiền', 'VNPay báo về → đang giữ → đã chuyển, cộng phí mở bán: kiểm nhanh tổng có khớp không.'],
    ['Bảng chi tiết, cột "Khớp" cuối dòng', 'Dòng lệch dùng nhãn nền đậm; dòng khớp viền đứt mờ, để mắt chỉ dừng ở chỗ lệch.']
  ],
  rejected: []
};

WHY['Q5.0'] = {
  goal: 'Danh sách khiếu nại (T1) theo tình trạng xử lý.',
  points: [
    ['Ba tab, có tab "Cần xử lý tay"', 'Hoàn tiền VNPay lỗi là việc khác hẳn (làm ngoài hệ thống), tách tab riêng để không lẫn.'],
    ['Cột "Đang ở" cho biết chờ ai', 'Khiếu nại qua nhiều bên; nhãn đậm khi đang chờ quản trị.']
  ],
  rejected: []
};

WHY['Q5.1'] = {
  goal: 'Phân xử: hai bên đặt cạnh nhau, tiền và quyết định ở cột phải.',
  points: [
    ['Tiêu đề nêu hai bên', 'Ai với ai, đơn nào – đủ để định vị trước khi đọc.'],
    ['Người mua trái, người bán phải, cùng cỡ', 'Hai thẻ ngang hàng để không thiên bên nào, và so được trực tiếp yêu cầu với đề xuất.'],
    ['Đơn và lịch sử bên dưới', 'Bằng chứng phụ, đọc khi cần.'],
    ['Sổ tiền trên quyết định', '"Tối đa hoàn được" phải nằm ngay trên ô số tiền để không quyết vượt số đang giữ (Q-01).'],
    ['Quyết định dạng 3 lựa chọn + số tiền + lý do', 'Thẻ chọn rõ ràng hơn 3 nút; một nút Gửi duy nhất sau khi đã chọn, tránh bấm nhầm.']
  ],
  rejected: ['Ba nút quyết định ngang hàng như bản cũ: một cú bấm là ra quyết định, không có chỗ nhập lý do.']
};

WHY['Q6.0'] = {
  goal: 'Trung chuyển cấu hình, kèm giá trị hiện tại.',
  points: [['Danh sách dọc, giá trị hiện tại trước nút Mở', 'Quản trị thấy cấu hình đang ra sao mà không cần mở từng mục.']],
  rejected: []
};

WHY['Q6.1'] = {
  goal: 'Nhập phí cho 63 tỉnh, không cho lưu khi thiếu.',
  points: [
    ['Dải "còn thiếu" trên cùng, có nút tới ô trống', 'Bảng dài; báo ngay chỗ thiếu và dẫn tới đó thay vì bắt cuộn tìm (AC-52.3).'],
    ['Lọc tỉnh và áp một mức cho nhiều tỉnh', 'Nhiều tỉnh cùng mức; chọn nhiều rồi áp một lần đỡ gõ 63 lần.'],
    ['Bảng một hàng một tỉnh, ô nhập ngay trong bảng', 'Sửa tại chỗ; ô thiếu có viền đậm và lỗi tại ô. Nút Lưu khóa và nói lý do.']
  ],
  rejected: ['Ba mức theo miền như bản cũ: đặc tả cần phí theo từng tỉnh.']
};

WHY['Q6.2'] = {
  goal: 'Một trường, một nút.',
  points: [['Gợi ý ngay dưới ô nói phạm vi áp dụng', 'Đổi phí có hệ quả với hồ sơ đang chờ; nói rõ ngay tại ô nhập.']],
  rejected: []
};

WHY['Q6.3'] = {
  goal: 'Trang hoãn.',
  points: [['Khung rỗng viền đứt', 'Cùng kiểu với B6.4.']],
  rejected: []
};

WHY['Q6.4'] = {
  goal: 'Danh mục dùng chung: thêm, đổi tên, đổi thứ tự, ẩn / hiện – không xóa.',
  points: [
    ['Hai tab Vỏ · Nhân', 'Hai danh mục độc lập, cùng thao tác.'],
    ['Mỗi giá trị một dòng: tay kéo → ô tên → trạng thái → nút', 'Đổi tên ngay trong ô, kéo để đổi thứ tự (thứ tự này là thứ tự trong bộ lọc M2.0). Dòng thêm mới nằm cuối danh sách.'],
    ['Luật không xóa ghi ngay dưới danh sách', 'Giải thích trước vì sao không có nút xóa và vì sao nút Ẩn có lúc bị khóa.']
  ],
  rejected: []
};
