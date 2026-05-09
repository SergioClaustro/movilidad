import { Home, Route, Star, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Route, label: "Rutas", path: "/search" },
    { icon: Star, label: "Favoritos", path: "/favorites" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}