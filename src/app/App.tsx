import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../features/auth';
import { ConfigErrorPage } from '../pages/config-error/ConfigErrorPage';
import { isConfigValid } from '../shared/config/env';
import { router } from './router';

export function App() {
  if (!isConfigValid()) return <ConfigErrorPage />;

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
