// Layout Components
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import AdminLayout from "./components/layout/AdminLayout";

export const PublicLayout = () => {
  const location = useLocation();

  // Pages with immersive hero that should NOT have top padding
  const pagesWithImmersiveHero = ['/', '/about', '/services', '/blog', '/contact', '/careers'];
  const currentPath = location.pathname.replace(/\/$/, '') || '/';
  const hasImmersiveHero = pagesWithImmersiveHero.includes(currentPath);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col">
      <ScrollToTop />
      <Header />
      <main className={`flex-grow ${hasImmersiveHero ? '' : 'pt-16 lg:pt-20'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const AdminRootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ScrollToTop />
      <AdminLayout />
    </div>
  );
};
