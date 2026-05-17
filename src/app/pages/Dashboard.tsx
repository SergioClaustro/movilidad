import { Clock, MapPin } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MapView } from "../components/MapView";
import { OccupancyBadge } from "../components/OccupancyBadge";
import { useNavigate } from "react-router";
import { useMemo } from "react";

export function Dashboard() {
  const navigate = useNavigate();

  const nearestStops = [
    { name: "Estación Calle Principal", distance: "0.2 km", nextBus: "5 min", occupancy: "low" as const },
    { name: "Plaza Central", distance: "0.4 km", nextBus: "8 min", occupancy: "medium" as const },
    { name: "Avenida del Parque", distance: "0.6 km", nextBus: "12 min", occupancy: "high" as const },
  ];

  const nextArrivals = [
    { route: "Bus 42", destination: "Centro", time: "5 min", occupancy: "low" as const },
    { route: "Bus 18", destination: "Aeropuerto", time: "8 min", occupancy: "medium" as const },
    { route: "Metro A", destination: "Estación Norte", time: "10 min", occupancy: "low" as const },
    { route: "Bus 7", destination: "Universidad", time: "12 min", occupancy: "high" as const },
  ];

  const mapMarkers = useMemo(() => [
    { lat: 20.6597, lng: -103.3496, label: "Tú", type: "user" as const },
    { lat: 20.6540, lng: -103.3550, label: "Calle Principal", type: "stop" as const },
    { lat: 20.6650, lng: -103.3420, label: "Central", type: "stop" as const },
    { lat: 20.6720, lng: -103.3580, label: "Parque", type: "stop" as const },
  ], []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Map Section - 70% */}
          <div className="flex-[7] min-w-0">
            <MapView markers={mapMarkers} className="h-full" />
          </div>

          {/* Info Panel - 30% */}
          <div className="flex-[3] min-w-0 overflow-auto space-y-6">
            {/* Nearest Stops */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4 text-gray-900">Paradas Cercanas</h2>
              <div className="space-y-3">
                {nearestStops.map((stop, index) => (
                  <button
                    key={index}
                    onClick={() => navigate("/search")}
                    className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium text-gray-900">{stop.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{stop.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Próximo: {stop.nextBus}</span>
                      </div>
                      <OccupancyBadge level={stop.occupancy} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Arrivals */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4 text-gray-900">Próximas Llegadas</h2>
              <div className="space-y-3">
                {nextArrivals.map((arrival, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-gray-900">{arrival.route}</div>
                        <div className="text-sm text-gray-600">{arrival.destination}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-primary">{arrival.time}</div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <OccupancyBadge level={arrival.occupancy} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="mb-3">Planifica tu Viaje</h3>
              <p className="text-blue-100 text-sm mb-4">
                Obtén sugerencias de rutas en tiempo real basadas en el tráfico y ocupación actual
              </p>
              <button
                onClick={() => navigate("/search")}
                className="w-full bg-white text-primary py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Buscar Rutas
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}