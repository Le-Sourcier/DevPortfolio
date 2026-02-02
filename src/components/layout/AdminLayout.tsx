import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/Header";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useAuthStore } from "../../stores/auth";

const AdminLayout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminHeader onClick={clearAuth} />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto hidden md:block">
          <AdminSideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
