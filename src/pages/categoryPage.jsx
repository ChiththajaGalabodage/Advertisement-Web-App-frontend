// src/pages/CategoryPage.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FeaturedListing from "../components/featuredLisiting"; // Reuse your listing card component

export default function CategoryPage() {
  const params = useParams(); // Get the category name from the URL
  const categoryName = params.category;
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchListingsByCategory() {
      setIsLoading(true);
      try {
        // Fetch listings, filtering by the categoryName from the URL
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/listings?category=${categoryName}`
        );
        setListings(response.data);
        console.log("Fetched listings for category:", response.data);
      } catch (error) {
        console.error("Failed to fetch listings for this category:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (categoryName) {
      fetchListingsByCategory();
    }
  }, [categoryName]); // Re-run the effect if the categoryName changes

  if (isLoading) {
    return <div className="text-center py-12">Loading listings...</div>;
  }

  return (
    <section className="py-12 px-6 bg-gray-200 min-h-screen">
      {/* Dynamic title based on the category */}
      <h2 className="text-3xl font-bold mb-8 text-center capitalize">
        {categoryName.replace("-", " ")} Listings
      </h2>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {listings.map((listing) => (
            <FeaturedListing
              key={listing.listingId}
              featuredListings={listing}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No listings found in this category.
        </p>
      )}
    </section>
  );
}
