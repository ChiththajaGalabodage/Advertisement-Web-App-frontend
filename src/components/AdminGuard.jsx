import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * AdminGuard Component
 * Protects admin routes by checking JWT token and verifying admin role
 * If user is not authenticated or not an admin, redirects to home page
 */
export default function AdminGuard({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  function checkAdminAccess() {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Manually decode JWT (JWT structure: header.payload.signature)
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.error("Invalid token format");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Decode the payload
      const decoded = JSON.parse(atob(parts[1]));
      console.log("Decoded token:", decoded);

      // Check if user has admin role
      // The role could be stored as 'role' or 'user.role' depending on how it was encoded
      const userRole = decoded.role || decoded.user?.role;

      if (userRole === "admin") {
        console.log("User is admin");
        setIsAdmin(true);
      } else {
        console.log("User role is not admin:", userRole);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }

  // While checking, show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If not admin, redirect to home page
  if (!isAdmin) {
    console.log("Access denied - redirecting to home");
    return <Navigate to="/" replace />;
  }

  // If admin, render the protected component
  return children;
}
