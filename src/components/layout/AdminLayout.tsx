import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/Header";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useAuthStore } from "../../stores/auth";

const AdminLayout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
      <AdminHeader onClick={clearAuth} />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-60 flex-shrink-0 hidden lg:block">
          <AdminSideBar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
