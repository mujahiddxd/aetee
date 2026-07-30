import { NextResponse } from 'next/server';
import { queue } from '@/lib/queue';

/**
 * GET /api/queue/validate?token=xxx
 * Used internally by middleware (Edge Runtime) to check if a queue token is valid.
 * Also reports whether queue mode is even enabled.
 *
 * This exists because middleware runs in Edge Runtime and cannot access
 * Node.js in-memory state directly. The fetch to this route adds ~1-2ms latency.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || '';

  // If queue is not enabled, everything is valid
  if (!queue.enabled) {
    return NextResponse.json({ enabled: false, valid: true });
  }

  const valid = queue.validateToken(token);
  return NextResponse.json({ enabled: true, valid });
}
