import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AdminPage from "./pages/adminPage";

import { Toaster } from "react-hot-toast";
//import AddProductPage from "./pages/admin/addProductPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPassword";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <GoogleOAuthProvider clientId="454704357887-cirshapfhvtvve3en4q0svo5q53kbcec.apps.googleusercontent.com">
      <BrowserRouter>
        <div>
          <Toaster position="top-right" />
          {/*<Headers /> */}
          <Routes path="/*">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget" element={<ForgetPasswordPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />

            <Route path="/*" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

//https://cschwfhbuvxlegdggmsu.supabase.co

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzY2h3ZmhidXZ4bGVnZGdnbXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4ODc0MjksImV4cCI6MjA2MjQ2MzQyOX0.tKzAshkDhdz9LODu4iXW9DJCQK3FeY3bZTjLcZY6kmU
