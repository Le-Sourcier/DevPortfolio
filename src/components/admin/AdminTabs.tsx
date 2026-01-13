import { useSearchParams } from "react-router-dom";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import BlogPost from "../../pages/admin/BlogPost";
import ProjectsManagement from "../../pages/admin/ProjectsManagement";
import Media from "../../pages/admin/Media";
import Analytics from "../../pages/admin/Analytics";
import Messages from "../../pages/admin/Messages";
import Settings from "../../pages/admin/Settings";
import Backup from "../../pages/admin/Backup";
import Notifications from "../../pages/admin/Notifications";

function AdminTabs() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard"; // Default tab

  // Render content based on the tab
  const renderTabContent = () => {
    switch (tab.toLowerCase()) {
      case "dashboard":
        return <AdminDashboard />;
      case "posts":
        return <BlogPost />;
      case "projects":
        return <ProjectsManagement />;
      case "media":
        return <Media />;
      case "analytics":
        return <Analytics />;
      case "messages":
        return <Messages />;
      case "settings":
        return <Settings />;
      case "backup":
        return <Backup />;
      case "notifications":
        return <Notifications />;
      default:
        return <AdminDashboard />;
    }
  };

  return <div>{renderTabContent()}</div>;
}
export default AdminTabs;
