import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrSetCache } from '@/lib/cache';

/**
 * GET /api/delivery-dates/capacity
 *
 * Returns a list of fully-booked delivery dates (>= 25 orders) for the
 * next 62 days. The frontend DateStrip uses this to grey out dates that
 * are no longer available.
 *
 * Results are cached in-memory for 30 seconds so repeated page loads
 * don't hit the database.
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
      const results = await prisma.order.groupBy({
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
      });

      // Return only dates that are at capacity (>= 25)
      const fullyBookedDates = results
        .filter(r => r._count.id >= 25)
        .map(r => r.deliveryDate.toISOString().split('T')[0]);

      return { fullyBookedDates };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching delivery date capacity:', error);
    return NextResponse.json({ fullyBookedDates: [] });
  }
}
