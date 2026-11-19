import { Check } from "lucide-react";
import "./LessonItem.css";

export default function LessonItem({ number, title, duration, completed }) {
  return (
    <div className="lesson-item">
      <span className="lesson-item__number">
        {String(number).padStart(2, "0")}
      </span>
      <div className="lesson-item__text">
        <span className="lesson-item__title">{title}</span>
        <span className="lesson-item__duration">{duration}</span>
      </div>
      <span className={`lesson-item__status ${completed ? "lesson-item__status--done" : ""}`}>
        {completed && <Check size={10} />}
      </span>
    </div>
  );
}