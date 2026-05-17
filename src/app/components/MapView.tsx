import { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import { Navigation } from "lucide-react";
import { calculateRoute } from "../utils/routing";

interface MapViewProps {
  markers?: Array<{ lat: number; lng: number; label: string; type: 'stop' | 'vehicle' | 'user' }>;
  route?: Array<{ lat: number; lng: number }>;
  className?: string;
}

// Función para crear iconos personalizados
function createCustomIcon(type: 'stop' | 'vehicle' | 'user'): L.DivIcon {
  let iconHtml = '';

  if (type === 'user') {
    iconHtml = `
      <div style="
        width: 32px;
        height: 32px;
        background-color: #22C55E;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 3px solid white;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `;
  } else if (type === 'vehicle') {
    iconHtml = `
      <div style="
        width: 36px;
        height: 36px;
        background-color: #2563EB;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 3px solid white;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      </style>
    `;
  } else {
    iconHtml = `
      <div style="
        width: 28px;
        height: 28px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: 3px solid #2563EB;
      ">
        <div style="width: 10px; height: 10px; background-color: #2563EB; border-radius: 50%;"></div>
      </div>
    `;
  }

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [type === 'vehicle' ? 36 : type === 'user' ? 32 : 28, type === 'vehicle' ? 36 : type === 'user' ? 32 : 28],
    iconAnchor: [type === 'vehicle' ? 18 : type === 'user' ? 16 : 14, type === 'vehicle' ? 18 : type === 'user' ? 16 : 14],
  });
}

// Función para convertir coordenadas normalizadas (0-1) a coordenadas reales
function convertCoordinates(lat: number, lng: number): [number, number] {
  // Si las coordenadas son valores entre 0 y 1, las convertimos a coordenadas reales
  // Usaremos coordenadas de Guadalajara, Jalisco para la simulación
  const baseLat = 20.6597; // Guadalajara, Jalisco
  const baseLng = -103.3496;
  const scale = 0.08; // Escala para el área de simulación

  // Detectar si son coordenadas normalizadas (0-1) vs coordenadas reales
  if (lat >= 0 && lat <= 1 && lng >= -1 && lng <= 1) {
    return [
      baseLat + (lat - 0.5) * scale,
      baseLng + (lng - 0.5) * scale
    ];
  }

  // Ya son coordenadas reales, devolverlas tal cual
  return [lat, lng];
}

export function MapView({ markers = [], route = [], className = "" }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const [calculatedRoute, setCalculatedRoute] = useState<Array<{ lat: number; lng: number }>>([]);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const lastRouteKeyRef = useRef<string>('');

  // Crear claves únicas para evitar recalcular con los mismos datos
  const routeKey = useMemo(() => {
    return JSON.stringify(route.map(r => `${r.lat},${r.lng}`));
  }, [route]);

  const markersKey = useMemo(() => {
    return JSON.stringify(markers.map(m => `${m.lat},${m.lng},${m.type}`));
  }, [markers]);

  const calculatedRouteKey = useMemo(() => {
    return JSON.stringify(calculatedRoute.map(r => `${r.lat.toFixed(6)},${r.lng.toFixed(6)}`));
  }, [calculatedRoute]);

  // Calcular ruta real cuando cambien los puntos
  useEffect(() => {
    // Si la ruta no ha cambiado, no hacer nada
    if (routeKey === lastRouteKeyRef.current) {
      return;
    }

    if (route.length < 2) {
      setCalculatedRoute([]);
      setIsCalculatingRoute(false);
      lastRouteKeyRef.current = routeKey;
      return;
    }

    const fetchRoute = async () => {
      setIsCalculatingRoute(true);
      try {
        // Convertir coordenadas si es necesario
        const routePoints = route.map(r => {
          const [lat, lng] = convertCoordinates(r.lat, r.lng);
          return { lat, lng };
        });

        // Calcular ruta real siguiendo las calles
        const realRoute = await calculateRoute(routePoints, 'car');
        setCalculatedRoute(realRoute);
        lastRouteKeyRef.current = routeKey;
      } catch (error) {
        console.error('Error al calcular ruta:', error);
        setCalculatedRoute([]);
        lastRouteKeyRef.current = routeKey;
      } finally {
        setIsCalculatingRoute(false);
      }
    };

    fetchRoute();
  }, [routeKey, route]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Convertir todas las coordenadas
    const convertedMarkers = markers.map(m => ({
      ...m,
      position: convertCoordinates(m.lat, m.lng)
    }));

    const convertedRoute = route.map(r => convertCoordinates(r.lat, r.lng));

    // Centro del mapa - usar primer marcador o ubicación por defecto (Guadalajara)
    const center: [number, number] = convertedMarkers.length > 0
      ? convertedMarkers[0].position
      : [20.6597, -103.3496];

    // Crear el mapa
    const map = L.map(mapRef.current, {
      center: center,
      zoom: 13,
      zoomControl: true,
      preferCanvas: true, // Mejor rendimiento
      scrollWheelZoom: true,
    });

    // Agregar tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 3,
    }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    // Forzar re-render del mapa después de un momento para asegurar que se muestre completo
    const invalidateTimer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Segundo intento después de que los tiles se hayan cargado
    const secondTimer = setTimeout(() => {
      map.invalidateSize();
    }, 500);

    // Observer para detectar cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      if (map) {
        map.invalidateSize();
      }
    });

    if (mapRef.current) {
      resizeObserver.observe(mapRef.current);
    }

    // Limpiar al desmontar
    return () => {
      clearTimeout(invalidateTimer);
      clearTimeout(secondTimer);
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;

    // Limpiar marcadores y rutas anteriores
    markersLayer.clearLayers();
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    // Convertir coordenadas de marcadores
    const convertedMarkers = markers.map(m => ({
      ...m,
      position: convertCoordinates(m.lat, m.lng)
    }));

    // Usar la ruta calculada si está disponible, sino usar ruta directa
    const routeToDisplay = calculatedRoute.length > 0
      ? calculatedRoute.map(p => [p.lat, p.lng] as [number, number])
      : route.map(r => convertCoordinates(r.lat, r.lng));

    // Agregar ruta
    if (routeToDisplay.length > 1) {
      // Línea de fondo (más gruesa, color más claro)
      L.polyline(routeToDisplay, {
        color: '#93C5FD',
        weight: 8,
        opacity: 0.6,
        smoothFactor: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      // Línea principal (más fina, color principal)
      const routeLine = L.polyline(routeToDisplay, {
        color: '#2563EB',
        weight: 4,
        opacity: 0.9,
        smoothFactor: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      routeLayerRef.current = routeLine;
    }

    // Agregar marcadores
    convertedMarkers.forEach((marker) => {
      L.marker(marker.position, {
        icon: createCustomIcon(marker.type)
      }).addTo(markersLayer);
    });

    // Ajustar bounds
    const allPoints = [...convertedMarkers.map(m => m.position), ...routeToDisplay];
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markersKey, routeKey, calculatedRouteKey, markers, route, calculatedRoute]);

  return (
    <div className={`rounded-lg overflow-hidden relative bg-gray-200 ${className}`} style={{ minHeight: '600px' }}>
      <div
        ref={mapRef}
        className="w-full h-full absolute inset-0"
        style={{ minHeight: '600px' }}
      />

      {/* Indicador de cálculo de ruta */}
      {isCalculatingRoute && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-[1000]">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-700">Calculando ruta...</span>
        </div>
      )}

      {/* Botón de ubicación actual (decorativo por ahora) */}
      <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 z-[1000]">
        <Navigation className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}
