import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CreateListing from "./pages/CreateListing";
import ListingDetail from "./pages/ListingDetail";
import AdminPage from "./pages/adminPage";
import AdminGuard from "./components/AdminGuard";
import SearchPage from "./pages/SearchPage";

import { Toaster } from "react-hot-toast";
//import AddProductPage from "./pages/admin/addProductPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPassword";
import CategoryPage from "./pages/categoryPage";

function App() {
  return (
    <GoogleOAuthProvider clientId="454704357887-cirshapfhvtvve3en4q0svo5q53kbcec.apps.googleusercontent.com">
      <BrowserRouter>
        <div>
          <Toaster position="top-right" />
          {/*<Headers /> */}
          <Routes path="/*">
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/forget" element={<ForgetPasswordPage />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/admin/*"
              element={
                <AdminGuard>
                  <AdminPage />
                </AdminGuard>
              }
            />
            <Route path="/search/:categoryName" element={<CategoryPage />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

//https://cschwfhbuvxlegdggmsu.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzY2h3ZmhidXZ4bGVnZGdnbXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4ODc0MjksImV4cCI6MjA2MjQ2MzQyOX0.tKzAshkDhdz9LODu4iXW9DJCQK3FeY3bZTjLcZY6kmU
