/**
 * In-Memory Cache Utility
 *
 * A simple in-memory cache with TTL (time-to-live) expiration.
 * Uses globalThis to survive HMR in dev mode.
 *
 * Usage:
 *   const data = await getOrSetCache("products", 60, async () => {
 *     return await prisma.product.findMany();
 *   });
 */

const CACHE_KEY = '__aetee_cache__';

if (!globalThis[CACHE_KEY]) {
  globalThis[CACHE_KEY] = new Map();
}

/** @type {Map<string, { data: any, expiresAt: number }>} */
const cache = globalThis[CACHE_KEY];

/**
 * Get data from cache or fetch and store it.
 *
 * @param {string} key — Unique cache key (e.g. "products", "categories")
 * @param {number} ttlSeconds — How long to cache (in seconds)
 * @param {() => Promise<any>} fetcher — Async function to get fresh data
 * @returns {Promise<any>} — The cached or freshly fetched data
 */
export async function getOrSetCache(key, ttlSeconds, fetcher) {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  // Fetch fresh data
  const data = await fetcher();

  cache.set(key, {
    data,
    expiresAt: now + ttlSeconds * 1000,
  });

  return data;
}

/**
 * Invalidate a specific cache key.
 * Call this after creating/updating/deleting data.
 *
 * @param {string} key — The cache key to invalidate
 */
export function invalidateCache(key) {
  cache.delete(key);
}

/**
 * Invalidate all cache entries.
 */
export function invalidateAll() {
  cache.clear();
}
