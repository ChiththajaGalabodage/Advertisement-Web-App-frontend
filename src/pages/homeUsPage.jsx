import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import ListingCard from "../components/Card";
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
          console.log("Fetched listings:", res.data);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-white">
      {/* Categories */}
      <CategoryGrid />

      {/* Featured Listings */}
      <section className="py-12 px-6 bg-gray-200 w-screen">
        <h3 className="text-xl font-bold mb-6 text-center">Featured Listing</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {console.log("Listings data:", listings)}
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} size="medium" />
          ))}
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
