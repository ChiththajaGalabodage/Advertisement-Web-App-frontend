import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

// Import icons for a nicer UI
import { FaTag, FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";

// For contact modal
import { useSelector } from "react-redux"; // Assuming Redux for auth

export default function ListingOverviewPage() {
  const { listingId } = useParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [listing, setListing] = useState(null); // Changed to singular 'listing'
  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Set status to loading every time the ID changes
    setStatus("loading");
    setListing(null);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/listings/" + listingId)
      .then((response) => {
        console.log("✅ Fetched listing with populated userRef:", response.data);
        setListing(response.data); // Set singular listing
        setStatus("success");
      })
      .catch((error) => {
        console.error("❌ Error fetching listing:", error.message);
        setStatus("error");
        toast.error("Failed to fetch listing details");
      });
  }, [listingId]); // CRITICAL: Add listingId as a dependency

  const handleContact = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to contact the seller");
      return;
    }
    setModalOpen(true);
  };

  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/contacts",
        {
          receiverId: listing?.userRef?._id,
          listingId: listing?._id,
          subject,
          message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Message sent successfully");
      setModalOpen(false);
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
      toast.error("Failed to send message");
    }
  };

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

          {/* --- Box 2: Seller Details --- */}, using optional chaining */}
          {listing?.userRef && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-center border-b pb-3">
                Seller Information
              </h2>

              <div className="flex flex-col items-center">
                {/* Seller Profile Picture */}
                {listing?.userRef?.profilePicture ? (
                  <img
                    src={listing.userRef.profilePicture}
                    alt={listing?.userRef?.firstName}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
                  />
                ) : (
                  <FaUserCircle className="w-24 h-24 text-gray-400 mb-4" />
                )}

                {/* Seller's Full Name */}
                <h3 className="text-xl font-bold text-gray-800">
                  {listing?.userRef?.firstName} {listing?.userRef?.lastName}
                </h3>

                {/* Seller's Contact Information */}
                <div className="text-gray-600 mt-4 space-y-2 w-full">
                  {/* Email */}
                  {listing?.userRef?.email && (
                    <p className="flex items-center gap-2">
                      <FaEnvelope className="text-blue-500 flex-shrink-0" />
                      <span className="break-all">{listing.userRef.email}</span>
                    </p>
                  )}

                  {/* Phone Number with Fallback */}
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-green-500 flex-shrink-0" />
                    <span>
                      {listing?.userRef?.phoneNumber || "Not provided"}
                    </span>
                  </p>
                </div>

                {/* Contact Seller Button */}                </div>

                <button
                  onClick={handleContact}
                  className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Contact Seller</h3>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 h-32"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  );
}
