import { useState } from "react";

export default function HomePage() {
  const [search, setSearch] = useState("");

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
      {/* Top Navbar */}

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
      <section className="py-12 px-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-6 text-center">Featured Listing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredListings.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold truncate">{item.title}</h4>
                <p className="text-red-500 font-bold">{item.price}</p>
                <p className="text-sm text-gray-500">
                  {item.location} · {item.category}
                </p>
                {item.urgent && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    Urgent
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Cookies */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>We use cookies to provide our services and analytics.</p>
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Allow all Cookies
        </button>
      </footer>
    </div>
  );
}
