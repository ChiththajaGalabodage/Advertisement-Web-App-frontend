import { useState } from "react";
import { Sun, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavbarWithSearch() {
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("Bulgarian");
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [showCountry, setShowCountry] = useState(false);

  const navigate = useNavigate();

  const currencies = ["INR", "USD", "EUR", "GBP", "JPY"];
  const languages = ["Bulgarian", "English", "Spanish", "French", "German"];
  const countries = ["India", "USA", "UK", "Canada", "Sri Lanka", "Germany"];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-700 text-white"
      } relative w-full`}
    >
      {/* ===== Top Row ===== */}
      <div className="flex justify-between items-center px-6 py-2 border-b border-blue-500">
        {/* Currency */}
        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => setShowCurrency(!showCurrency)}
              className="flex items-center gap-1 cursor-pointer px-2 py-1 bg-white text-black rounded"
            >
              {currency} <span className="text-sm">▼</span>
            </button>
            {showCurrency && (
              <div className="absolute mt-1 left-0 bg-white text-black rounded shadow-md w-24 z-10">
                {currencies.map((cur, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setCurrency(cur);
                      setShowCurrency(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {cur}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setShowLanguage(!showLanguage)}
              className="flex items-center gap-1 cursor-pointer px-2 py-1 bg-white text-black rounded"
            >
              {language} <span className="text-sm">▼</span>
            </button>
            {showLanguage && (
              <div className="absolute mt-1 left-0 bg-white text-black rounded shadow-md w-32 z-10">
                {languages.map((lang, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLanguage(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer"
        >
          <Sun size={20} />
        </button>
      </div>

      {/* ===== Second Row ===== */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">📘 Adlisting</div>
          <button
            onClick={() => setShowCountry(!showCountry)}
            className="bg-black text-white px-3 py-1 rounded-lg cursor-pointer"
          >
            🌍 All Country
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:underline cursor-pointer">
            All Listings
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            Favorite Listing
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            Login
          </a>
          <button
            className="bg-white text-black px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => navigate("/client/addPost", { replace: true })}
          >
            + Post
          </button>
        </div>
      </div>

      {/* Country Selection Modal */}
      {showCountry && (
        <div className="absolute top-24 left-6 bg-white text-black p-4 rounded shadow-lg z-20 w-48">
          <h4 className="font-semibold mb-2">Select Country</h4>
          {countries.map((c, i) => (
            <div
              key={i}
              onClick={() => setShowCountry(false)}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {c}
            </div>
          ))}
        </div>
      )}

      {/* ===== Third Row ===== */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold">830 Active Listings</h2>
      </div>

      {/* ===== Fourth Row (Search) ===== */}
      <div className="pb-6 text-center">
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="🔍 Search Items"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className=" py-2 rounded-lg text-black w-72 bg-white"
          />
          <input
            type="text"
            placeholder="📍 Search Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className=" py-2 rounded-lg text-black w-72 bg-white"
          />
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-1">
            <Search size={18} /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
