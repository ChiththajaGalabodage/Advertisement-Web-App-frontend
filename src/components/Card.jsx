import { MapPin, Tag } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ListingCard - Reusable component for displaying listings
 * Props:
 *   - listing: listing object with _id, title, price, image, etc.
 *   - size: 'small' | 'medium' | 'large' (default: 'medium')
 */
export default function ListingCard({ listing, size = "medium" }) {
  const sizes = {
    small: "w-60",
    medium: "w-72",
    large: "w-full",
  };

  return (
    <Link
      to={`/listing/${listing._id}`}
      className={`${sizes[size]} rounded-xl shadow-lg overflow-hidden border relative bg-white hover:shadow-xl transition-shadow cursor-pointer`}
    >
      {/* Urgent Badge */}
      {listing.urgent && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
          URGENT
        </div>
      )}

      {/* Badge (NEW/HOT/DEAL) */}
      {listing.badge && (
        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
          {listing.badge}
        </div>
      )}

      {/* Image */}
      <div className="w-full h-40 bg-gray-200 overflow-hidden">
        <img
          src={listing.image?.[0] || listing.image}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <p className="text-red-600 font-bold text-lg">
          ₨ {listing.price?.toLocaleString?.() || listing.price}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold truncate">{listing.title}</h3>

        {/* Description Preview */}
        {size === "large" && (
          <p className="text-xs text-gray-600 truncate mt-1">
            {listing.description}
          </p>
        )}

        {/* Location & Category */}
        <div className="flex items-center text-gray-600 text-xs mt-2 space-x-2">
          <MapPin size={14} /> <span>{listing.country}</span>
        </div>
        <div className="flex items-center text-gray-600 text-xs mt-1 space-x-2">
          <Tag size={14} /> <span>{listing.category}</span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-gray-400 text-xs">
          <span>{listing.postedAgo || "Recently"}</span>
          {listing.featured && (
            <span className="text-yellow-600 font-bold">★ Featured</span>
          )}
        </div>
      </div>
    </Link>
  );
}
