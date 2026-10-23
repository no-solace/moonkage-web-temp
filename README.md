# Moonkage web

React 19 + TypeScript + Vite. Giao diện theo design system "DS: Moonkage" (`src/styles/tokens.css`, `src/styles/components.css`, class `mk-*`).

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
| `app/` | `main.tsx`, `App.tsx` (kiểm tra cấu hình, `AuthProvider`), `router.tsx`, `theme.ts`, `layout/AppShell.tsx` (header + `RealtimeProvider` theo token), `styles/` (token và component của DS chép từ DS, không sửa tay; `app.css` cho bố cục) |
| `pages/` | Mỗi route một thư mục, chỉ lắp ghép feature: `login/`, `verify-nfc/`, `not-found/`, `config-error/` |
| `features/auth/` | `api/` gọi đăng nhập, `model/` (`AuthProvider`, `useAuth`), `ui/` (`LoginForm`, `RequireAuth`), `strings.ts` |
| `features/nfc/` | Xác minh CCCD (FR-04): `api/` (endpoint, kiểu dữ liệu, kênh STOMP), `model/` (`useNfcSession`, `useNfcStatus`, `qrPayload`), `ui/` (panel QR, thẻ trạng thái), `strings.ts` |
| `shared/api/` | axios client (gắn Bearer, 401 → đăng xuất, `ApiError`), `httpStatus.ts`, `gateway.ts` (prefix service, `/ws`, `websocketUrl`), `realtime/` (kết nối STOMP tới orchestrator-service, nhận token qua prop, `useRealtime().subscribe`) |
| `shared/config/` | `env.ts` (biến `VITE_*`), `routes.ts`, `strings.ts` (câu chữ dùng chung) |
| `shared/ui/` | Component UI thuần (Button, Input…) khi có cái dùng lại thật |
| `shared/utils/` | `format.ts` |
