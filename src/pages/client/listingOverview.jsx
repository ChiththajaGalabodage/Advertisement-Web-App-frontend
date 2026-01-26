import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

// Import icons
import { FaTag, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ListingOverviewPage() {
  const { listingId } = useParams();
  const [status, setStatus] = useState("loading");
  const [listing, setListing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStatus("loading");
    setListing(null);

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/listings/" + listingId)
      .then((response) => {
        console.log("✅ Fetched listing:", response.data);
        setListing(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.error("❌ Error fetching listing:", error.message);
        setStatus("error");
        toast.error("Failed to fetch listing details");
      });
  }, [listingId]);

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

  if (status === "loading") return <Loading />;

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        <p>Failed to load listing. Please try again later.</p>
      </div>
    );
  }

  return (
    status === "success" &&
    listing && (
      <main className="w-full min-h-screen flex flex-col md:flex-row p-6 md:p-10 gap-8 bg-gray-50">
        {/* === Left Side: Image Slider === */}
        <div className="w-full md:w-1/2 flex justify-center items-start">
          <div className="w-full max-w-2xl rounded-lg shadow-lg overflow-hidden sticky top-10">
            <ImageSlider images={listing.image} />
          </div>
        </div>

        {/* === Right Side: Details === */}
        <div className="w-full md:w-1/2 h-full">
          {/* --- Listing Details --- */}
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

          {/* --- Seller Details (Modified) --- */}
          {listing?.userRef && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-center border-b pb-3">
                Seller Information
              </h2>

              <div className="flex flex-col items-center w-full">
                {/* Seller Name (No Image) */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {listing.userRef.firstName} {listing.userRef.lastName}
                </h3>

                {/* Contact Information */}
                <div className="w-full space-y-3">
                  {/* Email */}
                  {listing.userRef.email && (
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FaEnvelope className="text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium break-all">
                        {listing.userRef.email}
                      </span>
                    </div>
                  )}

                  {/* Phone Number (Included as requested) */}
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                    <div className="bg-green-100 p-2 rounded-full">
                      <FaPhone className="text-green-600" />
                    </div>
                    {listing.userRef.phoneNumber ? (
                      <a
                        href={`tel:${listing.userRef.phoneNumber}`}
                        className="text-gray-800 font-bold hover:text-green-600 transition"
                      >
                        {listing.userRef.phoneNumber}
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">
                        No number provided
                      </span>
                    )}
                  </div>
                </div>

                {/* Send Message Button */}
                <button
                  onClick={handleContact}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md"
                >
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Contact Seller</h3>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
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
