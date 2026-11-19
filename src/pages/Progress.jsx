import { Link } from "react-router";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";
import { courses } from "../data/courses";
import { getEnrolled, getCompleted, getStats } from "../data/progress-store";
import "./Progress.css";

export default function Progress() {
  const enrolled = getEnrolled();
  const completed = getCompleted();
  const stats = getStats();

  return (
    <>
      <div className="progress-header">
        <h1 className="progress-header__title">My Learning</h1>
        <p className="progress-header__subtitle">Track your progress across all courses.</p>
      </div>

      <div className="stats-row">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-card__value">{stat.value}</span>
            <span className="stat-card__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <h2 className="section-title">In Progress</h2>
      <div className="course-rows">
        {enrolled.map(({ courseId, progress }) => {
          const course = courses.find((c) => c.id === courseId);
          return (
            <div key={courseId} className="course-row">
              <img src={course.image} alt={course.title} className="course-row__image" loading="lazy" />
              <div className="course-row__text">
                <strong className="course-row__title">{course.title}</strong>
                <span className="course-row__instructor">{course.instructor.name}</span>
                <div className="course-row__progress">
                  <ProgressBar value={progress} />
                  <span>{progress}% complete</span>
                </div>
              </div>
              <Link to={`/course/${courseId}/lesson`} className="btn btn--primary btn--small">
                Continue
              </Link>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">Completed</h2>
      <div className="course-rows">
        {completed.map(({ courseId }) => {
          const course = courses.find((c) => c.id === courseId);
          return (
            <div key={courseId} className="course-row">
              <img src={course.image} alt={course.title} className="course-row__image" loading="lazy" />
              <div className="course-row__text">
                <strong className="course-row__title">{course.title}</strong>
                <span className="course-row__instructor">{course.instructor.name}</span>
                <Badge variant="success">Completed</Badge>
              </div>
              <Link to={`/profile`} className="btn btn--outline btn--small">
                View certificate
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
