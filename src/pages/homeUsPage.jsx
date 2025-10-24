import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import FeaturedListing from "../components/featuredLisiting";
import CategoryGrid from "../components/categoryGrid";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/listings")
        .then((res) => {
          setListings(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const categories = [
    { name: "Vehicles", count: 217, icon: "🚗" },
    { name: "Home & Living", count: 131, icon: "🏠" },
    { name: "Mobile Phone", count: 108, icon: "📱" },
    { name: "Business & Industry", count: 101, icon: "🏭" },
    { name: "Hobbies, Sports & Kids", count: 91, icon: "🏀" },
    { name: "Property", count: 0, icon: "🏢" },
    { name: "Women Fashion & Beauty", count: 0, icon: "👗" },
    { name: "Men's Fashion & Grooming", count: 0, icon: "👔" },
    { name: "Essentials", count: 0, icon: "🛠️" },
    { name: "Education", count: 0, icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Categories */}
      <CategoryGrid />

      {/* Featured Listings */}
      <section className="py-12 px-6 bg-gray-200 w-screen">
        <h3 className="text-xl font-bold mb-6 text-center">Featured Listing</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {console.log("Listings data:", listings)}
          {listings.map((featuredListings) => {
            return (
              <FeaturedListing
                key={featuredListings.listingId}
                featuredListings={featuredListings}
              />
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 border-black bg-white text-black px-6 py-3 rounded-full shadow-md hover:bg-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            Browse All
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
