import { useState } from "react";
import { useParams, Link } from "react-router";
import { Play, Check } from "lucide-react";
import { courses } from "../data/courses";
import "./LessonPlayer.css";

export default function LessonPlayer() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  const [currentLesson, setCurrentLesson] = useState(2);

  if (!course) {
    return (
      <div className="not-found">
        <h1>Course not found</h1>
        <Link to="/" className="btn btn--primary">Back to courses</Link>
      </div>
    );
  }

  const lesson = course.curriculum[currentLesson];
  const completedCount = course.curriculum.filter((l) => l.completed).length;
  const progress = (completedCount / course.curriculum.length) * 100;

  return (
    <div className="player">
      <div className="player__main">
        <div className="player__video">
          <button className="player__play" aria-label="Play video">
            <Play size={28} fill="#fff" />
          </button>
          <div className="player__video-track">
            <div className="player__video-fill" style={{ width: "35%" }} />
          </div>
        </div>

        <div className="player__controls">
          <h2 className="player__title">
            {String(currentLesson + 1).padStart(2, "0")} — {lesson.title}
          </h2>
          <div className="player__buttons">
            <button
              className="btn btn--outline"
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn--primary"
              disabled={currentLesson === course.curriculum.length - 1}
              onClick={() => setCurrentLesson((prev) => prev + 1)}
            >
              Next lesson
            </button>
          </div>
        </div>
      </div>

      <aside className="player__sidebar">
        <h3 className="player__sidebar-title">Course content</h3>
        <p className="player__sidebar-progress">{completedCount} of {course.curriculum.length} completed</p>

        <div className="player__progress-bar">
          <div className="player__progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="player__sidebar-divider" />

        <ul className="player__lessons">
          {course.curriculum.map((item, index) => (
            <li key={item.id}>
              <button
                className={`player__lesson ${index === currentLesson ? "player__lesson--active" : ""}`}
                onClick={() => setCurrentLesson(index)}
              >
                <span className="player__lesson-number">
                  {String(item.id).padStart(2, "0")}
                </span>
                <div className="player__lesson-text">
                  <span className="player__lesson-title">{item.title}</span>
                  <span className="player__lesson-duration">{item.duration}</span>
                </div>
                <span className={`player__lesson-status ${item.completed ? "player__lesson-status--done" : ""}`}>
                  {item.completed && <Check size={10} />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}