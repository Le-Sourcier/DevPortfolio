import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./context/AppContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/common/ScrollToTop";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/admin/Login";
import PrivateRoute from "./components/admin/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Navigate } from "react-router-dom";
import ExperiencesManagement from "./pages/admin/ExperiencesManagement";
import ProjectsManagement from "./pages/admin/ProjectsManagement";
import SkillsManagement from "./pages/admin/SkillsManagement";
import EducationManagement from "./pages/admin/EducationManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname + location.search}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/experiences" element={<ExperiencesManagement />} />
            <Route path="/admin/projects" element={<ProjectsManagement />} />
            <Route path="/admin/skills" element={<SkillsManagement />} />
            <Route path="/admin/education" element={<EducationManagement />} />
            <Route path="/admin/blog" element={<BlogManagement />} />
            {/* Add other admin routes here */}
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function LayoutWrapper() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <ScrollToTop />
      <Header />
      <main className={isAdminPage ? "" : "pt-16"}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <LayoutWrapper />
      </Router>
    </AppProvider>
  );
}

export default App;
