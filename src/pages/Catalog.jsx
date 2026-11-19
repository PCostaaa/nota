import { useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { courses, categories, heroImg } from "../data/courses";
import "./Catalog.css";

export default function Catalog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__label">Start learning today</p>
          <h1 className="hero__title">Expand your skills{"\n"}with expert-led courses</h1>
          <div className="hero__search">
            <input
              type="text"
              placeholder="Search for courses, topics or instructors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="hero__search-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className="catalog__filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`badge ${cat === category ? "badge--primary" : "badge--neutral"}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="catalog__grid">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="catalog__empty">No courses found.</p>
      )}
    </>
  );
}