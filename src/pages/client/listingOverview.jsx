import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ListingOverviewPage() {
  const { listingId } = useParams(); // listingId from route
  const [listing, setListing] = useState();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/listings/${listingId}`);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };
    fetchListing();
  }, [listingId]);

  if (!listing) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
      <p className="text-gray-500 text-sm">Posted {listing.postedAgo}</p>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left - Images */}
        <div>
          <img
            src={listing.image?.[0]}
            alt={listing.title}
            className="w-full rounded-lg shadow"
          />
          <div className="flex gap-2 mt-3">
            {listing.image?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                className="w-16 h-16 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="space-y-4">
          <p className="text-3xl font-bold text-green-600">
            {listing.currency}{" "}
            {listing.price
              ? listing.price.toLocaleString()
              : "Contact for Price"}
          </p>
          {/* Contact / Share */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
              WhatsApp Message
            </button>
            <button className="px-4 py-2 border rounded-lg">
              Report Listing
            </button>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Details</h3>
            <ul className="text-gray-700 space-y-1">
              <li>
                <strong>Category:</strong> {listing.category}
              </li>
              <li>
                <strong>Country:</strong> {listing.country}
              </li>
              <li>
                <strong>Badge:</strong> {listing.badge || "None"}
              </li>
              <li>
                <strong>Featured:</strong> {listing.featured ? "Yes" : "No"}
              </li>
              <li>
                <strong>Urgent:</strong> {listing.urgent ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t pt-4 text-center">
        <p className="text-sm text-gray-500">
          Share:{" "}
          <a href="#" className="text-blue-600">
            Facebook
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-600">
            Twitter
          </a>{" "}
          |{" "}
          <a href="#" className="text-blue-600">
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
