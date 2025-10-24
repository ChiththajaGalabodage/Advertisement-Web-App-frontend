import { Link } from "react-router-dom";

// 1. Define your category data
// We use an array of objects to hold the name, icon, and count
// I've used emojis as placeholders for your icons. You can replace them.
const categories = [
  { name: "Vehicles", icon: "🚗", count: 217 },
  { name: "Home & Living", icon: "🏠", count: 131 },
  { name: "Mobile Phone", icon: "📱", count: 108 },
  { name: "Business & Industry", icon: "🏭", count: 101 },
  { name: "Hobbies, Sports & Kids", icon: "🏀", count: 91 },
  { name: "Property", icon: "🏢", count: 0 },
  { name: "Women Fashion & Beauty", icon: "👗", count: 0 },
  { name: "Men's Fashion & Grooming", icon: "👔", count: 0 },
  { name: "Essentials", icon: "🛒", count: 0 },
  { name: "Education", icon: "🎓", count: 0 },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">All Categories</h2>

        {/* This grid shows 2 columns on mobile, 3 on small screens, 
          and 5 on medium-and-up screens, just like your design.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            // 2. Each category is a Link to the dynamic category page
            <Link
              key={category.name}
              to={`/category/${category.name}`} // This creates the link (e.g., "/category/Vehicles")
              className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-200 transition-all"
            >
              {/* 3. Icon (replace emoji with your <img /> or icon component) */}
              <div className="text-4xl mb-3">{category.icon}</div>

              {/* 4. Category Name */}
              <span className="font-bold text-center">{category.name}</span>

              {/* 5. Listing Count */}
              <span className="text-sm text-gray-600">
                {category.count} Listings
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
