import { useState } from "react";
import { Link } from "react-router";
import Badge from "../components/Badge";
import ProgressBar from "../components/ProgressBar";
import { quizData, getQuizForCourse, getAvailableQuizCourses } from "../data/quiz";
import { courses } from "../data/courses";
import "./Quiz.css";

export default function Quiz() {
  const availableIds = getAvailableQuizCourses();
  const [courseId, setCourseId] = useState(availableIds[0]);
  const quiz = getQuizForCourse(courseId);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quiz.questions[current];
  const total = quiz.questions.length;
  const progress = ((current + (answered ? 1 : 0)) / total) * 100;

  function resetQuiz(newCourseId) {
    setCourseId(newCourseId || courseId);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function handleSelect(optionId) {
    if (answered) return;
    setSelected(optionId);
    setAnswered(true);
    if (optionId === question.correct) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  function getOptionClass(optionId) {
    if (!answered) return "quiz-option";
    if (optionId === question.correct) return "quiz-option quiz-option--correct";
    if (optionId === selected) return "quiz-option quiz-option--wrong";
    return "quiz-option";
  }

  if (finished) {
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <h1 className="quiz-result__title">Quiz complete!</h1>
          <p className="quiz-result__score">
            You scored <strong>{score}</strong> out of <strong>{total}</strong>
          </p>
          <ProgressBar value={(score / total) * 100} />
          <div className="quiz-result__actions">
            <button className="btn btn--outline" onClick={() => resetQuiz()}>
              Try again
            </button>
            <Link to={`/course/${quiz.courseId}/lesson`} className="btn btn--primary">
              Back to lesson
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Course selector */}
      <div className="quiz-course-selector">
        {availableIds.map((id) => {
          const course = courses.find((c) => c.id === id);
          return (
            <button
              key={id}
              className={`badge ${id === courseId ? "badge--primary" : "badge--neutral"}`}
              aria-pressed={id === courseId}
              onClick={() => resetQuiz(id)}
            >
              {course?.title || id}
            </button>
          );
        })}
      </div>

      <Badge>Lesson {quiz.lessonNumber} Quiz</Badge>
      <h1 className="quiz-title">{quiz.lessonTitle}</h1>

      <div className="quiz-progress">
        <span className="quiz-progress__text">Question {current + 1} of {total}</span>
        <ProgressBar value={progress} />
      </div>

      <h2 className="quiz-question">{question.question}</h2>

      <div className="quiz-options">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={getOptionClass(option.id)}
            onClick={() => handleSelect(option.id)}
            disabled={answered}
          >
            <span className="quiz-option__letter">{option.id.toUpperCase()}</span>
            <span className="quiz-option__text">{option.text}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div className="quiz-feedback">
          <p className={`quiz-feedback__text ${selected === question.correct ? "quiz-feedback__text--correct" : "quiz-feedback__text--wrong"}`}>
            {selected === question.correct ? "✓ Correct!" : "✗ Incorrect."}{" "}
            {question.explanation}
          </p>
          <button className="btn btn--primary" onClick={handleNext}>
            {current < total - 1 ? "Next question →" : "See results"}
          </button>
        </div>
      )}
    </div>
  );
}
