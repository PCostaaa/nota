export const quizData = {
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
};