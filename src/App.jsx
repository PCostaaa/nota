import { Routes, Route, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Progress from "./pages/Progress";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

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
  /* Apply dark mode from localStorage on mount — fall back to OS preference */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nota_darkMode");
      if (saved === "true") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else if (saved === "false") {
        document.documentElement.setAttribute("data-theme", "light");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseDetail />} />
        <Route path="progress" element={<Progress />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<FullWidthLayout />}>
        <Route path="course/:courseId/lesson" element={<LessonPlayer />} />
      </Route>
    </Routes>
    </>
  );
}
