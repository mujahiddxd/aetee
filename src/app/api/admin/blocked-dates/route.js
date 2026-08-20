import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyAdminCookie } from '@/lib/auth';
import { invalidateCache } from '@/lib/cache';
import { stripHtml } from '@/lib/sanitize';
import { getISTDateString } from '@/lib/ist-time';
import { isValidDateString, toUtcDate, toDateString } from '@/lib/blocked-dates';

export const dynamic = 'force-dynamic';

// Matches the 62-day window used by DateStrip and the capacity endpoint
const MAX_DATES_PER_REQUEST = 62;

async function requireAdmin() {
  const cookieStore = await cookies();
  if (verifyAdminCookie(cookieStore)) return null;
  return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
}

/**
 * Pull a validated list of 'YYYY-MM-DD' strings out of a request body.
 * Accepts either { dates: [...] } or a single { date: '...' }.
 */
function parseDates(body) {
  const raw = Array.isArray(body?.dates)
    ? body.dates
    : (body?.date ? [body.date] : []);

  if (raw.length === 0) {
    return { error: 'At least one date is required' };
  }
  if (raw.length > MAX_DATES_PER_REQUEST) {
    return { error: `You can change at most ${MAX_DATES_PER_REQUEST} dates at a time` };
  }

  const invalid = raw.filter(d => !isValidDateString(d));
  if (invalid.length > 0) {
    return { error: `Invalid date format: ${invalid.slice(0, 3).join(', ')}. Expected YYYY-MM-DD.` };
  }

  // De-duplicate while preserving order
  return { dates: [...new Set(raw)] };
}

/**
 * GET /api/admin/blocked-dates
 *
 * Query: ?includePast=true to also return dates already in the past.
 * Returns the disabled dates plus, for each, how many orders are already
 * booked on it so the admin can see what they are affecting.
 */
export async function GET(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const includePast = request.nextUrl.searchParams.get('includePast') === 'true';
    const today = toUtcDate(getISTDateString());

    const rows = await prisma.blockedDate.findMany({
      where: includePast ? undefined : { date: { gte: today } },
      orderBy: { date: 'asc' },
    });

    // Count existing orders on each blocked date — blocking is still allowed,
    // but the admin should see that these orders exist.
    const orderCounts = rows.length === 0 ? [] : await prisma.order.groupBy({
      by: ['deliveryDate'],
      where: {
        deliveryDate: { in: rows.map(r => r.date) },
        status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
      },
      _count: { id: true },
    });

    const countByDate = new Map(
      orderCounts.map(c => [toDateString(c.deliveryDate), c._count.id])
    );

    const blockedDates = rows.map(r => {
      const date = toDateString(r.date);
      return {
        id: r.id,
        date,
        reason: r.reason,
        orderCount: countByDate.get(date) || 0,
        createdAt: r.createdAt,
      };
    });

    return NextResponse.json({ blockedDates });
  } catch (error) {
    console.error('Failed to fetch blocked dates:', error);
    return NextResponse.json({ error: 'Failed to fetch blocked dates' }, { status: 500 });
  }
}

/**
 * POST /api/admin/blocked-dates
 * Body: { dates: ['2026-09-01', ...], reason?: 'Closed for Diwali' }
 *
 * Disables delivery on the given dates. Idempotent — re-posting a date that
 * is already blocked is a no-op rather than an error.
 */
export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { dates, error } = parseDates(body);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const todayIST = getISTDateString();
    const pastDates = dates.filter(d => d < todayIST);
    if (pastDates.length > 0) {
      return NextResponse.json(
        { error: 'Cannot disable dates in the past' },
        { status: 400 }
      );
    }

    const reason = body?.reason ? stripHtml(String(body.reason)).slice(0, 255) : null;

    const result = await prisma.blockedDate.createMany({
      data: dates.map(d => ({ date: toUtcDate(d), reason: reason || null })),
      skipDuplicates: true,
    });

    // Storefront reads blocked dates through this cache key
    invalidateCache('delivery-dates-capacity');

    return NextResponse.json({
      success: true,
      blocked: result.count,
      alreadyBlocked: dates.length - result.count,
      dates,
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to block dates:', error);
    return NextResponse.json({ error: 'Failed to disable the selected dates' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/blocked-dates
 * Body: { dates: ['2026-09-01', ...] }
 *
 * Re-enables previously disabled dates.
 */
export async function DELETE(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = await request.json();
    const { dates, error } = parseDates(body);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const result = await prisma.blockedDate.deleteMany({
      where: { date: { in: dates.map(toUtcDate) } },
    });

    invalidateCache('delivery-dates-capacity');

    return NextResponse.json({ success: true, unblocked: result.count, dates });
  } catch (error) {
    console.error('Failed to unblock dates:', error);
    return NextResponse.json({ error: 'Failed to re-enable the selected dates' }, { status: 500 });
  }
}
