import heroImg from "../assets/hero.jpg";
import uiDesign from "../assets/course-ui-design.jpg";
import react from "../assets/course-react.jpg";
import marketing from "../assets/course-marketing.jpg";
import photography from "../assets/course-photography.jpg";
import business from "../assets/course-business.jpg";
import designSystems from "../assets/course-design-systems.jpg";
import sarah from "../assets/avatar-sarah.jpg";
import james from "../assets/avatar-james.jpg";
import ana from "../assets/avatar-ana.jpg";
import david from "../assets/avatar-david.jpg";
import emma from "../assets/avatar-emma.jpg";
import lucas from "../assets/avatar-lucas.jpg";

export { heroImg };

export const categories = ["All", "Design", "Development", "Marketing", "Photography", "Business"];

export const courses = [
  {
    id: "ui-design",
    title: "Introduction to UI Design",
    category: "Design",
    image: uiDesign,
    instructor: { name: "Sarah Chen", avatar: sarah },
    rating: 4.8,
    lessons: 12,
    duration: "6h 30m",
    level: "Beginner",
    certificate: true,
    description: "Learn the fundamentals of user interface design. This course covers layout principles, typography, color theory and component-based design thinking. By the end, you'll be able to design clean, functional interfaces from scratch.",
    curriculum: [
      { id: 1, title: "Introduction to the course", duration: "5:30", completed: true },
      { id: 2, title: "Understanding layout principles", duration: "12:45", completed: true },
      { id: 3, title: "Typography fundamentals", duration: "18:20", completed: false },
      { id: 4, title: "Color theory and palettes", duration: "15:10", completed: false },
      { id: 5, title: "Building your first component", duration: "22:00", completed: false },
    ],
  },
  {
    id: "react",
    title: "React for Beginners",
    category: "Development",
    image: react,
    instructor: { name: "James Miller", avatar: james },
    rating: 4.9,
    lessons: 24,
    duration: "12h 15m",
    level: "Beginner",
    certificate: true,
    description: "Start your React journey from zero. Learn components, props, state, hooks and routing by building real projects step by step.",
    curriculum: [
      { id: 1, title: "What is React?", duration: "8:00", completed: false },
      { id: 2, title: "Setting up your environment", duration: "10:30", completed: false },
      { id: 3, title: "Your first component", duration: "14:20", completed: false },
      { id: 4, title: "Props and data flow", duration: "16:45", completed: false },
      { id: 5, title: "State and events", duration: "20:00", completed: false },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing 101",
    category: "Marketing",
    image: marketing,
    instructor: { name: "Ana Ferreira", avatar: ana },
    rating: 4.6,
    lessons: 18,
    duration: "8h 45m",
    level: "Beginner",
    certificate: true,
    description: "Master the fundamentals of digital marketing, from SEO and content strategy to social media campaigns and analytics.",
    curriculum: [
      { id: 1, title: "The digital marketing landscape", duration: "7:00", completed: false },
      { id: 2, title: "Understanding your audience", duration: "11:30", completed: false },
      { id: 3, title: "SEO fundamentals", duration: "15:20", completed: false },
      { id: 4, title: "Content marketing strategy", duration: "13:10", completed: false },
      { id: 5, title: "Social media campaigns", duration: "18:00", completed: false },
    ],
  },
  {
    id: "photography",
    title: "Photography Masterclass",
    category: "Photography",
    image: photography,
    instructor: { name: "David Kim", avatar: david },
    rating: 4.7,
    lessons: 15,
    duration: "7h 20m",
    level: "Intermediate",
    certificate: true,
    description: "Take your photography to the next level. Learn composition, lighting, post-processing and how to develop your own visual style.",
    curriculum: [
      { id: 1, title: "Camera settings demystified", duration: "9:00", completed: false },
      { id: 2, title: "Composition rules", duration: "12:00", completed: false },
      { id: 3, title: "Natural lighting", duration: "14:30", completed: false },
      { id: 4, title: "Post-processing basics", duration: "16:00", completed: false },
      { id: 5, title: "Finding your style", duration: "11:00", completed: false },
    ],
  },
  {
    id: "business",
    title: "Business Strategy",
    category: "Business",
    image: business,
    instructor: { name: "Emma Wilson", avatar: emma },
    rating: 4.5,
    lessons: 20,
    duration: "10h 00m",
    level: "Advanced",
    certificate: true,
    description: "Develop strategic thinking skills for business growth. Covers market analysis, competitive positioning and execution frameworks.",
    curriculum: [
      { id: 1, title: "What is strategy?", duration: "6:30", completed: false },
      { id: 2, title: "Market analysis tools", duration: "13:00", completed: false },
      { id: 3, title: "Competitive advantage", duration: "15:45", completed: false },
      { id: 4, title: "Growth frameworks", duration: "17:00", completed: false },
      { id: 5, title: "Execution and metrics", duration: "14:30", completed: false },
    ],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    category: "Design",
    image: designSystems,
    instructor: { name: "Lucas Oliveira", avatar: lucas },
    rating: 4.9,
    lessons: 16,
    duration: "8h 00m",
    level: "Intermediate",
    certificate: true,
    description: "Build scalable design systems from scratch. Learn tokens, components, documentation and how to bridge design and development.",
    curriculum: [
      { id: 1, title: "Why design systems?", duration: "7:00", completed: false },
      { id: 2, title: "Design tokens", duration: "12:30", completed: false },
      { id: 3, title: "Component architecture", duration: "16:00", completed: false },
      { id: 4, title: "Documentation", duration: "11:00", completed: false },
      { id: 5, title: "Handoff to developers", duration: "14:00", completed: false },
    ],
  },
];