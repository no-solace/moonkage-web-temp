import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from '../features/auth';
import { legacyRoutes, routes } from '../shared/config/routes';
import { ShopLayout } from './layouts/ShopLayout';
import { page } from './lazyPage';

const guarded = (element: ReactNode) => <RequireAuth>{element}</RequireAuth>;

const HomePage = page(() => import('../pages/home/HomePage'), 'HomePage');
const ProductListPage = page(() => import('../pages/products/ProductListPage'), 'ProductListPage');
const ProductDetailPage = page(() => import('../pages/product-detail/ProductDetailPage'), 'ProductDetailPage');
const CustomOrderPage = page(() => import('../pages/custom-order/CustomOrderPage'), 'CustomOrderPage');
const SupplierListPage = page(() => import('../pages/suppliers/SupplierListPage'), 'SupplierListPage');
const NotificationsPage = page(() => import('../pages/notifications/NotificationsPage'), 'NotificationsPage');
const SellIntroPage = page(() => import('../pages/sell-intro/SellIntroPage'), 'SellIntroPage');
const VerifyNfcPage = page(() => import('../pages/verify-nfc/VerifyNfcPage'), 'VerifyNfcPage');
const LoginPage = page(() => import('../pages/login/LoginPage'), 'LoginPage');
const ComingSoonPage = page(() => import('../pages/coming-soon/ComingSoonPage'), 'ComingSoonPage');
const NotFoundPage = page(() => import('../pages/not-found/NotFoundPage'), 'NotFoundPage');

/** Pages of the IA that are not built yet: they open a "being built" page instead of a 404. */
const notBuiltYet = [
  routes.policy,
  routes.newQuoteRequest,
  '/don-vi-cung-cap/:supplierId',
  '/don-vi-cung-cap/:supplierId/yeu-cau',
  routes.sellApply,
  routes.sellerChannel,
];
const notBuiltYetLoggedIn = [routes.cart, routes.account, `${routes.account}/*`];

export const router = createBrowserRouter([
  { path: routes.login, element: LoginPage },
  { path: legacyRoutes.login, element: <Navigate to={routes.login} replace /> },
  { path: legacyRoutes.verifyNfc, element: <Navigate to={routes.verifyNfc} replace /> },
  {
    element: <ShopLayout />,
    children: [
      { index: true, element: HomePage },
      { path: routes.products, element: ProductListPage },
      { path: '/san-pham/:productId', element: ProductDetailPage },
      { path: routes.customOrder, element: CustomOrderPage },
      { path: routes.suppliers, element: SupplierListPage },
      { path: routes.sellIntro, element: SellIntroPage },
      { path: routes.notifications, element: guarded(NotificationsPage) },
      { path: routes.verifyNfc, element: guarded(VerifyNfcPage) },
      ...notBuiltYet.map((path) => ({ path, element: ComingSoonPage })),
      ...notBuiltYetLoggedIn.map((path) => ({ path, element: guarded(ComingSoonPage) })),
      { path: '*', element: NotFoundPage },
    ],
  },
]);
