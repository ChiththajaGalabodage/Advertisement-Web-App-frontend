import { useNavigate } from "react-router-dom";

// Define your category data
const categories = [
  { name: "Vehicles", icon: "🚗", count: 217, route: "/category/vehicles" },
  {
    name: "Home & Living",
    icon: "🏠",
    count: 131,
    route: "/category/home-living",
  },
  {
    name: "Mobile Phone",
    icon: "📱",
    count: 108,
    route: "/category/mobile-phone",
  },
  {
    name: "Business & Industry",
    icon: "🏭",
    count: 101,
    route: "/category/business-industry",
  },
  {
    name: "Hobbies, Sports & Kids",
    icon: "🏀",
    count: 91,
    route: "/category/hobbies",
  },
  { name: "Property", icon: "🏢", count: 0, route: "/category/property" },
  {
    name: "Women Fashion & Beauty",
    icon: "👗",
    count: 0,
    route: "/category/women-fashion",
  },
  {
    name: "Men's Fashion & Grooming",
    icon: "👔",
    count: 0,
    route: "/category/men-fashion",
  },
  { name: "Essentials", icon: "🛠️", count: 0, route: "/category/essentials" },
  { name: "Education", icon: "🎓", count: 0, route: "/category/education" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">All Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.route)}
              className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-200 transition-all cursor-pointer border-none"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <span className="font-bold text-center">{category.name}</span>
              <span className="text-sm text-gray-600">
                {category.count} Listings
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
