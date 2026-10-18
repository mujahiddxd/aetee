import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimitMemory';
import { getDrivingDistanceKm } from '@/lib/driving-distance';

export async function POST(req) {
  const limited = checkRateLimit(req, 'distance', { max: 30, windowMs: 60000 });
  if (limited) return limited;

  try {
    const body = await req.json();
    const lat = typeof body.lat === 'number' ? body.lat : NaN;
    const lng = typeof body.lng === 'number' ? body.lng : NaN;
    const address = typeof body.address === 'string' ? body.address.slice(0, 300) : '';

    const result = await getDrivingDistanceKm({ lat, lng, address });
    if (!result.ok) {
      console.error('Distance API error:', result.error, result.detail);
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true, distanceKm: result.km });
  } catch (err) {
    console.error('Distance API exception:', err);
    return NextResponse.json({ success: false, error: 'Could not calculate distance' }, { status: 500 });
  }
}
