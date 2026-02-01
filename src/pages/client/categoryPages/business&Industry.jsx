import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import ListingCard from "../../../components/Card";

export default function BusinessIndustry() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/listings`,
      );
      let results = Array.isArray(response.data)
        ? response.data
        : response.data.listings || [];
      results = results.filter(
        (listing) => listing.category?.toLowerCase() === "business & industry",
      );
      if (minPrice)
        results = results.filter(
          (listing) => listing.price >= parseInt(minPrice),
        );
      if (maxPrice)
        results = results.filter(
          (listing) => listing.price <= parseInt(maxPrice),
        );
      setListings(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch listings");
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput.trim()}&category=Business & Industry`);
    }
  }

  function updateFilter(filterName, value) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(filterName, value);
    else params.delete(filterName);
    setSearchParams(params);
  }

  return (
    <>
      <Header />
      <section className="py-12 px-6  w-screen  bg-gray-50">
        <div className="flex-1 w-full py-8 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Business & Industry..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Search
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => updateFilter("minPrice", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearchParams({});
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
                >
                  Clear Filters
                </button>
              </div>
            </form>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Business & Industry
              </h2>
              <p className="text-gray-600">
                Found {listings.length} listing(s)
              </p>
            </div>
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading listings...</p>
                </div>
              </div>
            )}
            {error && !loading && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && listings.length === 0 && (
              <div className="text-center py-12">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No listings found
                </h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => setSearchParams({})}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
            {!loading && listings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    size="medium"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
