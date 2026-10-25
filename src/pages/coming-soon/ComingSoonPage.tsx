import { Link } from 'react-router-dom';
import { routes } from '../../shared/config/routes';
import { strings } from '../../shared/config/strings';

/** A page of the IA whose screen is not built yet. */
export function ComingSoonPage() {
  return (
    <div className="shop__inner page page--narrow">
      <h1 className="title-text">{strings.comingSoon.title}</h1>
      <p className="lead-text">{strings.comingSoon.body}</p>
      <Link to={routes.home} className="mk-btn mk-btn--quiet">
        {strings.notFound.back}
      </Link>
    </div>
  );
}
