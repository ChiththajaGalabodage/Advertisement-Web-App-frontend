export default function FeaturedListing({ featuredListings }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={featuredListings.image}
        alt={featuredListings.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold truncate">{featuredListings.title}</h4>
        <p className="text-red-500 font-bold">{featuredListings.price}</p>
        <p className="text-sm text-gray-500">
          {featuredListings.location} · {featuredListings.category}
        </p>
        {featuredListings.urgent && (
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
            Urgent
          </span>
        )}
      </div>
    </div>
  );
}
