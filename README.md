# Moonkage web

React 19 + TypeScript + Vite. Giao diện theo design system **"DS: Moonkage v2"** (https://claude.ai/artifact/GGUiHf9RjvveUzR3geFsCN): `src/app/styles/tokens.css` sinh từ `tokens.json` của DS, `src/app/styles/components.css` là `bundle.css` của DS (class `mk-*`), logo ở `src/shared/assets/`. Không sửa tay hai file đó; đổi ở DS rồi chép lại.

## Chạy

```bash
cp .env.example .env.local   # sửa VITE_API_BASE_URL nếu gateway không ở localhost:8080
npm install
npm run dev                  # http://localhost:5173 (đã có trong CORS_ORIGINS của gateway)
```

Thiếu `VITE_API_BASE_URL` thì app dừng ở màn lỗi cấu hình.

## Kiểm tra trước khi commit

```bash
npm run lint
npm test
npm run build
```

## Cấu trúc `src/`

Phụ thuộc một chiều: `app` → `pages` → `features` → `shared`. Bên ngoài một feature chỉ import qua `index.ts` của nó; `shared` không biết gì về nghiệp vụ.

| Thư mục / file | Nội dung |
| --- | --- |
| `app/` | `main.tsx`, `App.tsx` (kiểm tra cấu hình; providers: `AuthProvider` → `RealtimeProvider` theo token → `DeliveryAreaProvider` → `CartProvider`), `routes.tsx` (định tuyến, mỗi trang một chunk qua `lazyPage.tsx`; đường dẫn cũ `/login`, `/account/verify-nfc` chuyển sang đường dẫn IA), `layouts/ShopLayout.tsx` (NavBar của DS: dải tiện ích, thanh chính, chân trang), `styles/` (token và component của DS; `app.css` cho bố cục) |
| `pages/` | Mỗi route một thư mục, chỉ lắp ghép feature: `home/` (M1.0), `products/` (M2.0), `product-detail/` (M2.1), `custom-order/` (M3.0), `suppliers/` (M3.2), `notifications/` (M6.6), `sell-intro/` (M7.0), `verify-nfc/` (M6.4), `login/`, `coming-soon/` (trang IA chưa dựng), `not-found/`, `config-error/` |
| `features/auth/` | `api/` gọi đăng nhập, `model/` (`AuthProvider`, `useAuth`, `sellerStatus`), `ui/` (`LoginForm`, `RequireAuth`, `AccountMenu`), `strings.ts` |
| `features/catalog/` | Sản phẩm có sẵn: `api/` (dữ liệu mẫu), `model/` (`filters.ts` lọc, sắp xếp, đọc/ghi URL; `useCatalog`), `ui/` (`ProductCard`, bộ lọc, thanh công cụ, chip tìm nhanh, ô tìm kiếm, phần trang chi tiết) |
| `features/suppliers/` | Đơn vị nhận đặt theo yêu cầu: `api/` (dữ liệu mẫu), `model/` (`filterSuppliers`), `ui/` (`VendorTile`, `SupplierCard`) |
| `features/cart/` | Giỏ của người mua (lưu ở trình duyệt tới khi có API): `model/`, `ui/` (`AddToCartButton`, `CartLink`) |
| `features/delivery-area/` | Khu vực giao (luôn lọc sản phẩm): `model/`, `ui/AreaPicker` |
| `features/notifications/` | Thông báo mua hàng (M6.6): `api/` (dữ liệu mẫu), `ui/` (`NotificationBell`, `NotificationList`) |
| `features/seller-onboarding/` | Lối vào bán hàng theo trạng thái (`SellEntryLink`) và trang giới thiệu (`SellIntro`) |
| `features/buying-guide/` | Nội dung hướng dẫn: hero trang chủ, "Tiền của bạn đi thế nào", giới thiệu đặt theo yêu cầu |
| `features/nfc/` | Xác minh CCCD (FR-04): `api/` (endpoint, kiểu dữ liệu, kênh STOMP), `model/` (`useNfcSession`, `useNfcStatus`, `qrPayload`), `ui/` (panel QR, thẻ trạng thái), `strings.ts` |
| `shared/api/` | axios client (gắn Bearer, 401 → đăng xuất, `ApiError`), `httpStatus.ts`, `gateway.ts`, `mock.ts` (trả dữ liệu mẫu như một request), `realtime/` (kết nối STOMP) |
| `shared/assets/` | Logo từ DS (`moonkage-mark.png` biểu tượng cho thanh điều hướng, `moonkage-logo.png` đầy đủ cho chân trang) |
| `shared/config/` | `env.ts` (biến `VITE_*`), `routes.ts` (đường dẫn theo IA), `strings.ts` (câu chữ dùng chung), `theme.ts` (theo theme hệ điều hành) |
| `shared/ui/` | UI không biết nghiệp vụ: `PhotoFrame`, `Stars`, `Avatar`, `SectionHeader`, trạng thái tải/lỗi, `useAsync`, `useDisclosure` |
| `shared/utils/` | `format.ts` (ngày giờ), `money.ts` (tiền, điểm đánh giá), `storage.ts` (localStorage an toàn) |

## Dữ liệu mẫu

Backend mới có đăng nhập và xác minh CCCD. Danh mục sản phẩm, đơn vị cung cấp và thông báo đọc từ dữ liệu mẫu lấy theo wireframe, trong `features/*/api/` (qua `shared/api/mock.ts`). Khi có endpoint, chỉ thay các hàm trong `api/`; phần còn lại không đổi.
