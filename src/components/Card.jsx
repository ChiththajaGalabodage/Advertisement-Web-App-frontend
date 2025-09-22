import { MapPin, Tag } from "lucide-react";

export default function ListingCard({ listing }) {
  return (
    <div className="w-72 rounded-xl shadow-lg overflow-hidden border relative bg-white">
      {/* Urgent Badge */}
      {listing.urgent && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
          Urgent
        </div>
      )}

      {/* Image */}
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <p className="text-red-600 font-bold text-lg">
          {listing.currency} {listing.price}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold truncate">{listing.title}</h3>

        {/* Country & Category */}
        <div className="flex items-center text-gray-600 text-xs mt-2 space-x-2">
          <MapPin size={14} /> <span>{listing.country}</span>
        </div>
        <div className="flex items-center text-gray-600 text-xs mt-1 space-x-2">
          <Tag size={14} /> <span>{listing.category}</span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-gray-400 text-xs">
          <span>{listing.postedAgo}</span>
          {listing.featured && (
            <span className="text-yellow-600 font-bold">★ Featured</span>
          )}
        </div>
      </div>
    </div>
  );
}
