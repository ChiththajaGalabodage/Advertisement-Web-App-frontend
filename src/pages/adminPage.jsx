import { Link, Route, Routes, useLocation } from "react-router-dom";
import AdminProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import Loading from "../components/loading";
import AdminUsersPage from "./admin/user";
import AdminDashboard from "./AdminDashboard";

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
    <div className="w-full h-screen flex">
      <>
        <div className="h-full w-[300px] text-accent font-bold px-4 gap-6   text-xl  flex flex-col bg-white">
          <Link className={getClass("dashboard")} to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className={getClass("products")} to="/admin/products">
            Products
          </Link>
          <Link className={getClass("users")} to="/admin/users/gau">
            Users
          </Link>
          <Link className={getClass("orders")} to="/admin/orders">
            Orders
          </Link>
          <Link className={getClass("reveiws")} to="/admin/reveiws">
            Reviews
          </Link>
        </div>

        <div className="h-full w-[calc(100%-300px)]  border-accent border-4 rounded-xl bg-white">
          <Routes path="/*">
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/users/gau/" element={<AdminUsersPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/reviews" element={<h1>Reviews</h1>} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product" element={<EditProductPage />} />
          </Routes>
        </div>
      </>
      )
    </div>
  );
}
