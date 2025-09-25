import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import FeaturedListing from "../components/featuredLisiting";

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

  const featuredListings = [
    {
      title: "TVS Apache RTR 160CC Motor Cycle",
      price: "₹4983",
      location: "Canada",
      category: "Vehicles",
      image:
        "https://www.tvsmotor.com/-/media/feature/tvs/product/apachertr160/new/apache-rtr-160-4v.png",
      urgent: true,
    },
    {
      title: "Chevrolet Equinox (2022) used78",
      price: "₹466",
      location: "United Kingdom",
      category: "Vehicles",
      image: "https://images.unsplash.com/photo-1616788576496-80b9a2f5c2d7",
      urgent: true,
    },
    {
      title: "Acura RDX for sale6",
      price: "₹3887",
      location: "Andorra",
      category: "Vehicles",
      image: "https://images.unsplash.com/photo-1608222355155-cf58d2b204d4",
      urgent: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Categories */}
      <section className="py-12 px-6">
        <h3 className="text-xl font-bold mb-6 text-center">All Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-4 bg-gray-100 rounded-xl shadow hover:shadow-lg text-center"
            >
              <div className="text-3xl">{cat.icon}</div>
              <h4 className="font-semibold">{cat.name}</h4>
              <p className="text-sm text-gray-500">{cat.count} Listings</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12 px-6 bg-gray-200 w-screen">
        <h3 className="text-xl font-bold mb-6 text-center">Featured Listing</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {listings.map((featuredListings) => {
            return (
              <FeaturedListing
                key={featuredListings.title}
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
