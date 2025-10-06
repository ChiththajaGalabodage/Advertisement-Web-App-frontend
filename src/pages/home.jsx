import { Route, Routes } from "react-router-dom";
import Header from "../components/header";

import AboutUsPage from "./client/aboutUsPage";
import HomeUsPage from "./homeUsPage";
import AddPostPage from "./client/addPost";
import BlogPage from "./client/blog";
import Listing from "./client/listing";
import PricingPlan from "./client/pricingPlan";
import ListingOverviewPage from "./client/listingOverview";

export default function HomePage() {
  return (
    <div className="w-full h-screen  flex flex-col items-center">
      <Header />

      <div className="w-full h-[calc(100vh-80px)]  flex flex-col items-center">
        <Routes path="/*">
          <Route path="/" element={<HomeUsPage />} />

          <Route path="/about" element={<AboutUsPage />} />

          <Route path="/client/addPost" element={<AddPostPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/pricingPlan" element={<PricingPlan />} />
          <Route
            path="/overview/:listingId"
            element={<ListingOverviewPage />}
          />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
