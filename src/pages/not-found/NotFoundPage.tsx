import { Link } from 'react-router-dom';
import { homeRoute } from '../../shared/config/routes';
import { strings } from '../../shared/config/strings';

export function NotFoundPage() {
  return (
    <div className="page">
      <h1 className="title-text">{strings.notFound.title}</h1>
      <Link to={homeRoute} className="mk-btn mk-btn--text">
        {strings.notFound.back}
      </Link>
    </div>
  );
}
