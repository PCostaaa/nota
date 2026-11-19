import { Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Progress from "./pages/Progress";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import "./App.css";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

function FullWidthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseDetail />} />
        <Route path="progress" element={<Progress />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route element={<FullWidthLayout />}>
        <Route path="course/:courseId/lesson" element={<LessonPlayer />} />
      </Route>
    </Routes>
  );
}