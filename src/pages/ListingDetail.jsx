import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchListingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch listing details
  async function fetchListingDetails() {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + `/api/listings/${id}`,
      );

      const listingData = response.data.listing || response.data;
      setListing(listingData);

      // Check if current user is the owner
      if (token) {
        try {
          const parts = token.split(".");
          if (parts.length === 3) {
            const decoded = JSON.parse(atob(parts[1]));
            const currentUserId = decoded.id || decoded.user?.id;
            if (
              currentUserId &&
              listingData.userRef &&
              currentUserId === listingData.userRef._id
            ) {
              setIsOwner(true);
            }
          }
        } catch (err) {
          console.error("Error decoding token:", err);
        }
      }

      console.log("Fetched listing:", listingData);
    } catch (err) {
      console.error("Error fetching listing:", err);
      if (err.response?.status === 404) {
        setError("Listing not found");
      } else {
        setError("Failed to load listing details");
      }
      toast.error("Failed to load listing");
    } finally {
      setLoading(false);
    }
  }

  // Handle image carousel navigation
  function nextImage() {
    if (listing?.image && listing.image.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.image.length);
    }
  }

  function prevImage() {
    if (listing?.image && listing.image.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + listing.image.length) % listing.image.length,
      );
    }
  }

  // Handle delete listing
  async function handleDeleteListing() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/api/listings/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Listing deleted successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error deleting listing:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete listing");
      }
    } finally {
      setDeleting(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading listing...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! {error || "Listing not found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const hasImages = listing.image && listing.image.length > 0;
  const currentImage = hasImages ? listing.image[currentImageIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="flex flex-col">
              {/* Main Image */}
              <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-24 h-24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Image Navigation */}
                {hasImages && listing.image.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {hasImages && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {listing.image.length}
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {hasImages && listing.image.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {listing.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        index === currentImageIndex
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              {/* Header */}
              <div>
                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {listing.title}
                </h1>

                {/* Badges */}
                <div className="flex gap-2 mb-6">
                  {listing.urgent && (
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      URGENT
                    </span>
                  )}
                  {listing.badge && (
                    <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      {listing.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Price</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ₨ {listing.price?.toLocaleString()}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-800">
                      {listing.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-800">
                      {listing.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Currency</p>
                    <p className="font-semibold text-gray-800">
                      {listing.currency || "LKR"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posted</p>
                    <p className="font-semibold text-gray-800">
                      {listing.postedAgo || "Recently"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {listing.description}
                  </p>
                </div>

                {/* Seller Info */}
                {listing.userRef && (
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Seller</p>
                    <div className="flex items-center gap-3">
                      {listing.userRef.img && (
                        <img
                          src={listing.userRef.img}
                          alt={listing.userRef.firstName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {listing.userRef.firstName} {listing.userRef.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {listing.userRef.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isOwner ? (
                  <>
                    <Link
                      to={`/edit-listing/${id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                    >
                      Edit Listing
                    </Link>
                    <button
                      onClick={handleDeleteListing}
                      disabled={deleting}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                      {deleting ? "Deleting..." : "Delete Listing"}
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Contact Seller
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Related Info */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {listing.image?.length || 0}
                </p>
                <p className="text-sm text-gray-600">Images</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Posted Date</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  ID: {listing.listingId}
                </p>
                <p className="text-sm text-gray-600">Listing ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
