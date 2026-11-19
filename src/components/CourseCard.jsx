import { Link } from "react-router";
import { Star } from "lucide-react";
import Badge from "./Badge";
import "./CourseCard.css";

export default function CourseCard({ course }) {
    return (
        <Link to={`/course/${course.id}`} className="course-card">
            <div className="course-card__image">
                <img src={course.image} alt={course.title} />
                <Badge>{course.category}</Badge>
            </div>

            <div className="course-card__body">
                <h3 className="course-card__title">{course.title}</h3>

                <div className="course-card__instructor">
                    <img src={course.instructor.avatar} alt={course.instructor.name} />
                    <span>{course.instructor.name}</span>
                </div>

                <div className="course-card__divider"  />

                <div className="course-card__footer">
                    <div className="course-card__rating">
                        <span className="course-card__score">{course.rating}</span>
                        <div className="course-card__stars">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star 
                                    key={i}
                                    size={12}
                                    fill={i < Math.round(course.rating) ? "#FDCB6E" : "none"}
                                    stroke={i < Math.round(course.rating) ? "#FDCB6E" : "#DFE6E9"}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="course-card__lessons">{course.lessons} lessons</div>
                </div>
            </div>
        </Link>
    );
}