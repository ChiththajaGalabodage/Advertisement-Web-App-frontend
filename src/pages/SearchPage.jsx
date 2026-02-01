import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/header";
import Footer from "../components/footer";
import ListingCard from "../components/Card";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = {
        ...(query && { q: query }),
        ...(category && { category }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      };

      // Try keyword search first
      if (query) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/listings/search/${query}`,
          { params },
        );
        setListings(
          Array.isArray(response.data)
            ? response.data
            : response.data.listings || [],
        );
      } else {
        // If no query, fetch all and filter
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/listings`,
        );
        let results = Array.isArray(response.data)
          ? response.data
          : response.data.listings || [];

        // Apply filters
        if (category) {
          results = results.filter(
            (listing) =>
              listing.category?.toLowerCase() === category.toLowerCase(),
          );
        }
        if (minPrice) {
          results = results.filter(
            (listing) => listing.price >= parseInt(minPrice),
          );
        }
        if (maxPrice) {
          results = results.filter(
            (listing) => listing.price <= parseInt(maxPrice),
          );
        }

        setListings(results);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results");
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query || category || minPrice || maxPrice) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, minPrice, maxPrice]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      const params = new URLSearchParams();
      params.set("q", searchInput.trim());
      if (category) params.set("category", category);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      navigate(`?${params.toString()}`);
    }
  }

  function updateFilter(filterName, value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterName, value);
    } else {
      params.delete(filterName);
    }
    navigate(`?${params.toString()}`);
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex-1 w-full py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8 ">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search listings by title, description, category..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <select
                value={category}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Categories</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Mobile Phone">Mobile Phone</option>
                <option value="Business & Industry">Business & Industry</option>
                <option value="Hobbies">Hobbies, Sports & Kids</option>
                <option value="Property">Property</option>
                <option value="Women Fashion">Women Fashion & Beauty</option>
                <option value="Men Fashion">Men's Fashion & Grooming</option>
                <option value="Essentials">Essentials</option>
                <option value="Education">Education</option>
              </select>

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
                  navigate("/search");
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
              >
                Clear Filters
              </button>
            </div>
          </form>

          {/* Results Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
            {query && (
              <p className="text-gray-600">
                Found {listings.length} result(s) for "<strong>{query}</strong>"
              </p>
            )}
            {category && (
              <p className="text-gray-600">
                Category: <strong>{category}</strong>
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading results...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {/* No Results */}
          {!loading &&
            !error &&
            listings.length === 0 &&
            (query || category) && (
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
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse all listings
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Browse All Listings
                </button>
              </div>
            )}

          {/* Empty State */}
          {!loading &&
            !error &&
            listings.length === 0 &&
            !query &&
            !category && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Enter search terms or select filters to find listings
                </p>
              </div>
            )}

          {/* Results Grid */}
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

          {/* Results Count */}
          {!loading && listings.length > 0 && (
            <div className="mt-8 text-center text-gray-600">
              <p>
                Showing {listings.length} listing
                {listings.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
