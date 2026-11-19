/**
 * Lightweight localStorage wrapper for course progress.
 * Falls back to defaults when storage is unavailable.
 */

const STORAGE_KEY = "nota_progress";

const defaults = {
  enrolled: [
    { courseId: "ui-design", progress: 35 },
    { courseId: "react", progress: 10 },
  ],
  completed: [
    { courseId: "marketing", completedDate: "Nov 4, 2026" },
  ],
  lessonIndex: {},       // { [courseId]: number }
  completedLessons: {},  // { [courseId]: number[] }
};

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...defaults };
}

function write(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* quota exceeded — silently ignore */ }
}

/* ── Public API ───────────────────────────────── */

export function getEnrolled() {
  return read().enrolled;
}

export function getCompleted() {
  return read().completed;
}

export function getStats() {
  const data = read();
  const totalCourses = data.enrolled.length + data.completed.length;
  const totalLessons = Object.values(data.completedLessons)
    .reduce((sum, arr) => sum + arr.length, 0);
  const hours = Math.max(1, Math.round(totalLessons * 0.5));

  return [
    { value: String(totalCourses), label: "Courses enrolled" },
    { value: String(totalLessons || 12), label: "Lessons completed" },
    { value: `${hours || 6}h`, label: "Time spent" },
    { value: String(data.completed.length), label: "Certificates earned" },
  ];
}

/** Save which lesson index a user is on for a course */
export function saveLessonIndex(courseId, index) {
  const data = read();
  data.lessonIndex[courseId] = index;
  write(data);
}

/** Get the saved lesson index (defaults to 0) */
export function getLessonIndex(courseId) {
  return read().lessonIndex[courseId] ?? 0;
}

/** Mark a lesson as completed and recalc course progress.
 *  Returns true if the entire course was just completed. */
export function completeLesson(courseId, lessonId, totalLessons) {
  const data = read();
  if (!data.completedLessons[courseId]) {
    data.completedLessons[courseId] = [];
  }
  if (!data.completedLessons[courseId].includes(lessonId)) {
    data.completedLessons[courseId].push(lessonId);
  }

  const completedCount = data.completedLessons[courseId].length;

  // Update enrolled progress %
  const entry = data.enrolled.find((e) => e.courseId === courseId);
  if (entry) {
    entry.progress = Math.round((completedCount / totalLessons) * 100);
  }

  // Check if the whole course is now complete
  const justFinished = completedCount >= totalLessons;

  if (justFinished) {
    // Move from enrolled to completed
    data.enrolled = data.enrolled.filter((e) => e.courseId !== courseId);
    const alreadyCompleted = data.completed.some((c) => c.courseId === courseId);
    if (!alreadyCompleted) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      data.completed.push({ courseId, completedDate: dateStr });
    }
  }

  write(data);
  return justFinished;
}

/** Check if a specific lesson is completed */
export function isLessonCompleted(courseId, lessonId) {
  const data = read();
  return (data.completedLessons[courseId] || []).includes(lessonId);
}

/** Toggle a lesson's completion status. Returns the new state. */
export function toggleLessonCompleted(courseId, lessonId, totalLessons) {
  const data = read();
  if (!data.completedLessons[courseId]) {
    data.completedLessons[courseId] = [];
  }

  const idx = data.completedLessons[courseId].indexOf(lessonId);
  let nowCompleted;

  if (idx === -1) {
    data.completedLessons[courseId].push(lessonId);
    nowCompleted = true;
  } else {
    data.completedLessons[courseId].splice(idx, 1);
    nowCompleted = false;
  }

  const completedCount = data.completedLessons[courseId].length;

  // Update enrolled progress %
  const entry = data.enrolled.find((e) => e.courseId === courseId);
  if (entry) {
    entry.progress = Math.round((completedCount / totalLessons) * 100);
  }

  // Check if the whole course is now complete
  const courseFinished = completedCount >= totalLessons;

  if (courseFinished) {
    data.enrolled = data.enrolled.filter((e) => e.courseId !== courseId);
    const alreadyCompleted = data.completed.some((c) => c.courseId === courseId);
    if (!alreadyCompleted) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      data.completed.push({ courseId, completedDate: dateStr });
    }
  } else {
    // If uncompleting a lesson, ensure course is back in enrolled
    const inCompleted = data.completed.findIndex((c) => c.courseId === courseId);
    if (inCompleted !== -1) {
      data.completed.splice(inCompleted, 1);
      const inEnrolled = data.enrolled.some((e) => e.courseId === courseId);
      if (!inEnrolled) {
        data.enrolled.push({
          courseId,
          progress: Math.round((completedCount / totalLessons) * 100),
        });
      }
    }
  }

  write(data);
  return { nowCompleted, courseFinished };
}

/** Sync static completed lessons from course data into localStorage.
 *  Call once per course on mount so counts stay consistent. */
export function syncStaticCompletions(courseId, curriculum) {
  const data = read();
  if (!data.completedLessons[courseId]) {
    data.completedLessons[courseId] = [];
  }
  let changed = false;
  for (const lesson of curriculum) {
    if (lesson.completed && !data.completedLessons[courseId].includes(lesson.id)) {
      data.completedLessons[courseId].push(lesson.id);
      changed = true;
    }
  }
  if (changed) write(data);
}

/** Get certificates (completed courses with dates) */
export function getCertificates() {
  return read().completed;
}
