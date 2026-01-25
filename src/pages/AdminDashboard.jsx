import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState("listings");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchListings();
    fetchUsers();
  }, [token]);

  // Fetch all listings
  async function fetchListings() {
    try {
      setLoadingListings(true);
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/listings",
      );

      const listingsData = response.data.listings || response.data;
      setListings(Array.isArray(listingsData) ? listingsData : []);
      console.log("Fetched listings:", listingsData);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load listings");
    } finally {
      setLoadingListings(false);
    }
  }

  // Fetch all users
  async function fetchUsers() {
    try {
      setLoadingUsers(true);
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/gau",
      );

      const usersData = Array.isArray(response.data)
        ? response.data
        : response.data.users || [];
      setUsers(usersData);
      console.log("Fetched users:", usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }

  // Fetch analytics (available for manual trigger if needed)
  async function _fetchAnalytics() {
    try {
      setLoadingAnalytics(true);
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/analytics",
      );
      setAnalytics(response.data.analytics);
      console.log("Fetched analytics:", response.data.analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoadingAnalytics(false);
    }
  }

  // Delete listing
  async function handleDeleteListing(listingId, listingTitle) {
    // Confirm deletion
    const confirmed = window.confirm(
      `Are you sure you want to delete "${listingTitle}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(listingId);

      const response = await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/api/listings/delete/${listingId}`,
      );

      toast.success("Listing deleted successfully");
      console.log("Delete response:", response.data);

      // Remove from local state
      setListings(listings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.error("Error deleting listing:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete listing");
      }
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage users and listings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "listings"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "users"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Users ({users.length})
          </button>
        </div>

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              All Listings
            </h2>

            {loadingListings ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading listings...</p>
                </div>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No listings found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Listing ID
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Seller
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => (
                      <tr
                        key={listing._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {listing.listingId}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {listing.image && listing.image.length > 0 && (
                              <img
                                src={listing.image[0]}
                                alt={listing.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <span className="font-medium text-gray-800 line-clamp-2">
                              {listing.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {listing.category}
                        </td>
                        <td className="px-4 py-3 font-semibold text-blue-600">
                          ₨ {listing.price?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {listing.userRef?.firstName}{" "}
                          {listing.userRef?.lastName || "Unknown"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              handleDeleteListing(listing._id, listing.title)
                            }
                            disabled={deleting === listing._id}
                            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-semibold transition"
                          >
                            {deleting === listing._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">All Users</h2>

            {loadingUsers ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Joined
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Is Admin
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {user.img && (
                              <img
                                src={user.img}
                                alt={user.firstName}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">
                                {user.firstName} {user.lastName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {user.role || "customer"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              user.isBlocked
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              user.isAdmin
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.isAdmin ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h2>

            {loadingAnalytics ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading analytics...</p>
                </div>
              </div>
            ) : analytics ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800">
                    Total Users
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {analytics.totalUsers}
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">
                    Total Listings
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {analytics.totalListings}
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800">
                    Total Views
                  </h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {analytics.totalViews}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No analytics data available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
