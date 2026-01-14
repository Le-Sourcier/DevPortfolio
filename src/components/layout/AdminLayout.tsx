import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/Header";
import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminHeader />
      <div className="flex">
        <AdminSideBar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
