import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { RealtimeProvider } from '../../shared/api/realtime/RealtimeProvider';
import { routes } from '../../shared/config/routes';
import { strings } from '../../shared/config/strings';

/**
 * Header on `night` and the page area; every logged-in page renders inside it, with the realtime connection of the
 * session's token.
 */
export function AppShell() {
  const { session, logout } = useAuth();

  return (
    <RealtimeProvider token={session?.token ?? null}>
      <header className="app-header mk-on-night">
        <div className="app-header__inner">
          <span className="brand-text">{strings.appName}</span>
          <nav aria-label={strings.nav.main}>
            <NavLink to={routes.verifyNfc} className="app-header__link">
              {strings.nav.verifyNfc}
            </NavLink>
          </nav>
          <div className="app-header__user">
            <span className="app-header__name">{session?.displayName}</span>
            <button type="button" className="mk-btn mk-btn--sm app-header__logout" onClick={logout}>
              {strings.nav.logout}
            </button>
          </div>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </RealtimeProvider>
  );
}
