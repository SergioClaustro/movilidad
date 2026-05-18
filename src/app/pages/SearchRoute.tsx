import { useState } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Home as HomeIcon,
  Briefcase,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router";

export function SearchRoute() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showSuggestions, setShowSuggestions] = useState<
    "origin" | "destination" | null
  >(null);

  const suggestions = [
    { icon: HomeIcon, label: "Casa", address: "Calle Principal 123" },
    { icon: Briefcase, label: "Trabajo", address: "Plaza de Negocios 456" },
    { icon: Clock, label: "Estación Central", address: "Reciente" },
    { icon: MapPin, label: "Campus Universitario", address: "Reciente" },
  ];

  const handleSearch = () => {
    if (origin && destination) {
      navigate("/routes");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="mb-2 text-gray-900">Planifica tu Ruta</h1>
              <p className="text-gray-600 mb-8">
                Ingresa tu origen y destino para encontrar la mejor ruta
              </p>

              <div className="space-y-4">
                {/* Origin Input */}
                <div className="relative">
                  <label className="block mb-2 text-gray-700">Desde</label>
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      onFocus={() => setShowSuggestions("origin")}
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(null), 200)
                      }
                      placeholder="Ubicación actual"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {showSuggestions === "origin" && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      {suggestions.map((suggestion, index) => {
                        const Icon = suggestion.icon;
                        return (
                          <button
                            key={index}
                            className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-left"
                            onClick={() => {
                              setOrigin(suggestion.label);
                              setShowSuggestions(null);
                            }}
                          >
                            <Icon className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {suggestion.label}
                              </div>
                              <div className="text-sm text-gray-500">
                                {suggestion.address}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Destination Input */}
                <div className="relative">
                  <label className="block mb-2 text-gray-700">Hacia</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onFocus={() => setShowSuggestions("destination")}
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(null), 200)
                      }
                      placeholder="¿A dónde vas?"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {showSuggestions === "destination" && (
                    <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      {suggestions.map((suggestion, index) => {
                        const Icon = suggestion.icon;
                        return (
                          <button
                            key={index}
                            className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-left"
                            onClick={() => {
                              setDestination(suggestion.label);
                              setShowSuggestions(null);
                            }}
                          >
                            <Icon className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {suggestion.label}
                              </div>
                              <div className="text-sm text-gray-500">
                                {suggestion.address}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!origin || !destination}
                  className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  Buscar Rutas
                </button>
              </div>

              {/* Quick Tips */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-primary mb-2">💡 Consejos Rápidos</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • Usa tu ubicación actual para sugerencias en tiempo real
                  </li>
                  <li>• Guarda destinos frecuentes para acceder rápidamente</li>
                  <li>
                    • Revisa los niveles de ocupación para evitar vehículos
                    llenos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
  // prueba
}
