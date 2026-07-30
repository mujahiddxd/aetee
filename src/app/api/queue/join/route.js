import { NextResponse } from 'next/server';
import { queue } from '@/lib/queue';

/**
 * POST /api/queue/join
 * Called when a user lands on the queue page. Assigns them a session and enqueues.
 */
export async function POST(req) {
  try {
    if (!queue.enabled) {
      // Queue is off — admit immediately with a bypass signal
      return NextResponse.json({ bypassed: true });
    }

    const body = await req.json().catch(() => ({}));
    const existingSessionId = body.sessionId || null;

    const result = queue.enqueue(existingSessionId);

    const response = NextResponse.json(result);

    // If admitted immediately, set the cookie
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
    console.error('Queue join error:', error);
    return NextResponse.json({ error: 'Failed to join queue' }, { status: 500 });
  }
}
