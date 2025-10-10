import { Link } from "react-router-dom";

export default function FeaturedListing({ featuredListings }) {
  return (
    <Link
      to={"/overview/" + featuredListings.listingId}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="h-[200px] w-full bg-gray-200 flex justify-center items-center">
        {featuredListings.image && featuredListings.image.length > 0 ? (
          <img
            src={featuredListings.image[0]}
            alt={featuredListings.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

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
    </Link>
  );
}
