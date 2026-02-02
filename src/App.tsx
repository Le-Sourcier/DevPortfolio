// New App.tsx with clear separation and nested routing
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout, AdminRootLayout } from "./layouts";

// Public Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProjects from "./pages/admin/ProjectsManagement";
import AdminBlogPosts from "./pages/admin/BlogPost";
import AdminBlogPostEdit from "./pages/admin/BlogPostEdit";
import AdminMessages from "./pages/admin/Messages";
import AdminSettings from "./pages/admin/Settings";
import AdminSkills from "./pages/admin/SkillsManagement";
import AdminExperiences from "./pages/admin/ExperiencesManagement";
import AdminEducation from "./pages/admin/EducationManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<ProtectedRoute><AdminRootLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="posts" element={<AdminBlogPosts />} />
          <Route path="posts/:id" element={<AdminBlogPostEdit />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="education" element={<AdminEducation />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
