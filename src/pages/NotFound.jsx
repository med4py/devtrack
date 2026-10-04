import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found card-surface">
      <div className="not-found__content">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The route you requested does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
