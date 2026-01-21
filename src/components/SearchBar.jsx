import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search listings..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 text-gray-400 hover:text-blue-600 transition"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
