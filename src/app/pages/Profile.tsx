import { Star, Clock, Settings, Bell, MapPin, User, ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router";

export function Profile() {
  const navigate = useNavigate();

  const favoriteRoutes = [
    { name: "Casa al Trabajo", route: "Bus 42 → Metro A", frequency: "Diario", time: "32 min" },
    { name: "Trabajo al Gimnasio", route: "Bus 18", frequency: "3x/semana", time: "15 min" },
    { name: "Casa al Aeropuerto", route: "Metro B → Bus 7", frequency: "Mensual", time: "45 min" },
  ];

  const recentTrips = [
    { from: "Casa", to: "Estación Centro", date: "Hoy, 9:00 AM", duration: "32 min" },
    { from: "Plaza Central", to: "Universidad", date: "Ayer, 2:30 PM", duration: "25 min" },
    { from: "Casa", to: "Centro Comercial", date: "18 Mar, 10:15 AM", duration: "40 min" },
  ];

  const preferences = [
    { icon: Bell, label: "Notificaciones", value: "Activadas", description: "Actualizaciones y alertas en tiempo real" },
    { icon: MapPin, label: "Lugares Guardados", value: "5 ubicaciones", description: "Casa, Trabajo y 3 más" },
    { icon: Settings, label: "Configuración", value: "Personalizar", description: "Pantalla y accesibilidad" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-lg shadow-sm p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-white mb-2">Juan Pérez</h1>
                  <p className="text-blue-100 mb-4">juan.perez@email.com</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <div className="text-blue-100">Viajes Totales</div>
                      <div className="text-2xl font-semibold">247</div>
                    </div>
                    <div>
                      <div className="text-blue-100">Este Mes</div>
                      <div className="text-2xl font-semibold">18</div>
                    </div>
                    <div>
                      <div className="text-blue-100">CO₂ Ahorrado</div>
                      <div className="text-2xl font-semibold">142 kg</div>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                  Editar Perfil
                </button>
              </div>
            </div>

            {/* Favorite Routes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <h2 className="text-gray-900">Rutas Favoritas</h2>
              </div>
              
              <div className="space-y-3">
                {favoriteRoutes.map((route, index) => (
                  <button
                    key={index}
                    onClick={() => navigate("/search")}
                    className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{route.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{route.route}</div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {route.time}
                        </span>
                        <span>• {route.frequency}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>

              <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors">
                + Agregar Ruta Favorita
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Trips */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="text-gray-900">Viajes Recientes</h2>
                </div>
                
                <div className="space-y-3">
                  {recentTrips.map((trip, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {trip.from} → {trip.to}
                          </div>
                          <div className="text-sm text-gray-600">{trip.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 ml-7">
                        <Clock className="w-3 h-3" />
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2 text-primary hover:bg-blue-50 rounded-lg transition-colors">
                  Ver Todo el Historial
                </button>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-6 h-6 text-primary" />
                  <h2 className="text-gray-900">Preferencias</h2>
                </div>
                
                <div className="space-y-3">
                  {preferences.map((pref, index) => {
                    const Icon = pref.icon;
                    return (
                      <button
                        key={index}
                        className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left flex items-center gap-4"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{pref.label}</div>
                          <div className="text-sm text-gray-600">{pref.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{pref.value}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-900 mb-4">Cuenta</h3>
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Configuración de Privacidad
                </button>
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Ayuda y Soporte
                </button>
                <button className="flex-1 py-3 bg-gray-100 text-destructive rounded-lg hover:bg-gray-200 transition-colors">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
