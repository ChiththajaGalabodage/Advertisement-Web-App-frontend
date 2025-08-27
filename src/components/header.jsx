import { FaListAlt, FaSearch } from "react-icons/fa";

export default function NavBar() {
  return (
    <header className="w-full bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <FaListAlt className="text-white" />
          <span>Adlisting</span>
        </div>

        <div className="hidden md:flex items-center ml-4 flex-1">
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              placeholder="Search"
              className="w-full outline-none text-gray-800"
            />
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-3">
          <button className="px-3 py-1 rounded-full bg-blue-500/40 hover:bg-blue-500">
            Login
          </button>
          <button className="px-3 py-1 rounded-full bg-white text-blue-700 font-semibold hover:bg-gray-100">
            Post Listing
          </button>
        </nav>
      </div>

      <div className="bg-blue-700/70">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center text-sm gap-4 overflow-x-auto">
          <span className="whitespace-nowrap">All Category</span>
          <span className="opacity-80">•</span>
          <span className="whitespace-nowrap">All Country</span>
          <span className="ml-auto whitespace-nowrap">Pricing Plan</span>
        </div>
      </div>
    </header>
  );
}
