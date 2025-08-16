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
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </AnimatePresence>
  );
}

function LayoutWrapper() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
