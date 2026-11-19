import { Link } from "react-router";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <span className="not-found-page__code">404</span>
      <h1 className="not-found-page__title">Page not found</h1>
      <p className="not-found-page__text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn--primary">
        Back to courses
      </Link>
    </div>
  );
}
