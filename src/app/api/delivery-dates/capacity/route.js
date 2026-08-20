import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrSetCache } from '@/lib/cache';
import { getBlockedDatesInRange, toDateString } from '@/lib/blocked-dates';

/**
 * GET /api/delivery-dates/capacity
 *
 * Returns two lists of unavailable delivery dates for the next 62 days:
 *   - fullyBookedDates — at capacity (>= 25 orders)
 *   - blockedDates     — manually disabled by the admin (blocked_dates table)
 *
 * They are kept separate so the DateStrip can show "Full" and "N/A" as
 * distinct states. Results are cached in-memory for 30 seconds; the admin
 * blocked-dates route busts this key on every change so admin edits show
 * up immediately.
 */
export async function GET() {
  try {
    const data = await getOrSetCache('delivery-dates-capacity', 30, async () => {
      const now = new Date();
      // Start from today (UTC midnight) — matches how deliveryDate is stored
      const todayStr = now.toISOString().split('T')[0];
      const startDate = new Date(`${todayStr}T00:00:00.000Z`);

      // 62 days into the future (matches DateStrip range)
      const endDate = new Date(startDate.getTime() + 62 * 24 * 60 * 60 * 1000);

      const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);

      // Group by deliveryDate and count orders that "occupy" a slot,
      // using the same logic as the checkout capacity check:
      //   - PAID orders always count
      //   - PENDING orders created within the last 15 minutes count
      const [results, blockedDates] = await Promise.all([
        prisma.order.groupBy({
          by: ['deliveryDate'],
          where: {
            deliveryDate: {
              gte: startDate,
              lt: endDate,
            },
            OR: [
              { status: 'PAID' },
              { status: 'PENDING', createdAt: { gte: fifteenMinsAgo } },
            ],
          },
          _count: { id: true },
        }),
        getBlockedDatesInRange(startDate, endDate),
      ]);

      // Return only dates that are at capacity (>= 25)
      const fullyBookedDates = results
        .filter(r => r._count.id >= 25)
        .map(r => toDateString(r.deliveryDate));

      return { fullyBookedDates, blockedDates };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching delivery date capacity:', error);
    return NextResponse.json({ fullyBookedDates: [], blockedDates: [] });
  }
}
