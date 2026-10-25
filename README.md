# Moonkage web

React 19 + TypeScript + Vite. Giao diện theo design system **"DS: Moonkage v2"** (https://claude.ai/artifact/GGUiHf9RjvveUzR3geFsCN): `src/app/styles/tokens.css` sinh từ `tokens.json` của DS, `src/app/styles/components.css` là `bundle.css` của DS (class `mk-*`), logo ở `src/shared/assets/`. Không sửa tay hai file đó; đổi ở DS rồi chép lại.

## Chạy

```bash
npm install
npm run dev:demo             # toàn bộ giao diện trên dữ liệu mẫu, không cần backend
```

Với backend thật:

```bash
cp .env.example .env.local   # sửa VITE_API_BASE_URL nếu gateway không ở localhost:8080
npm run dev                  # http://localhost:5173 (đã có trong CORS_ORIGINS của gateway)
```

Thiếu `VITE_API_BASE_URL` thì app dừng ở màn lỗi cấu hình. Giao diện chỉ có chế độ sáng và chỉ làm cho web 1440.

## Chế độ demo

`npm run dev:demo` / `npm run build:demo` đọc `.env.demo` (`VITE_DEMO_MODE=true`). Đăng nhập không gọi API và kênh realtime tắt. Màn đăng nhập liệt kê sẵn các tài khoản, mật khẩu đều là `demo`:

| Tài khoản | Vai |
| --- | --- |
| `nguoimua@moonkage.vn` | Người mua chưa xác minh CCCD (thấy cổng xác minh; màn xác minh tự giả lập app quét sau vài giây) |
| `congty@moonkage.vn` | Người mua đã xác minh, khách doanh nghiệp |
| `chushop@moonkage.vn` | Người bán đang mở bán (Xưởng Bánh Nghệ Nhân) |
| `chohoso@moonkage.vn` | Người bán có hồ sơ chờ duyệt (Tiệm Bánh Thảo Mộc) |
| `quantri@moonkage.vn` | Quản trị viên (mục "Quản trị" trong menu tài khoản) |

Mọi thao tác (giỏ, đơn, đặt cọc, duyệt hồ sơ, khiếu nại…) được nhớ trong `localStorage` khóa `moonkage.demo`; xóa khóa này để về dữ liệu gốc. Thanh toán VNPay là một trang giả lập có nút thành công/thất bại. Các vai nối với nhau như backend thật, ví dụ: quản trị duyệt hồ sơ Thảo Mộc → đăng nhập `chohoso` → kênh người bán báo đã duyệt → đóng phí mở bán → shop mở. Không dùng chế độ này để triển khai thật.

## Kiểm tra trước khi commit

```bash
npm run lint
npm test
npm run build
```

## Cấu trúc `src/`

Phụ thuộc một chiều: `app` → `pages` → `features` → `shared`. Bên ngoài một feature chỉ import qua `index.ts` của nó; `pages` chỉ lắp ghép feature, không gọi API và không giữ state phức tạp; `shared` không biết gì về nghiệp vụ.

| Thư mục | Nội dung |
| --- | --- |
| `app/` | `main.tsx`, `App.tsx` (kiểm tra cấu hình; providers `AuthProvider` → realtime theo token → `DeliveryAreaProvider` → `CartProvider`), `routes.tsx` (mỗi trang một chunk qua `lazyPage.tsx`; kênh người bán và quản trị mỗi khu một chunk), `layouts/` (`ShopLayout` khu mua hàng, `AccountLayout` tài khoản, `SellerLayout` kênh người bán, `AdminLayout` quản trị), `styles/` |
| `pages/` | Mỗi route khu mua hàng (M) một thư mục; `seller/SellerPages.tsx` cho kênh người bán (B), `admin/AdminPages.tsx` cho quản trị (Q) |
| `features/auth/` | Đăng nhập, đăng ký, xác nhận OTP, quên/đặt lại mật khẩu, thông tin cá nhân, menu tài khoản, tài khoản demo |
| `features/nfc/` | Xác minh CCCD (FR-04) và cổng `RequireNfc` |
| `features/catalog/` | Sản phẩm có sẵn: lọc, sắp xếp, thẻ và trang chi tiết |
| `features/suppliers/` | Đơn vị nhận đặt theo yêu cầu, ghép đơn vị theo số hộp và in logo |
| `features/cart/` | Giỏ, gom theo shop, đặt hàng (`CheckoutView`) |
| `features/payments/` | Thanh toán VNPay (mua, đặt cọc, trả phần còn lại, phí mở bán) và trang kết quả |
| `features/orders/` | Đơn của người mua: danh sách, chi tiết, duyệt maket, khiếu nại |
| `features/quotes/` | Yêu cầu báo giá: tạo, so sánh báo giá, chấp nhận và đặt cọc |
| `features/addresses/` | Sổ địa chỉ |
| `features/delivery-area/` | Khu vực giao (luôn lọc sản phẩm) |
| `features/notifications/` | Thông báo mua hàng |
| `features/seller-onboarding/` | Giới thiệu bán hàng và hồ sơ đăng ký bán |
| `features/seller/` | Kênh người bán: tổng quan, phí mở bán, đơn, yêu cầu và báo giá, sản phẩm, tiền, cài đặt, thông báo cửa hàng |
| `features/admin/` | Quản trị: hàng chờ, duyệt hồ sơ người bán, gỡ sản phẩm, giải ngân, chuyển tiền, đối soát, khiếu nại, cấu hình (phí liên tỉnh 34 tỉnh, phí mở bán, vỏ và nhân) |
| `features/buying-guide/` | Nội dung hướng dẫn và chính sách |
| `shared/api/` | axios client, `mock.ts` (trả dữ liệu mẫu như một request, `seedStore`), `demo.ts` (kho nhớ của chế độ demo), realtime |
| `shared/config/` | `env.ts`, `routes.ts` (đường dẫn theo IA), `strings.ts`, `theme.ts` (chỉ chế độ sáng) |
| `shared/ui/` | UI không biết nghiệp vụ: trạng thái tải/lỗi, `PageHeader`, `Tabs`, `StatusBadge`, `KeyValue`, `Steps`, `Timeline`, `TaskList`, `Dialog`, `FileDrop`, `useAsync`, `useDisclosure`… |
| `shared/utils/` | Ngày giờ, tiền, localStorage an toàn |

Mỗi feature chia `api/` (gọi backend hoặc dữ liệu mẫu), `model/` (quy tắc nghiệp vụ, hook, có test), `ui/` và `index.ts`.

## Dữ liệu mẫu

Backend mới có đăng nhập và xác minh CCCD. Mọi dữ liệu khác lấy theo wireframe, nằm trong `features/*/api/seed.ts` và trả qua `shared/api/mock.ts`. Khi có endpoint, chỉ thay các hàm trong `api/`; `model/`, `ui/` và `pages/` không đổi.
