import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CreateListing from "./pages/CreateListing";
import ListingDetail from "./pages/ListingDetail";
import AdminPage from "./pages/adminPage";
import SearchPage from "./pages/SearchPage";
import AboutUsPage from "./pages/client/aboutUsPage";
import PricingPlan from "./pages/client/pricingPlan";
import Vehicles from "./pages/client/categoryPages/vehicles";
import HomeLiving from "./pages/client/categoryPages/home&Living";
import MobilePhone from "./pages/client/categoryPages/mobilePhone";
import BusinessIndustry from "./pages/client/categoryPages/business&Industry";
import Hobbies from "./pages/client/categoryPages/hobbies";
import Property from "./pages/client/categoryPages/property";
import WomenFashion from "./pages/client/categoryPages/womenFashion";
import MenFashion from "./pages/client/categoryPages/menFashion";
import Essentials from "./pages/client/categoryPages/Essentials";
import Education from "./pages/client/categoryPages/education";

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
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/pricingPlan" element={<PricingPlan />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            {/* Category Routes */}
            <Route path="/category/vehicles" element={<Vehicles />} />
            <Route path="/category/home-living" element={<HomeLiving />} />
            <Route path="/category/mobile-phone" element={<MobilePhone />} />
            <Route
              path="/category/business-industry"
              element={<BusinessIndustry />}
            />
            <Route path="/category/hobbies" element={<Hobbies />} />
            <Route path="/category/property" element={<Property />} />
            <Route path="/category/women-fashion" element={<WomenFashion />} />
            <Route path="/category/men-fashion" element={<MenFashion />} />
            <Route path="/category/essentials" element={<Essentials />} />
            <Route path="/category/education" element={<Education />} />

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
