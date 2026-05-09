import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
  markers?: Array<{ lat: number; lng: number; label: string; type: 'stop' | 'vehicle' | 'user' }>;
  route?: Array<{ lat: number; lng: number }>;
  className?: string;
}

export function MapView({ markers = [], route = [], className = "" }: MapViewProps) {
  return (
    <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg relative overflow-hidden ${className}`}>
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Route Line */}
      {route.length > 0 && (
        <svg className="absolute inset-0 w-full h-full">
          <path
            d={`M ${route.map((p, i) => `${p.lng * 100},${p.lat * 100}`).join(' L ')}`}
            fill="none"
            stroke="#2563EB"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Markers */}
      <div className="absolute inset-0">
        {markers.map((marker, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${marker.lng * 100}%`, top: `${marker.lat * 100}%` }}
          >
            {marker.type === 'stop' && (
              <div className="relative">
                <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="absolute top-8 left-1/2 -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
                  {marker.label}
                </span>
              </div>
            )}
            {marker.type === 'vehicle' && (
              <div className="w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center animate-pulse">
                <Navigation className="w-4 h-4 text-white" />
              </div>
            )}
            {marker.type === 'user' && (
              <div className="w-8 h-8 bg-secondary rounded-full shadow-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg flex flex-col">
        <button className="p-2 hover:bg-gray-100 border-b border-gray-200">
          <span className="text-lg">+</span>
        </button>
        <button className="p-2 hover:bg-gray-100">
          <span className="text-lg">−</span>
        </button>
      </div>

      {/* Current Location Button */}
      <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
        <Navigation className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}
