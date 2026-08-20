import { prisma } from '@/lib/prisma';

/**
 * Blocked delivery dates — shared helpers.
 *
 * Dates travel through the app as plain 'YYYY-MM-DD' strings (derived from IST
 * via src/lib/ist-time.js) and are stored as UTC-midnight DATE values, exactly
 * matching how Order.deliveryDate is written in the checkout route.
 */

const DATE_STRING_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Is this a well-formed, real 'YYYY-MM-DD' calendar date? */
export function isValidDateString(value) {
  if (typeof value !== 'string' || !DATE_STRING_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  // Rejects things like '2026-02-31', which Date silently rolls over
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().split('T')[0] === value;
}

/** 'YYYY-MM-DD' (or an ISO datetime) → Date at UTC midnight. */
export function toUtcDate(value) {
  const dateStr = typeof value === 'string'
    ? value.split('T')[0]
    : new Date(value).toISOString().split('T')[0];
  return new Date(`${dateStr}T00:00:00.000Z`);
}

/** Date | 'YYYY-MM-DD...' → 'YYYY-MM-DD'. */
export function toDateString(value) {
  return value instanceof Date
    ? value.toISOString().split('T')[0]
    : String(value).split('T')[0];
}

/**
 * Has the admin disabled deliveries on this date?
 *
 * @param {string} dateStr — 'YYYY-MM-DD'
 * @param {object} [client] — prisma client, or a transaction client for
 *                            race-safe checks inside $transaction
 */
export async function isDateBlocked(dateStr, client = prisma) {
  if (!isValidDateString(dateStr)) return false;
  const hit = await client.blockedDate.findUnique({
    where: { date: toUtcDate(dateStr) },
    select: { id: true },
  });
  return Boolean(hit);
}

/**
 * All blocked dates in [startDate, endDate) as 'YYYY-MM-DD' strings.
 */
export async function getBlockedDatesInRange(startDate, endDate) {
  const rows = await prisma.blockedDate.findMany({
    where: { date: { gte: startDate, lt: endDate } },
    select: { date: true },
    orderBy: { date: 'asc' },
  });
  return rows.map(r => toDateString(r.date));
}
