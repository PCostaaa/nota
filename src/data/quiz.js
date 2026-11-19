const allQuizzes = {
  "ui-design": {
    courseId: "ui-design",
    lessonTitle: "Typography Fundamentals",
    lessonNumber: 3,
    questions: [
      {
        id: 1,
        question: "What is the recommended minimum body font size for web?",
        options: [
          { id: "a", text: "10px" },
          { id: "b", text: "14px" },
          { id: "c", text: "16px" },
          { id: "d", text: "20px" },
        ],
        correct: "c",
        explanation: "16px is the browser default and ensures readability across devices.",
      },
      {
        id: 2,
        question: "What is the primary purpose of the <section> element in HTML?",
        options: [
          { id: "a", text: "A semantic element that defines a section of content" },
          { id: "b", text: "A replacement for the div element" },
          { id: "c", text: "A way to create navigation menus" },
          { id: "d", text: "An element for displaying images" },
        ],
        correct: "a",
        explanation: "A section element defines a thematic grouping of content.",
      },
      {
        id: 3,
        question: "Which CSS property controls the space between lines of text?",
        options: [
          { id: "a", text: "letter-spacing" },
          { id: "b", text: "line-height" },
          { id: "c", text: "text-indent" },
          { id: "d", text: "word-spacing" },
        ],
        correct: "b",
        explanation: "Line-height sets the vertical space between lines, improving readability.",
      },
      {
        id: 4,
        question: "What is a type scale?",
        options: [
          { id: "a", text: "A tool for weighing fonts" },
          { id: "b", text: "A set of harmonious font sizes based on a ratio" },
          { id: "c", text: "The maximum number of fonts in a design" },
          { id: "d", text: "A method for measuring kerning" },
        ],
        correct: "b",
        explanation: "A type scale uses a consistent ratio to create harmonious size relationships.",
      },
      {
        id: 5,
        question: "What does 'font-weight: 600' typically correspond to?",
        options: [
          { id: "a", text: "Light" },
          { id: "b", text: "Regular" },
          { id: "c", text: "SemiBold" },
          { id: "d", text: "Bold" },
        ],
        correct: "c",
        explanation: "600 maps to SemiBold in most font families. Regular is 400 and Bold is 700.",
      },
    ],
  },

  "react": {
    courseId: "react",
    lessonTitle: "Components & Props",
    lessonNumber: 3,
    questions: [
      {
        id: 1,
        question: "What is a React component?",
        options: [
          { id: "a", text: "A CSS class" },
          { id: "b", text: "A reusable piece of UI that returns JSX" },
          { id: "c", text: "A JavaScript variable" },
          { id: "d", text: "An HTML template" },
        ],
        correct: "b",
        explanation: "Components are independent, reusable building blocks that return JSX describing what should appear on screen.",
      },
      {
        id: 2,
        question: "How do you pass data from a parent to a child component?",
        options: [
          { id: "a", text: "Using global variables" },
          { id: "b", text: "Using props" },
          { id: "c", text: "Using localStorage" },
          { id: "d", text: "Using CSS custom properties" },
        ],
        correct: "b",
        explanation: "Props (short for properties) are React's way of passing data down the component tree.",
      },
      {
        id: 3,
        question: "Which hook is used to manage local state in a function component?",
        options: [
          { id: "a", text: "useEffect" },
          { id: "b", text: "useContext" },
          { id: "c", text: "useState" },
          { id: "d", text: "useRef" },
        ],
        correct: "c",
        explanation: "useState returns a state variable and a setter function to update it.",
      },
      {
        id: 4,
        question: "What does JSX stand for?",
        options: [
          { id: "a", text: "JavaScript XML" },
          { id: "b", text: "JavaScript Extension" },
          { id: "c", text: "JSON Syntax Extension" },
          { id: "d", text: "Java Standard XML" },
        ],
        correct: "a",
        explanation: "JSX stands for JavaScript XML — a syntax extension that lets you write HTML-like markup inside JavaScript.",
      },
      {
        id: 5,
        question: "What triggers a re-render in React?",
        options: [
          { id: "a", text: "Changing a regular variable" },
          { id: "b", text: "Calling setState or a state setter" },
          { id: "c", text: "Using console.log" },
          { id: "d", text: "Adding a comment in JSX" },
        ],
        correct: "b",
        explanation: "React re-renders a component when its state or props change. Regular variable changes don't trigger re-renders.",
      },
    ],
  },

  "marketing": {
    courseId: "marketing",
    lessonTitle: "SEO Fundamentals",
    lessonNumber: 3,
    questions: [
      {
        id: 1,
        question: "What does SEO stand for?",
        options: [
          { id: "a", text: "Social Engagement Optimization" },
          { id: "b", text: "Search Engine Optimization" },
          { id: "c", text: "Site Enhancement Operations" },
          { id: "d", text: "Structured Email Outreach" },
        ],
        correct: "b",
        explanation: "SEO stands for Search Engine Optimization — improving your site's visibility in search results.",
      },
      {
        id: 2,
        question: "What is a meta description?",
        options: [
          { id: "a", text: "The main heading of a page" },
          { id: "b", text: "A short summary shown in search results" },
          { id: "c", text: "An image alt text" },
          { id: "d", text: "A footnote on the page" },
        ],
        correct: "b",
        explanation: "The meta description is a brief snippet displayed below the page title in search engine results.",
      },
      {
        id: 3,
        question: "Which metric measures the percentage of visitors who leave after viewing one page?",
        options: [
          { id: "a", text: "Conversion rate" },
          { id: "b", text: "Click-through rate" },
          { id: "c", text: "Bounce rate" },
          { id: "d", text: "Engagement rate" },
        ],
        correct: "c",
        explanation: "Bounce rate is the percentage of visitors who navigate away from the site after viewing only one page.",
      },
      {
        id: 4,
        question: "What is the primary purpose of a call-to-action (CTA)?",
        options: [
          { id: "a", text: "To decorate the page" },
          { id: "b", text: "To prompt the user to take a specific action" },
          { id: "c", text: "To display the company logo" },
          { id: "d", text: "To increase page load speed" },
        ],
        correct: "b",
        explanation: "A CTA guides users toward a desired action, such as signing up, downloading, or purchasing.",
      },
      {
        id: 5,
        question: "What type of content tends to perform best for organic reach?",
        options: [
          { id: "a", text: "Paid advertisements" },
          { id: "b", text: "Long-form, valuable content that answers user questions" },
          { id: "c", text: "Pop-up banners" },
          { id: "d", text: "Auto-playing videos" },
        ],
        correct: "b",
        explanation: "Search engines reward content that provides genuine value and thoroughly answers user queries.",
      },
    ],
  },
};

/** Legacy single export — still used by Quiz.jsx default view */
export const quizData = allQuizzes["ui-design"];

/** Get quiz for a specific course */
export function getQuizForCourse(courseId) {
  return allQuizzes[courseId] || null;
}

/** All available course IDs with quizzes */
export function getAvailableQuizCourses() {
  return Object.keys(allQuizzes);
}
