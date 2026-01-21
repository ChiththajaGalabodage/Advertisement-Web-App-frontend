import { useState } from "react";
import { Search, Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchItem, setSearchItem] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchItem.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchItem.trim())}`);
      setSearchItem("");
    }
  }

  return (
    <div className="w-full bg-blue-700 text-white shadow-lg">
      {/* Main Header */}
      <div className="px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="text-2xl sm:text-3xl font-bold flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            📘 AdListing
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="w-full bg-amber-50 px-4 py-2 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-black h-full hover:bg-gray-800 text-white px-4 py-2 rounded-r-lg transition flex items-center gap-2"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-yellow-300 transition"
            >
              All Listings
            </button>

            {token ? (
              <>
                <button
                  onClick={() => navigate("/create-listing")}
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  + Post Ad
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-yellow-300 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-yellow-300 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4 ">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg transition"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-blue-800 px-4 py-4 border-t border-blue-600">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                navigate("/");
                setShowMobileMenu(false);
              }}
              className="text-left hover:text-yellow-300 transition py-2"
            >
              All Listings
            </button>

            {token ? (
              <>
                <button
                  onClick={() => {
                    navigate("/create-listing");
                    setShowMobileMenu(false);
                  }}
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition w-full"
                >
                  + Post Ad
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-yellow-300 transition py-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setShowMobileMenu(false);
                  }}
                  className="text-left hover:text-yellow-300 transition py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setShowMobileMenu(false);
                  }}
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition w-full"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
