import { NextResponse } from 'next/server';
import { queue } from '@/lib/queue';

/**
 * GET /api/queue/validate
 * Checks whether the queue is enabled and if the caller has a valid token.
 *
 * Token is read from:
 *  1. ?token= query param (used by middleware internal calls)
 *  2. queue_token cookie (used by browser QueueGuard)
 */
export async function GET(req) {
  // If queue is not enabled, everything is valid
  if (!queue.enabled) {
    return NextResponse.json({ enabled: false, valid: true });
  }

  // Try query param first, then cookie
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token')
    || req.cookies.get('queue_token')?.value
    || '';

  const valid = queue.validateToken(token);
  return NextResponse.json({ enabled: true, valid });
}
