// Server-side driving distance using the Google Routes API (replaces the legacy Distance Matrix API).
// Requires "Routes API" enabled on the Google Cloud project.
// Use a SERVER key (no HTTP-referrer restriction; restrict by API + IP instead) in GOOGLE_MAPS_SERVER_KEY.

export const SHOP_ADDRESS = "NDR 9, B-703 Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089";

/**
 * @param {{ address?: string, lat?: number, lng?: number }} dest
 * @returns {Promise<{ ok: true, km: number } | { ok: false, error: string, detail?: any }>}
 */
export async function getDrivingDistanceKm(dest) {
  const key = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return { ok: false, error: 'Missing Google Maps API key in environment' };

  let destWaypoint;
  if (Number.isFinite(dest.lat) && Number.isFinite(dest.lng)) {
    destWaypoint = { location: { latLng: { latitude: dest.lat, longitude: dest.lng } } };
  } else if (dest.address) {
    destWaypoint = { address: dest.address };
  } else {
    return { ok: false, error: 'No destination provided' };
  }

  const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'routes.distanceMeters',
    },
    body: JSON.stringify({
      origin: { address: SHOP_ADDRESS },
      destination: destWaypoint,
      travelMode: 'DRIVE',
      regionCode: 'IN',
      units: 'METRIC',
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: 'Routes API error', detail: data?.error || data };
  }
  const meters = data?.routes?.[0]?.distanceMeters;
  if (meters === undefined) {
    // distanceMeters is omitted when 0; no routes means no driving route found
    if (data?.routes?.length) return { ok: true, km: 0 };
    return { ok: false, error: 'No driving route found', detail: data };
  }
  return { ok: true, km: meters / 1000 };
}
