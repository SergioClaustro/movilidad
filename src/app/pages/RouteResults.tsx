import { Bus, Train, Footprints, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MapView } from "../components/MapView";
import { OccupancyBadge } from "../components/OccupancyBadge";
import { useNavigate } from "react-router";
import { useMemo } from "react";

export function RouteResults() {
  const navigate = useNavigate();

  const routes = [
    {
      id: 1,
      time: "32 min",
      transfers: 1,
      occupancy: "low" as const,
      steps: [
        { type: "walk", duration: "5 min" },
        { type: "bus", name: "Bus 42", duration: "20 min" },
        { type: "walk", duration: "7 min" },
      ],
    },
    {
      id: 2,
      time: "38 min",
      transfers: 0,
      occupancy: "medium" as const,
      steps: [
        { type: "walk", duration: "8 min" },
        { type: "bus", name: "Bus 18", duration: "30 min" },
      ],
    },
    {
      id: 3,
      time: "28 min",
      transfers: 2,
      occupancy: "high" as const,
      steps: [
        { type: "walk", duration: "3 min" },
        { type: "metro", name: "Metro A", duration: "12 min" },
        { type: "bus", name: "Bus 7", duration: "10 min" },
        { type: "walk", duration: "3 min" },
      ],
    },
  ];

  const getStepIcon = (type: string) => {
    switch (type) {
      case "walk":
        return Footprints;
      case "bus":
        return Bus;
      case "metro":
        return Train;
      default:
        return Bus;
    }
  };

  // Ruta: Tlaquepaque -> Zapopan
  const mapRoute = useMemo(() => [
    { lat: 20.6200, lng: -103.3100 }, // Tlaquepaque
    { lat: 20.6597, lng: -103.3496 }, // Centro
    { lat: 20.7000, lng: -103.3900 }, // Zapopan
  ], []);

  const mapMarkers = useMemo(() => [
    { lat: 20.6200, lng: -103.3100, label: "Inicio", type: "user" as const },
    { lat: 20.7000, lng: -103.3900, label: "Destino", type: "stop" as const },
  ], []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Routes List - 40% */}
          <div className="flex-[4] min-w-0 overflow-auto">
            <div className="mb-6">
              <h1 className="text-gray-900 mb-2">Rutas Disponibles</h1>
              <p className="text-gray-600">Elige la mejor opción para tu viaje</p>
            </div>

            <div className="space-y-4">
              {routes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => navigate(`/route/${route.id}`)}
                  className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-left"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl font-semibold text-primary mb-1">
                        {route.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        {route.transfers} {route.transfers === 1 ? "transbordo" : route.transfers === 0 ? "directo" : "transbordos"}
                      </div>
                    </div>
                    <OccupancyBadge level={route.occupancy} />
                  </div>

                  {/* Steps */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {route.steps.map((step, index) => {
                      const Icon = getStepIcon(step.type);
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                            <Icon className={`w-4 h-4 ${
                              step.type === "walk" ? "text-gray-600" : "text-primary"
                            }`} />
                            <span className="text-sm text-gray-700">
                              {step.type === "walk" ? step.duration : step.name}
                            </span>
                          </div>
                          {index < route.steps.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Total Time */}
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Tiempo total de viaje: {route.time}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Filter Options */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-gray-900 mb-3">Opciones de Filtro</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                  Más rápido
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                  Menos transbordos
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                  Menos lleno
                </button>
              </div>
            </div>
          </div>

          {/* Map Section - 60% */}
          <div className="flex-[6] min-w-0">
            <MapView route={mapRoute} markers={mapMarkers} className="h-full" />
          </div>
        </main>
      </div>
    </div>
  );
}