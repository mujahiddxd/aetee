import { NextResponse } from 'next/server';
import { queue } from '@/lib/queue';
import { checkRateLimit } from '@/lib/rateLimitMemory';

/**
 * POST /api/queue/join
 * Called when a user lands on the queue page. Assigns them a session and enqueues.
 */
export async function POST(req) {
  const limited = checkRateLimit(req, 'queue_join', { max: 20, windowMs: 60000 });
  if (limited) return limited;

  try {
    if (!queue.enabled) {
      // Queue is off — admit immediately with a bypass signal
      return NextResponse.json({ bypassed: true });
    }

    const body = await req.json().catch(() => ({}));
    // Try body first, then fallback to queue_session cookie
    const existingSessionId = body.sessionId || req.cookies.get('queue_session')?.value || null;

    const result = queue.enqueue(existingSessionId);

    const response = NextResponse.json(result);

    // Always set a session cookie so users don't lose their place if they reload
    response.cookies.set('queue_session', result.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    // If admitted, set the secure token cookie
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
