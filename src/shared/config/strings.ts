/**
 * User-facing sentences shared by the whole web (Vietnamese; "bạn" for the user, no exclamation marks).
 * Each feature keeps its own sentences in its `strings.ts`.
 */
export const strings = {
  appName: 'Moonkage',

  errors: {
    network: 'Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.',
    server: 'Máy chủ đang gặp lỗi. Thử lại sau ít phút.',
    config:
      'Thiếu VITE_API_BASE_URL. Sao chép web/.env.example thành web/.env.local, điền địa chỉ gateway rồi chạy lại npm run dev.',
  },

  nav: {
    main: 'Điều hướng chính',
    verifyNfc: 'Xác minh CCCD',
    logout: 'Đăng xuất',
  },

  notFound: {
    title: 'Không có trang này',
    back: 'Về trang xác minh CCCD',
  },
};
