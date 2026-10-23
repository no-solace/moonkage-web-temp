import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from '../features/auth';
import { LoginPage } from '../pages/login/LoginPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { VerifyNfcPage } from '../pages/verify-nfc/VerifyNfcPage';
import { homeRoute, routes } from '../shared/config/routes';
import { AppShell } from './layout/AppShell';

export const router = createBrowserRouter([
  { path: routes.login, element: <LoginPage /> },
  {
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to={homeRoute} replace /> },
      { path: routes.verifyNfc, element: <VerifyNfcPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
