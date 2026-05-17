// Servicio de enrutamiento usando OSRM (Open Source Routing Machine)
// API pública gratuita que calcula rutas reales siguiendo las calles

interface RoutePoint {
  lat: number;
  lng: number;
}

interface OSRMResponse {
  code: string;
  routes: Array<{
    geometry: {
      coordinates: Array<[number, number]>;
    };
    distance: number;
    duration: number;
  }>;
}

/**
 * Calcula una ruta real siguiendo las calles entre múltiples puntos
 * @param points Array de puntos [lat, lng] por los que debe pasar la ruta
 * @param profile Tipo de transporte: 'car', 'bike', 'foot' (default: 'car' para buses)
 * @returns Array de coordenadas [lat, lng] que forman la ruta por las calles
 */
export async function calculateRoute(
  points: RoutePoint[],
  profile: 'car' | 'bike' | 'foot' = 'car'
): Promise<RoutePoint[]> {
  if (points.length < 2) {
    return points;
  }

  try {
    // Convertir puntos a formato lng,lat (OSRM usa lng,lat en lugar de lat,lng)
    const coordinates = points
      .map(p => `${p.lng},${p.lat}`)
      .join(';');

    // Llamar a la API pública de OSRM
    const url = `https://router.project-osrm.org/route/v1/${profile}/${coordinates}?overview=full&geometries=geojson`;

    const response = await fetch(url);
    const data: OSRMResponse = await response.json();

    if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
      // OSRM devuelve coordenadas en formato [lng, lat], convertir a [lat, lng]
      const routeCoordinates = data.routes[0].geometry.coordinates.map(
        ([lng, lat]) => ({ lat, lng })
      );

      return routeCoordinates;
    }

    // Si falla, devolver los puntos originales (fallback a línea recta)
    console.warn('No se pudo calcular la ruta, usando línea recta');
    return points;
  } catch (error) {
    console.error('Error calculando ruta:', error);
    // Fallback a los puntos originales si hay error
    return points;
  }
}

/**
 * Calcula rutas para múltiples segmentos de forma eficiente
 */
export async function calculateMultiSegmentRoute(
  waypoints: RoutePoint[],
  profile: 'car' | 'bike' | 'foot' = 'car'
): Promise<RoutePoint[]> {
  // Si hay pocos puntos, calcular toda la ruta de una vez
  if (waypoints.length <= 5) {
    return calculateRoute(waypoints, profile);
  }

  // Para muchos waypoints, dividir en segmentos para mejor rendimiento
  const allRoutePoints: RoutePoint[] = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const segmentRoute = await calculateRoute(
      [waypoints[i], waypoints[i + 1]],
      profile
    );

    // Evitar duplicar el último punto del segmento anterior con el primero del siguiente
    if (i > 0 && allRoutePoints.length > 0) {
      allRoutePoints.push(...segmentRoute.slice(1));
    } else {
      allRoutePoints.push(...segmentRoute);
    }
  }

  return allRoutePoints;
}
