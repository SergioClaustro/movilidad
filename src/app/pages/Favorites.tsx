import { Star, Clock, MapPin, Trash2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router";

export function Favorites() {
  const navigate = useNavigate();

  const favoriteRoutes = [
    { 
      id: 1,
      name: "Casa al Trabajo", 
      route: "Bus 42 → Metro A", 
      time: "32 min",
      from: "Calle Principal 123",
      to: "Plaza de Negocios 456"
    },
    { 
      id: 2,
      name: "Trabajo al Gimnasio", 
      route: "Bus 18", 
      time: "15 min",
      from: "Plaza de Negocios 456",
      to: "Centro Deportivo"
    },
    { 
      id: 3,
      name: "Casa al Aeropuerto", 
      route: "Metro B → Bus 7", 
      time: "45 min",
      from: "Calle Principal 123",
      to: "Aeropuerto Internacional"
    },
  ];

  const favoritePlaces = [
    { name: "Casa", address: "Calle Principal 123", icon: "🏠" },
    { name: "Trabajo", address: "Plaza de Negocios 456", icon: "💼" },
    { name: "Universidad", address: "Campus Universitario", icon: "🎓" },
    { name: "Centro Comercial", address: "Avenida del Parque 789", icon: "🛍️" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-gray-900 mb-2">Favoritos</h1>
              <p className="text-gray-600">Tus rutas y lugares guardados</p>
            </div>

            {/* Favorite Routes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <h2 className="text-gray-900">Rutas Favoritas</h2>
              </div>
              
              <div className="grid gap-4">
                {favoriteRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                          <h3 className="text-gray-900">{route.name}</h3>
                        </div>
                        <div className="ml-8 space-y-2">
                          <div className="text-sm text-gray-600">{route.route}</div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {route.from}
                            </span>
                            <span>→</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {route.to}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{route.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/route/${route.id}`)}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Usar ruta
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-destructive hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors">
                + Agregar Ruta Favorita
              </button>
            </div>

            {/* Favorite Places */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-gray-900">Lugares Guardados</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoritePlaces.map((place, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                          {place.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{place.name}</div>
                          <div className="text-sm text-gray-600 truncate">{place.address}</div>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-destructive transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors">
                + Agregar Lugar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
