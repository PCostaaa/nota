import { useParams, Link } from "react-router";
import { Star } from "lucide-react";
import Badge from "../components/Badge";
import LessonItem from "../components/LessonItem";
import { courses } from "../data/courses";
import "./CourseDetail.css";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="not-found">
        <h1>Course not found</h1>
        <Link to="/" className="btn btn--primary">Back to courses</Link>
      </div>
    );
  }

  return (
    <>
      <div className="breadcrumb">
        <Link to="/">Courses</Link>
        <span>/</span>
        <span>{course.title}</span>
      </div>

      <div className="detail">
        <div className="detail__main">
          <img src={course.image} alt={course.title} className="detail__image" loading="lazy" />
          <h1 className="detail__title">{course.title}</h1>

          <div className="detail__meta">
            <div className="detail__instructor">
              <img src={course.instructor.avatar} alt={course.instructor.name} />
              <span>{course.instructor.name}</span>
            </div>
            <Badge>{course.category}</Badge>
            <div className="detail__rating">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.round(course.rating) ? "var(--warning)" : "none"}
                  stroke={i < Math.round(course.rating) ? "var(--warning)" : "var(--stroke)"}
                />
              ))}
              <span>{course.rating}</span>
            </div>
            <span className="detail__meta-text">{course.lessons} Lessons · {course.duration}</span>
          </div>

          <p className="detail__description">{course.description}</p>
          <div className="detail__divider" />

          <h2 className="detail__h2">Curriculum</h2>
          <div className="detail__curriculum">
            {course.curriculum.map((lesson) => (
              <LessonItem
                key={lesson.id}
                number={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                completed={lesson.completed}
              />
            ))}
          </div>
        </div>

        <aside className="detail__sidebar">
          <div className="enroll-card">
            <span className="enroll-card__price">Free</span>
            <Link to={`/course/${course.id}/lesson`} className="btn btn--primary enroll-card__btn">
                Enroll now
            </Link>
            <div className="enroll-card__divider" />
            <dl className="enroll-card__details">
              <div><dt>Duration</dt><dd>{course.duration}</dd></div>
              <div><dt>Lessons</dt><dd>{course.lessons}</dd></div>
              <div><dt>Level</dt><dd>{course.level}</dd></div>
              <div><dt>Certificate</dt><dd>{course.certificate ? "Yes" : "No"}</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}