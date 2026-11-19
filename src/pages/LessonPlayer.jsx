import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Play, Pause, Check, Award } from "lucide-react";
import { courses } from "../data/courses";
import {
  getLessonIndex,
  saveLessonIndex,
  completeLesson,
  isLessonCompleted,
  toggleLessonCompleted,
  syncStaticCompletions,
} from "../data/progress-store";
import "./LessonPlayer.css";

/** Simulated lesson videos — each lesson maps to a looping placeholder */
const PLACEHOLDER_SRC =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";

export default function LessonPlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  const savedIndex = getLessonIndex(courseId);
  const [currentLesson, setCurrentLesson] = useState(savedIndex);
  const [playing, setPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [courseComplete, setCourseComplete] = useState(false);
  const [tick, setTick] = useState(0); // force re-render on completion toggle
  const videoRef = useRef(null);

  /* Sync any statically-completed lessons into localStorage on mount */
  useEffect(() => {
    if (course) syncStaticCompletions(courseId, course.curriculum);
  }, [courseId, course]);

  const switchLesson = useCallback(
    (index) => {
      setCurrentLesson(index);
      saveLessonIndex(courseId, index);
      setPlaying(false);
      setProgressPct(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    },
    [courseId]
  );

  if (!course) {
    return (
      <div className="not-found">
        <h1>Course not found</h1>
        <Link to="/" className="btn btn--primary">Back to courses</Link>
      </div>
    );
  }

  const lesson = course.curriculum[currentLesson];
  const completedIds = course.curriculum
    .filter((l) => isLessonCompleted(courseId, l.id) || l.completed)
    .map((l) => l.id);
  const completedCount = new Set(completedIds).size;
  const progress = (completedCount / course.curriculum.length) * 100;

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgressPct((v.currentTime / v.duration) * 100);
  }

  function handleEnded() {
    setPlaying(false);
    const finished = completeLesson(courseId, lesson.id, course.curriculum.length);
    setTick((t) => t + 1);
    if (finished) {
      setCourseComplete(true);
    } else {
      autoAdvance();
    }
  }

  function handleSeek(e) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  }

  /** Click the circle to toggle a lesson's completion */
  function handleToggleComplete(e, lessonItem) {
    e.stopPropagation(); // don't switch to this lesson
    const { nowCompleted, courseFinished } = toggleLessonCompleted(
      courseId,
      lessonItem.id,
      course.curriculum.length
    );
    setTick((t) => t + 1);
    if (courseFinished) {
      setCourseComplete(true);
    } else if (nowCompleted) {
      autoAdvance();
    }
  }

  /** Auto-advance to the next incomplete lesson */
  function autoAdvance() {
    const nextIndex = course.curriculum.findIndex(
      (l, i) => i > currentLesson && !isLessonCompleted(courseId, l.id) && !l.completed
    );
    if (nextIndex !== -1) {
      switchLesson(nextIndex);
    }
  }

  /** Course completion overlay */
  if (courseComplete) {
    return (
      <div className="player__complete-overlay">
        <div className="player__complete-card">
          <Award size={48} className="player__complete-icon" />
          <h2 className="player__complete-title">Course Completed!</h2>
          <p className="player__complete-text">
            Congratulations! You've finished <strong>{course.title}</strong>.
            Your certificate is ready.
          </p>
          <div className="player__complete-actions">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/profile")}
            >
              View Certificate
            </button>
            <Link to="/" className="btn btn--outline">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player">
      <div className="player__main">
        <div className="player__video">
          <video
            ref={videoRef}
            className="player__video-el"
            src={PLACEHOLDER_SRC}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            playsInline
          />

          <button
            className="player__play"
            aria-label={playing ? "Pause video" : "Play video"}
            onClick={togglePlay}
          >
            {playing ? <Pause size={28} fill="#fff" /> : <Play size={28} fill="#fff" />}
          </button>

          <div
            className="player__video-track"
            role="progressbar"
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={handleSeek}
          >
            <div className="player__video-fill" style={{ width: `${progressPct}%` }} />
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
              onClick={() => switchLesson(currentLesson - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn--primary"
              disabled={currentLesson === course.curriculum.length - 1}
              onClick={() => switchLesson(currentLesson + 1)}
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
          {course.curriculum.map((item, index) => {
            const done = isLessonCompleted(courseId, item.id) || item.completed;
            return (
              <li key={item.id}>
                <button
                  className={`player__lesson ${index === currentLesson ? "player__lesson--active" : ""}`}
                  onClick={() => switchLesson(index)}
                >
                  <span className="player__lesson-number">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <div className="player__lesson-text">
                    <span className="player__lesson-title">{item.title}</span>
                    <span className="player__lesson-duration">{item.duration}</span>
                  </div>
                  <span
                    className={`player__lesson-status ${done ? "player__lesson-status--done" : ""}`}
                    role="checkbox"
                    aria-checked={done}
                    aria-label={done ? "Mark as incomplete" : "Mark as complete"}
                    tabIndex={0}
                    onClick={(e) => handleToggleComplete(e, item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleComplete(e, item);
                      }
                    }}
                  >
                    {done && <Check size={10} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
