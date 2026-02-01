import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import Header from "../components/header";
import Footer from "../components/footer";
import CategoryGrid from "../components/categoryGrid";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/listings",
      );

      console.log("Fetched listings:", response.data);

      // Handle both direct array and object with listings property
      const listingsData = response.data.listings || response.data;
      setListings(Array.isArray(listingsData) ? listingsData : []);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load listings. Please try again later.");
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse Advertisements
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Find everything you need from our community of sellers
            </p>
          </div>
        </section>
        <CategoryGrid />
        {/* Listings Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Header with count */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Latest Listings
                {listings.length > 0 && (
                  <span className="text-lg text-gray-500 ml-2">
                    ({listings.length} found)
                  </span>
                )}
              </h2>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <div className="inline-block">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-4 text-gray-600 text-lg">
                    Loading listings...
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <p className="text-red-700 text-lg mb-4">{error}</p>
                <button
                  onClick={fetchListings}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && listings.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Listings Found
                </h3>
                <p className="text-gray-600 mb-6">
                  There are no listings available at the moment.
                </p>
                <button
                  onClick={fetchListings}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Refresh
                </button>
              </div>
            )}

            {/* Listings Grid */}
            {!loading && !error && listings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <Link
                    key={listing._id}
                    to={`/listing/${listing._id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300 group"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {listing.image && listing.image.length > 0 ? (
                        <img
                          src={listing.image[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Badge */}
                      {listing.badge && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {listing.badge}
                        </div>
                      )}

                      {/* Urgent Badge */}
                      {listing.urgent && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          URGENT
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2">
                        {listing.title}
                      </h3>

                      {/* Price */}
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        ₨ {listing.price?.toLocaleString()}
                      </p>

                      {/* Category & Location */}
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {listing.category}
                        </span>
                        <span>{listing.country}</span>
                      </div>

                      {/* Description Preview */}
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {listing.description}
                      </p>

                      {/* Posted Time */}
                      <p className="text-xs text-gray-500">
                        Posted{" "}
                        {listing.createdAt
                          ? moment(listing.createdAt).format(
                              "MMM DD, YYYY [at] h:mm A",
                            )
                          : "recently"}
                      </p>

                      {/* Seller Info (if populated) */}
                      {listing.userRef && (
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
                          <p>
                            By:{" "}
                            <span className="font-semibold">
                              {listing.userRef.firstName}{" "}
                              {listing.userRef.lastName}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View All Button */}
            {!loading && listings.length > 0 && (
              <div className="mt-12 flex justify-center">
                {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                  Load More Listings
                </button>*/}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
