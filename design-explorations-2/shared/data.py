"""Single source of content for all three directions.

Every direction renders exactly these strings, numbers and images; only composition, typography,
component language and visual system differ. Sources:
- wireframe/m/m1-0.html, m2-1.html, m6-2-1.html (repo, source of truth for content)
- BR-14 print options and money rules quoted from the mid-fi content spec (uploaded, not in repo), see README.
Values marked ILLUSTRATIVE are not in any source and are labelled as such on screen.
"""

AREA = "Hà Nội"

HEADER = dict(
    search="Tìm bánh, nhân bánh hoặc tên đơn vị…",
    area_k="Giao tới", area=AREA, cart="Giỏ hàng", cart_n="2", login="Đăng nhập",
    account="Tài khoản",
    nav=["Mua hàng có sẵn", "Đặt theo yêu cầu"],
)

QUESTION = "Bạn cần bánh theo cách nào?"

MODE1 = dict(
    tag="Lối 1", title="Mua hàng có sẵn",
    desc="Bánh đã đóng hộp, Shop giao tới khu vực của bạn. Chọn món, thanh toán và chờ giao.",
    cond=["Chỉ hiện sản phẩm giao được tới Hà Nội", "Thanh toán VNPay ngay khi đặt; mỗi Shop tách một đơn"],
    cta="Xem hàng có sẵn",
)
MODE2 = dict(
    tag="Lối 2", title="Đặt theo yêu cầu",
    desc="Số lượng lớn, in logo hoặc hàng phải làm riêng, dù ít hộp.",
    cond=["Cần đăng nhập và xác minh danh tính bằng CCCD gắn chip", "Đặt cọc khi chấp nhận báo giá; duyệt maket trước khi làm"],
    cta="Tạo yêu cầu báo giá", cta2="Chọn đơn vị cung cấp",
)

SEC_AVAIL = "Có sẵn giao tới Hà Nội"
MORE_AVAIL = "Xem tất cả hàng có sẵn"
SEC_CUSTOM = "Nhận đặt theo yêu cầu"
MORE_CUSTOM = "Xem tất cả đơn vị cung cấp"

# Products shown on M1.0 (wireframe m1-0.html). img = slot in shared/images/manifest.json
PRODUCTS = [
    dict(name="Hộp Hoàng Kim 4 bánh", maker="Xưởng Bánh Nghệ Nhân", district="Ba Đình", rating="4,8", n="32", price="680.000đ", img="p1"),
    dict(name="Hộp Trăng Rằm 4 bánh", maker="Bánh Cổ Truyền Trăng Vàng", district="Hoàn Kiếm", rating="4,6", n="18", price="420.000đ", img="p2"),
    dict(name="Hộp Thu Sắc 5 bánh mini", maker="Đại lý Thu Hương", district=None, rating="4,5", n="9", price="360.000đ", img="p3"),
    dict(name="Bánh dẻo hạt sen 150g", maker="Bánh Cổ Truyền Trăng Vàng", district="Hoàn Kiếm", rating="4,7", n="21", price="65.000đ", img="p4"),
]

# Suppliers on M1.0 (wireframe). "does" is verbatim; it conflicts with BR-14 (audit H2) and is kept as-is.
SUPPLIERS = [
    dict(name="Xưởng Bánh Nghệ Nhân", short="Nghệ Nhân", init="NN", district="Ba Đình", place="Ba Đình, Hà Nội", does="In logo · hộp riêng", min="20 hộp", reach="giao toàn quốc", only=False),
    dict(name="Bánh Cổ Truyền Trăng Vàng", short="Trăng Vàng", init="TV", district="Hoàn Kiếm", place="Hoàn Kiếm, Hà Nội", does="Hộp sơn mài · nhân theo yêu cầu", min="10 hộp", reach="giao Hà Nội", only=False),
    dict(name="Xưởng Minh Hòa", short="Minh Hòa", init="MH", district="Đống Đa", place="Đống Đa, Hà Nội", does="In logo · thiệp kèm", min="50 hộp", reach="giao toàn quốc", only=True),
]
ONLY_TAG = "Chỉ nhận đặt hàng"
FOOT = ["Bán hàng trên Moonkage", "Chính sách mua bán"]

# M2.1 (wireframe m2-1.html)
PDP = dict(
    crumbs=["Trang chủ", "Mua hàng có sẵn", "Hộp Hoàng Kim 4 bánh"],
    maker="Xưởng Bánh Nghệ Nhân", place="Ba Đình, Hà Nội", name="Hộp Hoàng Kim 4 bánh",
    rating="4,8", n="32", price="680.000đ",
    stock="Còn 42 hộp", deliver="giao tới Hà Nội", fee="Phí giao từ 25.000đ, tính ở giỏ",
    qty_label="Số lượng", qty="1", add="Thêm vào giỏ",
    imgs=["p1", "p1-2", "p1-3", "p1-4", "p1-5"],
    custom_q="Cần số lượng lớn hoặc in logo?", custom_note="Shop này nhận đặt theo yêu cầu.", custom_cta="Gửi yêu cầu cho Shop này",
    box_title="Trong hộp",
    box=[("Vỏ", "Nướng"), ("Nhân", "Thập cẩm, hạt sen, đậu xanh, trà xanh"), ("Quy cách", "4 bánh × 200g, hộp giấy cứng"), ("Thương hiệu", "Nghệ Nhân")],
    reviews_title="Đánh giá (32)",
    reviews=[("L", "Chị Lan", "5", "12/09/2026", "Hộp đẹp, bánh mềm, giao đúng giờ."), ("T", "Anh Tuấn", "4", "10/09/2026", "Nhân hạt sen ngon, hơi ngọt.")],
)
# BR-14: the four documented print options (mid-fi spec §7.1). Which ones this shop accepts is ILLUSTRATIVE.
PRINT_TITLE = "Hạng mục in logo Shop này nhận"
PRINT_NOTE = "Minh họa: dữ liệu mẫu chưa có danh sách nhận làm của Shop. Moonkage chỉ hỗ trợ 4 hạng mục in logo lên bao bì có sẵn."
PRINT = [
    dict(label="In logo lên hộp mẫu có sẵn", ill="opt-hop", ok=True),
    dict(label="In logo lên túi", ill="opt-tui", ok=True),
    dict(label="In logo lên thiệp", ill="opt-thiep", ok=False),
    dict(label="In logo lên sticker", ill="opt-sticker", ok=False),
]
YES, NO = "Nhận", "Không nhận"

# M6.2.1 (wireframe m6-2-1.html). "remain" and "diff" are derived from the wireframe numbers.
QREQ = dict(
    eyebrow="Gửi nhiều nơi", title="Yêu cầu YC-104", badge="2 báo giá",
    lead="150 hộp × 4 bánh · in logo · giao Cầu Giấy, Hà Nội trước 15/11/2026",
    invited="Đã mời 3 đơn vị · 1 chưa trả lời",
    dest="Cầu Giấy",
)
QUOTES = [
    dict(maker="Xưởng Bánh Nghệ Nhân", from_="Ba Đình", total="18.000.000đ", unit="120.000đ/hộp", dep_pct="50%", dep="9.000.000đ", remain="9.000.000đ",
         date="10/11/2026", custom="Khắc laser nắp gỗ", mk="mk1", rate="4,9 ★ · 42 đơn đặt hàng", diff=("date", "Sớm hơn 4 ngày")),
    dict(maker="Bánh Cổ Truyền Trăng Vàng", from_="Hoàn Kiếm", total="16.500.000đ", unit="110.000đ/hộp", dep_pct="50%", dep="8.250.000đ", remain="8.250.000đ",
         date="14/11/2026", custom="In logo nắp giấy", mk="mk2", rate="4,8 ★ · 28 đơn đặt hàng", diff=("total", "Thấp hơn 1.500.000đ")),
]
PENDING = dict(maker="Xưởng Minh Hòa", from_="Đống Đa", note="Chưa gửi báo giá")
ROWS = dict(total="Tổng giá", dep="Đặt cọc", remain="Còn lại, trả sau khi giao", date="Giao trước", custom="Làm riêng",
            mk="Maket mẫu", rate="Đơn vị", from_="Nơi làm")
ACCEPT = "Chấp nhận"
# Money rules: wireframe M6.1.2 ("Còn lại · trả sau khi giao"); spec §9.2 (BR-09 deposit held, BR-17 binding).
MONEY_NOW = "Bước này chưa trả tiền"
MONEY_STATES = [("Đã trả", "0đ"), ("Moonkage đang giữ", "0đ"), ("Đã chuyển cho đơn vị", "0đ")]
MONEY_RULES = [
    "Khi chấp nhận: trả tiền cọc qua VNPay. Moonkage giữ tiền cọc và chỉ chuyển cho đơn vị từng phần khi quản trị duyệt giải ngân.",
    "Phần còn lại trả sau khi đơn vị giao hàng.",
    "Chấp nhận một báo giá là thỏa thuận ràng buộc; các báo giá khác của yêu cầu này sẽ tự đóng.",
]
MONEY_TITLE = "Trước khi chấp nhận"
REQ_TITLE = "Yêu cầu bạn đã gửi"
REQ = [("Số hộp", "150 hộp × 4 bánh"), ("Vỏ / nhân", "Nướng · thập cẩm, hạt sen"), ("Làm riêng", "In logo lên hộp"), ("Giao", "Cầu Giấy, Hà Nội · trước 15/11/2026")]
CLOSE_REQ = "Đóng yêu cầu"
ILL = "Ảnh minh họa"
# Pre-acceptance: nothing is held yet. Same label in every direction.
HELD = "Moonkage giữ khi bạn trả cọc"
LATER = "Trả sau khi giao"
