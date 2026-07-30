import { NextResponse } from 'next/server';
import { queue } from '@/lib/queue';

/**
 * GET /api/queue/status?sessionId=xxx
 * Polled by the queue page every few seconds.
 * Returns current position & whether the user has been admitted.
 */
export async function GET(req) {
  try {
    if (!queue.enabled) {
      return NextResponse.json({ bypassed: true, admitted: true });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    const result = queue.checkStatus(sessionId);

    const response = NextResponse.json(result);

    // If just admitted, set the cookie so middleware lets them through
    if (result.admitted && result.token) {
      response.cookies.set('queue_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: queue.tokenTTL / 1000,
      });
    }

    return response;
  } catch (error) {
    console.error('Queue status error:', error);
    return NextResponse.json({ error: 'Failed to check queue status' }, { status: 500 });
  }
}
