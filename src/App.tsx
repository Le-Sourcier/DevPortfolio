// New App.tsx with clear separation and nested routing
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout, AdminRootLayout } from "./layouts";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

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
import AdminComments from "./pages/admin/CommentsManagement";
import AdminNewsletters from "./pages/admin/Newsletters";
import AdminJobs from "./pages/admin/JobsManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
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
          <Route path="comments" element={<AdminComments />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="newsletter" element={<AdminNewsletters />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
