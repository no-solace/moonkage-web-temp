/** Paths of the buying area, as in the IA (WIREFRAME_PLAN.md section 6). */
export const routes = {
  home: '/',
  products: '/san-pham',
  product: (productId: string) => `/san-pham/${productId}`,
  customOrder: '/dat-theo-yeu-cau',
  newQuoteRequest: '/dat-theo-yeu-cau/yeu-cau-moi',
  suppliers: '/don-vi-cung-cap',
  supplier: (supplierId: string) => `/don-vi-cung-cap/${supplierId}`,
  supplierRequest: (supplierId: string) => `/don-vi-cung-cap/${supplierId}/yeu-cau`,
  cart: '/gio-hang',
  checkout: '/thanh-toan',
  vnpay: (paymentId: string) => `/vnpay/${paymentId}`,
  paymentResult: (paymentId: string) => `/thanh-toan/ket-qua/${paymentId}`,
  register: '/dang-ky',
  confirmAccount: '/dang-ky/xac-nhan',
  forgotPassword: '/quen-mat-khau',
  resetPassword: '/dat-lai-mat-khau',
  login: '/dang-nhap',
  account: '/tai-khoan',
  orders: '/tai-khoan/don-hang',
  order: (orderId: string) => `/tai-khoan/don-hang/${orderId}`,
  orderComplaint: (orderId: string) => `/tai-khoan/don-hang/${orderId}/khieu-nai`,
  quoteRequests: '/tai-khoan/yeu-cau',
  quoteRequest: (requestId: string) => `/tai-khoan/yeu-cau/${requestId}`,
  acceptQuote: (requestId: string, supplierId: string) => `/tai-khoan/yeu-cau/${requestId}/dat-coc?don-vi=${supplierId}`,
  addresses: '/tai-khoan/dia-chi',
  address: (addressId: string) => `/tai-khoan/dia-chi/${addressId}`,
  newAddress: '/tai-khoan/dia-chi/moi',
  verifyNfc: '/tai-khoan/xac-minh',
  profile: '/tai-khoan/thong-tin',
  notifications: '/thong-bao',
  sellIntro: '/ban-hang/gioi-thieu',
  sellApply: '/ban-hang/dang-ky',
  sellerChannel: '/kenh-ban',
  sellerFee: '/kenh-ban/phi-mo-ban',
  policy: '/chinh-sach',
};

/** Paths used before the IA paths; they redirect so old bookmarks keep working. */
export const legacyRoutes = {
  login: '/login',
  verifyNfc: '/account/verify-nfc',
};

/** Where login returns to when no page was asked for. */
export const homeRoute = routes.home;
