import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { queue } from '@/lib/queue';

/**
 * Verify admin token (Node.js runtime version).
 */
function verifyAdmin(cookieStore) {
  const token = cookieStore.get('admin_token');
  if (!token?.value) return false;

  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const expectedToken = crypto
    .createHmac('sha256', secret)
    .update('admin-session')
    .digest('hex');

  return token.value === expectedToken;
}

/**
 * POST /api/queue/admin
 * Admin-only endpoint to control the queue system.
 *
 * Actions:
 *   { action: "enable" }                              — Turn on queue mode
 *   { action: "disable" }                             — Turn off queue mode
 *   { action: "stats" }                               — Get live stats
 *   { action: "configure", maxConcurrent, tokenTTL }  — Adjust settings
 */
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    if (!verifyAdmin(cookieStore)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { action } = body;

    switch (action) {
      case 'enable':
        queue.enable();
        return NextResponse.json({ success: true, message: 'Queue enabled', ...queue.getStats() });

      case 'disable':
        queue.disable();
        return NextResponse.json({ success: true, message: 'Queue disabled', ...queue.getStats() });

      case 'stats':
        return NextResponse.json(queue.getStats());

      case 'configure':
        queue.configure({
          maxConcurrent: body.maxConcurrent,
          tokenTTL: body.tokenTTL,
        });
        return NextResponse.json({ success: true, message: 'Queue configured', ...queue.getStats() });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Queue admin error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
