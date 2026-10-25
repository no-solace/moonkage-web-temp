# Đề xuất trang chủ M1.0 · web 1440 · tham khảo Shopcart

- Mở: `design-explorations-3/home.html` (khung 1440).
- Ảnh chụp: `home-1440-fold.png` (màn đầu 1440×900), `home-1440-full.png` (cả trang).
- Không sửa wireframe hay mã chạy thật. Nội dung lấy đúng từ `wireframe/m/m1-0.html`.

## 0. Giới hạn cần biết trước

- **Chưa xem được trang tham khảo.** Mạng của môi trường chặn `museshopcart.webflow.io`. Tìm kiếm chỉ xác nhận đây là "Shopcart – Ecommerce Landing Page" của Musemind. Phân tích ở mục 2 dựa trên trí nhớ về mẫu này, **chưa đối chiếu được**. Gửi ảnh chụp trang để kiểm lại.
- **Ảnh sản phẩm là hình vẽ minh họa, có nhãn "Minh họa · chờ ảnh thật".** Ảnh thật không tải được. Kiểu Shopcart sống nhờ ảnh sản phẩm trên nền nhạt, nên đánh giá cảm giác "bán hàng" phải chờ ảnh thật.
- **Logo để ô trống**, vì chưa có file logo.

## 1. Cách đề xuất

Mỗi đề xuất trả lời đủ năm câu:

1. **Vấn đề**: trang hiện tại làm người dùng vướng ở đâu, có bằng chứng gì.
2. **Học được gì từ tham khảo**: tách *cơ chế* (vì sao nó hiệu quả) khỏi *bề mặt* (màu, bo góc).
3. **Chuyển sang Moonkage thế nào**: lấy cơ chế, thay nội dung bằng dữ liệu thật của mình.
4. **Không lấy gì, vì sao**: nhất là những thứ trái quy tắc nghiệp vụ.
5. **Đánh đổi và câu hỏi cần bạn quyết**: mỗi câu có khuyến nghị.

## 2. Shopcart làm gì, Moonkage lấy gì

Bảng dưới dựa trên trí nhớ, chưa đối chiếu.

| Shopcart | Cơ chế | Moonkage | Lý do |
|---|---|---|---|
| Thanh tiện ích mỏng trên cùng (hotline, khuyến mãi) | Thông tin phụ nhưng luôn đúng, không chiếm chỗ header | **Lấy.** Đặt "Giao tới Hà Nội" và "Bán hàng trên Moonkage" ở đây | Khu vực giao quyết định toàn bộ giá và hàng hiển thị, nên phải luôn thấy |
| Header: logo, danh mục, ô tìm kiếm bo tròn, giỏ | Ô tìm kiếm là thao tác chính, đặt to giữa header | **Lấy** | Đã khớp wireframe |
| Hero lớn tràn ngang: nền màu nhạt, tiêu đề rất to bên trái, nút pill, ảnh lớn bên phải | Một thông điệp chiếm cả màn đầu | **Lấy nguyên khung** (theo yêu cầu của bạn). Tiêu đề 60px, nền kem tràn ngang, ảnh lớn bên phải. Khác demo: hai nút thay vì một (Xem hàng có sẵn / Đặt theo yêu cầu); không có số "giảm %" | Hai lối vào là quyết định đầu tiên của người mua. Đặc tả cấm số liệu không tính từ dữ liệu. Hai thẻ lối vào kèm điều kiện thật nằm đè mép dưới hero |
| Hàng chip lọc dưới hero | Cho người chưa biết tìm gì một điểm bắt đầu | **Lấy**, chỉ dùng bộ lọc M2.0 có thật (vỏ, nhân, giá) | Rút một bước so với vào M2.0 rồi mới lọc |
| Thẻ sản phẩm: ảnh trên nền xám nhạt, tên và giá cùng dòng, sao, nút viền "Add to Cart" | Ảnh đồng nền nên lưới gọn dù ảnh khác chất lượng; giá dễ quét | **Lấy** | Ảnh của người bán sẽ không đều; nền khung đồng nhất che bớt chỗ đó |
| Nút tim (yêu thích) trên ảnh | Lưu để mua sau | **Không lấy** | Đặc tả không có danh sách yêu thích |
| Lưới "Shop theo danh mục" bằng ảnh | Duyệt bằng hình | **Hoãn** | Chưa có ảnh danh mục; chip lọc làm cùng việc |
| "Choose by brand": thẻ thương hiệu | Mua theo người bán đáng tin | **Lấy** cho khối "Nhận đặt theo yêu cầu" | Với đặt riêng, người mua chọn *đơn vị* trước, sản phẩm sau |
| Banner "giảm tới 70%" | Kéo bằng khuyến mãi | **Không lấy** | Không có dữ liệu khuyến mãi; trái quy tắc không bịa số |
| "Services to help you shop": 3 thẻ dịch vụ | Giải tỏa lo ngại trước khi mua | **Lấy**, đổi thành "Tiền của bạn đi thế nào" | Lo ngại lớn nhất khi đặt riêng là tiền cọc. Ba thẻ chỉ nêu quy tắc có trong đặc tả: VNPay, Moonkage giữ cọc, duyệt maket |

## 3. So với wireframe M1.0 hiện tại

| | Wireframe | Đề xuất | Được / mất |
|---|---|---|---|
| Chọn khu vực | Khối thông báo riêng (chỉ khách) | Nằm trong thanh tiện ích, mọi vai đều thấy | Được: luôn thấy, không tốn một khối. Mất: kém nổi với khách lần đầu |
| Hai lối vào | Hai thẻ viền ngang nhau | Hero lớn có hai nút, rồi hai thẻ 6/6 kèm điều kiện thật nằm đè mép dưới hero | Được: màn đầu có điểm nhấn mạnh như demo. Mất: thẻ lối vào xuống sát nếp gấp, sản phẩm rơi hẳn xuống dưới màn đầu |
| Tìm nhanh | Không có | Chip vỏ, nhân, giá | Thêm một bước tắt |
| Sản phẩm | Ảnh, tên, đơn vị, sao, giá | Thêm nút "Thêm vào giỏ" | Mua nhanh từ trang chủ. Rủi ro: khách bấm sẽ phải đăng nhập (cổng sẵn có) |
| Đơn vị cung cấp | Thẻ, hai nút ngang nhau | Một nút chính, "Xem đơn vị ›" là liên kết phụ | Nhãn "Gửi yêu cầu cho [tên]" dài, hai nút ngang bị vỡ hàng |
| Tin cậy | Không có | "Tiền của bạn đi thế nào" | Thêm một khối ngoài năm khối trong kế hoạch (xem Q3) |
| Việc cần bạn | Dòng riêng khi đã đăng nhập | Chưa vẽ (ảnh là vai Khách) | Khi làm vai đã đăng nhập: một dòng ngay dưới header |

## 4. Câu hỏi cần bạn quyết

- **Q1. Ảnh hero.** Hero lớn sống nhờ một ảnh chụp đẹp (demo dùng ảnh người mẫu). Ai cung cấp: Moonkage tự chụp, hay lấy ảnh của một Shop? *Khuyến nghị: Moonkage tự chụp một bộ, không dùng ảnh Shop, để hero không quảng cáo riêng cho một người bán.*
- **Q2. Màu thương hiệu.** Đang mượn cách Shopcart dùng: một màu đậm cùng nền nhạt cùng họ màu (xanh đậm). Token thương hiệu chưa ràng buộc. *Khuyến nghị: giữ cấu trúc "một màu đậm + một nền nhạt", màu cụ thể chờ logo.*
- **Q3. Thêm khối "Tiền của bạn đi thế nào"** vào kế hoạch (thành 6 khối)? *Khuyến nghị: có. Nó trả lời lo ngại lớn nhất của Lối 2 mà không cần số liệu.*
- **Q4. Nút "Thêm vào giỏ" trên thẻ sản phẩm** ở trang chủ? *Khuyến nghị: có, theo Shopcart. Bánh trung thu mua theo hộp, ít cần chọn biến thể.*

## 5. Bước tiếp theo, sau khi bạn trả lời

1. Gửi ảnh chụp trang Shopcart để tôi đối chiếu mục 2.
2. Thay hình minh họa bằng ảnh thật, rồi đánh giá lại thẻ sản phẩm.
3. Vẽ trạng thái đã đăng nhập (dòng "Việc cần bạn").
4. Nếu duyệt, đưa bố cục vào wireframe M1.0 và cập nhật thuyết minh.
