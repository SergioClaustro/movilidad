import { Search, User } from "lucide-react";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div 
            onClick={() => navigate("/search")}
            className="relative cursor-pointer"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="¿A dónde vas?"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              onFocus={(e) => {
                e.preventDefault();
                e.target.blur();
                navigate("/search");
              }}
            />
          </div>
        </div>

        {/* User Icon */}
        <button 
          onClick={() => navigate("/profile")}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </nav>
  );
}