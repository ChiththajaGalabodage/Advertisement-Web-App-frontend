import { Link, Route, Routes, useLocation } from "react-router-dom";
import Loading from "../components/loading";

import AdminDashboard from "./AdminDashboard";
import Dashboard from "./admin/Dashboard";
import CategoryAnalytics from "./admin/CategoryAnalytics";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;

  function getClass(name) {
    if (path.includes(name)) {
      return "bg-accent text-white p-4";
    } else {
      return "text-accent p-4";
    }
  }

  return (
    <div className="w-full min-h-screen flex bg-gray-50">
      <>
        <div className="h-screen w-[280px] text-accent font-semibold text-lg flex flex-col bg-white shadow-lg sticky top-0">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-accent">Admin Panel</h2>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Link
              className={`${getClass("dashboard")} rounded-lg transition-all hover:bg-accent hover:text-white`}
              to="/admin/dashboard"
            >
              📊 Dashboard
            </Link>
            <Link
              className={`${getClass("admin-dashboard")} rounded-lg transition-all hover:bg-accent hover:text-white`}
              to="/admin/admin-dashboard"
            >
              📋 Admin View
            </Link>
            <Link
              className={`${getClass("category-analytics")} rounded-lg transition-all hover:bg-accent hover:text-white`}
              to="/admin/category-analytics"
            >
              📈 Ads Category
            </Link>
          </nav>
        </div>

        <div className="flex-1 overflow-auto">
          <Routes path="/*">
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/category-analytics" element={<CategoryAnalytics />} />
          </Routes>
        </div>
      </>
    </div>
  );
}
