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
  login: '/dang-nhap',
  account: '/tai-khoan',
  orders: '/tai-khoan/don-hang',
  quoteRequests: '/tai-khoan/yeu-cau',
  addresses: '/tai-khoan/dia-chi',
  verifyNfc: '/tai-khoan/xac-minh',
  profile: '/tai-khoan/thong-tin',
  notifications: '/thong-bao',
  sellIntro: '/ban-hang/gioi-thieu',
  sellApply: '/ban-hang/dang-ky',
  sellerChannel: '/kenh-ban',
  policy: '/chinh-sach',
};

/** Paths used before the IA paths; they redirect so old bookmarks keep working. */
export const legacyRoutes = {
  login: '/login',
  verifyNfc: '/account/verify-nfc',
};

/** Where login returns to when no page was asked for. */
export const homeRoute = routes.home;
