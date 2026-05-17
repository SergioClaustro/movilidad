import { Navigation, Clock, Users, ArrowLeft, MapPin } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MapView } from "../components/MapView";
import { OccupancyBadge } from "../components/OccupancyBadge";
import { useNavigate, useParams } from "react-router";
import { useMemo } from "react";

export function RealTimeTracking() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Ruta del bus: Plaza del Sol -> Av. Américas -> Plaza Patria
  const mapRoute = useMemo(() => [
    { lat: 20.6350, lng: -103.3850 }, // Plaza del Sol
    { lat: 20.6450, lng: -103.3750 }, // Av. Américas
    { lat: 20.6597, lng: -103.3496 }, // Centro Guadalajara
    { lat: 20.6750, lng: -103.3250 }, // Av. Patria
    { lat: 20.6850, lng: -103.3150 }, // Plaza Patria
  ], []);

  const mapMarkers = useMemo(() => [
    { lat: 20.6350, lng: -103.3850, label: "Inicio", type: "user" as const },
    { lat: 20.6597, lng: -103.3496, label: "Bus", type: "vehicle" as const },
    { lat: 20.6850, lng: -103.3150, label: "Destino", type: "stop" as const },
  ], []);

  const nextStops = [
    { name: "Plaza Central", time: "2 min", status: "next" },
    { name: "Avenida del Parque", time: "5 min", status: "upcoming" },
    { name: "Calle del Mercado", time: "8 min", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Map Section - 70% */}
          <div className="flex-[7] min-w-0 relative">
            <button
              onClick={() => navigate(`/route/${id}`)}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <MapView route={mapRoute} markers={mapMarkers} className="h-full" />

            {/* Live Update Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="font-medium">Seguimiento en Vivo</span>
            </div>
          </div>

          {/* Info Panel - 30% */}
          <div className="flex-[3] min-w-0 overflow-auto space-y-4">
            {/* Arrival Info Card */}
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-6 h-6" />
                <h2 className="text-white">Bus 42</h2>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-100 text-sm mb-1">Llega en</div>
                <div className="text-5xl font-bold">3 min</div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5" />
                <span>Nivel de Ocupación</span>
              </div>
              <div className="mb-6">
                <OccupancyBadge level="low" />
              </div>

              <button className="w-full bg-white text-primary py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                Seguir Ruta
              </button>
            </div>

            {/* Current Trip Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Viaje Actual</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Destino</span>
                  <span className="font-medium text-gray-900">Estación Centro</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Llegada estimada</span>
                  <span className="font-medium text-gray-900">3:45 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Paradas restantes</span>
                  <span className="font-medium text-gray-900">3 paradas</span>
                </div>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-1/3"></div>
              </div>
            </div>

            {/* Next Stops */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Próximas Paradas</h3>
              
              <div className="space-y-3">
                {nextStops.map((stop, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center justify-between ${
                      stop.status === "next" 
                        ? "bg-blue-50 border-2 border-primary" 
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        stop.status === "next" ? "bg-primary" : "bg-gray-400"
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{stop.name}</div>
                        {stop.status === "next" && (
                          <div className="text-xs text-primary font-medium">Próxima parada</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{stop.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">!</span>
                </div>
                <div>
                  <div className="font-medium text-yellow-900 mb-1">Alerta de Tráfico</div>
                  <div className="text-sm text-yellow-700">
                    Retraso menor esperado debido al tráfico. Estimado +2 minutos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
