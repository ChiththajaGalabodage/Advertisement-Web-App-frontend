import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

// Import icons for a nicer UI
import { FaTag, FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ListingOverviewPage() {
  const { listingId } = useParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [listing, setListing] = useState(null); // Changed to singular 'listing'

  useEffect(() => {
    // Set status to loading every time the ID changes
    setStatus("loading");
    setListing(null);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/listings/" + listingId)
      .then((response) => {
        console.log("Fetched listing:", response.data);
        setListing(response.data); // Set singular listing
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
        toast.error("Failed to fetch listing details");
      });
  }, [listingId]); // CRITICAL: Add listingId as a dependency

  // --- Loading State ---
  if (status === "loading") {
    return <Loading />;
  }

  // --- Error State ---
  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        <p>Failed to load listing. Please try again later.</p>
      </div>
    );
  }

  // --- Success State ---
  // Only render if status is success AND we have a listing
  return (
    status === "success" &&
    listing && (
      // Main container: responsive, adds padding, and a gap
      <main className="w-full min-h-screen flex flex-col md:flex-row p-6 md:p-10 gap-8 bg-gray-50">
        {/* === Left Side: Image Slider === */}
        <div className="w-full md:w-1/2 flex justify-center items-start">
          {/* Container to give slider a max width and nice styling */}
          <div className="w-full max-w-2xl rounded-lg shadow-lg overflow-hidden sticky top-10">
            <ImageSlider images={listing.image} />
          </div>
        </div>

        {/* === Right Side: Details === */}
        <div className="w-full md:w-1/2 h-full">
          {/* --- Box 1: Listing Details --- */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {listing.title}
            </h1>

            <p className="text-3xl text-blue-600 font-semibold mb-4">
              ${listing.price.toLocaleString()}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <FaTag className="text-gray-500" />
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded capitalize">
                {listing.category}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* --- Box 2: Seller Details --- */}
          {/* Only show this box if the seller (userRef) data exists */}
          {listing.userRef && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-center border-b pb-3">
                Seller Information
              </h2>

              <div className="flex flex-col items-center">
                {listing.userRef.profilePicture ? (
                  <img
                    src={listing.userRef.profilePicture}
                    alt={listing.userRef.username}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
                  />
                ) : (
                  // Default avatar icon
                  <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
                )}

                <h3 className="text-xl font-bold">
                  {listing.userRef.username}
                </h3>

                <div className="text-gray-600 mt-4 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaEnvelope />
                    <span>{listing.userRef.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone />
                    <span>{listing.userRef.phoneNumber || "Not provided"}</span>
                  </p>
                </div>

                <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Contact Seller
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    )
  );
}
