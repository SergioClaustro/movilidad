import { Bus, Footprints, Train, Clock, MapPin, ArrowLeft, Play } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MapView } from "../components/MapView";
import { useNavigate, useParams } from "react-router";
import { useMemo } from "react";

export function RouteDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const routeSteps = [
    {
      type: "walk",
      instruction: "Camina hacia la Estación Calle Principal",
      duration: "5 min",
      distance: "0.4 km",
      details: "Dirígete hacia el norte por la Avenida Roble",
    },
    {
      type: "bus",
      instruction: "Toma el Bus 42 hacia el Centro",
      duration: "20 min",
      stops: 8,
      details: "Baja en Plaza Central",
    },
    {
      type: "walk",
      instruction: "Camina hacia tu destino",
      duration: "7 min",
      distance: "0.5 km",
      details: "Dirígete hacia el este por la Avenida del Parque",
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

  // Ruta: Tlaquepaque -> Centro -> Zapopan
  const mapRoute = useMemo(() => [
    { lat: 20.6200, lng: -103.3100 }, // Tlaquepaque Centro
    { lat: 20.6400, lng: -103.3300 }, // Cruce importante
    { lat: 20.6597, lng: -103.3496 }, // Centro Guadalajara
    { lat: 20.6800, lng: -103.3700 }, // Av. Vallarta
    { lat: 20.7000, lng: -103.3900 }, // Zapopan
  ], []);

  const mapMarkers = useMemo(() => [
    { lat: 20.6200, lng: -103.3100, label: "Inicio", type: "user" as const },
    { lat: 20.6400, lng: -103.3300, label: "Calle Principal", type: "stop" as const },
    { lat: 20.6597, lng: -103.3496, label: "Central", type: "stop" as const },
    { lat: 20.7000, lng: -103.3900, label: "Destino", type: "stop" as const },
  ], []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Map Section - 60% */}
          <div className="flex-[6] min-w-0 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/routes")}
                className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-50"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-gray-900">Detalles de la Ruta</h1>
                <p className="text-gray-600">Tiempo total: 32 minutos</p>
              </div>
            </div>
            
            <MapView route={mapRoute} markers={mapMarkers} className="flex-1" />
            
            <button
              onClick={() => navigate(`/tracking/${id}`)}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Iniciar Navegación
            </button>
          </div>

          {/* Steps Panel - 40% */}
          <div className="flex-[4] min-w-0 overflow-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-900">Paso a Paso</h2>
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">32 min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {routeSteps.map((step, index) => {
                  const Icon = getStepIcon(step.type);
                  const isLast = index === routeSteps.length - 1;

                  return (
                    <div key={index} className="relative">
                      <div className="flex gap-4">
                        {/* Icon and Line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.type === "walk" 
                              ? "bg-gray-100 text-gray-600" 
                              : "bg-blue-100 text-primary"
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          {!isLast && (
                            <div className="w-0.5 h-full min-h-[60px] bg-gray-200 my-2"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="font-medium text-gray-900 mb-2">
                              {step.instruction}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {step.duration}
                              </span>
                              {step.distance && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {step.distance}
                                </span>
                              )}
                              {step.stops && (
                                <span>{step.stops} paradas</span>
                              )}
                            </div>

                            <div className="text-sm text-gray-500">
                              {step.details}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-gray-900 mb-3">Resumen del Viaje</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600 mb-1">Tiempo Total</div>
                    <div className="font-semibold text-gray-900">32 minutos</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600 mb-1">Distancia</div>
                    <div className="font-semibold text-gray-900">5.2 km</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600 mb-1">Transbordos</div>
                    <div className="font-semibold text-gray-900">1 transbordo</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600 mb-1">Costo</div>
                    <div className="font-semibold text-gray-900">$2.50</div>
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
